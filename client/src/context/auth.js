import React, {useReducer, createContext} from 'react';
import jwtDecode from 'jwt-decode';
import Axios from 'axios';

const initialState = {
    user: null
};

if (localStorage.getItem('JWT')) {
    const decodedToken = jwtDecode(localStorage.getItem('JWT'));

    if (decodedToken.expiry < Date.now()) {
      localStorage.removeItem('JWT');
    } else {
      initialState.user = decodedToken.user;
    }
}

const AuthContext = createContext({
    user: null,
    login: (token) => {},
    logout: () => {}
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    function login(email, password) {
        Axios({
            method: 'POST',
            url: '/api/user/login', 
            data: { email: email, password: password }
          }, {withCredentials: true})
          .then((response) => {
            const token = response.data.token;
            const userData = jwtDecode(token).user;

            localStorage.setItem('JWT', token);
            
            dispatch({
                type: 'LOGIN',
                payload: userData
            });
          })
          .catch((error) => {
            console.error(error);
          });
    }

    function logout() {
        localStorage.removeItem('JWT');
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider };

