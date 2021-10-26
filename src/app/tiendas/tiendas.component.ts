import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss'],
})
export class TiendasComponent implements OnInit {
  title = 'Tiendas';

  constructor(private router: Router) {}

  ngOnInit() {
   
  }



  seleccionaTarea() {}

  

}
