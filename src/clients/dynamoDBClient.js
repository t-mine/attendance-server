'use strict';

const AWS = require('aws-sdk');

// 使い方
// const DDBClient = require('../clients/dynamoDBClient');
// dDBClient = DDBClient.instance();

module.exports.instance = function () {
  return new AWS.DynamoDB.DocumentClient({
    maxRetries: 5,
    httpOptions: { timeout: 2000 },
  });
};
