import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TableClient } from "@azure/data-tables";
import { Module } from "../models/module";
import { v4 as uuidv4 } from 'uuid';

export async function CreateModule(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const connectionString = process.env.StorageConnectionString;
    const tableName = process.env.MODULE_TABLE_NAME || 'modules';
    const client = TableClient.fromConnectionString(connectionString, tableName);
    try {
        const module: Module = await request.json() as Module;
        if (!module.name) {
            context.error("Module name is required");
            return {
                status: 400,
                body: 'Module name is required'
            };
        }
        const entity = {
            partitionKey: "module",
            rowKey: uuidv4(),
            name: module.name,
            description: module.description
        };
        context.log(entity);
        await client.createEntity(entity);
        return {
            status: 200,
            body: 'Module created successfully'
        };

    } catch (error) {
        context.error(error.message);
        return {
            status: 500,
            body: 'An error occurred while creating the module'
        };
    }
};

app.http('CreateModule', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: CreateModule
});
