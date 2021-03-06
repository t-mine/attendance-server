'use strict';

const DynamoDb = require('../clients/dynamoDBClient');
const dynamoDb = DynamoDb.create();
const { v4: uuidv4 } = require('uuid');

// ログインAPI
module.exports.handler = async (event, context) => {
  // リクエストボディ
  const requestBody = JSON.parse(event.body);
  console.log(event.body);

  // 検索条件を作成
  const params = {
    TableName: 'user',
    Key: { email: requestBody.email },
  };

  // ユーザーテーブルを検索
  const result = await dynamoDb.get(params).promise();
  const user = result.Item;
  console.log('検索結果 : ' + JSON.stringify(user));

  // レスポンスを生成
  let statusCode = 401;
  let body = '';
  if (user && user.password === requestBody.password) {
    statusCode = 200;
    user.token = uuidv4();
    body = JSON.stringify(user);
  }
  const response = {
    statusCode: statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: body,
  };

  // レスポンスを返す
  context.succeed(response);
};
