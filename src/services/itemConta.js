export default (httpClient) => ({
  getAllByCodigo: async ({ codigo }) => {
    return httpClient.get("api/itemcontapagar/conta/" + `${codigo}`);
  },
  get: async ({ codigo }) => {
    return httpClient.get("api/itemcontapagar/" + `${codigo}`);
  },
  put: async (iemConta) => {
    console.log(iemConta)
    return httpClient.put('/api/itemcontapagar', iemConta);
  },
  post: async (iemConta) => {
    console.log(iemConta)
    return httpClient.post('/api/itemcontapagar', iemConta);
  },
});
