import { useState, useEffect } from 'react';
import { navItems } from '../data/membersData';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            if (current) setActiveSection(current);

            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.navbar')) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMenuOpen(false);
        }
    };

    const navbarStyle = {
        background: scrolled ? 'rgba(0, 71, 171, 0.25)' : 'rgba(0, 71, 171, 0.15)'
    };

    return (
        <nav className="navbar" style={navbarStyle}>
            <a href="#home" className="logo-container decoration">
                <div className="logo">{t('nav.logo')}</div>
            </a>
            <button
                className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                aria-label="Toggle menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                {navItems.map(item => {
                    const sectionId = item.href.slice(1);
                    return (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={activeSection === sectionId ? 'active' : ''}
                                onClick={(e) => handleNavClick(e, item.href)}
                            >
                                {t(item.labelKey)}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
