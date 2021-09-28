'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// ログインAPI
module.exports.handler = async (event, context) => {
  // リクエストボディ
  const requestBody = JSON.parse(event.body);
  console.log(event.body);

  // 検索条件を作成
  const params = {
    TableName: 'user',
    Key: {
      email: requestBody.email,
    },
  };
  console.log(JSON.stringify(params));

  // ユーザーテーブルを検索
  const user = await dynamoDb.get(params).promise();
  console.log('検索結果 : ' + JSON.stringify(user));

  // 検索結果に応じてレスポンスの内容を生成
  const result = {};
  if (user.Item && user.Item.password === requestBody.password) {
    result.statusCode = 200;
    result.user = user.Item;
  } else {
    result.statusCode = 401;
  }
  const response = {
    statusCode: result.statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: result.user ? JSON.stringify(result.user) : '',
  };

  // レスポンスを返す
  context.succeed(response);
};
