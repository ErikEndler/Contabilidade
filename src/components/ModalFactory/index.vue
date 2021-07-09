<template>
  <teleport to="body">
    <div
      class="modal fade"
      id="myModal"
      data-bs-backdrop="static"
      tabindex="-1"
      aria-labelledby="myModal"
      aria-hidden="true"
    >
      <div
        class="
          modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable
        "
      >
        <component :is="state.component" v-bind="state.props" />
      </div>
    </div>
  </teleport>
</template>

<script>
  import {
    defineAsyncComponent,
    onBeforeUnmount,
    onMounted,
    reactive
  } from "vue";
  import { Modal } from "bootstrap";

  import useModal from "../../hooks/useModal";

  const ModalLogin = defineAsyncComponent(() => import("../ModalLogin/index"));
  const ModalFornecedor = defineAsyncComponent(() =>
    import("../../views/Fornecedor/modalList.vue")
  );
  const ModalTitulo = defineAsyncComponent(() =>
    import("../../views/Titulo/modal-list.vue")
  );
  const ModalPdf = defineAsyncComponent(() => import("../PDF/index.vue"));
  const ModalContaRateio = defineAsyncComponent(() =>
    import("../../views/ContaRateio/modal-contaRateio.vue")
  );
  const ModalSetor = defineAsyncComponent(() =>
    import("../../views/Setor/modal-setor.vue")
  );
  const ModalConfirme = defineAsyncComponent(() =>
    import("../ModalConfirme/index")
  );

  export default {
    components: {
      ModalLogin,
      ModalConfirme,
      ModalPdf,
      ModalTitulo,
      ModalFornecedor,
      ModalSetor,
      ModalContaRateio
    },
    setup() {
      var myModal;
      const modal = useModal();
      const state = reactive({
        isActive: false,
        component: {},
        props: {}
      });

      onMounted(() => {
        modal.listen(handleModalToogle);
      });
      onBeforeUnmount(() => {
        console.log("onBeforeUnmount");
        modal.off(handleModalToogle);
      });

      function handleModalToogle(payload) {
        //console.log("handleModalToogle factory:", payload);
        if (payload.status) {
          myModal = new Modal(document.getElementById("myModal"));
          myModal.show();
          //sconsole.log(payload.props);
          state.component = payload.component;
          state.props = payload.props;
        } else {
          //console.log("caiu else factory");
          state.component = {};
          state.props = {};
          myModal.hide();
        }
        state.isActive = payload.status;
      }

      return { state, handleModalToogle };
    }
  };
</script>

<style>
</style>
