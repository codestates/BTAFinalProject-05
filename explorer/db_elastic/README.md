## Getting started

Elasticsearch

- localhost:9200

Kibana

- localhost:5601

m1 맥은 docker-compose.yml 파일에서 elasticsearch 이미지를 아래와 같이 변경할것.

- elasticsearch:7.13.2 -> elasticsearch:7.13.2-arm64

```
docker-compose up -d
```

### Auth

- local test : 인증 설정하지 않고 진행가능

  - public ip cpdev 운영시 password 설정할것

- elasticsearch password

```
/usr/share/elasticsearch/config/elasticsearch.yml 파일에 아래의 2줄 추가
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
xpack.security.authc.api_key.enabled : true
/usr/share/elasticsearch/bin/elasticsearch-setup-passwords interactive
패스워드 설정
elasticsearch 재시작
localhost:9200 (아이디:elastic, 패스워드:위에서 설정한 패스워드)
```

- kibana password

```
/usr/share/kibana/config/kibana.yml 에서 아래의 파일 추가
elasticsearch.username: "elastic"
elasticsearch.password: "위에서 설정한 패스워드"
kibana 재시작
localhost:5601 (로그인)
```

- 인증 api-key 생성

```
Kibana Dev Tools 에서 아래의 REST API 호출
POST /_security/api_key
{
  "name": "ergo-api-key",
  "metadata": {
    "application": "ergo-explorer",
    "environment": {
       "level": 1,
       "trusted": true,
       "tags": ["dev", "staging"]
    }
  }
}
response 의 id, api_key를 이용하여 frontend에서 호출
{
  "id" : "************",
  "name" : "************",
  "api_key" : "************"
}

```
