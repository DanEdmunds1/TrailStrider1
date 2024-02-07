import { useEffect } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'

export default function Register() {
    const res = useActionData()
    const navigate = useNavigate()
    console.log(res)

    useEffect(() => {
        if (res?.status === 201) {
            navigate('/login')
        }
    }, [res, navigate])


    return (
        <>
            <h1 className="text-center bold display-3 mb-4">Register</h1>
            <Form className='form' method="POST">
                <input type="text" name="username" placeholder='Username' />
                <input type="email" name="email" placeholder='Email' />
                <input type="password" name="password" placeholder='Password' />
                <input type="password" name="password_confirmation" placeholder='Confirm password' />
                <button className='btn btn-pink' type="submit">Register</button>
                {res && <p className='danger'>{res.data.message}</p>}
            </Form>
        </>
    )
}