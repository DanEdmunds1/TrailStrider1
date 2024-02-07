import { useEffect } from 'react'
import { Form, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
// eslint-disable-next-line react/prop-types
export default function EditTrail({ showEdit, handleEditClose }) {

    const res = useActionData()
    const data = useLoaderData()
    const { trail, hikers } = data
    console.log(hikers)

    const navigate = useNavigate()

    const formData = {
        name: trail.name,
        length: trail.length,
        elevation: trail.elevation,
        descent: trail.descent,
        description: trail.description,
        image: trail.image,
        region: trail.region
    }

    useEffect(() => {
        console.log(res)
        if (res?.status === 200) {
            console.log('UPDATED SUCCESSFULLY')
            navigate(`/trails/${res.data.id}/`)
            handleEditClose()

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [res, navigate])


    return (
        <>
            <Modal
                show={showEdit}
                onHide={handleEditClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Edit Trail</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className='form' method="POST">
                        <label hidden htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder='Name' defaultValue={formData.name} />

                        <label hidden htmlFor="length">Length KM</label>
                        <input type="number" name="length" placeholder='Length KM' defaultValue={formData.length} />

                        <label hidden htmlFor="elevation">Elevation M</label>
                        <input type="number" name="elevation" placeholder='Elevation M' defaultValue={formData.elevation} />

                        <label hidden htmlFor="descent">Descent M</label>
                        <input type="number" name="descent" placeholder='Descent M' defaultValue={formData.descent} />

                        <label hidden htmlFor="description">Description</label>
                        <textarea name="description" placeholder='Description' defaultValue={formData.description}></textarea>

                        <label hidden htmlFor="image">Image</label>
                        <input type="text" name="image" placeholder='Image' defaultValue={formData.image} />

                        <label hidden htmlFor="region">Region</label>
                        <input type="text" name="region" placeholder='Region' defaultValue={formData.region} />

                        {res?.data?.message && <p className='danger bold mt-4'>{res.data.message}</p>}

                        <button className="btn btn-pink" type="submit">Update</button>
                    </Form>
                </Modal.Body>

            </Modal>


        </>
    )
}
