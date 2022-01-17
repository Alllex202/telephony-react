import {routes} from 'routing/routes'

interface MenuItemModel {
    link: string,
    label: string,
}

export const menuItems: MenuItemModel[] = [
    {link: routes.calling.list(), label: 'Обзванивание'},
    {link: routes.scenario.list(), label: 'Сценарии'},
    {link: routes.callersBase.list(), label: 'Базы клиентов'},
    {link: routes.stats(), label: 'Статистика'},
    {link: routes.test(), label: 'Test'}
]
