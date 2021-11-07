const serverApi = process.env.REACT_APP_SERVER_API;

export const apiRoutes = {
    databases: () => `${serverApi}/callers-base`,
    databasesId: (id: string | number) => `${serverApi}/callers-base/${id}`,
    databasesUpload: () => `${serverApi}/upload/exel`,
};
