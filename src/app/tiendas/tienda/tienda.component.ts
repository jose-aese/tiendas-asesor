import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Dia, Horario } from 'src/app/models/horario.model';
import { ResponseServer } from 'src/app/models/responseServer.model';
import { TiendaReducer } from 'src/app/models/tiendaReducer.model';
import { AuthService } from 'src/app/services/auth.service';
import { TiendasService } from 'src/app/services/tiendas.service';
import Swal from 'sweetalert2';
import { Tienda } from '../../models/tienda.model';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})
export class TiendaComponent implements OnInit {
  public tienda: Tienda;
  public show: boolean;
  public horario: boolean;
  public open: boolean;
  public openTitle: string;
  private destroy$: Subject<void> = new Subject<void>();
  public dias: Dia[];
  public editando: boolean;
  public categorias: any[];
  public subCateSelec: any[];
  public subCat: any[];
  public seleccionado: any;
  public validado: boolean;
  public diasSemana: any[];
  public horasDias: any[];
  constructor(
    private store: Store<AppState>,
    private tiendasService: TiendasService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.tiendasService.categorias().pipe(
      map((response: ResponseServer) =>
        response.codigo ==
          '200.Elektra-Transformacion-Digital-Gestion-Tiendas.0000'
          ? response.resultado.categorias
          : []
      )
    ).subscribe(
      (response:  any[]): void => {
        if (response.length > 0) {
          this.categorias = response;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudieron obtener las categorias!',
          });
          this.router.navigate(['/tiendas']);
        }
      },
      (err: { status: number; }) => {
        console.log(err)
        if (err.status == 401 || err.status == 403) {
          this.authService.signOut();
        } else
          this.router.navigate(['/tiendas']);
      }
    );

    this.store
      .select('tiendasReducer')
      .pipe(takeUntil(this.destroy$))
      .subscribe((tiendaSelec: TiendaReducer) => {
        this.tienda = tiendaSelec.tienda;
        console.log(this.tienda);
        if (this.tienda) {
          this.abierto(this.tienda.horario);
          if (this.tienda) this.show = true;
        }
      });
  }

  abierto = (horas: Horario) => {
    if (horas.disponibilidad) {
      this.open = true;
      this.openTitle = 'Abierto';
      this.horario = true;
      return;
    } else {
      this.dias = horas.dias;
      this.diasSemana = diasArray;
      this.horasDias = horasDiasArray;
      //console.log('horarios:::',this.diasSemana);
    }
  };

  selectCat() {
    console.log(this.seleccionado);
    this.subCateSelec = [];
    let cat = this.categorias.filter(cat => cat.id == this.seleccionado);
    this.subCat = cat[0].subcategorias;
  }

  addSubCate(id) {

    this.subCat = this.subCat.filter((sub) => {
      if (sub.id != id) {
        return sub;
      } else {
        this.subCateSelec.push(sub);
      }
    });


    this.subCateSelec.sort((a, b) => {
      if (a.nombre < b.nombre) return -1;
      if (a.nombre > b.nombre) return 1;
      return 0;
    });

  }
  hora() {
    this.horario = !this.horario;
  }

  seleccioinarDias() {
    const listaDias = document.getElementById("horarios");
    let listDias = listaDias.getElementsByClassName('color-green');
    let arrayDias = Array.from(listDias);
    for (let diaSemana of arrayDias) {
      for (let diaSeleccionado of this.dias) {
        if (diaSemana.id == diaSeleccionado.dia) {
          document.getElementById('' + diaSemana.id + '').classList.add('active');
          this.seleccionarHoras(diaSeleccionado.horas, diaSeleccionado.dia)
        }
      }
    }
  }

  seleccionarHoras(horas, dia) {
    let listHoras = document.getElementsByClassName('color-red');
    let arrHorasDisponibles = Array.from(listHoras);
    for (let horaDisponible of arrHorasDisponibles) {
      console.log('hora', horaDisponible.id);
      for (let horaSelecionada of horas) {
        console.log('hora seleccionada', horaSelecionada);
        console.log('elemento', dia.concat('-', horaSelecionada))
        if (horaDisponible.id == dia.concat('-', horaSelecionada)) {
          console.log('coincidencia', dia.concat('-', horaSelecionada))
          document.getElementById('' + horaDisponible.id + '').classList.add('horasActive');
        }
      }
    }
  }

  deleteSubCate(id) {
    this.subCateSelec = this.subCateSelec.filter((sub) => {
      if (sub.id != id) {
        return sub;
      } else {
        this.subCat.push(sub);
      }
    });
    this.subCat.sort((a, b) => {
      if (a.nombre < b.nombre) return -1;
      if (a.nombre > b.nombre) return 1;
      return 0;
    });
  }

  edit() {
    this.validado = this.validarCate();
    this.seleccionado = this.tienda.categoria.id;
    this.subCateSelec = [];
    this.subCateSelec = this.tienda.categoria.subcategorias.filter(sub => sub);
    let categori = this.categorias.filter(
      (cat) => cat.id == this.tienda.categoria.id
    );
    this.subCat = categori[0].subcategorias;
    for (const element of this.subCateSelec) {
      this.subCat = this.subCat.filter((cat) => element.id != cat.id);
    }
    this.editando = true;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  guardar() {
    let cat = this.categorias.filter((cat) => cat.id == this.seleccionado);
    let categoria = {
      "id": this.seleccionado,
      "nombre": cat[0].nombre,
      "subcategorias": this.subCateSelec
    }
    console.log(this.tienda)
    localStorage.setItem('sicu', this.tienda.idUsuario);
    // this.tiendasService.updateTienda(this.tienda.idTienda, categoria).subscribe(response => {
    //   console.log(response);
    // })
  }

  validarCate() {
    if (this.tienda.categoria.id == 35 || this.tienda.categoria.id == 22) {
      return false
    }
    return true;
  }



}

let diasArray = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
let horasDiasArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
