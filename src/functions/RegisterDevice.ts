import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Device } from "../models/Devices";
import { TableStorageHelper } from "../libs/TableStorageHelper";
import { v4 as uuidv4 } from 'uuid';

export async function RegisterDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const data = await request.json() as Device;
    if ('deviceId' in data) {
        const existingDevices = await TableStorageHelper.queryEntities('Devices', `deviceId eq '${data.deviceId}'`);
        if (existingDevices.length > 0) {
            return {
                status: 409,
                body: 'Device already registered'
            };
        }
    }
    try {
        await TableStorageHelper.saveEntity('Devices', {
            partitionKey: 'DEFAULT',
            rowKey: uuidv4(),
            ...data
        });
        return {
            status: 200,
            body: 'Device registered'
        };

    } catch (error) {
        context.error(error.message);
        return {
            status: 500,
            body: 'An error occurred while registering the device'
        };
    }
};

app.http('RegisterDevice', {
    methods: ['POST'],
    route: 'devices/register',
    authLevel: 'anonymous',
    handler: RegisterDevice
});
