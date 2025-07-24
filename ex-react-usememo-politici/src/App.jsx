import { useState, useEffect } from 'react'

function App() {

  const [politiciInfo, setPoliticiInfo] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/politicians').then(response => response.json())
      .then((data) => {
        setPoliticiInfo(data)
      })
  }, []);

  return (
    <>
      <div className="container py-4">
        <header className="mb-4">
          <h1 className="text-center">Lista di Politici</h1>
        </header>
        <div className="row">
          {politiciInfo.map((p, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image}
                  alt="img-profilo"
                  className="card-img-top"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <p className="card-text"><strong>Nome:</strong> {p.name}</p>
                  <p className="card-text"><strong>Posizione:</strong> {p.position}</p>
                  <p className="card-text"><strong>Biografia:</strong> {p.biography}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App
