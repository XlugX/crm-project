import React from 'react';
import s from './history.module.css';

const Item = ({ id, changed, authorId, createdAt }) => {
    return <div>
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
                {changed.fields?.map(({ after, before, field }, i) => <div key={i}>
                    <div>Поле {field}</div>
                    <div>До {before}</div>
                    <div>После {after}</div><br/>
                </div>)}
            </div>
        </div>}
    </div>;
};

export default Item;