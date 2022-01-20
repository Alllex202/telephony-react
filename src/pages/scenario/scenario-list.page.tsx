import React from 'react'
import MainLayout from 'modules/main-layout'
import ScenarioListBody from 'modules/scenario/list/body'
import ScenarioListHeader from 'modules/scenario/list/header'

const ScenarioListPage = () => {
    return (
        <MainLayout childrenBody={<ScenarioListBody />} childrenHeader={<ScenarioListHeader />} />
    )
}

export default ScenarioListPage
