import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { LISTA_FUNCIONALIDAD } from "../../../../../common";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  listaFuncionalidad: any[] = LISTA_FUNCIONALIDAD;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {
  }

  salir(): void {

  }

  marcarSeleccionado(obj: any): void {
    this.listaFuncionalidad.forEach(el => {
      if (el.idFuncionalidad == obj.idFuncionalidad) {
        el.selected = true;
      } else {
        el.selected = false;
      }
    });
  }
}
