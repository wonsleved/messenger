import React, {FC, ReactElement} from 'react';
import {InputPropsType} from "../type";

const Input: FC<InputPropsType> = ({onChange, value, type, name, className, ...rest}): ReactElement => {

    return (
        <div className={"input-field " + className}>
            <input type={type} id={name} className="input-field__input" placeholder=" "
                   {...rest}
                   onChange={onChange}
                   value={value}
            ></input>
            <label htmlFor={name} className="input-field__label">
                {name}
            </label>
        </div>
    )

};


export default Input;