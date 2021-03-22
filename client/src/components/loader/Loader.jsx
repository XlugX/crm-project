import React from 'react';
import s from './loader.module.css';

const Loader = () => {
    return <div className={s.wrapper}>
        <div className={s.loader} />
    </div>
};

export default Loader;