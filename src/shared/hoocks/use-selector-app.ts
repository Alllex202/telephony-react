import {useSelector} from 'react-redux'
import {RootState} from 'store'

export const useSelectorApp = () => useSelector(
    (state: RootState) => state
)
