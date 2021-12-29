import axios from 'axios'

export const useCancelFetchAxios = () => {
    const {cancel, token} = axios.CancelToken.source()
    return {cancel, token}
}
