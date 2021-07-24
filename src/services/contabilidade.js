export default (httpClient) => ({


  getView: (dataInicial, dataFinal, view) => {
    return httpClient.get("api/classificacaocontabil/contabil2/" + `${view}` + `/${dataInicial}` + `/${dataFinal}`);
  },
  ///api/classificacaocontabil/contabil/{view}/{dataInicial}/{dataFinal}

  ///api/classificacaocontabil/xml/xml_fatura_perdida
  getXml: (view) => {
    //return httpClient.get("api/classificacaocontabil/contabil2/" + `${view}`);
    return httpClient.get("api/classificacaocontabil/xml/" + `${view}`);
  },

});
