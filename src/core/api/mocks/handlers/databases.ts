// import {rest} from "msw";
// import {fakeDatabases} from "../fake-data";
// import {apiRoutes} from "../../routes";
// import {DatabaseModel} from "../../models";
// import {copy} from "../../../../shared/utils";
//
// let fakeDB: DatabaseModel[] = copy(fakeDatabases);
//
// export const databases = [
//     rest.get(apiRoutes.databases(), async (req, res, ctx) => {
//         return res(ctx.delay(1000), ctx.status(200), ctx.json(fakeDB.map(db => {
//             const _db = copy(db);
//             delete _db['callers'];
//             return _db;
//         })));
//     }),
//
//     rest.get(apiRoutes.databasesId(':databaseId'), async (req, res, ctx) => {
//         const data = fakeDB.find(db => String(db.id) === String(req.params.databaseId));
//
//         if (data) return res(ctx.delay(1000), ctx.status(200), ctx.json(data));
//         return res(ctx.delay(1000), ctx.status(404));
//     }),
//
//
//     rest.delete(apiRoutes.databasesId(':databaseId'), (req, res, ctx) => {
//         fakeDB = fakeDB.filter(db => String(db.id) !== String(req.params.databaseId));
//
//         return res(ctx.delay(1000), ctx.status(200));
//     }),
//
//     rest.post(apiRoutes.databasesUpload(), (req, res, ctx) => {
//         const newDB: DatabaseModel = {
//             id: new Date().getTime(),
//             name: req.url.searchParams.get('name') || 'template',
//             created: new Date().getTime(),
//             callers: [{
//                 id: new Date().getTime(),
//                 number: '55555',
//                 valid: true,
//                 variables: {
//                     var1: 'qwe',
//                     var2: 'qwe2',
//                 },
//             }],
//             variablesList: ['var1', 'var2']
//         };
//         fakeDB = [...fakeDB, newDB];
//
//         return res(ctx.delay(1000), ctx.status(200), ctx.json(newDB));
//     }),
// ];


export {}
