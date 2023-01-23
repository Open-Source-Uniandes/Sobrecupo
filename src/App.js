import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from './Context';
import Welcome from './Welcome/Welcome';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Buildings from './Buildings/Buildings';
import Classrooms from './Classrooms/Classrooms';

// CONSTANTES
const days = ['l', 'm', 'i', 'j', 'v', 's', 'd'];
const retries = 3; // máximo de reintentos de llamar al API
const cacheMins = 1440; // minutos antes de volver a llamar al API 

// CLASES
class Building
{
  constructor(name)
  {
    this.name = name
    this.rooms = {}
  }
  addRoom(room)
  {
    if (this.rooms[room.name] == null)
    {
      this.rooms[room.name] = room
    }
  }
  getRoom(room_name)
  {
    return this.rooms[room_name]
  }
}

class Room
{
  constructor(name)
  {
    this.name = name
    this.availability = Array(7)
    for (let i=0; i<=6; i++)
    {
      this.availability[i] = []
    }
  }

  addAvailability(day, availability, timeIgnore) 
  {
    let auxAvailability = [availability[0].slice(0, 2) + ":" + availability[0].slice(2) , availability[1].slice(0, 2) + ":" + availability[1].slice(2)]
    let i = 0
    while(i < this.availability[day].length){
      let todayAvailability = this.availability[day][i]
      if(this.differenceHours(todayAvailability[0], auxAvailability[1])<=timeIgnore && this.differenceHours(todayAvailability[0], auxAvailability[1])>0){
        let newAvailability = [...todayAvailability]
        newAvailability[0] = auxAvailability[0]
        this.availability[day].splice(i, 1)
        this.addAvailability(day, newAvailability.map(item =>item.replace(':', '') ), timeIgnore)
        return;
      }else if(this.differenceHours(auxAvailability[0], todayAvailability[1])<=timeIgnore && this.differenceHours(todayAvailability[0], auxAvailability[1])<=timeIgnore>0){
        let newAvailability = [...todayAvailability]
        newAvailability[1] = auxAvailability[1]
        this.availability[day].splice(i, 1)
        this.addAvailability(day, newAvailability.map(item =>item.replace(':', '') ), timeIgnore)
        return;
      }
    i++
    }
    this.availability[day].push(auxAvailability);
  }
  isAvailable(day, hour){
    let todayAvailability = this.availability[day]
    let isBusy = false
    let minDifference = null
    let nextTime = "23:59"
    let stopBusy = null
    for (let availability of todayAvailability){
      let difference = this.differenceHours(availability[0], hour)
      if(difference>0 && (minDifference === null || difference < minDifference)){
        minDifference = difference
        nextTime = availability[0]
      }
      if(hour>=availability[0] && hour<=availability[1]){
        stopBusy = availability[1]
        isBusy = true
      }
    }
    if (isBusy){return {"room":this.name, "available":!isBusy, "time":stopBusy, "after":nextTime}}
    else {return {"room":this.name, "available":!isBusy, "time":nextTime, "after": undefined}} 
  }

  differenceHours(hour_a, hour_b){
    var dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
    return dot(hour_a.split(":").map(Number), [60,1])-dot(hour_b.split(":").map(Number), [60,1])
  }

}

// FUNCIÓN DE INICIALIZACIÓN DE LOS SALONES
const intialize = async () => {
  const buildings = {};
  let response = await fetch("https://ofertadecursos.uniandes.edu.co/api/courses?term=&ptrm=&prefix=&attr=&nameInput=&campus=CAMPUS%20PRINCIPAL&attrs=&timeStart=&offset=0&limit=10000")
  response = await response.json();

  //TODO revisar "CP", "K2", "ES"
  let building_blacklist = ["0", "", " -", "VIRT", "NOREQ", "SALA", "LIGA", "LAB"];

  let actual_date = new Date("2023-03-03");

  for (let element of response ) {
    for (let pattern of element.schedules) {

      let date_ini = new Date(pattern.date_ini);
      let date_fin = new Date(pattern.date_fin);

      if (date_ini <= actual_date && date_fin >= actual_date) {

        let classroom = pattern.classroom;
        let building_name = (classroom.split("_")[0]).slice(1,);
        let room_name = classroom.split("_")[1];

        //Ignora los edificios que no se quieren mostrar
        if (building_blacklist.includes(building_name)) {
          continue;
        }
        
        if (buildings[building_name] == null) {
          buildings[building_name] = new Building(building_name)
        }

        let room = new Room(room_name);
        if (buildings[building_name].getRoom(room_name) == null) {
          buildings[building_name].addRoom(room)
        }

        for (let day=0; day<=6; day++) {
          if (pattern[days[day]] !== null) {
            buildings[building_name].getRoom(room_name).addAvailability(day, [pattern.time_ini, pattern.time_fin], 10);
          }
        }

        buildings[building_name].addRoom(room);
      }
    } 
  }

  return buildings;
}

