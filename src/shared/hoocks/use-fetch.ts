// import {BaseResponse} from "../types/base-response";
// import {useCallback, useState} from "react";
// import {BaseAxiosError} from "../types/base-response-error";
// import {AxiosResponse} from "axios";
//
// type State<T> = {
//     isLoading: boolean;
//     isError: boolean;
//     isSuccess: boolean;
//     error?: any;
//     data?: T;
// };
//
// type Props<D> = {
//     response?: BaseResponse<D>,
//     onSuccessHandler?: (res: AxiosResponse<D>) => void,
//     onErrorHandler?: (err: any) => void,
//     onLoadedHandler?: () => void
// };
//
// export function useFetch<D>(options?: Props<D>) {
//     const [state, setState] = useState<State<D>>({isError: false, isLoading: false, isSuccess: false});
//
//     const fetch = useCallback(() => {
//         if (options?.response) {
//             setState({isError: false, isSuccess: false, isLoading: true});
//             options?.response
//                 .then((res) => {
//                     setState({
//                         isError: false,
//                         isLoading: false,
//                         isSuccess: true,
//                         data: res.request,
//                     });
//                     options.onSuccessHandler && options.onSuccessHandler(res);
//                 })
//                 .catch((err) => {
//                     setState({
//                         isError: true,
//                         isLoading: false,
//                         isSuccess: false,
//                         error: err,
//                     });
//                     options.onErrorHandler && options.onErrorHandler(err);
//                 })
//                 .finally(() => {
//                     options.onLoadedHandler && options.onLoadedHandler();
//                 });
//         }
//     }, [options]);
//
//     return {fetch, state};
// }

// export function _useFetch<D, E>(response: (...params: any[]) => BaseResponse<D>, initData?: D) {
//     const [isLoading, setLoading] = useState<boolean>(false);
//     const [isError, setIsError] = useState<boolean>(false);
//     const [isSuccess, setSuccess] = useState<boolean>(false);
//
//     const [error, setError] = useState<E | null | undefined>();
//     const [data, mutateData] = useState<D | undefined | null>(initData);
//
//     const fetch = useCallback((...params: any[]) => {
//         response(...params)
//             .then((res) => {
//                 mutateData(res.data);
//                 setSuccess(true);
//                 setError(null);
//             })
//             .catch((err: BaseAxiosError<E>) => {
//                 if (err.isAxiosError) {
//                     setError(err.response?.data);
//                 }
//                 setIsError(true);
//                 mutateData(null);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, [response]);
//
//     return {fetch, isLoading, isError, isSuccess, error, data, mutateData};
// }

export {}
