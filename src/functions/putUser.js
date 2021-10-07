'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// ユーザーテーブル更新API
module.exports.handler = async (event, context) => {
  // リクエストボディ
  const requestBody = JSON.parse(event.body);
  console.log(event.body);

  let errCnt = 0;

  await Promise.all(
    // 配列をmapして要素をPromiseに変換
    requestBody.map(async (item) => {
      const params = {
        TableName: 'user',
        Item: {
          email: item.email,
          password: item.password,
          name: item.name,
        },
      };
      // ユーザーテーブルにデータを追加
      try {
        await dynamoDb.put(params).promise();
      } catch (e) {
        console.error('Unable to update item. Error JSON:', JSON.stringify(e, null, 2));
        errCnt++;
      }
    })
  );

  // レスポンス
  context.succeed({
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ errCnt: errCnt ? errCnt : 0 }),
  });
};
