<template>
  <div class="mg-top-10 container col-8">
    <div class="border-rounded-1 shadow-blue card">
      <div class="card-header">
        <h3>Formulário Conta Rateio</h3>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label"><b>Descrição</b> </label>
          <input
            v-on="validateDescricao"
            v-model="state.contaRateio.descricao"
            class="form-control border-rounded-1 shadow-blue"
            :class="{
              'border-rounded-error shadow-error':
                !!state.errorMessage.descricao,
            }"
            type="text"
            placeholder="257 - exemplo"
          />
          <div
            v-if="!!state.errorMessage.descricao"
            class="alert alert-danger border-rounded-error shadow-error"
            role="alert"
          >
            {{ state.errorMessage.descricao }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">
            <b>Conta Contabil Débito</b>
          </label>
          <input
            v-maska="'###*'"
            v-on="validateContaDebito"
            v-model="state.contaRateio.contaContabilDebito"
            class="form-control border-rounded-1 shadow-blue"
            :class="{
              'border-rounded-error shadow-error':
                !!state.errorMessage.contaContabilDebito,
            }"
            type="text"
            placeholder="123"
          />
          <div
            v-if="!!state.errorMessage.contaContabilDebito"
            class="alert alert-danger border-rounded-error shadow-error"
            role="alert"
          >
            {{ state.errorMessage.contaContabilDebito }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">
            <b>Conta Contabil Crédito (Opcional)</b>
          </label>
          <input
            v-on="validateContaCredito"
            v-model="state.contaRateio.contaContabilCredito"
            class="form-control border-rounded-1 shadow-blue"
            :class="{
              'border-rounded-error shadow-error':
                !!state.errorMessage.contaContabilCredito,
            }"
            type="text"
            placeholder="123"
          />
          <div
            v-if="!!state.errorMessage.contaContabilCredito"
            class="alert alert-danger border-rounded-error shadow-error"
            role="alert"
          >
            {{ state.errorMessage.contaContabilCredito }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">
            <b>Descrição Forma Rateio (Opcional)</b>
          </label>
          <input
            v-on="validateDescricaoFormaRateio"
            v-model="state.contaRateio.descricaoFormaRateio"
            class="form-control border-rounded-1 shadow-blue"
            :class="{
              'border-rounded-error shadow-error':
                !!state.errorMessage.descricaoFormaRateio,
            }"
            type="text"
            placeholder="descrição complementar"
          />
          <div
            v-if="!!state.errorMessage.descricaoFormaRateio"
            class="alert alert-danger border-rounded-error shadow-error"
            role="alert"
          >
            {{ state.errorMessage.descricaoFormaRateio }}
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button
          :disabled="state.isLoading || !formulario.meta.value.valid"
          @click.prevent="callModalConfirm"
          class="btn btn-layout"
          :class="{ 'btn btn-layout loading': state.isLoading }"
        >
          Cadastrar
        </button>
        <button @click="formReset" class="btn btn-outline btn-cancel">
          Limpar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { computed, onMounted, reactive } from "vue";
  import { useToast } from "vue-toastification";
  import services from "../../services";
  import validators from "../../utils/validators";
  import { useField, useForm } from "vee-validate";
  import useModal from "../../hooks/useModal";

  export default {
    props: {
      codigo: {
        default: null,
        required: false
      }
    },
    setup(props) {
      onMounted(() => {
        if (props.codigo) {
          services.contaRateio.get({ codigo: props.codigo }).then(response => {
            state.contaRateio = response.data;
            console.log(response.data);
            state.isEdit = true;
          });
        }
      });

      const toast = useToast();
      const modal = useModal();
      const { ...formulario } = useForm();
      //------DescricaoFormaRateio----------
      const { ...descricaoFormaRateioField } = useField("descricaoFormaRateio");
      const validateDescricaoFormaRateio = computed(() => {
        return {
          blur: descricaoFormaRateioField.handleChange,
          change: descricaoFormaRateioField.handleChange
        };
      });
      //-------Descricao-------
      const { ...descricaoField } = useField(
        "descricao",
        validators().validateCampoObrigatorio
      );
      const validateDescricao = computed(() => {
        return {
          blur: descricaoField.handleChange,
          change: descricaoField.handleChange
        };
      });
      //------ContaContabilDebito--------
      const { ...contaContabilDebitoField } = useField(
        "contaContabilDebito",
        validators().validateCampoObrigatorio
      );
      const validateContaDebito = computed(() => {
        return {
          blur: contaContabilDebitoField.handleChange,
          change: contaContabilDebitoField.handleChange
        };
      });
      //------ContaContabilCredito--------
      const { ...contaContabilCreditoField } = useField("contaContabilCredito");
      const validateContaCredito = computed(() => {
        return {
          blur: contaContabilCreditoField.handleChange,
          change: contaContabilCreditoField.handleChange
        };
      });

      const state = reactive({
        hasErrors: false,
        isLoading: false,
        isEdit: false,
        contaRateio: {
          descricao: descricaoField.value,
          contaContabilDebito: contaContabilDebitoField.value,
          contaContabilCredito: contaContabilCreditoField.value,
          descricaoFormaRateio: descricaoFormaRateioField.value
        },
        errorMessage: {
          descricao: descricaoField.errorMessage,
          contaContabilDebito: contaContabilDebitoField.errorMessage,
          contaContabilCredito: contaContabilCreditoField.errorMessage,
          descricaoFormaRateio: descricaoFormaRateioField.errorMessage
        }
      });

      function formReset() {
        formulario.resetForm();
        //formularioMeta.value.valid = false;
        descricaoFormaRateioField.meta.valid = false;
        descricaoField.meta.valid = false;
        contaContabilDebitoField.meta.valid = false;
        contaContabilCreditoField.meta.valid = false;
        console.log("formularioMeta apos reset =", formulario.meta.value.valid);
      }

      async function onSubmit(payload) {
        if (payload.answer) {
          toast.clear();
          state.isLoading = true;
          const reqObject = JSON.parse(JSON.stringify(state.contaRateio));
          console.log("reqObject---", reqObject);

          services.contaRateio
            .post({ contaRateio: reqObject })
            .then(response => {
              state.isLoading = false;
              toast.success("Conta inserida com sucesso", { timeout: false });
              console.log(response.data);
            })
            .catch(error => {
              state.isLoading = false;
              console.log(error.response);
              toast.error(JSON.stringify(error.response.data.errors), {
                timeout: false
              });
            });
        }
        modal.off(onSubmit);
      }
      function callModalConfirm() {
        modal.open({
          component: "ModalConfirme",
          props: { msg: "Confirmar Inserção de conta contabil" }
        });
        modal.listen(onSubmit);
      }

      return {
        formulario,
        state,
        onSubmit,
        callModalConfirm,
        validateDescricao,
        formReset,
        validateDescricaoFormaRateio,
        validateContaDebito,
        validateContaCredito
      };
    }
  };
</script>

<style>
</style>
