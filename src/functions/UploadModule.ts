import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { read, ReadStream } from "fs";
import { text } from "stream/consumers";

export async function UploadModule(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const connectionString = process.env.StorageConnectionString;
    const containerName = process.env.CONTAINER_NAME || 'modules';
    if (!connectionString) {
        context.error("Azure Storage connection string is required");
        return {
            status: 400,
            body: 'Azure Storage connection string is required'
        };
    }
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    if (await containerClient.exists() === false) {
        context.log(`Creating container ${containerName}...`);
        await containerClient.create();
    } else {
        context.log(`Container ${containerName} already exists`);
    }
    try {
        const blobName = request.query.get('blobName');
        if (!blobName) {
            context.error("Blob name is required");
            return {
                status: 400,
                body: 'Blob name is required'
            };
        }
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const body = await request.text();
        const uploadBlobResponse = await blockBlobClient.upload(body, body.length);
        context.log(`Blob uploaded: ${uploadBlobResponse.requestId}`);
        return {
            status: 200,
            body: 'Blob uploaded successfully'
        };
    } catch (error) {
        context.error(error.message);
        return {
            status: 500,
            body: 'An error occurred while uploading the blob'
        };
    }

};

app.http('UploadModule', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: UploadModule
});
