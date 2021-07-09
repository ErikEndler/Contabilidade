<template>
  <div>
    <div class="card col-3 mx-auto border-rounded-1">
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
                    v-model="search"
                    class="form-control border-rounded-1 shadow-blue"
                    type="text"
                    placeholder="Código"
                  />
                </div>
                <div class="col-3">
                  <button
                    class="btn btn-layout"
                    style="min-width: 50px"
                    @click="searchConta(search)"
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
        <h3>Formulário Plano de Contas</h3>
      </div>
      <div class="card-body">
        <Form @submit="onSubmit">
          <div class="row">
            <div class="col-lg col-md-2 col-sm-3">
              <label>Codigo</label>
              <Field
                v-model="data.codigo"
                class="form-control shadow-blue"
                id="codigo"
                name="codigo"
                :rules="validateCampoObrigatorio"
                type="text"
              />
              <ErrorMessage name="codigo" />
            </div>
            <div class="col-lg col-md-2 col-sm-3">
              <label>Mes Ref</label>
              <Field
                v-model="data.mesRef"
                class="form-control shadow-blue"
                id="mesRef"
                name="mesRef"
                :rules="validateCampoObrigatorio"
                type="text"
              />
            </div>
            <div class="col-lg col-md-3 col-sm-4">
              <label>Emissão</label>
              <Field
                v-model="data.emissao"
                class="form-control shadow-blue"
                id="emissao"
                name="emissao"
                :rules="validateCampoObrigatorio"
                type="date"
              />
            </div>
            <div class="col-lg col-md-3 col-sm-4">
              <label>Vencimento</label>
              <Field
                v-model="data.vencimento"
                class="form-control shadow-blue"
                id="vencimento"
                name="vencimento"
                :rules="validateCampoObrigatorio"
                type="date"
              />
            </div>
            <div class="col-lg col-md-3 col-sm-4">
              <label>Pagamento</label>
              <Field
                v-model="data.dataPagamento"
                class="form-control shadow-blue"
                id="dataPagamento"
                name="dataPagamento"
                type="date"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label>Fornecedor</label>
              <Field
                v-model="data.fornecedor.razaosocial"
                class="form-control shadow-blue"
                id="razaosocial"
                name="razaosocial"
                type="text"
              />
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4">
              <label>N° Titulo</label>
              <Field
                v-model="data.numeroTitulo"
                class="form-control shadow-blue"
                id="numeroTitulo"
                name="numeroTitulo"
                type="text"
              />
            </div>
            <div class="col-lg-10 col-md-9 col-sm-8">
              <label>Titulo</label>
              <Field
                v-model="data.titulo.descricao"
                class="form-control shadow-blue"
                id="titulo"
                name="titulo"
                type="text"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Histórico</label>
              <Field
                v-model="data.historico"
                class="form-control shadow-blue"
                id="historico"
                name="historico"
                type="text"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Valor Conta</label>
              <Field
                v-model="data.valor"
                class="form-control shadow-blue"
                id="valor"
                name="valor"
                type="text"
              />
            </div>
            <div class="col">
              <label>Valor Pago</label>
              <Field
                v-model="data.valorPago"
                class="form-control shadow-blue"
                id="valorPago"
                name="valorPago"
                type="text"
              />
            </div>
          </div>
          <!-- ///////////////////////////////////-->

          <div class="card border-rounded-1 mg-15">
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
                  <div class="accordion-body">
                    <div
                      class="row"
                      v-for="item in data.itensContaPagar"
                      :key="item.codigo"
                    >
                      <div class="col-3">
                        <label>Setor</label>
                        <Field
                          v-model="item.setor.descricao"
                          type="text"
                          :id="`item.setor.descricao_${item.codigo}`"
                          :name="`item.setor.descricao_${item.codigo}`"
                          class="form-control shadow-blue"
                          placeholder="Setor"
                        />
                      </div>
                      <div class="col-5">
                        <label>Centro custo</label>
                        <Field
                          v-model="item.contaRateio.descricao"
                          type="text"
                          :id="`item.contaRateio.descricao_${item.codigo}`"
                          :name="`item.contaRateio.descricao_${item.codigo}`"
                          class="form-control shadow-blue"
                          placeholder="centro de custo"
                        />
                      </div>
                      <div class="col-2">
                        <label>Valor Item</label>
                        <Field
                          v-model="item.valor"
                          type="text"
                          :id="`item.valor${item.codigo}`"
                          :name="`item.valor${item.codigo}`"
                          class="form-control shadow-blue"
                          placeholder="R$ 0.000,00"
                        />
                      </div>
                      <div class="col-2 align-self-end">
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Basic mixed styles example"
                        >
                          <button type="button" class="btn-sm btn-danger">
                            Left
                          </button>
                          <button type="button" class="btn-sm btn-warning">
                            Middle
                          </button>
                          <button type="button" class="btn-sm btn-success">
                            Right
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit">Submit</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive, onMounted, toRefs } from "vue";

  import { Field, Form, ErrorMessage, configure } from "vee-validate";
  import validators from "../../utils/validators";
  import services from "../../services";

  export default {
    components: {
      Field,
      Form,
      ErrorMessage
    },
    props: {
      codigo: {
        type: [Number],
        default: null,
        required: false
      }
    },
    setup(props) {
      configure({
        validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
        validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
        validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
        validateOnModelUpdate: true // controls if `update:modelValue` events should trigger validation with `handleChange` handler
      });
      onMounted(() => {
        if (props.codigo) {
          if (props.codigo) {
            getConta(props.codigo);
          }
        }
      });
      function getConta(codigo) {
        services.contaPagar.get({ codigo: codigo }).then(response => {
          console.log("entrou then");
          console.log("data .length - ", Object.keys(response.data).length);
          if (Object.keys(response.data).length > 0) {
            console.log("entrou if");
            console.log(response.data);

            state.data = response.data;
            if (!state.data.fornecedor) {
              const fornecedorPadrao = {
                codigo: "",
                razaosocial: "",
                nomeNomeFantasia: ""
              };
              Object.assign(state.data.fornecedor, fornecedorPadrao);
              //state.data.fornecedor = obj;
              console.log("fornecedor nulo ", state.data.fornecedor);
            }
            console.log(state.data);
          } else {
            printObjet(state.data);
          }
          state.isEdit = true;
        });
      }
      function printObjet(obj) {
        for (const property in obj) {
          //console.log("--", `${property}: ${obj[property]}`);
          if (`${obj[property]}` === "[object Object]") {
            const subObj = obj[property];
            printObjet(subObj);
          } else {
            obj[property] = null;
          }
        }
        console.log(obj);
      }
      function searchConta() {
        getConta(state.search);
      }
      const state = reactive({
        data: {
          caixaCodigo: null,
          codigo: null,
          dataPagamento: null,
          emissao: null,
          filiadoCodigo: null,
          fornecedor: {
            codigo: null,
            razaosocial: null,
            nomeNomeFantasia: null
          },
          fornecedorCodigo: null,
          historico: null,
          itensContaPagar: [
            {
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
            }
          ],
          mesRef: null,
          numeroTitulo: null,
          titulo: { codigo: null, descricao: null, status: null },
          tituloCodigo: null,
          valor: null,
          valorPago: null,
          vencimento: null
        },
        search: null,
        isEdit: false,
        isLoading: false
      });
      function onSubmit(values) {
        console.log(JSON.stringify(state.data, null, 2));
        alert(JSON.stringify(state.data, null, 2));
        console.log("///////////////////////////////////////////////");
        console.log(JSON.stringify(values, null, 2));
        console.log(JSON.stringify(state.data, null, 2));
      }
      function validateCampoObrigatorio(value) {
        console.log("validou - ", value);
        return validators().validateCampoObrigatorio(value);
      }

      return {
        validateCampoObrigatorio,
        onSubmit,
        ...toRefs(state),
        searchConta
      };
    }
  };
</script>

<style>
</style>