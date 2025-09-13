import { Routes } from '@angular/router';
import { VelaForm } from './components/vela/vela-form/vela-form';
import { ClienteForm } from './components/cliente/cliente-form/cliente-form';
import { FornecedorForm } from './components/fornecedor/fornecedor-form/fornecedor-form';
import { VelaList } from './components/vela/vela-list/vela-list';
import { ClienteList } from './components/cliente/cliente-list/cliente-list';
import { FornecedorList } from './components/fornecedor/fornecedor-list/fornecedor-list';

export const routes: Routes = [
{ 
    path: 'velas', 
    component: VelaList,
    title: 'Lista de Velas'
},

{
    path: 'velas/new',
    component: VelaForm,
    title: 'Cadastro de Vela'
  },

  { 
    path: 'clientes', 
    component: ClienteList, 
    title: 'Lista de Clientes' },
  {
    path: 'clientes/new',
    component: ClienteForm,
    title: 'Cadastro de Cliente'
  },
  { 
    path: 'fornecedores',
    component: FornecedorList,
    title: 'Lista de Fornecedores'
  },
  {
    path: 'fornecedores/new',
    component: FornecedorForm,
    title: 'Cadastro de Fornecedor'
  }
];
