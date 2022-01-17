import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {ProtectedRouteProps} from 'routing/site-routing'

const PrivateRoute = ({isAuth, redirectPath, ...rest}: ProtectedRouteProps) => {
    if (true || isAuth) {  // todo Обновить условие при добавлении авторизации
        return <Route {...rest}/>
    } else {
        return <Redirect to={redirectPath ?? ''}/>  // todo Обновить путь при добавлении авторизации
    }
}

export default PrivateRoute
