import { useEffect, useRef } from 'react';
import { policies } from '../data/membersData';

export default function PolicySection() {
    const cardsRef = useRef([]);

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

        cardsRef.current.forEach(card => {
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="policy" className="policy-section">
            <h2 className="section-title">นโยบายของเรา</h2>
            <div className="policy-grid">
                {policies.map((policy, idx) => (
                    <div
                        key={idx}
                        ref={el => cardsRef.current[idx] = el}
                        className="policy-card"
                    >
                        <div className="policy-icon">
                            <i className={`fas ${policy.icon}`}></i>
                        </div>
                        <h3 className="policy-title">{policy.title}</h3>
                        <p className="policy-description">{policy.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
