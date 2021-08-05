<template>
  <div class="border-rounded-1 shadow-blue card">
    <div class="card-header">
      <div class="card-title h5">Classificações Contabeis</div>
    </div>
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
          <label for="">Tipo</label>
          <div id="v-model-select-dynamic " class="demo">
            <select
              class="form-select form-control border-rounded-1 shadow-blue"
              aria-label="Default select example"
              v-model="state.view"
            >
              <option
                v-for="item in state.list"
                v-bind:key="item.index"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
        </div>
        <div class="col align-self-end">
          <button
            class="btn btn-layout"
            style="min-width: 50px"
            @click="handleSearch()"
          >
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>
      </div>
      <div class="row" style="margin-top: 5px">
        <div class="col">
          <button
            class="btn btn-layout"
            style="min-width: 50px"
            @click="navigateXMLs()"
          >
            Ir para XMLs
            <font-awesome-icon :icon="['fas', 'arrow-alt-circle-right']" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="state.show" class="border-rounded-1 shadow-blue card">
    <div class="card-body">
      <classificacao-contabil
        :view="view.value"
        :dataI="state.dataI"
        :dataF="state.dataF"
      />
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import { onMounted, reactive } from "vue";
  import ClassificacaoContabil from "./classificacaoContabil";
  import { useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  import services from "../../services";

  export default {
    components: { ClassificacaoContabil },
    setup() {
      onMounted(() => {
        getListView();
      });
      const toast = useToast();
      const router = useRouter();
      const view = reactive({ value: null });
      const state = reactive({
        list: null,
        mesRef: null,
        dataI: null,
        dataF: null,
        view: null,
        show: false
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

      function handleSearch() {
        if (state.mesRef && state.mesRef != "") {
          state.dataF = moment(state.mesRef, "MM/YY ")
            .endOf("month")
            .format("YYYY-MM-DD");
          state.dataI = moment(state.mesRef, "MM/YY ")
            .startOf("month")
            .format("YYYY-MM-DD");
          if (state.view && state.dataI && state.dataF) {
            state.show = true;
            view.value = state.view;
          }
        } else {
          toast.error("informe MesRef e Tipo", {
            timeout: false
          });
        }
      }
      function navigateXMLs() {
        router.push({ name: "Xmls" });
      }

      //  watch(() => state.mesRef,() => {
      //    state.dataF = moment(state.mesRef, "MM/YY ").endOf("month").format("YYYY-MM-DD");
      //    state.dataI = moment(state.mesRef, "MM/YY ").startOf("month").format("YYYY-MM-DD");
      //  });

      return { state, handleSearch, view, navigateXMLs };
    }
  };
</script>

<style scoped>
.form-select {
  min-width: 300px;
}
</style>
