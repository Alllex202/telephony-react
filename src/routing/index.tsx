import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {routes} from 'routing/routes'
import {privateSiteRoutes, publicSiteRoutes} from 'routing/site-routing'
import PrivateRoute from 'routing/private-route'

const Routing = () => {
    return (
        <Router>
            <Switch>
                {publicSiteRoutes.map((route, index) => (
                    <Route key={`public-${index}`} {...route}/>
                ))}

                {privateSiteRoutes.map((route, index) => (
                    <PrivateRoute key={`private-${index}`} {...route}/>
                ))}

                <Redirect to={routes.calling.list()}/>
            </Switch>
        </Router>
    )
}

export default Routing
