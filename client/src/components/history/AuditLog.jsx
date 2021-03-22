import React from 'react';
import Item from './Item';
import Filter from './Filter';

const AuditLog = ({ children }) => {
    return <div>
        { children }
    </div>;
};

AuditLog.Item = Item;
AuditLog.Filter = Filter;

export default AuditLog;