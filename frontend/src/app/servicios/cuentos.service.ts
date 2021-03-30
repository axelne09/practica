import { CuentoModelServer, ServerResponse } from './../models/cuentos.models';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CuentosService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient,
              private router: Router) { }

  /*obtener cuentos desde el backend*/
  getAllCuentos(numberOfResults=10) : Observable<ServerResponse>{
    return this.http.get<ServerResponse>(this.SERVER_URL + '/cuentos', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }

  /*obtener solo 1 cuento*/
  getSingleCuento(id: number): Observable<CuentoModelServer>{
    return this.http.get<CuentoModelServer>(this.SERVER_URL + '/cuentos/' + id);
  }

  /*obtener cuento de una categoria*/
  getCuentoFromCategoria(nombreCat: String) : Observable<CuentoModelServer[]> {
    return this.http.get<CuentoModelServer[]>(this.SERVER_URL + '/cuentos/categorias/' + nombreCat);
  }

}
