import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {FuseAnimate} from '@fuse';

const styles = theme => ({
    listItem: {
        color         : 'inherit!important',
        textDecoration: 'none!important',
        height        : 40,
        width         : 'calc(100% - 16px)',
        borderRadius  : '0 20px 20px 0',
        paddingLeft   : 24,
        paddingRight  : 12,
        '&.active'    : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class UsersSidebarContent extends Component {

    getContacts(evt, param=null) {
        this.props.getContacts('ADMIN');
    }

    render()
    {
        const {classes, user} = this.props;
        return (
            <div className="p-16 lg:p-24 lg:pr-4">
                <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                    <Paper elevation={1} className="rounded-8">
                        <div className="p-24 flex items-center">
                            <Avatar className="mr-12" alt={user.name} src={user.avatar}/>
                            <Typography>{user.name}</Typography>
                        </div>
                        <Divider/>
                        <List>
                            <ListItem
                                button
                                to="#"
                                onClick={(evt) => {this.getContacts(evt, '')}}
                                activeclassname="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-16" color="action">people</Icon>
                                <ListItemText className="truncate pr-0" primary="All contacts" disableTypography={true}/>
                            </ListItem>
                            <ListItem
                                button
                                to="#"
                                onClick={(evt) => {this.getContacts(evt, 'ADMIN')}}
                                activeclassname="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-16" color="action">restore</Icon>
                                <ListItemText className="truncate pr-0" primary="Admin" disableTypography={true}/>
                            </ListItem>
                            <ListItem
                                button
                                component={NavLink}
                                to="#"
                                onClick={() => {this.getContacts('BANNED')}}
                                activeclassname="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-16" color="action">star</Icon>
                                <ListItemText className="truncate pr-0" primary="Banned" disableTypography={true}/>
                            </ListItem>
                            <ListItem
                                button
                                component={NavLink}
                                to="#"
                                onClick={() => {this.getContacts('INFLUNCER')}}
                                activeclassname="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-16" color="action">star</Icon>
                                <ListItemText className="truncate pr-0" primary="Influncer" disableTypography={true}/>
                            </ListItem>
                            <ListItem
                                button
                                component={NavLink}
                                to="#"
                                onClick={() => {this.getContacts('VIP')}}
                                activeclassname="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-16" color="action">star</Icon>
                                <ListItemText className="truncate pr-0" primary="VIP" disableTypography={true}/>
                            </ListItem>
                        </List>
                    </Paper>
                </FuseAnimate>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts             : Actions.getContacts,
        getUserData             : Actions.getUserData
    }, dispatch);
}

function mapStateToProps({contactsApp})
{
    return {
        user: contactsApp.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersSidebarContent)));
