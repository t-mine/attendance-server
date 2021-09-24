"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const loginForm = JSON.parse(event.body);
  console.log(JSON.stringify(loginForm));
  const email = loginForm.email;
  const password = loginForm.password;

  const params = {
    TableName: "user",
    Key: {
      email: email,
    },
  };

  console.log(JSON.stringify(params));

  return dynamoDb.get(params, (error, data) => {
    const result = {};
    if (error) {
      console.log(error);
      result.statusCode = 500;
      callback(error, result);
    }
    console.log("検索結果 : " + JSON.stringify(data));
    console.log("検索結果パスワード : " + data.Item.password);
    console.log("リクエストボディパスワード : " + password);
    if (data.Item.password === password) {
      result.statusCode = 200;
      result.user = data.Item;
      callback(error, result);
    }
    result.statusCode = 401;
    callback(error, result);
  });
};
