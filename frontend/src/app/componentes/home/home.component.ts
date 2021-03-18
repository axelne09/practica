import { CuentoModelServer, ServerResponse } from './../../models/cuentos.models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuentosService } from './../../servicios/cuentos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  cuentos: CuentoModelServer[] = [];

  constructor(private cuentosService: CuentosService,
              private router: Router) { }

  ngOnInit(): void {
    this.cuentosService.getAllCuentos().subscribe((cuents: ServerResponse)  => {
      this.cuentos = cuents.cuentos;
      console.log(this.cuentos);
    });
  }

  selectCuento(id: Number){
    this.router.navigate(['/cuento', id]).then();
  }
}
