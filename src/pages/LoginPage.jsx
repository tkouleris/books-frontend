import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../utils/http.jsx";

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        document.title = 'Books - Login';
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "hold-transition";

    }, []);

    function handleLogin() {

        login({email: email, password: password}).then((response) => {
            if (response.status === 1) {
                window.localStorage.setItem('username', response.data.data.username);
                window.localStorage.setItem('token', response.data.data.token);
                window.localStorage.setItem('avatar', response.data.data.avatar);
                window.localStorage.setItem('verified', response.data.data.verified);
                navigate("/dashboard");
                return;
            }

            alert('error')
        })
    }

    function goToRegistration() {
        navigate("/register");
    }

    function goToForgotPassword() {
        navigate("/forgot-password");
    }

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("dist/img/library.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '20px 0'
        }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7 mb-4 mb-lg-0">
                        <div className="jumbotron bg-transparent p-0">
                            <h1 className="display-4 font-weight-bold"><i className="fas fa-book-open text-primary"></i> Welcome to Books</h1>
                            <p className="lead mt-4">
                                The ultimate platform for managing your personal library.
                            </p>
                            <hr className="my-4"/>
                            <p>
                                With Books, you can organize your books, track your reading progress,
                                and share your reading habits with your friends.
                            </p>
                            <div className="row mt-5">
                                <div className="col-sm-4 text-center mb-3">
                                    <i className="fas fa-list fa-3x text-info"></i>
                                    <h5 className="mt-2">Organization</h5>
                                    <p className="small">Catalog your books and keep track of when you read them and what your next book will be.</p>
                                </div>
                                <div className="col-sm-4 text-center mb-3">
                                    <i className="fas fa-chart-line fa-3x text-success"></i>
                                    <h5 className="mt-2">Progress</h5>
                                    <p className="small">Record when you read a book and see how many you have read so far.</p>
                                </div>
                                <div className="col-sm-4 text-center mb-3">
                                    <i className="fas fa-users fa-3x text-warning"></i>
                                    <h5 className="mt-2">Community</h5>
                                    <p className="small">Share your reading habits with your friends.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 d-flex justify-content-center justify-content-lg-end">
                        <div className="login-box" style={{ width: '100%', maxWidth: '360px' }}>
                            <div className="card card-outline card-primary shadow-lg">
                                <div className="card-header text-center">
                                    <a href="" className="h1"><b>Books</b></a>
                                </div>
                                <div className="card-body">
                                    <p className="login-box-msg">Sign in to start your session</p>

                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" value={email}
                                               onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => {
                                            if (e.key === "Enter")
                                                handleLogin();
                                        }} placeholder="Email"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" value={password}
                                               onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
                                            if (e.key === "Enter")
                                                handleLogin();
                                        }} placeholder="Password"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="icheck-primary">
                                                <input type="checkbox" id="remember"/>
                                                <label htmlFor="remember">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <button type="submit" className="btn btn-primary btn-block" onClick={handleLogin}>
                                                Sign In
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="mb-1">
                                            <a href="" onClick={(e) => { e.preventDefault(); goToForgotPassword(); }}>I forgot my password</a>
                                        </p>
                                        <p className="mb-0">
                                            <a href="" onClick={(e) => { e.preventDefault(); goToRegistration(); }} className="text-center">Register a new membership</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;