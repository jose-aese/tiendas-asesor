import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tienda } from './models/tienda.model';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss'],
})
export class TiendasComponent implements OnInit {
  

  constructor(private router: Router) {}

  ngOnInit() {
   
  }



  seleccionaTarea() {}

  

}
