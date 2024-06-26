# Vocard Store Function App Project

This project is a function app that stores and retrieves data for the Vocabulary FlashCard Store. The project is implemented using Azure Functions, Azure Table Storage, and Azure Blob Storage.

## Getting Started

To get started, you will need to have the following installed on your machine:

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)

## Prerequisites

- An Azure account

## Installation

1. Clone the repository

    ```bash
    git clone https://github.com/globalpms/vocard-store-fa.git
    ```

2. Run the project locally

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
