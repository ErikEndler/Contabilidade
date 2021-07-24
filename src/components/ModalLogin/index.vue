<template>
  <div class="modal-content border-rounded-1">
    <div class="modal-body border-rounded-1">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          type="button"
          class="btn-close btn-close"
          @click="close"
          aria-label="Close"
        ></button>
      </div>
      <form action="" autocomplete="off">
        <div class="login d-grid gap-2 col-6 mx-auto">
          <label class="form-label text-center"> Login </label>
          <input
            autocomplete="username"
            onfocus="this.removeAttribute('readonly');"
            readonly
            name="login"
            id="login"
            v-model="state.login.value"
            class="form-control border-rounded-1 shadow-blue"
            :class="{
              'border-rounded-error shadow-error': !!state.login.errorMessage,
            }"
            type="text"
            placeholder="login"
          />
          <div
            v-if="!!state.login.errorMessage"
            class="alert alert-danger border-rounded-error shadow-error"
            role="alert"
          >
            {{ state.login.errorMessage }}
          </div>
        </div>

        <div class="login d-grid gap-2 col-6 mx-auto">
          <label class="form-label text-center"> Senha </label>
          <input
            name="senha"
            id="senha"
            autocomplete="current-password"
            v-model="state.senha.value"
            class="form-control border-rounded-1 shadow-blue"
            :class="{
              'border-rounded-error shadow-error': !!state.senha.errorMessage,
            }"
            type="password"
            placeholder="****"
          />
          <div
            v-if="!!state.senha.errorMessage"
            class="alert alert-danger border-rounded-error shadow-error"
            role="alert"
          >
            {{ state.senha.errorMessage }}
          </div>
        </div>
      </form>

      <div class="d-grid gap-2 col-6 mx-auto">
        <button
          style="margin-top: 20px"
          :disabled="state.isLoading"
          @click.prevent="handleSubmit"
          class="btn btn-layout"
          :class="{ 'btn  loading': state.isLoading }"
        >
          <span
            v-if="state.isLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          >
          </span>
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive } from "vue";
  import useModal from "../../hooks/useModal";
  import { useField } from "vee-validate";
  import validators from "../../utils/validators";
  import services from "../../services";
  import { useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  import { setCurrentUser } from "../../store/user";
  export default {
    setup() {
      const toast = useToast();
      const router = useRouter();
      const modal = useModal();
      const { value: loginValue, errorMessage: loginErroMessage } = useField(
        "login",
        validators().validateLogin
      );
      const { value: senhaValue, errorMessage: senhaErroMessage } = useField(
        "senha",
        validators().validateSenha
      );
      const state = reactive({
        hasErrors: false,
        isLoading: false,
        login: {
          value: loginValue,
          errorMessage: loginErroMessage
        },
        senha: {
          value: senhaValue,
          errorMessage: senhaErroMessage
        }
      });
      async function handleSubmit() {
        try {
          toast.clear();
          state.isLoading = true;
          const { data, errors } = await services.auth.login({
            login: state.login.value,
            senha: state.senha.value
          });
          if (!errors) {
            window.localStorage.setItem("token", data.token);
            router.push({ name: "Home" });
            state.isLoading = false;
            setCurrentUser({ nome: data.nome });
            modal.close();
            return;
          }
          if (errors.status === 404) {
            toast.error("Login não encontrado");
          }
          if (errors.status === 401) {
            toast.error("Login / Senha invalidos");
          }
          if (errors.status === 400) {
            toast.error("Erro ao tentar fazer login");
          }
          state.isLoading = false;
        } catch (error) {
          console.log(error);
          state.isLoading = false;
          state.hasErrors = !!error;
          toast.error(error.message);
        }
      }
      return { state, close: modal.close, handleSubmit };
    }
  };
</script>

<style scoped>
.login {
  margin-bottom: 10px;
}
.modal-body {
  background-color: lightblue;
}
.form-label {
  margin-bottom: 0;
}
.btn-login {
  margin-top: 20px;
  background-color: #1f8ac0;
  color: #00154f;
}
.modal-content {
  max-width: 500px;
  margin: auto;
}
</style>
