import React, {useEffect} from 'react';
import './section.styles.css';
import axios from 'axios';
import { useSelector} from "react-redux";
import { useState } from 'react';

function SubscribeButton(props){
    const {setCount, count} = props;
    const [subscribeStatus, setSubscribeStatus] = useState(false)
    const user = useSelector(state => state.user.currentUser);
    //if(user !== null ) console.log(user._id, props.writer._id)

        useEffect(()=>{
            if(user !== null) {
                const data = { subscribeTo: props.writer._id, subscribeFrom: user._id}
                axios.post(`http://localhost:5000/api/v1/subscribe/subscribeCheck`, data )
                    .then(response => {
                        if(response.data.status === 'success') {
                            setSubscribeStatus(true)
                        }
                    }).catch(ex => console.error(ex));
            }  
        }, [props, user])

    const subscribe = () => {
        if(user !==null){
            const data = { subscribeTo: props.writer._id, subscribeFrom: user._id}
            axios.post(`http://localhost:5000/api/v1/subscribe/subscribeMe`, data )
            .then(response => {
                if(response.data.status === 'success') {
                    setSubscribeStatus(true);
                    setCount(count + 1)
                } else {
                    alert('Some Error Ocurred')
                }
            }).catch(err => console.error(err));
        }else{
            alert('login to subscribe')
        }
    }
    const unsubscribe = () => {
        const data = { subscribeTo: props.writer._id, subscribeFrom: user._id}
        axios.post(`http://localhost:5000/api/v1/subscribe/unsubscribeMe`, data )
        .then(response => {
            if(response.data.status === 'success') {
                setSubscribeStatus(false)
                setCount(count - 1)
            } else {
                alert('Some Error Ocurred')
            }
        }).catch(err => console.error(err));
    }


return(
    <div>
        <div className="subscribe-button">
            {
                subscribeStatus === false ? <h4 onClick={()=> subscribe()}>SUBSCRIBE</h4> : <h4 onClick={()=> unsubscribe()}>SUBSCRIBED</h4>
            }
        </div>
    </div>
)
}
export default SubscribeButton;