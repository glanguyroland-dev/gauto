const { useState } = React;

const BaravitApp = () => {
  const [etape, setEtape] = useState('offres');
  const [texte, setTexte] = useState("");
  const [chargement, setChargement] = useState(false);
  const [jobsTrouves, setJobsTrouves] = useState([]);

  const chercherOffres = () => {
    if (texte.length < 20) return alert("Détaillez vos expériences pour un matching précis.");
    
    setChargement(true);
    
    // Simulation du Scraping basé sur le profil
    setTimeout(() => {
      const t = texte.toLowerCase();
      let databaseJobs = [
        { id: 1, titre: "Gérant de Boutique", entreprise: "Retail CI", match: 95, keywords: ["vente", "caisse", "stock"] },
        { id: 2, titre: "Assistant Administratif", entreprise: "Groupement Pro", match: 88, keywords: ["secrétaire", "admin", "bureau"] },
        { id: 3, titre: "Coordinateur de Projet Junior", entreprise: "ONG Vision", match: 92, keywords: ["présidente", "responsable", "enfant", "pco"] },
        { id: 4, titre: "Commercial Terrain", entreprise: "Distrib Plus", match: 85, keywords: ["vente", "client"] }
      ];

      // Filtrage par matching intelligent
      const matches = databaseJobs.filter(job => 
        job.keywords.some(key => t.includes(key))
      ).sort((a, b) => b.match - a.match);

      setJobsTrouves(matches);
      setChargement(false);
      setEtape('matching');
    }, 2500); 
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <nav style={{ maxWidth: '800px', margin: '0 auto 40px', textAlign: 'center' }}>
        <h1 style={{ color: '#FFD700', fontSize: '32px' }}>BARAVIT</h1>
        <p style={{ color: '#888' }}>Trouvez l'emploi qui correspond à votre valeur réelle</p>
      </nav>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* ÉTAPE 1 : RÉCUPÉRATION DU PROFIL */}
        {etape === 'offres' && (
          <div style={{ background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Déversez vos expériences ici</h2>
            <textarea 
              style={{ width: '100%', background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '12px', padding: '15px', fontSize: '16px', boxSizing: 'border-box' }}
              rows="8"
              placeholder="Décrivez ce que vous avez fait (ex: J'ai géré une équipe, j'ai fait de la vente...)"
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
            />
            <button 
              onClick={chercherOffres}
              style={{ width: '100%', marginTop: '20px', padding: '18px', backgroundColor: '#FFD700', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
            >
              {chargement ? "Scraping des offres en cours..." : "Lancer le Matching d'Emploi"}
            </button>
          </div>
        )}

        {/* ÉTAPE 2 : AFFICHAGE DES OFFRES SCRAPÉES */}
        {etape === 'matching' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Offres à fort Matching ({jobsTrouves.length})</h2>
              <button onClick={() => setEtape('offres')} style={{ background: 'none', color: '#FFD700', border: 'none', cursor: 'pointer' }}>Modifier profil</button>
            </div>

            {jobsTrouves.length > 0 ? jobsTrouves.map(job => (
              <div key={job.id} style={{ background: '#111', marginBottom: '15px', padding: '20px', borderRadius: '15px', border: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '14px' }}>Match: {job.match}%</div>
                  <h3 style={{ margin: '5px 0' }}>{job.titre}</h3>
                  <div style={{ color: '#888' }}>{job.entreprise}</div>
                </div>
                <button 
                  onClick={() => alert(`Génération du CV spécifique pour le poste de ${job.titre}...`)}
                  style={{ padding: '10px 20px', backgroundColor: 'transparent', border: '1px solid #FFD700', color: '#FFD700', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Postuler avec IA
                </button>
              </div>
            )) : (
              <p style={{ textAlign: 'center', color: '#888' }}>Aucune offre ne correspond parfaitement. Essayez de détailler davantage vos compétences.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BaravitApp />);