import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import MainLayout from "../modules/main-layout";
import RoutingBody from "./components/routing-body";
import RoutingHeader from "./components/routing-header";
import RoutingFooter from "./components/routing-footer";
import RoutingRightSidebar from "./components/routing-right-sidebar";

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


export default Routing;
