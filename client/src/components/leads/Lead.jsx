import { useEffect, useState, useCallback, useContext } from 'react';
import { useRequest } from '../../hooks/request.hook';
import { UserContext } from '../../context/UserContext';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import Button from '../../ui-components/button/Button';
import T from '../../ui-components/text/T';
import s from './leads.module.css';

const Lead = () => {
    const [lead, setLead] = useState([]),
        { name, phone, status, createdAt, _id } = lead,
        { request } = useRequest(),
        { id } = useParams(),
        history = useHistory(),
        { userId } = useContext(UserContext);

    const getLead = useCallback(async () => {
        const { res } = await request(`/api/leads/${id}`);

        res && setLead(res);
    }, [request, lead, setLead]);

    const handleRemove = useCallback(async () => {
        const { res } = await request(`/api/leads/${id}`, 'DELETE');

        res && history.push('/leads/');
    }, [id]);

    const handleEdit = useCallback (() => history.push(`/leads/${id}/edit`), [id]);

    const handleCreateDeal = useCallback(async () => {
        const payload = { name, phone, lead: _id, author: userId, responsible: userId };

        const { res } = await request('/api/deals/create', 'POST', payload);

        res && history.push(`/deals/${res._id}`);
    })

    useEffect(() => {
        getLead();
        console.log(userId);

    }, []);

    return <Layout>
        <h3>Карточка Лида</h3>

        <div className={s.lead}>
            <div className={s.remove} onClick={handleEdit}>Изменить</div>
            <div>Имя: {name}</div>
            <div>Телефон: {phone}</div>
            <div>Статус: <T id={status && `lead.${status}`} /></div>
            <div>Дата создания: {createdAt}</div>
            <div className={s.remove} onClick={handleRemove}>Удалить</div>

            <Button onClick={handleCreateDeal}>Создать сделку</Button>
        </div>
    </Layout>;
};

export default Lead;
