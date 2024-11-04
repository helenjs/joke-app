import React from 'react';
import {ComponentProps} from "react";
import {twMerge} from "tailwind-merge";

interface selectOption {
    key: string;
    name: string;
}

interface SelectProps extends ComponentProps<'select'>{
    options: selectOption[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
}

const Select = React.memo(({ options, value, onChange, placeholder = "Select value", className }: SelectProps) => {
    return (
        <select
            className={twMerge(
                'mb-4 p-2 border rounded outline-none',
                className
            )}
            value={value}
            onChange={onChange}
        >
            <option value="">{placeholder}</option>
            {options.map(({key, name}) => (
                <option key={key} value={key}>
                    {name}
                </option>
            ))}
        </select>
    );
});

Select.displayName = 'Select';

export default Select;
