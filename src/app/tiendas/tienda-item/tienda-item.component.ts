import { Component, Input, OnInit } from '@angular/core';
import { Tienda } from '../models/tienda.model';

@Component({
  selector: 'tienda-item',
  templateUrl: './tienda-item.component.html',
  styleUrls: ['./tienda-item.component.scss']
})
export class TiendaItemComponent implements OnInit {

  @Input() tienda: Tienda;
  constructor() { }

  ngOnInit(): void {
  }
}
