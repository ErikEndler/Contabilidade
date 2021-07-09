<template>
  <div class="mg-top-10 container">
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
            label="referencia"
            placeholder=""
          />
          <TextInput
            v-model:value="state.planoDeConta.descricao"
            :reset="state.resetForm"
            name="descricao"
            type="text"
            label="descricao"
            placeholder=""
          />
          <TextInput
            v-model:value="state.planoDeConta.conta"
            :reset="state.resetForm"
            mask="#.#.#.##.####*"
            name="conta"
            type="text"
            label="conta"
            placeholder=""
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

  <div></div>
</template>

<script>
  import { reactive, onMounted } from "vue";
  import { Form } from "vee-validate";
  import TextInput from "../../components/Inputs/TextInput";
  import validators from "../../utils/validators";
  import services from "../../services";

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
      }
      const state = reactive({
        resetForm: false,
        hasErrors: false,
        isLoading: false,
        isEdit: false,
        planoDeConta: {
          referencia: "",
          descricao: "",
          conta: ""
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
</style>
