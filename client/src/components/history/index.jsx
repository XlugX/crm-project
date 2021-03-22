import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../layout/Layout';
import Loader from '../loader/Loader';
import AuditLog from './AuditLog';
import { useRequest } from '../../hooks/request.hook';


const History = () => {
    const { request } = useRequest(),
        [transactions, update] = useState([]),
        [list, setList] = useState(transactions),
        [filter, setFilter] = useState({}),
        [fetching, setFetching] = useState(false);

    const getData = useCallback(async () => {
        setFetching(true);

        const { res } = await request('/api/transactions');

        setFetching(false);

        res && update(res.reverse());
    }, [request]);


    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setList(transactions);
    }, [transactions]);

    useEffect(() => {
        let result = [...transactions];

        if (filter['changed.type'] && filter['changed.type'] !== 'all') {
            result = result.filter(({ changed }) => changed.type === filter['changed.type']);
        };

        setList(result);
    }, [filter]);



    return <Layout>
        <h3>История изменений</h3>

        <AuditLog.Filter
            filter={filter}
            setFilter={setFilter}
        />

        {fetching && <Loader />}

        {!fetching && list.length > 0 && <AuditLog>
            {list.map(({ _id: id, changed, authorId, createdAt }) => <AuditLog.Item
                key={id}
                id={id}
                changed={changed}
                authorId={authorId}
                createdAt={createdAt}
            />)}

        </AuditLog>}

        {!fetching && list.length === 0 && <div>Данные не найдены</div>}

    </Layout>;
};

export default History;