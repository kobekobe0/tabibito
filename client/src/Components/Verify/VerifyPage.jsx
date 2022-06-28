import { useParams } from 'react-router-dom'
import { AiOutlineWarning } from 'react-icons/ai'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './VerifyPage.css'
const NotFound = () => {
    return (
        <div className="verification-page">
            <h1>404</h1>
            <p className="error">
                Ticket not found <AiOutlineWarning color="tomato" />
            </p>
            <p className="suggestion">
                Try{' '}
                <span
                    style={{
                        cursor: 'pointer',
                        color: 'blue',
                        borderBottom: 'solid 1px blue',
                    }}
                    onClick={() => (window.location.href = '/login')}
                >
                    logging in
                </span>{' '}
                again
            </p>
        </div>
    )
}

function VerifyPage() {
    const [code, setCode] = useState('')
    const { ticketId } = useParams()
    const [notFound, setNotFound] = useState(false)
    const [email, setEmail] = useState('')
    const [isVerified, setIsVerified] = useState(false)

    useEffect(() => {
        axios
            .get(`/verify/${ticketId}`)
            .then((res) => {
                console.log(res.data)
                if (res.data.status == 400) {
                    return setNotFound(true)
                }
                setEmail(res.data.ticket.email)
                setIsVerified(res.data.ticket.isVerified)
            })
            .catch((err) => {
                setNotFound(true)
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios
            .post(`/verify`, {
                code: code,
                ticketId: ticketId,
            })
            .then((res) => {
                if (res.data.status == 200) {
                    //show a modal that says "verification successful"
                    window.location.href = '/login'
                } else {
                    //show a modal that says "verification failed"
                    alert('Verification failed') //placeholder
                }
            })
    }

    if (notFound) return <NotFound />

    return (
        <div className="verification-page">
            <h1>Verify Email</h1>
            <p className="verification-instruction">
                verification code is sent to this email: <span>{email}</span>
            </p>
            {isVerified ? (
                <p>
                    ALREADY VERIFIED.{' '}
                    <span
                        style={{
                            cursor: 'pointer',
                            color: 'blue',
                            borderBottom: 'solid 1px blue',
                        }}
                        onClick={() => (window.location.href = '/login')}
                    >
                        Log in.
                    </span>
                </p>
            ) : (
                <div className="field">
                    <input
                        maxLength={5}
                        type="text"
                        placeholder="Enter your verification code."
                    />
                    <div className="line"></div>
                    <button>Submit</button>
                </div>
            )}
        </div>
    )
}

export default VerifyPage
