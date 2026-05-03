import { contents } from '../data/membersData';

export default function ContentSection() {
    const handleImageError = (e) => {
        e.target.style.display = 'none';
    };

    return (
        <section id="content" className="content-section">
            <div className="content-wrapper">
                {contents.map((item, idx) => (
                    <a
                        key={idx}
                        href="https://www.instagram.com/kaoklaparty/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`content-card ${item.featured ? 'content-card--featured' : ''}`}
                    >
                        <div className="content-thumb">
                            <img
                                src={item.image}
                                alt="คอนเทนต์พรรคก้าวใกล้"
                                onError={handleImageError}
                            />
                            <div className="thumb-fallback">
                                <i className="fab fa-instagram"></i>
                            </div>
                            <div className="reel-badge">
                                <i className="fas fa-film"></i> Reels
                            </div>
                            <div className="content-overlay">
                                <i className="fas fa-play-circle play-icon"></i>
                            </div>
                            <div className="content-caption">{item.caption}</div>
                        </div>
                    </a>
                ))}
            </div>

            <a
                href="https://www.instagram.com/kaoklaparty/"
                target="_blank"
                rel="noopener noreferrer"
                className="ig-follow-btn"
            >
                <i className="fab fa-instagram"></i>
                <span>ติดตามพรรคก้าวใกล้บน Instagram</span>
            </a>
        </section>
    );
}
