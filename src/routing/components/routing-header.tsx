import React from 'react';
import {Route, Switch} from 'react-router-dom';
import routes from '../routes';
import CallersBaseListHeader from 'modules/callers-base/list/header';
import CallersBaseAddHeader from 'modules/callers-base/add/header';
import CallersBaseViewHeader from 'modules/callers-base/view/header';
import TestHeader from 'modules/test/header';
import ScenarioListHeader from 'modules/scenario/list/header';
import CallingCreatingHeader from 'modules/calling/creating/header';
import CallingListHeader from 'modules/calling/list/header';

export default function RoutingHeader() {
    return (
        <Switch>
            <Route path={routes.callersBaseList()}
                   exact
                   component={CallersBaseListHeader}/>
            <Route path={routes.callersBaseAdd()}
                   exact
                   component={CallersBaseAddHeader}/>
            <Route path={routes.callersBaseView(':callersBaseId')}
                   exact
                   component={CallersBaseViewHeader}/>
            <Route path={routes.scenarioList()}
                   exact
                   component={ScenarioListHeader}/>
            <Route path={routes.callingList()}
                   exact
                   component={CallingListHeader}/>
            <Route path={routes.callingCreate()}
                   exact
                   component={CallingCreatingHeader}/>
            <Route path={routes.test()}
                   exact
                   component={TestHeader}/>
            <Route children={<>Стандартная шапка</>}/>
        </Switch>
    );
}
