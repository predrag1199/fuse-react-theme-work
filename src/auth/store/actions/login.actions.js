import firebaseService from 'firebaseService';
import jwtService from 'jwtService';
import * as UserActions from 'auth/store/actions/user.actions';
import * as Actions from 'store/actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({email, password})
{

    const server_query = window.location.search.substring(1).split('=')[1];
    if (server_query === "prod") {
        localStorage.setItem('env', 'production');
    } else if (server_query === 'stag') {
        localStorage.setItem('env', 'staging')
    } else {
        localStorage.setItem('env', 'production');
    }

    return (dispatch) =>
        jwtService.signInWithEmailAndPassword(email, password)
            .then((user) => {
                    // console.log(user);

                    // dispatch(setUserDataEmailPassword(user));
                    var userData = {
                        role: 'admin',
                        from : 'email&password',
                        data: {
                            groups: user.groups,
                            displayName: user.displayname,
                            email      : user.email,
                            photoURL   : user.imageurl
                        }
                    };

                    if (user.groups && user.groups.includes('ADMIN')) {
                        userData.role = 'admin';
                    } else {
                        userData.role = 'guest';
                    }

                    window.localStorage.setItem('user', JSON.stringify(userData));

                    dispatch(UserActions.setUserData({
                        data: {
                            displayName: user.displayname,
                            email      : user.email,
                            photoURL   : user.imageurl,
                            groups     : user.groups
                        }
                    }));

                    dispatch(UserActions.setUserData({
                        role: userData.role
                    }));

                    return dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error
                });
            });
}

export function submitLoginWithFireBase({username, password})
{
    return (dispatch) =>
        firebaseService.auth && firebaseService.auth.signInWithEmailAndPassword(username, password)
            .then(() => {
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email',
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];
                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    username: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password: passwordErrorCodes.includes(error.code) ? error.message : null
                };

                if ( error.code === 'auth/invalid-api-key' )
                {
                    dispatch(Actions.showMessage({message: error.message}));
                }

                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: response
                });
            });
}
