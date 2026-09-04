import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {display_page} from "../utils/http.jsx";
import Display from "../components/Display.jsx";

function DisplayPage() {
    let {username} = useParams();
    const [current_readings, setCurrentReadings] = useState([])
    const [latest_readings, setLatestReadings] = useState([])
    const [to_read, setToRead] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        document.title = 'Display - ' + username;
        display_page(username).then(res => {
            console.log(res.data.data.to_read)
            setCurrentReadings(res.data.data.current_readings)
            setLatestReadings(res.data.data.latest_readings)
            setToRead(res.data.data.to_read || [])
            setUser(res.data.data.user)
        });
    }, [username]);

    return (
        <div className="display-page-container" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("/dist/img/library.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
        }}>
            <div className="display-page-header">
                <div className="container">
                    <h1 className="display-4 font-weight-bold mb-0">{username}'s Library</h1>
                    <p className="lead opacity-75">Exploring the world of books, one chapter at a time.</p>
                </div>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <div className="profile-avatar-container">
                            <img 
                                src={user.avatar || 'https://via.placeholder.com/160'} 
                                className="profile-avatar" 
                                alt={username} 
                            />
                        </div>
                        <h2 className="h3 font-weight-bold mb-1">{username}</h2>
                        <p className="text-muted mb-5">{user.email}</p>
                    </div>
                </div>

                {current_readings.length > 0 && (
                    <div className="mb-5">
                        <h2 className="display-section-title">Currently Reading</h2>
                        <div className="row">
                            {current_readings.map((reading, index) => (
                                <div key={index} className="col-lg-4 col-md-6 mb-4">
                                    <Display reading={reading} isCurrent={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-5">
                    <h2 className="display-section-title">Latest Readings</h2>
                    <div className="row">
                        {latest_readings.map((reading, index) => (
                            <div key={index} className="col-lg-4 col-md-6 mb-4">
                                <Display reading={reading} />
                            </div>
                        ))}
                    </div>
                </div>

                {to_read.length > 0 && (
                    <div className="mb-5">
                        <h2 className="display-section-title">To Read</h2>
                        <div className="row">
                            {to_read.map((reading, index) => (
                                <div key={index} className="col-lg-4 col-md-6 mb-4">
                                    <Display reading={reading} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <footer className="text-center py-5 text-muted">
                <p>© {new Date().getFullYear()} Books Tracker • Shared with ❤️</p>
            </footer>
        </div>
    );
}

export default DisplayPage;