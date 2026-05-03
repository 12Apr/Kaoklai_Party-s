import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PresidentSection from './components/PresidentSection';
import ManagementSection from './components/ManagementSection';
import MembersSection from './components/MembersSection';
import PolicySection from './components/PolicySection';
import ContentSection from './components/ContentSection';
import FeedbackSection from './components/FeedbackSection';
import MemberModal from './components/MemberModal';
import Footer from './components/Footer';

export default function App() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inject ripple keyframe + branding console log on mount
    useEffect(() => {
        // Branding console
        console.log(
            '%cพรรคก้าวใกล้',
            'color: #FFD700; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,71,171,0.5)'
        );
        console.log(
            '%cDeveloped By Chinnapat Nuchanong',
            'color: #FFA500; font-size: 14px; font-style: italic;'
        );

        // Add ripple keyframe (for feedback button)
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Page-load fade in
        document.body.style.opacity = '0';
        const timer = setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);

        return () => {
            clearTimeout(timer);
            if (style.parentNode) style.parentNode.removeChild(style);
        };
    }, []);

    const handleMemberClick = (memberId) => {
        setSelectedMember(memberId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Keep selectedMember so the modal animates out smoothly with content
        setTimeout(() => setSelectedMember(null), 300);
    };

    return (
        <>
            <Navbar />
            <Hero />
            <PresidentSection onMemberClick={handleMemberClick} />
            <ManagementSection onMemberClick={handleMemberClick} />
            <MembersSection />
            <PolicySection />
            <ContentSection />
            <FeedbackSection />
            <MemberModal
                memberId={selectedMember}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
            <Footer />
        </>
    );
}
