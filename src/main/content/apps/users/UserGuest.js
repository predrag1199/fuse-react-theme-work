import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple/*, FuseAnimate*/} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import * as Actions from './store/actions';
// import UsersList from 'main/content/apps/users/UsersList';
// import UsersHeader from 'main/content/apps/users/UsersHeader';
// import UserCategory from 'main/content/apps/users/UserCategory';
// import _ from '@lodash';
// import {Fab, Icon} from '@material-ui/core';
// import UserDialog from 'main/content/apps/users/UserDialog';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({

});

class UsersApp extends Component {
    render()
    {

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-20 pb-80",
                        leftSidebar       : "w-256",
                    }}

                    content={
                        <Typography variant="h6" color="inherit" className="font-light">
                            Not Admin
                        </Typography>
                    }
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({contactsApp})
{
    return {
        user              : contactsApp.user
    }
}

export default withReducer('contactsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersApp))));
