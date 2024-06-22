import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [noticias, setNoticias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [cuerpoNoticia, setCuerpoNoticia] = useState('');
  const [imagen, setImagen] = useState('');
  const [editando, setEditando] = useState(false);
  const [idNoticia, setIdNoticia] = useState(null);

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    try {
      const response = await axios.post('https://backnodecisneros.onrender.com/getNoticias', { cantidad: 100 });
      setNoticias(response.data);
    } catch (error) {
      console.error('Error fetching noticias:', error);
    }
  };

  const handleAddNoticia = async () => {
    try {
      const response = await axios.post('https://backnodecisneros.onrender.com/addNoticia', {
        titulo,
        sinopsis,
        cuerpoNoticia,
        imagen
      });
      setNoticias([...noticias, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error adding noticia:', error);
    }
  };

  const handleEditNoticia = async () => {
    try {
      const response = await axios.put('https://backnodecisneros.onrender.com/updateNoticia', {
        id: idNoticia,
        titulo,
        sinopsis,
        cuerpoNoticia,
        imagen
      });
      setNoticias(noticias.map(noticia => noticia._id === idNoticia ? response.data : noticia));
      resetForm();
    } catch (error) {
      console.error('Error editing noticia:', error);
    }
  };

  const handleDeleteNoticia = async (id) => {
    try {
      await axios.delete('https://backnodecisneros.onrender.com/removeNoticia', { data: { id } });
      setNoticias(noticias.filter(noticia => noticia._id !== id));
    } catch (error) {
      console.error('Error deleting noticia:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      handleEditNoticia();
    } else {
      handleAddNoticia();
    }
  };

  const resetForm = () => {
    setTitulo('');
    setSinopsis('');
    setCuerpoNoticia('');
    setImagen('');
    setEditando(false);
    setIdNoticia(null);
  };

  const selectForEdit = (noticia) => {
    setTitulo(noticia.titulo);
    setSinopsis(noticia.sinopsis);
    setCuerpoNoticia(noticia.cuerpoNoticia);
    setImagen(noticia.imagen);
    setEditando(true);
    setIdNoticia(noticia._id);
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Sinopsis"
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
          required
        />
        <textarea
          placeholder="Cuerpo de la noticia"
          value={cuerpoNoticia}
          onChange={(e) => setCuerpoNoticia(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          required
        />
        <button type="submit">{editando ? 'Editar Noticia' : 'Agregar Noticia'}</button>
        {editando && <button type="button" onClick={resetForm}>Cancelar Edición</button>}
      </form>

      <div className="noticias-list">
        {noticias.map(noticia => (
          <div key={noticia._id} className="noticia-item">
            <h2>{noticia.titulo}</h2>
            <p>{noticia.sinopsis}</p>
            <button onClick={() => selectForEdit(noticia)}>Editar</button>
            <button onClick={() => handleDeleteNoticia(noticia._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
