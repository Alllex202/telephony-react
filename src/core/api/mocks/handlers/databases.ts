import {rest} from "msw";
import {fakeDatabases} from "../fake-data";

export const databases = [
    rest.get('http://10.0.0.2:3333/callers-base', (req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200), ctx.json(fakeDatabases));
    }),
];
