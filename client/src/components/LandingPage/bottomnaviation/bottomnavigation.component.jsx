import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

const useStyles = makeStyles({
  root: {
    width: 500,
    position: 'fixed',
    bottom: 0,
    zIndex: 99
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <BottomNavigation value={value} onChange={handleChange} className={`bottom_nav ${classes.root}`}>
      <BottomNavigationAction label="Home" value="recents" icon={<HomeIcon />} />
      <BottomNavigationAction label="Subscription" value="favorites" icon={<SubscriptionsIcon />} />
      <BottomNavigationAction label="Hot" value="nearby" icon={<WhatshotIcon />} />
      <BottomNavigationAction label="Watchlater" value="folder" icon={<VideoLibraryIcon />} />
    </BottomNavigation>
  );
}