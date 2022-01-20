import React from 'react'
import MainLayout from 'modules/main-layout'
import CallingCreatingBody from 'modules/calling/creating/body'
import CallingCreatingHeader from 'modules/calling/creating/header'

const CallingCreatingPage = () => {
    return (
        <MainLayout
            childrenBody={<CallingCreatingBody />}
            childrenHeader={<CallingCreatingHeader />}
        />
    )
}

export default CallingCreatingPage
