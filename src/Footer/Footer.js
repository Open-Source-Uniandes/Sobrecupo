import './Footer.css';
import React from 'react';

const Footer = () => {
    return (
      <React.Fragment>
        <footer>
          <p>Hecho con <span role="img" aria-label="Love">💛</span> en Uniandes</p>
          <p><strong><a href="https://github.com/Open-Source-Uniandes/Sobrecupo">Sé parte de este proyecto aquí</a></strong></p>
        </footer>
      </React.Fragment>
    )
}

export default Footer;