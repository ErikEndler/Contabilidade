<template>
  <div class="card border-rounded-1">
    <div v-show="state.isLoading">LOADING...</div>
    <table
      v-show="!state.isLoading"
      class="
        table table-bordered table-striped
        hover
        row-border
        display
        compact
        nowrap
      "
      id="example"
    >
      <thead>
        <tr>
          <th>Referencia</th>
          <th>Descrição</th>
          <th>Conta</th>
          <th>Edit</th>
          <th>Add Rateio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="state.listEmpty">
          <td colspan="6" class="text-center">Lista vazia</td>
        </tr>
        <tr v-for="plano in state.listPlanos" :key="plano.referencia">
          <td>{{ plano.referencia }}</td>
          <td>{{ plano.descricao }}</td>
          <td>{{ plano.conta }}</td>
          <td style="text-align: center">
            <button
              class="btn-sm btn-outline-primary"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Editar"
            >
              <font-awesome-icon icon="edit" />
            </button>
          </td>
          <td style="text-align: center">
            <button
              class="btn-sm btn-outline-primary"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Adicionar ao Conta Rateio"
              @click="callModalConfirm(plano, adr)"
            >
              <font-awesome-icon icon="plus" />
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Referencia</th>
          <th>Descrição</th>
          <th>Conta</th>
          <th>Editar</th>
          <th>Add Rateio</th>
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
  import useModal from "../../hooks/useModal";
  import { useRouter } from "vue-router";

  export default {
    setup() {
      const toast = useToast();
      const modal = useModal();
      const router = useRouter();

      const state = reactive({
        hasError: false,
        listEmpty: false,
        listPlanos: [],
        isLoading: true,
        plano: null
      });
      onMounted(() => {
        handleListPlano();
      });
      function handleError(error) {
        state.isLoading = false;
        state.hasError = !!error;
      }
      async function handleListPlano() {
        try {
          state.isLoading = true;
          //const { data } = await services.planoContas.getAll();
          // state.listPlanos = data;
          services.planoContas
            .getAll()
            .then(resposta => {
              state.listPlanos = resposta.data;
              setTimeout(() => {
                $("#example").DataTable({
                  language: {
                    lengthMenu: "Display _MENU_ linhas",
                    zeroRecords: "Nada encontrado",
                    info: "Página page _PAGE_ de _PAGES_",
                    infoEmpty: "Sem dados",
                    infoFiltered: "(filtrado de _MAX_ total linhas)"
                  },
                  fixedColumns: true
                });
                state.isLoading = false;
              }, 1500);

              if (state.listPlanos.length == 0) {
                state.listEmpty = true;
              }
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

      function callModalConfirm(plano) {
        state.plano = plano;
        modal.open({
          component: "ModalConfirme",
          props: {
            msg: "Confirmar a inserção deste plano de conta ao Conta Rateio"
          }
        });
        modal.listen(contaRateioAdd);
      }

      async function contaRateioAdd(payload) {
        console.log(payload);
        if (payload.answer) {
          try {
            const contaRateio = {
              descricao: state.plano.referencia + " - " + state.plano.descricao,
              contaContabilDebito: state.plano.referencia
            };
            // await services.contaRateio.post(contaRateio);
            console.log("---", contaRateio);
            services.contaRateio
              .post({ contaRateio: contaRateio })
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.log(error.response);
                toast.error(JSON.stringify(error.response.data.errors), {
                  timeout: false
                });
              });
          } catch (error) {
            state.isLoading = false;
            state.hasError = !!error;
            toast.error(error.status + error.message, { timeout: false });
          }
          modal.off(contaRateioAdd);
          state.plano = null;
        }
      }
      return { router, state, callModalConfirm };
    }
  };
</script>

<style>
.dataTables_wrapper {
  padding: 10px;
}
.table.dataTable th {
  background-color: #6dd47e;
}
</style>