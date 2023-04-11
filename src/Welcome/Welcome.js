import './Welcome.css';
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Context from '../Context';
import Header from '../Header/Header';

const Welcome = () => {
    const ctx = useContext(Context); 

    sessionStorage.removeItem('selected-day');
    sessionStorage.removeItem('selected-time');

    return (
      <React.Fragment>
        <Header/>
        <main>
        <section>
            <article className="information">
                <h2>¿Buscando salón?</h2>
                <p>Sabemos que muchas veces estás en la universidad y quieres o necesitas conseguir un salón libre, y puede ser muy difícil encontrarlo o siquiera saber si hay alguno. <br/><br/> Sobrecupo es una plataforma web que te permite visualizar los salones que se encuentran disponibles en un momento específico de la semana, como por ejemplo... <b>¡Justo ahora!</b></p>
            </article>

            <article className="information">
                <h2>Open Source</h2>
                <p>Este es un proyecto de la comunidad Uniandina para la comunidad Uniandina. El código que hace posible esta herramienta es tuyo. Anímate a proponer nuevas funcionalidades, cambios de diseño, optimizaciones, o lo que tú quieras. ¡Tu aporte impactará toda la comunidad Uniandina!</p>
            </article>

            <article className="information">
                <h2>¡Comienza! <span role="img" aria-label="Boom">💥</span></h2>
                <p>Para mantener la información actualizada, cada día serás redirigido a esta página para volver a cargar los datos. No te preocupes, es bastante rápido.</p>
            </article>

            <article className="information">
                <h2>Fácil de manejar</h2>
                <ol>
                  <li>Selecciona el día de la semana y la hora a la que desées buscar (<b style={{'fontFamily':'consolas'}}>I</b> quiere decir miércoles) o da click en <b>Ahora</b> para seleccionar la hora actual; esta se seleccionará por defecto si no has escogido una hora.</li>
                  <br/>
                  <li>¡Listo! Ya puedes ver la disponibilidad de cada edificio y salón; también puedes filtrar para ver solo los salones libres.</li>
                </ol>
            </article>

          </section>


          <section>
            {
              ctx.data === undefined ? 
              <div id="loading-placeholder">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                <p><em>Un momento por favor <br/> Estamos Hackeando Banner</em> <span role="img" aria-label="Nice">😎</span></p>
              </div> 
              :
              <div className='btn-container'>
                <Link to="/buildings" className="avoid-underline">
                  <button id="btn-start" type="button">Encuentra salones</button>
                </Link>
              </div>
            }
          </section>
        </main>
      </React.Fragment>
    )
}

export default Welcome;
