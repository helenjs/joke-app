
interface selectOption {
    key: string;
    name: string;
}

interface SelectProps {
    options: selectOption[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
}

const Select = ({ options, value, onChange, placeholder = "Select value" }: SelectProps) => {
    return (
        <select
            className="mb-4 p-2 border rounded outline-none"
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
};

export default Select;
