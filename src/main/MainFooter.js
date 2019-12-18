import React from 'react';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import classNames from 'classnames';

const styles = theme => ({
    root: {},
    deployTime: {
        justifyContent: 'flex-end'
    }
});

function formatTimeStamp(timeString) {
    var formattedDateTime = "0000-00-00 00:00"
    if (timeString !== undefined) {
        const date = timeString.substr(0, 10);
        const time = timeString.substr(11, 5);
    
        formattedDateTime = date + " " + time;
    }

    return formattedDateTime;
}

function MainFooter({classes})
{
    return (
        <div className={classNames(classes.root, "flex flex-1 items-center px-24")}>
            
            <Typography>Yebo!World Internal Tools 2019</Typography>
            <div className={classNames(classes.deployTime, "flex flex-1")}>
                <Typography>Last committed {formatTimeStamp(process.env.REACT_APP_DEPLOYTIME)}</Typography>
            </div>
        </div>
    );
}

export default withStyles(styles, {withTheme: true})(MainFooter);