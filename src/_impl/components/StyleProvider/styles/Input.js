const DefaultInput = {
    root: {
        padding: 0,
        width: 300
    },
    underline: {
        display: 'hidden'
    },
    input: {
        borderRadius: 5,
        border: '2px dashed #ced4da',
        fontSize: 15,
        background: '#ffffff',
        padding: '7px 5px 7px 5px',
        '&:focus': {
            borderStyle: 'solid'
        }
    }
};

const ErrorInput = {
    root: {
        padding: 0,
        width: '50%'
    },
    underline: {
        display: 'hidden'
    },
    input: {
        borderRadius: 5,
        border: '2px solid #7e1e85',
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
        width: 600
    },
    underline: {
        display: 'hidden'
    },
    input: {
        borderRadius: 10,
        border: '1px solid #cccccc',
        color: '#ffffff',
        borderColor: '#dddddd',
        backgroundColor: '#5d777f',
        fontSize: 15,
        padding: '7px 10px',
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
        fontWeight: 600,
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
