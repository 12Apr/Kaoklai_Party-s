import { useEffect, useRef } from 'react';
import { committeeMembers } from '../data/membersData';

export default function MembersSection() {
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
        <section id="members" className="members-section">
            <div className="committee-section">
                <h2 className="section-title">คณะกรรมการพรรค</h2>
                <div className="committee-grid">
                    {committeeMembers.map((member, idx) => (
                        <div
                            key={member.id}
                            ref={el => cardsRef.current[idx] = el}
                            className="committee-card"
                        >
                            <img className="committee-image" src={member.image} alt="สมาชิก" />
                            <div className="committee-content">
                                <h3 className="committee-name">{member.name}</h3>
                                <p className="committee-details">{member.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
