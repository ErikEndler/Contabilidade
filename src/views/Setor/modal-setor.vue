<template>
  <div class="modal-content" style="border-radius: 15px">
    <div class="modal-header">
      <h5 class="modal-title">Setores</h5>
      <button
        type="button"
        class="btn-close btn-close-white"
        @click="closeCancel"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="state.isLoading">
            <td colspan="6" class="text-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </td>
          </tr>
          <tr v-if="state.listEmpty">
            <td colspan="6" class="text-center"><h5>Lista vazia</h5></td>
          </tr>
          <tr v-for="item in state.list" :key="item.codigo">
            <td>{{ item.descricao }}</td>
            <td>
              <button @click="closeConfirme(item)" class="btn-sm btn-layout">
                <font-awesome-icon icon="file-alt" /> Selecionar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-sm btn-danger" @click="closeCancel">
        cancelar
      </button>
    </div>
  </div>
</template>

<script>
  import { reactive, onMounted } from "vue";
  import services from "../../services";
  import { useToast } from "vue-toastification";
  import useModal from "../../hooks/useModal";

  export default {
    setup() {
      onMounted(() => {
        listAll();
      });
      const modal = useModal();

      const toast = useToast();
      const state = reactive({
        isLoading: false,
        listEmpty: false,
        list: {}
      });
      function closeConfirme(item) {
        // paran retornar proxy
        // JSON.parse(JSON.stringify(item))
        modal.close({ setor: JSON.parse(JSON.stringify(item)) });
      }
      function closeCancel() {
        modal.close();
      }

      function listAll() {
        state.listEmpty = false;
        state.isLoading = true;
        services.setor
          .getAll()
          .then(resposta => {
            state.list = resposta.data;
            state.isLoading = true;
            if (state.list.length == 0) {
              state.listEmpty = true;
            }
            state.isLoading = false;
          })
          .catch(error => {
            state.isLoading = false;
            console.log(error);
            console.log(error.response);
            toast.error(JSON.stringify(error.response.data.errors), {
              timeout: false
            });
          });
      }

      return { state, listAll, closeConfirme, closeCancel };
    }
  };
</script>

<style scoped>
.modal-dialog {
  width: 100%;
  max-width: 600px !important;
}
.modal-dialog-scrollable .modal-content {
  max-height: 70%;
  overflow: hidden;
}
</style>
