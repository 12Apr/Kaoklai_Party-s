import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES, LANGUAGE_SHORT, LANGUAGE_LABELS } from '../i18n/translations';

const AUTO_COLLAPSE_MS = 2000;
const MOBILE_QUERY = '(max-width: 640px)';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false
  );
  const wrapRef = useRef(null);
  const collapseTimer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener
      ? mq.addEventListener('change', onChange)
      : mq.addListener(onChange);
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener('change', onChange)
        : mq.removeListener(onChange);
    };
  }, []);

  const scheduleCollapse = useCallback(() => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    if (!isMobile) {
      setCollapsed(false);
      return;
    }
    collapseTimer.current = setTimeout(() => {
      setCollapsed(true);
    }, AUTO_COLLAPSE_MS);
  }, [isMobile]);

  const cancelCollapse = useCallback(() => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    setCollapsed(false);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setCollapsed(false);
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    } else {
      scheduleCollapse();
    }
  }, [isMobile, scheduleCollapse]);

  useEffect(() => {
    if (open) {
      cancelCollapse();
    } else {
      scheduleCollapse();
    }
  }, [open, scheduleCollapse, cancelCollapse]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, []);

  const handleSelect = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };

  const handleMainClick = () => {
    if (isMobile && collapsed) {
      cancelCollapse();
      scheduleCollapse();
      return;
    }
    setOpen((v) => !v);
  };

  const handleMouseEnter = () => {
    cancelCollapse();
  };
  const handleMouseLeave = () => {
    if (!open) scheduleCollapse();
  };

  const handleTouchStart = () => {
    cancelCollapse();
    scheduleCollapse();
  };

  return (
    <div
      className={`lang-fab-wrap ${collapsed ? 'is-collapsed' : 'is-expanded'}`}
      ref={wrapRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <div className={`lang-fab-menu ${open ? 'open' : ''}`} role="menu">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            type="button"
            role="menuitemradio"
            aria-checked={language === lang}
            className={`lang-fab-option ${language === lang ? 'active' : ''}`}
            onClick={() => handleSelect(lang)}
          >
            <span className="lang-fab-code">{LANGUAGE_SHORT[lang]}</span>
            <span className="lang-fab-name">{LANGUAGE_LABELS[lang]}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className={`lang-fab ${open ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
        onClick={handleMainClick}
        aria-label="Change language"
        aria-expanded={open}
        title="Language"
      >
        <i className="fas fa-globe"></i>
        <span className="lang-fab-current">{LANGUAGE_SHORT[language]}</span>
      </button>
    </div>
  );
}
