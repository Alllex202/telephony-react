import React from 'react'
import MainLayout from 'modules/main-layout'
import StatsBody from 'modules/stats/view/body'
import StatsHeader from 'modules/stats/view/head'

const StatsViewPage = () => {
    return <MainLayout childrenBody={<StatsBody />} childrenHeader={<StatsHeader />} />
}

export default StatsViewPage
