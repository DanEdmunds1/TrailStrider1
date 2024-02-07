import { useEffect, useState } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import ImageUpload from './ImageUpload'

// eslint-disable-next-line react/prop-types
export default function CreateTrail({ showCreate, handleCreateClose }) {
    const res = useActionData()
    const navigate = useNavigate()


    useEffect(() => {
        console.log(res)
        if (res?.status === 201) {
            console.log('CREATED SUCCESSFULLY')
            navigate(`/trails/${res.data.id}/`)
        }
    }, [res, navigate])

    const [formData, setFormData] = useState({
        name: '',
        length: '',
        elevation: '',
        descent: '',
        description: '',
        image: '',
        region: '',
    })

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (e.target.value) {
            e.target.classList.remove("empty")
            e.target.classList.add("valid")
        } else if (!e.target.value) {
            e.target.classList.remove("valid")
        }
    }

    function checkFields() {
        const name = document.getElementById('name')
        const length = document.getElementById('length')
        const elevation = document.getElementById('elevation')
        const descent = document.getElementById('descent')
        const description = document.getElementById('description')
        const image = document.getElementById('image')
        const region = document.getElementById('region')

        if (!name.classList.contains('valid')) {
            name.classList.add('empty')
        }
        if (!length.classList.contains('valid')) {
            length.classList.add('empty')
        }
        if (!elevation.classList.contains('valid')) {
            elevation.classList.add('empty')
        }
        if (!descent.classList.contains('valid')) {
            descent.classList.add('empty')
        }
        if (!description.classList.contains('valid')) {
            description.classList.add('empty')
        }
        if (!image.classList.contains('valid')) {
            image.classList.add('empty')
        }
        if (!region.classList.contains('valid')) {
            region.classList.add('empty')
        }
    }


    return (
        <>
            <Modal
                show={showCreate}
                onHide={handleCreateClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Create Trail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='form' method="POST">
                        <label hidden htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" placeholder='Name' onChange={handleChange} value={formData.name} />

                        <label hidden htmlFor="length">Length KM</label>
                        <input id="length" type="number" name="length" placeholder='Length KM' onChange={handleChange} value={formData.length} />

                        <label hidden htmlFor="elevation">Elevation M</label>
                        <input id="elevation" type="number" name="elevation" placeholder='Elevation M' onChange={handleChange} value={formData.elevation} />

                        <label hidden htmlFor="descent">Descent M</label>
                        <input id="descent" type="number" name="descent" placeholder='Descent M' onChange={handleChange} value={formData.descent} />

                        <label hidden htmlFor="description">Description</label>
                        <textarea id="description" name="description" placeholder='Description' onChange={handleChange} value={formData.description}></textarea>
                        <ImageUpload name="image" formData={formData} setFormData={setFormData} />
                        <label hidden htmlFor="image">Image</label>

                        {/* <input id="image" type="text" name="image" placeholder='Image' onChange={handleChange} /> */}

                <label hidden htmlFor="region">Region</label>
                <input type="text" name="region" placeholder='Region' />

                <input type="hidden" name="owner" placeholder='Owner' />

                <input type="number" name="difficulty" placeholder='Difficulty' />

                        {res?.data?.message && <p className='danger bold mt-4'>{res.data.message}</p>}

                        <button className="btn btn-pink" type="submit" onClick={checkFields}>Create</button>
                    </Form>
                </Modal.Body>
            </Modal>



        </>
    )
}