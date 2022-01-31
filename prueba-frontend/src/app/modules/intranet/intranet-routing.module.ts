import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BdjClienteComponent } from './components/bdj-cliente/bdj-cliente.component';
import { BdjFacturaComponent } from './components/bdj-factura/bdj-factura.component';


const intranetRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'cliente',
        pathMatch: 'full'
      }, {
        path: 'cliente',
        component: BdjClienteComponent,
        data: { title: 'Cliente' }
      }, {
        path: 'factura',
        component: BdjFacturaComponent,
        data: { title: 'Factura' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(intranetRoutes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
