import React from 'react'
import MainLayout from 'modules/main-layout'
import TestBody from 'modules/test/body'
import TestHeader from 'modules/test/header'
import TestRightSidebar from 'modules/test/right-sidebar'

const TestPage = () => {
    return (
        <MainLayout
            childrenBody={<TestBody />}
            childrenHeader={<TestHeader />}
            childrenRightSidebar={<TestRightSidebar />}
        />
    )
}

export default TestPage
