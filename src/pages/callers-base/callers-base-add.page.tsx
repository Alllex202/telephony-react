import React from 'react'
import MainLayout from 'modules/main-layout'
import CallersBaseAddBody from 'modules/callers-base/add/body'
import CallersBaseAddHeader from 'modules/callers-base/add/header'

const CallersBaseAddPage = () => {
    return (
        <MainLayout
            childrenBody={<CallersBaseAddBody />}
            childrenHeader={<CallersBaseAddHeader />}
        />
    )
}

export default CallersBaseAddPage
