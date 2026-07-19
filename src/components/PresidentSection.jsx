import { useLanguage } from '../i18n/LanguageContext';
import { membersData } from '../data/membersData';

export default function PresidentSection({ onMemberClick }) {
    const { t, pick } = useLanguage();
    const president = membersData.president;

    return (
        <section id="president" className="members-section">
            <div className="president-section">
                <h2 className="section-title">{t('president.title')}</h2>
                <div
                    className="president-card"
                    data-member="president"
                    data-hover-label={t('modal.clickForDetails')}
                    onClick={() => onMemberClick('president')}
                >
                    <img
                        className="card-image"
                        src={president.image}
                        loading="lazy"
                        alt={t('president.imageAlt')}
                    />
                    <div className="card-content">
                        <div className="position-badge president-badge">
                            <i className="fas fa-crown"></i>
                            <span>{t('president.badge')}</span>
                        </div>
                        <h3 className="card-name">{pick(president.name)}</h3>
                        <p className="card-details">
                            {pick(president.class)} | {pick(president.program)}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}