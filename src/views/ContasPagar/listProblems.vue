<template>
  <div class="row">
    <div class="col-auto align-self-end">
      <button @click="$router.go(-1)" class="btn btn-outline btn-cancel">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Voltar
      </button>
    </div>
    <div class="col-auto">
      <label>Data Inicial</label>
      <input
        v-model="state.dataInicial"
        class="form-control border-rounded-1 shadow-blue"
        type="date"
      />
    </div>
    <div class="col-auto">
      <label>Data Final</label>
      <input
        v-model="state.dataFinal"
        class="form-control border-rounded-1 shadow-blue"
        type="date"
      />
    </div>
    <div class="col-3">
      <button
        class="btn btn-layout"
        style="min-width: 50px; margin-top: 20px"
        @click="handleList()"
      >
        <font-awesome-icon :icon="['fas', 'search']" />
      </button>
    </div>
  </div>
  <div class="card border-rounded-1 text-center" v-show="state.isLoading">
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

  <div
    v-if="state.showTable"
    class="card border-rounded-1"
    style="margin-top: 7px"
  >
    <table
      class="display table table-bordered table-striped hover compact nowrap"
      id="example"
    >
      <thead>
        <tr>
          <th>Conta</th>
          <th>Problema</th>
          <th>Botão</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in state.listContaErrors" :key="list.codigo">
          <td>{{ list.codigo }}</td>
          <td>{{ list.problema }}</td>
          <td style="text-align: center">
            <button
              @click="handlerEdit(list.codigo)"
              class="btn-sm btn-outline-primary"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Editar"
            >
              <font-awesome-icon icon="edit" />
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Conta</th>
          <th>Problema</th>
          <th>Botão</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import "datatables.net-dt/js/dataTables.dataTables";
  import "datatables.net-dt/css/jquery.dataTables.min.css";
  import $ from "jquery";

  import { onMounted, reactive } from "vue";
  import { useToast } from "vue-toastification";
  import services from "../../services";
  import { useRouter } from "vue-router";
  import moment from "moment";

  export default {
    setup() {
      const toast = useToast();
      const router = useRouter();

      const state = reactive({
        dataInicial: currentDateTime(),
        dataFinal: currentDateTime(),
        hasError: false,
        listContaErrors: [],
        isLoading: false,
        plano: null,
        showTable: false
      });
      onMounted(() => {
        initialDate();
        //handleListPlano();
      });
      function handleError(error) {
        state.isLoading = false;
        state.hasError = !!error;
      }
      function currentDateTime(data) {
        return moment(data).format("YYYY-MM-DD");
      }
      async function handleList() {
        try {
          state.listEmpty = false;
          state.showTable = true;
          state.isLoading = true;
          services.contaPagar
            .getProblems(state.dataInicial, state.dataFinal)
            .then(resposta => {
              state.listContaErrors = resposta.data;
              if (!$.fn.dataTable.isDataTable("#example")) {
                setTimeout(() => {
                  $("#example").DataTable({
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
                }, 500);
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
      function initialDate() {
        state.dataFinal = moment()
          .endOf("month")
          .format("YYYY-MM-DD");
        state.dataInicial = moment()
          .startOf("month")
          .format("YYYY-MM-DD");
      }
      function handlerEdit(codigo) {
        router.push({ name: "ContaViewEdit", params: { codigo } });
      }

      return { router, state, handleList, handlerEdit };
    }
  };
</script>

<style>
</style>
