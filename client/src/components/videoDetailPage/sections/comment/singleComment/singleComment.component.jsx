import React, {useState} from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from  'axios';
import Reply from './reply.component';

function SingleComment(props) {
    const {me, addCommentToList, video, writer, commentList} = props
    const [toggle, setToggle] = useState(false);

    const [replyValue, setComment] = useState("")

    const getfirstLetter = (word) => {
        const letter = word.split('')[0]
        return letter.toUpperCase()
    } 
    const handleChange = (event) => {
        const {value} = event.currentTarget;
        setComment(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(me === null) return alert('you need to sign in to post comment')
        const data ={
            comment: replyValue,
            postId: video._id,
            writer: me._id,
            commentTo: writer.writer._id
        }
        axios.post(`http://localhost:5000/api/v1/comment/saveComment`, data)
                .then(response => {
                    if(response.data.status === 'success') {
                        console.log(response.data.comment)
                        addCommentToList(response.data.comment)
                        setComment("")
                    }
                }).catch(ex => console.error(ex));
    }
    return(
        <div className="comment display_flex">
                    <Avatar size="large" className="avatar tango_color"> 
                        {getfirstLetter(writer.writer.firstName)} 
                    </Avatar>
                    <div className="commentor">
                        <div className="commentor_data display_flex">
                                <span className="commentor_name">
                                    {writer.writer.firstName + ' ' + writer.writer.lastName }
                                 </span>   
                                 4 weeks ago
                        </div>
                        <div className="commentor_comment">
                            <p>{writer.comment}</p>
                        </div>
                        {
                         <div className="reply" onClick={()=>setToggle(!toggle)}>
                            REPLY
                        </div>
                        }
                        { toggle ? <div className="create_comment display_flex">
                            <Avatar size="large" 
                            icon={<UserOutlined />}
                            className="avatar" />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <input 
                                    className="input_comment"
                                    type="text" 
                                    name="comment" 
                                    id="comment"  
                                    value={replyValue}
                                    placeholder="Add a public comment"
                                    onChange={handleChange}
                                    />
                                </div>
                                    <div className="comment_button">
                                    <button type="button" className='submit_comment cancel_button' onClick={()=> setToggle(!toggle)}> CANCEL </button>
                                    <button className={`${replyValue.length >0 ? 'blue_button submit_comment':'submit_comment'}`}> COMMENT </button>
                                    </div>
                            </form>
                        </div>:null}
                        < Reply 
                        commentList={commentList} 
                        parentWriter={writer.writer}
                        addCommentToList={props.addCommentToList}
                        video={props.video}
                        me={me}
                        />
                    
                    </div>
                </div>
    )
}
export default SingleComment;