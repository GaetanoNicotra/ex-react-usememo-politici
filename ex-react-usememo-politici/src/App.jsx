import React from 'react';
import { useState, useEffect, memo, useMemo } from 'react'

function App() {

  const PoliticianCard = React.memo(function PoliticianCard({ p }) {
    console.log('card')
    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card h-100 shadow-sm">
          <img
            src={p.image}
            alt="img-profilo"
            className="card-img-top"
            style={{ height: '250px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <p className="card-text"><strong>Nome:</strong> {p.name}</p>
            <p><strong>Data di nascita:</strong> {p.dob}</p>
            <p className="card-text"><strong>Posizione:</strong> {p.position}</p>
            <p className="card-text"><strong>Biografia:</strong> {p.biography}</p>
            <p className="card-text"><strong>Paese:</strong> {p.country}</p>
          </div>
        </div>
      </div>
    );
  });
  const [politiciInfo, setPoliticiInfo] = useState([]);
  const [serchPolitician, setSerchPolitician] = useState('');

  useEffect(() => {
    fetch('http://localhost:3333/politicians').then(response => response.json())
      .then((data) => { setPoliticiInfo(data) })
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politiciInfo.filter((p) => {
      const name = p.name.toLowerCase().includes(serchPolitician.toLowerCase())
      const description = p.biography.toLowerCase().includes(serchPolitician.toLowerCase())
      return name || description

    });
  }, [politiciInfo, serchPolitician])

  return (
    <>
      <div className="container py-4">
        <header className="mb-4">
          <h1 className="text-center">Lista di Politici</h1>
        </header>
        <div>
          <p>Cerca qui</p>
          <input type="text" placeholder='Cerca per nome o biografia ' name="" id=""
            value={serchPolitician}
            onChange={(e) => setSerchPolitician(e.target.value)} />
        </div>

        <div className="row">
          <div className="row">
            {filteredPoliticians.map((p, i) => (
              <PoliticianCard key={i} p={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App
