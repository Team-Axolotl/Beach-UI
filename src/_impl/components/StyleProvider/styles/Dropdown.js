const DefaultSelect = {
    root: {
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 15,
        width: '100%'
    },
    select: {
        padding: '5px 10px',
        borderRadius: 10,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '100%',
        color: '#3db707',
        backgroundColor: '#fbdd4a',

        '&:focus': {
            borderColor: '#481559',
            backgroundColor: '#fbdd4a',
            borderRadius: 10
        },
        '&:hover': {
            borderColor: '#481559',
            backgroundColor: '#fbdd4a',
            borderRadius: 10
        },
        '&:active': {
            borderColor: '#481559',
            backgroundColor: '#fbdd4a',
            borderRadius: 10
        }
    },
    selectMenu: {
        width: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        padding: '0 0 0 10px'
    },
    icon: {
        width: '30px',
        height: '30px',
        color: '#481559',
        backgroundColor: '#3db707',
        top: '1px',
        right: '1px',
        borderRadius: 9
    }
};

const ErrorSelect = {
    root: {
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 15,
        width: '100%'
    },
    select: {
        borderRadius: 0,
        border: '1px solid #ced4da',
        fontSize: 15,
        width: '100%',
        height: '30px',
        borderColor: '#ff87c9',
        borderRadius: 10,
        color: 'red',
        backgroundColor: '#ffd7e5',

        '&:focus': {
            borderColor: '#ff87c9',
            backgroundColor: '#ffd7e5',
            borderRadius: 10
        },
        '&:hover': {
            borderColor: '#ff87c9',
            backgroundColor: '#ffd7e5',
            borderRadius: 10
        }
    },
    selectMenu: {
        width: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        padding: '0 0 0 10px'
    },
    icon: {
        width: '30px',
        height: '30px',
        color: '#481559',
        backgroundColor: '#ff87c9',
        top: '1px',
        right: '1px',
        borderRadius: 9
    }
};

const DefaultInput = {

};

const DefaultFormControl = {
    root: {
        width: '100%'
    }
};

const defaultLabel = {
    root: {
        fontSize: '13px',
        marginLeft: '2px'
    }
};

const errorLabel = {
    root: {
        color: 'red',
        fontSize: '13px',
        marginLeft: '2px'
    }
};

const Default = {
    select: DefaultSelect,
    input: DefaultInput,
    formControl: DefaultFormControl,
    label: defaultLabel
};

const ErrorStyle = {
    select: ErrorSelect,
    input: DefaultInput,
    formControl: DefaultFormControl,
    label: errorLabel
};

export { Default, ErrorStyle };
