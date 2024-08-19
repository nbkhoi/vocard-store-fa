import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { StorageUtils } from "../libs/StorageUtils";

export async function GetCardsByTopic(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const topicKey = request.params.topicKey;
    if (!topicKey) {
        return {
            status: 400,
            body: 'TopicKey is required'
        };
    }
    try {
        const entities = await StorageUtils.listObjectsByPartitionFromTableStorage('Flashcards', topicKey);
        const cardsJson = JSON.stringify(entities);
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

app.http('GetCardsByTopic', {
    route: 'topics/{topicKey}/cards',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetCardsByTopic
});
