import React from 'react'
import CallingSection from './components/section'

const CallingListBody = () => {
    return (
        <>
            <CallingSection callingStatus={'RUN'} />
            <CallingSection callingStatus={'SCHEDULED'} />
            <CallingSection callingStatus={'DONE'} />
        </>
    )
}

export default CallingListBody
