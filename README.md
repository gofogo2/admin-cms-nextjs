# Nextjs+React를 활용한 관리자 페이지 개발
## -React
## -Nextjs
## -TailwindCSS
## -Asp.net Core 3.1 or nextjs  

## 서버접속
### $ pscale auth login
### $ pscale connect admin-cms

## .env 설정
### DATABASE_URL="mysql://127.0.0.1:3306/admin-cms"

## scoop - 설치(windows)
### https://gofogo.tistory.com/135



## db ui 확인
### npx prisma studio

## SWR 설치
### npm i swr --legacy-peer-deps

## scheme.prisma 동기화
### $ npx prisma db push

## 기본실행
### $ pscale auth login
### $ pscale connect admin-cms
### npx prisma studio
### $ npm run dev


## env DATABASE_URL="mssql://127.0.0.1:3306/admin-cms"
## DATABASE_URL="sqlserver://localhost:1433;database=Test;user=gofogo;password=1;trustServerCertificate=true"


## node 설치
## mssql 설치


================== 커밋 규칙 =================
feat : 새로운 기능에 대한 커밋
fix : 버그 수정에 대한 커밋
build : 빌드 관련 파일 수정에 대한 커밋 
chore : 그 외 자잘한 수정에 대한 커밋
ci : CI관련 설정 수정에 대한 커밋
docs : 문서 수정에 대한 커밋
style : 코드 스타일 혹은 포맷 등에 관한 커밋
refactor : 코드 리팩토링에 대한 커밋
test : 테스트 코드 수정에 대한 커밋
infra : 환경구성에대한 커밋
server : 서버사이드 개발에 관한 커밋

