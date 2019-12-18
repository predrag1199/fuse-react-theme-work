import * as Actions from '../actions';

// import _ from '@lodash';

const initialState = {
    entities          : [],
    groups            : [],
    searchText        : '',
    selectedContactIds: [],
    routeParams       : {},
    updateInfo        : {},
    contactDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    countries         : [],
    airports          : [],
    userCategory      : 'All Users',
    pageSize          : 20,
    pings             : [],
    trailPings        : [],
    totalRecords      : 0
};

const contactsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CONTACTS:
        {
            return {
                ...state,
                entities   : action.payload,
                routeParams: action.routeParams
            };
        }
        case Actions.GET_GROUPS:
        {
            return {
                ...state,
                groups: action.payload
            };
        }
        case Actions.GET_PINGS:
        {
            return {
                ...state,
                pings   : action.payload
            }
        }
        case Actions.GET_TRAIL_PINGS:
        {
            return {
                ...state,
                trailPings : action.payload
            }
        }
        case Actions.GET_TOTAL_RECORDS: 
        {
            return {
                ...state,
                totalRecords: action.payload
            }
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.SET_USER_CATEGORY:
        {
            return {
                ...state,
                userCategory: action.userCategory
            };
        }
        case Actions.SET_PAGE_SIZE:
        {
            console.log(action.pageSize);
            return {
                ...state,
                pageSize: action.pageSize
            }
        }
        case Actions.TOGGLE_IN_SELECTED_CONTACTS:
        {

            const contactId = action.contactId;

            let selectedContactIds = [...state.selectedContactIds];

            if ( selectedContactIds.find(id => id === contactId) !== undefined )
            {
                selectedContactIds = selectedContactIds.filter(id => id !== contactId);
            }
            else
            {
                selectedContactIds = [...selectedContactIds, contactId];
            }

            return {
                ...state,
                selectedContactIds: selectedContactIds
            };
        }
        case Actions.SELECT_ALL_CONTACTS:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedContactIds = arr.map(contact => contact.id);

            return {
                ...state,
                selectedContactIds: selectedContactIds
            };
        }
        case Actions.DESELECT_ALL_CONTACTS:
        {
            return {
                ...state,
                selectedContactIds: []
            };
        }
        case Actions.OPEN_NEW_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.UPDATE_USER_DATA:
        {
            return {
                ...state,
                updateInfo: {
                    type : 'edit',
                    value: true
                }
            };
        }
        case Actions.GET_COUNTRIES:
        {
            return {
                ...state,
                countries: action.payload
            }
        }
        case Actions.GET_AIRPORTS:
        {
            return {
                ...state,
                airports: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
};

export default contactsReducer;
