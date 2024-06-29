import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { StorageUtils } from "../libs/StorageUtils";

export async function GetModuleBlobFile(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    
    const blobName = request.query.get('blobName');
    if (!blobName) {
        return {
            status: 400,
            body: 'BlobName is required'
        };
    }
    try {
        const containerName = process.env.BLOB_CONTAINER_NAME || 'modules';
        const blob = await StorageUtils.getFileFromBlobContainer(containerName, blobName);
        return {
            status: 200,
            body: blob
        };

    } catch (error) {
        context.log(error.message);
        return {
            status: 500,
            body: 'An error occurred while retrieving the blob file'
        };
    }

};

app.http('GetModuleBlobFile', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: GetModuleBlobFile
});
