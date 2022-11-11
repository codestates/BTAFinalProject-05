const cron = require("node-cron");
const Web3 = require("web3");
const { Client } = require("@elastic/elasticsearch");
const ErgoDevServer = "http://27.96.130.87:9052";
const elasticLocalServer = "http://115.85.183.53:9200";

//const ErgoDevServer = "http://localhost:9052";
//const elasticLocalServer = "http://localhost:9200";

let lastInsertId = 1;

// blockHeight 기준으로 블럭헤더 ID 조회
const getBlockHeaderId = async (blockHeight) => {
  const response = await fetch(`${ErgoDevServer}/blocks/at/` + blockHeight);
  const data = await response.json();
  return data[0];
};

//blockHeaderId 기준으로 해당 블럭 상세 조회
const getBlockDetail = async (headerId) => {
  try {
    const response = await fetch(ErgoDevServer + "/blocks/" + headerId);
    const data = await response.json();
    let blockDetail = JSON.parse(JSON.stringify(data, null, 2));
    //console.log("insert Block Detail");
    //console.log(blockDetail);
    await client.index({
      index: "ergo_block_detail",
      body: blockDetail,
      /*document: {
        extensionId: blockDetail.extensionId
      }*/
    });
  } catch (e) {
    console.log(e);
  }
};

//블럭헤더 아이디로 블럭헤더 정보 GET

const getBlockHeaderInfo = async (headerId) => {
  try {
    const url = ErgoDevServer + "/blocks/" + headerId + "/header";
    const response = await fetch(url);
    const data = await response.json();
    var headerinfo = JSON.parse(JSON.stringify(data, null, 2));
    //console.log("insert Block HeaderInfo");
    //console.log(headerinfo);
    await client.index({
      index: "ergo_block_header",
      body : headerinfo
      /*document :  {
        height : headerinfo.height
      }*/
    });
  } catch (e) {
    console.log(e);
  }
};

//해당 블럭의 트랜잭션만 조회하는 기능
const getBlockTransaction = async (headerId) => {
  try {

    const requestOptions = {
      method: 'GET',
      headers: new Headers({api_key: 'hello'})
  };

    let response = await fetch(
      ErgoDevServer + "/blocks/" + headerId + "/transactions"
    );
    let data = await response.json();
    var transactionInfo = JSON.parse(JSON.stringify(data, null, 2));
   // console.log(transactionInfo.transactions);
    for (let i = 0; i < transactionInfo.transactions.length; i++) {
      await client.index({
        index: "ergo_transaction",
        body: transactionInfo.transactions[i],
      });

      response = await fetch(
        ErgoDevServer + "/wallet/transactionById?id=" + transactionInfo.transactions[i].id, requestOptions
      );

      data = await response.json();
      var walletinfo = JSON.parse(JSON.stringify(data, null, 2));
      await client.index({
        index: "ergo_wallet",
        body: walletinfo,
      });
      console.log("wallet : " + transactionInfo.transactions[i].id);
    }
  } catch (e) {
    console.log(e);
  }
};

const insertBlockHeightId = async (heigthid) => {
  try {
    await client.index({
        index: "ergo_block_heightid",
        body : { 
          heightid : heigthid 
        }
      });
    }
  catch (e) {
    console.log(e);
};
}

const getBlockHeightId = async () => {
  try{
    const result = await client.search({
    index: "ergo_block_heightid",
    body : {"sort" :[
      {"heightid":"desc"}
      ],
    "query":{
        "match_all":{}
    },
    "aggs": {
        "maxDuration": {
            "max": {
                "field": "heightid"
             }
          }
        }
      }
    });
   // console.log(result.body.hits.hits[0].sort);
    return result.body.hits.hits[0].sort;
    }
    catch(e)
    {
      console.log(e);
      return 0;
    }
};

//LastBlockHeigthID return
const getLastBlockHeight = async () => {
  const response = await fetch(ErgoDevServer + "/blocks/lastHeaders/1");
  const data = await response.json();
  var headerinfo = JSON.parse(JSON.stringify(data, null, 2));
  return headerinfo[0].height;
};

//엘라스틱서치 연결 확인 ..
const client = new Client({
  node: elasticLocalServer,
  // auth: {
  //   apiKey: {
  //     id: process.env.ES_ID,
  //     api_key: process.env.ES_API_KEY,
  //   },
  // },
});

/*
const client = new Client({
  node: elasticLocalServer,
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});
*/
async function bootstrap() {
  try {
    client.ping();
    console.log("9200번 포트 연결");
  } catch (e) {
    console.log(e);
  }
}

const task = cron.schedule(
  "*/15 * * * * *", // 10초에 한번씩 실행
  async () => {
    
    console.log("start");
    let lstheigthid = await getBlockHeightId();  //마지막에 저장한 HeightId 조회 
    console.log("lstheigthid : ", lstheigthid);
    if(lstheigthid > 0){
      lstheigthid++;
      lastInsertId = lstheigthid;
    }
    let heigthid = await getLastBlockHeight();
    console.log("heigthid : ", heigthid);
    console.log("firstInsertId : ", lastInsertId);

    if (lastInsertId <= heigthid) {
      console.log("true : ");
      for (
        lastInsertId = lastInsertId;
        lastInsertId <= heigthid;
        lastInsertId++
      ) {
        let headerid = await getBlockHeaderId(lastInsertId);
        console.log("headerid : ", headerid);
        await getBlockHeaderInfo(headerid); // HeaderInfo 저장
        await getBlockDetail(headerid); // Detail 저장
        await getBlockTransaction(headerid); //transaction 값 저장
        await insertBlockHeightId(lastInsertId); // block height id 저장 
        console.log("continueInsertId : ", lastInsertId);
      }
      console.log("lastInsertId : ", lastInsertId);
    }
    if(lastInsertId > heigthid){ // 테스트결과 heigthid를 넘어가는 경우가 있음. .
      lastInsertId = heigthid;
      lastInsertId++;
    }
  }
);

const insertDataTest = async () => {
  /*console.log("start111111");
  let lstheigthid = await getBlockHeightId();  //마지막에 저장한 HeightId 조회 
  console.log("lstheigthid : ", lstheigthid);
  console.log("lstheigthid : ", lstheigthid++);

  let heigthid = await getLastBlockHeight();
  console.log("heigthid : ", heigthid);
  console.log("firstInsertId : ", lastInsertId);

  if (lastInsertId <= heigthid) {
    console.log("true : ");
    for (
      lastInsertId = lastInsertId;
      lastInsertId <= heigthid;
      lastInsertId++
    ) {
      let headerid = await getBlockHeaderId(lastInsertId);
      console.log("headerid : ", headerid);
      await getBlockHeaderInfo(headerid); // HeaderInfo 저장
      await getBlockDetail(headerid); // Detail 저장
      await getBlockTransaction(headerid); //transaction 값 저장
      console.log("continueInsertId : ", lastInsertId);
    }
    console.log("lastInsertId : ", lastInsertId);
    console.log("heigthid : ", heigthid);
  }*/

};

bootstrap(); //엘라스틱 서치 연결 확인
task.start();
//insertDataTest();
