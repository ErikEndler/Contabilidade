<template>
  <div class="row">
    <div class="col-auto" style="margin-bottom: 5px">
      <button @click="$router.go(-1)" class="btn btn-outline btn-cancel">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Voltar
      </button>
      <button @click="getXML()" class="btn btn-outline btn-cancel">
        <font-awesome-icon :icon="['fas', 'arrow-alt-circle-down']" />
        Baixar XML
      </button>
    </div>
    <div class="col-auto">
      <button v-if="state.isLoading" class="btn btn-outline btn-cancel">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Soma Débito
      </button>
      <div v-if="!state.isLoading" class="input-group border-rounded-1">
        <div class="input-group-text">
          <font-awesome-icon :icon="['fas', 'dollar-sign']" /> Soma Débito
        </div>
        <input
          readonly
          v-model="state.somaDebito"
          type="text"
          class="form-control"
          id="autoSizingInputGroup"
          placeholder="Username"
        />
      </div>
    </div>
    <div class="col-auto">
      <button v-if="state.isLoading" class="btn btn-outline btn-cancel">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Soma Crédito
      </button>
      <div v-if="!state.isLoading" class="input-group border-rounded-1">
        <div class="input-group-text">
          <font-awesome-icon :icon="['fas', 'dollar-sign']" /> Soma Crédito
        </div>
        <input
          readonly
          v-model="state.somaCredito"
          type="text"
          class="form-control"
          id="autoSizingInputGroup"
          placeholder="Username"
        />
      </div>
    </div>
  </div>

  <div class="border-rounded-1 shadow-blue card">
    <div class="table-responsive" style="max-height: 70vh">
      <table class="table table-striped table-hover">
        <thead
          style="position: sticky; top: 0; background: #00154f; color: #ffd55a"
        >
          <tr>
            <th class="header-table" scope="col">GRPSEQLAN</th>
            <th class="header-table" scope="col">DTALAN</th>
            <th class="header-table" scope="col">CODNORCNT</th>
            <th class="header-table" scope="col">CODHIS</th>
            <th class="header-table" scope="col">COMLAN</th>
            <th class="header-table" scope="col">DOCLAN</th>
            <th class="header-table" scope="col">NATLAN</th>
            <th class="header-table" scope="col">VLRLAN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="state.isLoading">
            <td colspan="8" class="text-center">
              <div class="d-flex justify-content-center">
                <div class="loader-css"></div>
              </div>
            </td>
          </tr>
          <tr v-if="state.listEmpty">
            <td colspan="8" class="text-center"><h5>Lista vazia</h5></td>
          </tr>
          <tr v-for="item in state.list" :key="item.index">
            <td>{{ item.grpseqlan }}</td>
            <td>{{ convertDateTime(item.dtalan) }}</td>
            <td>{{ item.codnorcnt }}</td>
            <td>{{ item.codhis }}</td>
            <td>{{ item.comlan }}</td>
            <td>{{ item.doclan }}</td>
            <td>{{ item.natlan }}</td>
            <td>{{ item.vlrlan }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  //import "datatables.net-dt/js/dataTables.dataTables";
  // import "datatables.net-dt/css/jquery.dataTables.min.css";
  // import $ from "jquery";
  import { onMounted, reactive, watch } from "vue";
  import { useRouter } from "vue-router";
  import services from "../../services";
  import { useToast } from "vue-toastification";
  import moment from "moment";

  export default {
    props: {
      view: {
        type: String,
        default: "transferencia",
        required: false
      },
      dataI: {
        type: String,
        default: "2021-01-01",
        required: false
      },
      dataF: {
        type: String,
        default: "2021-01-31",
        required: false
      }
    },
    setup(props) {
      const toast = useToast();
      const router = useRouter();
      const state = reactive({
        hasError: false,
        list: null,
        isLoading: false,
        listEmpty: false,
        mesRef: null,
        somaDebito: null,
        somaCredito: null
      });

      onMounted(() => {
        handleListPlano();
        setMesref();
      });
      watch(props, () => {
        handleListPlano();
        setMesref();
      });
      function setMesref() {
        state.mesRef = moment(props.dataI).format("YYYY_MM");
      }

      function handleError(error) {
        state.isLoading = false;
        state.hasError = !!error;
      }
      function convertDateTime(data) {
        if (data) return moment(data).format("YYYY/MM/DD");
        else return null;
      }
      function getXML() {
        console.log("entrou get xml");
        services.contabilidade
          .getXMLPerson(props.view, props.dataI, props.dataF)
          .then(resposta => {
            state.teste = resposta.data;
            var fileURL = window.URL.createObjectURL(new Blob([resposta.data]));
            var fireLink = document.createElement("a");
            fireLink.href = fileURL;
            fireLink.setAttribute(
              "download",
              state.mesRef + "_xml_" + props.view + ".xml"
            );
            document.body.appendChild(fireLink);
            fireLink.click();
            //document.body.removeChild(fireLink);
          });
      }
      function calcCD() {
        let valorC = 0;
        let valorD = 0;
        if (state.list.length > 0) {
          state.list.forEach(item => calc(item));
        }
        function calc(item) {
          if (item.natlan === "C") {
            valorC = parseFloat(valorC + item.vlrlan);
            state.somaCredito = valorC.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            });
          } else if (item.natlan === "D") {
            valorD = parseFloat(valorD + item.vlrlan);
            state.somaDebito = valorD.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            });
          }
        }
      }
      async function handleListPlano() {
        try {
          state.listEmpty = false;
          state.isLoading = true;
          services.contabilidade
            .getView(props.dataI, props.dataF, props.view)
            .then(resposta => {
              state.list = resposta.data;
              calcCD();
              if (state.list.length == 0) {
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
      return { router, state, convertDateTime, getXML };
    }
  };
</script>

<style scoped>
.header-table {
  position: sticky;
  top: 0;
}
.dataTables_wrapper {
  padding: 10px;
}
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
.input-group-text {
  background-color: #d0d2d4 !important;
}
</style>
