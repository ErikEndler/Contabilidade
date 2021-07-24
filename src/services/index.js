import axios from "axios";
import AuthService from "./auth";
import UsersService from "./users";
import PlanoService from "./planoContas";
import ContaRateio from "./contaRateio";
import ContaPagar from "./contaPagar";
import Fornecedor from "./fornecedor";
import Setor from "./setor";
import Recibo from "./recibo";
import Titulo from "./Titulo";
import ItemConta from "./itemConta";
import Contabilidade from "./contabilidade";
import router from "../router";
import { setGlobaloading } from "../store/global";
import { clearCurrentUser } from "../store/user";


const API_ENVS = {
  production: "",
  development: "",
  //local: "https://localhost:44303",
  local: "http://192.168.1.93:5001",
};

const httpClient = axios.create({
  baseURL: API_ENVS.local,
});

httpClient.interceptors.request.use((config) => {
  setGlobaloading(true);
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    //console.log(response)
    setGlobaloading(false);
    return response;
  },
  (error) => {
    if (!error.response) {
      setGlobaloading(false);
      throw new Error("Problema de conexão");
    } else {
      const canThrowAnError = (error.request.status ===
        0 || error.request.status === 500);
      if (canThrowAnError) {
        setGlobaloading(false);
        throw new Error(error.message);
      }
      if (error.response.status === 401) {
        clearCurrentUser();
        window.localStorage.removeItem("token");
        router.push({ name: "Home" });
      }
    }
    setGlobaloading(false);
    return Promise.reject(error);
  }
);

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  planoContas: PlanoService(httpClient),
  contaRateio: ContaRateio(httpClient),
  contaPagar: ContaPagar(httpClient),
  recibo: Recibo(httpClient),
  titulo: Titulo(httpClient),
  itemConta: ItemConta(httpClient),
  setor: Setor(httpClient),
  contabilidade: Contabilidade(httpClient),
  fornecedor: Fornecedor(httpClient)
};
