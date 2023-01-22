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
        const d = localStorage.getItem('selected-day');
        const t = localStorage.getItem('selected-time');

        if (d && t) updatePage(d,t);
        else now();
        // eslint-disable-next-line
    }, [ctx.data]);

    const updatePage = async (d,t, set=false) => {
        if (d) setDay(d);
        else d = day;
        if (t) setTime(t);
        else t = time;

        if (set) {
            localStorage.setItem('selected-day', d);
            localStorage.setItem('selected-time', t);
        }

        const response = ctx.getAvailableRooms(ctx.days.indexOf(d.toLowerCase()),t, building === 'TODOS' ? undefined : building);
        console.log(response);

        setClassrooms(response);
    }

    const now = () => {
        const today = new Date();

        let day = today.getDay();
        day = day ? day-1 : 6;
        const hour = today.getHours();
        const minute = today.getMinutes();

        const d = ctx.days[day].toUpperCase();
        const t = `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute}`;

        localStorage.removeItem('selected-day');
        localStorage.removeItem('selected-time');

        updatePage(d, t);
    }

    return (
      <React.Fragment>
        <Header backhref='/buildings'/>
        <main>
            <section className="select-time">
                <select name="select-day" id="select-day"
                  value={day}
                  onChange={e => updatePage(e.target.value, null, true)}
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
                  onChange={e => updatePage(null, e.target.value, true)}
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