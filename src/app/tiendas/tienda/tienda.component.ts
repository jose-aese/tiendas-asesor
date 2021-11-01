import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Dia, Horario } from 'src/app/models/horario.model';
import { TiendaReducer } from 'src/app/models/tiendaReducer.model';
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
  constructor(
    private store: Store<AppState>,
    private tiendasService: TiendasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tiendasService.categorias().subscribe(
      (response) => {
        if (response.resultado && response.resultado.categorias) {
          this.categorias = response.resultado.categorias;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudieron obtener las categorias!',
          });
          this.router.navigate(['/']);
        }
      },
      () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudieron obtener las categorias!',
        });
        this.router.navigate(['/']);
      }
    );

    this.store
      .select('tiendasReducer')
      .pipe(takeUntil(this.destroy$))
      .subscribe((tiendaSelec: TiendaReducer) => {
        this.tienda = tiendaSelec.tienda;
        console.log(this.tienda);
        this.abierto(this.tienda.horario);
        if (this.tienda) this.show = true;
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
      // this.open = false;
      // this.horario = false;
      // this.openTitle = 'Cerrado';
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

  guardar(){
    console.log(this.seleccionado);
    console.log(this.subCateSelec)
  }

  validarCate(){
    if(this.tienda.categoria.id ==  35 || this.tienda.categoria.id  == 22){
      return false
    } 
    return true;
  }
}
