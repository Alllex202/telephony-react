import React from 'react'
import MainLayout from 'modules/main-layout'
import CallingViewBody from 'modules/calling/view/body'
import CallingViewHeader from 'modules/calling/view/head'

const CallingViewPage = () => {
    return <MainLayout childrenBody={<CallingViewBody />} childrenHeader={<CallingViewHeader />} />
}

export default CallingViewPage
