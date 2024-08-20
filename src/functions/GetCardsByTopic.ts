import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TableStorageHelper } from "../libs/TableStorageHelper";

export async function GetFlashcardsByTopic(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const topicKey = request.params.topicKey;
    if (!topicKey) {
        return {
            status: 400,
            body: 'TopicKey is required'
        };
    }
    try {
        const entities = await TableStorageHelper.getEntitiesByPartitionKey('Flashcards', topicKey);
        const flashcardsJson = JSON.stringify(entities);
        return {
            status: 200,
            body: flashcardsJson
        };

    } catch (error) {
        context.log(error.message);
        return {
            status: 500,
            body: 'An error occurred while retrieving the flashcards'
        };
    }
};

app.http('GetFlashcardsByTopic', {
    route: 'topics/{topicKey}/flashcards',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetFlashcardsByTopic
});
