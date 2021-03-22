import { useEffect, useState, useCallback } from 'react';
import { useRequest } from '../../hooks/request.hook';
import { useHistory, useParams } from 'react-router-dom';
import Input from '../../ui-components/input/Input';
import Button from '../../ui-components/button/Button';
import Layout from '../layout/Layout';
import T from '../../ui-components/text/T';
import s from './deals.module.css';

const DealEdit = () => {
    const { request } = useRequest(),
        { id } = useParams(),
        history = useHistory();

    const [fields, update] = useState({
        name: null,
        phone: null,
        status: null
    });

    const handleChange = useCallback(({ target: { name, value } }) => {
        update({ ...fields, [name]: value })
    }, [fields]);

    const getLead = useCallback(async () => {
        const { res } = await request(`/api/deals/${id}`);

        res && update(res);
    }, []);

    const handleRemove = useCallback(async () => {
        const { res } = await request(`/api/deals/${id}`, 'DELETE');

        res && history.push('/deals/');
    }, [id]);

    const handleSubmit = useCallback(async () => {
        const { res } = await request(`/api/deals/${id}`, 'PUT', fields);

        res && history.push(`/deals/${id}`);
    }, [id, fields]);

    useEffect(() => {
        getLead();
    }, []);

    return <Layout>
        <h3>Редактирование Сделки</h3>

        <div className={s.lead}>
            <div className={s.field}>
                <label className={s.label}>Имя:</label>
                <Input value={fields.name} name='name' onChange={handleChange} />
            </div>
            <div className={s.field}>
                <label className={s.label}>Телефон:</label>
                <Input value={fields.phone} name='phone' onChange={handleChange} />
            </div>
            <div className={s.field}>
                <label className={s.label}>Статус:</label>

                <div>
                    <input
                        type='radio'
                        name='status'
                        value='to_do'
                        checked={fields.status === 'to_do'}
                        onChange={handleChange}
                    />
                    <T id={fields.status && `lead.to_do`} />
                </div>

                <div>
                    <input
                        type='radio'
                        name='status'
                        value='in_progress'
                        checked={fields.status === 'in_progress'}
                        onChange={handleChange}
                    />
                    <T id={fields.status && `lead.in_progress`} />
                </div>

                <div>
                    <input
                        type='radio'
                        name='status'
                        value='done'
                        checked={fields.status === 'done'}
                        onChange={handleChange}
                    />
                    <T id={fields.status && `lead.done`} />
                </div>
            </div>
            <div className={s.field}>Дата создания: {fields.createdAt}</div>

            <div className={s.field}>
                <div lassName={s.link} onClick={handleRemove}>Удалить</div>
            </div>

            <Button onClick={handleSubmit}>Сохранить</Button>
        </div>
    </Layout>;
};

export default DealEdit;
