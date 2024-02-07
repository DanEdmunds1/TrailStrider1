import { useEffect, useState } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'


// eslint-disable-next-line react/prop-types
export default function CreateHiker({ showHikerCreate, handleHikerCreateClose, avatars }) {

    const res = useActionData()
    const navigate = useNavigate()

    useEffect(() => {
        if (res?.status === 201) {
            console.log('HIKER CREATED SUCCESSFULLY')
            navigate(`/profile`)
            handleHikerCreateClose()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [res, navigate])


    const [createHikerShow, setCreateHikerShow] = useState(showHikerCreate)

    useEffect(() => {
        setCreateHikerShow(showHikerCreate)
    }, [showHikerCreate])

    const [selectedImage, setSelectedImage] = useState(null);


    function selectHikerImg(img, index) {
        const avatarElements = document.querySelectorAll('.avatar-img')
        // eslint-disable-next-line react/prop-types
        avatarElements.forEach((avatar, i) => {
            if (i === index) {
                avatar.classList.add('selected')
            } else {
                avatar.classList.remove('selected')
            }
        })
        setSelectedImage(img)
    }

    function handleChange(e) {
        if (e.target.value) {
            e.target.classList.remove("empty")
            e.target.classList.add("valid")
        } else if (!e.target.value) {
            e.target.classList.remove("valid")
        }
    }

    function checkFields() {
        const name = document.getElementById('name')
        const height = document.getElementById('height')
        const ability = document.getElementById('ability')
        console.log("Checking Fields")

        if (!name.classList.contains('valid')) {
            name.classList.add('empty')
        }
        if (!height.classList.contains('valid')) {
            height.classList.add('empty')
        }
        if (!ability.classList.contains('valid')) {
            ability.classList.add('empty')
        }
    }

    // <a href="https://www.flaticon.com/free-icons/landscape" title="landscape icons">Landscape icons created by Freepik - Flaticon</a>


    return (
        <>
            <Modal
                show={createHikerShow}
                onHide={handleHikerCreateClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Create Your Hiker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='form' method="POST">
                        <label hidden htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" placeholder='Name' onChange={handleChange} />
                        <label hidden htmlFor="height">Height</label>
                        <input id="height" type="number" name="height" placeholder='Height' min="0" max="5" step="0.01" onChange={handleChange} />
                        <label hidden htmlFor="ability">Ability</label>
                        <select id="ability" name="ability" placeholder='Ability' onChange={handleChange}>
                            <option value="2">Casual Stroller</option>
                            <option value="3">Average</option>
                            <option value="4">Booking It</option>
                        </select>
                        <label hidden htmlFor="picture">Picture</label>
                        <input type="hidden" name="picture" placeholder='Picture' value={selectedImage || ''} />
                        <div>
                            <h5>Select Avatar</h5>
                            {/* eslint-disable-next-line react/prop-types */}
                            {avatars.map((img, idx) => {
                                return (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Avatar Image ${idx + 1}`}
                                        className='avatar-img'
                                        onClick={() => selectHikerImg(img, idx)}
                                        id={`image${idx}`} />
                                )
                            })}
                        </div>
                        {res?.data?.message && <p className='danger bold mt-4'>{res.data.message}</p>}
                        <button className="btn btn-pink" type="submit" onClick={() => {
                            checkFields()
                        }}>Create</button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}