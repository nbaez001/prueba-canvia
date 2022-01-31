import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONSTANTES, MENSAJES, TABLA_MAESTRA } from 'src/app/common';
import { FormService } from 'src/app/core/services/form.service';
import { Cliente } from '../../../dto/response/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { DataDialog } from '../../../entity/data-dialog.model';
import { MaestraBuscar } from '../../../dto/request/maestra-buscar';
import { MaestraService } from '../../../services/maestra.service';
import { Maestra } from '../../../dto/response/maestra';
import { OutResponse } from '../../../dto/response/out.response';

@Component({
  selector: 'app-mod-cliente',
  templateUrl: './mod-cliente.component.html',
  styleUrls: ['./mod-cliente.component.scss']
})
export class ModClienteComponent implements OnInit {
  modif: boolean = false;
  listaTipodocumento: Maestra[] = [];

  formularioGrp: FormGroup;
  formErrors: any;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModClienteComponent>,
    private _snackBar: MatSnackBar,
    @Inject(ClienteService) private clienteService: ClienteService,
    @Inject(MaestraService) private maestraService: MaestraService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<Cliente>) { }

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
    this.formularioGrp.get('nombre').setValue(this.dataDialog.objeto.nombre);
    this.formularioGrp.get('apellidoPat').setValue(this.dataDialog.objeto.apellidoPat);
    this.formularioGrp.get('apellidoMat').setValue(this.dataDialog.objeto.apellidoMat);
    this.formularioGrp.get('nroDocumento').setValue(this.dataDialog.objeto.nroDocumento);
  }

  comboTipoDocumento() {
    let req = new MaestraBuscar();
    req.idTabla = TABLA_MAESTRA.TIPO_DOCUMENTO;

    console.log(req);
    this.maestraService.listarMaestra(req).subscribe(
      (out: OutResponse<Maestra[]>) => {
        if (out.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaTipodocumento = out.objeto;
          if (this.dataDialog.objeto) {
            this.formularioGrp.get('tipoDocumento').setValue(this.listaTipodocumento.find(el => el.idItem == this.dataDialog.objeto.idtTipoDocumento));
          }
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

  modCliente(): void {
    if (this.formularioGrp.valid) {
      this.modif = true;

      let req = new Cliente();
      req.id = this.dataDialog.objeto.id;
      req.nombre = this.formularioGrp.get('nombre').value;
      req.apellidoPat = this.formularioGrp.get('apellidoPat').value;
      req.apellidoMat = this.formularioGrp.get('apellidoMat').value;
      req.idtTipoDocumento = this.formularioGrp.get('tipoDocumento').value.idItem;
      req.nroDocumento = this.formularioGrp.get('nroDocumento').value;
      req.idUsuarioCrea = 1;

      console.log(req);
      this.clienteService.modificarCliente(req).subscribe(
        (out: OutResponse<any>) => {
          if (out.rcodigo == CONSTANTES.R_COD_EXITO) {
            req.descTipoDocumento = this.formularioGrp.get('tipoDocumento').value.nombre;
            this.dialogRef.close(req);
            this._snackBar.open(MENSAJES.MSG_EXITO_OPERACION, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
          } else {
            this._snackBar.open(out.rmensaje, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
          }
          this.modif = false;
        },
        error => {
          console.log(error);
          this.modif = false;
          this._snackBar.open(error.statusText, '✖', { duration: 9000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }

}
