import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';
import '../videoDetailPage.css';

function SideVideo(){
    const [sideVideos, setAllVideo] = useState([])
    
    useEffect(() => {
            axios.get(`http://localhost:5000/api/v1/video`)
                .then(response => {
                if(response.data.success) {
                    setAllVideo(response.data.videos)
                } else {
                    alert('Failed to get video Info')
                }
            }).catch(err => console.log(err))
    }, [])
    const SideVideoItem = sideVideos.map((video, index) => {
        return(
            <div>
                <div className="sideCard" key={video._id}>
                    <img src="" alt=""/>
                        <Link to={`/video/${video._id}`}>
                            <div className="sideVideoCard">
                                <img src={`http://localhost:5000/${video.thumbnail}`} alt={index}/>
                                <div className="sideVideoCard-data">
                                    <span className="title"><h2>{video.title}</h2></span>
                                    <span className="writor">{video.writer.firstName} {video.writer.lastName}</span>
                                    <div className="flex_box">
                                        <span className="views">{video.views}views</span>
                                        <span className="time"> {`${moment(video.createdOn- Date.now()).minutes()}`} ago</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                   </div>
        
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