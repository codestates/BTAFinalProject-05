import Link from "next/link";

export default function BlockDetail({ result }) {
  console.log("block detail");
  console.log(result);
  return (
    <div className="overflow-x-auto m-3">
      {result ? (
        <>
          <div className="m-3 text-lg">Block #{result.header.height}</div>
          <table className="table table-zebra w-full">
            <tbody>
              <tr>
                <th>Height</th>
                <td>{result.header.height}</td>
              </tr>
              <tr>
                <th>Timestamp</th>
                <td>{result.header.timestamp}</td>
              </tr>
              <tr>
                <th>Id</th>
                <td>{result.header.id}</td>
              </tr>
              <tr>
                <th>extensionId</th>
                <td>{result.header.extensionId}</td>
              </tr>
              <tr>
                <th>size</th>
                <td>{result.header.size}</td>
              </tr>
              <tr>
                <th>stateRoot</th>
                <td>{result.header.stateRoot}</td>
              </tr>
              <tr>
                <th>height</th>
                <td>{result.header.height}</td>
              </tr>
              <tr>
                <th>nBits</th>
                <td>{result.header.nBits}</td>
              </tr>
              <tr>
                <th>version</th>
                <td>{result.header.version}</td>
              </tr>
              <tr>
                <th>parentId</th>
                <td>{result.header.parentId}</td>
              </tr>

              <tr>
                <th>adProofsRoot</th>
                <td>{result.header.adProofsRoot}</td>
              </tr>
              <tr>
                <th>Difficulty</th>
                <td>{result.header.transactionsRoot}</td>
              </tr>
              <tr>
                <th>extensionHash</th>
                <td>{result.header.extensionHash}</td>
              </tr>
              <tr>
                <th>transactions HeaderId</th>
                <td>{result.blockTransactions.headerId}</td>
              </tr>

              <tr>
                <th>transaction Id</th>
                <td>
                  {result.blockTransactions.transactions.map((transaction) => (
                    <>
                      <Link
                        className="text-sky-600"
                        href={`/transactions/${transaction.id}`}
                      >
                        {transaction.id}
                      </Link>
                      <br />
                    </>
                  ))}
                </td>
              </tr>

              <tr>
                <th>size</th>
                <td>{result.size}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <div className="m-3 text-lg">Block Not Exists</div>
      )}
    </div>
  );
}

