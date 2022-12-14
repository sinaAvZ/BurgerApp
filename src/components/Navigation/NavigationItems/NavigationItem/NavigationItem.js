import React from 'react';
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.Module.css';

const navigationItem = (props) => {

return (<li className={classes.NavigationItem}>
        <NavLink
            exact={props.exact}
            to={props.link}
            activeClassName={classes.active} 
            onClick={props.personClick}
            >{props.children}</NavLink>
    </li>)

}


export default navigationItem;