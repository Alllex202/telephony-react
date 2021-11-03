const routes = {
    callingList: (): string => '/callings',
    callingCreating: (): string => '/calling/create',
    callingView: (id: string): string => `/calling/${id}`,
    databaseList: (): string => '/databases',
    databaseView: (id: string): string => `/database/${id}`,
    scenarioList: (): string => '/scenarios',
    scenarioView: (id: string) => `/scenario/${id}`,
    settingsView: (): string => '/settings',
    statisticsView: (): string => '/statistics',
};


export default routes;
