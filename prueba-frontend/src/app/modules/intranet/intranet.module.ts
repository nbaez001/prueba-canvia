import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { BdjClienteComponent } from './components/bdj-cliente/bdj-cliente.component';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SharedModule } from '../shared.module';
import { SharedIntranetService } from './services/shared-intranet.service';
import { RegClienteComponent } from './components/bdj-cliente/reg-cliente/reg-cliente.component';
import { ModClienteComponent } from './components/bdj-cliente/mod-cliente/mod-cliente.component';
import { ConfirmComponent } from './components/shared/confirm/confirm.component';
import { BdjFacturaComponent } from './components/bdj-factura/bdj-factura.component';
import { RegFacturaComponent } from './components/bdj-factura/reg-factura/reg-factura.component';
import { ModFacturaComponent } from './components/bdj-factura/mod-factura/mod-factura.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { IconModule } from '../icon.module';


@NgModule({
  entryComponents: [
    RegClienteComponent,
    ModClienteComponent,
    RegFacturaComponent,
    ModFacturaComponent,
    ConfirmComponent,
  ],
  declarations: [
    RegClienteComponent,
    ModClienteComponent,
    RegFacturaComponent,
    ModFacturaComponent,
    ConfirmComponent,

    BdjClienteComponent,
    NavbarComponent,
    BdjFacturaComponent,
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    SharedModule,
    MaterialModule,
    IconModule,
  ],
  providers: [
    ...SharedIntranetService,
    DatePipe,
    DecimalPipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es-GB' },//DATEPICKER MUESTRA LA FECHA EN FORMATO DD/MM/YYYY
  ]
})
export class IntranetModule { }
