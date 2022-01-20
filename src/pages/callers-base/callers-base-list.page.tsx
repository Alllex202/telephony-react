import React from 'react'
import CallersBaseListBody from 'modules/callers-base/list/body'
import CallersBaseListHeader from 'modules/callers-base/list/header'
import MainLayout from 'modules/main-layout'

const CallersBaseListPage = () => {
    return (
        <MainLayout
            childrenBody={<CallersBaseListBody />}
            childrenHeader={<CallersBaseListHeader />}
        />
    )
}

export default CallersBaseListPage
