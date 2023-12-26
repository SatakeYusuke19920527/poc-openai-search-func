const { app, output } = require('@azure/functions');

const STATUS_SUCCEEDED = 'succeeded';
const STATUS_FAILED = 'failed';

app.storageBlob('blobTrigger', {
  path: 'pdfs/{name}',
  connection: '',
  handler: async (blob, context) => {
    context.log(
      `こちらはテストです。Storage blob 'blobTrigger' url:${context.triggerMetadata.uri}, size:${blob.containerName} bytes`
    );
    const dataToInsertToDatabase = {
      id: 'uuidv4',
      type: Math.random().toString(32).substring(2),
      blobUrl: 'test1',
      blobSize: blob.length,
      status: STATUS_SUCCEEDED,
      trigger: STATUS_FAILED,
      id: 'uuidv4',
    };
    return dataToInsertToDatabase;
  },

  return: output.cosmosDB({
    connection: 'CosmosDBConnection',
    databaseName: 'StorageTutorial',
    containerName: 'analysis',
  }),
});
