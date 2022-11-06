<p align="center" style="background-color:white;padding-top: 10px">
    <picture>
      <img src="client/public/ergo_logo_long.png" height="128">
    </picture>
</p>

# BTA1stProject-20

## Introduction

에르고 월렛(Ergo Wallet) 서비스는 니모닉 및 지갑 생성, 잔고 조회, 송금을 가능하게 하는 [Ergo](https://ergoplatform.org/)에 특화된 Chrome Extension 지갑입니다.

## Getting Started

> ⚠️ 모든 명령어는 root directory를 기준으로 작성되었습니다.  
> ⚠️ localhost:9052에 Ergo container가 실행되고 있어야 정상 동작합니다.

### Install

```shell
# client npm 패키지 설치 및 빌드
cd client && npm install && npm run build
```

### 🚨 인증 정보 입력
`wallet/client/.env` 파일에 `API_KEY`와 `PASSWORD`를 아래와 같이 입력한다.
```shell
REACT_APP_API_KEY=<API KEY>
REACT_APP_PASSWORD=<PASSWORD>
```

### Chrome extension 설치 및 실행

1. 위에서 빌드한 `/build` directory를 [chrome extension](chrome://extensions/)에 추가
2. 크롬 익스텐션 실행

## References

* [Ergo official website](https://ergoplatform.org/)