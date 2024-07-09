import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { StorageUtils } from "../libs/StorageUtils";

export async function GetModule(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const tableName = process.env.MODULE_TABLE_NAME || 'Modules';
    const partitionKey = request.query.get('partitionKey') || 'DEFAULT';
    const rowKey = request.params.moduleKey;
    if (!partitionKey || !rowKey) {
        return {
            status: 400,
            body: 'PartitionKey and RowKey are required'
        };
    }
    try {
        const module = await StorageUtils.getObjectFromTableStorage(tableName, partitionKey, rowKey);
        return {
            status: 200,
            body: JSON.stringify(module)
        };

    } catch (error) {
        context.error(error.message);
        return {
            status: 500,
            body: 'An error occurred while retrieving the module'
        };
    }
};

app.http('GetModule', {
    route: 'modules/{moduleKey}',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetModule
});
