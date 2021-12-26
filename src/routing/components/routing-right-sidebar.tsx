import React from 'react';
import {Route, Switch} from 'react-router-dom';
import routes from '../routes';
import TestRightSidebar from 'modules/test/right-block';
import CallersBaseViewRightSidebar from 'modules/callers-base/view/right-sidebar';

export default function RoutingRightSidebar() {
    return (
        <Switch>
            <Route path={routes.callersBaseView(':callersBaseId')}
                   exact
                   component={CallersBaseViewRightSidebar}/>
            <Route path={routes.test()}
                   exact
                   component={TestRightSidebar}/>
        </Switch>
    );
}
