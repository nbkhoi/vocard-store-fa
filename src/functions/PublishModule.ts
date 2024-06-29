import { app, InvocationContext } from "@azure/functions";
import { StorageUtils } from "../libs/StorageUtils";
import { v4 as uuidv4 } from 'uuid';

export async function PublishModule(blob: Buffer, context: InvocationContext): Promise<void> {
    context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`);
    // Read the blob content
    const blobContent = blob.toString('utf-8');
    // Parse the JSON content
    const [module, topics, cards] = await ProcessBlob(blobContent);
}

// Define an async function that processes the blob and returns tuple of three objects
export async function ProcessBlob(string: string): Promise<[any, any, any]> {
    const blobJson = JSON.parse(string);
    const { topics, ...moduleWithoutTopics } = blobJson;
    const decoratedModule = {
        ...moduleWithoutTopics
        //topics: []
    };
    const tuples: [any, any, any] = [null, [], []];
    for (const topic of topics) {
        //decoratedModule.topics.push(topic.title);
        let cardCount = 0;
        for (const card of topic.cards) {
            const decoratedCard = {
                module: decoratedModule.title,
                topic: topic.title,
                ...card
            };
            StorageUtils.createObjectInTableStorage('Cards', decoratedCard.topic, uuidv4(), decoratedCard);
            cardCount++;
        };
        const { cards, ...topicWithhoutCards } = topic;
        const decoratedTopic = {
            module: decoratedModule.title,
            ...topicWithhoutCards,
            cardCount: cardCount
        };
        StorageUtils.createObjectInTableStorage('Topics', decoratedTopic.module, decoratedTopic.title, decoratedTopic);
    }
    StorageUtils.createObjectInTableStorage('Modules', 'Modules', decoratedModule.title, decoratedModule);

    return tuples;
}

app.storageBlob('PublishModule', {
    path: `${process.env.BLOB_CONTAINER_NAME}/{name}`,
    connection: 'AzureWebJobsStorage',
    handler: PublishModule
});
