import { useCallback, useState, useContext } from 'react';
import { useRequest } from '../../hooks/request.hook';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import Input from '../../ui-components/input/Input';
import Button from '../../ui-components/button/Button';
import s from './auth.module.css';


const Auth = () => {
    const { login } = useContext(UserContext);
    const { request } = useRequest();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleFieldChange = useCallback(e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }, [form, setForm]);

    const handleSubmitForm = useCallback(async () => {
        const { res } = await request('/api/auth/login', 'POST', {...form});

        res?.token && login(res.token, res.userId);
    }, [form]);


    return <div className={s.wrapper}>
        <div className={s.form}>
            <div className={s.title}> Войти </div>
                <div className={s.field}>
                    <Input
                        type='text'
                        name='email'
                        placeholder='email'
                        value={form.email}
                        onChange={handleFieldChange}
                    />
                </div>

                <div className={s.field}>
                    <Input
                        type='password'
                        name='password'
                        placeholder='пароль'
                        value={form.password}
                        onChange={handleFieldChange}
                    />
                </div>

                <Button onClick={handleSubmitForm}> Войти </Button>

            <div className={s.footer}>
                <Link to='/register'>Регистрация</Link>
            </div>
        </div>
    </div>;
};

export default Auth;
