

export default function validators() {
    function validateLogin(value) {
        if (!value) {
            return '*Campo é Obrigatório'
        }
        if (value.length < 4) {
            return '*Mminimo 4 caracteres'
        }
        return true
    }
    function validateSenha(value) {
        if (!value) {
            return '*Campo é Obrigatório'
        }
        if (value.length < 4) {
            return '*Mminimo 4 caracteres'
        }
        return true
    }
    function validateEmail(value) {
        if (!value) {
            return '*Este campo é obrigatório !'
        }
        const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)
        if (!isValid) {
            return '*Este campo precisaa ser um email !'
        }
        return true
    }
    function validateCampoObrigatorio(value) {
        if (!value) {
            return '*Campo é Obrigatório'
        }
        return true
    }

    return { validateSenha, validateLogin, validateEmail, validateCampoObrigatorio }

}
