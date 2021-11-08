import {BaseResponse} from "../types/base-response";
import {useCallback, useState} from "react";
import {BaseAxiosError} from "../types/base-response-error";

export function useFetch<D, E>(response: (...params: any[]) => BaseResponse<D>, initData?: D) {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setSuccess] = useState<boolean>(false);

    const [error, setError] = useState<E | null | undefined>();
    const [data, mutateData] = useState<D | undefined | null>(initData);

    const fetch = useCallback((...params: any[]) => {
        response(...params)
            .then((res) => {
                mutateData(res.data);
                setSuccess(true);
                setError(null);
            })
            .catch((err: BaseAxiosError<E>) => {
                if (err.isAxiosError) {
                    setError(err.response?.data);
                }
                setIsError(true);
                mutateData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [response]);

    return {fetch, isLoading, isError, isSuccess, error, data, mutateData};
}
