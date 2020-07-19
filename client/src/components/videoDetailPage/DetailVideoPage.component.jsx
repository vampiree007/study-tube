import React, { useEffect, useState } from 'react'
import { List, Row, Col } from 'antd';
import ad from './../../assets/images/ad.jpg';
import BottomComponent from './sections/bottom.component';
import moment from 'moment';
import LikeDislike from './sections/likeDislike/likeDislike.component'
//import SubscribeButton from './sections/subscribeButton.component'
import axios from 'axios';
import SideVideo from './sections/sideVideo.component';
import Spinner from '../spinner/spinner.component';


function DetailVideoPage(props) {
    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])

    useEffect(() => {
        let isCancelled = false;
        axios.get(`http://localhost:8000/api/v1/video/getVideo/${videoId}`)
        .then(response => {
            if(response.data.success === 'true') {
                if(!isCancelled) setVideo(response.data.video[0])
            } else {
                alert('Failed to get video Info')
            }
        }).catch(ex => console.error(ex));

        return () => {
            isCancelled = true
        }
    }, [videoId])
    //this fixed the url issue --- only url changing no view change.
    //Issue got fixed because when url changes videoId changes, if we pass changed videoId to useeffect
    //the component will remount because useffect re runs on changing value passed in [value].

    if(Video.filePath){
        return (
            <Row style={{paddingBottom:'30px'}}>
                <Col lg={15} xs={24} key={Video._id}>
                    <div className="postPage" style={{ width: '100%', paddingBottom:'1rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
    
                        <List.Item actions={[]}>
                            <List.Item.Meta
                                title={<a className="videoTitle" href="https://ant.design">{Video.title}</a>}
                            />
                        </List.Item>
                        <div className="channel_data display_flex">
                            <div className="child">
                                <p> {moment(Video.createdOn).format('MMMM Do YYYY')} &nbsp;  | &nbsp;  {Video.views} views </p>
                            </div>
                            <div className="child">
                                <LikeDislike videoId={Video._id} />
                            </div>
                        </div>
                    <BottomComponent video={Video}/>
                    </div>
                    
                </Col>
                <Col lg={9} xs={24} className="side_panel">
                        <img className="ad_img" src={ad} style={{maxWidth:'100%'}} alt="ad"/>
                       <div className="sideHeading">
                           Next Video
                       </div>
                        <SideVideo/>
                </Col>
            </Row>
        )
    }
    return(
        <Spinner/>
    )
}

export default DetailVideoPage
