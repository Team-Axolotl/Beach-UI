const Base = {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'middle',
    alignItems: 'center',
    padding: '8px 15px',

    borderRadius: 10,
    border: '1px solid',

    textTransform: 'capitalize',
    transition: '',
    fontSize: '15px',
    fontWeight: 600
};

const Default = {
    root: Object.assign({}, Base, {
        color: '#dddddd',
        borderColor: '#999999',
        backgroundColor: '#777777',
        padding: '15px 30px',

        '&:hover': {
            color: '#dddddd',
            borderColor: '#999999',
            backgroundColor: '#777777'
        },
        '&:active': {
            color: '#dddddd',
            borderColor: '#999999',
            backgroundColor: '#999999'
        }
    }),
    disabled: {
        color: '#dddddd',
        borderColor: '#999999',
        backgroundColor: '#999999'
    }
};

const White = {
    root: Object.assign({}, Base, {
        color: '#190d07',
        borderColor: '#dddddd',
        backgroundColor: '#fb965d',

        '&:hover': {
            color: '#111111',
            borderColor: '#999999',
            backgroundColor: '#fb965d'
        },
        '&:active': {
            color: '#111111',
            borderColor: '#999999',
            backgroundColor: '#fcad81'
        }
    }),
    disabled: {
        color: '#111111',
        borderColor: '#dddddd',
        backgroundColor: '#fcad81'
    }
};

const Blue = {
    root: Object.assign({}, Base, {
        border: 'none',
        color: '#ffffff',
        backgroundColor: '#6ea4c1',

        '&:hover': {
            color: '#ffffff',
            backgroundColor: '#6ea4c1'
        },
        '&:active': {
            color: '#ffffff',
            backgroundColor: '#8bb6cd'
        }
    }),
    disabled: {
        color: '#ffffff',
        backgroundColor: '#8bb6cd'
    }
};

const Label = {
    root: Object.assign({}, Base, {
        border: 'none',
        color: '#777777',
        background: 'none',

        '&:hover': {
            color: '#777777',
            background: 'none',
            backgroundColor: 'none',
            textDecoration: 'underline'
        }
    }),
    disabled: {
        color: 'grey',
        background: 'none',
        textDecoration: 'line-through'
    }
};

const Link = {
    root: Object.assign({}, Base, {
        border: 'none',
        color: '#3db707',
        background: 'none',

        '&:hover': {
            color: '#3db707',
            background: 'none',
            backgroundColor: 'none',
            textDecoration: 'underline'
        }
    }),
    disabled: {
        color: 'grey',
        background: 'none',
        textDecoration: 'line-through'
    }
};

export { Default, White, Blue, Label, Link };
