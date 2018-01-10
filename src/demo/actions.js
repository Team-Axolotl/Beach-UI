import { Types } from './reducer.js';

export function Hello() {
    return {
        type: Types.HELLOWORLD,
        args: 'ARRRRGGG!'
    };
}

export function RestTest(text) {
    return {
        type: Types.REST_TEST,
        request: 'posts',
        requestType: 'POST',
        body: {
            title: text
        }
    };
};
