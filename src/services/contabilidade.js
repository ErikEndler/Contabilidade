export default (httpClient) => ({


  getView: (dataInicial, dataFinal, view) => {
    return httpClient.get("api/classificacaocontabil/contabil/" + `${view}` + `/${dataInicial}` + `/${dataFinal}`);
  },

  getXml: (view) => {
    return httpClient.get("api/classificacaocontabil/xml/" + `${view}`);
  },
  getViews: () => {
    return httpClient.get("api/classificacaocontabil/views");
  },
  getXMLPerson(view, dataI, dataF) {
    return httpClient.get("api/classificacaocontabil/xml/" + `${view}` + `/${dataI}` + `/${dataF}`);
  }
});
