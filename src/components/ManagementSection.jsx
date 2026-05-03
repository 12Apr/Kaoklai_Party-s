import { useEffect, useRef } from 'react';
import { executives } from '../data/membersData';

export default function ManagementSection({ onMemberClick }) {
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
        <section id="management" className="members-section">
            <div className="executives-section">
                <h2 className="section-title">คณะผู้บริหารพรรค</h2>
                <div className="executives-grid">
                    {executives.map((exec, idx) => (
                        <div
                            key={exec.id}
                            ref={el => cardsRef.current[idx] = el}
                            className="executive-card"
                            data-member={exec.id}
                            onClick={() => onMemberClick(exec.id)}
                        >
                            <img className="executive-image" src={exec.image} alt={exec.badge.label} />
                            <div className="executive-content">
                                <div className={`position-badge ${exec.badge.class}`}>
                                    <i className={`fas ${exec.badge.icon}`}></i>
                                    <span>{exec.badge.label}</span>
                                </div>
                                <h3 className="executive-name">{exec.name}</h3>
                                <p className="executive-details">{exec.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
