import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from "./routes";
import MainLayout from "../modules/main-layout";
import Test from "../modules/test";
import TestHeader from "../modules/test/header";
import CallersBaseList from "../modules/callers-base/list";
import CallersBaseHeader from "../modules/callers-base/header";

function Routing() {
    return (
        <Router>
            <MainLayout childrenBody={<RoutingBody/>} childrenHeader={<RoutingHeader/>}/>
        </Router>
    );
}

function RoutingBody() {
    return (
        <Switch>
            <Route path={routes.callersBaseList()} exact component={CallersBaseList}/>
            {/*<Route path={routes.callersBaseView(':databaseId')} exact component={DatabaseView}/>*/}
            <Route path={routes.test()} exact component={Test}/>
        </Switch>
    );
}

function RoutingHeader() {
    return (
        <Switch>
            <Route path={routes.callersBaseList()} exact component={CallersBaseHeader}/>
            <Route path={routes.test()} exact component={TestHeader}/>
            <Route children={<>Стандартная шапка</>}/>
        </Switch>
    );
}

export default Routing;
