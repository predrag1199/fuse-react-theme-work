import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles/index';
import {Card, CardContent, Typography, Divider} from '@material-ui/core';
import classNames from 'classnames';
import {FuseAnimate} from '@fuse';
import JWTLoginTab from './tabs/JWTLoginTab';
import { GoogleLogin } from 'react-google-login';
import jwtService from 'jwtService';

const styles = theme => ({
    root : {
        background    : "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
        backgroundSize: 'cover'
    },
    intro: {
        color: '#ffffff'
    },
    card : {
        width   : '100%',
        maxWidth: 400
    },
    deployTime: {
        position: 'absolute',
        bottom: '10px',
        color: '#fff',
        marginLeft: '10px',
        justifyContent: 'flex-end'
    }
});

class Login extends Component {
    state = {
        tabValue: 0
    };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    };

    responseGoogle = (response) => {

        jwtService.signInWithGoogle(response.tokenId)
            .then((response) => {
                this.props.history.push('/dashboard');
            })
            .catch((err) => {
                alert('This gmail is not registered');

                const auth2 = window.gapi.auth2.getAuthInstance();

                if (auth2 != null) {
                    auth2.disconnect();
                }
            })
      }

    failGoogle = (error) => {
        // alert(error.error)
        console.log(error.error);

        const auth2 = window.gapi.auth2.getAuthInstance();

        if (auth2 != null) {
            auth2.disconnect();
        }
    }

    formatTimeStamp = (timeString) => {
        var formattedDateTime = "0000-00-00 00:00"
        if (timeString !== undefined) {
            const date = timeString.substr(0, 10);
            const time = timeString.substr(11, 5);

            formattedDateTime = date + " " + time;
        }

        return formattedDateTime;
    }

    render()
    {
        const {classes} = this.props;
        const {tabValue} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>

                <div
                    className={classNames(classes.intro, "flex flex-col flex-no-grow items-center p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left")}>

                    <FuseAnimate animation="transition.expandIn">
                        <img className="w-128 mb-32" src="assets/images/logos/logo.png" alt="logo"/>
                    </FuseAnimate>

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h3" color="inherit" className="font-light">
                            Yebo!World
                        </Typography>


                    </FuseAnimate>

                </div>
                <div className={classNames(classes.deployTime, "flex flex-1")}>
                    <Typography color="inherit">Last committed {this.formatTimeStamp(process.env.REACT_APP_DEPLOYTIME)}</Typography>
                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>

                    <Card className={classNames(classes.card, "mx-auto m-16 md:m-0")}>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Typography variant="h6" className="text-center md:w-full mb-48">LOGIN TO YOUR ACCOUNT</Typography>

                            {tabValue === 0 && <JWTLoginTab/>}

                            <div className="my-24 flex items-center justify-center">
                                <Divider className="w-32"/>
                                <span className="mx-8 font-bold">OR</span>
                                <Divider className="w-32"/>
                            </div>

                            <div className="">
                                <GoogleLogin
                                    clientId="661626132107-mhf42vr9tda363e4mk7qq2dhnv2irkac.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.failGoogle}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Login));
