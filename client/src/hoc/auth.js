import { useEffect } from 'react';
import { auth } from '../redux/users/user.actions';
import { useSelector, useDispatch } from "react-redux";

export default function () {
    function AuthenticationCheck(props) {
        console.log('hey')
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then( response => {
                console.log(response.payload)
            })
            
        }, [dispatch, props.history, user.googleAuth])
    }
    return AuthenticationCheck
}


