'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
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
  return dynamoDb.get(params, (error, data) => {
    const result = {};
    if (error) {
      console.log(error);
      result.statusCode = 500;
      callback(error, result);
    }
    console.log('検索結果 : ' + JSON.stringify(data));
    if (data.Item && data.Item.password === requestBody.password) {
      result.statusCode = 200;
      result.user = data.Item;
      callback(error, result);
    } else {
      result.statusCode = 401;
      callback(error, result);
    }
  });
};
