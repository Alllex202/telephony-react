import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {routes} from 'routing/routes'
import {privateSiteRoutes, publicSiteRoutes} from 'routing/site-routing'
import PrivateRoute from 'routing/private-route'
import {ConnectedRouter} from 'connected-react-router'
import {history} from 'store/features/router'

const Routing = () => {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                {publicSiteRoutes.map((route, index) => (
                    <Route key={`public-${index}`} {...route}/>
                ))}

                {privateSiteRoutes.map((route, index) => (
                    <PrivateRoute key={`private-${index}`} {...route}/>
                ))}

                <Redirect to={routes.calling.list()}/>
            </Switch>
        </ConnectedRouter>
    )
}

export default Routing
