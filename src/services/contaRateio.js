export default (httpClient) => ({
    post: async ({ contaRateio }) => {
        console.log('---', contaRateio)
        return httpClient.post('/api/contarateio', contaRateio);
    },

    getAll: async () => {
        const response = await httpClient.get("api/contarateio");
        return { data: response.data, errors: null };
    },
    get: async ({ codigo }) => {
        return httpClient.get("api/contarateio/" + `${codigo}`);
    }
});
