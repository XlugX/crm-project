import { useState, useCallback } from 'react';
import { useRequest} from '../hooks/request.hook';
import Layout from '../components/layout/Layout';
import Button from '../ui-components/button/Button';
import Input from '../ui-components/input/Input';

const Home = () => {
    const [fields, update] = useState({
        name: '',
        phone: ''
    }),
        { request } = useRequest();

    const handleChange = useCallback(({ target: { name, value } }) => {
        update({ ...fields, [name]: value })
    }, [fields, update]);

    const handleSubmit = useCallback(async () => {
        const { res } = await request('/api/leads/create', 'POST', fields);

        res && console.log(res)

    }, [request, fields]);

    return <Layout>
        Домашняя страница

        <div>
            <Input value={fields.name} name='name' placeholder='name' onChange={handleChange} />
            <Input value={fields.phone} name='phone' placeholder='phone' onChange={handleChange} />
            <Button onClick={handleSubmit}>Send</Button>
        </div>
    </Layout>;
};

export default Home;


