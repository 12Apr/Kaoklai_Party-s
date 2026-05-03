export default function PresidentSection({ onMemberClick }) {
    return (
        <section id="president" className="members-section">
            <div className="president-section">
                <h2 className="section-title">ผู้ลงสมัครประธานสภานักเรียน</h2>
                <div
                    className="president-card"
                    data-member="president"
                    onClick={() => onMemberClick('president')}
                >
                    <img className="card-image" src="img/president/kanlayanee.jpg" alt="ประธานสภานักเรียน" />
                    <div className="card-content">
                        <div className="position-badge president-badge">
                            <i className="fas fa-crown"></i>
                            <span>ผู้ลงสมัครประธานสภานักเรียน</span>
                        </div>
                        <h3 className="card-name">กัลยาณี โลหะทิน</h3>
                        <p className="card-details">ม.5/1 | วิทย์-คณิต</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
