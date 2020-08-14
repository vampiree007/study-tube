import React, { useEffect, useState } from 'react'
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons';
import {useSelector} from 'react-redux';
import Axios from 'axios';

function LikeDislikes(props) {
    const user = useSelector(state => state.user.currentUser)
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    

    useEffect(() => {
        const {videoId, commentId} = props
        let token;
        if(videoId) token = {postId: videoId}
        if(commentId) token = {commentId}
        if(token){
            Axios.post(`/api/v1/like/getLikesAndDislikes`, token)
            .then(response => {
                if (response.data.status === 'success') {
                    setLikes(response.data.likeCounts.length)
                    setDislikes(response.data.dislikeCounts.length)
                    response.data.likeCounts.map(like => {
                        if(user !== null){
                            if (like.userId === user._id) {
                                setLikeAction('liked');
                            }
                        }
                        return null
                    });
                    response.data.dislikeCounts.map(like => {
                        if(user !==null){
                            if (like.userId === user._id) {
                                setDislikeAction('disliked')
                            }
                        }
                            return null
                    })
                } else {
                    console.log('Failed to get likes')
                    return null
                }
            })

        }
    }, [props, user])

    const makeChoice = async(choiceType) => {
        if(user === null) return alert('login to like or dislike');

        let variable = {};
            if (props.videoId) {
                variable = { postId: props.videoId, userId: user._id, choice: choiceType }
            } else {
                variable = { commentId: props.commentId, userId: user._id, choice: choiceType }
            }

            await Axios.post('/api/v1/like/create', variable)
                .then(response => {
                    if (response.data.status ==='success') {
                        if(response.data.choice === 'like'){
                            console.log('setting like')
                            setLikeAction("liked")
                            setDislikeAction(null)
                            setLikes(Likes + 1)
                            if(Dislikes > 0){
                                setDislikes(Dislikes - 1)
                            }
                        }
                        if(response.data.choice === 'dislike'){
                            setDislikeAction("disliked")
                            setLikeAction(null)
                            setDislikes(Dislikes + 1)
                            if(Likes > 0){
                                setLikes(Likes - 1)
                            }
                        }
                    } else {
                        console.log('Failed')
                    }
                })
    }


    return (
        <React.Fragment>
            <span key="comment-basic-like">
                {
                    LikeAction === 'liked'? <LikeFilled/> : <LikeOutlined onClick={()=>makeChoice('like')} />
                }
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                {
                    DislikeAction === 'disliked'? <DislikeFilled/> : <DislikeOutlined onClick={()=>makeChoice('dislike')} />
                }
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes