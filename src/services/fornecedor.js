export default (httpClient) => ({
  getAll: async () => {
    return httpClient.get("api/fornecedor");
  },
  get: async (codigo) => {
    console.log(codigo)
    return httpClient.get("api/fornecedor/" + `${codigo}`);
  },
  put: async (fornecedor) => {
    console.log(fornecedor)
    return httpClient.put('/api/fornecedor', fornecedor);
  }

});
