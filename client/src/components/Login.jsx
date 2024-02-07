import { useEffect } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import { setToken } from "../utils/helpers/common"

export default function LoginPage() {
    const res = useActionData()
    const navigate = useNavigate()


    useEffect(() => {
        if (res?.status === 200) {
            console.log(res.data)
            setToken(res.data.access)
            navigate('/')
        }
    }, [res, navigate])
    
    // Want this to be a modal
    return (
        <>
            <h1 className="text-center bold display-3 mb-4">Login</h1>
            <Form className='form' method="POST">
                <input type="text" name="username" placeholder='Username' />
                <input type="password" name="password" placeholder="Password" />
                <button className='btn btn-pink' type="submit">Login</button>
                {res && <p className='danger'>{res.data.message}</p>}
            </Form>
        </>
    )

}