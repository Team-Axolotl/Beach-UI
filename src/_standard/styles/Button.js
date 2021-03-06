const Base = {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'middle',
    alignItems: 'center',
    padding: '0px',

    borderRadius: 5,
    border: '1px solid',

    height: 35,

    textTransform: 'capitalize',
    transition: '',
    fontSize: '15px'
};

const Default = {
    root: Object.assign({}, Base, {
        color: '#444444',
        borderColor: '#cccccc',
        backgroundColor: '#f4f4f4',

        '&:hover': {
            color: '#000000',
            borderColor: '#999999',
            backgroundColor: '#f4f4f4'
        },
        '&:active': {
            color: '#000000',
            borderColor: '#999999',
            backgroundColor: '#ececec'
        }
    }),
    disabled: {
        color: '#999999',
        borderColor: '#dddddd',
        backgroundColor: '#f4f4f4'
    }
};

const White = {
    root: Object.assign({}, Base, {
        color: '#444444',
        borderColor: '#cccccc',
        backgroundColor: '#ffffff',

        '&:hover': {
            color: '#000000',
            borderColor: '#999999',
            backgroundColor: '#ffffff'
        },
        '&:active': {
            color: '#000000',
            borderColor: '#999999',
            backgroundColor: '#fafafa'
        }
    }),
    disabled: {
        color: '#999999',
        borderColor: '#dddddd',
        backgroundColor: '#ececec'
    }
};

const Blue = {
    root: Object.assign({}, Base, {
        border: 'none',
        color: '#ffffff',
        backgroundColor: '#4096fd',

        '&:hover': {
            color: '#ffffff',
            backgroundColor: '#4f9efc'
        },
        '&:active': {
            color: '#ffffff',
            backgroundColor: '#3d8dee'
        }
    }),
    disabled: {
        color: '#ffffff',
        backgroundColor: '#c5dffe'
    }
};

const Label = {
    root: Object.assign({}, Base, {
        border: 'none',
        color: 'black',
        background: 'none',

        '&:hover': {
            color: 'black',
            background: 'none',
            backgroundColor: 'none',
            textDecoration: 'underline'
        }
    }),
    disabled: {
        color: 'grey',
        background: 'none'
    }
};

const Link = {
    root: Object.assign({}, Base, {
        border: 'none',
        color: '#2881ec',
        background: 'none',

        '&:hover': {
            color: '#2881ec',
            background: 'none',
            backgroundColor: 'none',
            textDecoration: 'underline'
        }
    }),
    disabled: {
        color: 'grey',
        background: 'none'
    }
};

export { Default, White, Blue, Label, Link };
