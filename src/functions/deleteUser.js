'use strict';

const DynamoDb = require('../clients/dynamoDBClient');
const dynamoDb = DynamoDb.create();

// ユーザー削除API
module.exports.handler = async (event, context) => {
  // リクエストボディ
  const requestBody = JSON.parse(event.body);
  console.log(event.body);

  let errCnt = 0;

  // ユーザーを削除
  await Promise.all(
    requestBody.map(async (item) => {
      const params = {
        TableName: 'user',
        Key: {
          email: item.email,
        },
      };
      try {
        await dynamoDb.delete(params).promise();
      } catch (e) {
        console.error('Unable to delete item. Error JSON:', JSON.stringify(e, null, 2));
        errCnt++;
      }
    })
  );

  // レスポンスを返す
  context.succeed({
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ errCnt: errCnt }),
  });
};
