<template>
  <div class="row row-card">
    <div class="col-6">
      <div class="card shadow-blue border-rounded-1">
        <div class="card-header">
          <div class="card-title h5">
            <font-awesome-icon style="" :icon="['fas', 'list']" /> Ver Plano de
            Contas
          </div>
        </div>
        <div class="card-body">
          <p>Clique para ver/listar o Plano de contas</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-layout" @click="navigatePlanoList">
            Acessar
          </button>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="shadow-blue border-rounded-1 card">
        <div class="card-header">
          <div class="card-title h5">
            <font-awesome-icon :icon="['fas', 'plus']" /> Adicionar conta (Plano
            Contabil)
          </div>
        </div>
        <div class="card-body">Inserir uma conta no plano contabil</div>
        <div class="card-footer">
          <button class="btn btn-layout" @click="navigatePlanoForm">
            Acessar
          </button>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card shadow-blue border-rounded-1">
        <div class="card-header">
          <div class="card-title h5">
            <font-awesome-icon :icon="['fas', 'list']" /> Ver Contas Rateio
          </div>
        </div>
        <div class="card-body">
          <p>Clique para ver/listar as Contas Rateio</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-layout" @click="navigateContaRateioList">
            Acessar
          </button>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card shadow-blue border-rounded-1">
        <div class="card-header">
          <div class="card-title h5">
            <font-awesome-icon :icon="['fas', 'plus']" /> Conta Rateio
          </div>
        </div>
        <div class="card-body">Adicione uma conta rateio</div>
        <div class="card-footer">
          <button class="btn btn-layout" @click="navigateContaRateioForm">
            Acessar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useRouter } from "vue-router";

  export default {
    setup() {
      const router = useRouter();

      function navigatePlanoList() {
        router.push({ name: "PlanoDeContasList" });
      }
      function navigatePlanoForm() {
        router.push({ name: "PlanoDeContasForm" });
      }
      function navigateContaRateioForm() {
        router.push({ name: "ContaRateioForm" });
      }
      function navigateContaRateioList() {
        router.push({ name: "ContaRateioList" });
      }

      return {
        router,
        navigatePlanoList,
        navigatePlanoForm,
        navigateContaRateioForm,
        navigateContaRateioList
      };
    }
  };
</script>

<style>
</style>