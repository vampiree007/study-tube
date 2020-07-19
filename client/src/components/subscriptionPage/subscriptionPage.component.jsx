import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import Spinner from '../spinner/spinner.component'
import axios from 'axios';
import moment from 'moment';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom';;
const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
    const user = useSelector(state => state.user)
    const [subscriptionVideos, setSubscriptionVideo] = useState([])

    useEffect(() => {
        if(user.currentUser !== null){
            if(user.currentUser){
                axios.get(`/api/v1/subscribe/subscriptions/${user.currentUser._id || user.currentUser.user._id}`)
                .then(response => {
                console.log(response.data)
                if (response.data.status === 'success') {
                    setSubscriptionVideo(response.data.videos)
                } else {
                    alert('No Subscriptions Found')
                }
            })
            }
        }else{console.log('no request')}
    }, [ user.currentUser])

    if(user !== null){
    const renderCards = subscriptionVideos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{ position: 'relative' }}>
                <Link to={`/video/${video._id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </Link>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })

        return (
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <Title level={2} > Subscription Videos </Title>
                <hr />
    
                <Row gutter={16}>
                    {renderCards}
                </Row>
            </div>
        )
    } else {
        return(
            <div className="div no_subscriptions"><Spinner/></div>
        )
    }
}

export default SubscriptionPage
