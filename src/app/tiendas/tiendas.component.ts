import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TiendasService } from '../services/tiendas.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss'],
})
export class TiendasComponent implements OnInit {
  title = 'Tiendas';
  public categorias:any;
  constructor(private router: Router,private tiendasService:TiendasService) {}

  ngOnInit() {
   
   /* this.tiendasService.categorias().subscribe(
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
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudieron obtener las categorias!',
        });
        this.router.navigate(['/']);
      }
    );*/
  }



  seleccionaTarea() {}

  

}
