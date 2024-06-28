import { app, InvocationContext } from "@azure/functions";

export async function UploadModuleEvent(blob: Buffer, context: InvocationContext): Promise<void> {
    context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`);
    
    const blobContent = blob.toString('utf-8');
    const blobJson = JSON.parse(blobContent);
    const moduleTitle = blobJson.get('title');
    context.log(`Module title: ${moduleTitle}`);
    const topics = blobJson.get('topics');
    for (const topic of topics) {
        context.log(`Processing topic: ${topic}`);
        const topicTitle = topic.get('title');
    }
}

app.storageBlob('UploadModuleEvent', {
    path: 'modules/{name}',
    connection: 'AzureWebJobsStorage',
    handler: UploadModuleEvent
});
