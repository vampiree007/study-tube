import React, {useEffect, useState} from 'react';
import './section.styles.css';
import axios from 'axios';
import { Avatar } from 'antd';
import SubscribeButton from './subscribeButton.component';
import CommentPlugin from './comment/comment.component';

function BootomComponent(props){
    const [subscribeCount, setSubscribeCount] = useState(0)
    useEffect(()=>{
        if(props.video._id) {
            axios.get(`http://localhost:5000/api/v1/subscribe/subscribecount/${props.video.writer._id}`)
                .then(response => {
                    if(response.data.status === 'success') {
                        setSubscribeCount(response.data.count)
                    }
                }).catch(ex => console.error(ex));
        }  
    }, [props])
return(
    <div>
        <div className="bottom_info display_flex">
                <div className="display_flex channel_info">
                    <Avatar size="large" className="teal_color" 
                    src={props.video.writer && props.video.writer.image}
                    style={{fontWeight:'600', fontSize:'17px'}}>
                        {props.video.writer.firstName.split('')[0].toUpperCase()}
                    </Avatar>
                    <div className="writer_name">
                        {props.video.writer.firstName + ' ' + props.video.writer.lastName}
                    </div>
                    <div className="subscribers_count">
                        {subscribeCount} subscribers  
                    </div>
                </div>
                <SubscribeButton count={subscribeCount} setCount={setSubscribeCount} writer={props.video.writer}/>
        </div>

        <div className="bottom_description">
            <p>Join The FK-R tribe - https://www.fk-r.com</p>
            <p>{props.video.description}</p>

        </div>
        <CommentPlugin video={props.video} />
    </div>
)
}
export default BootomComponent;