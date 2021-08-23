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
  import ModalFactory from "./components/ModalFactory";

  export default {
    components: { ModalFactory, HeaderApp, FooterApp },
    setup() {}
  };
</script>
<style >
</style>
