import { useState, useEffect, useRef } from 'react'

export default function BackgroundSound({ sections, volume: initialVolume = 0.2 }) {
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [volume, setVolume] = useState(initialVolume)
  const [showSlider, setShowSlider] = useState(false)
  const audioRef = useRef(null)
  const sliderTimeout = useRef(null)

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
  }

  const handleVolumeClick = () => {
    setShowSlider(prev => !prev)
    if (sliderTimeout.current) clearTimeout(sliderTimeout.current)
    sliderTimeout.current = setTimeout(() => setShowSlider(false), 2000)
  }

  const [started, setStarted] = useState(false)

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
        <p style={{ fontSize: '2rem' }}>
        </p>
        <p style={{ fontSize: '1.2rem' }}>แตะเพื่อเข้าสู่เว็บไซต์</p>
      </div>
    </div>
  )

  return (
    <>
      <audio ref={audioRef} />
      <div style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem',
        zIndex: 50, display: 'flex', alignItems: 'center', gap: '8px',
        background: 'rgba(0,0,0,0.75)', borderRadius: '9999px',
        padding: '0 16px', height: '48px',
        backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease'
      }}>
        <span style={{
          color: 'rgba(255,255,255,0.7)', fontSize: '12px',
          maxWidth: '120px', overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }}>
          {sections[current].title}
        </span>
        <span onClick={handleVolumeClick} style={{
          color: 'rgba(255,255,255,0.6)', fontSize: '14px',
          cursor: 'pointer', userSelect: 'none'
        }}>
          {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
        </span>
        <div style={{
          width: showSlider ? '72px' : '0px', overflow: 'hidden',
          transition: 'width 0.3s ease', display: 'flex', alignItems: 'center'
        }}>
          <input type="range" min={0} max={1} step={0.01} value={volume}
            onChange={handleVolumeChange}
            style={{ width: '72px', accentColor: 'white', cursor: 'pointer' }}
          />
        </div>
        <button onClick={toggle} aria-label={playing ? 'pause' : 'play'}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.1)', color: 'white',
            cursor: 'pointer', fontSize: '14px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
        >
          {playing ? '⏸' : '▶'}
        </button>
      </div>
    </>
  )
}