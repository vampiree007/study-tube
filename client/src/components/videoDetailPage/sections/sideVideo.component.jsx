import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../videoDetailPage.css'

function SideVideo(){
    const [sideVideos, setAllVideo] = useState([])
    useEffect(() => {
            axios.get(`http://localhost:5000/api/v1/video`)
            .then(response => {
            if(response.data.success) {
                //console.log(response.data.videos)
                setAllVideo(response.data.videos)
            } else {
                alert('Failed to get video Info')
            }
        })
    }, [])

    const SideVideoItem = sideVideos.map((video, index) => {
        return(
                <div className="sideCard" key={video._id}>
                        <Link to={`/video/${video._id}`}>
                            <div className="sideVideoCard">
                                <img src={`http://localhost:5000/${video.thumbnail}`} alt={index}/>
                                <div className="sideVideoCard-data">
                                    <span className="title"><h2>{video.title}</h2></span>
                                    <span className="writor">vikrant morris</span>
                                    <div className="flex_box">
                                        <span className="views">390 views</span>
                                        <span className="time">1 month ago</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                   </div>
        )
    })


    return(
        <React.Fragment>
            {SideVideoItem}
        </React.Fragment>
    )
}
export default SideVideo;