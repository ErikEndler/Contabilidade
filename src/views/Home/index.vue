<template>
  <div class="row row-card">
    <div class="col">
      <div class="card shadow-blue border-rounded-1" id="cards">
        <div class="card-header">
          <div class="card-title h5">Contabilidade</div>
        </div>
        <div class="card-body">
          <p>Acesse para Inserir, Editar e visualizar :</p>
          <p>- Plano de contas</p>
          <p>- Conta rateio (Centro de Custo)</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-layout" @click="navigateContabilidade">
            Acessar
          </button>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card shadow-blue border-rounded-1" id="cards">
        <div class="card-header">
          <div class="card-title h5">Contas a Pagar</div>
        </div>
        <div class="card-body">
          <p>Altere dados de contas a pagar</p>
          <p>Veja lista de Problemas nas contas a pagar</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-layout" @click="navigateContasPagar">
            Acessar
          </button>
        </div>
      </div>
    </div>
  </div>

  <pdf-view v-if="false" date="1991-01-01" valor="900" />
</template>

<script>
  import { useRouter } from "vue-router";
  import { Modal } from "bootstrap";
  import PdfView from "../../components/PDF/index";

  export default {
    components: { PdfView },
    setup() {
      var myModal;

      const router = useRouter();
      function navigateContabilidade() {
        router.push({ name: "Contabilidade" });
      }
      function navigateContasPagar() {
        router.push({ name: "Contas" });
      }
      function open() {
        myModal = new Modal(document.getElementById("myModal"));
        myModal.show();
      }
      function close() {
        myModal.hide();
      }

      return { router, navigateContabilidade, navigateContasPagar, open, close };
    }
  };
</script>

<style>
</style>
