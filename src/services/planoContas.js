export default (httpClient) => ({
  getAll: async () => {
    return httpClient.get("api/planodecontas");
  },
  get: async ({ referencia }) => {
    return httpClient.get("api/planodecontas/" + `${referencia}`);

  },
  post: async (planoDeConta) => {
    console.log(planoDeConta)
    return httpClient.post('/api/planodecontas', planoDeConta);
  }
});
