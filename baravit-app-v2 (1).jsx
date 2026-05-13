import React, { useState } from 'react';

const BaravitApp = () => {
  const [etape, setEtape] = useState('offres');
  const [texte, setTexte] = useState("");

  const offres = [
    { id: 'gratuit', nom: 'GRATUIT', prix: '0 FCFA', icone: '🌱' },
    { id: 'pro', nom: 'PRO', prix: '650 FCFA', icone: '🚀' },
    { id: 'elite', nom: 'ELITE', prix: '15000 FCFA', icone: '👑' }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#111', color: 'white', minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={{ color: '#FFD700', fontSize: '3rem' }}>BARAVIT</h1>
      <p>L'infrastructure carrière de référence en Afrique</p>

      {etape === 'offres' ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
          {offres.map(o => (
            <div key={o.id} style={{ border: '2px solid #FFD700', padding: '20px', borderRadius: '15px', width: '250px', background: '#1a1a1a' }}>
              <div style={{ fontSize: '50px' }}>{o.icone}</div>
              <h2>{o.nom}</h2>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{o.prix}</p>
              <button 
                onClick={() => setEtape('profil')}
                style={{ backgroundColor: '#FFD700', color: 'black', border: 'none', padding: '15px', width: '100%', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                DÉMARRER
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'left' }}>
          <button onClick={() => setEtape('offres')} style={{ color: '#FFD700', background: 'none', border: 'none', cursor: 'pointer' }}>← Retour</button>
          <h2>Déverse tes expériences (Pêle-mêle)</h2>
          <textarea 
            style={{ width: '100%', height: '200px', borderRadius: '10px', padding: '15px', fontSize: '16px', border: 'none' }}
            placeholder="Ex: J'ai été gérant de cabine, j'ai vendu des oranges..."
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
          />
          <button 
            onClick={() => alert("Profil en cours de génération par l'IA...")}
            style={{ marginTop: '20px', backgroundColor: '#FFD700', color: 'black', border: 'none', padding: '20px', width: '100%', borderRadius: '10px', fontWeight: 'bold', fontSize: '18px' }}>
            GÉNÉRER MON PROFIL IA
          </button>
        </div>
      )}
    </div>
  );
};

export default BaravitApp;