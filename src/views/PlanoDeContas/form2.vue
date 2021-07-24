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
            <h3>Formulário Plano de Contas</h3>
          </div>
          <div class="card-body">
            <Form
              @submit="onSubmit"
              id="myform"
              class="form-custom"
              :validation-schema="schema"
            >
              <TextInput
                v-model:value="state.planoDeConta.referencia"
                :reset="state.resetForm"
                mask="###*"
                name="referencia"
                type="text"
                label="Referência"
                placeholder="1234"
              />
              <TextInput
                v-model:value="state.planoDeConta.descricao"
                :reset="state.resetForm"
                name="descricao"
                type="text"
                label="Descrição"
                placeholder="Descrição da conta"
              />
              <TextInput
                v-model:value="state.planoDeConta.conta"
                :reset="state.resetForm"
                mask="#.#.#.##.####*"
                name="conta"
                type="text"
                label="Conta"
                placeholder="1.1.1.02.0001"
              />
            </Form>
          </div>
          <div class="card-footer">
            <button
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
      referencia: {
        type: [Number],
        default: null,
        required: false
      }
    },

    setup(props) {
      const modal = useModal();
      const toast = useToast();

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
      function onSubmit(values) {
        console.log("values: ", values);
        console.log(JSON.stringify(state.planoDeConta, null, 2));
        // state.planoDeConta = values;
        callModalConfirm();
      }
      function callModalConfirm() {
        modal.open({
          component: "ModalConfirme",
          props: { msg: "Confirmar Inserção/Alteração de conta a pagar" }
        });
        modal.listen(sendSubmit);
      }
      function sendSubmit(payload) {
        if (payload.answer) {
          const objEnvio = Object.assign({}, toRaw(state.planoDeConta));

          // console.log(JSON.stringify(objEnvio, null, 2));
          console.log("objEnvio - ", objEnvio);
          console.log(JSON.stringify(objEnvio));
          toast.clear();
          state.isLoading = true;
          let req = null;
          //if (state.conta.codigo) {req = services.planoContas.put(objEnvio);}
          //else {req = services.contaPagar.post(objEnvio);          }
          req = services.planoContas.post(objEnvio);
          req
            .then(response => {
              state.isLoading = false;
              toast.success("Conta inserida/atualizada com sucesso", {
                timeout: false
              });
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
        modal.off(sendSubmit);
      }

      const state = reactive({
        resetForm: false,
        hasErrors: false,
        isLoading: false,
        isEdit: false,
        planoDeConta: {
          referencia: null,
          descricao: null,
          conta: null
        }
      });
      const schema = {
        referencia: validators().validateCampoObrigatorio,
        descricao: validators().validateCampoObrigatorio,
        conta: validators().validateCampoObrigatorio
      };
      function formReset() {
        state.resetForm = true;
        resetObjet(state.planoDeConta);
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
