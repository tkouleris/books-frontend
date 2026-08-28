import {useEffect, useState} from "react";
import {dashboard_data, display_page} from "../utils/http.jsx";
import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import Display from "../components/Display.jsx";
import '../../public/dist/js/pages/dashboard.js'
import $ from 'jquery';

function DashboardPage(){

    const [totalBooks, setTotalBooks] = useState(0)
    const [totalCurrentlyReading, setTotalCurrentlyReading] = useState(0)
    const [totalToRead, setTotalToRead] = useState(0)
    const [readPercentage, setReadPercentage] = useState()
    const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([])
    const [chartData, setChartData] = useState({
        'labels': [],
        'data':[],
    })

    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "hold-transition sidebar-mini layout-fixed";
        document.title = 'Books - Dashboard';

        dashboard_data(window.localStorage.token).then((response)=>{
            setTotalBooks(response.data.data.total_books)
            setTotalCurrentlyReading(response.data.data.total_currently_reading)
            setTotalToRead(response.data.data.total_to_read_books)
            setReadPercentage(response.data.data.read_percentage)
            setChartData(response.data.data.char_data)
        })

        display_page(window.localStorage.username).then((response) => {
            if (response.data.data && response.data.data.current_readings) {
                setCurrentlyReadingBooks(response.data.data.current_readings);
            }
        });
    }, []);

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{totalBooks}</h3>
                                    <p>Total Books</p>
                                </div>
                                <div className="icon">
                                    <i className="ion-ios-book-outline"/>
                                </div>
                                <div style={{height: 30}}></div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>
                                        {totalCurrentlyReading}
                                    </h3>
                                    <p>Currently Reading</p>
                                </div>
                                <div className="icon">
                                    <i className="ion-ios-bookmarks-outline"/>
                                </div>
                                <div style={{height: 30}}></div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{totalToRead}</h3>
                                    <p>Books In Reading List</p>
                                </div>
                                <div className="icon">
                                    <i className="ion-ios-list-outline"/>
                                </div>
                                <div style={{height: 30}}></div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>{readPercentage}%</h3>
                                    <p>Read Percentage</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph"/>
                                </div>
                                <div style={{height: 30}}></div>
                            </div>
                        </div>
                    </div>
                    {currentlyReadingBooks.length > 0 && (
                        <div className="row">
                            <div className="col-12">
                                <div className="card shadow-sm border-0">
                                    <div className="card-header bg-transparent border-0 pt-4">
                                        <h3 className="card-title font-weight-bold">
                                            <i className="fas fa-book-reader mr-2 text-primary"/>
                                            Currently Reading
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            {currentlyReadingBooks.map((reading, index) => (
                                                <div key={index} className="col-lg-4 col-md-6 mb-4">
                                                    <Display reading={reading} isCurrent={true} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header border-0">
                                    <h3 className="card-title">
                                        <i className="fas fa-calendar-alt mr-1"/>
                                        Books Read Per Year
                                    </h3>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="row mt-3">
                                        {chartData.labels.map((year, index) => (
                                            <div key={year} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
                                                <div className="year-stat-card text-center p-3">
                                                    <div className="year-label mb-2">{year}</div>
                                                    <div className="book-count-wrapper">
                                                        <span className="book-count">{chartData.data[index]}</span>
                                                        <span className="book-unit ml-1">books</span>
                                                    </div>
                                                    <div className="progress mt-2" style={{height: '4px'}}>
                                                        <div 
                                                            className="progress-bar bg-primary" 
                                                            role="progressbar" 
                                                            style={{
                                                                width: `${Math.min(100, (chartData.data[index] / (Math.max(...chartData.data) || 1)) * 100)}%`,
                                                                borderRadius: '2px'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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

export default DashboardPage;