import { Types } from './coreReducer';

export function getTranslations(query, pageNumber) {
    return {
        type: Types.GET_TRANSLATIONS,
        request: 'rpc/core.itemTranslation.fetch',
        body: {
            method: 'core.itemTranslation.fetch',
            params: {
                isEnabled: 1,
                itemTypeName: 'text',
                keyValue: true,
                languageId: '3',
                pageSize: 100000
            }
        }
    };
}