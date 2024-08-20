import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Device } from "../models/Devices";
import { TableStorageHelper } from "../libs/TableStorageHelper";

export async function IsPremiumDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const device = await request.json() as Device;
    const deviceId = device.deviceId;
    const existingDevices = await TableStorageHelper.queryEntities('Devices', `deviceId eq '${deviceId}'`);
    return {
        status: 200,
        body: JSON.stringify(existingDevices.length > 0 && !existingDevices[0]['disabled'] && existingDevices[0]['isPremium'])
    };
};

app.http('IsPremiumDevice', {
    methods: ['POST'],
    route: 'devices/check-premium',
    authLevel: 'anonymous',
    handler: IsPremiumDevice
});
