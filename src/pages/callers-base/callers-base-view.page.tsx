import React from 'react'
import MainLayout from 'modules/main-layout'
import CallersBaseViewBody from 'modules/callers-base/view/body'
import CallersBaseViewHeader from 'modules/callers-base/view/header'
import CallersBaseViewRightSidebar from 'modules/callers-base/view/right-sidebar'

const CallersBaseViewPage = () => {
    return (
        <MainLayout
            childrenBody={<CallersBaseViewBody />}
            childrenHeader={<CallersBaseViewHeader />}
            childrenRightSidebar={<CallersBaseViewRightSidebar />}
        />
    )
}

export default CallersBaseViewPage
