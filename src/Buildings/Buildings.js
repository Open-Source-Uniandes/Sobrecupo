import './Buildings.css';
import React, { useContext } from 'react';
import Context from '../Context';

const Buildings = () => {
    const ctx = useContext(Context);

    return (
      <React.Fragment>
        <main>
          <section className="select-time">
              <select name="select-day" id="select-day">
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="I">I</option>
                  <option value="J">J</option>
                  <option value="V">V</option>
                  <option value="S">S</option>
                  <option value="D">D</option>
              </select>
        
              <input type="time" name="select-hour" id="select-hour"/>
        
              <button type="button" id="btn-update-time">
                  Ahora
              </button>
          </section>

          <section className="cards-container">

              <article className="building-card">
                  <h2>TODOS</h2>
                  <p><span>60</span> salones disponibles</p>
              </article>

              <article className="building-card">
                  <h2>AU</h2>
                  <p><span>15</span> salones disponibles</p>
              </article>

              <article className="building-card">
                  <h2>B</h2>
                  <p><span>0</span> salones disponibles</p>
              </article>

              <article className="building-card">
                  <h2>C</h2>
                  <p><span>0</span> salones disponibles</p>
              </article>

          </section>

      </main>
      </React.Fragment>
    )
}

export default Buildings;