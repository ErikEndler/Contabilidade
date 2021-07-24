<template>
  <div class="mg-top-10 container">
    <div class="border-rounded-1 shadow-blue card">
      <div class="card-header">
        <h3>Formulário Plano de Contas</h3>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label"> <b>Referência</b> </label>
          <input
            v-maska="'###*'"
            v-on="validateReferencia"
            v-model="state.planoDeConta.referencia"
            class="form-control border-rounded-1 shadow-blue"
            :class="{
              'border-rounded-error shadow-error':
                !!state.errorMessage.referencia,
            }"
            type="text"
            placeholder="123"
          />
          <div
            v-if="!!state.errorMessage.referencia"
            class="alert alert-danger border-rounded-error shadow-error"
            role="alert"
          >
            {{ state.errorMessage.referencia }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label"> <b>Descrição</b> </label>
          <input
            v-on="validateDescricao"
            v-model="state.planoDeConta.descricao"
            class="form-control border-rounded-1 shadow-blue"
            :class="{
              'border-rounded-error shadow-error':
                !!state.errorMessage.descricao,
            }"
            type="text"
            placeholder="Conta descrição"
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
          <label class="form-label"> <b>Conta</b> </label>
          <input
            v-maska="'#.#.#.##.####*'"
            v-on="validateConta"
            v-model="state.planoDeConta.conta"
            class="form-control border-rounded-1 shadow-blue"
            :class="{
              'border-rounded-error shadow-error': !!state.errorMessage.conta,
            }"
            type="text"
            placeholder="1.1.1.02.0001"
          />
          <div
            v-if="!!state.errorMessage.conta"
            class="alert alert-danger border-rounded-error shadow-error"
            role="alert"
          >
            {{ state.errorMessage.conta }}
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
          <span
            v-if="state.isLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
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
      referencia: {
        type: [Number],
        default: null,
        required: false
      }
    },
    setup(props) {
      onMounted(() => {
        if (props.referencia) {
          services.planoContas
            .get({ referencia: props.referencia })
            .then(response => {
              state.planoDeConta = response.data;
              state.isEdit = true;
            });
        }
      });

      const toast = useToast();
      const modal = useModal();
      const { ...formulario } = useForm();
      //------Referencia----------
      const { ...referenciaField } = useField(
        "referencia",
        validators().validateCampoObrigatorio
      );
      const validateReferencia = computed(() => {
        return {
          blur: referenciaField.handleChange,
          change: referenciaField.handleChange
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
      //------Conta--------
      const { ...contaField } = useField(
        "conta",
        validators().validateCampoObrigatorio
      );
      const validateConta = computed(() => {
        return {
          blur: contaField.handleChange,
          change: contaField.handleChange
        };
      });

      const state = reactive({
        hasErrors: false,
        isLoading: false,
        isEdit: false,
        planoDeConta: {
          referencia: referenciaField.value,
          descricao: descricaoField.value,
          conta: contaField.value
        },
        errorMessage: {
          referencia: referenciaField.errorMessage,
          descricao: descricaoField.errorMessage,
          conta: contaField.errorMessage
        }
      });

      function formReset() {
        formulario.resetForm();
        //formularioMeta.value.valid = false;
        referenciaField.meta.valid = false;
        descricaoField.meta.valid = false;
        contaField.meta.valid = false;
        console.log("formularioMeta apos reset =", formulario.meta.value.valid);
      }

      function callModalConfirm() {
        modal.open({
          component: "ModalConfirme",
          props: { msg: "Confirmar Inserção de conta contabil" }
        });
        modal.listen(onSubmit);
      }

      async function onSubmit(payload) {
        console.log("payload - ", payload);
        if (payload.answer) {
          toast.clear();
          state.isLoading = true;
          // state.planoDeconta retorna proxy metodo é paraopegar os valores
          const proxy1 = new Proxy(state.planoDeConta, {});
          console.log("---", proxy1);
          const planoDeConta = {
            referencia: parseInt(state.planoDeConta.referencia),
            descricao: state.planoDeConta.descricao,
            conta: state.planoDeConta.conta
          };
          console.log(planoDeConta);
          services.planoContas
            .post({ planoDeConta: planoDeConta })
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
              // let obj = error.response.data.errors;
              // Object.entries(obj).forEach(element => {
              // toast.error(element.toString());
              // });
            });
        }
        modal.off(onSubmit);
      }

      return {
        formulario,
        state,
        onSubmit,
        callModalConfirm,
        validateDescricao,
        formReset,
        validateReferencia,
        validateConta
      };
    }
  };
</script>

<style>
</style>
