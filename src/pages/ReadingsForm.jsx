import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {fetchBooks, fetchReading, storeReading} from "../utils/http.jsx";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {useNavigate, useParams} from "react-router-dom";
import SearchableDropdown from "../components/SearchableDropdown.jsx";

function ReadingsForm(){
    let { id } = useParams();
    const navigate = useNavigate();


    const [started, setStarted] = useState(null)
    const [ended, setEnded] = useState(null)
    const [bookId, setBookId] = useState()
    const [readId, setReadId] = useState(null)
    const [books, setBooks] = useState([])
    const [bookTitle, setBookTitle] = useState('')

    const zeroPad = (num, places) => String(num).padStart(places, '0')

    useEffect(() => {
        document.title = 'Books';
        fetchBooks(window.localStorage.token).then(res =>{
            setBookId(res.data.data.books[0].id)
            setBooks(res.data.data.books)
            // setBook(res.data.data[0]);


            if( id !== undefined){
                setReadId(id)
                fetchReading(window.localStorage.token, id).then(res =>{
                    if(!res.data.success){
                        navigate('/404')
                    }
                    setBookId(res.data.data.book.id)
                    setBookTitle(res.data.data.book.title)
                    setStarted(res.data.data.started)
                    if(res.data.data.ended.length > 3)
                        setEnded(res.data.data.ended)
                })
            }

        })
        setStarted(transformDate(new Date()))
    }, []);

    function handleSubmit(){
        let data = {}
        data['started'] = started

        data['ended'] = ended
        data['book_id'] = bookId !== undefined ? bookId: null;
        if(readId !== null){
            data['reading_id'] = readId
        }
        storeReading(window.localStorage.token, data).then(() =>{
            navigate('/readings');
        })
    }

    function transformDate(date){
        return date.getFullYear() +"-"+zeroPad((date.getMonth() + 1),2)+"-"+zeroPad(date.getDate(),2)
    }
    function handleStartedDateChange(date){
        setStarted(date.getFullYear() +"-"+zeroPad((date.getMonth() + 1),2)+"-"+zeroPad(date.getDate(),2))
    }

    function handleEndeddDateChange(date){
        setEnded(date.getFullYear() +"-"+zeroPad((date.getMonth() + 1),2)+"-"+zeroPad(date.getDate(),2))
    }

    function clearEndedDate(){
        setEnded(null)
    }

    function handleBookSelectionChange(val){
        setBookTitle(val.title)
        setBookId(val.id)
    }

    function handleBack(){
        navigate('/readings');
    }

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Reading</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title"></h3>
                                </div>

                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="book">Book </label>
                                            <SearchableDropdown
                                                options={books}
                                                label="title"
                                                id="id"
                                                selectedVal={bookTitle}
                                                handleChange={handleBookSelectionChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Started:</label>
                                            <div>
                                                <DatePicker
                                                    selected={started}
                                                    onChange={handleStartedDateChange}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Ended:</label>
                                            <div>
                                                <DatePicker
                                                    selected={ended}
                                                    onChange={handleEndeddDateChange}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                                <a type="button"
                                                   className="btn btn-danger"
                                                   style={
                                                        {
                                                            marginLeft: 5,
                                                            paddingLeft: 4,
                                                            paddingRight: 4,
                                                            paddingTop:2,
                                                            paddingBottom:1,
                                                            marginTop:0
                                                        }
                                                   }
                                                   onClick={clearEndedDate}

                                                >
                                                    <i className="far fa-trash-alt"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="button" className="btn btn-light"
                                                onClick={handleBack}
                                                style={{marginRight: 4, border: '1px solid black' }}
                                        >
                                            Back
                                        </button>
                                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Save</button>
                                    </div>
                                </form>
                            </div>


                        </div>


                    </div>

                </div>

            </section>
        </div>
        <SideNav/>
        <Footer/>
    </div>;
}

export default ReadingsForm;