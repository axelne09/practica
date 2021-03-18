const express = require('express');
//const mysql = require('mysql');
const router = express.Router();
const {database} = require('../config/helpers');




/*OBTENER TODOS LOS CUENTOS*/
router.get('/', function(req, res) {
  let page = (req.query.page !== undefined && req.query.page != 0 ) ? req.query.page : 1; // set current page number
  const limit = (req.query.limit !== undefined && req.query.limit != 0) ? req.query.limit : 10; // set limit of items(cuentos) per page

  let startValue;
  let endValue;

  if (page > 0){
    startValue = (page * limit) - limit; //0,10,20,30...
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 10;
  }

  database.table('cuentos as c')
      .join([{
        table: 'categorias as g',
        on: 'g.id = c.cat_id'
      }])
      .withFields(['g.nombreCat as categoria',
          'c.nombreCuento as nombre',
          'c.imagen',
          'c.descripcion',
          'c.id'
      ])

      .slice(startValue, endValue)
      .sort({id: .1})
      .getAll()
      .then(cuents => {
          if(cuents.length > 0){
              res.status(200).json({
                  count: cuents.length,
                  cuentos: cuents
              });
          } else {
              res.json({message: 'No se encontraron cuentos'});
          }
      }).catch(err => console.log(err));
});

/*OBTENER SOLO 1 CUENTO*/
router.get('/:idCuento',(req, res) =>{
    let cuentoId = req.params.idCuento;
    console.log(cuentoId);


    database.table('cuentos as c')
        .join([{
            table: 'categorias as g',
            on: 'g.id = c.cat_id'
        }])
        .withFields(['g.nombreCat as categoria',
            'c.nombreCuento as nombre',
            'c.imagen',
            'c.descripcion',
            'c.id'
        ])
        .filter({'c.id' : cuentoId})
        .get()
        .then(cuent => {
            if(cuent){
                res.status(200).json(cuent);
            } else {
                res.json({message: 'No se encontro cuento con el id ${cuentoId}'});
            }
        }).catch(err => console.log(err));
})

/*Obtener todos los cuentos de una categoria*/
router.get('/categoria/:nombreCat', (req, res) =>{
    let page = (req.query.page !== undefined && req.query.page !== 0 ) ? req.query.page : 1; // set current page number
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10; // set limit of items(cuentos) per page

    let startValue;
    let endValue;

    if (page > 0){
        startValue = (page * limit) - limit; //0,10,20,30...
        endValue = page * limit;
    } else {
        startValue = 0;
        endValue = 10;
    }


    const cat_nombre = req.params.nombreCat;

    database.table('cuentos as c')
        .join([{
            table: 'categorias as g',
            on: `g.id = c.cat_id WHERE g.nombreCat LIKE '%${cat_nombre}%'`
        }])
        .withFields(['g.nombreCat as categoria',
            'c.nombreCuento as nombre',
            'c.imagen',
            'c.descripcion',
            'c.id'
        ])

        .slice(startValue, endValue)
        .sort({id: .1})
        .getAll()
        .then(cuents => {
            if(cuents.length > 0){
                res.status(200).json({
                    count: cuents.length,
                    cuentos: cuents
                });
            } else {
                res.json({message: `No se encontraron cuentos desde la categoria ${cat_nombre}`});
            }
        }).catch(err => console.log(err));
})
module.exports = router;
