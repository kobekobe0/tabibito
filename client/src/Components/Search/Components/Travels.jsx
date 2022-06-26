import {useEffect, useState} from 'react'
import axios from 'axios'
function Travels({userId, town, city, img}) {
    const [pfp, setPfp] = useState('')
    const [username, setUsername] = useState('')
    useEffect(() => {
        axios.get(`/user/${userId}`).then((res) => {
            setPfp(res.data.pfp)
            setUsername(res.data.name)  
        })
    },[])
  return (
    <div
    className="travels-results"
    key={img}
    >
        <img style={{width:"90%"}} src={`http://localhost:3000/${img.replace("uploads", "")}`} />
            <div>
                <img src={`http://localhost:3000/${pfp.replace(
                    'pfp', ''
                )}`} alt="" />
                <div>
                    <h4><span>{town}</span>, <span>{city}</span></h4>
                    <h5>{username}</h5>
                </div>
            </div>
        </div>
  )
}

export default Travels