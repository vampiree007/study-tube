import React from 'react';
import {Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import './sidebar.styles.css';

const Sidebar = () => {
    return (
        <div>
            <div className="sidebar">
                <div className="sidebar_toggle">
                    <div className="box-shadow-menu" />
                </div>
                <div className="sidebar_icon_container">
                <div className="icon">
                <Link to="/"><HomeIcon className="the_icon" /><p>Home</p></Link>
                </div>
                <div className="icon">
                <Link to="/subscriptions">
                <SubscriptionsIcon className="the_icon" /><p>Follows</p>
                </Link>
                </div>
                    
                <div className="icon"><WhatshotIcon className="the_icon" /><p>Hot</p></div>
                <div className="icon"><VideoLibraryIcon className="the_icon" /><p>Library</p></div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
