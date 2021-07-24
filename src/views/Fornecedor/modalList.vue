<template>
  <div class="modal-content" style="border-radius: 15px">
    <div class="modal-header">
      <h5 class="modal-title">Fornecedores</h5>
      <button
        type="button"
        class="btn-close btn-close-white"
        @click="closeCancel"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body">
      <div class="card border-rounded-1 text-center" v-show="state.isLoading">
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <table
        class="display table table-bordered table-striped hover compact nowrap"
        id="tbFornecedor"
      >
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Razão Social</th>
            <th scope="col">CNPJ/CPF</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in state.list" :key="item.codigo">
            <td>{{ item.codigo }}</td>
            <td>{{ item.razaoSocial }}</td>
            <td>{{ ReturnCpfCnpj(item) }}</td>
            <td>
              <button @click="closeConfirme(item)" class="btn-sm btn-layout">
                <font-awesome-icon icon="file-alt" /> Selecionar
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Razão Social</th>
            <th scope="col">CNPJ/CPF</th>
            <th scope="col">Status</th>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="modal-footer">
      <button class="btn btn-sm btn-danger" @click="clearFornecedor">
        Limpar (zerar)
      </button>
      <button class="btn btn-sm btn-danger" @click="closeCancel">
        cancelar
      </button>
    </div>
  </div>
</template>

<script>
  import "datatables.net-dt/js/dataTables.dataTables";
  import "datatables.net-dt/css/jquery.dataTables.min.css";
  import $ from "jquery";
  import { reactive, onMounted } from "vue";
  import services from "../../services";
  import { useToast } from "vue-toastification";
  import useModal from "../../hooks/useModal";

  export default {
    setup() {
      onMounted(() => {
        handleList();
      });
      const modal = useModal();
      const toast = useToast();
      const state = reactive({
        isLoading: false,
        list: {}
      });
      function closeConfirme(item) {
        // paran retornar proxy
        // JSON.parse(JSON.stringify(item))
        modal.close({ fornecedor: JSON.parse(JSON.stringify(item)) });
      }
      function closeCancel() {
        modal.close();
      }
      function ReturnCpfCnpj(item) {
        if (item.cgc) {
          return item.cgc;
        } else if (item.cpf) {
          return item.cpf;
        } else {
          return null;
        }
      }
      function clearFornecedor() {
        const fornecedorPadrao = {
          codigo: null,
          razaoSocial: null,
          nomeNomeFantasia: null
        };
        modal.close({ fornecedor: fornecedorPadrao });
      }
      async function handleList() {
        try {
          state.isLoading = true;
          services.fornecedor
            .getAll()
            .then(resposta => {
              state.list = resposta.data;
              console.log(resposta.data);
              if (!$.fn.dataTable.isDataTable("#tbFornecedor")) {
                console.log("entrou if");
                setTimeout(() => {
                  $("#tbFornecedor").DataTable({
                    language: {
                      lengthMenu: "Display _MENU_ linhas",
                      zeroRecords: "Nada encontrado",
                      info: "Página page _PAGE_ de _PAGES_",
                      infoEmpty: "Sem dados",
                      infoFiltered: "(filtrado de _MAX_ total linhas)"
                    },
                    scrollY: "50vh",
                    scrollCollapse: true
                  });
                  state.isLoading = false;
                }, 1000);
              } else {
                state.isLoading = false;
              }
            })
            .catch(error => {
              console.log(error);
              console.log(error.response);
              toast.error(JSON.stringify(error.response.data.errors), {
                timeout: false
              });
              state.isLoading = false;
            });
        } catch (error) {
          handleError(error);
        }
      }
      function handleError(error) {
        state.isLoading = false;
        state.hasError = !!error;
        toast.error(JSON.stringify(error.response.data.errors), {
          timeout: false
        });
      }

      return {
        state,
        closeConfirme,
        closeCancel,
        clearFornecedor,
        ReturnCpfCnpj
      };
    }
  };
</script>
<style scoped>
.modal-dialog {
  width: 100%;
  max-width: 700px !important;
}
</style>
