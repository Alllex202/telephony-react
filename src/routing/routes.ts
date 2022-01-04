const routes = {
    callersBaseAdd: (): string => `/callers-base/add`,
    callersBaseList: (): string => `/callers-bases`,
    callersBaseView: (id: string | number): string => `/callers-base/view/id${id}`,
    callingList: (): string => '/callings',
    callingCreate: (id?: number | string): string => `/calling/create${id ? `/id${id}` : ''}`,
    callingView: (id: string | number): string => `/calling/view/id${id}`,
    scenarioList: (): string => '/scenarios',
    scenarioView: (id: string | number) => `/scenario/view/id${id}`,
    settingsView: (): string => '/settings',
    statisticsView: (): string => '/statistics',
    test: (): string => '/test'
}

export default routes
