import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TableClient } from '@azure/data-tables';
import { StorageUtils } from "../libs/StorageUtils";

export async function GetModules(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const tableName = process.env.MODULE_TABLE_NAME || 'modules';
    try {
        const entities = await StorageUtils.listObjectsFromTableStorage(tableName);
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
