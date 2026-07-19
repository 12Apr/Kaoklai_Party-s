import { contents } from '../data/membersData';
import { useLanguage } from '../i18n/LanguageContext';

export default function ContentSection() {
    const { t, pick } = useLanguage();

    const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    e.target.style.display = 'none';
};

    return (
        <section id="content" className="content-section">
            <div className="content-wrapper">
                {contents.map((item, idx) => (
                    <a
                        key={idx}
                        href="https://www.instagram.com/kaoklaparty/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`content-card ${item.featured ? 'content-card--featured' : ''}`}
                    >
                        <div className="content-thumb">
                            <img
                                src={item.image}
                                alt={t('content.imageAlt')}
                                onError={handleImageError}
                            />
                            <div className="thumb-fallback">
                                <i className="fab fa-instagram"></i>
                            </div>
                            <div className="reel-badge">
                                <i className="fas fa-film"></i> {t('content.reels')}
                            </div>
                            <div className="content-overlay">
                                <i className="fas fa-play-circle play-icon"></i>
                            </div>
                            <div className="content-caption">{pick(item.caption)}</div>
                        </div>
                    </a>
                ))}
            </div>

            <a
                href="https://www.instagram.com/kaoklaparty/"
                target="_blank"
                rel="noopener noreferrer"
                className="ig-follow-btn"
            >
                <i className="fab fa-instagram"></i>
                <span>{t('content.followButton')}</span>
            </a>
        </section>
    );
}
