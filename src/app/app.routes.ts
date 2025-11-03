import { Routes } from '@angular/router';
import { VelaForm } from './components/vela/vela-form/vela-form';
import { ClienteForm } from './components/cliente/cliente-form/cliente-form';
import { FornecedorForm } from './components/fornecedor/fornecedor-form/fornecedor-form';
import { VelaList } from './components/vela/vela-list/vela-list';
import { ClienteList } from './components/cliente/cliente-list/cliente-list';
import { FornecedorList } from './components/fornecedor/fornecedor-list/fornecedor-list';
import { IngredienteList } from './components/ingrediente/ingrediente-list/ingrediente-list';
import { IngredienteForm } from './components/ingrediente/ingrediente-form/ingrediente-form';
import { AromaList } from './components/aroma/aroma-list/aroma-list';
import { AromaForm } from './components/aroma/aroma-form/aroma-form';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { PessoaFisicaList } from './components/pessoaFisica/pessoa-fisica-list/pessoa-fisica-list';
import { PessoaFisicaForm } from './components/pessoaFisica/pessoa-fisica-form/pessoa-fisica-form';
import { VelaCardListComponent } from './components/vela/vela-card-list/vela-card-list.component';



export const routes: Routes = [

   {
    path: '',
    component: VelaCardListComponent, // AGORA USA DIRETO O COMPONENTE DE CARDS
    title: 'Luz & Aroma - Velas Artesanais'
  },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    title: 'Area Administrativa',
    children: [

       { 
        path: 'velas', 
        component: VelaList,
        title: 'Lista de Velas'
      },
      {
        path: 'velas/novo',
        component: VelaForm,
        title: 'Cadastro de Vela'
      },
      {
        path: 'velas/editar/:id',
        component: VelaForm,
        title: 'Editar Vela'
      },
      { 
        path: 'clientes', 
        component: ClienteList, 
        title: 'Lista de Clientes' 
      },
      {
        path: 'clientes/novo',
        component: ClienteForm,
        title: 'Cadastro de Cliente'
      },
      {
        path: 'clientes/editar/:id',
        component: ClienteForm,
        title: 'Editar Cliente'
      },
      { 
        path: 'fornecedores',
        component: FornecedorList,
        title: 'Lista de Fornecedores'
      },
      {
        path: 'fornecedores/novo',
        component: FornecedorForm,
        title: 'Cadastro de Fornecedor'
      },
      {
        path: 'fornecedores/editar/:id',
        component: FornecedorForm,
        title: 'Editar Fornecedor'
      },
      { 
        path: 'ingredientes',
        component: IngredienteList,
        title: 'Lista de Ingredientes'
      },
      { 
        path: 'ingredientes/novo',
        component: IngredienteForm,
        title: 'Formulario de Ingredientes' 
      },
      { 
        path: 'ingredientes/editar/:id',
        component: IngredienteForm,
        title: 'Editar Ingrediente'
      },
      { 
        path: 'aromas',
        component: AromaList,
        title: 'Lista de Aromas' 
      },
      { 
        path: 'aromas/novo',
        component: AromaForm,
        title: 'Formulario de Aroma' 
      },

       { 
        path: 'aromas/editar/:id',
        component: AromaForm,
        title: 'Editar Aroma'
      },
      {
        path: 'pessoas-fisicas',
        component: PessoaFisicaList,
        title: 'Lista de Pessoas Fisicas'
      },
      {
        path: 'pessoas-fisicas/novo',
        component: PessoaFisicaForm,
        title: 'Formulário de Pessoas Fisicas'
      }
    ]
  },
  { path: 'app-vela-card-list', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
    ];
  


  


