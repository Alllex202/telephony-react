import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from "./routes";
import MainLayout from "../modules/main-layout";
import Test from "../modules/test";
import TestHeader from "../modules/test/header";
import CallersBaseList from "../modules/callers-base/list";
import CallersBaseListHeader from "../modules/callers-base/list/header";
import TestRightSidebar from "../modules/test/right-block";

function Routing() {
    return (
        <Router>
            <MainLayout childrenBody={<RoutingBody/>}
                        childrenHeader={<RoutingHeader/>}
                        childrenFooter={<RoutingFooter/>}
                        childrenRightSidebar={<RoutingRightSidebar/>}/>
        </Router>
    );
}

function RoutingBody() {
    return (
        <Switch>
            <Route path={routes.callersBaseList()} exact component={CallersBaseList}/>
            <Route path={routes.test()} exact component={Test}/>
        </Switch>
    );
}

function RoutingHeader() {
    return (
        <Switch>
            <Route path={routes.callersBaseList()} exact component={CallersBaseListHeader}/>
            <Route path={routes.test()} exact component={TestHeader}/>
            <Route children={<>Стандартная шапка</>}/>
        </Switch>
    );
}

function RoutingRightSidebar() {
    return (
        <Switch>
            {/*<Route path={routes.callersBaseList()} exact component={CallersBaseHeader}/>*/}
            <Route path={routes.test()} exact component={TestRightSidebar}/>
            {/*<Route children={<>Стандартная шапка</>}/>*/}
        </Switch>
    );
}

function RoutingFooter() {
    return (
        <Switch>
            {/*<Route path={routes.callersBaseList()} exact component={CallersBaseHeader}/>*/}
            {/*<Route path={routes.test()} exact component={TestHeader}/>*/}
            {/*<Route children={<>Стандартная шапка</>}/>*/}
        </Switch>
    );
}

export default Routing;
