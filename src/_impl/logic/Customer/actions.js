import { Types } from './reducer';

export function Search(query, pageNumber) {
    return {
        type: Types.SEARCH,
        request: 'rpc/customer.customer.search',
        body: {
            method: 'customer.customer.search',
            params: {
                searchString: query,
                pageSize: 20,
                pageNumber
            }
        }
    };
}
