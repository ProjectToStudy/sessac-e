import React, { useReducer } from 'react';

const handlePhoneValue = (value: string) => {
    const str = value.replace(/[^0-9]/g, '');
    let tmp = '';
    if (str.length < 4) return str;
    else if (str.length < 7) tmp = str.slice(0, 3) + '-' + str.slice(3);
    else if (str.length < 11) {
        tmp = str.slice(0, 3) + '-' + str.slice(3, 6) + '-' + str.slice(6);
    } else {
        tmp = str.slice(0, 3) + '-' + str.slice(3, 7) + '-' + str.slice(7);
    }
    return tmp;
};

const reducer = (state: any, action: any) => {
    let { value } = action;
    if (action.name === 'phone') value = handlePhoneValue(value);

    return {
        ...state,
        [action.name]: value,
    };
};

const useInputs = (initialForm: object) => {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(e.target);
    };
    return [state, handleChange];
};

export default useInputs;