// {
//   _index: 'ergo_block_detail',
//   _type: '_doc',
//   _id: 'mU0nXIQBw7dCEMGbd2hZ',
//   _score: 7.015114,
//   _source: {
//     header: {
//       extensionId: 'b559e2181ca2d9d8e117657057843c0674248045b2b020ac3d40b59ae6aa8d18',
//       difficulty: '745',
//       votes: '000000',
//       timestamp: 1667637418343,
//       size: 220,
//       stateRoot: 'e1e7cb7fa0071ed75a054b1d817410a6c3a53c2cb9beda915e9532750c39d0640c',
//       height: 873,
//       nBits: 33745152,
//       version: 2,
//       id: '61ef24f406fa450d27da0676165a55952546ec8c3335437f8b9027b5bf7f8d5c',
//       adProofsRoot: 'f94546dc3ac087bc75e48d64c0e939f98a04b098d5f66f96fc73460e5507039d',
//       transactionsRoot: 'fd8634955424053652bbbd4dc1746fda4acce677e14c60a64367d2da70971976',
//       extensionHash: 'b74b9ca913b12f0b4f39a23f47a286f3cd8115a4346641b58f4beeb05927fafe',
//       powSolutions: [Object],
//       adProofsId: '03f4b2dd058247582918759a4c002c9fc1a16beae29c07f9f9084f4a931c127f',
//       transactionsId: '53286c305ad0ce59fd6102c0847d6ee07c9abd619e1238fb51a0b082b2cdc410',
//       parentId: 'c06051ab5119bbf5e4dd3e0ede0efcd6db30fa0a07092f8ef86636b8dce80422'
//     },
//     blockTransactions: {
//       headerId: '61ef24f406fa450d27da0676165a55952546ec8c3335437f8b9027b5bf7f8d5c',
//       transactions: [Array],
//       blockVersion: 2,
//       size: 380
//     },
//     extension: {
//       headerId: '61ef24f406fa450d27da0676165a55952546ec8c3335437f8b9027b5bf7f8d5c',
//       digest: 'b74b9ca913b12f0b4f39a23f47a286f3cd8115a4346641b58f4beeb05927fafe',
//       fields: [Array]
//     },
//     adProofs: {
//       headerId: '61ef24f406fa450d27da0676165a55952546ec8c3335437f8b9027b5bf7f8d5c',
//       proofBytes: '03c3ed8381d2514d946b417b793951f50cde522fcb87c087a8f9be89409401923603871bd4def246c31f2d178ba6343b9e38ed12b03762ffd3979b520f45187869cb0356198a19fbf2dd9aa08dbe8507cdb39a2ae73a0878d1760556687d00025cf37a03e8696f32d625d9186b76432b739108573a35825389b4a11acc7c9690c8b82687022774610153f20c912e2f1a2818079933d3ee77e0d0ebad412976066c92230f7a27d91f32e0266c6ddf89e38bfb16d4982bb18f6785c291425e95559d8d9de30f000000618086c1bafb01100204a00b08cd03f57b8449940eee9578de473929eab73b5221bc02f27f036d8515ff72f0078a38ea02d192a39a8cc7a70173007301bc050000112915b34688f248cdcf9578c6e4e9cbad671e91e61a3b2e2fd54c13f9d642df01031826a364d04c9410f1ef902b79a76b5c1f6973ef5807c33548181579301a77520003de9414755a732fc479bf0917615f3848d6e659291a1fc6ade6d9e410253d5da7ff0101037c96fc86ffc9ec29a253c3b27ddc053e56780c38d20b0e9b0556bc090fe92e4fff032eb23d732f9f7fa11e7c766068268af1c156784694e102d1cdfd22eccd788f90ff035115e9de01a2ce2a5fb487d792f360c96a85a47534b84079d973c3eedde073b2ff010003570f4522994703563824b1aa2b26047e92e11890f9fa6fc1d216c02bf0ff3ee203e2753134803bfc8749fb8ae4972438920b497740086f587e48b3551bcd3f1645035b593711fa50f005e85d2a386fbe83d917cd53d7172724a9ba80ccc12dbf451803aed7850e91d32d0a2b1f3176626780aefdd4bef7e52b4616921501942c7e10c403e0e10e9279c4dbfc5506e9380f91dff1fb68dc9847e332a7eac8ebe9fbc438fc0273c94cd96d11c9a9e6e08b923b7ac15150ca9669fff1d47f55785dd2d10098b475952df6f85f6bd447f4255306dd112a4355d1df6780fe33f82c3bef01dfebcd000000618086c1bafb01100204a00b08cd03f57b8449940eee9578de473929eab73b5221bc02f27f036d8515ff72f0078a38ea02d192a39a8cc7a701730073019c0200000284f54a916f943ed24cce495153894f1fc012639fb39f797a4258ff82be7a780103f04ab03e3c1f251060b1533ad2305bff8bdcc9fd8e39232d0a2dec24ac27ec7f010103a891ee77aa5fcf7fcef3f1e3edccb7f550d78f16812c73e6d315441296f55d800003764b28d88df61f9472e6d0f20b2e788cad1df151d5834fff28b4503a9338e8220101010101010344005eda40baf3578b8316464a4fdf75431f2005b3a52047e454fa4e49105be603cd2776b722bdfe51185a865f69e0b8c9f1a12d276254a768889cdc3826bf1a780316f430c190df592b0162fa3abaa4d4081fd659058bc6e9f82ecf4fcf9dc9d0e103b0baf3c9c64f0985bf152757dde5c71b4f6fea0e41268f165e60b45c104d33fe02bae8c556b1074c3bd63086f7a3b538b2311576b26eee2102ad1ce2f4cb93c4d9baeec49e35f8fc1f3c15ecd77f45ca8719307fd607ff3e81c74f92dad9284755000000608086c1bafb01100204a00b08cd03f57b8449940eee9578de473929eab73b5221bc02f27f036d8515ff72f0078a38ea02d192a39a8cc7a70173007301480000f1985f8d450caa54303fcc22602a9d82c5efdccaf6173db1737e7e3262436b0f0102bb4d7c38f01bf6e8ec9748db4d70111826a9eaee39dc5a99c6382f55ba2755900000011280cab1c0c0b2e9a501101004020e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a7017300730110010204020404040004c0fd4f05808c82f5f6030580b8c9e5ae040580f882ad16040204c0944004c0f407040004000580f882ad16d19683030191a38cc7a7019683020193c2b2a57300007473017302830108cdeeac93a38cc7b2a573030001978302019683040193b1a5730493c2a7c2b2a573050093958fa3730673079973089c73097e9a730a9d99a3730b730c0599c1a7c1b2a5730d00938cc7b2a5730e0001a390c1a7730fe806000069a076eb90ef5d23ad9bf6045acdc21a566ff0631d3a2266e2d862b0624313d700000000ff034c6ec727bddcacba7cff860f8a3927ed05a15569dfb7d8343ac4f48e0f479b22ff037278fb13b8ca2cb18eb0ed6ff5b4e37fb45309de7811e4ed109e2e00bb90293a00033d59a977fdf3ea489623b99786a8290eabdb8b74739537f8afe505b42b385eaa00039aae22024c4a52c6dd2560974ab2810966b90a47b5dffd94486565ecd5390ee20000ff043ccc3958',
//       digest: 'f94546dc3ac087bc75e48d64c0e939f98a04b098d5f66f96fc73460e5507039d',
//       size: 1700
//     },
//     size: 2300
//   }
// }
