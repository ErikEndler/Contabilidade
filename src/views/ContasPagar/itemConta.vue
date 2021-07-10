<template>
  <Form
    @submit="onSubmit"
    id="itemform"
    class="form-custom"
    :validation-schema="schema"
    autocomplete="off"
  >
    <div class="row">
      {{ itemConta.contaPagarCodigo }}
      <div class="col-3">
        <label>Setor</label>
        <input
          name="setorDescricao"
          style="cursor: pointer"
          class="form-control border-rounded-1 shadow-blue"
          type="text"
          v-model="state.itemConta.setor.descricao"
          @click="modalSetor"
          readonly
        />
        <!--<TextInput
          v-model:value="state.itemConta.setor.descricao"
          name="setorDescricao"
          label="Setor"
          type="text"
          placeholder="Setor"
        />-->
      </div>
      <div class="col-6">
        <label>Centro de Custo</label>
        <input
          name="contaRateioDescricao"
          style="cursor: pointer"
          class="form-control border-rounded-1 shadow-blue"
          type="text"
          v-model="state.itemConta.contaRateio.descricao"
          @click="modalContaRateio"
          readonly
        />
        <!--<TextInput
          v-model:value="state.itemConta.contaRateio.descricao"
          name="contaRateioDescricao"
          label="Centro Custo"
          type="text"
          placeholder="Centro custo"
        />-->
      </div>
      <div class="col-2">
        <CurrencyInput
          v-model:modelValue="state.itemConta.valor"
          :reset="state.resetForm"
          name="valor"
          label="Valor "
          :options="{
            currency: 'BRL',
            distractionFree: false,
            precision: 2,
          }"
          placeholder=""
        />
      </div>
      <div class="col-1 align-self-end">
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            @click="callModalConfirm"
            type="button"
            class="btn-sm btn-success"
          >
            <font-awesome-icon :icon="['fas', 'save']" size="lg" />
          </button>
          <button type="button" class="btn-sm btn-danger">
            <font-awesome-icon :icon="['far', 'trash-alt']" size="lg" />
          </button>
        </div>
      </div>
    </div>
  </Form>
</template>

<script>
  import { onMounted, reactive, toRaw } from "vue";
  import validators from "../../utils/validators";
  import useModal from "../../hooks/useModal";
  import { Form } from "vee-validate";
  import CurrencyInput from "../../components/Inputs/CurrencyInput";
  import services from "../../services";
  import { useToast } from "vue-toastification";

  export default {
    components: {
      CurrencyInput,
      Form
    },
    props: {
      itemConta: { type: Object, required: true },
      contaCodigo: { type: Number }
    },
    setup(props) {
      onMounted(() => {
        if (props.contaCodigo) {
          state.itemConta.contaPagarCodigo = props.contaCodigo;
        }
      });
      const toast = useToast();
      const modal = useModal();
      const state = reactive({
        resetForm: false,
        hasErrors: false,
        isLoading: false,
        isEdit: false,
        itemConta: props.itemConta
      });
      const msg = {
        save: "Confirmar Inserção de Item de Conta a Pagar",
        edit: "Confirmar Alteração de Item de Conta a Pagar",
        delete: "Confirmar Exclusão de Item de Conta a Pagar"
      };
      function callModalConfirm(mensagem) {
        modal.open({
          component: "ModalConfirme",
          props: { msg: mensagem }
        });
        if (mensagem === msg.save || mensagem === msg.edit)
          modal.listen(onSubmit);
        else if (mensagem === msg.delete) modal.listen(onSubmit);
      }
      const schema = {
        setorDescricao: validators().validateCampoObrigatorio,
        contaRateioDescricao: validators().validateCampoObrigatorio,
        valor: validators().validateCampoObrigatorio
      };
      function modalSetor() {
        modal.open({
          component: "ModalSetor",
          props: {}
        });
        modal.listen(changeSetor);
      }
      function changeSetor(payload) {
        console.log(payload);
        if (payload.setor) {
          state.itemConta.setor = payload.setor;
        }
        modal.off(changeSetor);
      }
      function modalContaRateio() {
        modal.open({
          component: "ModalContaRateio",
          props: {}
        });
        modal.listen(changeContaRateio);
      }
      function changeContaRateio(payload) {
        console.log(payload);
        if (payload.contaRateio) {
          state.itemConta.contaRateio = payload.contaRateio;
        }
        modal.off(changeContaRateio);
      }

      function onSubmit(payload) {
        if (payload.answer) {
          toast.clear();
          state.isLoading = true;
          JSON.stringify(state.conta, null, 2);
          let req = null;
          if (state.itemConta.codigo) {
            req = services.itemConta.post(JSON.stringify(state.conta, null, 2));
          } else {
            req = services.itemConta.put(JSON.stringify(state.conta, null, 2));
          }
          req
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
        //
        console.log(payload);
        console.log(toRaw(state.itemConta));
        modal.off(onSubmit);
      }
      return { callModalConfirm, state, schema, modalSetor, modalContaRateio };
    }
  };
</script>

<style>
</style>
