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
```

## Remove resources

```
serverless remove --verbose
```
