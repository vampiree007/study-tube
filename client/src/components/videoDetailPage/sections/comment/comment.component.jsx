import React, {useState, useEffect} from 'react';
import './comment.styles.css';
import SingleComment from './singleComment/singleComment.component';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import {useSelector} from 'react-redux';


function CommentPlugin(props){
    const user = useSelector(state => state.user.currentUser)
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState(null);
    useEffect(()=>{
        if(props.video._id) {
            axios.get(`http://localhost:5000/api/v1/comment/${props.video._id}`)
                .then(response => {
                    if(response.data.status === 'success') {
                        setCommentList(response.data.comments)
                    }
                }).catch(ex => console.error(ex));
        }  
    }, [props.video._id])

    const handleChangeC = (event) => {
        const {value} = event.currentTarget;
        setComment(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(user === null) return alert('you need to sign in to post comment')
        const me = user._id || user.user._id
        const data ={
            comment,
            postId: props.video._id,
            writer: me
        }
        axios.post(`http://localhost:5000/api/v1/comment/saveComment`, data)
                .then(response => {
                    if(response.data.status === 'success') {
                        console.log(response.data.comment)
                        addCommentToList(response.data.comment)
                        setComment("")
                    }else{
                        addCommentToList([]) 
                    }
                }).catch(ex => console.error(ex));
    }
    const addCommentToList =(data) => {
        setCommentList(commentList.concat(data))
    }
    if(commentList !== null){
        return(
            <div>
                <div className="comment_plugin">
                    <div className="comment_count display_flex">
        <div className="count">{commentList.length} {commentList.length > 1? 'Comments' : 'Comment'} </div>
                        <div className="sort">SORT BY</div>
                    </div>
                    <div className="create_comment display_flex">
                        <Avatar size="large"  icon={<UserOutlined />} className="avatar" />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <textarea
                                className="input_comment"
                                type="textarea" 
                                name="comment" 
                                id="comment"  
                                value={comment}
                                placeholder="Add a public comment"
                                onChange={handleChangeC}
                                />
                            </div>
                            <div className="comment_button">
                            {
                                comment.length > 0? 
                                <button 
                                    className={`${comment.length >0 ? 'blue_button submit_comment':'submit_comment'}`}
                                    onClick={handleSubmit}> COMMENT 
                                </button>
                                : null
                            }
                            </div>
                        </form>
                    </div>
                    <div className="comments">
                        {
                            commentList.map((comment, i) => {
                                
                            return  (
                                <div key={i}>
                                    { !comment.commentTo && 
                                        <SingleComment 
                                        writer={comment}
                                        addCommentToList={addCommentToList}
                                        video={props.video}
                                        commentList={commentList} 
                                        me={user}
                                    />}
                                </div>
                            )
                                
                            })
                        }
                    </div>
                </div>
            </div>
        ) 
    }
    return(
        <div>loading..</div>
    )
}
export default CommentPlugin;