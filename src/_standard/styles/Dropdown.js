const DefaultSelect = {
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
        '&:focus': {
            borderColor: '#0074BB',
            backgroundColor: '#ffffff'
        },
        '&:hover': {
            borderColor: '#0074BB'
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
        color: '#ffffff',
        backgroundColor: '#4096fd',
        top: '1px',
        right: '1px'
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
        borderColor: 'red',
        '&:focus': {
            borderColor: 'red',
            backgroundColor: '#ffffff'
        },
        '&:hover': {
            borderColor: 'red'
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
        color: '#ffffff',
        backgroundColor: '#4096fd',
        top: '1px',
        right: '1px'
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
