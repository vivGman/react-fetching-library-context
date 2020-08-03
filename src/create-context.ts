import * as React from 'react';
import * as rfl from 'react-fetching-library';
import { UseQueryContext, UseParameterizedQuery } from './create-context.types';


export function createQueryContext<ResponseType, ActionParams = any>(
    action: any
) {
    const Context = React.createContext<any>({});

    function useQueryContext(): UseParameterizedQuery<
        ActionParams,
        ResponseType
    > {
        return React.useContext(Context);
    }

    function useQuery(
        config: UseQueryContext<ActionParams, ResponseType> = {}
    ): UseParameterizedQuery<ActionParams, ResponseType> {
        const { initFetch = true, initParams = {}, initState } = config;
        const [payload, setPayload] = React.useState(initState);
        const q = rfl.useParameterizedQuery<any, any, any>(action);

        React.useEffect(() => {
            if (initFetch) {
                q.query(initParams);
            }
        }, []);

        React.useEffect(() => {
            if (q.payload === undefined) {
                setPayload(initState);
            } else {
                setPayload(q.payload);
            }
        }, [q.payload]);

        return {
            ...q,
            payload,
            setPayload
        };
    }

    function Provider(props: React.ProviderProps<any> & UseQueryContext<ActionParams, ResponseType>) {
        const context = useQuery({
            initFetch: props.initFetch,
            initParams: props.initParams,
            initState: props.initState,
        });
        return React.createElement(Context.Provider, {value:context}, props.children)
    }

    return {
        useQueryContext,
        useQuery,
        Provider,
    };
}
