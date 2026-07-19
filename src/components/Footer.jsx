import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();
    const years = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="social-links">
                <a
                    href="https://instagram.com/kaoklaipartys_01"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
            <p className="copyright">Copyright © {years} | {t('footer.copyright')}</p>
            <p className="developer">
                <i className="fas fa-code"></i>
                {' '}{t('footer.developedBy')}{' '}
                <a
                    href="https://www.chinnapatndev.com/"
                    className="devlink"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('footer.developerName')}
                </a>{' '}
                {t('footer.developerClass')}
            </p>
        </footer>
    );
}
