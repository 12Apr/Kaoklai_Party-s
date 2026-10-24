import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, runTransaction } from 'firebase/firestore';
import { db, signInWithGoogle, watchAuth } from '../firebase';

function VoteCard({ voteId, question, user }) {
    const [counts, setCounts] = useState({ yes: 0, no: 0 });
    const [userVote, setUserVote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const totalsRef = doc(db, 'votes', voteId);
        const unsub = onSnapshot(
            totalsRef,
            (snap) => {
                if (snap.exists()) {
                    const data = snap.data();
                    setCounts({ yes: data.yes || 0, no: data.no || 0 });
                }
                setLoading(false);
            },
            (err) => {
                console.error(err);
                setError('โหลดข้อมูลโหวตไม่สำเร็จ');
                setLoading(false);
            }
        );
        return () => unsub();
    }, [voteId]);

    useEffect(() => {
        if (!user) {
            setUserVote(null);
            return;
        }
        const userVoteRef = doc(db, 'votes', voteId, 'voters', user.uid);
        const unsub = onSnapshot(userVoteRef, (snap) => {
            if (snap.exists()) setUserVote(snap.data().choice);
            else setUserVote(null);
        });
        return () => unsub();
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
                    setError('ยกเลิกการเข้าสู่ระบบ');
                } else {
                    console.error(err);
                    setError('เข้าสู่ระบบไม่สำเร็จ');
                }
                return;
            }
        }

        const prevCounts = counts;
        setCounts((c) => ({ ...c, [choice]: c[choice] + 1 }));
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
                transaction.set(
                    totalsRef,
                    {
                        yes: (cur.yes || 0) + (choice === 'yes' ? 1 : 0),
                        no: (cur.no || 0) + (choice === 'no' ? 1 : 0),
                    },
                    { merge: true }
                );
                transaction.set(voterRef, {
                    choice,
                    email: currentUser.email || null,
                    displayName: currentUser.displayName || null,
                    votedAt: Date.now(),
                });
            });
        } catch (err) {
            console.error(err);
            setCounts(prevCounts);
            if (err.message === 'ALREADY_VOTED') {
                setError('คุณได้โหวตไปแล้ว');
            } else {
                setUserVote(null);
                setError('โหวตไม่สำเร็จ ลองใหม่อีกครั้ง');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const total = counts.yes + counts.no;
    const yesPercent = total === 0 ? 50 : (counts.yes / total) * 100;
    const noPercent = total === 0 ? 50 : (counts.no / total) * 100;
    const hasVoted = !!userVote;

    return (
        <div className="vote-container">
            <div className="vote-header">
                <div className="vote-icon">
                    <i className="fas fa-poll"></i>
                </div>
                <h2 className="vote-title">โหวตความคิดเห็น</h2>
                <p className="vote-question">{question}</p>
            </div>

            <div className="vote-bar-wrapper">
                <div className="vote-bar-labels">
                    <span className="vote-bar-label vote-yes-label">
                        <i className="fas fa-thumbs-up"></i> ใช่ ({counts.yes.toLocaleString()})
                    </span>
                    <span className="vote-bar-label vote-no-label">
                        ไม่ ({counts.no.toLocaleString()}) <i className="fas fa-thumbs-down"></i>
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
                    ผู้โหวตทั้งหมด: <strong>{total.toLocaleString()}</strong> คน
                </div>
            </div>

            <div className="vote-buttons">
                <button
                    className={`vote-button vote-button-yes ${userVote === 'yes' ? 'voted' : ''}`}
                    onClick={() => handleVote('yes')}
                    disabled={loading || hasVoted || submitting}
                >
                    <i className="fas fa-check"></i>
                    <span>ใช่</span>
                </button>
                <button
                    className={`vote-button vote-button-no ${userVote === 'no' ? 'voted' : ''}`}
                    onClick={() => handleVote('no')}
                    disabled={loading || hasVoted || submitting}
                >
                    <i className="fas fa-times"></i>
                    <span>ไม่</span>
                </button>
            </div>

            {hasVoted && (
                <div className="vote-status vote-status-success">
                    <i className="fas fa-check-circle"></i>
                    ขอบคุณสำหรับการโหวต! คุณเลือก:{' '}
                    <strong>{userVote === 'yes' ? 'ใช่' : 'ไม่'}</strong>
                </div>
            )}
            {error && (
                <div className="vote-status vote-status-error">
                    <i className="fas fa-exclamation-circle"></i> {error}
                </div>
            )}
            {loading && !error && !hasVoted && (
                <div className="vote-status vote-status-info">
                    <i className="fas fa-spinner fa-spin"></i> กำลังโหลด...
                </div>
            )}
        </div>
    );
}

export default function VoteSection() {
    const sectionRef = useRef(null);
    const [user, setUser] = useState(null);

    // Fade-in animation
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

    // ฟัง auth state — รักษา login ไว้ข้าม session (Firebase persist อัตโนมัติ)
    useEffect(() => {
        const unsub = watchAuth((u) => setUser(u));
        return () => unsub();
    }, []);

    return (
        <section id="vote" className="vote-section" ref={sectionRef}>
            <div className="vote-grid">
                {/* <VoteCard voteId="vote-1" question="คุณสนับสนุนพรรคก้าวใกล้หรือไม่?" user={user} />
                <VoteCard voteId="vote-2" question="เห็นด้วยกับนโยบายของพรรคหรือไม่?" user={user} />
                <VoteCard voteId="vote-3" question="คำถามที่ 3?" user={user} /> */}
                {/* <VoteCard voteId="vote-4" question="คำถามที่ 4?" user={user} /> */}
                {/* <VoteCard voteId="vote-1-test" question="คุณสนับสนุนพรรคก้าวใกล้หรือไม่?" user={user} />
                <VoteCard voteId="vote-2-test" question="เห็นด้วยกับนโยบายของพรรคหรือไม่?" user={user} />
                <VoteCard voteId="PolicyChatchai" question="เห็นด้วยกับนโยบายของพรรคหรือไม่?" user={user} /> */}
                <VoteCard voteId="usertest" question="เห็นด้วยกับนโยบายของพรรค?" user={user} />
            </div>
        </section>
    );
}
