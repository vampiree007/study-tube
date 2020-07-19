const INITIAL_STATE = {
    currentUser: null,
    isAuth: false
};
// Equals to setting this.state.currentUser = null

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOGIN_USER' :
            return {
                ...state,
                currentUser: action.payload.data.user,
                isAuth: action.payload.isAuth
            }
        case 'SIGNUP_USER' :
            return {
                ...state,
                currentUser: action.payload,
                isAuth: action.payload.isAuth
            }
        case 'AUTH_USER':
            return {...state, 
                currentUser: action.payload,
                isAuth: action.payload.isAuth
            }
        case 'LOGOUT_USER':
            return {...state, 
                currentUser: null,
                isAuth: false
            }
        default: 
            return state
    }
};
//(state = INITIAL_STATE) sets state to value of INITIAL, Thus INITIAL_STATE becomes this.state in userReducer() reference.
//(action) - action here refers to any stimulus by user
//action.type - specific parameter to call a particular reducer based on value of type in action.

export default userReducer;

//WORKFLOW//
// 1. action goes to all the reducers one by one and checks which one of these has case value set to action.type value
// 2. when action.type === case.value -- function gets executed else default is return
// 3. default returns state whch is equal to default state value