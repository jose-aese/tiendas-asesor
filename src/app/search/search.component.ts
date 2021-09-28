import { Component, OnInit } from '@angular/core';
import { TiendasService } from '../services/tiendas.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  empleado = {
    num: 1028575,
  };
  numSeleccionado: number;
  seleccion: boolean;
  tiendas: any;
  host = 'https://minegocio.bazappgs.com/';
  constructor(
    private tiendasService: TiendasService
  ) { }

  ngOnInit(): void {
    console.log("SEARCH COMPONENT");
  }

  seleccionaEmpleado() {
    console.log(this.empleado);
    this.numSeleccionado = this.empleado.num;
    this.tiendasService.tiendas(this.numSeleccionado).subscribe((response) => {
      if (response.resultado == []) this.seleccion = false;

      this.tiendas = response.resultado;

      this.tiendas.forEach((tienda) => {
        if (!tienda.logo || !tienda.logo.referencia) tienda.host = null;
        else tienda.host = this.host + tienda.logo.referencia;

      });
      console.log(this.tiendas);
      this.seleccion = true;
    });
  }

}
