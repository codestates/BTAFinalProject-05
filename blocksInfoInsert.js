const cron = require("node-cron");
const Web3 = require("web3");
const { Client } = require("@elastic/elasticsearch");
const ErgoDevServer = "http://localhost:9052";
const elasticLocalServer = "http://localhost:9200";
let lastInsertId = 1;


// limit 만큼 block ID 조회 
const getBlocksId = async () => {
/*
    const requestOptions = {
        method: 'GET',
        headers: new Headers({api_key: '7yaASMijGEGTbttYHg1MrXnWB8EbzjJnFLSWvmNoHrXV'})
    };*/
    const response = await fetch("http://localhost:9052/blocks?limit=50&offset=0")
    const data = await response.json();

    console.log("devdata:" + data); // 👈 
};

// blockHeight 기준으로 블럭헤더 ID 조회 
const getBlockHeaderId = async (blockHeight) => {
    const response = await fetch("http://localhost:9052/blocks/at/" + blockHeight)
    const data = await response.json()    
    console.log("headerId:" + data[0]); 
    return data[0];
};

//blockHeaderId 기준으로 해당 블럭 상세 조회 
const getBlockDetail = async (headerId) => {
    const response = await fetch(ErgoDevServer + "/blocks/" + headerId)
    const data = await response.json();
    let blockDetail = JSON.parse(JSON.stringify(data, null, 2));
    
    await client.index({
        index: "blockdetail",
        document: {
            extensionId: blockDetail.header["extensionId"],
            difficulty : blockDetail.header["difficulty"],
            votes: blockDetail.header["votes"],
            timestamp : blockDetail.header["timestamp"],
            size : blockDetail.header["size"],
            stateRoot : blockDetail.header["stateRoot"],
            height : blockDetail.header["height"],
            nBits : blockDetail.header["nBits"],
            version : blockDetail.header["version"],
            id : blockDetail.header["id"],
            adProofsRoot : blockDetail.header["adProofsRoot"],
            transactionsRoot : blockDetail.header["transactionsRoot"],
            extensionHash : blockDetail.header["extensionHash"],
           //powSolutions : headerinfo.powSolutions,
            adProofsId : blockDetail.header["adProofsId"],
            transactionsId : blockDetail.header["transactionsId"],
            parentId : blockDetail.header["parentId"], /*header_End*/
            headerId: blockDetail.blockTransactions["headerId"], /*transaction start */
            id : blockDetail.blockTransactions["transactions"].id
           /* inputs: blockDetail.blockTransactions["transactions"].inputs.boxId
            timestamp : blockDetail.blockTransactions["timestamp"],
            size : blockDetail.blockTransactions["size"],
            stateRoot : blockDetail.blockTransactions["stateRoot"],
            height : blockDetail.blockTransactions["height"],
            nBits : blockDetail.blockTransactions["nBits"],
            version : blockDetail.blockTransactions["version"],
            id : blockDetail.blockTransactions["id"],
            adProofsRoot : blockDetail.blockTransactions["adProofsRoot"],
            transactionsRoot : blockDetail.blockTransactions["transactionsRoot"],
            extensionHash : blockDetail.blockTransactions["extensionHash"],
           // powSolutions : headerinfo.powSolutions,
            adProofsId : blockDetail.blockTransactions["adProofsId"],
            transactionsId : blockDetail.blockTransactions["transactionsId"],
            parentId : blockDetail.blockTransactions["parentId"], /*header_End*/
          }
    });
    
};


//블럭헤더 아이디로 블럭헤더 정보 GET

const getBlockHeaderInfo = async (headerId) => {
    const url = ErgoDevServer + "/blocks/" + headerId + "/header";
    const response = await fetch(url)
    const data = await response.json();
    var headerinfo = JSON.parse(JSON.stringify(data, null, 2));
    
    await client.index({
        index: "headerinfo",
        document: {
            extensionId: headerinfo.extensionId,
            difficulty : headerinfo.difficulty,
            votes: headerinfo.votes,
            timestamp : headerinfo.timestamp,
            size : headerinfo.size,
            stateRoot : headerinfo.stateRoot,
            height : headerinfo.height,
            nBits : headerinfo.nBits,
            version : headerinfo.version,
            id : headerinfo.id,
            adProofsRoot : headerinfo.adProofsRoot,
            transactionsRoot : headerinfo.transactionsRoot,
            extensionHash : headerinfo.extensionHash,
           // powSolutions : headerinfo.powSolutions,
            adProofsId : headerinfo.adProofsId,
            transactionsId : headerinfo.transactionsId,
            parentId : headerinfo.parentId
          }
    });
};


//해당 블럭의 트랜잭션만 조회하는 기능
const getBlockTransaction = async (headerId) => {
    try{
    const response = await fetch(ErgoDevServer + "/blocks/" + headerId + "/transactions")
    const data = await response.json();
    var transactionInfo = JSON.parse(JSON.stringify(data, null, 2));
    console.log(transactionInfo.transactions);
    for(let i = 0; i < transactionInfo.transactions[0].outputs.length; i++)
    {
        await client.index({
            index: "transactionInfo",
            document: {
                transactionId: transactionInfo.transactions[0].outputs.transactionId
              }
        });
    }
}
catch(e)
{
    console.log(e);
}
};

//LastBlockHeigthID return 
const getLastBlockHeight = async () => {
    const response = await fetch(ErgoDevServer + "/blocks/lastHeaders/1")
    const data = await response.json();
    var headerinfo = JSON.parse(JSON.stringify(data, null, 2));
    return headerinfo[0].height
};

//엘라스틱서치 연결 확인 .. 
const client = new Client({
    node: elasticLocalServer,
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true,
  });
  
  async function bootstrap() {
    try {
      client.ping();
      console.log("9200번 포트 연결");
    } catch (e) {
      console.log(e);
    }
  }

  async function getBlocksInfo() {
    try {
      client.ping();
      console.log("9200번 포트 연결");
    } catch (e) {
      console.log(e);
    }
  }


const task = cron.schedule(
    "*/5 * * * * *", // 5초에 한번씩 실행
    async () => {
        console.log("start"); 
        let heigthid = await getLastBlockHeight();

        console.log("heigthid : ",heigthid); 
        console.log("firstInsertId : ",lastInsertId); 

        if(lastInsertId <= heigthid){
            console.log("true : ");
            for(lastInsertId = lastInsertId; lastInsertId <= heigthid; lastInsertId++)
            {
                let headerid = await getBlockHeaderId(lastInsertId);
                console.log("headerid : ",headerid); 
                await getBlockHeaderInfo(headerid); // HeaderInfo 저장 
                await getBlockDetail(headerid); // Detail 저장 
                //await getBlockTransaction(headerid); //transaction 값 저장 
                console.log("continueInsertId : ",lastInsertId);
            }
            console.log("lastInsertId : ",lastInsertId);
            console.log("heigthid : ",heigthid);
         }
    }
);
bootstrap(); //엘라스틱 서치 연결 확인 
task.start();

