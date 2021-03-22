import { useEffect, useState, useCallback } from 'react';
import { useRequest } from '../../hooks/request.hook';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import T from '../../ui-components/text/T';
import s from './deals.module.css';

const Deal = () => {
    const [deal, update] = useState([]),
        [log, setLog] = useState([]),
        { name, phone, status, createdAt, lead } = deal,
        { request } = useRequest(),
        { id } = useParams(),
        history = useHistory();

    const getDeal = useCallback(async () => {
        const [{ res }, { res: log }] = await Promise.all([
            request(`/api/deals/${id}`),
            request(`/api/deals/${id}/transaction`)
        ]);

        log && setLog(log.reverse());
        res && update(res);
    }, [request, deal]);

    const handleRemove = useCallback(async () => {
        const { res } = await request(`/api/deals/${id}`, 'DELETE');

        res && history.push('/deals/');
    }, [id]);

    const handleEdit = useCallback (() => history.push(`/deals/${id}/edit`), [id]);

    const handleOpenLead = useCallback(() => {
        history.push(`/leads/${lead}`);
    });

    useEffect(() => {
        getDeal();
    }, []);

    return <Layout>
        <h3>Карточка Сделки</h3>

        <div className={s.lead}>
            <div className={s.tools}>
                <div className={s.link} onClick={handleEdit}>Изменить</div>
                <div className={s.link} onClick={handleRemove}>Удалить</div>
            </div>

            <div>Имя: {name}</div>
            <div>Телефон: {phone}</div>
            <div>Статус: <T id={status && `lead.${status}`} /></div>
            <div>Дата создания: {createdAt}</div>


            {lead && <div className={s.box}>
                <div className={s.link} onClick={handleOpenLead}>Открыть лид</div>
            </div> }

            {log.length > 0 && <div className={s.box}>
                <div className={s.subtitle}>История изменений</div>

                {log.map(({ _id: id, changed, authorId, createdAt }) => <div key={id}>
                    {changed.type === 'create' && <div className={s.row}>
                        <div>
                            id: {id}
                        </div>
                        <div>
                            Дата: {createdAt}
                        </div>
                        <div>
                            Заявка создана
                        </div>
                        <div>
                            Автор: {authorId}
                        </div>
                    </div>}

                    {changed.type === 'edit' && <div className={s.row}>
                        <div>
                            id: {id}
                        </div>
                        <div>
                            Заявка изменена
                        </div>
                        <div>
                            Автор: {authorId}
                        </div>
                        <div>
                            <b>Измененные поля:</b>
                        </div>
                        <div>
                            {changed.fields?.map(({ after, before, field }, i) =>  <div key={i}>
                                <div>Поле {field}</div>
                                <div>До {before}</div>
                                <div>После {after}</div><br/>
                            </div>)}
                        </div>
                    </div>}

                </div>)}
            </div>}
        </div>
    </Layout>;
};

export default Deal;
