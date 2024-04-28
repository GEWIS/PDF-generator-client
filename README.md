# PDF-server-client
This repository contains the client for the PDF-generator-server. The client is automatically generated using [NSwag](https://github.com/RicoSuter/NSwag). 

# Usage
To use the client, add the following dependency to your `package.json`.

```json
{
  "dependencies": {
    "@pdf/pdf-generator-client": "github:GEWIS/pdf-generator-client"
  }
}
```

Simply import it and make a client to start generating invoices.

```typescript
import { Client } from '@pdf/pdf-generator-client';

let client =  new Client(process.env.BASE_URL);
client.generateInvoice(...);
```