import { reactive } from "vue";

const state = reactive({
  isLoading: false,
});
export default state;

export function setGlobaloading(status) {
  state.isLoading = status;
}
