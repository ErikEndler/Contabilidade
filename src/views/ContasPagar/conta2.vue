<template>
  <div class="row">
    <div class="col-auto">
      <button @click="$router.go(-1)" class="btn btn-outline btn-cancel">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Voltar
      </button>
    </div>
    <div
      class="col-3 mx-auto border-rounded-1"
      style="padding-right: 0px; padding-left: 0px"
    >
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Pesquisar Conta
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <div class="row">
                <div class="col-9">
                  <input
                    v-model="state.search"
                    class="form-control border-rounded-1 shadow-blue"
                    type="text"
                    placeholder="Código"
                  />
                </div>
                <div class="col-3">
                  <button
                    class="btn btn-layout"
                    style="min-width: 50px"
                    @click="searchConta(state.search)"
                  >
                    <font-awesome-icon :icon="['fas', 'search']" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mg-top-10 container">
    <div class="border-rounded-1 shadow-blue card">
      <div class="card-header">
        <h3>Contas a Pagar</h3>
      </div>
      <div class="card-body">
        <Form
          @submit="onSubmit"
          id="myform"
          class="form-custom"
          :validation-schema="schema"
          autocomplete="off"
        >
          <div class="row">
            <div class="col-lg col-md-2 col-sm-4">
              <TextInput
                :readonly="true"
                v-model:value="state.conta.codigo"
                :reset="state.resetForm"
                mask="###*"
                name="codigo"
                type="text"
                label="Código"
                placeholder=""
              />
            </div>
            <div class="col-lg col-md-2 col-sm-4">
              <TextInput
                v-model:value="state.conta.mesRef"
                :reset="state.resetForm"
                name="mesRef"
                type="text"
                label="mesRef"
                placeholder="--/--"
                mask="##/##"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-auto col-md-3 col-sm-4">
              <TextInput
                v-model:value="state.conta.emissao"
                :reset="state.resetForm"
                name="emissao"
                type="date"
                label="Emissão"
                placeholder=""
              />
            </div>
            <div class="col-lg col-md-3 col-sm-4">
              <TextInput
                v-model:value="state.conta.vencimento"
                :reset="state.resetForm"
                name="vencimento"
                type="date"
                label="Vencimento"
                placeholder=""
              />
            </div>
            <div class="col-lg col-md-3 col-sm-4">
              <TextInput
                v-model:value="state.conta.dataPagamento"
                :reset="state.resetForm"
                name="dataPagamento"
                type="date"
                label="Pagamento"
                placeholder=""
              />
            </div>
          </div>
          <div class="row">
            <div class="col-auto align-self-center cursor-pointer">
              <button
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Editar Fornecedor"
                @click.prevent="navigateFornecedor()"
                class="btn-sm btn-cancel"
              >
                <font-awesome-icon
                  :icon="['fas', 'external-link-square-alt']"
                  size="lg"
                />
              </button>
            </div>
            <div class="col-11">
              <TextInput
                v-model:value="state.conta.fornecedor.razaoSocial"
                :reset="state.resetForm"
                name="fornecedor"
                type="text"
                label="Fornecedor"
                placeholder=""
                readonly
                @click="modalFornecedor"
                cursor="cursor-pointer"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-4">
              <TextInput
                v-model:value="state.conta.numeroTitulo"
                :reset="state.resetForm"
                name="numeroTitulo"
                type="text"
                label="N° Titulo"
                placeholder=""
              />
            </div>
            <div class="col-lg-9 col-md-9 col-sm-8">
              <label>Titulo</label>
              <input
                style="cursor: pointer"
                class="form-control border-rounded-1 shadow-blue"
                type="text"
                v-model="state.conta.titulo.descricao"
                @click="modalTitulo"
                readonly
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <TextInput
                v-model:value="state.conta.historico"
                :reset="state.resetForm"
                name="historico"
                type="text"
                label="Histórico"
                placeholder=""
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <CurrencyInput
                v-model:modelValue="state.conta.valor"
                name="valor"
                label="Valor Conta"
                :reset="state.resetForm"
                :options="{
                  currency: 'BRL',
                  distractionFree: false,
                  precision: 2,
                }"
              />
            </div>
            <div class="col">
              <CurrencyInput
                v-model:modelValue="state.conta.valorPago"
                :reset="state.resetForm"
                name="valorPago"
                label="Valor Pago"
                :options="{
                  currency: 'BRL',
                  distractionFree: false,
                  precision: 2,
                }"
                placeholder=""
              />
            </div>
          </div>
        </Form>
        <div class="card border-rounded-1">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  itens Conta a Pagar
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div
                  class="accordion-body"
                  style="max-height: 250px; overflow: auto"
                >
                  <div v-if="state.conta.itensContaPagar">
                    <div
                      class="row"
                      v-for="(item, index) in state.conta.itensContaPagar"
                      :key="index"
                    >
                      <ItemConta
                        @remove-item="removeItemConta"
                        :itemConta="item"
                        :contaCodigo="item.contaPagarCodigo"
                        :index="index"
                      ></ItemConta>
                    </div>
                  </div>
                </div>
                <div class="accordion-footer">
                  <div>
                    <button
                      style="cursor: pointer; margin: 5px"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Adicionar Item"
                      @click="addItemConta"
                      class="btn btn-sm btn-layout"
                    >
                      <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
