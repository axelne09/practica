import { CuentoModelServer, ServerResponse } from './../../models/cuentos.models';
import { CuentosService } from './../../servicios/cuentos.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

declare let $: any;

@Component({
  selector: 'app-cuento',
  templateUrl: './cuento.component.html',
  styleUrls: ['./cuento.component.scss']
})
export class CuentoComponent implements OnInit, AfterViewInit {

  id: number;
  cuento;


  constructor(private cuentosService: CuentosService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      map((param:ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    )
    .subscribe(cuentoId => {
        this.id = cuentoId;
        this.cuentosService.getSingleCuento(this.id).subscribe(cuents => {
          this.cuento = cuents;
        });
    });
  }

  ngAfterViewInit(): void {
    // Product Main img Slick
	$('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs',
  });

	// Product imgs Slick
  $('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
    asNavFor: '#product-main-img',
		responsive: [{
        breakpoint: 991,
        settings: {
					vertical: false,
					arrows: false,
					dots: true,
        }
      },
    ]
  });

	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}
  }
}
