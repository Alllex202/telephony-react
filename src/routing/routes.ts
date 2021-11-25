const routes = {
    callersBaseAdd: (): string => `/callers-base/add`,
    callersBaseList: (): string => `/callers-bases`,
    callersBaseView: (id: string | number): string => `/callers-base/view/id${id}`,
    callingList: (): string => '/callings',
    callingCreating: (): string => '/calling/create',
    callingView: (id: string | number): string => `/calling/${id}`,
    // databaseList: (): string => '/callers-bases',
    // databaseView: (id: string | number): string => `/database/${id}`,
    scenarioList: (): string => '/scenarios',
    scenarioView: (id: string | number) => `/scenario/${id}`,
    settingsView: (): string => '/settings',
    statisticsView: (): string => '/statistics',
    test: (): string => '/test',
};


export default routes;
