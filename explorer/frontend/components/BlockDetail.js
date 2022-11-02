export default function BlockDetail({ result }) {
  // console.log(result);
  return (
    <div className="overflow-x-auto m-3">
      {result.header ? (
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
//   "header": {
//     "extensionId": "59b174696f6b59f4c3551b2a4841aca31b4e6c602fb945de08469a579563616e",
//     "difficulty": "1554",
//     "votes": "000000",
//     "timestamp": 1667396359665,
//     "size": 219,
//     "stateRoot": "0a3036b2a09913c56f6ca95624cb362eee890b75afdf7f1f7d521608462491cc0b",
//     "height": 801,
//     "nBits": 33952256,
//     "version": 2,
//     "id": "d0513fcab75ef2ea93bcdd1d6e831e599837c9b47c8b7ec5c589886d06a24f39",
//     "adProofsRoot": "f97c3832d1ecf32ff18ac7241fa4e8747c6d9bc54219d4d2cfe2ead7cd4fda80",
//     "transactionsRoot": "a58cbb7153cf34cf1ff637a60091b7de2931b3770c7fd7b083f3a15203d9a0bc",
//     "extensionHash": "292cf2b310ee495759a8adfb1887834932a7a307d37e7b946178b37596446f93",
//     "powSolutions": {
//       "pk": "032ae656eae8afe03684da56e89ced23a11d471c060d45abd6081d34f093398690",
//       "w": "035867437b991edddea4be51c5a43aa0d723ec9254626b6c378f8c3d24792ec4f1",
//       "n": "0000000000000d6f",
//       "d": 4.2518343164662644e+73
//     },
//     "adProofsId": "70455c20a82f71446249978a32a5fc2369c018fa689615503ef8efe6ac08658a",
//     "transactionsId": "84c8de7e8ff9432bd6ffce3091553ff2a15aebf2be70c0cce225961785130c0d",
//     "parentId": "42af156373dce38ac3e48c0e88dc9e91a01a853d8136bf2f8ba3bbfda4d6b121"
//   },
//   "blockTransactions": {
//     "headerId": "d0513fcab75ef2ea93bcdd1d6e831e599837c9b47c8b7ec5c589886d06a24f39",
//     "transactions": [
//       {
//         "id": "8dbfc238e2da3b10ef535c95a62738801ac1c318177c0b9ff034f68dcfbd652f",
//         "inputs": [
//           {
//             "boxId": "3d1a9f3d6a955f03cd780f867478f15eb417d347954849ebe2602718ad6dc788",
//             "spendingProof": {
//               "proofBytes": "",
//               "extension": {}
//             }
//           }
//         ],
//         "dataInputs": [],
//         "outputs": [
//           {
//             "boxId": "9af68109d17d1a47e640e548721b7586236787c6dd2e16636e35e886f662df50",
//             "value": 93355065000000000,
//             "ergoTree": "101004020e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a7017300730110010204020404040004c0fd4f05808c82f5f6030580b8c9e5ae040580f882ad16040204c0944004c0f407040004000580f882ad16d19683030191a38cc7a7019683020193c2b2a57300007473017302830108cdeeac93a38cc7b2a573030001978302019683040193b1a5730493c2a7c2b2a573050093958fa3730673079973089c73097e9a730a9d99a3730b730c0599c1a7c1b2a5730d00938cc7b2a5730e0001a390c1a7730f",
//             "assets": [],
//             "creationHeight": 801,
//             "additionalRegisters": {},
//             "transactionId": "8dbfc238e2da3b10ef535c95a62738801ac1c318177c0b9ff034f68dcfbd652f",
//             "index": 0
//           },
//           {
//             "boxId": "a99d801b5ac9a95dfa7ff1baf321972fd5a3585855867ee78cb8b613f54d4892",
//             "value": 67500000000,
//             "ergoTree": "100204a00b08cd032ae656eae8afe03684da56e89ced23a11d471c060d45abd6081d34f093398690ea02d192a39a8cc7a70173007301",
//             "assets": [],
//             "creationHeight": 801,
//             "additionalRegisters": {},
//             "transactionId": "8dbfc238e2da3b10ef535c95a62738801ac1c318177c0b9ff034f68dcfbd652f",
//             "index": 1
//           }
//         ],
//         "size": 343
//       }
//     ],
//     "blockVersion": 2,
//     "size": 380
//   },
//   "extension": {
//     "headerId": "d0513fcab75ef2ea93bcdd1d6e831e599837c9b47c8b7ec5c589886d06a24f39",
//     "digest": "292cf2b310ee495759a8adfb1887834932a7a307d37e7b946178b37596446f93",
//     "fields": [
//       [
//         "0100",
//         "018667f9eb410e95060478742e159a4c689e27c3a330e8cbd18bb2c7a3e6221dc5"
//       ],
//       [
//         "0101",
//         "017b9a457e1f23d2f73bc6d65a5b9fbe22bd63737dee48de54cbd880d7a6c35880"
//       ]
//     ]
//   },
//   "adProofs": {
//     "headerId": "d0513fcab75ef2ea93bcdd1d6e831e599837c9b47c8b7ec5c589886d06a24f39",
//     "proofBytes": "03dc97dadce179dcf136a42065de5a39102207b8b3eb38fd2616d867888b3d1f50037d2f242629370912584ea0481dcfab7efd01a6ace0746cbdcfb1933c9c4a3be6023cf1dd3c5e054c1eed27175c7c11f9c681245ced7ce3d3292b16033be1c57b6c3d1a9f3d6a955f03cd780f867478f15eb417d347954849ebe2602718ad6dc788000000608086c1bafb01100204a00b08cd032ae656eae8afe03684da56e89ced23a11d471c060d45abd6081d34f093398690ea02d192a39a8cc7a701730073017c00007c7f17c3da4f9ad568489e2cab420434fb7157ef80d993dc9680c3fad6f9074d01023d27bfcb44ab78c17ea4478657ff1d9fdf373123b2c7247c8e193916719cc2520000011280fafcb4f9bfeaa501101004020e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a7017300730110010204020404040004c0fd4f05808c82f5f6030580b8c9e5ae040580f882ad16040204c0944004c0f407040004000580f882ad16d19683030191a38cc7a7019683020193c2b2a57300007473017302830108cdeeac93a38cc7b2a573030001978302019683040193b1a5730493c2a7c2b2a573050093958fa3730673079973089c73097e9a730a9d99a3730b730c0599c1a7c1b2a5730d00938cc7b2a5730e0001a390c1a7730fa006000053d1aad0fd48a124c107cf7caf2cae5a68ecf40a6fc29329ef36902c33d1c05900000103dea80f0e6449d39fc1c5c73b4b12c7a6cb642da81f2e9a876588e964c6a0a6390003d733cac232ff92b465ac73f8ee9327fc07978e87785cd20fcb49470d7ceb5add00037b1941bc3907f9660e04911db43d5630e327150343c19aa83baa41dd9eaf917f0103ec3a4410644db1cdc427282d4e73ed9156ee8528a5cd934f3276179e98f391f9ff032d2aea065110b83f7d9ff89b47e0765ae66b2e2528c2f233c4ff13502263dbb0ff033f0922398580ba34a680173f03705ba13aa663ad5ea9ee9de80c04658caad84a000003eebbb4501fce38fbed184ea6485fe9ed50e5a0b8123d8eb3403dd06850df4ebb030e6fedec6a0209992c4ad9530b8b374f43294e9bf805e3f2d11e9769f5ee839903746d1e60a2760cc7f2b848d1044ae43136039abfc4859fd2fe6b9bf45770a53f03228a300c844c05206886a5db5ac891936269df238b2bc197c43f374a1db509ea03c34e39c626fff1a59b403812cc5ab24d609e69fd515e668ee9a1b655d60dcf82029ae8a0a1506325695dc1388998d18034d6eb237d9ea5731d6938a66c4c6b038d9ba63b44e5295521e3106259e04447f6c67c6ff3e80361d02de42f5c1ed1dc73000000618086c1bafb01100204a00b08cd032ae656eae8afe03684da56e89ced23a11d471c060d45abd6081d34f093398690ea02d192a39a8cc7a70173007301d60500002101314db7702026ca4612d58c3159d9d993233c6329b36a2b830cc50e6924d001000100036dc6e4461cb65d4021d420441e7b15357ab7449517b592580c2843aef3604172000327691121f6c771be1da86be8d485734aed83ab43cc656c4179417e4a712d62c300ff0003b5d82ea837adee7a7148b530aba9e14827c5b0fa52a2111fee34fea69bb4634e03bb26d36ddaf5acd3bfaba8c48eb5c42aa2e5d02d406966171cfd733cffecbe1f03c423dfbf114ffb386988d71fb32a9349705772dbc97afdb5369c3c9e66292e90031b0c624f9a041c11ec54914f432cde370dcfef84192cc1555699fcc07842cb3b02a969b18bf6bd6adaa4562e199b10ea07903c82029088822b809842b241503a38a9b4afae2e39efb41bd2fef7f6872bc427aa3359d5cc6dfd4a66c62f613b58b5000000618086c1bafb01100204a00b08cd032ae656eae8afe03684da56e89ced23a11d471c060d45abd6081d34f093398690ea02d192a39a8cc7a70173007301c20500002b967641b4059289b4cb7ea82fb77d9281ba42f818d635f5deacc08b4a2211b5010003da6396eca54b0515298d1810dd3d12f61624c059f59c9d3d1ad7d7d6be45bd1400000000031a0c8b43b2974ff123bcd9bc0c19cfc1c3d533bb5c328b395f83623e3071da3aff03c2ec81c9e0a75e477e0862bcb83cd2deadf06284ff347a30cf3764582b65b7f9ff031038e884e08d41b51ba1114a1208327fd208ee77f881ce1796757c383d8dcb2fff000364abee69b6f96b908cdade2c78e533bf25d00abaf2b6c988d15ec0ea784d500d000004fd98a123",
//     "digest": "f97c3832d1ecf32ff18ac7241fa4e8747c6d9bc54219d4d2cfe2ead7cd4fda80",
//     "size": 1666
//   },
//   "size": 2265
// }
