import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { StorageUtils } from "../libs/StorageUtils";

export async function GetTopicsByModule(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const moduleKey = request.params.moduleKey;
    if (!moduleKey) {
        return {
            status: 400,
            body: 'ModuleKey is required'
        };
    }
    try {
        const entities = await StorageUtils.listObjectsByPartitionFromTableStorage('Topics', moduleKey);
        const topicsJson = JSON.stringify(entities);
        return {
            status: 200,
            body: topicsJson
        };

    } catch (error) {
        context.log(error.message);
        return {
            status: 500,
            body: 'An error occurred while retrieving the topics'
        };
    }
};

app.http('GetTopicsByModule', {
    route: 'modules/{moduleKey}/topics',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetTopicsByModule
});
