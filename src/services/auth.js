export default httpClient => ({
    login: async ({ login, senha }) => {
        const response = await httpClient.post('/api/usuario/login', { login, senha })
        let errors = null
        if (!response.data) {
            errors = {
                status: response.request.status,
                statusText: response.request.statusText
            }
        }
        return { data: response.data, errors }
    }
})