import React from 'react'
import {useLocation} from 'react-router-dom'

export const useQuery = (...queryParams: string[]) => {
    const {search} = useLocation()

    return React.useMemo(() => {
        const query = new URLSearchParams(search)
        // todo динамическая типизация для ключей
        const res: {values: {[key: string]: string[]}; query: URLSearchParams} = {
            values: {},
            query
        }

        if (queryParams.length === 0) return res

        for (let param of queryParams) {
            res.values[param] = query.getAll(param)
        }

        return res
    }, [search])
}
