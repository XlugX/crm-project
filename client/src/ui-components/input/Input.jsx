import s from './input.module.css';

const Input = props => {
    const { type, name, placeholder, value, onChange } = props;

    return <input
        className={s.input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />;
};

export default Input;
