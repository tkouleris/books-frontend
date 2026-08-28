import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {addToToReadList, deleteBook, deleteFromToReadList, fetchBooks} from "../utils/http.jsx";

function MyBooks() {
    const navigate = useNavigate();

    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchTitle, setSearchTitle] = useState()

    useEffect(() => {
        document.title = 'Books';
        fetchBooks(window.localStorage.token, 1).then(res => {
            setBooks(res.data.data.books)
            setCurrentPage(res.data.data.current_page)
            setTotalPages(res.data.data.total_pages)
        })
    }, []);


    function goToBookForm() {
        navigate('/book');
    }

    function deleteHandler(id) {
        if (confirm('Are you sure you want to delete this book?')) {
            deleteBook(window.localStorage.token, id).then(res => {
                if (res.data.success) {
                    fetchBooks(window.localStorage.token).then(res => {
                        setBooks(res.data.data)
                    })
                }
            })
        }
    }

    function goToEditBook(bookId) {
        navigate('/book/' + bookId);
    }

    function pageHandler(event, page) {
        event.preventDefault()
        setCurrentPage(page)
        fetchBooks(window.localStorage.token, page).then(res => {
            setBooks(res.data.data.books)
            setCurrentPage(res.data.data.current_page)
            setTotalPages(res.data.data.total_pages)
        })
    }

    function handleSearch(){
        fetchBooks(window.localStorage.token, 1, searchTitle).then(res => {
            setBooks(res.data.data.books)
            setCurrentPage(res.data.data.current_page)
            setTotalPages(res.data.data.total_pages)
        })
    }

    function addToReadListHandler(bookId){
        addToToReadList(window.localStorage.token, bookId).then(() => {
            fetchBooks(window.localStorage.token, currentPage).then(res => {
                setBooks(res.data.data.books)
                setCurrentPage(res.data.data.current_page)
                setTotalPages(res.data.data.total_pages)
            })
        })
    }

    function removeFromReadListHandler(bookId){
        deleteFromToReadList(window.localStorage.token, bookId).then(() => {
            fetchBooks(window.localStorage.token, currentPage).then(res => {
                setBooks(res.data.data.books)
                setCurrentPage(res.data.data.current_page)
                setTotalPages(res.data.data.total_pages)
            })
        })
    }

    function toReadIcon(book){
        if(book.toread) {
            return <button className="btn btn-sm btn-link p-0 mr-3"
                      style={{color: "#ff0000", fontSize: '1.2rem'}}
                      onClick={() => removeFromReadListHandler(book.id)}
            >
                <i className="fas fa-heart"></i>
            </button>
        } else {
            return <button className="btn btn-sm btn-link p-0 mr-3"
               style={{color: "#ccc", fontSize: '1.2rem'}}
               onClick={() => addToReadListHandler(book.id)}
            >
                <i className="far fa-heart"></i>
            </button>
        }
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
                        <div className="col-sm-3">

                            <h1 className="m-0">My Books
                                <button type="button" style={{marginLeft: 10}} onClick={goToBookForm}
                                        className="btn btn-success">
                                    <i className="fas fa-plus-square"></i>
                                </button>
                            </h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="input-group rounded">
                                <input type="search" className="form-control rounded"
                                       onChange={(e) => setSearchTitle(e.target.value)}
                                       onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        handleSearch();
                                }} placeholder="Search"
                                       aria-label="Search" aria-describedby="search-addon"/>
                                <span className="input-group-text border-0" id="search-addon">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">

                        {
                            books.map((book, index) => {
                                return (
                                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                        <div className="card h-100 shadow-sm border-0">
                                            <div className="card-header bg-transparent border-0 pt-3 d-flex justify-content-between align-items-center">
                                                <h5 className="card-title font-weight-bold text-truncate mb-0" style={{maxWidth: '80%'}} title={book.title}>{book.title}</h5>
                                                {toReadIcon(book)}
                                            </div>
                                            <div className="card-body py-0 text-center">
                                                <img alt={book.title} 
                                                     className="img-fluid rounded shadow-sm"
                                                     style={{width: '100%', height: '300px', objectFit: 'cover'}}
                                                     src={book.image}/>
                                            </div>
                                            <div className="card-footer bg-transparent border-0 pt-3 d-flex justify-content-between">
                                                <button className="btn btn-sm btn-outline-primary px-3" onClick={() => goToEditBook(book.id)}>
                                                    <i className="fas fa-edit mr-1"></i> Edit
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger px-3"
                                                   onClick={() => deleteHandler(book.id)}>
                                                    <i className="fa fa-trash mr-1" aria-hidden="true"></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }

                    </div>
                    <div className="row">
                        <div onClick={(e) => pageHandler(e, 1)} style={{paddingLeft: 5, paddingRight: 5}}><a
                            href="">Start</a></div>
                        {listItems}
                        <div onClick={(e) => pageHandler(e, totalPages)} style={{paddingLeft: 5, paddingRight: 5}}><a
                            href="">End</a></div>
                    </div>
                </div>

            </section>
        </div>
        <SideNav/>
        <Footer/>
    </div>;
}

export default MyBooks;