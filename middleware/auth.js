export default function ({ route, app, store }) {
  if (process.client) {
    store.dispatch('auth/loadAuthFromLocalStorage')
  }
}
