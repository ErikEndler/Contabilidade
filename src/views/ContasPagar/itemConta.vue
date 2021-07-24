<template>
  <Form
    :id="'itemform' + index"
    class="form-custom"
    :validation-schema="schema"
    autocomplete="off"
  >
    <div class="row">
      <div class="col-3">
        <TextInput
          v-model:value="state.itemConta.setor.descricao"
          :reset="state.resetForm"
          cursor="cursor-pointer"
          name="setorDescricao"
          type="text"
          label="Setor"
          placeholder=""
          readonly
          @click="modalSetor"
        />
      </div>
      <div class="col-6">
        <TextInput
          v-model:value="state.itemConta.contaRateio.descricao"
          :reset="state.resetForm"
          cursor="cursor-pointer"
          name="contaRateioDescricao"
          type="text"
          label="Centro de Custo"
          placeholder=""
          readonly
          @click="modalContaRateio"
        />
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
      <div class="col-1 align-self-center">
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Salvar / Editar"
            @click.prevent="callModalConfirm()"
            class="btn-sm btn-success"
          >
            <font-awesome-icon :icon="['fas', 'save']" size="lg" />
          </button>
          <button
            @click.prevent="() => callModalConfirm('delete')"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Deletar / Excluir"
            type="button"
            class="btn-sm btn-danger"
          >
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
  import TextInput from "../../components/Inputs/TextInput";

  export default {
    components: {
      CurrencyInput,
      TextInput,
      Form
    },
    props: {
      itemConta: { type: Object, required: true },
      index: { type: Number },
      contaCodigo: { type: Number }
    },
    setup(props, { emit }) {
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
        delete: "Confirmar Exclusão permanente de Item de Conta a Pagar"
      };

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
          state.itemConta.setorCodigo = payload.setor.codigo;
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
          state.itemConta.centroCustoCodigo = payload.contaRateio.codigo;
        }
        modal.off(changeContaRateio);
      }

      function callModalConfirm(mensagem) {
        if (!mensagem) {
          if (state.itemConta.codigo) {
            mensagem = msg.edit;
          } else {
            mensagem = msg.save;
          }
        } else if (mensagem === "delete") {
          mensagem = msg.delete;
        }
        modal.open({
          component: "ModalConfirme",
          props: { msg: mensagem }
        });
        if (mensagem === msg.delete) {
          modal.listen(remove);
        } else {
          modal.listen(sendSubmit);
        }
      }
      function sendSubmit(payload) {
        toast.clear();

        if (payload.answer) {
          if (props.contaCodigo) {
            state.isLoading = true;
            let req = null;
            if (state.itemConta.codigo) {
              req = services.itemConta.put(toRaw(state.itemConta));
            } else {
              req = services.itemConta.post(toRaw(state.itemConta));
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
          } else {
            toast.warning("Sem conta a pagar vinculado", { timeout: false });
          }
        }
        modal.off(sendSubmit);
      }
      function remove(payload) {
        console.log("entrou no remove");
        if (payload.answer) {
          emit("remove-item", toRaw(state.itemConta.codigo));
        }
        modal.off(remove);
      }
      return {
        callModalConfirm,
        state,
        schema,
        modalSetor,
        modalContaRateio,
        emit,
        remove
      };
    }
  };
</script>

<style scoped>
.form-custom {
  padding-bottom: 5px !important;
}
</style>
