export default (httpClient) => ({
  getAllByCodigo: async ({ codigo }) => {
    return httpClient.get("api/itemcontapagar/conta/" + `${codigo}`);
  },
  get: async ({ codigo }) => {
    return httpClient.get("api/itemcontapagar/" + `${codigo}`);
  },
  put: async (itemConta) => {
    console.log(itemConta)
    return httpClient.put('/api/itemcontapagar', itemConta);
  },
  post: async (itemConta) => {
    console.log(itemConta)
    return httpClient.post('/api/itemcontapagar', itemConta);
  },
  delete: async (codigo) => {
    console.log('codigo:', codigo)
    return httpClient.delete('/api/itemcontapagar/' + `${codigo}`);
  },
});
