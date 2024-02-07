import { useNavigate, useLoaderData, Link } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { deleteTrail } from "../utils/actions/trail"
import { deleteReview } from "../utils/actions/review"
import { activeUser } from "../utils/helpers/common.js"
import EditTrail from "./EditTrail.jsx"
import { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import StarRating from "./StarRating.jsx"
import TimeStamp from "./TimeStamp.jsx"
import { getWeather } from "../utils/loaders/weather.js"

export default function SingleTrail() {


    const user = activeUser()
    const loadedData = useLoaderData()
    const { trail, hikers, reviews } = loadedData
    const navigate = useNavigate()



    async function handleDelete(id) {
        console.log(id)
        try {
            const res = await deleteTrail(id)
            if (res?.status === 204) {
                navigate('/trails')
            } else {
                console.log('Failed to delete')
            }
        } catch (error) {
            console.log(error)
        }
    }


    async function handleReviewDelete(id) {
        try {
            const res = await deleteReview(id)
            if (res?.status === 302) {
                navigate(`/trails/${trail.id}`)
            } else {
                console.log('Failed to delete review')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const reviewsForHere = reviews.filter(review => {
        if (review.trail.id === trail.id) {
            return review
        }
    })


    const [showEdit, setShowEdit] = useState(false)
    const handleEditClose = () => setShowEdit(false)
    const handleEditShow = () => setShowEdit(true)

    const [showDelete, setShowDelete] = useState(false)
    const handleDeleteClose = () => setShowDelete(false)
    const handleDeleteShow = () => setShowDelete(true)



    const [showOptions, setShowOptions] = useState(null)

    const toggleOptions = (index) => {
        setShowOptions(showOptions === index ? null : index)
    }

    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getWeather([trail.region]);
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <EditTrail showEdit={showEdit} handleEditClose={handleEditClose} />
            {/* <ReviewTrail showReview={showReview} handleReviewClose={handleReviewClose} /> */}


            <Container fluid>
                <Row className="single-container">
                    <div className="single-top">
                        <Col className="trail-info" xs={12} md={6} lg={4}>
                            <h1>{trail.name}</h1>
                            <section className="trail-data">
                                {user && user.user_id === trail.owner ?
                                    <>
                                        <button className="trail-single-buttons" onClick={() => handleDeleteShow()}>Delete Trail</button>
                                        <button className="trail-single-buttons" onClick={handleEditShow}>Edit Trail</button>
                                    </>
                                    :
                                    <></>
                                }

                                <h2>{trail.region.name}</h2>
                                <img className="single-trail-image" src={trail.image} alt="Trail Image" />
                                <StarRating />
                                <div className="stats-n-weather">
                                    <div className="trail-detail-box">
                                        <div><span className="title">Distance:</span> {trail.length}km</div>
                                        <div><span className="title">Elevation:</span> {trail.elevation}m</div>
                                        <div><span className="title">Descent:</span> {trail.descent}m</div>
                                    </div>
                                    <div className="weather">
                                        {weatherData && weatherData.forecast.forecastday[0] ?
                                            <>
                                            <h4>Weather</h4>
                                            <p><span>Current Condition: </span>{weatherData.forecast.forecastday[0].day.condition.text}</p>
                                                <p><span>Current Temperature (C): </span>{weatherData.forecast.forecastday[0].day.avgtemp_c}</p>
                                            </>
                                            :
                                            <>
                                            <p>No data found for trail location</p>
                                            </>
                                        }

                                    </div>
                                </div>
                            </section>

                        </Col>
                        <Col className="hikers-reviews-side" xs={12} md={6} lg={8}>
                            <h3>Your Hikers</h3>
                            <div className="hiker-box">
                                {hikers.map(hiker => {
                                    if (user && user.user_id === hiker.owner) {
                                        let stride = (((hiker.height * 100) / 2.54) * 0.413) * 2.54
                                        let steps = Math.ceil((trail.length * 100000) / stride)
                                        let duration = (trail.length / (hiker.ability) * 1.609)
                                        let totalMinutes = Math.floor(duration * 60) + (trail.elevation / 10) - (trail.descent / 30)
                                        let hours = Math.floor(totalMinutes / 60)
                                        let minutes = Math.floor(totalMinutes % 60)

                                        return (
                                            <div key={hiker.id} className="hiker-container">
                                                <img className="single-view-avatar" src={hiker.picture} alt="hiker image" />
                                                <p><span className="hiker-name">{hiker.name}</span>: {steps} steps : {hours}hrs {minutes}mins</p>
                                            </div>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </Col>
                    </div>
                </Row>
                <Row>
                    <section className="reviews-section">
                        <div className="reviews-header">
                            <h4>REVIEWS</h4>
                            {/* <button onClick={handleReviewShow}>Add Review</button> */}
                            <Link className="add-review" to={`/trails/${trail.id}/review`}>Add Review</Link>
                        </div>
                        <section className="review-box">
                            {reviewsForHere.map((review, index) => (
                                <div key={review.id} className="review">
                                    <div className="review-letters">
                                        <p className="review-text">{review.text}</p>
                                        <div className="timestamp-container">
                                            <p>by {review.owner.username} at </p>
                                            <TimeStamp timestamp={review.created_at} />
                                        </div>
                                    </div>
                                    {user && user.user_id === review.owner.id && (
                                        <>
                                            <div
                                                className="review-options"
                                                onClick={() => toggleOptions(index)}
                                            >
                                                &#8942;
                                            </div>
                                            {showOptions === index && (
                                                <div className="options-dropdown">
                                                    <p onClick={() => handleReviewDelete(review.id)}>
                                                        Delete
                                                    </p>
                                                    {/* Add more options as needed */}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </section>
                    </section>
                </Row>
            </Container>

            <Modal
                show={showDelete}
                onHide={handleDeleteClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Deletion Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to Delete {trail.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>Cancel</Button>
                    <Button variant="danger" onClick={() => {
                        handleDeleteClose()
                        handleDelete(trail.id)
                    }}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
