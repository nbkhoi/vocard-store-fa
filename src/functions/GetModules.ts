import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TableClient } from '@azure/data-tables';

export async function GetModules(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const connectionString = process.env.StorageConnectionString;
    const tableName = process.env.MODULE_TABLE_NAME || 'modules';
    const client = TableClient.fromConnectionString(connectionString, tableName);
    try {
        const modules = [];
        const entities = client.listEntities();
        for await (const entity of entities) {
            console.log(entity);
            modules.push(entity)
        }
        const modulesJson = JSON.stringify(modules);
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
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: GetModules
});
