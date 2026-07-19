import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const AUTO_COLLAPSE_MS = 2000;
const MOBILE_QUERY = '(max-width: 640px)';

export default function BackgroundSound({ sections, volume: initialVolume = 0.2 }) {
  const { t } = useLanguage()
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [volume, setVolume] = useState(initialVolume)
  const [showSlider, setShowSlider] = useState(false)
  const [started, setStarted] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false
  )
  const audioRef = useRef(null)
  const sliderTimeout = useRef(null)
  const wrapRef = useRef(null)
  const collapseTimer = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener
      ? mq.addEventListener('change', onChange)
      : mq.addListener(onChange)
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener('change', onChange)
        : mq.removeListener(onChange)
    }
  }, [])

  const scheduleCollapse = useCallback(() => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current)
    if (!isMobile) {
      setCollapsed(false)
      return
    }
    collapseTimer.current = setTimeout(() => setCollapsed(true), AUTO_COLLAPSE_MS)
  }, [isMobile])

  const cancelCollapse = useCallback(() => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current)
    setCollapsed(false)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setCollapsed(false)
      if (collapseTimer.current) clearTimeout(collapseTimer.current)
    } else {
      scheduleCollapse()
    }
  }, [isMobile, scheduleCollapse])

  useEffect(() => {
    if (showSlider) {
      cancelCollapse()
    } else {
      scheduleCollapse()
    }
  }, [showSlider, scheduleCollapse, cancelCollapse])

  useEffect(() => {
    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current)
    }
  }, [])

  useEffect(() => {
    const handleFirstInteraction = () => {
      const audio = audioRef.current
      if (!audio || playing) return
      audio.src = sections[current].src
      audio.volume = volume
      audio.loop = true
      audio.play().then(() => setPlaying(true)).catch(() => {})
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
    }
    window.addEventListener('click', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)
    window.addEventListener('touchstart', handleFirstInteraction)
    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

  useEffect(() => {
    const handleSection = (e) => {
      const idx = sections.findIndex(s => s.id === e.detail)
      if (idx !== -1) setCurrent(idx)
    }
    window.addEventListener('section-change', handleSection)
    return () => window.removeEventListener('section-change', handleSection)
  }, [sections])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = sections[current].src
    audio.volume = volume
    audio.loop = true
    if (playing) audio.play().catch(() => {})
  }, [current])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      if (!audio.src) {
        audio.src = sections[current].src
        audio.loop = true
      }
      audio.volume = volume
      await audio.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value))
    if (sliderTimeout.current) clearTimeout(sliderTimeout.current)
    sliderTimeout.current = setTimeout(() => setShowSlider(false), 2000)
    cancelCollapse()
    scheduleCollapse()
  }

  const handleVolumeClick = (e) => {
    e.stopPropagation()
    if (isMobile && collapsed) {
      cancelCollapse()
      scheduleCollapse()
      return
    }
    setShowSlider(prev => !prev)
    if (sliderTimeout.current) clearTimeout(sliderTimeout.current)
    sliderTimeout.current = setTimeout(() => setShowSlider(false), 2000)
  }

  const handleToggleClick = (e) => {
    e.stopPropagation()
    if (isMobile && collapsed) {
      cancelCollapse()
      scheduleCollapse()
      return
    }
    toggle()
  }

  const handleWrapClick = () => {
    if (isMobile && collapsed) {
      cancelCollapse()
      scheduleCollapse()
    }
  }

  const handleMouseEnter = () => cancelCollapse()
  const handleMouseLeave = () => {
    if (!showSlider) scheduleCollapse()
  }
  const handleTouchStart = () => {
    cancelCollapse()
    scheduleCollapse()
  }

  if (!started) return (
    <div
      onClick={() => setStarted(true)}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <div style={{ textAlign: 'center', color: 'white' }}>
        <p style={{ fontSize: '2rem' }}></p>
        <p style={{ fontSize: '1.2rem' }}>{t('sound.enter')}</p>
      </div>
    </div>
  )

  const trackTitle = sections[current].title

  return (
    <>
      <audio ref={audioRef} />
      <div
        ref={wrapRef}
        className={`sound-fab-wrap ${collapsed ? 'is-collapsed' : 'is-expanded'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onClick={handleWrapClick}
      >
        <span className="sound-fab-title">{trackTitle}</span>

        <button
          type="button"
          className="sound-fab-icon"
          onClick={handleVolumeClick}
          aria-label="volume"
        >
          {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
        </button>

        <div className={`sound-fab-slider ${showSlider ? 'open' : ''}`}>
          <input
            type="range" min={0} max={1} step={0.01} value={volume}
            onChange={handleVolumeChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <button
          type="button"
          className="sound-fab-play"
          onClick={handleToggleClick}
          aria-label={playing ? 'pause' : 'play'}
        >
          {playing ? '⏸' : '▶'}
        </button>
      </div>
    </>
  )
}
