import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { log } from "console";
import { TableStorageHelper } from "../libs/TableStorageHelper";

export async function GetFlashcardsByModule(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const moduleKey = request.params.moduleKey;

    if (!moduleKey) {
        return {
            status: 400,
            body: 'ModuleKey is required'
        };
    }
    try {
        const topics = await TableStorageHelper.getEntitiesByPartitionKey('Topics', moduleKey);
        const flashcards = [];
        for (const topic of topics) {
            log(`Getting flashcards for topic ${topic.rowKey}`);
            const topicFlashcards = await TableStorageHelper.getEntitiesByPartitionKey('Flashcards', topic.rowKey);
            flashcards.push(...topicFlashcards);
        }
        const flashcardsJson = JSON.stringify(flashcards);
        
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

app.http('GetFlashcardsByModule', {
    route: 'modules/{moduleKey}/flashcards',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetFlashcardsByModule
});
