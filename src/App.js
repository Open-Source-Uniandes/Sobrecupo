import logo from './logo.svg';
import './App.css';

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
    this.initalize()
    }
    catch (error)
    {
      console.log("There was an error and the courses were not loaded")
    }
  }

  async initalize()
  {
    // const response = await fetch("https://ofertadecursos.uniandes.edu.co/api/courses?term=&ptrm=&prefix=&attr=&nameInput=&campus=CAMPUS%20PRINCIPAL&attrs=&timeStart=&offset=&limit=1")
    const response = await fetch("https://ofertadecursos.uniandes.edu.co/api/courses?term=&ptrm=&prefix=&attr=&nameInput=&campus=CAMPUS%20PRINCIPAL&attrs=&timeStart=&offset=0&limit=300")
    this.response = await response.json()
    this.loaded = true;
    //TODO
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
          let room_name = element.course.slice(0,2)

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
    console.log(this.getAvailableRooms(0, "06:30","ADMI",3))
  }

  getAvailableRooms(day, hour, building=undefined, floor=undefined)
  {
    let available_rooms = {}
    var minimum_time = new Date("01/01/2022 23:59:59")
    if (this.buildings[building] != null)
    {
      for (let room_name in this.buildings[building].rooms)
      {
        //Revisar si el piso es el correcto en caso dado que haya piso
        if(floor !== undefined && room_name.slice(0,1) != floor){continue}
        var room = this.buildings[building].rooms[room_name]
        minimum_time = new Date("01/01/2022 23:59:59")
        for (let availability of room.availability[day])
        {
          const actual_time = new Date("01/01/2022 "+hour+":00")
          const class_time_ini = new Date("01/01/2022 "+availability[0]+":00")
          const class_time_fin = new Date("01/01/2022 "+availability[1]+":00")

          //Revisar si actualmente se esta dando clase en dicho salon
          if (actual_time >= class_time_ini && actual_time <=class_time_fin)
          {
            minimum_time = new Date("01/01/2022 23:59:59")
            break
          }

          //Buscar cual es la clase mas cercana
          if (actual_time < class_time_ini && class_time_ini <= minimum_time)
          {
            minimum_time = class_time_ini
          }
        }
        if (minimum_time.toString() !== (new Date("01/01/2022 23:59:59")).toString())
        {
          available_rooms[building+room_name] = minimum_time
        }
      }
    }
    else
    {
      for (let building_name in this.buildings)
      {
        for (let room_name in this.buildings[building_name].rooms)
        {
          const room = this.buildings[building_name].rooms[room_name]
          minimum_time = new Date("01/01/2022 23:59:59")
          for (let availability of room.availability[day])
          {
            const actual_time = new Date("01/01/2022 "+hour+":00")
            const class_time_ini = new Date("01/01/2022 "+availability[0]+":00")
            const class_time_fin = new Date("01/01/2022 "+availability[1]+":00")

            //Revisar si actualmente se esta dando clase en dicho salon
            if (actual_time >= class_time_ini && actual_time <=class_time_fin)
            {
              minimum_time = new Date("01/01/2022 23:59:59")
              break
            }
            
            //Buscar cual es la clase mas cercana
            if (actual_time < class_time_ini && class_time_ini <= minimum_time)
            {
              minimum_time = class_time_ini
            }
          }
          if (minimum_time.toString() !== (new Date("01/01/2022 23:59:59")).toString())
          {
            available_rooms[building_name+room_name] = minimum_time
          }
        }
      }
    }
    return available_rooms
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
