<template>
  <div>
    <div class="row">
      <div class="col-auto">
        <input
          v-model="state.data"
          class="form-control border-rounded-1 shadow-blue"
          type="date"
          placeholder="Data"
        />
      </div>
      <div class="col-3">
        <button
          class="btn btn-layout"
          style="min-width: 50px"
          @click="searchCertificado()"
        >
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
      </div>
    </div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Data</th>
            <th scope="col">Nome</th>
            <th scope="col">CNPJ/CPF</th>
            <th scope="col">Valor</th>
            <th scope="col">Opção</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="state.isLoading">
            <td colspan="6" class="text-center">
              <div class="d-flex justify-content-center">
                <div class="loader-css"></div>
              </div>
            </td>
          </tr>
          <tr v-if="state.listEmpty">
            <td colspan="6" class="text-center"><h5>Lista vazia</h5></td>
          </tr>
          <tr
            v-for="certificado in state.certificados"
            :key="certificado.caixa_codigo"
          >
            <td>{{ certificado.caixa_codigo }}</td>
            <td>{{ currentDateTime(certificado.data_lancamento) }}</td>
            <td>{{ certificado.nome }}</td>
            <td>{{ certificado.cnpj_cpf }}</td>
            <td>R$ {{ replaceMoney(certificado.valor) }}</td>
            <td>
              <button @click="openPDF(certificado)" class="btn-sm btn-layout">
                <font-awesome-icon icon="file-alt" /> Imprimir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { reactive, onMounted } from "vue";
  import moment from "moment";
  import services from "../../services";
  import { useToast } from "vue-toastification";
  import useModal from "../../hooks/useModal";

  export default {
    setup() {
      onMounted(() => {
        searchCertificado();
      });
      const modal = useModal();
      const toast = useToast();
      const state = reactive({
        isLoading: false,
        listEmpty: false,
        data: currentDateTime(),
        certificados: {}
      });
      function currentDateTime(data) {
        return moment(data).format("YYYY-MM-DD");
      }
      function replaceMoney(valor) {
        if (valor.toString().indexOf(".") > -1) {
          valor = valor.replace(".", ",");
          console.log(valor);
        } else {
          valor = valor + ",00";
        }
        return valor;
      }
      function openPDF(certificado) {
        modal.open({
          component: "ModalPdf",
          props: {
            //
            valor: certificado.valor,
            razaoSocial: certificado.nome,
            cnpj: certificado.cnpj_cpf,
            servico: "Certificado",
            date: certificado.data_lancamento,
            caixaCodigo: certificado.caixa_codigo
            //
          }
        });
      }
      function searchCertificado() {
        state.listEmpty = false;
        state.isLoading = true;
        services.recibo
          .getCertificado(state.data)
          .then(resposta => {
            state.certificados = resposta.data;
            state.isLoading = true;
            if (state.certificados.length == 0) {
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

      return { state, searchCertificado, currentDateTime, replaceMoney, openPDF };
    }
  };
</script>
<style>
</style>
