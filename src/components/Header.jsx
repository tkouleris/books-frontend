import {logout} from "../utils/helpers.jsx";
import {useNavigate} from "react-router-dom";
import {send_verification_request} from "../utils/http.jsx";

function Header() {
    const navigate = useNavigate();

    function verificationRequestHandler(){
        send_verification_request(window.localStorage.token).then( out =>{
            alert("Check your email")
        })
    }

    let verified = window.localStorage.verified === 'true'
    let verificationRequest = ''
    if(!verified){
        verificationRequest = <div className="alert alert-danger mb-0 text-center" style={{width: '100%', borderRadius: 0}}>
            <strong>Please verify you account <a role="button" className="text-white" style={{textDecoration: 'underline'}} onClick={verificationRequestHandler}>here</a></strong>
        </div>
    }

    return <>
        {verificationRequest}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                        className="fas fa-bars"></i></a>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => logout(navigate)}
                       role="button">
                        <i className="fas fa-sign-out-alt mr-1"></i> Logout
                    </a>
                </li>
            </ul>
        </nav>
    </>
}

export default Header;