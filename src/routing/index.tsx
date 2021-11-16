import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from "./routes";
import DatabaseList from "../modules/database/list";
import DatabaseView from "../modules/database/view";
import MainLayout from "../modules/main-layout";
import Test from "../modules/test";
import TestHeader from "../modules/test/header";

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
            <Route path={routes.databaseList()} exact component={DatabaseList}/>
            <Route path={routes.databaseView(':databaseId')} exact component={DatabaseView}/>
            <Route path={routes.test()} exact component={Test}/>
        </Switch>
    );
}

function RoutingHeader() {
    return (
        <Switch>
            {/*<Route path={routes.databaseList()} exact component={DatabaseList}/>*/}
            {/*<Route path={routes.databaseView(':databaseId')} exact component={DatabaseView}/>*/}
            <Route path={routes.test()} exact component={TestHeader}/>
            <Route children={<>Стандартная шапка</>}/>
        </Switch>
    );
}

export default Routing;
