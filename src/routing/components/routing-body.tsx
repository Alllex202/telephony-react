import React from "react";
import {Route, Switch} from "react-router-dom";
import routes from "../routes";
import CallersBaseListBody from "../../modules/callers-base/list/body";
import CallersBaseAddBody from "../../modules/callers-base/add/body";
import Test from "../../modules/test/body";
import CallersBaseViewBody from "../../modules/callers-base/view/body";

export default function RoutingBody() {
    return (
        <Switch>
            <Route path={routes.callersBaseList()} exact component={CallersBaseListBody}/>
            <Route path={routes.callersBaseAdd()} exact component={CallersBaseAddBody}/>
            <Route path={routes.callersBaseView(':callersBaseId')} exact component={CallersBaseViewBody}/>
            <Route path={routes.test()} exact component={Test}/>
        </Switch>
    );
}