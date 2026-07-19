import { useLanguage } from '../i18n/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <div className="party-boxes">
                    <div className="symbol-box">
                        <div className="number-item">
                            <div className="party-number">1</div>
                        </div>
                        <div className="symbol-item">
                            <div className="party-symbol">
                                <svg className="x-mark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                                            <stop offset="50%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                    <line className="x-line line-1" x1="20" y1="20" x2="80" y2="80" strokeWidth="8" strokeLinecap="round" />
                                    <line className="x-line line-2" x1="80" y1="20" x2="20" y2="80" strokeWidth="8" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="party-name">{t('hero.partyName')}</div>
                        <div className="party-slogan">{t('hero.slogan')}</div>
                    </div>
                </div>
            </div>
            <div className="hero-image">
                <div className="image-wrapper">
                    <a href="https://instagram.com/kaoklaipartys_01"
                    target="_blank" rel="noopener noreferrer">
                        <img src="img/logo.png" alt={t('hero.logoAlt')} />
                    </a>
                </div>
            </div>
        </section>
    );
}
