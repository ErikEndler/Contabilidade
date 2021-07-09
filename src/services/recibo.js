export default (httpClient) => ({

    getCertificado: async (data) => {
        //  console.log(data)
        return httpClient.get("api/certificado/" + `${data}`);
    },

});