import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './sections/sideVideo.component';


function DetailVideoPage(props) {


    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/video/getVideo/${videoId}`)
        .then(response => {
            if(response.data.success) {
                //console.log(response.data.video)
                setVideo(response.data.video[0])
            } else {
                alert('Failed to get video Info')
            }
        })
    }, [videoId])
    //this fixed the url issue --- only url changing no view change.
    //Issue got fixed because when url changes videoId changes, if we pass changed videoId to useeffect
    //the component will remount because useffect re runs on changing value passed in [value].

    return (
        <Row>
            <Col lg={15} xs={24} key={Video._id}>
                <div className="postPage" style={{ width: '100%', padding: '3rem 4em', paddingRight:'0rem' }}>
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

                    <List.Item
                        actions={[]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={Video.writer && Video.writer.image} />}
                            title={<a href="https://ant.design">{Video.title}</a>}
                            description={Video.description}
                        />
                        <div></div>
                    </List.Item>

                </div>
            </Col>
            <Col lg={9} xs={24} className="side_panel">
                   <div className="sideHeading">
                       Next Video
                   </div>
                    <SideVideo/>
            </Col>
        </Row>
    )
}

export default DetailVideoPage
