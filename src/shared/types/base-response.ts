import {AxiosResponse} from "axios";

export type BaseResponse<T> = Promise<AxiosResponse<T>>;
