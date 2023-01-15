import logo from './logo.svg';
import './App.css';
import { isElementOfType } from 'react-dom/test-utils';

class Sobrecupo
{
  buildings = {}
  response
  loaded = false
  days = ['l', 'm', 'i', 'j', 'v', 's', 'd']
  constructor()
  {
    console.log("Extracting info from the api ")
    try
    {
    this.initalize();
    }
    catch (error)
    {
      console.log("There was an error and the courses were not loaded")
    }
  }

  async initalize()
  {
    // const response = await fetch("https://ofertadecursos.uniandes.edu.co/api/courses?term=&ptrm=&prefix=&attr=&nameInput=&campus=CAMPUS%20PRINCIPAL&attrs=&timeStart=&offset=&limit=1")
    const response = await fetch("https://ofertadecursos.uniandes.edu.co/api/courses?term=&ptrm=&prefix=&attr=&nameInput=&campus=CAMPUS%20PRINCIPAL&attrs=&timeStart=&offset=0&limit=2")
    this.response = await response.json()
    console.log(this.response)
    this.loaded = true;
    let actual_date = new Date("2023-03-03")
    for (let element of this.response )
    {
      for (let pattern of element.schedules)
      {
        let date_ini = new Date(pattern.date_ini)
        let date_fin = new Date(pattern.date_fin)
        if (date_ini <= actual_date && date_fin >= actual_date)
        {
          //TODO
          // let clasroom = pattern.clasroom
          // let building_name = clasroom.split(" ")[0]
          // let room_name = clasroom.split(" ")[1]
          let building_name = element.class
          let room_name = element.course
          console.log(this.buildings[building_name] == null)
          if (this.buildings[building_name] == null)
          {
            this.buildings[building_name] = new Building(building_name)
          }
          let room = new Room(room_name)
          if (this.buildings[building_name].getRoom(room_name) == null)
          {
            this.buildings[building_name].addRoom(room)
          }
          for (let day=0; day<=6; day++)
          {
            if (pattern[this.days[day]] != null)
            {
              this.buildings[building_name].getRoom(room_name).addAvailability(day, [pattern.time_ini, pattern.time_fin])
            }
          }
          this.buildings[building_name].addRoom(room)
        }
      } 
    }
    console.log("All classes were loaded correctly")
    console.log(this.buildings)
  }
}

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

  addAvailability(day, availability) 
  {
    console.log(day)
    console.log(availability)
    let auxAvailability = [availability[0].slice(0, 2) + ":" + availability[0].slice(2) , availability[1].slice(0, 2) + ":" + availability[1].slice(2)]
    this.availability[day].push(auxAvailability);
  }
}

function App() {
  const sobrecupo = new Sobrecupo();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* {sobrecupo.response[1]} */}
          Learn React bla bla
        </a>
      </header>
    </div>
  );
}

export default App;
