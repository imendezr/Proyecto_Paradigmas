import React from 'react';

function AboutPopup({isPopupOpen, closePopup, teamDetails}) {
    if (!isPopupOpen) {
        return null;
    }

    const sharedInfo = {
        course: teamDetails.teamMembers[0].course,
        schedule: teamDetails.teamMembers[0].schedule,
        project: teamDetails.teamMembers[0].project,
        semester: teamDetails.teamMembers[0].semester,
        year: teamDetails.teamMembers[0].year,
        school: teamDetails.teamMembers[0].school,
        university: teamDetails.teamMembers[0].university,
    };

    return (
        <div className="popupBackground">
            <div className="popupContent">
                <button className="closeButton" onClick={closePopup}>Cerrar</button>
                <h4>Integrantes:</h4>
                {teamDetails.teamMembers.map(member => (
                    <div key={member.id}>
                        <p>{member.name}</p>
                        <p>Cédula: {member.id}</p>
                    </div>
                ))}
                <h4>Información del equipo:</h4>
                <p>Curso: {sharedInfo.course}</p>
                <p>Horario: {sharedInfo.schedule}</p>
                <p>Proyecto: {sharedInfo.project}</p>
                <p>Semestre: {sharedInfo.semester}</p>
                <p>Año: {sharedInfo.year}</p>
                <p>Escuela: {sharedInfo.school}</p>
                <p>Universidad: {sharedInfo.university}</p>
            </div>
        </div>
    );
}

export default AboutPopup;
