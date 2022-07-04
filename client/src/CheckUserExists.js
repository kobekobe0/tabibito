import jwt_decode from 'jwt-decode'
import axios from 'axios'
export const CheckUserExistsHome = (setId, setVisit, setUser) => {
    const token = window.localStorage.getItem('user')
    const url = window.location.href
    if (url.includes('profile')) {
        //extract id in url
        const id = url.split('/')
        const length = id.length - 1
        setId(id[length])
        setVisit(true)
    } // change Home component's route to profile/:id
    if (token) {
        //decode jwt token
        let userData = jwt_decode(token)

        setUser(userData)
        if (!userData) {
            window.localStorage.removeItem('user')
            window.location.href = '/login'
        }
    } else {
        window.location.href = '/login'
    }
}
export const CheckUserExistsOther = () => {
    const token = window.localStorage.getItem('user')
    if (token) {
        const decoded = jwt_decode(token)
        let exists = false
        axios
            .get(`/user/${decoded.id}`)
            .then((res) => {
                if (res.data.status === 404) {
                    exists = false
                } else {
                    exists = true
                }

                if (!exists) {
                    window.localStorage.removeItem('user')
                    window.location.href = '/login'
                }
            })
            .catch((err) => {
                console.log(err) //redirect to error page
            })
    } else {
        window.location.href = '/login'
    }
}
