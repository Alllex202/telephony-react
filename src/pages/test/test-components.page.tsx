import React from 'react'
import MainLayout from 'modules/main-layout'
import TestComponentsBody from 'modules/test-v2/body'

const TestComponentsPage = () => {
    return <MainLayout childrenBody={<TestComponentsBody />} />
}

export default TestComponentsPage
