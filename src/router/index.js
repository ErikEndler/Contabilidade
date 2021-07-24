import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home/index.vue')
const PlanoDeContas = () => import('../views/PlanoDeContas/index.vue')
const PlanoDeContasList = () => import('../views/PlanoDeContas/listPlano.vue')
const PlanoDeContasForm = () => import('../views/PlanoDeContas/form.vue')
const PlanoDeContasForm2 = () => import('../views/PlanoDeContas/form2.vue')
const ContaRateioForm = () => import('../views/PlanoDeContas/formContaRateio.vue')
const ContaRateioList = () => import('../views/PlanoDeContas/listContaRateio.vue')
const Contas = () => import('../views/ContasPagar/index.vue')
const ContaView = () => import('../views/ContasPagar/conta.vue')
const ContaView2 = () => import('../views/ContasPagar/conta2.vue')
const ContaProblems = () => import('../views/ContasPagar/listProblems.vue')
const Recibos = () => import('../views/Recibos/index.vue')
const ContabilidadeViews = () => import('../views/Contabilidade/index.vue')
//const table = () => import('../views/Home/table.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recibos',
    name: 'Recibos',
    component: Recibos
  },
  {
    path: '/contabilidade/classificacoes',
    name: 'ClassificacaoContabil',
    component: ContabilidadeViews
  },
  {
    path: '/contas',
    name: 'Contas',
    component: Contas,
    meta: { hasAuth: true }
  },
  {
    path: '/contas/view',
    name: 'ContaView',
    component: ContaView,
    meta: { hasAuth: true }
  },
  {
    path: '/contas/view2',
    name: 'ContaView2',
    component: ContaView2,
    meta: { hasAuth: true }
  },
  {
    path: '/contas/view/:codigo',
    name: 'ContaViewEdit',
    component: ContaView,
    meta: { hasAuth: true },
    props: true
  },
  {
    path: '/contas/problemas',
    name: 'ContaProblemas',
    component: ContaProblems,
    meta: { hasAuth: true }
  },
  {
    path: '/contabilidade',
    name: 'Contabilidade',
    component: PlanoDeContas,
    meta: { hasAuth: true }
  },
  {
    path: '/planodecontas/list',
    name: 'PlanoDeContasList',
    component: PlanoDeContasList,
    meta: { hasAuth: true }
  },
  {
    path: '/planodecontas/form',
    name: 'PlanoDeContasForm',
    component: PlanoDeContasForm,
    meta: { hasAuth: true }
  },
  {
    path: '/planodecontas/form2',
    name: 'PlanoDeContasForm2',
    component: PlanoDeContasForm2,
    meta: { hasAuth: true }
  },
  {
    path: '/planodecontas/form2/:referencia',
    name: 'PlanoDeContasFormEdit2',
    component: PlanoDeContasForm2,
    meta: { hasAuth: true },
    props: true
  },
  {
    path: '/planodecontas/form/:referencia',
    name: 'PlanoDeContasFormEdit',
    component: PlanoDeContasForm,
    meta: { hasAuth: true },
    props: true
  },
  {
    path: '/planodecontas/contarateio/form',
    name: 'ContaRateioForm',
    component: ContaRateioForm,
    meta: { hasAuth: true }
  },
  {
    path: '/planodecontas/contarateio/form/:codigo',
    name: 'ContaRateioFormEdit',
    component: ContaRateioForm,
    meta: { hasAuth: true }, props: true
  },
  {
    path: '/planodecontas/contarateio/list',
    name: 'ContaRateioList',
    component: ContaRateioList,
    meta: { hasAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]
const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
