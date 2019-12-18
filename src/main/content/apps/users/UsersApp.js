import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple/*, FuseAnimate*/} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import UsersList from 'main/content/apps/users/UsersList';
import UsersHeader from 'main/content/apps/users/UsersHeader';
import UserCategory from 'main/content/apps/users/UserCategory';
import _ from '@lodash';
// import {Fab, Icon} from '@material-ui/core';
import UserDialog from 'main/content/apps/users/UserDialog';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class UsersApp extends Component {

    componentDidMount()
    {
        this.props.getContacts(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getContacts(this.props.match.params);
        }
    }

    render()
    {
        const { userCategory, setUserCategory } = this.props;

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-20 pb-80",
                        leftSidebar       : "w-256",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136",
                        toolbar           : "min-h-62 h-62 sm:h-50 sm:min-h-80"
                    }}
                    header={
                        <UsersHeader pageLayout={() => this.pageLayout}/>
                    }
                    contentToolbar={
                        <UserCategory
                            userCategory={userCategory}
                            onChangeHandler={setUserCategory}
                        />
                    }
                    content={
                        <UsersList/>
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <UserDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts         : Actions.getContacts,
        openNewUserDialog   : Actions.openNewUserDialog,
        setUserCategory     : Actions.setUserCategory
    }, dispatch);
}

function mapStateToProps({contactsApp})
{
    return {
        contacts          : contactsApp.contacts.entities,
        selectedContactIds: contactsApp.contacts.selectedContactIds,
        searchText        : contactsApp.contacts.searchText,
        UserCategory      : contactsApp.contacts.userCategory,
        user              : contactsApp.user
    }
}

export default withReducer('contactsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersApp))));
