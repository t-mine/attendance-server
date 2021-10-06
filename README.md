# attendance-server

## Project setup

```
npm install -g serverless
npm install
```

## Deploy

```
serverless deploy --verbose
serverless deploy function -f login --stage dev --verbose
```

## Curl

```
curl -X POST -kv https://XXXXXXXXX.execute-api.ap-northeast-1.amazonaws.com/dev/login -d "{\"email\":\"tanaka@example.com\",\"password\":\"tanaka\"}"
curl -X DELETE -kv https://XXXXXXXXX.execute-api.ap-northeast-1.amazonaws.com/dev/logout
curl -X GET -kv "https://XXXXXXXXX.execute-api.ap-northeast-1.amazonaws.com/dev/work-table?email=tanaka@example.com&year=2021&month=9"
curl -X PUT -kv https://XXXXXXXXX.execute-api.ap-northeast-1.amazonaws.com/dev/work-table -d "[{\"email\":\"tanaka@example.com\",\"year\":\"2021\",\"month\":\"9\",\"day\":\"1\",\"dayOfWeek\":\"3\",\"startTime\":\"9:00\",\"endTime\":\"18:00\",\"memo\":\"aaa\"},{\"email\":\"tanaka@example.com\",\"year\":\"2021\",\"month\":\"9\",\"day\":\"2\",\"dayOfWeek\":\"4\",\"startTime\":\"9:00\",\"endTime\":\"18:00\",\"memo\":\"bbb\"}]"
curl -X PUT -kv https://XXXXXXXXX.execute-api.ap-northeast-1.amazonaws.com/dev/user -d "[{\"email\":\"tanaka@example.com\",\"password\":\"tanaka\",\"name\":\"tanaka taro\"},{\"email\":\"foo@example.com\",\"password\":\"foo\",\"name\":\"foo bar\"}]"
```

## Remove resources

```
serverless remove --verbose
```
