export default (httpClient) => ({


    getProblems: (dataInicial, dataFinal) => {
        return httpClient.get("api/contapagar/problemas/" + `${dataInicial}` + `/${dataFinal}`);
    },
    get: async ({ codigo }) => {
        return httpClient.get("api/contapagar/" + `${codigo}`);
    },
    put: async (contaPagar) => {
        console.log(contaPagar)
        return httpClient.post('/api/contapagar', contaPagar);
    },
});