<template>
  <nav class="navbar navbar-expand-md">
    <div class="navbar-collapse w-100">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="btn btn-gold" @click="navigateHome">Home</a>
        </li>
        <li class="nav-item">
          <a class="btn btn-gold" @click="navigateRecibos">Recibos</a>
        </li>
        <li class="nav-item">
          <a
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Classificação Contabil"
            class="btn btn-gold"
            @click="navigateClassificacaoContabil"
            >Clas. Contabil</a
          >
        </li>
      </ul>
    </div>
    <div class="mx-auto">
      <a class="navbar-brand" href="#">
        <img
          class="img-central"
          src="../../assets/images/coins-money.png"
          alt="Money"
        />
      </a>
    </div>
    <div class="navbar-collapse w-100 justify-content-end">
      <button
        v-if="!state.isLogged"
        @click="handleLogin"
        class="btn btn-gold btn-rounded"
      >
        Logar
      </button>
      <button
        v-if="state.isLogged"
        @click="handleLogout"
        class="btn btn-gold btn-rounded"
      >
        {{ logoutLabel }}
      </button>
    </div>
  </nav>
</template>

<script>
  import { computed, onMounted, reactive, watch } from "vue";
  import useModal from "../../hooks/useModal";
  import useStore from "../../hooks/useStore";
  import { clearCurrentUser } from "../../store/user";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const router = useRouter();
      const modal = useModal();
      const store = useStore("User");
      const state = reactive({
        isLogged: false
      });
      onMounted(() => {
        verifyLogin();
      });

      function verifyLogin() {
        const token = window.localStorage.getItem("token");
        if (token) state.isLogged = true;
        else state.isLogged = false;
      }
      function navigateRecibos() {
        router.push({ name: "Recibos" });
      }
      function navigateHome() {
        router.push({ name: "Home" });
      }
      function navigateClassificacaoContabil() {
        router.push({ name: "ClassificacaoContabil" });
      }
      //ClassificacaoContabil
      watch(
        () => store.currentUser,
        () => {
          verifyLogin();
        }
      );

      function testeConfirme() {
        modal.open({ component: "ModalConfirme", props: { msg: "teste msg" } });
        modal.listen(resultado);
      }
      function resultado(payload) {
        console.log("entrou resultado");
        console.log(payload.answer);
        modal.off(resultado);
        console.log("desisncrito");
      }

      const logoutLabel = computed(() => {
        if (!store.currentUser.nome) {
          return "...";
        }
        return `${store.currentUser.nome} (sair)`;
      });

      function handleLogin() {
        modal.open({ component: "ModalLogin" });
        verifyLogin();
      }
      function handleLogout() {
        window.localStorage.removeItem("token");
        clearCurrentUser();
        verifyLogin();
        router.push({ name: "Home" });
      }
      return {
        router,
        handleLogin,
        handleLogout,
        logoutLabel,
        state,
        navigateRecibos,
        navigateHome,
        testeConfirme,
        navigateClassificacaoContabil
      };
    }
  };
</script>

 <style>
.navbar-nav .nav-link {
  color: black;
}
.navbar {
  height: 4rem;
  background-color: #00154f;
}

.img-central {
  max-width: 60px;
  max-height: 120px;
  width: auto;
  height: auto;
}
</style>
