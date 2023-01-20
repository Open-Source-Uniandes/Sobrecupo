import './Classrooms.css';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../Context';
import Header from '../Header/Header';

const Classrooms = () => {
    const ctx = useContext(Context);
    const { building } = useParams();

    return (
      <React.Fragment>
        <Header backhref='/buildings'/>
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

                <article className="classroom-card available">
                    <h2>AU-101</h2>
                    <p>Me ocupo a las <span>18:30</span></p>
                </article>

                <article className="classroom-card">
                    <h2>AU-101</h2>
                    <p>Me desocupo a las <span>18:30</span></p>
                </article>

                <article className="classroom-card">
                    <h2>AU-101</h2>
                    <p>Me desocupo a las <span>18:30</span></p>
                </article>

                <article className="classroom-card">
                    <h2>AU-101</h2>
                    <p>Me desocupo a las <span>18:30</span></p>
                </article>

                <article className="classroom-card available">
                    <h2>AU-101</h2>
                    <p>Me ocupo a las <span>18:30</span></p>
                </article>

                <article className="classroom-card available">
                    <h2>AU-101</h2>
                    <p>Me ocupo a las <span>18:30</span></p>
                </article>

            </section>

        </main>
      </React.Fragment>
    )
}

export default Classrooms;