import logo from './logo.svg';
import './App.css';

class Sobrecupo
{
  buildings = {}
  response
  loaded = false
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
    const response = await fetch("https://ofertadecursos.uniandes.edu.co/api/courses?term=&ptrm=&prefix=&attr=&nameInput=&campus=CAMPUS%20PRINCIPAL&attrs=&timeStart=&offset=&limit=10000")
    this.response = await response.json()
    console.log(this.response)
    this.loaded = true;
    for (let element of this.response )
    {
      // console.log(element.class+element.course)
    }
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

}

class Room
{
  constructor(name)
  {
    this.name = name
    this.availability = Array(9).fill(new Set())
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
