import { useLoaderData } from 'react-router-dom'
import icon1 from '../assets/avatars/icon1.png'
import icon2 from '../assets/avatars/icon2.png'
import icon3 from '../assets/avatars/icon3.png'
import icon4 from '../assets/avatars/icon4.png'
import icon5 from '../assets/avatars/icon5.png'
import icon6 from '../assets/avatars/icon6.png'
import icon7 from '../assets/avatars/icon7.png'
import icon8 from '../assets/avatars/icon8.png'
import icon9 from '../assets/avatars/icon9.png'
import icon10 from '../assets/avatars/icon10.png'

import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { activeUser } from "../utils/helpers/common.js"
import { deleteHiker } from '../utils/actions/hiker.js'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CreateHiker from './CreateHiker.jsx'
import TimeStamp from './TimeStamp.jsx'

export default function Profile() {
    // Set Profile Pic to local storage AND state
    // Setting to state allows for real-time update of iomage when choosing
    const [userImage, setUserImage] = useState(getUserImage)

    const user = activeUser()
    const navigate = useNavigate()

    function getUserImage() {
        return localStorage.getItem('profile-pic')
    }

    function chooseUserImage(img) {
        localStorage.setItem('profile-pic', img)
        setUserImage(img)
    }

    const avatars = [
        icon1,
        icon2,
        icon3,
        icon4,
        icon5,
        icon6,
        icon7,
        icon8,
        icon9,
        icon10,
    ]


    const data = useLoaderData()
    const { reviews, hikers, trails } = data



    async function handleDelete(id) {
        console.log('ID -->', id)
        try {
            const res = await deleteHiker(id)
            console.log(res)
            if (res?.status === 302) {
                navigate('/profile')
                console.log('deleted')
            } else {
                console.log('Failed to Delete')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const [deleteStates, setDeleteStates] = useState(hikers.map(() => false));


    const handleDeleteShow = (index) => {
        setDeleteStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    const optionsRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setDeleteStates(new Array(hikers.length).fill(false))
            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [hikers.length])

    const [showHikerCreate, setShowHikerCreate] = useState(false)
    const handleHikerCreateClose = () => setShowHikerCreate(false)
    const handleHikerCreateShow = () => setShowHikerCreate(true)

    return (
        <>
            <CreateHiker showHikerCreate={showHikerCreate} handleHikerCreateClose={handleHikerCreateClose} avatars={avatars} />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Header>
                    <Modal.Title>Select Avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body><div>
                    {avatars.map((img, idx) => {
                        return (
                            <img
                                key={idx}
                                src={img}
                                alt={`Avatar Image ${idx + 1}`}
                                className="avatar-img"
                                onClick={() => chooseUserImage(img)} />
                        )
                    })}
                </div></Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>Confirm</Button>
                </Modal.Footer>
            </Modal>

            {/* Use localsotrage setting and gettign to keep the profile picture */}
            <article className="profile-top">
                <div className="user-zone">
                    <img id="pfp" src={userImage} alt="Selected Image"/>
                    <button onClick={handleShow}>Select Profile Picture</button>
                </div>
                <section className="hiker-display">
                    <button onClick={handleHikerCreateShow}>Create Hiker</button>
                    <div className="hiker-card-box">
                        {hikers.map((hiker, index) => (
                            user.user_id === hiker.owner ? (
                                <>
                                    <div className="hiker-card" ref={optionsRef} key={index}>
                                        <img src={hiker.picture} alt="hiker img" />
                                        <div className="name-options">
                                            <p key={hiker.id}>{hiker.name}</p>
                                            <p className="hiker-options" onClick={() => {
                                               handleDeleteShow(index)
                                            }}>&#8942;</p>
                                            {deleteStates[index] && (
                                                <div className="hiker-options">
                                                    <p onClick={() => {
                                                        handleDelete(hiker.id)
                                                
                                                    }}>Delete</p>
                                                </div>
                                            )}
                                        </div>
                                    
                                    {/* Below creates a separate deletion confirmation modal for each individual hiker so it has access to the hiker id for deletion */}
                                    {/* <Modal
                                        show={showDelete}
                                        onHide={handleDeleteClose}
                                        backdrop="static"
                                        keyboard={false}>
                                        <Modal.Header>
                                            <Modal.Title>Deletion Confirmation</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to Delete {hiker.name}?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleDeleteClose}>Cancel</Button>
                                            <Button variant="danger" onClick={() => {
                                                handleDeleteClose()
                                                // handleDelete(hiker.id)
                                                console.log(hiker.id)
                                            }}>Delete</Button>
                                        </Modal.Footer>
                                    </Modal> */}
                                    </div>
                                </>
                            ) : (
                                null
                            )
                            
                        ))}
                    </div>
                </section>
            </article>

            <section className="profile-reviews-box">
                <h3>Trails Reviewed</h3>
                <div className="profile-reviews">
                    {reviews
                        .filter(review => user.user_id === review.owner.id)
                        .map(review => {
                            const matchingTrail = trails.find(trail => trail.id === review.trail.id);

                            if (matchingTrail) {
                                return (

                                    <div key={review.id} className="profile-review">
                                        <p className="profile-review-text"><Link to={`/trails/${review.trail.id}`}>{review.trail.name}</Link>- {review.text}</p>
                                        <TimeStamp timestamp={review.created_at} />
                                    </div>

                                );
                            }

                            return null;
                        })}




                </div>
            </section>
        </>
    )
}
