import React from 'react';
import Status from '_impl/components/Status';

const CONFIG = {
    userName: {
        label: 'Username',
        width: 96
    },
    firstName: {
        label: 'First name',
        width: 144
    },
    lastName: {
        label: 'Last name',
        width: 144
    },
    roles: {
        label: 'Roles',
        width: 144
    },
    branches: {
        label: 'Organizations',
        width: 144
    },
    statusId: {
        label: 'Status',
        width: 96,
        // eslint-disable-next-line react/prop-types
        cellRenderer: ({ cellData }) => <Status color={cellData === 'approved' ? 'green' : 'red'} >{cellData}</Status>
    }
};

export default CONFIG;
