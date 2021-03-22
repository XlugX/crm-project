import Header from './Header';
import s from './layout.module.css';


const Layout = ({ children }) => <div className={s.page}>
    <Header />

    <div className={s.content}>
        { children }
    </div>
</div>;

export default Layout;
