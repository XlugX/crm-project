import { useEffect, useState, useCallback } from 'react';
import { statuses } from '../../constants';
import { useRequest } from '../../hooks/request.hook';
import { useHistory } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loader from '../loader/Loader';
import s from './deals.module.css';


const Deals = () => {
    const [deals, update] = useState([]),
        [fetching, setFetching] = useState(false),
        { request } = useRequest(),
        history = useHistory();

    const getData = useCallback(async () => {
        setFetching(true);

        const { res } = await request('/api/deals');

        setFetching(false);

        res && update(res);
    }, []);

    const handleOpenLead = useCallback(id => {
        history.push(`/deals/${id}`);
    }, []);

    useEffect(() => {
        getData();
    }, []);

    return <Layout>
        <h3>Сделки</h3>
        <div className={s.board}>
            {fetching && <Loader />}

            {!fetching && statuses.map(({ value, title }) => <div className={s.list} key={value}>
                <div className={s.title}>
                    {title}
                </div>

                {deals?.filter(({ status }) => status === value).map(({ _id: id, name, phone }) => {
                    return <div key={id} className={s.card} onClick={() => handleOpenLead(id)}>
                        <div>{name}</div>
                        <div>{phone}</div>
                    </div>
                })}
                </div>
            )}

        </div>
    </Layout>;
};

export default Deals;
