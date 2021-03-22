import React from 'react';

const Filter = ({ filter, setFilter }) => {
    const handleChange = ({ target: { name, value } }) => {
        setFilter({ ...filter, [name]: value })
    };

    return <div>
        <div>
            Тип транзакции
            <div>
                <input
                    type='radio'
                    name='changed.type'
                    value='all'
                    checked={filter['changed.type'] === 'all'}
                    onChange={handleChange}
                /> Все
            </div>
            <div>
                <input
                    type='radio'
                    name='changed.type'
                    value='edit'
                    checked={filter['changed.type'] === 'edit'}
                    onChange={handleChange}
                /> Редактирование
            </div>
            <div>
                <input
                    type='radio'
                    name='changed.type'
                    value='create'
                    checked={filter['changed.type'] === 'create'}
                    onChange={handleChange}
                /> Создание
            </div>
            <div>
                <input
                    type='radio'
                    name='changed.type'
                    value='delete'
                    checked={filter['changed.type'] === 'delete'}
                    onChange={handleChange}
                /> Удаление
            </div>

        </div>

    </div>;
};

export default Filter;