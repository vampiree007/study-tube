import React from 'react';
import { useSelector} from "react-redux";

export default function (ComposedClass, access, load, isAdmin = false) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user.currentUser);
        //console.log(access,load)

            if(user === null || user.isAuth === false){
                if(access === 'isAuth') props.history.push('/login')
                if (access === 'noAuth') {
                    return (
                        <ComposedClass {...props} user={user} />
                    )
                }
            } 
            if(user !== null && user.isAuth===true){
                if(load === false) props.history.push('/')
            }
       
        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


