function Display({reading, isCurrent = false}) {

    function descriptionReducer(description) {
        if (!description) return '';
        if (description.length > 150) {
            return description.substring(0, 150) + '...'
        } else {
            return description
        }
    }

    return (
        <div className="modern-book-card">
            <div className="book-card-image-wrapper">
                {isCurrent && <div className="reading-badge">Reading Now</div>}
                <img 
                    alt={reading.book.title} 
                    className="book-card-image"
                    src={reading.book.image} 
                />
            </div>
            <div className="book-card-content">
                <h3 className="book-card-title">{reading.book.title}</h3>
                <p className="book-card-description">
                    {descriptionReducer(reading.book.description)}
                </p>
                <div className="book-card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                        <span>
                            <i className="far fa-calendar-alt mr-1"></i>
                            {reading.started}
                        </span>
                        {reading.ended && (
                            <span>
                                <i className="fas fa-check-circle mr-1 text-success"></i>
                                {reading.ended}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Display;