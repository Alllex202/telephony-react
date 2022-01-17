import {RouteProps} from 'react-router-dom'
import {routes} from 'routing/routes'
import ScenarioEditorPage from 'pages/scenario/scenario-editor.page'
import ScenarioListPage from 'pages/scenario/scenario-list.page'
import CallersBaseListPage from 'pages/callers-base/callers-base-list.page'
import CallersBaseAddPage from 'pages/callers-base/callers-base-add.page'
import CallersBaseViewPage from 'pages/callers-base/callers-base-view.page'
import CallingListPage from 'pages/calling/calling-list.page'
import CallingCreatingPage from 'pages/calling/calling-creating.page'
import CallingViewPage from 'pages/calling/calling-view.page'
import StatsViewPage from 'pages/stats/stats-view.page'
import TestPage from 'pages/test/test.page'

export interface ProtectedRouteProps extends RouteProps {
    isAuth?: boolean
    redirectPath?: string
}

export const publicSiteRoutes: RouteProps[] = []
export const privateSiteRoutes: ProtectedRouteProps[] = [
    {path: routes.scenario.view(':scenarioId'), exact: true, component: ScenarioEditorPage},
    {path: routes.scenario.list(), exact: true, component: ScenarioListPage},
    {path: routes.callersBase.list(), exact: true, component: CallersBaseListPage},
    {path: routes.callersBase.add(), exact: true, component: CallersBaseAddPage},
    {path: routes.callersBase.view(':callersBaseId'), exact: true, component: CallersBaseViewPage},
    {path: routes.calling.list(), exact: true, component: CallingListPage},
    {path: [routes.calling.create(), routes.calling.create(':callingId')], exact: true, component: CallingCreatingPage},
    {path: routes.calling.view(':callingId'), exact: true, component: CallingViewPage},
    {path: routes.stats(), exact: true, component: StatsViewPage},
    {path: routes.test(), exact: true, component: TestPage},
    {path: routes.scenario.view(':scenarioId'), exact: true, component: ScenarioEditorPage},
    {path: routes.scenario.view(':scenarioId'), exact: true, component: ScenarioEditorPage},
    {path: routes.scenario.view(':scenarioId'), exact: true, component: ScenarioEditorPage},
    {path: routes.scenario.view(':scenarioId'), exact: true, component: ScenarioEditorPage}
]

