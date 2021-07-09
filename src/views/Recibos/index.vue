<template>
  <div class="card border-rounded-1">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          Certificado
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Fatura
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="contact-tab"
          data-bs-toggle="tab"
          data-bs-target="#contact"
          type="button"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Outro Recibo
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div style="margin: 10px"><Certificado /></div>
      </div>
      <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div style="margin: 10px"><fatura /></div>
      </div>
      <div
        class="tab-pane fade"
        id="contact"
        role="tabpanel"
        aria-labelledby="contact-tab"
      >
        <div style="margin: 10px">
          <p>Em desenvolvimento...</p>
          <p>Disponivel em Breve</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Fatura from "./fatura.vue";
  import Certificado from "./certificado.vue";
  export default {
    components: {
      Certificado,
      Fatura
    }
  };
</script>

<style scoped>
.nav-link {
  border-color: var(--cor-principal) var(--cor-principal) #fff;
  background: #ccd0dc;
  color: var(--cor-principal);
  margin: 2px;
}
.nav-link.active {
  border-color: var(--cor-secundaria) var(--cor-secundaria) #fff;
  color: var(--cor-secundaria);
  background: var(--cor-principal);
}
</style>