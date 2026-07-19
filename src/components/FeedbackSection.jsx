import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function FeedbackSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleRipple = (e) => {
        const button = buttonRef.current;
        if (!button) return;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';

        const rect = button.getBoundingClientRect();
        ripple.style.left = e.clientX - rect.left - 10 + 'px';
        ripple.style.top = e.clientY - rect.top - 10 + 'px';

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };

    return (
        <section id="feedback" className="feedback-section" ref={sectionRef}>
            <div className="feedback-container">
                <div className="feedback-content">
                    <div className="feedback-icon">
                        <i className="fas fa-bullhorn"></i>
                    </div>
                    <h2 className="feedback-title">{t('feedback.title')}</h2>
                    <p className="feedback-description">
                        {t('feedback.description')}
                    </p>
                    <a
                        ref={buttonRef}
                        href="https://forms.gle/dETJB6ZJwFhBAZFFA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="feedback-button"
                        onClick={handleRipple}
                    >
                        <i className="fas fa-paper-plane"></i>
                        <span>{t('feedback.button')}</span>
                    </a>
                </div>
                <div className="feedback-image">
                    <div className="feedback-circle"></div>
                    <div className="feedback-illustration">
                        <i className="fas fa-comment-dots"></i>
                    </div>
                </div>
            </div>
        </section>
    );
}
