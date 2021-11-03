import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from "./routes";
import DatabaseList from "../modules/database/list";
import DatabaseView from "../modules/database/view";
import MainLayout from "../modules/main-layout";

const Routing = () => {
    return (
        <Router>
            <MainLayout>
                <Switch>
                    <Route path={routes.databaseList()} exact component={DatabaseList}/>
                    <Route path={routes.databaseView(':databaseId')} exact component={DatabaseView}/>
                </Switch>
            </MainLayout>
        </Router>
    );
};

export default Routing;
