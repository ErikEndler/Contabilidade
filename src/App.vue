<template>
  <body>
    <header>
      <header-app />
    </header>
    <main class="main">
      <section class="content">
        <router-view />
      </section>
    </main>
    <ModalFactory />

    <footer-app />
  </body>
</template>
<script>
  import HeaderApp from "./components/HeaderApp";
  import FooterApp from "./components/FooterApp";

  import { watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import ModalFactory from "./components/ModalFactory";
  import services from "./services";
  import { setCurrentUser } from "./store/user";
  import useModal from "./hooks/useModal";

  export default {
    components: { ModalFactory, HeaderApp, FooterApp },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const modal = useModal();

      watch(
        () => (route.path, route.name),
        async () => {
          if (route.meta.hasAuth) {
            const token = window.localStorage.getItem("token");
            if (!token) {
              modal.open({ component: "ModalLogin" });

              router.push({ name: "Home" });
              return;
            } else if (token) {
              const { data } = await services.users.getMe();
              setCurrentUser(data);
            }
          } else {
            const token = window.localStorage.getItem("token");
            if (!token) {
              return;
            } else if (token) {
              const { data } = await services.users.getMe();
              setCurrentUser(data);
            }
          }
        }
      );
    }
  };
</script>
<style >
</style>
