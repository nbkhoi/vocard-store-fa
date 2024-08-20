import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TableStorageHelper } from "../libs/TableStorageHelper";
export async function GetModules(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    try {
        const entities = await TableStorageHelper.listEntities('Modules');
        const modulesJson = JSON.stringify(entities);
        return {
            status: 200,
            body: modulesJson
        };

    } catch (error) {
        context.log(error.message);
        return {
            status: 500,
            body: 'An error occurred while retrieving the modules'
        };
    }
};

app.http('GetModules', {
    route: 'modules',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetModules
});
