import { reactive } from "vue";

const state = reactive({
  currentUser: {},
});

export default state;

export function clearCurrentUser() {
  state.currentUser = {};
}
export function setCurrentUser(user) {
  state.currentUser = user;

}
export function getCurentUser() {
  state.currentUser;
}
export function setApiKey(apiKey) {
  //cria um usuario novo baseado no atual só que mudando o apiKey (sobrescreve apikey)
  const currentUser = { ...state.currentUser, apiKey };
  state.currentUser = currentUser;
}
