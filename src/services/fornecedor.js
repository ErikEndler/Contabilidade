export default (httpClient) => ({


    getAll: async () => {
        return httpClient.get("api/fornecedor");
    },

});