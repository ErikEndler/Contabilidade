export default (httpClient) => ({
  getAllByCodigo: async ({ codigo }) => {
    return httpClient.get("api/itemcontapagar/conta/" + `${codigo}`);
  },
  get: async ({ codigo }) => {
    return httpClient.get("api/itemcontapagar/" + `${codigo}`);
  },
  put: async (iemConta) => {
    return httpClient.post('/api/itemcontapagar', iemConta);
  },
  post: async (iemConta) => {
    return httpClient.post('/api/itemcontapagar', iemConta);
  },
});
