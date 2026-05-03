import { useEffect } from 'react';
import { membersData } from '../data/membersData';

export default function MemberModal({ memberId, isOpen, onClose }) {
    // Disable body scroll while modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close with Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const member = memberId ? membersData[memberId] : null;

    // Click outside content closes modal
    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal')) {
            onClose();
        }
    };

    return (
        <div
            id="memberModal"
            className={`modal ${isOpen ? 'active' : ''}`}
            onClick={handleBackdropClick}
        >
            <div className="modal-content">
                <button className="modal-close" onClick={onClose} aria-label="ปิด">
                    &times;
                </button>
                {member && (
                    <div className="modal-body">
                        <div className="modal-image-container">
                            <img id="modalImage" src={member.image} alt={member.name} />
                        </div>
                        <div className="modal-info">
                            <h2 id="modalName" className="modal-name">{member.name}</h2>
                            <p id="modalNickname" className="modal-nickname">"{member.nickname}"</p>

                            <div className="modal-highlights">
                                <h3><i className="fas fa-star"></i> จุดเด่น</h3>
                                <ul id="modalHighlights">
                                    {member.highlights.map((highlight, idx) => (
                                        <li key={idx}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-details">
                                <div className="detail-item">
                                    <i className="fas fa-school"></i>
                                    <span id="modalClass">{member.class}</span>
                                </div>
                                <div className="detail-item">
                                    <i className="fas fa-book"></i>
                                    <span id="modalProgram">{member.program}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
