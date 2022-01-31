import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CONSTANTES } from 'src/app/common';
import { DateService } from 'src/app/core/services/date.service';
import { FormService } from 'src/app/core/services/form.service';
import { Cliente } from '../../../dto/response/cliente';
import { Factura } from '../../../dto/response/factura';
import { FacturaDetalle } from '../../../dto/response/factura-detalle';
import { OutResponse } from '../../../dto/response/out.response';
import { DataDialog } from '../../../entity/data-dialog.model';
import { ClienteService } from '../../../services/cliente.service';
import { FacturaService } from '../../../services/factura.service';

@Component({
  selector: 'app-mod-factura',
  templateUrl: './mod-factura.component.html',
  styleUrls: ['./mod-factura.component.scss']
})
export class ModFacturaComponent implements OnInit {
  modif: boolean = false;

  listaCliente: Cliente[] = [];
  listaClienteAux: Cliente[] = [];

  formularioGrp: FormGroup;
  formErrors: any;

  busquedaGrp: FormGroup;
  formErrors2: any;

  cliente: Cliente = null;

  listaFacturaDetalle: FacturaDetalle[] = [];
  dataSource: MatTableDataSource<FacturaDetalle> = null;
  isLoading: boolean = true;
  displayedColumns: string[] = [];
  columnsGrilla = [
    {
      columnDef: 'codigo',
      header: 'Codigo',
      cell: (m: FacturaDetalle) => (m.codigo != null) ? `${m.codigo}` : ''
    }, {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: FacturaDetalle) => `${m.nombre}`
    }, {
      columnDef: 'cantidad',
      header: 'Cantidad',
      cell: (m: FacturaDetalle) => (m.cantidad != null) ? `${this.decimalPipe.transform(m.cantidad, '1.1-1')}` : ''
    }, {
      columnDef: 'precio',
      header: 'Precio',
      cell: (m: FacturaDetalle) => (m.precio != null) ? `${this.decimalPipe.transform(m.precio, '1.2-2')}` : ''
    }, {
      columnDef: 'subTotal',
      header: 'Sub total',
      cell: (m: FacturaDetalle) => (m.subTotal != null) ? `${this.decimalPipe.transform(m.subTotal, '1.2-2')}` : ''
    }];

  formularioDetGrp: FormGroup;
  formErrorsDet: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModFacturaComponent>,
    private _snackBar: MatSnackBar,
    private decimalPipe: DecimalPipe,
    private datePipe: DatePipe,
    @Inject(FacturaService) private facturaService: FacturaService,
    @Inject(ClienteService) private clienteService: ClienteService,
    @Inject(DateService) private dateService: DateService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<Factura>) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      nroComprobante: ['', [Validators.required, Validators.maxLength(13)]],
      monto: ['', []],
      fecha: [{ value: new Date(), disabled: false }, [Validators.required]],
      cliente: ['', [Validators.required]],
    });

    this.busquedaGrp = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(100)]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.formErrors2 = this.formService.buildFormErrors(this.busquedaGrp, this.formErrors2);
    this.busquedaGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.busquedaGrp, this.formErrors2, false);
    });

    //FOR AUTOCOMPLETES
    this.formularioGrp.get('cliente').valueChanges.subscribe(
      data => {
        const filterValue = (typeof data == 'string') ? data.toUpperCase() : null;
        if (filterValue) {
          this.cliente = null;
          this._buscarCliente(filterValue);
        }
      }
    );
    //PARA AUTOCOMPLETES

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.definirTabla();
    this.comboCliente();

    if (this.dataDialog.objeto) {
      this.formularioGrp.get('nroComprobante').setValue(this.dataDialog.objeto.nroComprobante);
      this.formularioGrp.get('monto').setValue(this.dataDialog.objeto.monto);
      this.formularioGrp.get('fecha').setValue(this.dateService.parseGuionDDMMYYYY(this.dataDialog.objeto.fecha));

      this.buscarFactura();
    }
  }

  definirTabla(): void {
    this.displayedColumns = [];
    this.columnsGrilla.forEach(c => {
      this.displayedColumns.push(c.columnDef);
    });
    this.displayedColumns.unshift('id');
    this.displayedColumns.push('opt');

    this.cargarDatosTabla();
  }

  public cargarDatosTabla(): void {
    this.dataSource = null;
    if (this.listaFacturaDetalle.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaFacturaDetalle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource([]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.isLoading = false;
    this.crearControles();
  }

  crearControles(): void {
    const frmCtrl = {};

    //LISTA DE VISIBLES EN INPUT
    let lista = [];
    this.displayedColumns.forEach(el => {
      lista.push(false);
    });
    //FIN LISTA DE VISIBLES EN INPUT
    this.listaFacturaDetalle.forEach((el, i) => {
      console.log(i);
      frmCtrl[`c${i}`] = new FormControl({ value: el.cantidad, disabled: false }, [Validators.required, Validators.min(0.1)]);
      frmCtrl[`m${i}`] = new FormControl({ value: el.precio, disabled: false }, [Validators.required, Validators.min(0.1)]);
    });

    this.formularioDetGrp = new FormGroup(frmCtrl);
    this.formErrorsDet = this.formService.buildFormErrors(this.formularioDetGrp, this.formErrorsDet);
  }

  buscarFactura(): void {
    this.facturaService.buscarFactura(this.dataDialog.objeto).subscribe(
      (data: OutResponse<Factura>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaFacturaDetalle = data.objeto.listaDetalle;
          this.cargarDatosTabla();
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboCliente(): void {
    let req = new Cliente();
    req.flgActivo = CONSTANTES.FLG_ACTIVO;

    this.clienteService.listarCliente(req).subscribe(
      (data: OutResponse<Cliente[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaCliente = data.objeto;
          this.listaClienteAux = data.objeto;
          if (this.dataDialog.objeto) {
            this.formularioGrp.get('cliente').setValue(this.listaClienteAux.find(el => el.id == this.dataDialog.objeto.idCliente));
          }
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  private _buscarCliente(value: any): void {
    let comp = this.formularioGrp.get('cliente').value;
    if (comp) {
      this.listaCliente = this.listaClienteAux.filter(el => (el.nombre.includes(comp) || el.apellidoPat.includes(comp) || el.apellidoMat.includes(comp)));
    }
  }

  modFactura(): void {
    if (this.formularioGrp.valid && this.formularioDetGrp.valid) {
      if (this.cliente != null || this.dataDialog.objeto.idCliente != null) {
        this.modif = true;

        let req = new Factura();
        //DATOS DE EMPRESA
        req.idCliente = this.cliente != null ? this.cliente.id : this.dataDialog.objeto.idCliente;
        req.nroComprobante = this.formularioGrp.get('nroComprobante').value;
        req.monto = this.formularioGrp.get('monto').value;
        req.fecha = this.formularioGrp.get('fecha').value;
        req.nomCliente = this.cliente != null ? (this.cliente.nombre + ' ' + this.cliente.apellidoPat + ' ' + this.cliente.apellidoMat) : this.dataDialog.objeto.nomCliente;
        req.flgActivo = 1;
        //FIN DATOS DE EMPRESA


        let sumPrecioVenta = 0.00;

        this.listaFacturaDetalle.forEach(el => {
          sumPrecioVenta += el.subTotal;
          //PARSEO A 2 DECIMALES
          el.idUsuarioMod = 1;
          el.idUsuarioCrea = 1;
          el.cantidad = Number.parseFloat(el.cantidad.toFixed(2));
          el.precio = Number.parseFloat(el.precio.toFixed(2));
          el.subTotal = Number.parseFloat(el.subTotal.toFixed(2));
        });

        req.monto = sumPrecioVenta;
        req.idUsuarioCrea = 1;

        if (this.listaFacturaDetalle.length > 0) {
          req.listaDetalle = this.listaFacturaDetalle;

          this.facturaService.registrarFactura(req).subscribe(
            (data: OutResponse<Factura>) => {
              console.log('VENTA RESPONSE');
              console.log(data);
              if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
                this.modif = false;
                this.dialogRef.close(data.objeto);
              } else {
                this._snackBar.open(data.rmensaje, '✖', { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
                this.modif = false;
              }
            },
            error => {
              console.log(error);
              this.modif = false;
              this._snackBar.open(error.statusText, '✖', { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
            }
          );
        } else {
          this._snackBar.open('AGREGUE DETALLE DE FACTURA', '✖', { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
          this.modif = false;
        }
      } else {
        this._snackBar.open('SELECCIONE UN CLIENTE', '✖', { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
        this.modif = false;
      }
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
      this.formService.getValidationErrors(this.formularioDetGrp, this.formErrorsDet, true);
    }
  }

  displayFn(obj: Cliente) {
    console.log(obj);
    return obj ? (obj.nombre + ' ' + obj.apellidoPat + ' ' + obj.apellidoMat) : undefined;
  }

  seleccionCliente(evt) {
    console.log('seleccionado1');
    console.log(evt);
    console.log(this.formularioGrp.get('cliente').value);
    this.cliente = this.formularioGrp.get('cliente').value;
  }

  agregarDetalle(): void {
    console.log('EVENTO AGREGAR DETALLE');
    if (this.busquedaGrp.valid) {
      let det = new FacturaDetalle();
      det.codigo = this.busquedaGrp.get('codigo').value;
      det.nombre = this.busquedaGrp.get('nombre').value;

      det.cantidad = 1;
      det.precio = 0.0;// SE DEBE SETEAR CUANDO SE CAMBIA CANTIDAD
      det.subTotal = 0.0;// SE DEBE SETEAR CUANDO SE CAMBIA CANTIDAD
      det.idUsuarioCrea = 1;

      this.listaFacturaDetalle.push(det);
      this.cargarDatosTabla();

      //VACIA LOS CAMPOS
      this.formService.setAsUntoched(this.busquedaGrp, this.formErrors2);

      let indice = this.listaFacturaDetalle.indexOf(det);
      this.actualizarSubtotal(indice);
    } else {
      console.log('FORMULARIO NO VALIDO');
      this.formService.getValidationErrors(this.busquedaGrp, this.formErrors2, true);
    }
  }

  actualizarSubtotal(i: number) {
    console.log('INGRESO A ACTUALIZAR SUBTOTAL');
    //CANTIDAD
    if (this.formularioDetGrp.get('c' + i).value) {
      this.listaFacturaDetalle[i].cantidad = Number.parseFloat((this.formularioDetGrp.get('c' + i).value).toFixed(2));
    } else {
      this.listaFacturaDetalle[i].cantidad = 0.00;
    }
    //PRECIO NORMAL
    if (this.formularioDetGrp.get('m' + i).value) {
      this.listaFacturaDetalle[i].precio = Number.parseFloat((this.formularioDetGrp.get('m' + i).value).toFixed(2));
    } else {
      this.listaFacturaDetalle[i].precio = 0.00;
    }
    //SUB TOTAL PRECIO NORMAL
    this.listaFacturaDetalle[i].subTotal = Number.parseFloat((this.listaFacturaDetalle[i].cantidad * this.listaFacturaDetalle[i].precio).toFixed(2));

    console.log(this.listaFacturaDetalle[i]);
    this.formService.getValidationErrors(this.formularioDetGrp, this.formErrorsDet, true);
    // this.cargarDatosTabla();

    let montoTotal = 0.0;
    this.listaFacturaDetalle.forEach(el => {
      montoTotal += el.subTotal;
    });
    this.formularioGrp.get('monto').setValue(Number.parseFloat((montoTotal).toFixed(2)));
    console.log('LISTA TOTAL');
    console.log(this.listaFacturaDetalle.length);
  }

  elimProducto(row: FacturaDetalle): void {
    console.log('ELIMINAR DETALLE VENTA');
    let index = this.listaFacturaDetalle.indexOf(row);
    this.listaFacturaDetalle.splice(index, 1);
    this.cargarDatosTabla();
  }
}
