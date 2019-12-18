import jwtService from 'jwtService';
import { GET_CONTACTS } from './contacts.actions';

export function getUserData(routeParams)
{
    return (dispatch) => {
        var BASE_URL;
        if (localStorage.getItem('env') === 'production') {
            BASE_URL = 'https://yeboapi2.wavekrest.com/api/YeboUser/list';
        } else if (localStorage.getItem('env') === 'staging') {
            BASE_URL = 'https://staging.wavekrest.com/api/YeboUser/list';
        }
        let url;

        if (routeParams && routeParams.page) {
            if (routeParams.searchText) {
                url = BASE_URL + '?q='+ routeParams.searchText + '&page='+ routeParams.page + '&count=' + routeParams.count;
            } else {
                url = BASE_URL + '?page='+ routeParams.page + '&count=' + routeParams.count;
            }
        } else {
            url = BASE_URL + '?page=1&count=40';
        }

        jwtService.getApi(url)
            .then((response) => {
                    return dispatch({
                        type   : GET_CONTACTS,
                        payload: response
                    })
                }
            )
            .catch(error => {
                return dispatch({
                    type   : 'LOGIN_ERROR',
                    payload: error
                });
            });
    }
}
