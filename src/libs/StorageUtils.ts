import { TableClient, TableEntity } from "@azure/data-tables";

const connectionString = process.env.StorageConnectionString;
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
    }
};