</template>

<script>
  import { reactive, onMounted, toRaw } from "vue";
  import { Form } from "vee-validate";
  import TextInput from "../../components/Inputs/TextInput";
  import CurrencyInput from "../../components/Inputs/CurrencyInput";
  import validators from "../../utils/validators";
  import services from "../../services";
  import useModal from "../../hooks/useModal";
  import { useToast } from "vue-toastification";
  import ItemConta from "./itemConta.vue";
  import moment from "moment";
  import { useRouter } from "vue-router";

  export default {
    components: {
      TextInput,
      Form,
      ItemConta,
      CurrencyInput
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
      const router = useRouter();

      onMounted(() => {
        if (props.codigo) {
          if (props.codigo) {
            getConta(props.codigo);
          }
        }
      });
      function onSubmit(values) {
        callModalConfirm();
        console.log("values: ", values);
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
          const objEnvio = Object.assign({}, toRaw(state.conta));
          delete objEnvio.itensContaPagar;
          delete objEnvio.titulo;
          delete objEnvio.fornecedor;
          // console.log(JSON.stringify(objEnvio, null, 2));
          console.log("objEnvio - ", objEnvio);
          console.log(JSON.stringify(objEnvio));
          toast.clear();
          state.isLoading = true;
          let req = null;
          if (state.conta.codigo) {
            req = services.contaPagar.put(objEnvio);
          } else {
            req = services.contaPagar.post(objEnvio);
          }
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
      function convertDateTime(data) {
        if (data) return moment(data).format("YYYY-MM-DD");
        else return null;
      }
      const schema = {
        emissao: validators().validateCampoObrigatorio,
        vencimento: validators().validateCampoObrigatorio
      };
      const state = reactive({
        fornecedor: null,
        search: null,
        resetForm: false,
        hasErrors: false,
        isLoading: false,
        isEdit: false,
        conta: {
          caixaCodigo: null,
          codigo: null,
          dataPagamento: null,
          emissao: null,
          filiadoCodigo: null,
          fornecedor: {
            codigo: null,
            razaoSocial: null,
            nomeNomeFantasia: null
          },
          fornecedorCodigo: null,
          historico: null,
          itensContaPagar: [],
          mesRef: null,
          numeroTitulo: null,
          titulo: { codigo: null, descricao: null, status: null },
          tituloCodigo: null,
          valor: null,
          valorPago: null,
          vencimento: null
        }
      });
      const itensPadrao = {
        centroCustoCodigo: null,
        codigo: null,
        contaPagarCodigo: null,
        contaRateio: {
          codigo: null,
          descricao: null,
          contaContabilDebito: null,
          contaContabilCredito: null,
          descricaoFormaRateio: null
        },
        setor: { codigo: null, descricao: null },
        setorCodigo: null,
        valor: null
      };
      const fornecedorPadrao = {
        codigo: null,
        razaoSocial: null,
        nomeNomeFantasia: null
      };
      function modalTitulo() {
        modal.open({
          component: "ModalTitulo",
          props: {}
        });
        modal.listen(changeTitulo);
      }
      function changeTitulo(payload) {
        if (payload.titulo) {
          state.conta.titulo = payload.titulo;
          state.conta.tituloCodigo = payload.titulo.codigo;
        }
        modal.off(changeTitulo);
      }
      function modalFornecedor() {
        modal.open({
          component: "ModalFornecedor",
          props: {}
        });
        modal.listen(changeFornecedor);
      }
      function changeFornecedor(payload) {
        if (payload.fornecedor) {
          state.conta.fornecedor = payload.fornecedor;
          state.conta.fornecedorCodigo = payload.fornecedor.codigo;
        }
        modal.off(changeFornecedor);
      }
      function filterFunction(event) {
        services.fornecedor
          .getAll(event.target.value)
          .then(
            response => (
              (state.fornecedor = response.data), console.log(state.fornecedor)
            )
          );
      }

      function getConta(codigo) {
        //resetObjet(state.conta);
        services.contaPagar.get({ codigo: codigo }).then(response => {
          if (Object.keys(response.data).length > 0) {
            state.conta = response.data;
            if (!state.conta.titulo) {
              state.conta.titulo = {};
              const tituloPadrao = {
                codigo: null,
                descricao: null,
                status: null
              };
              Object.assign(state.conta.titulo, tituloPadrao);
            }
            if (!state.conta.itensContaPagar) {
              console.log("----------------");
              addItemConta();
            }
            if (!state.conta.fornecedor) {
              state.conta.fornecedor = {};
              Object.assign(state.conta.fornecedor, fornecedorPadrao);
            }
            console.log(state.conta);
          } else {
            resetObjet(state.conta);
          }
          state.isEdit = true;
        });
      }
      function addItemConta() {
        //var copy = Object.assign({}, obj);
        const item = Object.assign({}, itensPadrao);
        console.log("item-", item);
        item.contaPagarCodigo = toRaw(state.conta.codigo);
        state.conta.itensContaPagar.push(item);
        console.log("itens - ", toRaw(state.conta.itensContaPagar));
      }
      function removeItemConta(codigo) {
        if (codigo) {
          state.conta.itensContaPagar = state.conta.itensContaPagar.filter(
            value => {
              return value.codigo != codigo;
            }
          );
          console.log("entrou remove itwm");
          services.itemConta
            .delete(codigo)
            .then(() => {
              console.log("then deu certo");
              state.isLoading = false;
              toast.success("Item Deletado com sucesso", {
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
      }
      function searchConta() {
        getConta(state.search);
      }
      function formReset() {
        state.resetForm = true;
        resetObjet(state.conta);
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
      function navigateFornecedor() {
        if (state.conta.fornecedorCodigo) {
          let codigo = toRaw(state.conta.fornecedorCodigo);
          router.push({ name: "FornecedorEdit", params: { codigo } });
        }
      }

      return {
        formReset,
        state,
        onSubmit,
        schema,
        searchConta,
        filterFunction,
        convertDateTime,
        modalTitulo,
        modalFornecedor,
        addItemConta,
        removeItemConta,
        navigateFornecedor
      };
    }
  };
</script>
<style scoped>
* {
  box-sizing: border-box;
}
:root {
  --primary-color: #0071fe;
  --error-color: #f23648;
  --error-bg-color: #fddfe2;
  --success-color: #21a67a;
  --success-bg-color: #e0eee4;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  width: 100%;
  height: 100%;
}
form {
  width: 300px;
  margin: 0px auto;
  padding-bottom: 20px;
}
.submit-btn {
  background: var(--primary-color);
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 10px 15px;
  display: block;
  width: 100%;
  border-radius: 7px;
  margin-top: 40px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}
.submit-btn:hover {
  transform: scale(1.1);
}
.row {
  margin-top: -10px;
}
</style>
