import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { generateDefinitions } from "../libs/WordDefinitionGenerator";
export async function RecommendDefinitions(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const word = request.query.get('word');
    if (word && word.length > 0) {
        return generateDefinitions(word).then(definitions => {
            return {
                status: 200,
                body: JSON.stringify(definitions)
            };
        });
    } else {
        return {
            status: 200,
            body: JSON.stringify([])
        };
    }
};

app.http('RecommendDefinitions', {
    methods: ['GET'],
    route: 'recommend-definitions',
    authLevel: 'anonymous',
    handler: RecommendDefinitions
});
