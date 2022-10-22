import React from 'react'
import classes from './input.module.css'
const input = props => {
    let inputElement = '';
    let cssClasses = [classes.InputElement]

    if (props.valid && props.shouldValid && props.touched) {
        cssClasses.push(classes.Invalid);

    }
    switch (props.elementType) {
        case ('input'): {
            inputElement = <input
                style={props.style}
                className={cssClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        }
        case ('textarea'): {
            inputElement = <textarea
                style={props.style}
                className={cssClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        }
        case ('select'): {
            inputElement = (
                <select
                    style={props.style}
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed} >
                    {props.elementConfig.options.map(data => (
                        <option key={data.value} value={data.value}>
                            {data.displayValue}
                        </option>
                    ))}
                </select>)
            break;
        }
        default: {
            inputElement = <input
                style={props.style}
                className={cssClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
        }
    }
    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default input;