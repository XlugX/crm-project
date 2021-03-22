import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import s from './layout.module.css';



const Header = () => {
    const { isAuthenticated, logout } = useContext(UserContext);

    return <div className={s.header}>
        <div className={s.nav}>
            <div className={s.item}>
                <NavLink to='/'>Главная</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/leads'>Лиды</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/deals'>Сделки</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/history'>История изменений</NavLink>
            </div>

            <div className={s.actions}>
                {isAuthenticated && <div className={s.logout} onClick={logout}>Выйти</div>}
            </div>
        </div>
    </div>;
}

export default Header;
