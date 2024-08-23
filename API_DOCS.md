# Flashcards App API Docs

## API Endpoint

The base URL for the API is:
  
  ```PlainText
  https://devflashvocabapifnapp.azurewebsites.net
  ```

## Get Modules

- Endpoint: `GET /api/modules`
- Description: Retrieves all the modules.
- Response: JSON array containing all modules.

## Get Module

- Endpoint: `GET /api/modules/{rowKey}`
- Description: Retrieves a specific module.
- Parameters:
  - `rowKey`: The module row key.
- Response: JSON object representing the module.

## Get Topics by Module

- Endpoint: `GET /api/modules/{rowKey}/topics`
- Description: Retrieves all the topics for a specific module.
- Parameters:
  - `rowKey`: The module row key.
- Response: JSON array containing all topics for the module.

## Get Flashcards by Topic

- Endpoint: `GET /api/topics/{rowKey}/flashcards`
- Description: Retrieves all the flashcards for a specific topic.
- Parameters:
  - `rowKey`: The topic row key.
- Response: JSON array containing all flashcards for the topic.

## Get Flashcards by Module

- Endpoint: `GET /api/modules/{rowKey}/flashcards`
- Description: Retrieves all the flashcards for a specific module.
- Parameters:
  - `rowKey`: The module row key.
- Response: JSON array containing all flashcards for the module.

## Register New Device

- Endpoint: `POST /api/devices`
- Description: Registers a new device.
- Request Body: JSON object containing the device information.
  {
    deviceId: string;
    comment?: string;
    isPremium?: boolean;
    disabled?: boolean;
  }

## Check Premium

- Endpoint: `POST /api/devices/check-premium
- Description: Checks if a device is premium.
- Request Body: JSON object containing the device information.
  {
    deviceId: string;
  }
- Response: boolean value indicating if the device is premium.