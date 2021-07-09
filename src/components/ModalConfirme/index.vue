<template>
  <div class="modal-content" style="border-radius: 15px">
    <div class="modal-header">
      <h5 class="modal-title">Confirmação</h5>
      <button
        type="button"
        class="btn-close btn-close-white"
        @click="closeCancel"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body">{{ state.msg }}</div>
    <div class="modal-footer">
      <button class="btn btn-sm btn-success" @click="closeConfirme">
        Confirmar
      </button>
      <button class="btn btn-sm btn-danger" @click="closeCancel">
        cancelar
      </button>
    </div>
  </div>
</template>

<script>
  import { computed, reactive } from "vue";
  import useModal from "../../hooks/useModal";

  export default {
    props: ["msg"],
    setup(props) {
      const modal = useModal();
      const state = reactive({
        teste: "valor teste",
        answer: false,
        msg: ""
      });
      state.msg = computed(() => {
        return props.msg;
      });

      function closeConfirme() {
        state.answer = true;
        modal.close(state);
      }
      function closeCancel() {
        state.answer = false;
        modal.close(state);
      }
      return { closeConfirme, closeCancel, state };
    }
  };
</script>

<style scoped>
.modal-content {
  border: 1px solid tomato;
}
.btn-cancel-confirme {
  border: 1px solid tomato;
  color: tomato;
}
.modal-header {
  border-bottom: 0;
}
.modal-footer {
  display: auto;
  border-top: 0;
}
.btn {
  border-width: 2px;
  border-style: outset;
}
.modal-content {
  max-width: 500px;
  margin: auto;
}
</style>
