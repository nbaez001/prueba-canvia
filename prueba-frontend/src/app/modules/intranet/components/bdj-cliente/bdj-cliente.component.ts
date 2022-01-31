import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ACTIVO_LISTA, CONSTANTES, MENSAJES, MENSAJES_PANEL } from 'src/app/common';
import { FormService } from 'src/app/core/services/form.service';
import { ClienteBuscar } from '../../dto/request/cliente-buscar';
import { Cliente } from '../../dto/response/cliente';
import { OutResponse } from '../../dto/response/out.response';
import { ClienteService } from '../../services/cliente.service';
import { MaestraService } from '../../services/maestra.service';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { ModClienteComponent } from './mod-cliente/mod-cliente.component';
import { RegClienteComponent } from './reg-cliente/reg-cliente.component';

@Component({
  selector: 'app-bdj-cliente',
  templateUrl: './bdj-cliente.component.html',
  styleUrls: ['./bdj-cliente.component.scss']
})
export class BdjClienteComponent implements OnInit {
  exportar = false;

  activoLista: any;
  listaCliente: Cliente[] = [];

  displayedColumns: string[];
  dataSource: MatTableDataSource<Cliente>;
  isLoading: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  pageEvent: PageEvent;

  columnsGrilla = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: Cliente) => (m.nombre != null) ? `${m.nombre}` : ''
    }, {
      columnDef: 'apellidoPat',
      header: 'Apellido paterno',
      cell: (m: Cliente) => (m.apellidoPat != null) ? `${m.apellidoPat}` : ''
    }, {
      columnDef: 'apellidoMat',
      header: 'Apellido materno',
      cell: (m: Cliente) => (m.apellidoMat != null) ? `${m.apellidoMat}` : ''
    }, {
      columnDef: 'descTipoDocumento',
      header: 'Tipo documento',
      cell: (m: Cliente) => (m.descTipoDocumento != null) ? `${m.descTipoDocumento}` : ''
    }, {
      columnDef: 'nroDocumento',
      header: 'Nro documento',
      cell: (m: Cliente) => (m.nroDocumento != null) ? `${m.nroDocumento}` : ''
    }, {
      columnDef: 'flgActivo',
      header: 'Estado',
      cell: (m: Cliente) => this.activoLista.filter(el => (el.id == m.flgActivo))[0].nombre
    }];

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(FormService) private formService: FormService,
    @Inject(ClienteService) private clienteService: ClienteService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.pageEvent = new PageEvent()
    this.pageEvent.length = 0;
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;

    this.formularioGrp = this.fb.group({
      nombre: ['', [Validators.maxLength(250)]],
      flgActivo: ['', [Validators.required]]
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.inicializarVariables();
  }

  inicializarVariables(): void {
    this.definirTabla();

    this.activoLista = JSON.parse(JSON.stringify(ACTIVO_LISTA));
    this.activoLista.unshift({ id: null, nombre: 'TODOS' });
    this.formularioGrp.get('flgActivo').setValue(this.activoLista[1]);
    this.buscar(null);
  }

  definirTabla(): void {
    this.displayedColumns = [];
    this.columnsGrilla.forEach(c => {
      this.displayedColumns.push(c.columnDef);
    });
    this.displayedColumns.unshift('id');
    this.displayedColumns.push('opt');
  }

  public cargarDatosTabla(): void {
    if (this.listaCliente.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaCliente);
    } else {
      this.dataSource = new MatTableDataSource([]);
    }
  }


  buscar(event?: PageEvent): void {
    this.dataSource = null;
    this.isLoading = true;

    let req = new ClienteBuscar();
    req.flgActivo = this.formularioGrp.get('flgActivo').value.id;
    req.nombre = this.formularioGrp.get('nombre').value;
    req.index = event ? event.pageIndex : this.pageEvent.pageIndex;
    req.size = event ? event.pageSize : this.pageEvent.pageSize;
    console.log(req);
    console.log(event);

    if (event) {
      this.pageEvent = event;
    }

    this.clienteService.listarClientePaginado(req).subscribe(
      (data: OutResponse<Cliente[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaCliente = data.objeto;
          this.pageEvent.length = data.length;
        } else {
          this.listaCliente = [];

          this.pageEvent.length = 0;
        }
        this.cargarDatosTabla();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this._snackBar.open(error.statusText, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        this.isLoading = false;

        this.pageEvent.length = 0;
      }
    );
  }

  exportarExcel() {
  }

  regCliente() {
    const dialogRef = this.dialog.open(RegClienteComponent, {
      width: '600px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.MANTENIMIENTO.CLIENTE.REGISTRAR.TITLE,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaCliente.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  editCliente(obj: Cliente) {
    let index = this.listaCliente.indexOf(obj);
    const dialogRef = this.dialog.open(ModClienteComponent, {
      width: '600px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.MANTENIMIENTO.CLIENTE.MODIFICAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaCliente.splice(index, 1, result);
        this.cargarDatosTabla();
      }
    });
  }

  elimCliente(obj: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        titulo: MENSAJES.MSG_CONFIRMACION_DELETE,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == CONSTANTES.COD_CONFIRMADO) {
        this.spinner.show();
        let index = this.listaCliente.indexOf(obj);

        let req = new Cliente();
        req.id = obj.id;

        this.clienteService.eliminarClienteLogica(req).subscribe(
          (data: OutResponse<any>) => {
            if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
              this.listaCliente.splice(index, 1);
              this.cargarDatosTabla();
              this._snackBar.open(MENSAJES.MSG_EXITO_OPERACION, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
            } else {
              this._snackBar.open(data.rmensaje, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
            }
            this.spinner.hide();
          }, error => {
            console.error(error);
            this._snackBar.open(error.statusText, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
            this.spinner.hide();
          }
        )
      }
    });
  }

}
