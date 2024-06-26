# Vocard Store Function App Project

This project is a function app that stores and retrieves data for the Vocabulary FlashCard Store. The project is implemented using Azure Functions, Azure Table Storage, and Azure Blob Storage.

## Getting Started

To get started, you will need to have the following installed on your machine:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Functions Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Azure Storage Explorer](https://azure.microsoft.com/en-us/features/storage-explorer/)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

## Prerequisites

- An Azure account
- An Azure Storage Account
- An Azure Function App

## Installation

1. Clone the repository

    ```bash
    git clone https://github.com/globalpms/vocard-store-fa.git
    ```

2. Open the project in Visual Studio Code

    ```bash
    cd vocard-store-fa
    code .
    ```

3. Install the required extensions

    - Azure Functions

    ```bash
    code --install-extension ms-azuretools.vscode-azurefunctions
    ```

    - Azure Storage

        ```bash
        code --install-extension ms-azuretools.vscode-azurestorage
        ```

4. Create a new Azure Function App

    ```bash
    az group create --name <resource-group-name> --location <location>
    az storage account create --name <storage-account-name> --resource-group <resource-group-name> --location <location> --sku Standard_LRS
    az functionapp create --resource-group <resource-group-name> --consumption-plan-location <location> --name <function-app-name> --storage-account <storage-account-name> --runtime dotnet
    ```

5. Create a new Azure Storage Account

    ```bash
    az storage account create --name <storage-account-name> --resource-group <resource-group-name> --location <location> --sku Standard_LRS
    ```

6. Update the `local.settings.json` file with the connection strings for the Azure Storage Account

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "AzureWebJobsStorage": "UseDevelopmentStorage=true"
        }
    }
    ```

7. Run the project

    ```bash
    npm start
    ```

## Usage

The project contains the following functions:

- **GetModules**: Retrieves all the modules from the table storage
- **GetModule**: Retrieves a specific module from the table storage
- **CreateModule**: Creates a new module in the table storage
- **UpdateModule**: Updates an existing module in the table storage
- **DeleteModule**: Deletes a module from the table storage
- **UploadFile**: Uploads a file to the blob storage

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
