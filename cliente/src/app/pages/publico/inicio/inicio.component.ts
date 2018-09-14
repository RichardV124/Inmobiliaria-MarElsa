import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../modelo/global/globals';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  
  

  role: number;

  constructor(private global: Globals) {
    this.role = global.role;
    console.log(this.role + 'NAVBARRR');
       }


  ngOnInit() {
  }

}
