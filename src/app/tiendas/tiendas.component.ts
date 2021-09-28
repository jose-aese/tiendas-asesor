import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TiendasService } from '../services/tiendas.service';
@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss'],
})
export class TiendasComponent implements OnInit {
  
  tienda: any;
  seleccion: boolean;
  
  

  constructor(private router: Router) {}

  ngOnInit() {
    console.log("TIENDAS COMPONENT");
  }



  seleccionaTarea() {}

  

}
