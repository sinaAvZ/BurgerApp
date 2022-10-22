import React from 'react';

import classes from './Button.Module.css';

const button = (props) => (
    <button style={props.style}
    disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;