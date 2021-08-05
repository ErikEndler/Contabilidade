<template>
  <div class="mg-top-10">
    <div class="row">
      <div class="col-auto">
        <button @click="$router.go(-1)" class="btn btn-outline btn-cancel">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
          Voltar
        </button>
      </div>
      <div class="col-10">
        <div class="border-rounded-1 shadow-blue card">
          <div class="card-header">
            <h3>Formulário de Fornecedor</h3>
          </div>
          <div class="card-body">
            <Form
              @submit="onSubmit"
              id="myform"
              class="form-custom"
              :validation-schema="schema"
            >
              <TextInput
                v-model:value="state.fornecedor.codigo"
                :reset="state.resetForm"
                name="codigo"
                type="text"
                label="Código"
              />
              <TextInput
                v-model:value="state.fornecedor.razaoSocial"
                :reset="state.resetForm"
                name="razaoSocial"
                type="text"
                label="Razão Social"
              />
              <TextInput
                v-model:value="state.fornecedor.nomeNomeFantasia"
                :reset="state.resetForm"
                name="nomeFantasia"
                type="text"
                label="Nome Fantasia"
              />
              <TextInput
                v-if="state.fornecedor.cgc"
                v-model:value="state.fornecedor.cgc"
                :reset="state.resetForm"
                mask="##.###.###/####-##"
                name="cgc"
                type="text"
                label="CNPJ"
              />
              <TextInput
                v-if="state.fornecedor.cpf"
                v-model:value="state.fornecedor.cpf"
                :reset="state.resetForm"
                mask="###.###.###-##"
                name="cpf"
                type="text"
                label="CPF"
              />
              <TextInput
                v-model:value="state.fornecedor.contaDebido"
                :reset="state.resetForm"
                mask="###*"
                name="contaDebido"
                type="text"
                label="Conta Debido"
                placeholder="1234"
              />
              <TextInput
                v-model:value="state.fornecedor.contaCredito"
                :reset="state.resetForm"
                mask="###*"
                name="contaCredito"
                type="text"
                label="Conta Credito"
                placeholder="1234"
              />
            </Form>
          </div>
          <div class="card-footer">
            <button
              @click.prevent="onSubmit"
              type="submit"
              form="myform"
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
    </div>
  </div>

  <div></div>
</template>

<script>
  import { reactive, onMounted, toRaw } from "vue";
  import { Form } from "vee-validate";
  import TextInput from "../../components/Inputs/TextInput";
  import validators from "../../utils/validators";
  import services from "../../services";
  import useModal from "../../hooks/useModal";
  import { useToast } from "vue-toastification";

  export default {
    components: {
      TextInput,
      Form
    },
    props: {
      codigo: {
        type: [Number],
        default: null,
        required: false
      }
    },

    setup(props) {
      const modal = useModal();
      const toast = useToast();

      onMounted(() => {
        if (props.codigo) {
          services.fornecedor
            .get(props.codigo)
            .then(response => {
              state.fornecedor = response.data;
              state.isEdit = true;
            })
            .catch(error => {
              state.isLoading = false;
              console.log(error.response);
              toast.error(JSON.stringify(error.response.data.errors), {
                timeout: false
              });
            });
        }
      });
      function onSubmit() {
        callModalConfirm();
      }
      function callModalConfirm() {
        modal.open({
          component: "ModalConfirme",
          props: { msg: "Confirmar Inserção/Alteração do Fornecedor" }
        });
        modal.listen(sendSubmit);
      }
      function sendSubmit(payload) {
        if (payload.answer) {
          const objEnvio = Object.assign({}, toRaw(state.fornecedor));
          console.log("objEnvio - ", objEnvio);
          console.log(JSON.stringify(objEnvio));
          toast.clear();
          state.isLoading = true;
          let req = null;
          req = services.fornecedor.put(objEnvio);
          req
            .then(() => {
              state.isLoading = false;
              toast.success("Fornecedor inserida/atualizada com sucesso", {
                timeout: false
              });
            })
            .catch(error => {
              state.isLoading = false;
              console.log(error.response);
              toast.error(JSON.stringify(error.response.data.errors), {
                timeout: false
              });
            });
        }
        modal.off(sendSubmit);
      }
      const state = reactive({
        resetForm: false,
        hasErrors: false,
        isLoading: false,
        isEdit: false,
        fornecedor: {}
      });
      const schema = {
        codigo: validators().validateCampoObrigatorio,
        razaoSocial: validators().validateCampoObrigatorio,
        nomeFantasia: validators().validateCampoObrigatorio,
        cpf: validators().validateCampoObrigatorio,
        cgc: validators().validateCampoObrigatorio
      };
      function formReset() {
        state.resetForm = true;
        resetObjet(state.fornecedor);
      }
      function resetObjet(obj) {
        for (const property in obj) {
          if (`${obj[property]}` === "[object Object]") {
            const subObj = obj[property];
            resetObjet(subObj);
          } else {
            obj[property] = null;
          }
        }
      }
      return {
        formReset,
        state,
        onSubmit,
        schema
      };
    }
  };
</script>

<style scoped>
.form-custom {
  width: 100% !important;
  margin: 0px auto;
  padding-bottom: 0px;
}
</style>
