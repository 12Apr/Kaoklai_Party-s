export default function Footer() {
    const years = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="social-links">
                <a
                    href="https://instagram.com/kaoklaparty"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
            <p className="copyright">Copyright © {years} | พรรคก้าวใกล้</p>
            <p className="developer">
                <i className="fas fa-code"></i>
                {' '}พัฒนาโดย{' '}
                <a
                    href="https://www.chinnapatndev.com/"
                    className="devlink"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    นายชินณพัฒน์ นุชอนงค์
                </a>{' '}
                ม.5/1
            </p>
        </footer>
    );
}
