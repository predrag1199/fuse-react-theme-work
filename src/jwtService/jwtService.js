import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';

var BASE_URL;

class jwtService extends FuseUtils.EventEmitter {

    init()
    {
        this.setInterceptors();
        this.handleAuthentication();

    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
                {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();

        if ( !access_token )
        {
            return;
        }

        if ( this.isAuthTokenValid(access_token) )
        {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        }
        else
        {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/register', data)
                .then(response => {
                    if ( response.data.user )
                    {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithEmailAndPassword = (email, password) => {

        var BASE_URL;

        if (localStorage.getItem('env') === 'production') {
            BASE_URL = 'https://yeboapi2.wavekrest.com';
        } else if (localStorage.getItem('env') === 'staging') {
            BASE_URL = 'https://staging.wavekrest.com';
        }

        console.log(BASE_URL);

        return new Promise((resolve, reject) => {

            axios.post(`${BASE_URL}/api/YeboUser/login`, {
                email,
                password
            }).then(response => {
                if ( response.data.token )
                {
                    this.setSession(response.data.token);
                    const userData = this.getUserData(response.data.token);

                    resolve(userData);
                }
                else
                {
                    reject({ success: false });
                }
            });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/auth/access-token', {
                data: {
                    access_token: this.getAccessToken()
                }
            })
                .then(response => {
                    if ( response.data.user )
                    {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    getApi = (url) => {
        return new Promise((resolve, reject) => {
            let access_token = this.getAccessToken();

            if ( !access_token )
            {
                return;
            }

            if ( this.isAuthTokenValid(access_token) )
            {
                axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                    }
                })
                    .then(response => {
                        if ( response.data )
                        {
                            resolve(response.data);
                        }
                        else
                        {
                            reject({ msg: 'Get data error' });
                        }
                    });
            }
            else
            {
                reject({ msg: 'Token is Invalid' });
            }
        });
    };

    saveApi = (url, params, type='post') => {
        return new Promise((resolve, reject) => {
            let access_token = this.getAccessToken();

            if ( !access_token )
            {
                return;
            }

            if ( this.isAuthTokenValid(access_token) )
            {
                if (type === 'put') {
                    axios.put(url, params, {
                        headers: {
                            "Authorization": `Bearer ${access_token}`,
                            "Content-Type": "application/json"
                        }
                    })
                        .then(response => {
                            if ( response.data )
                            {
                                resolve(response.data);
                            }
                            else
                            {
                                reject({ msg: 'Update data error' });
                            }
                        })
                        .catch(err => reject({ msg: err, success: false }));
                }
                else {
                    axios.post(url, {
                        headers: {
                            "Authorization": `BEARER ${access_token}`,
                            "Content-Type": "application/json"
                        },
                        data:  params
                    })
                        .then(response => {
                            if ( response.data )
                            {
                                resolve(response.data);
                            }
                            else
                            {
                                reject({ msg: 'Save data error' });
                            }
                        })
                        .catch(err => reject({ msg: err, success: false }));
                }

            }
            else
            {
                reject({ msg: 'Token is Invalid' });
            }
        });
    };

    signInWithGoogle = (tokenId) => {
        const server_query = window.location.search.substring(1).split('=')[1];
        if (server_query === "prod") {
            localStorage.setItem('env', 'production');
        } else if (server_query === 'stag') {
            localStorage.setItem('env', 'staging')
        } else {
            localStorage.setItem('env', 'production');
        }

        var BASE_URL;

        if (localStorage.getItem('env') === 'production') {
            BASE_URL = 'https://yeboapi2.wavekrest.com';
        } else if (localStorage.getItem('env') === 'staging') {
            BASE_URL = 'https://staging.wavekrest.com';
        }

        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/api/auth/google/${tokenId}`)
                .then(response => {
                    if (response.data) {
                        this.setSession(response.data.token);
                        this.getUserData(response.data.token).then(user => {
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

                            resolve({ success: true, role: userData.role,  msg: 'success' });

                        })
                    }
                    else {
                        reject({ success: true, msg: 'Google Authentication Error' });
                    }

                })
                .catch((err) => {
                    console.log('Google auth API: ', err)
                    reject(err)
                })
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    setSession = access_token => {
        if ( access_token )
        {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else
        {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if ( !access_token )
        {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if ( decoded.exp < currentTime )
        {
            console.warn('access token expired');
            return false;
        }
        else
        {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };

    getUserData = (token) => {

        if (localStorage.getItem('env') === 'production') {
            BASE_URL = 'https://yeboapi2.wavekrest.com';
        } else if (localStorage.getItem('env') === 'staging') {
            BASE_URL = 'https://staging.wavekrest.com';
        }

        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/api/YeboUser/me`, { headers: { Authorization: 'BEARER ' + token} })
                .then( response => {
                    if (response.data) {
                        console.log(response.data);
                        resolve(response.data)
                    } else {
                        reject({});
                    }
                })
        })
    }
}

const instance = new jwtService();

export default instance;
