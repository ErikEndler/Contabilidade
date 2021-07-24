<template>
  <div class="row row-card">
    <div class="col-6 col-xl-4">
      <div class="card shadow-blue border-rounded-1">
        <div class="card-header">
          <div class="card-title h5">
            <font-awesome-icon style="" :icon="['fas', 'search']" /> Ver Conta
          </div>
        </div>
        <div class="card-body">
          <p>Busque e edite uma Conta</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-layout" @click="navigateContaView">
            Acessar
          </button>
        </div>
      </div>
    </div>
    <div class="col-6 col-xl-4">
      <div class="shadow-blue border-rounded-1 card">
        <div class="card-header">
          <div class="card-title h5">
            <font-awesome-icon :icon="['fas', 'plus']" /> Ver lista de erros das
            contas
          </div>
        </div>
        <div class="card-body">
          Selecione um periodo e busque possiveis erros nas contas a pagar
          <p>
            <b>Problemas detectaveis :</b><br />
            - 'Problema soma valores'<br />
            - 'Problema valores parcela'<br />
            - 'Fornecedor sem codigo contabil vinculado'
          </p>
        </div>
        <div class="card-footer">
          <button class="btn btn-layout" @click="navigateContaPromlems">
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

      function navigateContaView() {
        router.push({ name: "ContaView2" });
      }
      function navigateContaPromlems() {
        router.push({ name: "ContaProblemas" });
      }

      return {
        router,
        navigateContaPromlems,
        navigateContaView
      };
    }
  };
</script>

<style>
</style>
