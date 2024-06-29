import { TableClient, TableEntity } from "@azure/data-tables";
import { BlobDownloadResponseParsed, ContainerClient } from "@azure/storage-blob";

const connectionString = process.env.StorageConnectionString;
async function streamToBuffer(readableStream: NodeJS.ReadableStream) {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
  
      readableStream.on('data', (data) => {
        const content: Buffer = data instanceof Buffer ? data : Buffer.from(data);
        chunks.push(content);
      });
      readableStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on('error', reject);
    });
  }
export const StorageUtils = {
    createObjectInTableStorage: async function(tableName: string, partitionKey: string, rowKey: string, data: any): Promise<void> {
        const client = TableClient.fromConnectionString(connectionString, tableName);
        const entity: TableEntity = {
            partitionKey,
            rowKey,
            ...data
        };
        await client.createEntity(entity);
    },

    getObjectFromTableStorage: async function(tableName: string, partitionKey: string, rowKey: string): Promise<any> {
        const client = TableClient.fromConnectionString(connectionString, tableName);
        const entity = await client.getEntity(partitionKey, rowKey);
        return entity;
    },

    listObjectsFromTableStorage: async function(tableName: string): Promise<any[]> {
        const client = TableClient.fromConnectionString(connectionString, tableName);
        const entities = [];
        for await (const entity of client.listEntities()) {
            entities.push(entity);
        }
        return entities;
    },

    listObjectsByPartitionFromTableStorage: async function(tableName: string, partitionKey: string): Promise<any[]> {
        const client = TableClient.fromConnectionString(connectionString, tableName);
        const entities = [];
        for await (const entity of client.listEntities({ queryOptions: { filter: `PartitionKey eq '${partitionKey}'` } })) {
            entities.push(entity);
        }
        return entities;
    },

    updateObjectInTableStorage: async function(tableName: string, partitionKey: string, rowKey: string, data: any): Promise<void> {
        const client = TableClient.fromConnectionString(connectionString, tableName);
        const entity: TableEntity = {
            partitionKey,
            rowKey,
            ...data
        };
        await client.updateEntity(entity);
    },

    deleteObjectFromTableStorage: async function(tableName: string, partitionKey: string, rowKey: string): Promise<void> {
        const client = TableClient.fromConnectionString(connectionString, tableName);
        await client.deleteEntity(partitionKey, rowKey);
    },

    getFileFromBlobContainer: async function(containerName: string, fileName: string): Promise<any> {
        const containerClient = new ContainerClient(connectionString, containerName);
        // log the container name
        console.log(containerName);
        const blobClient = containerClient.getBlobClient(fileName);
        // log the blob name
        console.log(fileName);
        const downloadResponse: BlobDownloadResponseParsed = await blobClient.download();
        if (!downloadResponse.errorCode && downloadResponse.readableStreamBody) {
            const downloaded = await streamToBuffer(
                downloadResponse.readableStreamBody
            );
            if (downloaded) {
                return downloaded;
            }
        }
    }
};