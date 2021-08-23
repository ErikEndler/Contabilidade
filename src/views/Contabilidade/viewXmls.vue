<template>
  <div class="border-rounded-1 shadow-blue card">
    <div class="card-header">
      <div class="row">
        <div class="col-auto">
          <button @click="$router.go(-1)" class="btn btn-outline btn-cancel">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            Voltar
          </button>
        </div>
        <div style="margin-top: 5px" class="col card-title h5">
          XMLs Contabilidade
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="border-rounded-1 card">
        <div class="card-body">
          <div class="row">
            <div class="col-auto">
              <label for="mesRef">Mes Ref </label>
              <input
                style="max-width: 100px"
                v-maska="'##/##'"
                v-model="state.mesRef"
                name="mesRef"
                class="form-control border-rounded-1 shadow-blue"
                type="text"
              />
            </div>
            <div class="col-auto">
              <label for="">Data Inicial</label>
              <input
                readonly
                v-model="state.dataI"
                class="form-control border-rounded-1 shadow-blue"
                type="date"
              />
            </div>
            <div class="col-auto">
              <label for="">Data Final</label>
              <input
                readonly
                v-model="state.dataF"
                class="form-control border-rounded-1 shadow-blue"
                type="date"
              />
            </div>
            <div class="col align-self-end">
              <button
                class="btn btn-layout"
                style="min-width: 50px"
                @click="handleConfig()"
              >
                Configurar
              </button>
            </div>
          </div>
          <div class="row" style="margin-top: 10px">
            <div class="card">
              <div class="card-body">
                <font-awesome-icon :icon="['fas', 'info-circle']" />
                <b> Selecione Mes Ref para configurar o XML. Exemplo 01/21</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-for="item in state.list" :key="item.index">
        <div class="row" style="margin-top: 5px">
          <div class="col">
            <button
              class="btn btn-outline btn-cancel"
              style="min-width: 50px"
              @click="downloadXML(item)"
            >
              Baixar XML_{{ item }}
              <font-awesome-icon :icon="['fas', 'arrow-alt-circle-down']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMounted, reactive, toRaw } from "vue";
  import moment from "moment";
  import { useToast } from "vue-toastification";
  import services from "../../services";

  export default {
    setup() {
      onMounted(() => {
        getListView();
      });
      const toast = useToast();
      const state = reactive({
        list: null,
        mesRef: null,
        dataI: null,
        dataF: null
      });
      function getListView() {
        try {
          state.listEmpty = false;
          state.isLoading = true;
          services.contabilidade
            .getViews()
            .then(resposta => {
              state.list = resposta.data;
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
      function handleError(error) {
        state.isLoading = false;
        state.hasError = !!error;
      }
      function handleConfig() {
        state.dataF = moment(state.mesRef, "MM/YY ")
          .endOf("month")
          .format("YYYY-MM-DD");
        state.dataI = moment(state.mesRef, "MM/YY ")
          .startOf("month")
          .format("YYYY-MM-DD");
      }
      function downloadXML(item) {
        if (state.dataI && state.dataF) {
          console.log("entrou get xml");
          services.contabilidade
            .getXMLPerson(item, toRaw(state.dataI), toRaw(state.dataF))
            .then(resposta => {
              state.teste = resposta.data;
              var fileURL = window.URL.createObjectURL(new Blob([resposta.data]));
              var fireLink = document.createElement("a");
              fireLink.href = fileURL;
              fireLink.setAttribute(
                "download",
                moment(state.dataI).format("YYYY_MM") + "_xml_" + item + ".xml"
              );
              document.body.appendChild(fireLink);
              fireLink.click();
              //document.body.removeChild(fireLink);
            });
        } else {
          toast.error("Selecione Mes Ref", { timeout: false });
        }
      }

      return { state, handleConfig, downloadXML };
    }
  };
</script>

<style scoped>
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
.card {
  border: 1px solid;
}
</style>
