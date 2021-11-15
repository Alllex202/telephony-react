const routes = {
    callingList: (): string => '/callings',
    callingCreating: (): string => '/calling/create',
    callingView: (id: string | number): string => `/calling/${id}`,
    databaseList: (): string => '/databases',
    databaseView: (id: string | number): string => `/database/${id}`,
    scenarioList: (): string => '/scenarios',
    scenarioView: (id: string | number) => `/scenario/${id}`,
    settingsView: (): string => '/settings',
    statisticsView: (): string => '/statistics',
    test: (): string => '/test',
};


export default routes;
