import axios from 'axios/index';
import jwtService from 'jwtService';
import {getUserData} from 'main/content/apps/users/store/actions/user.actions';
import { toast } from 'react-toastify';
// import { dispatch } from 'rxjs/internal/observable/range';

export const GET_CONTACTS = '[CONTACTS APP] GET CONTACTS';
export const GET_GROUPS = '[CONTACTS APP] GET GROUPS';
export const GET_USER_DATA = '[CONTACTS APP] GET USERS';
export const UPDATE_USER_DATA = '[CONTACTS APP] UPDATE USER DATA';
export const FAILURE_CHANGE = '[CONTACTS APP] UPDATE FAILURE USER';
export const SET_SEARCH_TEXT = '[CONTACTS APP] SET SEARCH TEXT';
export const SET_USER_CATEGORY = '[CONTACTS APP] SET USER CATEGORY';
export const TOGGLE_IN_SELECTED_CONTACTS = '[CONTACTS APP] TOGGLE IN SELECTED CONTACTS';
export const SELECT_ALL_CONTACTS = '[CONTACTS APP] SELECT ALL CONTACTS';
export const DESELECT_ALL_CONTACTS = '[CONTACTS APP] DESELECT ALL CONTACTS';
export const OPEN_NEW_CONTACT_DIALOG = '[CONTACTS APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[CONTACTS APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[CONTACTS APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[CONTACTS APP] CLOSE EDIT CONTACT DIALOG';
export const ADD_CONTACT = '[CONTACTS APP] ADD CONTACT';
export const UPDATE_CONTACT = '[CONTACTS APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[CONTACTS APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[CONTACTS APP] REMOVE CONTACTS';
export const TOGGLE_STARRED_CONTACT = '[CONTACTS APP] TOGGLE STARRED CONTACT';
export const TOGGLE_STARRED_CONTACTS = '[CONTACTS APP] TOGGLE STARRED CONTACTS';
export const SET_CONTACTS_STARRED = '[CONTACTS APP] SET CONTACTS STARRED ';
export const LOGIN_ERROR = '[CONTACTS APP] LOGIN ERROR';
export const GET_COUNTRIES = '[CONTACTS APP] GET COUNTRIES';
export const GET_AIRPORTS = '[CONTACTS APP] GET AIRPORTS';
export const SET_PAGE_SIZE = '[CONTACTS APP] SET PAGE SIZE';
export const GET_PINGS = '[CONTACTS APP] GET PINGS';
export const GET_TRAIL_PINGS = '[CONTACTS APP} GET TRAIL PINGS';
export const GET_TOTAL_RECORDS = '[CONTACTS APP} GET TOTAL RECORDS';

// const BASE_URL = 'https://yeboapi2.wavekrest.com';



const BASE_URL = localStorage.getItem('env') === 'production' ? 'https://yeboapi2.wavekrest.com' : 'https://staging.wavekrest.com';
export const USER_LIST_URL = '/api/YeboUser/list';

export function getContacts(routeParams)
{
    return (dispatch, getState) => {
        dispatch(getUserData(routeParams));
    }
}

export function getGroups()
{
    const BASE_URL = localStorage.getItem('env') === 'production' ? 'https://yeboapi2.wavekrest.com' : 'https://staging.wavekrest.com';

    return (dispatch) => {
        jwtService.getApi(BASE_URL + '/api/YeboUser/groups')
            .then((response) => {
                return dispatch({
                    type : GET_GROUPS,
                    payload: response
                })
            })
            .catch(error => {
                return dispatch({
                    type: 'API ERROR',
                    payload: error
                })
            })
    }
}

export function getUserDetail(userId)
{
    return (dispatch, getState) => {
        jwtService.getApi(BASE_URL + `/api/YeboUser/${userId}`)
            .then((response) => {
                    return dispatch({
                        type   : GET_USER_DATA,
                        payload: response
                    })
                }
            )
            .catch(error => {
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error
                });
            });
    }
}


export function updateUserDetail(userInfo)
{
    return (dispatch, getState) => {
        jwtService.saveApi(BASE_URL + `/api/YeboUser/${userInfo.userId}`, userInfo, 'put')
            .then((response) => {
                toast.success("Save successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });
                return dispatch({
                    type   : UPDATE_USER_DATA,
                    payload: response
                });
            })
            .catch(error => {
                toast.error("Save failed!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                return dispatch({
                    type   : FAILURE_CHANGE,
                    payload: error
                });
            });
    }
}

