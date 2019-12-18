import React, { Component } from 'react';
import { Select, MenuItem, Input } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    }
});

class UserCategory extends Component {
    state = {
        category: 'All Users'
    }

    constructor(props) {
        super(props);
        this.props.getGroups();
    }
    
    render() {
        const { classes, groups, userCategory, setUserCategory } = this.props;
        return (
            <div className={classNames(classes.root, "w-full")}>
                <Select
                    value={userCategory}
                    onChange={setUserCategory}
                    input={<Input name="category" id="category-helper" />}
                >
                    <MenuItem value="All Users"><em>All Users</em></MenuItem>
                    {
                        groups.map(group => (
                            <MenuItem 
                                key={group.id}
                                value={group.id}
                                >
                                {group.name}
                            </MenuItem>
                        ))
                    }                    
                </Select>
                </div>
            )
    }
}

UserCategory.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setUserCategory: Actions.setUserCategory,
        getGroups      : Actions.getGroups
    }, dispatch);
}

function mapStateToProps({contactsApp})
{
    return {
        userCategory: contactsApp.contacts.userCategory,
        groups      : contactsApp.contacts.groups
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UserCategory));