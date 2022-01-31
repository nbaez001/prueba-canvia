import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ACTIVO_LISTA, CONSTANTES, MENSAJES, MENSAJES_PANEL } from 'src/app/common';
import { FormService } from 'src/app/core/services/form.service';
import { FacturaBuscar } from '../../dto/request/factura-buscar';
import { Factura } from '../../dto/response/factura';
import { OutResponse } from '../../dto/response/out.response';
import { FacturaService } from '../../services/factura.service';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { ModFacturaComponent } from './mod-factura/mod-factura.component';
import { RegFacturaComponent } from './reg-factura/reg-factura.component';

@Component({
  selector: 'app-bdj-factura',
  templateUrl: './bdj-factura.component.html',
  styleUrls: ['./bdj-factura.component.scss']
})
export class BdjFacturaComponent implements OnInit {
  exportar = false;

  activoLista: any;
  listaFactura: Factura[] = [];

  displayedColumns: string[];
  dataSource: MatTableDataSource<Factura>;
  isLoading: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  pageEvent: PageEvent;

  columnsGrilla = [
    {
      columnDef: 'nroComprobante',
      header: 'Nro comprobante',
      cell: (m: Factura) => (m.nroComprobante != null) ? `${m.nroComprobante}` : ''
    }, {
      columnDef: 'nomCliente',
      header: 'Cliente',
      cell: (m: Factura) => (m.nomCliente != null) ? `${m.nomCliente}` : ''
    }, {
      columnDef: 'monto',
      header: 'Monto',
      cell: (m: Factura) => (m.monto != null) ? `${m.monto}` : ''
    }, {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (m: Factura) => (m.fecha != null) ? `${this.datePipe.transform(m.fecha, 'dd/MM/yyyy')}` : ''
    }, {
      columnDef: 'flgActivo',
      header: 'Estado',
      cell: (m: Factura) => this.activoLista.filter(el => (el.id == m.flgActivo))[0].nombre
    }];

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(FormService) private formService: FormService,
    @Inject(FacturaService) private clienteService: FacturaService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.pageEvent = new PageEvent()
    this.pageEvent.length = 0;
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;

    this.formularioGrp = this.fb.group({
      nroComprobante: ['', [Validators.maxLength(13)]],
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
    if (this.listaFactura.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaFactura);
    } else {
      this.dataSource = new MatTableDataSource([]);
    }
  }


  buscar(event?: PageEvent): void {
    this.dataSource = null;
    this.isLoading = true;

    let req = new FacturaBuscar();
    req.flgActivo = this.formularioGrp.get('flgActivo').value.id;
    req.nroComprobante = this.formularioGrp.get('nroComprobante').value;
    req.index = event ? event.pageIndex : this.pageEvent.pageIndex;
    req.size = event ? event.pageSize : this.pageEvent.pageSize;
    console.log(req);
    console.log(event);

    if (event) {
      this.pageEvent = event;
    }

    this.clienteService.listarFacturaPaginado(req).subscribe(
      (data: OutResponse<Factura[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaFactura = data.objeto;
          this.pageEvent.length = data.length;
        } else {
          this.listaFactura = [];

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

  regFactura() {
    const dialogRef = this.dialog.open(RegFacturaComponent, {
      width: '900px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.MANTENIMIENTO.FACTURA.REGISTRAR.TITLE,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaFactura.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  editFactura(obj: Factura) {
    let index = this.listaFactura.indexOf(obj);
    const dialogRef = this.dialog.open(ModFacturaComponent, {
      width: '900px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.MANTENIMIENTO.FACTURA.MODIFICAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaFactura.splice(index, 1, result);
        this.cargarDatosTabla();
      }
    });
  }

  elimFactura(obj: Factura): void {
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
        let index = this.listaFactura.indexOf(obj);

        let req = new Factura();
        req.id = obj.id;

        this.clienteService.eliminarFacturaLogica(req).subscribe(
          (data: OutResponse<any>) => {
            if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
              this.listaFactura.splice(index, 1);
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
