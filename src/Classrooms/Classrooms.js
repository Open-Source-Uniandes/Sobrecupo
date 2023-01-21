import './Classrooms.css';
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../Context';
import Header from '../Header/Header';

const Classrooms = () => {
    const ctx = useContext(Context);
    const { building } = useParams();

    const [day, setDay] = useState('L');
    const [time, setTime] = useState('--:--');

    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        now();
        // eslint-disable-next-line
    }, [ctx.data]);

    const updatePage = async (d,t) => {
        if (d) setDay(d);
        else d = day;
        if (t) setTime(t);
        else t = time;

        const response = ctx.getAvailableRooms(ctx.days.indexOf(d.toLowerCase()),t, building === 'TODOS' ? undefined : building);
        console.log(response);

        setClassrooms(response);
    }

    const now = () => {
        const today = new Date();

        const hour = today.getHours();
        const minute = today.getMinutes();

        const d = ctx.days[today.getDay()-1].toUpperCase();
        const t = `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute}`;

        updatePage(d, t);
    }

    return (
      <React.Fragment>
        <Header backhref='/buildings'/>
        <main>
            <section className="select-time">
                <select name="select-day" id="select-day"
                  value={day}
                  onChange={e => updatePage(e.target.value, null)}
                  >
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="I">I</option>
                    <option value="J">J</option>
                    <option value="V">V</option>
                    <option value="S">S</option>
                    <option value="D">D</option>
                </select>

                <input type="time" name="select-hour" id="select-hour"
                  value={time}
                  onChange={e => updatePage(null, e.target.value)}
                  />
                
                <button type="button" id="btn-update-time" onClick={now}>
                    Ahora
                </button>
            </section>

            <section className="cards-container">
                {
                    classrooms.map((room) => 
                    <article className={"classroom-card " + (room.available ? 'available' : '')} key={room.room}>
                        <h2>{room.room}</h2>
                        <p>Me {room.available ? 'ocupo' : 'desocupo'} a las <span>{room.time}</span></p>
                    </article>
                    )
                }
            </section>

        </main>
      </React.Fragment>
    )
}

export default Classrooms;