import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PresidentSection from './components/PresidentSection';
import ManagementSection from './components/ManagementSection';
import MembersSection from './components/MembersSection';
import PolicySection from './components/PolicySection';
// import ContentSection from './components/ContentSection';
import VoteSection from './components/VoteSection';
import MemberModal from './components/MemberModal';
import FeedbackSection from './components/FeedbackSection';
import Footer from './components/Footer';
import Lenis from 'lenis';
// import BackgroundSound from './components/BackgroundSound';
import LanguageSwitcher from './components/LanguageSwitcher';

// const soundSections = [{ src: '/sounds/background.mp3'}];

export default function App() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        console.log(
            '%cพรรคก้าวใกล้',
            'color: #FFD700; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,71,171,0.5)'
        );
        console.log(
            '%cDeveloped By Chinnapat Nuchanong',
            'color: #FFA500; font-size: 14px; font-style: italic;'
        );

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

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08,
            wheelMultiplier: 0.9,
            touchMultiplier: 0.95,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()
                const target = document.querySelector(link.getAttribute('href'))
                if (target) lenis.scrollTo(target, { duration: 1.2 })
            })
        })

        return () => lenis.destroy()
    }, [])

    const handleMemberClick = (memberId) => {
        setSelectedMember(memberId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMember(null), 300);
    };

    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        const handleKeyDown = (e) => {
            if (e.key === 'F12') e.preventDefault();
            if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
                e.preventDefault();
            }
            if (e.ctrlKey && e.key.toUpperCase() === 'U') e.preventDefault();
            if (e.ctrlKey && e.key.toUpperCase() === 'S') e.preventDefault();
            if (e.key === 'PrintScreen') {
                navigator.clipboard.writeText('').catch(() => {});
            }
        };

        const handleDragStart = (e) => {
            if (e.target.tagName === 'IMG') e.preventDefault();
        };
        
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('dragstart', handleDragStart);
        
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);

    return (
        <>
            <Navbar />
            <Hero />
            <PresidentSection onMemberClick={handleMemberClick} />
            <ManagementSection onMemberClick={handleMemberClick} />
            <MembersSection />
            <PolicySection />
            {/* <VoteSection /> */}
            {/* <ContentSection /> */}
            <MemberModal
                memberId={selectedMember}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
            <FeedbackSection />
            <Footer />
            {/* <BackgroundSound sections={soundSections} volume={0.1} /> */}
            <LanguageSwitcher />
        </>
    );
}