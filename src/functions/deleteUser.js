'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// ユーザー削除API
module.exports.handler = async (event, context) => {
  // リクエストボディ
  const requestBody = JSON.parse(event.body);
  console.log(event.body);

  let errCnt = 0;

  await Promise.all(
    // 配列をmapして要素をPromiseに変換
    requestBody.map(async (item) => {
      // 削除条件を作成
      const params = {
        TableName: 'user',
        Key: {
          email: item.email,
        },
      };

      // ユーザーを削除
      dynamoDb.delete(params, function (err) {
        if (err) {
          console.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2));
          errCnt++;
        }
      });

      try {
        await dynamoDb.delete(params).promise();
      } catch (e) {
        console.error('Unable to delete item. Error JSON:', JSON.stringify(e, null, 2));
        // レスポンスを返す
        context.succeed({
          statusCode: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ errCnt: errCnt }),
        });
      }
    })
  );

  // レスポンスを返す
  context.succeed({
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ errCnt: errCnt ? errCnt : 0 }),
  });
};
