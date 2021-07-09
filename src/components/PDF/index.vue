<template>
  <div class="modal-content border-rounded-1">
    <div class="modal-body">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          type="button"
          class="btn-close btn-close"
          @click="close"
          aria-label="Close"
        ></button>
      </div>
      <div class="Apdf" ref="facture" id="facture">
        <div class="pdf border-rounded-1">
          <div class="row" style="margin-top: 0">
            <div class="col-4">
              <img
                class="img-logo"
                src="../../assets/images/logocdl.png"
                alt="Money"
              />
            </div>
            <div class="col">
              <b style="font-size: 0.9rem">Recibo N° {{ caixaCodigo }}</b>
            </div>
          </div>
          <div class="row text-center" style="margin-top: 5px">
            <div class="col">
              <b style="font-size: 0.7rem"> R$ {{ valorAtt }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>Recebemos de {{ razaoSocial }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>CNPJ / CPF : {{ cnpj }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>a quantia de R$ {{ valorAtt }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>proveniente de {{ servico }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-5">
              <b>Anápolis, {{ currentDateTime(date) }}</b>
            </div>
            <div class="col">_____________________________________</div>
          </div>
          <div class="row" style="margin-top: 15px">
            <div class="col text-center">
              Câmara de Dirigente Lojistas de Anápolis - 01.064.674/0001-12
              <br />
              Endereço: R. Conde Afonso Celso, 25 - St. Central<br />
              Email:faturas@cdlanapolis.com.br - https://cdlanapolis.com.br/
            </div>
          </div>

          <!-- HTML contnet goes here -->
        </div>
        <div class="pdf border-rounded-1">
          <div class="row" style="margin-top: 0">
            <div class="col-4">
              <img
                class="img-logo"
                src="../../assets/images/logocdl.png"
                alt="Money"
              />
            </div>
            <div class="col">
              <b style="font-size: 0.9rem">Recibo N° {{ caixaCodigo }}</b>
            </div>
          </div>
          <div class="row text-center" style="margin-top: 5px">
            <div class="col">
              <b style="font-size: 0.7rem"> R$ {{ valorAtt }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>Recebemos de {{ razaoSocial }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>CNPJ / CPF : {{ cnpj }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>a quantia de R$ {{ valorAtt }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>proveniente de {{ servico }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-5">
              <b>Anápolis, {{ currentDateTime(date) }}</b>
            </div>
            <div class="col">_____________________________________</div>
          </div>
          <div class="row" style="margin-top: 15px">
            <div class="col text-center">
              Câmara de Dirigente Lojistas de Anápolis - 01.064.674/0001-12
              <br />
              Endereço: R. Conde Afonso Celso, 25 - St. Central<br />
              Email:faturas@cdlanapolis.com.br - https://cdlanapolis.com.br/
            </div>
          </div>

          <!-- HTML contnet goes here -->
        </div>
      </div>

      <button @click="createPDF2(caixaCodigo)">Baixar PDF</button>
    </div>
  </div>
</template>

<script>
  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";
  import moment from "moment";
  import { reactive, computed } from "vue";
  import useModal from "../../hooks/useModal";

  //import { ref } from "vue";

  export default {
    props: {
      valor: {
        type: String,
        default: "100"
      },
      razaoSocial: {
        type: String,
        default:
          "'razao social razao social razao social razao social razao social'"
      },
      cnpj: {
        type: String,
        default: "00.000.000/0001-01"
      },
      servico: {
        type: String,
        default: "Recibo Teste"
      },
      date: {
        type: String,
        default: "2021-06-03"
      },
      caixaCodigo: { type: Number, required: true }
    },

    setup(props) {
      const modal = useModal();
      const state = reactive({ valor: props.value });
      //console.log("----", state.valor.replace(".", ","));
      const valorAtt = computed(() => {
        return replaceMoney(props.valor);
      });
      function replaceMoney(valor) {
        const variavel = typeof valor;
        if (variavel === "number") {
          valor = valor.toString();
        }
        if (valor.indexOf(".") > -1) {
          valor = valor.replace(".", ",");
          console.log(valor);
        } else {
          valor = valor + ",00";
        }
        return valor;
      }
      function currentDateTime(data) {
        return moment(data).format("DD / MM / YYYY");
      }

      return { currentDateTime, state, valorAtt, close: modal.close };
    },

    methods: {
      createPDF() {
        var pdf = new jsPDF();
        var element = document.getElementById("facture");
        var width = element.style.width;
        var height = element.style.height;
        html2canvas(element).then(canvas => {
          var image = canvas.toDataURL("image/png", 1);
          pdf.addImage(image, "JPEG", 10, 5, width, height);
          pdf.addImage(image, "JPEG", 10, 150, width, height);
          pdf.save("facture");
          pdf.addPage;
        });
      },
      createPDF2(caixaCodigo) {
        window.html2canvas = html2canvas;
        var doc = new jsPDF("p", "px", "a4");
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        console.log("width-", width);
        console.log("height-", height);
        var element = document.getElementById("facture");

        doc.html(element, {
          callback: function(pdf) {
            pdf.save("Recibo " + caixaCodigo);
          }
        });
        useModal().close();
      }
    }
  };
</script>

<style scoped>
.row {
  color: black;
  margin-top: 16px;
}
.pdf {
  font-size: 0.5rem;
  /* topo | direita | inferior | esquerda */
  margin: 30px 20px 20px 30px;
  width: 380px;
  height: 270px;
  padding: 10px;
}
.img-logo {
  max-width: 60px;
  max-height: 75px;
  width: auto;
  height: auto;
}
.card {
  margin: 10px;
}

input {
  border: none !important;
  border-width: none !important;
  border-style: none !important;
  font-weight: bold;
}
input:disabled {
  color: black;
}
.modal-content {
  max-width: 550px;
  margin: auto;
}
</style>
