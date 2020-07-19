import React from 'react';
import SingleComment from '../singleComment/singleComment.component';
import { useState } from 'react';


function Reply(props){
    const [toggle, setToggle] = useState(false)
    let initialLength = 0
    props.commentList.map((comment)=>{
        if(props.parentWriter._id === comment.commentTo){
           initialLength = initialLength + 1
        }
        return initialLength
    })
    return(
        <div>
            <p onClick={()=> setToggle(!toggle)} style={{cursor:'pointer',marginLeft:'10px', marginTop:'5px', color:'teal', fontWeight:'500'}}> 
                View {initialLength} Replies
            </p>
            {
                toggle === true? 
                <div className="replies">
            {
                props.commentList.map((comment,i) => {
                    //console.log(props.parentWriter._id, comment.commentTo)
                    
                    if(props.parentWriter._id === comment.commentTo){
                        const newList = props.commentList.filter((comment) => {
                            return props.parentWriter._id !== comment.commentTo
                        });
                        return(
                                <SingleComment
                                key={i}
                                writer={comment}
                                addCommentToList={props.addCommentToList}
                                video={props.video}
                                me={props.me}
                                commentList={newList}
                                />
                        )
                    }
                    return null
                })
            }
            </div>
        
                :null

            }
        </div>
    )
}
export default Reply;