const plainToClasses = (json) => {
  const buildings = {};
  
  for (const [bName, b] of Object.entries(json)) {
    let building = new Building(bName);
    for (const [rName, r] of Object.entries(b.rooms)) {
      let room = new Room(rName);
      let i = 0;
      for (const dayAv of r.availability) {
        for (const elAv of dayAv) {
          room.addAvailability(i, elAv.map((e) => e.replace(':','')), 10);
        }
        i++;
      }
      building.addRoom(room);
    }
    buildings[bName] = building;
  }
  return buildings;
}

const getRelativeUrlPath = () => {
  const url = window.location.href;
  return url.substring(url.split('/', 3).join('/').length);
}

const App = () => {
  const [data, setData] = useState(undefined);

  // FUNCIÓN PARA OBTENER LA DISPONIBILIDAD DE LOS CURSOS
  const getAvailableRooms = (day, hour, building=undefined, floor=undefined) => {
    let available_rooms = [];
    for (let building_name in data) {
      //Revisa si el edificio es el correcto en caso dado que sea dado por parametro
      if(building !== undefined && building_name !== building){
        continue;
      }
      
      for (let room_name in data[building_name].rooms) {
        //Revisar si el piso es el correcto en caso dado que haya piso
        if (floor !== undefined && room_name.slice(0,1) !== floor) {
          continue;
        }
        const room = data[building_name].rooms[room_name];
        let room_availability = room.isAvailable(day, hour);
        room_availability["room"] = building_name+" "+room_availability["room"];
        available_rooms.push(room_availability);
      }
    }

    //[{"ML001","5:30",1},{"ML002","4:30",2},{"ML002","5:30",3}]
    //[{"ML001", "True", "5:30"}, {"ML002", False, "5:30", 10}]
    // [[],[],[]]
    //1:Disponible mas de x tiempo ->verde 
    //2:Disponible menos de x tiempo ->naranja
    //3:No disponible -> rojo

    return available_rooms;
  }

  useEffect(() => {
    // 1.0 Revisa si las variables ya existen en almacenamiento
    const lastUpdate = localStorage.getItem('last-update');
    let diffMins;
    if (lastUpdate) {
      diffMins = (new Date() - new Date(lastUpdate))/ 60000; // ms a min, minutos desde la última actualización

      if (diffMins < cacheMins) { // si la última actualización fue hace menos de 1h, tomar los últimos datos guardados del API
        console.log('Cache hit, mins: ', diffMins);
        const dt = localStorage.getItem('classrooms');
        if (dt) {
          const js = JSON.parse(dt);
          setData(plainToClasses(js));
          return; // finalizar la función
        }
      }
    }

    console.log('Cache miss, mins: ', diffMins ? diffMins : 'first time!');
    if (getRelativeUrlPath() !== '/') {
      window.location.href = '/';
    }

    // 2.0 Define la función asíncrona que inicializa los salones
    const _ = async () => {
      const dt = await intialize();
      setData(dt); // En este punto se quita el símbolo de carga de la pantalla principal
      localStorage.setItem('classrooms', JSON.stringify(dt));
      localStorage.setItem('last-update', new Date());
    }

    // 2.1 Si la inicialización falla, reintenta un número específico de veces
    console.log('Fetching data from API...');
    let i = 0;
    while (i < retries) {
      try {
        _();
        break;
      } catch (error) {
        console.log("There was an error and the courses were not loaded");
        i++;
      }
    }
  }, []);

  return (
    <div className="App">
      <Context.Provider 
        value={{
          days,
          data,
          getAvailableRooms
        }}
      >
        {/* <Header/> va dento de cada uno*/}
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/buildings" element={<Buildings/>}/>
            <Route path="/classrooms/:building" element={<Classrooms/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          </BrowserRouter>
        <Footer/>
      </Context.Provider>
    </div>
  );
}

const PageNotFound = () => {
  return (
    <>
    <Header backhref='/'/>
    <main>
      <section>
          <article className="information">
              <h2>404</h2>
              <p>No encontramos la página que buscas <span role="img" aria-label="Sad">🙁</span></p>
          </article>
      </section>
    </main>
    </>
  );
}

export default App;
