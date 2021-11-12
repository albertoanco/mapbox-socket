import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { Lugar } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  mapa!: mapboxgl.Map;
  
  lugares: Lugar[] = [
    {
      id: '1',
      nombre: 'Fernando',
      lng: -76.97804049468229,
      lat: -12.131716338889934,
      color: '#dd8fee'
    }, 
    {
      id: '2',
      nombre: 'Amy',
      lng: -76.97841941196617, 
      lat: -12.132675550805942,
      color: '#790af0'
    }, 
    {
      id: '3',
      nombre: 'Orlando',
      lng: -76.97700523853169, 
      lat: -12.132713037178533,
      color: '#19884b'
    } 
  ];

  constructor() {}

  ngOnInit(): void {
    this.crearMapa();
  }

  crearMapa() {

    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYWxiZXJ0bzI3MDMiLCJhIjoiY2tudGUzZHgyMDFyZzJycnFtMWRsbnIzaiJ9.rZEW0dTICp6NvhrmsVwelw';
    
    this.mapa = new mapboxgl.Map({
                      container: 'mapa',
                      style: 'mapbox://styles/mapbox/streets-v11',
                      center: [ -76.97799182733641, -12.133273251189749 ],
                      zoom: 17
                    });

    for(const marcador of this.lugares){
      this.agregarMarcador(marcador);
    }

  }

  agregarMarcador(marcador: Lugar) {

    // const html = `<h2>${ marcador.nombre }</h2>
    //               <br>
    //               <button>Borrar</button>`;

    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;

    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append(h2, btnBorrar);

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent(div);//.setHTML(html);

    console.log(marcador);

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color
    })
    .setLngLat([ marcador.lng, marcador.lat ])
    .setPopup(customPopup)
    .addTo(this.mapa);

    marker.on('drag', () => {
      const lngLat = marker.getLngLat();
      console.log(lngLat);

      //Crear evento para emitir las coordenadas de este marcador

    });

    btnBorrar.addEventListener('click', () => {
      marker.remove();
      // Eliminar el marcador mediante sockets
    });

  }

  crearMarcador() {

    const customMarket: Lugar = {
      id: new Date().toISOString(),
      lng: -76.97799182733641,
      lat: -12.133273251189749,
      nombre: 'Sin nombre',
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    }

    this.agregarMarcador(customMarket);
  }

}
