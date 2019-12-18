import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import classNames from 'classnames';
import {Button, Icon} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    root     : {
        display   : 'flex',
        alignItems: 'center',
        width     : '100%'
    },
    seperator: {
        width          : 1,
        height         : 64,
        backgroundColor: theme.palette.divider
    },
    button: {
        backgroundColor: '#fff',
        margin: theme.spacing.unit,
        float: 'left'
    },
    staging: {
        backgroundColor: 'red',
        color: 'white',
        margin: theme.spacing.unit,
        float: 'left'
    },
    production: {
        backgroundColor: 'green',
        color: 'white',
        fontWeight: '700',
        margin: theme.spacing.unit,
        float: 'left'
    },
    cursor: {
        cursor: 'pointer'
    },
    toolbar:  {
        justifyContent: 'flex-end'
    },


});

class MainToolbar extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('env') == null) {
            localStorage.setItem('env', 'staging');
        }
        this.state = {
            env: localStorage.getItem('env'),
            dialogOpen: false
        }
    }

    logout = () => {
        window.localStorage.setItem('jwt_access_token', '');
        this.props.history.push('/');
    }

    changeServer = () => {
        this.setState({
            dialogOpen: true
        })
    }

    goBack = () => {
        if (this.props.location.pathname !== 'apps/users' && this.props.location.pathname.includes("/apps/user")) {
            window.location.href = '/apps/users';
            return;
        } else {
            this.props.history.goBack();
        }
    }
    renderArrowBack = () => {
        if (this.props.location.pathname === '/apps/users' || this.props.location.pathname === '/apps/guest') {
            return;
        } else {
            return (
                <div className="flex flex-1 px-24">
                    <Icon
                        className={this.props.classes.cursor}
                        onClick={this.goBack}
                        >
                        arrow_back
                    </Icon>
                </div>
            )
        }
    }

    handleOk = () => {
        if (localStorage.getItem('env') === null || localStorage.getItem('env') === 'production') {
            localStorage.setItem('env', 'staging');
            this.setState({
                env: 'staging'
            });
        } else if (localStorage.getItem('env') === 'staging') {
            localStorage.setItem('env', 'production');
            this.setState({
                env: 'production'
            });
        }
        window.location.href = '/login';
        this.setState({
            dialogOpen: false
        });
    }

    handleNo = () => {
        this.setState({
            dialogOpen: false
        });
    }
    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root, classes.toolbar, "flex flex-row")}>
                {this.renderArrowBack()}

                <Button variant="contained"
                    className={localStorage.getItem('env') === 'staging' ? classes.staging : classes.production }>
                    {localStorage.getItem('env') === 'staging' ? 'Staging' : 'Production'}
                </Button>
                <Button variant="contained" className={classes.button} onClick={this.logout}>
                    Logout
                </Button>


                <Dialog
                    open={this.state.dialogOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you really want to change server status? yes/no
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleNo} color="primary">No</Button>
                        <Button onClick={this.handleOk} color="primary" autoFocus>Yes</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({fuse, auth})
{
    return {}
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MainToolbar)));
