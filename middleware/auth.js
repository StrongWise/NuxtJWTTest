// middleware: 레이아웃, 페이지가 랜더링 되기 전에 실행되는 파일이 정의된 폴더
export default function ({ route, app, store }) {
  // 브라우저(client)일 때 localStorage에 있는 유저 정보 로드
  if (process.client) {
    store.dispatch('auth/loadAuthFromLocalStorage')
  }
}
