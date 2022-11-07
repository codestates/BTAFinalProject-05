1.엘라스틱 서치 다운로드 
2.bin/elasticsearch.bat 실행 
http://127.0.0.1:9200/     -- elasticsearch 로컬 서버
3. ergo 노드 실행


//소스 실행 
pm2 start blocksInfoInsert.js 
//로그 보기
pm2 log 
//프로세스 kill
pm2 kill 





//index : blocks 추가
curl -XPUT http://localhost:9200/blocks?pretty

//index : blocks 확인 
curl -XGET http://localhost:9200/blocks/_search?pretty

//index : blocks 검색 
curl -XGET http://localhost:9200/blocks?q=height:1000

//index : blocks 삭제
curl -XDELETE http://localhost:9200/blocks