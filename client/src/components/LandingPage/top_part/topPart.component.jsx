import React from 'react';
import './topPart.styles.css';
const Ad = require('../../../assets/images/add_apple.png')
const Ad2 = require('../../../assets/images/ad.jpg')

const TopPart = (props) => {
    console.log(props.video)
    if(props.video){
        return (
            <div className="landing_page_top">
                <div className="video_part">
                    <video
                     src={`http://localhost:5000/${props.video.filePath}`} controls>
                     </video>
                </div>   
                <div className="adds_part">
                    <img src={Ad} alt="Ad"/>
                    <img src={Ad2} alt="AD2"/>
                </div>     
            </div>
        )
    }else{
        return(
            <div>loading.. .</div>
        )
    }
}

export default TopPart;
