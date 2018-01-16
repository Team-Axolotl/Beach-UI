const DefaultInput = {
    root: {
        padding: 0,
        width: '100%'
    },
    underline: {
        display: 'hidden'
    },
    input: {
        borderRadius: 0,
        border: '1px solid #ced4da',
        fontSize: 15,
        background: '#ffffff',
        padding: '7px 5px 7px 5px',
        '&:focus': {
            borderColor: '#000000'
        }
    }
};

const ErrorInput = {
    root: {
        padding: 0,
        width: '100%'
    },
    underline: {
        display: 'hidden'
    },
    input: {
        borderRadius: 0,
        border: '1px solid red',
        fontSize: 15,
        background: '#ffffff',
        padding: '7px 5px 7px 5px',
        '&:focus': {
            borderColor: 'red'
        }
    }
};

const ReadOnlyInput = {
    root: {
        padding: 0,
        width: '100%'
    },
    underline: {
        display: 'hidden'
    },
    input: {
        borderRadius: 0,
        border: '1px solid #cccccc',
        color: '#999999',
        borderColor: '#dddddd',
        backgroundColor: '#ececec',
        fontSize: 15,
        padding: '7px 5px 7px 5px',
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
    input: DefaultInput,
    errorText: defaultLabel
};

const ErrorStyle = {
    input: ErrorInput,
    errorText: errorLabel
};

const ReadOnly = {
    input: ReadOnlyInput,
    errorText: defaultLabel
};

export { Default, ErrorStyle, ReadOnly };
