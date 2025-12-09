- 소개
  
TMDB API를 활용한 영화 정보 서비스입니다.
인기 영화 조회, 검색, 즐겨찾기, 영화 상세 및 트레일러 재생 기능을 제공합니다.

- 기술 스택
  
React (JavaScript)

Vite

React Router v6

TMDB API

Intersection Observer (Infinite Scroll)

LocalStorage

- 주요 기능
  
인기 영화 무한 스크롤

영화 검색

즐겨찾기 관리

영화 상세 페이지

트레일러 모달 (YouTube 연동)

로딩 / 에러 UX 처리

- 폴더 구조
  
src/
 ┣ api/
 ┣ components/
 ┣ pages/
 ┣ hooks/
 ┣ App.jsx
 ┗ main.jsx

- 구현 포인트
  
공통 로딩/에러 컴포넌트로 UX 개선

IntersectionObserver를 활용한 무한 스크롤

API 호출 로직 분리로 유지보수성 향상

모달 UX로 사용자 이탈 최소화

- 실행 방법
  
npm install
npm run dev

- 회고
  
실무에서 자주 사용하는 React 구조를 기반으로
재사용성, 사용자 경험, 확장성을 고려해 구현했습니다.
