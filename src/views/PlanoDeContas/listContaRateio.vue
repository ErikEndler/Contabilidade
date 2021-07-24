<template>
  <div class="text-center" v-show="state.isLoading">
    <div class="d-flex justify-content-center">
      <div class="d-flex justify-content-center">
        <div class="loader-css"></div>
      </div>
    </div>
  </div>
  <div class="col-auto" style="margin-bottom: 5px">
    <button @click="$router.go(-1)" class="btn btn-outline btn-cancel">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      Voltar
    </button>
  </div>
  <div class="border-rounded-1 shadow-blue card">
    <table
      class="
        display
        table table-bordered table-striped
        hover
        row-border
        compact
        nowrap
      "
      id="example"
    >
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Conta Debito</th>
          <th>Conta Credito</th>
          <th>D. Forma Rateio</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="conta in state.listContas" :key="conta.codigo">
          <td>{{ conta.descricao }}</td>
          <td>{{ conta.contaContabilDebito }}</td>
          <td>{{ conta.contaContabilCredito }}</td>
          <td>{{ conta.descricaoFormaRateio }}</td>
          <td style="text-align: center">
            <button
              @click="clickEdit(conta.codigo)"
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
          <th>Descrição</th>
          <th>Conta Debito</th>
          <th>Conta Credito</th>
          <th>D. Forma Rateio</th>
          <th>Editar</th>
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
  import { useRouter } from "vue-router";

  import services from "../../services";
  import { useToast } from "vue-toastification";

  export default {
    setup() {
      const toast = useToast();
      const router = useRouter();
      const state = reactive({
        hasError: false,
        listEmpty: false,
        listContas: [],
        isLoading: false
      });

      onMounted(() => {
        handleListPlano();
      });

      function handleError(error) {
        state.isLoading = false;
        state.hasError = !!error;
      }
      function clickEdit(codigo) {
        router.push({ name: "ContaRateioFormEdit", params: { codigo } }); // -> /ContaRateioForm/123
      }

      async function handleListPlano() {
        try {
          state.isLoading = true;
          //const { data } = await services.planoContas.getAll();
          // state.listContas = data;
          services.contaRateio
            .getAll()
            .then(resposta => {
              state.listContas = resposta.data;
              setTimeout(() => {
                $("#example").DataTable({
                  language: {
                    lengthMenu: "Display _MENU_ linhas",
                    zeroRecords: "Nada encontrado",
                    info: "Página page _PAGE_ de _PAGES_",
                    infoEmpty: "Sem dados",
                    infoFiltered: "(filtrado de _MAX_ total linhas)"
                  },
                  lengthMenu: [20, 25, 50, 75, 100],
                  scrollY: "60vh",
                  scrollCollapse: true
                });
                state.isLoading = false;
              }, 500);
              if (state.listContas.length == 0) {
                state.listEmpty = true;
              }
              state.isLoading = false;
            })
            .catch(error => {
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
      return { router, state, clickEdit };
    }
  };
</script>

<style>
.table.dataTable th {
  background-color: #00154fec;
  color: #ffd55a;
}
.dataTables_filter {
  margin: 5px;
}
table#example.dataTable tbody tr:hover {
  background-color: #ffa;
}

table#example.dataTable tbody tr:hover > .sorting_1 {
  background-color: #ffa;
}
</style>
