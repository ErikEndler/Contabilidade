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
  <div class="card border-rounded-1">
    <table
      class="display table table-bordered table-striped hover compact nowrap"
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
              @click="navigateEdit(plano.referencia)"
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
                  lengthMenu: [15, 25, 50, 75, 100],
                  scrollY: "60vh",
                  scrollCollapse: true
                });
                state.isLoading = false;
              }, 500);

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
      function navigateEdit(referencia) {
        router.push({ name: "PlanoDeContasFormEdit2", params: { referencia } }); // -> /ContaRateioForm/123
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
      return { router, state, callModalConfirm, navigateEdit };
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
