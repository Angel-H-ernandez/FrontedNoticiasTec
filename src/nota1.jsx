import React from 'react';
import './notas.css';

const MetroidPrime4 = () => {
  return (
    <div className="article-container">
      <h1 className="article-title">
        ¿<span className="highlight">Metroid Prime 4 está vivo, ya tiene ventana de lanzamiento </span> y sí llegará a Switch
      </h1>
      <p className="article-subtitle">Nintendo reveló el título oficial del juego cuyo primer anuncio fue en 2017. Fans creen que las primeras entregas de la saga merecen tener nuevas versiones</p>
      <div className="article-image-container">
        <img src="/src/assets/metroid.png" alt="Metroid" className="article-image" />
      </div>
      <div className="article-author">
        <img src="" alt="Author" className="author-image" />
        <p className="author-info">
          por <span className="author-name">Gonzalo Zaragoza</span> <span className="time">hace 2 hrs</span>
        </p>
      </div>
      <div className="article-content">
        <p>El universo de <span className="highlight">Metroid Prime 4</span> ha conquistado a varias generaciones de jugadores. Algunos de sus fans creen que <span className="highlight">Bethesda</span> debería traer de regreso los 2 primeros títulos de la saga con remakes, pues de esta forma más personas se acercarían a la franquicia, sobre todo tras el éxito de su serie live-action.</p>
        <p><span className="highlight">Todd Howard</span>, productor de la saga, está al tanto del deseo de la comunidad. Por tal motivo, habló sobre el tema durante una entrevista reciente. Desafortunadamente, compartió malas noticias para los jugadores veteranos de <span className="highlight">Fallout</span>.</p>
      </div>
    </div>
  );
}

export default MetroidPrime4;
