import React from 'react';

import classes from './NavigationItem.Module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuth? <NavigationItem link="/order">order</NavigationItem>:null}
       {!props.isAuth?
       <NavigationItem link="/auth" >Authenticate</NavigationItem>
       :<NavigationItem link="/logout">Logout</NavigationItem>} 

    </ul>
);

export default navigationItems;