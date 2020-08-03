import { QueryResponse } from 'react-fetching-library';

export type UseParameterizedQuery<ActionParams, ResponseType> = {
    abort: () => void;
    loading: boolean;
    query: (action: ActionParams) => Promise<QueryResponse<ResponseType>>;
    reset: () => void;
    setPayload: (payload:ResponseType) => void;
} & QueryResponse<ResponseType>;

export interface UseQueryContext<ActionParams, ResponseType> {
    initFetch?: boolean;
    initParams?: ActionParams;
    initState?: ResponseType;
}