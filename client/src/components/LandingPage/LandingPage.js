import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';
import Sidebar from './sidebar/sidebar.componnt';
import LabelBottomNavigation from './bottomnaviation/bottomnavigation.component';
import TopPart from './top_part/topPart.component';
import './landingpage.styles.css';
const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {

    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/v1/video')
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])




    const renderCards = Videos.map((video, index) => {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col style={{marginBottom:'30px'}} lg={6} md={8} xs={24} key={index}>
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
                    <Avatar size="large" className="teal_color" 
                    src={video.writer && video.writer.image}
                    style={{fontWeight:'600', fontSize:'17px'}}>
                        {video.writer.firstName.split('')[0].toUpperCase()}
                    </Avatar>
                }
                title={video.title}
            />
            <div>
            <span style={{textTransform:'capitalize'}}>{video.writer.firstName} {video.writer.lastName} </span><br />
            <span style={{ marginLeft: '3.5rem' }}> {video.views} views</span>
            &nbsp; <span style={{fontWeight:'800'}}>&#183;</span> &nbsp;<span>{moment(video.createdAt).format("MMM Do YY")} </span>
            </div>
        </Col>
    })



    return (
        <div>
            <div style={{display:'flex'}}>
            <Sidebar />
            <div style={{ width: '91%', margin:'0 auto' }}>
                
                <div style={{margin: '.8rem auto' }}>
                <div className="categories">
                    <div className="category">
                        All
                    </div>
                    <div className="category">
                        Javascript
                    </div>
                    <div className="category">
                        Javascript
                    </div>
                    <div className="category">
                        Javascript
                    </div>
                    <div className="category">
                        Javascript
                    </div>
                    <div className="category">
                        Javascript
                    </div>
                    <div className="category">
                        Javascript
                    </div>
                    <div className="category">
                        Javascript
                    </div><div className="category">
                        Javascript
                    </div>
                </div>
                <TopPart video={Videos[0]}/>
                <Title level={4} > Recommended </Title>

                <Row gutter={16}>
                    {renderCards}
                </Row>
            </div>
            </div>
            <LabelBottomNavigation/>
            </div>
        </div>
    )
}

export default LandingPage
