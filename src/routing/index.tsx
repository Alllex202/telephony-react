import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainLayout from 'modules/main-layout';
import RoutingBody from './components/routing-body';
import RoutingHeader from './components/routing-header';
import RoutingFooter from './components/routing-footer';
import RoutingRightSidebar from './components/routing-right-sidebar';
import routes from 'routing/routes';
import EditorLayout from 'modules/editor-layout';
import ScenarioView from 'modules/scenario/view';

function Routing() {
    return (
        <Router>
            <Switch>
                <Route path={routes.scenarioView(':scenarioId')} exact
                       children={<EditorLayout children={<ScenarioView/>}/>}/>

                <Route children={<MainLayout childrenBody={<RoutingBody/>}
                                             childrenHeader={<RoutingHeader/>}
                                             childrenFooter={<RoutingFooter/>}
                                             childrenRightSidebar={<RoutingRightSidebar/>}/>}/>
            </Switch>
        </Router>
    );
}


export default Routing;