export function setSearchText(event)
{
    return (dispatch) => {
        dispatch(getUserData({
            count: 20,
            page: 1,
            searchText: event.target.value
        }));
        dispatch({
            type      : SET_SEARCH_TEXT,
            searchText: event.target.value
        })
    }

}

export function setUserCategory(event)
{
    return {
        type         : SET_USER_CATEGORY,
        userCategory : event.target.value
    }
}

export function setPageSize(pageSize)
{
    return {
        type    : SET_PAGE_SIZE,
        pageSize: pageSize
    }
}

export function toggleInSelectedContacts(contactId)
{
    return {
        type: TOGGLE_IN_SELECTED_CONTACTS,
        contactId
    }
}


export function selectAllContacts()
{
    return {
        type: SELECT_ALL_CONTACTS
    }
}

export function deSelectAllContacts()
{
    return {
        type: DESELECT_ALL_CONTACTS
    }
}


export function openNewUserDialog()
{
    return {
        type: OPEN_NEW_CONTACT_DIALOG
    }
}

export function closeNewUserDialog()
{
    return {
        type: CLOSE_NEW_CONTACT_DIALOG
    }
}

export function openEditContactDialog(data)
{
    return {
        type: OPEN_EDIT_CONTACT_DIALOG,
        data
    }
}

export function closeEditUserDialog()
{
    return {
        type: CLOSE_EDIT_CONTACT_DIALOG
    }
}

export function addContact(newContact)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/add-contact', {
            newContact
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function updateContact(contact)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/update-contact', {
            contact
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function removeContact(contactId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/remove-contact', {
            contactId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function removeContacts(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/remove-contacts', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACTS
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function toggleStarredContact(contactId)
{
    return (dispatch, getState) => {
        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/toggle-starred-contact', {
            contactId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CONTACT
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function toggleStarredContacts(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/toggle-starred-contacts', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CONTACTS
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function setContactsStarred(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/set-contacts-starred', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_CONTACTS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function setContactsUnstarred(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/set-contacts-unstarred', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_CONTACTS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function getCountries()
{
    return (dispatch, getState) => {
        const request = axios.get(BASE_URL + '/api/Zone/countries');

        return request.then((response) => {
            dispatch({
                type   : GET_COUNTRIES,
                payload: response.data
            });
        })
        .catch(error => {
            return dispatch({
                type   : 'API ERROR',
                payload: error
            });
        });
    }
}

export function getAirPorts()
{
    return (dispatch, getState) => {
        const request = axios.get(BASE_URL + '/api/Zone/airports');

        return request.then((response) => {
            dispatch({
                type    : GET_AIRPORTS,
                payload : response.data
            })
        })
        .catch(error => {
            return dispatch({
                type    : 'API ERROR',
                payload : error
            })
        })
    }
}

export function getPings(userId)
{
    return (dispatch) => {
        const request = axios.get(BASE_URL + '/api/Rawlogs/list24?userkey=' + userId);

        return request.then((response) => {
            dispatch({
                type    : GET_PINGS,
                payload : response.data
            })
        })
        .catch(error => {
            return dispatch({
                type    : 'API ERROR',
                payload : error
            })
        })
    }
}

export function getTotalRecords(userId) {
    return (dispatch) => {
        const request = axios.get(BASE_URL + '/api/Rawlogs/list?userkey=' + userId);
        return request.then(response => {
            dispatch({
                type    : GET_TOTAL_RECORDS,
                payload : response.data.length
            })
        })
        .catch(error => {
            return dispatch({
                type    : 'API ERROR',
                payload : error
            })
        })
    }
}

export function getTrailPings(userId, count, page) {
    return (dispatch) => {
        const request = axios.get(BASE_URL + '/api/Rawlogs/list?userkey=' + userId + '&count=' + count + '&page=' + page);
        return request.then(response => {
            dispatch({
                type    : GET_TRAIL_PINGS,
                payload : response.data
            })
        })
        .catch(error => {
            return dispatch({
                type    : 'API ERROR',
                payload : error
            })
        })
    }
}

export function sendMessage(userId, title, body) {
    const BASE_URL = "https://yeboapi2.wavekrest.com"

    return (dispatch) =>  {
        const url = BASE_URL + "/api/Messaging/notification";

        const request = axios.post(url, {
            userId: userId,
            title: title,
            body: body
        }, {
            headers: {
                Authorization: "Bearer " + jwtService.getAccessToken(),
                'Content-Type': "application/json"
            }
        });

        return request.then( response => {
            if (response.status === 200) {
                return true;
            }
        }).catch(error => {
            return false;
        })
    }
}