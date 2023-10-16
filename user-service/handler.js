'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.createUser = async (event) => {
    const requestBody = JSON.parse(event.body);

    const params = {
        TableName: 'Users',
        Item: {
            id: requestBody.id,
            // Altri attributi dell'utente
        }
    };

    try {
        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Utente creato con successo' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Si è verificato un errore durante la creazione dell\'utente' })
        };
    }
};


module.exports.getUserById = async (event) => {
  const userId = event.pathParameters.id;

  const params = {
      TableName: 'Users',
      Key: {
          id: userId
      }
  };

  try {
      const data = await dynamoDB.get(params).promise();

      if (!data.Item) {
          return {
              statusCode: 404,
              body: JSON.stringify({ message: 'Utente non trovato' })
          };
      }

      return {
          statusCode: 200,
          body: JSON.stringify(data.Item)
      };
  } catch (error) {
      return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Si è verificato un errore durante il recupero dell\'utente' })
      };
  }
};
