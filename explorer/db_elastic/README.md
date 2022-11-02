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
