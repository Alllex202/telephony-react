import {routes} from 'routing/routes'

interface MenuItemModel {
    link: string,
    label: string,
}

export const menuItems: MenuItemModel[] = [
    {link: routes.callingList(), label: 'Обзванивание'},
    {link: routes.scenarioList(), label: 'Сценарии'},
    {link: routes.callersBaseList(), label: 'Базы клиентов'},
    {link: routes.statsView(), label: 'Статистика'},
    {link: routes.test(), label: 'Test'}
]
