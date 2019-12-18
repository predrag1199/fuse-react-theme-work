import React from 'react';
import {withStyles, AppBar, Typography, Avatar, Hidden} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseNavigation, FuseLayouts} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
// import * as Actions from 'auth/store/actions/user.actions';
// import jwtService from '../jwtService';
import SettingsPanel from '../main/SettingsPanel';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root  : {
        '& .user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing  : theme.transitions.easing.easeInOut
                })
            }
        }
    },
    avatar: {
        width     : 72,
        height    : 72,
        position  : 'absolute',
        top       : 110,
        padding   : 8,
        background: theme.palette.background.default,
        boxSizing : 'content-box',
        left      : '50%',
        transform : 'translateX(-50%)',
        '& > img' : {
            borderRadius: '50%'
        }
    },
    groups: {
        display: 'flex'
    },
    chip: {
        margin: theme.spacing.unit,
        fontSize: '10px',
        height: '20px'
    }
});


function MainNavbar({classes, navigation, layoutStyle, user, setUserDataEmailPassword})
{
    function UserHeader()
    {
        return (
            <AppBar
                position="static"
                color="primary"
                elevation={0}
                className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
            >
                <Typography className="username text-16 whitespace-no-wrap" color="inherit">{user.data.displayName}</Typography>
                <Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">{user.data.email}</Typography>
                <div className={classes.groups}>
                    {user.data.groups && user.data.groups.map(group => {
                        return (
                            <Chip key={group} label={group} className={classes.chip} />
                        )
                    })}
                </div>
                <Avatar
                    className={classNames(classes.avatar, "avatar")}
                    alt="user photo"
                    src={user.data.photoURL && user.data.photoURL !== '' ? user.data.photoURL : "assets/images/avatars/profile.jpg"}
                />
            </AppBar>
        );
    }

    const navigationLayout = FuseLayouts[layoutStyle].type;
    return (
        <div className={classes.root}>
            {navigationLayout === 'vertical' ? (
                <React.Fragment>
                    <UserHeader/>
                    <FuseNavigation navigation={navigation} layout={navigationLayout}/>
                    <SettingsPanel />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Hidden lgUp>
                        <UserHeader/>
                    </Hidden>
                    <FuseNavigation navigation={navigation} layout={navigationLayout}/>
                    <SettingsPanel />
                </React.Fragment>
            )}

        </div>
    );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({fuse, auth})
{
    return {
        navigation : fuse.navigation,
        layoutStyle: fuse.settings.current.layout.style,
        user       : JSON.parse(window.localStorage.getItem('user')) || auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNavbar)));
