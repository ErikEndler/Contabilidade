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
                v-for="item in listaViews"
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
  import { reactive, toRaw } from "vue";
  import ClassificacaoContabil from "./classificacaoContabil";

  export default {
    components: { ClassificacaoContabil },
    setup() {
      const listaViews = [
        "adiantamento_recibos",
        "adiantamento_reembolso",
        "cartao_2018",
        "cartao_credito_compensado",
        "cartao_debito_compensado",
        "cartao_debito_compensado_taxa",
        "certificado_digital",
        "cheque_proprio_compensado",
        "cheque_recebido_compensado",
        "cobranca_emissao",
        "cobranca_recebimento",
        "cobranca_repasse",
        "conta_fornecedor_emissao",
        "conta_fornecedor_pagamento",
        "conta_imposto",
        "convenio_guias",
        "fatura_automatica_juros",
        "fatura_emissao_novo",
        "fatura_emissao_velho",
        "fatura_manual",
        "fatura_perdida",
        "patrocinio",
        "rendimento_aplicacao",
        "spc_receita",
        "spc_repasse",
        "tarifa_negativa",
        "tarifa_positiva",
        "transferencia"
      ];
      const state = reactive({
        mesRef: null,
        dataI: null,
        dataF: null,
        view: null,
        show: false
      });
      const view = reactive({ value: null });
      function handleSearch() {
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
        console.log(toRaw(state));
        console.log(view);
      }

      //  watch(() => state.mesRef,() => {
      //    state.dataF = moment(state.mesRef, "MM/YY ").endOf("month").format("YYYY-MM-DD");
      //    state.dataI = moment(state.mesRef, "MM/YY ").startOf("month").format("YYYY-MM-DD");
      //  });

      return { state, listaViews, handleSearch, view };
    }
  };
</script>

<style scoped>
.form-select {
  min-width: 300px;
}
</style>
