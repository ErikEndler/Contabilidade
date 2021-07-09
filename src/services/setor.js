export default (httpClient) => ({

  get: async (codigo) => {
    //  console.log(data)
    return httpClient.get("api/setor/" + `${codigo}`);
  },
  getAll: async () => {
    return httpClient.get("api/setor");
  },

});
