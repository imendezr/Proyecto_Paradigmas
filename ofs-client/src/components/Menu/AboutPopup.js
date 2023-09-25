import React from 'react';

const AboutPopup = ({isPopupOpen, closePopup, aboutInfo}) =>
    isPopupOpen && (
        <div className="popupBackground">
            <div className="popupContent">
                <button className="closeButton" onClick={closePopup}>Cerrar</button>
                <h4>Integrantes del equipo:</h4>
                {aboutInfo?.aboutInfo?.map(member => (
                    <div key={member.cedula} className="memberDetails">
                        <p><strong>Nombre:</strong> {member.nombre}</p>
                        <p><strong>Cédula:</strong> {member.cedula}</p>
                        <p><strong>Curso:</strong> {member.curso}</p>
                        <p><strong>Horario:</strong> {member.horario}</p>
                        <p><strong>Proyecto:</strong> {member.proyecto}</p>
                        <p><strong>Semestre:</strong> {member.semestre}</p>
                        <p><strong>Año:</strong> {member.annio}</p>
                        <p><strong>Escuela:</strong> {member.escuela}</p>
                        <p><strong>Universidad:</strong> {member.universidad}</p>
                        <h4></h4>
                    </div>
                ))}
            </div>
        </div>
    );

export default AboutPopup;
