import React from 'react'
import MainLayout from 'modules/main-layout'
import CallingListBody from 'modules/calling/list/body'
import CallingListHeader from 'modules/calling/list/header'

const CallingListPage = () => {
    return (
        <MainLayout childrenBody={<CallingListBody/>}
                    childrenHeader={<CallingListHeader/>}/>
    )
}

export default CallingListPage
