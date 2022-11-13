<p align="center" style="background-color:white;padding-top: 10px">
    <picture>
      <img src="wallet/client/public/ergo_logo_long.png" height="128">
    </picture>
</p>

# BTAFinalProject-05
## 팀 소개
- 팀명 : 에르고머니나
- 팀원 : 노승남, 윤종승, 한우진, 채윤영
- 개발 프로젝트 : Ergo wallet & Ergo blockchain explorer
- 역할 분담
  * 노드 운영 (공통)
  * 월렛 개발 (윤종승, 노승남)
  * 익스플로러 개발 (채윤영, 한우진)

## 선정 코인 소개
### 선정한 네트워크
[ERGO](https://ergoplatform.org/en/)

### 선정 이유
1. Bitcoin과 Ethereum의 장점이 혼합되어 있음
    - 보안을 위해 Bitcoin의 작업 증명 합의 메커니즘을 활용
        - Bitcoin 네트워크의 작업 증명 메커니즘의 환경적 피해를 최소화하기 위해 노드의 마이닝 크기를 제한 ([Autolykos](https://docs.ergoplatform.com/mining/autolykos/) 마이닝 프로토콜)
    - DeFi 제품에는 Ethereum 네트워크의 스마트 계약 기술을 사용
        - dApp 생성 기능 측면에서 Ethereum과 동일하지만 차이점은 애플리케이션 개발에 가스비가 들지 않는다는 점
        - turing complete smart contract script
    - extended UTXO 모델
2. 생소한 합의 알고리즘 채택
    - [NIPoPoW](https://nipopows.com/)(Non-Interactive **Proof-of-**Proof-of-Work)
    - 전체 블록 데이터를 다 다운받지 않고도 전체 블록체인 검증 수행 가능
    - logarithmic mining 가능(with less computing power)
3. zero-knowledge protocol 의 sub class인 [시그마 프로토콜](https://ergoplatform.org/en/blog/2020_03_16_ergo_sigma/) 채택으로 보안성 향상
    - Ergo의 loco에도 시그마(Σ) 기호가 있는 만큼 보안을 중요하게 생각하는 체인
## 프로젝트 소개
ERGO 네트워크를 이용한 Wallet - Explorer 개발

- Wallet
    - Chrome Extension
    - 기능 : 지갑 생성, 지갑 가져오기, 로그인, 송금하기, 송금 내역 확인 등.
    - 기술 스택: React, Material ui
- Explorer
    - Ergo Devnode → Collector → Elasticsearch → Explorer App
    - 기능 : 트랜잭션, 블럭정보, Address 조회
    - Collector
        - Ergo Devnode의 rest api 를 호출하여 주기적으로 block, transaction, wallet 정보를 Elasticsearch DB로 저장
        - 기술 스택 : node.js, pm2

    - Explorer App
        - Elasticsearch 에 저장된 block, transaction, wallet address 관련 정보를 조합하여 사용자에게 정보 제공
        - 기술스택 : next.js, node.js

    - Elasticsearch, Kibana
        - 데이터 조회, 인덱스 관리로 데이터 모니터링
- Ergo Node 구성
  - Local 환경 및 클라우드 환경 Peer 구성

## 프로젝트 상세
프로젝트 상세 페이지를 보시려면 [이 링크](https://www.notion.so/codestates/5-da23baad4c764ac58e5fbc6f848069fc)를 눌러 노션 페이지로 이동하세요.