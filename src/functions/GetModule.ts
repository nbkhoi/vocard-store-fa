import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TableStorageHelper } from "../libs/TableStorageHelper";

export async function GetModule(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const rowKey = request.params.moduleKey;
    try {
        const module = await TableStorageHelper.getEntity("Modules", 'DEFAULT', rowKey);
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
