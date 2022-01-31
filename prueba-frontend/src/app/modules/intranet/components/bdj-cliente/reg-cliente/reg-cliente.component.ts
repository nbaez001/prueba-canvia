import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONSTANTES, MENSAJES, TABLA_MAESTRA } from 'src/app/common';
import { FormService } from 'src/app/core/services/form.service';
import { Cliente } from '../../../dto/response/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { DataDialog } from '../../../entity/data-dialog.model';
import { MaestraService } from '../../../services/maestra.service';
import { MaestraBuscar } from '../../../dto/request/maestra-buscar';
import { OutResponse } from '../../../dto/response/out.response';
import { Maestra } from '../../../dto/response/maestra';

@Component({
  selector: 'app-reg-cliente',
  templateUrl: './reg-cliente.component.html',
  styleUrls: ['./reg-cliente.component.scss']
})
export class RegClienteComponent implements OnInit {
  guardar: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;
  listaTipodocumento: Maestra[] = [];

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegClienteComponent>,
    private _snackBar: MatSnackBar,
    @Inject(ClienteService) private clienteService: ClienteService,
    @Inject(MaestraService) private maestraService: MaestraService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<any>) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      apellidoPat: ['', [Validators.required, Validators.maxLength(100)]],
      apellidoMat: ['', [Validators.required, Validators.maxLength(100)]],
      tipoDocumento: ['', [Validators.required]],
      nroDocumento: ['', [Validators.required, Validators.maxLength(15)]],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.comboTipoDocumento();
  }

  comboTipoDocumento() {
    let req = new MaestraBuscar();
    req.idTabla = TABLA_MAESTRA.TIPO_DOCUMENTO;

    console.log(req);
    this.maestraService.listarMaestra(req).subscribe(
      (out: OutResponse<Maestra[]>) => {
        if (out.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaTipodocumento = out.objeto;
          this.formularioGrp.get('tipoDocumento').setValue(this.listaTipodocumento[0]);
        } else {
          this._snackBar.open(out.rmensaje, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
        }
      },
      error => {
        console.log(error);
        this._snackBar.open(error.statusText, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
      }
    );
  }

  regCliente(): void {
    if (this.formularioGrp.valid) {
      this.guardar = true;

      let req = new Cliente();
      req.nombre = this.formularioGrp.get('nombre').value;
      req.apellidoPat = this.formularioGrp.get('apellidoPat').value;
      req.apellidoMat = this.formularioGrp.get('apellidoMat').value;
      req.idtTipoDocumento = this.formularioGrp.get('tipoDocumento').value.idItem;
      req.nroDocumento = this.formularioGrp.get('nroDocumento').value;
      req.idUsuarioCrea = 1;

      console.log(req);
      this.clienteService.registrarCliente(req).subscribe(
        (out: OutResponse<Cliente>) => {
          if (out.rcodigo == CONSTANTES.R_COD_EXITO) {
            out.objeto.descTipoDocumento = this.formularioGrp.get('tipoDocumento').value.nombre;
            this.dialogRef.close(out.objeto);
            this._snackBar.open(MENSAJES.MSG_EXITO_OPERACION, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
          } else {
            this._snackBar.open(out.rmensaje, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
          }
          this.guardar = false;
        },
        error => {
          console.log(error);
          this.guardar = false;
          this._snackBar.open(error.statusText, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }
}
