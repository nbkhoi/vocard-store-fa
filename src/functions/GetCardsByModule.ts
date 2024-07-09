import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { StorageUtils } from "../libs/StorageUtils";
import { log } from "console";

export async function GetCardsByModule(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const moduleKey = request.params.moduleKey;

    if (!moduleKey) {
        return {
            status: 400,
            body: 'ModuleKey is required'
        };
    }
    try {
        const topics = await StorageUtils.listObjectsByPartitionFromTableStorage('Topics', moduleKey);
        const cards = [];
        for (const topic of topics) {
            log(`Getting cards for topic ${topic.rowKey}`);
            const topicCards = await StorageUtils.listObjectsByPartitionFromTableStorage('Cards', topic.rowKey);
            cards.push(...topicCards);
        }
        const cardsJson = JSON.stringify(cards);
        
        return {
            status: 200,
            body: cardsJson
        };
    } catch (error) {
        context.log(error.message);
        return {
            status: 500,
            body: 'An error occurred while retrieving the cards'
        };
    }
};

app.http('GetCardsByModule', {
    route: 'modules/{moduleKey}/cards',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetCardsByModule
});
