import './Welcome.css';
import React, { useContext } from 'react';
import Context from '../Context';

const Welcome = () => {
    const ctx = useContext(Context);
    return (
      <React.Fragment>
        <main>
        <section>
            <article className="information">
                <h2>Lorem ipsum dolor sit amet.</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet id eius voluptatum eum atque voluptas doloremque, numquam reiciendis laudantium ipsa cupiditate architecto quaerat dicta necessitatibus repellat sint temporibus dolor delectus velit soluta adipisci! Necessitatibus consequatur dicta atque</p>        
            </article>

            <article className="information">
                <h2>Lorem ipsum dolor sit amet.</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet id eius voluptatum eum atque voluptas doloremque, numquam reiciendis laudantium ipsa cupiditate architecto quaerat dicta necessitatibus repellat sint temporibus dolor delectus velit soluta adipisci! Necessitatibus consequatur dicta atque</p>        
            </article>

            <article className="information">
                <h2>Lorem ipsum dolor sit amet.</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet id eius voluptatum eum atque voluptas doloremque, numquam reiciendis laudantium ipsa cupiditate architecto quaerat dicta necessitatibus repellat sint temporibus dolor delectus velit soluta adipisci! Necessitatibus consequatur dicta atque</p>        
            </article>
          </section>

          <section>
            <div id="loading-placeholder" className="">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                <p><em>Un momento por favor <br/> Estamos Hackeando Banner</em> <span role="img" aria-label="Nice">😎</span></p>
            </div>

            <button id="btn-start" className="inactive" type="button">Encuentra salones</button>
          </section>
        </main>
      </React.Fragment>
    )
}

export default Welcome;