import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FuseUtils, FuseAnimate} from '@fuse';
import {/*Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList,*/ Typography} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import ReactTable from "react-table";
import classNames from 'classnames';
// import { TablePagination } from '@trendmicro/react-paginations';
import '@trendmicro/react-paginations/dist/react-paginations.css';
import Pagination from '../../../../custom/pagination/Pagination';

const styles = theme => ({
    mailList: {
        padding: 0
    },
    mailItem: {},
    avatar  : {
        backgroundColor: theme.palette.primary[500]
    },
    labels  : {},
    row: {
        marginTop: 20,
        display: 'flex',
        height: 200
    },

});

class UsersList extends Component {

    state = {
        selectedContactsMenu: null,
        key: '',
        pageSize: 20,
        page: 1,
        totalRecords: 50,
        boxWidth: 1882,
        enableNext: true
    };

    constructor(props) {
        super(props);
        const routParam = {
            count: this.state.pageSize,
            page: 1
        }
        this.props.getContacts(routParam);
        this.reloadTable = this.reloadTable.bind(this);
        this.updateBoxWidth = this.updateBoxWidth.bind(this);
    }

    updateBoxWidth () {
        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

            this.setState({
                boxWidth: width - 40
            });

    }
    componentWillMount () {
        this.updateBoxWidth();
    }
    componentDidMount () {
        window.addEventListener("resize", this.updateBoxWidth);
    }
    componentWillUnmount () {
        window.removeEventListener("resize", this.updateBoxWidth);
    }

    reloadTable(page, pageSize) {
        this.props.setPageSize(pageSize);
        // this.props.getContacts()
        window.localStorage.setItem('pageSize', pageSize);

        window.location.reload();

    }

    onPageChange(page, pageSize) {
        this.setState({
			page: page,
			pageSize: pageSize
		}, () => {
            const routeparams = {
                count: pageSize,
                page: page,
                searchText: this.props.searchText
            };

			this.props.getContacts(routeparams);
		});
    }

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }

        return FuseUtils.filterArrayByString(arr, searchText);
    };

    getSearchedArray = (searchText) => {
        const routeParams = {
            count: this.state.pageSize,
            page: this.state.page,
            searchText: searchText
        }
        this.props.getContacts(routeParams);
    }

    getCategoryFilteredArray = (entities, userCategory) => {
        const arr = Object.keys(entities).map((id) => entities[id]);

        if (userCategory === "All Users" || userCategory === '') {
            return arr;
        }

        return arr.filter(item => {
            if (item.groups == null) {
                return false;
            }
            return item.groups.includes(userCategory);
        })
    }


    render()
    {
        const {classes, contacts, /*searchText,*/ userCategory/*, pageSize,  selectedContactIds, selectAllContacts, deSelectAllContacts, toggleInSelectedContacts, removeContacts, removeContact, setContactsUnstarred, setContactsStarred*/} = this.props;
        // Filter User Category

        const data = this.getCategoryFilteredArray(contacts, userCategory)

        // Search Text Filter
        // const data = this.getFilteredArray(category_filtered_data, searchText);

        if ( !data && data.length === 0 )
        {
            this.setState({
                enableNext: false
            });
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no users!
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={100}>
                <div>
                    <ReactTable
                        key={this.state.pageSize}
                        className={classNames(classes.root, "-striped -highlight border-0")}
                        getTrProps={(state, rowInfo, column) => {
                            return {
                                className: "cursor-pointer",
                                onClick  : (e, handleOriginal) => {
                                    if ( rowInfo )
                                    {
                                        this.props.history.push(`/apps/user/${rowInfo.original.userId}`)
                                    }
                                }
                            }
                        }}
                        data={data}
                        columns={[
                            {
                                Header    : "Display Name",
                                accessor  : "displayname",
                                filterable: true,
                                className : "font-bold",
                                width: this.state.boxWidth * 0.3
                            },
                            {
                                Header    : "Real Name",
                                accessor  : "name",
                                filterable: true,
                                className : "font-bold",
                                width: this.state.boxWidth * 0.3
                            },
                            {
                                Header    : "Country",
                                accessor  : "country",
                                filterable: true,
                                width: this.state.boxWidth * 0.2
                            },
                            {
                                Header    : "User Category",
                                accessor  : "groups",
                                Cell  : row => (
                                    <div className="flex items-center">
                                        {row.original.groups ? row.original.groups[0] : '' }
                                    </div>
                                ),
                                filterable: true,
                                width: this.state.boxWidth * 0.2
                            }
                        ]}
                        showPagination={false}
                        pageSize={ this.state.pageSize}
                        // onPageSizeChange={pageSize => this.reloadTable(0, pageSize)}
                        // onPageChange={page=>this.reloadTable(page, this.state.pageSize)}
                        noDataText="No users found"
                    />
                    <div className={classes.row}>
                        <Pagination
                            pageSizes={[10,20,30,40,50]}
                            defaultPageSize={this.state.pageSize}
                            enableNext = {this.state.enableNext}
                            onPageChanged={(pageSize, page) => this.onPageChange(page, pageSize)}
                        />
                    </div>
                </div>

            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts             : Actions.getContacts,
        getUserData             : Actions.getUserData,
        toggleInSelectedContacts: Actions.toggleInSelectedContacts,
        selectAllContacts       : Actions.selectAllContacts,
        deSelectAllContacts     : Actions.deSelectAllContacts,
        openEditContactDialog   : Actions.openEditContactDialog,
        removeContacts          : Actions.removeContacts,
        removeContact           : Actions.removeContact,
        toggleStarredContact    : Actions.toggleStarredContact,
        toggleStarredContacts   : Actions.toggleStarredContacts,
        setContactsStarred      : Actions.setContactsStarred,
        setContactsUnstarred    : Actions.setContactsUnstarred,
        setPageSize             : Actions.setPageSize
    }, dispatch);
}

function mapStateToProps({contactsApp})
{
    return {
        contacts          : contactsApp.contacts.entities,
        selectedContactIds: contactsApp.contacts.selectedContactIds,
        searchText        : contactsApp.contacts.searchText,
        userCategory      : contactsApp.contacts.userCategory,
        pageSize          : contactsApp.contacts.pageSize,
        user              : contactsApp.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersList)));
