import { fromJS } from 'immutable';

const defaultState = fromJS({
    translations: null
});

export const Types = {
    GET_TRANSLATIONS: Symbol('GET_TRANSLATIONS')
};

export default function main(state = defaultState, action) {
    switch (action.type) {
        case Types.GET_TRANSLATIONS:
            if (action.state === 'finished' && action.response) {
                let translationData = fromJS(action.response.getIn(['result', 'itemTranslationFetch'], []));
                let convertedData = {};

                translationData.map((x) => {
                    if (x) {
                        convertedData[x.get('itemName', '').toLowerCase().trim()] = x.get('itemNameTranslation');
                    }
                });

                return state.set('translations', convertedData);
            }
            break;
    }

    return state;
}
