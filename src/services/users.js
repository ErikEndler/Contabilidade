export default (httpClient) => ({
  getMe: async () => {
    const response = await httpClient.get("/api/usuario/me");
    return { data: response.data };
  },
});
