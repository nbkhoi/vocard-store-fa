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
        ...moduleWithoutTopics,
        ordinal: 1,
        accessTier: "community",
        disabled: false,
        //topics: []
    };
    const moduleKey = uuidv4()
    const tuples: [any, any, any] = [null, [], []];
    let topicOrdinals = 0;
    for (const topic of topics) {
        const topicKey = uuidv4()
        let flashcardCount = 0;
        topicOrdinals++;
        for (const card of topic.cards) {
            flashcardCount++;
            const decoratedCard = {
                module: decoratedModule.title,
                topic: topic.title,
                ordinal: flashcardCount,
                accessTier: "community",
                disabled: false,
                ...card
            };
            const cardKey = uuidv4();
            StorageUtils.createObjectInTableStorage('Flashcards', topicKey, cardKey, decoratedCard);
        };
        const { cards, ...topicWithhoutCards } = topic;
        const decoratedTopic = {
            module: decoratedModule.title,
            ...topicWithhoutCards,
            ordinal: topicOrdinals,
            accessTier: "community",
            disabled: false,
            flashcardCount: flashcardCount
        };
        StorageUtils.createObjectInTableStorage('Topics', moduleKey, topicKey, decoratedTopic);
    }
    StorageUtils.createObjectInTableStorage('Modules', 'DEFAULT', moduleKey, decoratedModule);

    return tuples;
}

app.storageBlob('PublishModule', {
    path: `${process.env.BLOB_CONTAINER_NAME}/{name}`,
    connection: 'AzureWebJobsStorage',
    handler: PublishModule
});
