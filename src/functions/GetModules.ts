import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
// Define the module interface
interface Module {
    id: string;
    title: string;
    description: string;
}

// Create a dummy list of modules
const modules: Module[] = [
    { id: '1', title: 'Module 1', description: 'This is the first module' },
    { id: '2', title: 'Module 2', description: 'This is the second module' },
    { id: '3', title: 'Module 3', description: 'This is the third module' }
];

// Define the GetModules function
export async function GetModules(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    // Serialize the modules list to a JSON string
    const modulesJson = JSON.stringify(modules);
    // Return the dummy list of modules in a JSON response
    return {
        status: 200,
        body: modulesJson
    };
};

app.http('GetModules', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: GetModules
});
