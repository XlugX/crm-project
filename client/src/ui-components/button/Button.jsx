import s from './button.module.css';

const Button = props => {
    const { type, onClick, children } = props;

    return <button
        className={s.button}
        type={type}
        onClick={onClick}
    >
        {children}
    </button>;
};

export default Button;
