import React from 'react';
import { jsPDF } from 'jspdf';
import './ArticleCard.css';

const ArticleCard = ({ title, description, body, imageUrl, url }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Asegurarse de que title, description y body no sean undefined o null
    const safeTitle = title || 'No Title';
    const safeDescription = description || 'No Description';
    const safeBody = body || 'No Body Content';

    // Configuración de fuente y tamaño para el título
    const margin = 20;
    const lineSpacing = 10;
    let currentHeight = margin;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255); // Azul
    const splitTitle = doc.splitTextToSize(safeTitle, 170 - margin);
    splitTitle.forEach(line => {
      doc.text(line, margin, currentHeight);
      currentHeight += lineSpacing;
    });

    // Configuración de tamaño de fuente para la descripción
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Negro

    // Separar el texto en líneas si es necesario
    const splitDescription = doc.splitTextToSize(safeDescription, 170 - margin); // Ajustar el ancho del texto a 170 unidades menos el margen derecho
    splitDescription.forEach(line => {
      doc.text(line, margin, currentHeight);
      currentHeight += lineSpacing;
    });

    // Configuración de fuente y tamaño para el body
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(12);

    // Margen superior antes del body
    currentHeight += lineSpacing * 2;

    // Separar el texto del body en líneas si es necesario
    const splitBody = doc.splitTextToSize(safeBody, 170 - margin);
    splitBody.forEach(line => {
      doc.text(line, margin, currentHeight);
      currentHeight += lineSpacing;
    });

    doc.save(`${safeTitle}.pdf`);
  };

  return (
    <div className="article-card">
      {imageUrl && <img src={imageUrl} alt="Article" className="article-image" />}
      <div className="article-content">
        <a href={url} className="article-title">{title}</a>
        <p className="article-description">{description}</p>
        <button onClick={generatePDF} className="generate-pdf-button">Generate PDF</button>
      </div>
    </div>
  );
};

export default ArticleCard;
