import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteReading, fetchReadings} from "../utils/http.jsx";

function MyReadings(){
    const navigate = useNavigate();
    const [readings, setReadings] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        document.title = 'Books - My Readings';
        fetchReadings(window.localStorage.token, currentPage).then(res =>{
            setReadings(res.data.data.readings)
            setCurrentPage(res.data.data.current_page)
            setTotalPages(res.data.data.total_pages)
        })
    }, []);

    function deleteHandler(id) {
        if (confirm('Are you sure you want to delete this reading?')) {
            deleteReading(window.localStorage.token, id).then(res => {

                if (res.data.success) {
                    fetchReadings(window.localStorage.token, currentPage).then(res =>{
                        setReadings(res.data.data.readings)
                        setCurrentPage(res.data.data.current_page)
                        setTotalPages(res.data.data.total_pages)
                    })
                }
            })
        }
    }

    function goToEditReading(readId) {
        navigate('/reading-form/' + readId);
    }

    function goToReadingsForm(){
        navigate('/reading-form');
    }

    function pageHandler(event, page) {

        event.preventDefault()
        setCurrentPage(page)
        fetchReadings(window.localStorage.token, page).then(res =>{
            console.log(res)
            setReadings(res.data.data.readings)
            setCurrentPage(res.data.data.current_page)
            setTotalPages(res.data.data.total_pages)
        })
    }

    const listItems = [];

    for (let page = 1; page <= totalPages; page++) {
        if (page === currentPage) {
            listItems.push(<div onClick={(e) => pageHandler(e, page)} style={{paddingLeft: 5, paddingRight: 5}}><u><b><a
                href="" key={page}>{page}</a></b></u></div>);
        } else {
            listItems.push(<div onClick={(e) => pageHandler(e, page)} style={{paddingLeft: 5, paddingRight: 5}}><a
                href="" key={page}>{page}</a></div>);
        }
    }

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">
                                My Readings
                                <button type="button" style={{marginLeft: 10}} onClick={goToReadingsForm}
                                        className="btn btn-success">
                                    <i className="fas fa-plus-square"></i>
                                </button>

                            </h1>
                        </div>

                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">

                        {
                            readings.map((reading, index) => {
                                let ended = 'currently reading'
                                if (reading.ended !== ' - ') {
                                    ended = reading.ended
                                }
                                return (
                                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                        <div className="card h-100 shadow-sm border-0">
                                            <div className="card-header bg-transparent border-0 pt-3">
                                                <h5 className="card-title font-weight-bold text-truncate" title={reading.book.title}>{reading.book.title}</h5>
                                            </div>
                                            <div className="card-body py-0 text-center">
                                                <img alt={reading.book.title} 
                                                     className="img-fluid rounded shadow-sm"
                                                     style={{width: '100%', height: '300px', objectFit: 'cover'}}
                                                     src={reading.book.image}/>
                                            </div>
                                            <div className="card-footer bg-transparent border-0 pt-3">
                                                <div className="small mb-1">
                                                    <strong>Started:</strong> {reading.started}
                                                </div>
                                                <div className="small mb-3">
                                                    <strong>Ended:</strong> {ended}
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <button className="btn btn-sm btn-outline-primary"
                                                           onClick={() => goToEditReading(reading.id)}>
                                                        <i className="fas fa-edit mr-1"></i> Edit
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger"
                                                           onClick={() => deleteHandler(reading.id)}>
                                                        <i className="fa fa-trash mr-1" aria-hidden="true"></i> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                        {
                            totalPages > 1 ?
                                <div className="row">
                                    <div onClick={(e) => pageHandler(e, 1)} style={{paddingLeft: 5, paddingRight: 5}}><a
                                        href="">Start</a></div>
                                    {listItems}
                                    <div onClick={(e) => pageHandler(e, totalPages)}
                                         style={{paddingLeft: 5, paddingRight: 5}}><a
                                        href="">End</a></div>
                                </div> : ''
                        }
                </div>

            </section>
        </div>
        <SideNav/>
        <Footer/>
    </div>
        ;
}

export default MyReadings