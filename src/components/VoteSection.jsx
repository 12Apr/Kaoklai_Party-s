import { useEffect, useRef, useState, useCallback } from 'react';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { db, signInWithGoogle, watchAuth } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../i18n/LanguageContext';

function VoteCard({ voteId, user, counts, onCountsChange }) {
    const { t, language } = useLanguage();
    const [userVote, setUserVote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const question = t(`vote.questions.${voteId}`);

    useEffect(() => {
        let cancelled = false;
        const loadTotals = async () => {
            try {
                const totalsRef = doc(db, 'votes', voteId);
                const snap = await getDoc(totalsRef);
                if (cancelled) return;
                if (snap.exists()) {
                    const data = snap.data();
                    onCountsChange(voteId, { yes: data.yes || 0, no: data.no || 0 });
                }
            } catch (err) {
                console.error(err);
                if (!cancelled) setError(t('vote.loadFailed'));
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        loadTotals();
        return () => { cancelled = true; };
    }, [voteId]);

    useEffect(() => {
        if (!user) {
            setUserVote(null);
            return;
        }

        const cacheKey = `vote_${voteId}_${user.uid}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached === 'yes' || cached === 'no') {
            setUserVote(cached);
            return;
        }

        let cancelled = false;
        const checkVote = async () => {
            try {
                const userVoteRef = doc(db, 'votes', voteId, 'voters', user.uid);
                const snap = await getDoc(userVoteRef);
                if (cancelled) return;
                if (snap.exists()) {
                    const choice = snap.data().choice;
                    setUserVote(choice);
                    localStorage.setItem(cacheKey, choice);
                }
            } catch (err) {
                console.error('check vote error:', err);
            }
        };
        checkVote();
        return () => { cancelled = true; };
    }, [voteId, user]);

    const handleVote = async (choice) => {
        if (submitting || userVote) return;
        setError('');

        let currentUser = user;
        if (!currentUser) {
            try {
                setSubmitting(true);
                currentUser = await signInWithGoogle();
            } catch (err) {
                setSubmitting(false);
                if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
                    setError(t('vote.signInCancelled'));
                } else {
                    console.error(err);
                    setError(t('vote.signInFailed'));
                }
                return;
            }
        }

        const prevCounts = counts;
        const optimistic = { ...counts, [choice]: counts[choice] + 1 };
        onCountsChange(voteId, optimistic);
        setUserVote(choice);
        setSubmitting(true);

        try {
            const totalsRef = doc(db, 'votes', voteId);
            const voterRef = doc(db, 'votes', voteId, 'voters', currentUser.uid);

            await runTransaction(db, async (transaction) => {
                const voterSnap = await transaction.get(voterRef);
                if (voterSnap.exists()) throw new Error('ALREADY_VOTED');

                const totalsSnap = await transaction.get(totalsRef);
                const cur = totalsSnap.exists() ? totalsSnap.data() : { yes: 0, no: 0 };
                transaction.set(totalsRef, {
                    yes: (cur.yes || 0) + (choice === 'yes' ? 1 : 0),
                    no: (cur.no || 0) + (choice === 'no' ? 1 : 0),
                });
                transaction.set(voterRef, {
                    choice,
                    votedAt: serverTimestamp(),
                });
            });

            localStorage.setItem(`vote_${voteId}_${currentUser.uid}`, choice);
        } catch (err) {
            console.error(err);
            onCountsChange(voteId, prevCounts);
            if (err.message === 'ALREADY_VOTED') {
                setError(t('vote.alreadyVoted'));
                try {
                    const voterRef = doc(db, 'votes', voteId, 'voters', currentUser.uid);
                    const snap = await getDoc(voterRef);
                    if (snap.exists()) {
                        const c = snap.data().choice;
                        setUserVote(c);
                        localStorage.setItem(`vote_${voteId}_${currentUser.uid}`, c);
                    }
                } catch (_) {}
            } else {
                setUserVote(null);
                setError(t('vote.voteFailed'));
            }
        } finally {
            setSubmitting(false);
        }
    };

    const total = counts.yes + counts.no;
    const yesPercent = total === 0 ? 50 : (counts.yes / total) * 100;
    const noPercent = total === 0 ? 50 : (counts.no / total) * 100;
    const hasVoted = !!userVote;

    const localeMap = { th: 'th-TH', en: 'en-US', zh: 'zh-CN' };
    const fmt = (n) => n.toLocaleString(localeMap[language] || 'en-US');

    return (
        <div className="vote-container">
            <div className="vote-header">
                <div className="vote-icon">
                    <i className="fas fa-poll"></i>
                </div>
                <h2 className="vote-title">{t('vote.title')}</h2>
                <p className="vote-question">{question}</p>
            </div>

            <div className="vote-bar-wrapper">
                <div className="vote-bar-labels">
                    <span className="vote-bar-label vote-yes-label">
                        <i className="fas fa-thumbs-up"></i> {t('vote.yes')} ({fmt(counts.yes)})
                    </span>
                    <span className="vote-bar-label vote-no-label">
                        {t('vote.no')} ({fmt(counts.no)}) <i className="fas fa-thumbs-down"></i>
                    </span>
                </div>
                <div className="vote-bar">
                    <div className="vote-bar-fill vote-bar-yes" style={{ width: `${yesPercent}%` }}>
                        {yesPercent > 12 && (
                            <span className="vote-bar-percent">{yesPercent.toFixed(1)}%</span>
                        )}
                    </div>
                    <div className="vote-bar-fill vote-bar-no" style={{ width: `${noPercent}%` }}>
                        {noPercent > 12 && (
                            <span className="vote-bar-percent">{noPercent.toFixed(1)}%</span>
                        )}
                    </div>
                </div>
                <div className="vote-total">
                    {t('vote.totalVoters')} <strong>{fmt(total)}</strong> {t('vote.peopleUnit')}
                </div>
            </div>

            <div className="vote-buttons">
                <button
                    className={`vote-button vote-button-yes ${userVote === 'yes' ? 'voted' : ''}`}
                    onClick={() => handleVote('yes')}
                    disabled={loading || hasVoted || submitting}
                >
                    <i className="fas fa-check"></i>
                    <span>{t('vote.yes')}</span>
                </button>
                <button
                    className={`vote-button vote-button-no ${userVote === 'no' ? 'voted' : ''}`}
                    onClick={() => handleVote('no')}
                    disabled={loading || hasVoted || submitting}
                >
                    <i className="fas fa-times"></i>
                    <span>{t('vote.no')}</span>
                </button>
            </div>

            {hasVoted && (
                <div className="vote-status vote-status-success">
                    <i className="fas fa-check-circle"></i>
                    {' '}{t('vote.thanks')}{' '}
                    <strong>{userVote === 'yes' ? t('vote.yes') : t('vote.no')}</strong>
                </div>
            )}
            {error && (
                <div className="vote-status vote-status-error">
                    <i className="fas fa-exclamation-circle"></i> {error}
                </div>
            )}
            {loading && !error && !hasVoted && (
                <div className="vote-status vote-status-info">
                    <i className="fas fa-spinner fa-spin"></i> {t('vote.loading')}
                </div>
            )}
        </div>
    );
}

const VOTE_IDS = [
    'policy-8',
    'policy-10',
    'policy-9',
    'policy-11',
    'policy-6',
    'policy-4',
    'policy-7',
    'policy-5',
    'policy-12',
    'policy-13',
    'policy-14',
];

export default function VoteSection() {
    const sectionRef = useRef(null);
    const [user, setUser] = useState(null);
    const [countsMap, setCountsMap] = useState(() =>
        Object.fromEntries(VOTE_IDS.map((id) => [id, { yes: 0, no: 0 }]))
    );
    const { t } = useLanguage();

    const handleCountsChange = useCallback((voteId, counts) => {
        setCountsMap((prev) => ({ ...prev, [voteId]: counts }));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const unsub = watchAuth((u) => setUser(u));
        return () => unsub();
    }, []);

    const sortedIds = [...VOTE_IDS].sort((a, b) => {
        const ca = countsMap[a] || { yes: 0, no: 0 };
        const cb = countsMap[b] || { yes: 0, no: 0 };
        if (cb.yes !== ca.yes) return cb.yes - ca.yes;
        const totalA = ca.yes + ca.no;
        const totalB = cb.yes + cb.no;
        return totalB - totalA;
    });

    return (
        <section id="vote" className="vote-section" data-swipe-hint={t('common.swipeHint')} ref={sectionRef}>
            <div className="vote-grid">
                {sortedIds.map((id) => (
                    <VoteCard
                        key={id}
                        voteId={id}
                        user={user}
                        counts={countsMap[id] || { yes: 0, no: 0 }}
                        onCountsChange={handleCountsChange}
                    />
                ))}
            </div>
        </section>
    );
}