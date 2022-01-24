import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {resetCallingStates} from 'store/calling/list'
import CallingSection from 'modules/calling/list/body/components/section'

const CallingListBody = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(resetCallingStates())
        }
    }, [])

    return (
        <>
            <CallingSection callingStatus={'RUN'} />
            <CallingSection callingStatus={'SCHEDULED'} />
            <CallingSection callingStatus={'DONE'} />
        </>
    )
}

export default CallingListBody
