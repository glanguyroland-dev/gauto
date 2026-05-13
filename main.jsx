const { useState } = React;

const BaravitApp = () => {
  const [etape, setEtape] = useState('offres');
  const [texte, setTexte] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultats, setResultats] = useState([]);

  // Simulation d'un moteur de recherche réel (Scraping)
  const scrapperOffres = () => {
    if (texte.length < 20) return;
    setLoading(true);
    
    // Ici, le code est prêt pour une API type Google Jobs ou LinkedIn
    setTimeout(() => {
      const baseOffres = [
        { id: 1, poste: "Chef de Rayon / Gérant", entreprise: "Prosuma", ville: "Abidjan", match: 94, tags: ["vente", "stock", "gérant"] },
        { id: 2, poste: "Chargé de Clientèle", entreprise: "Orange CI", ville: "Plateau", match: 89, tags: ["client", "vente", "service"] },
        { id: 3, poste: "Assistant de Direction", entreprise: "Cabinet Juridique", ville: "Cocody", match: 92, tags: ["secrétaire", "admin", "pco"] },
        { id: 4, poste: "Superviseur Logistique", entreprise: "Bolloré", ville: "Vridi", match: 85, tags: ["logistique", "responsable"] }
      ];

      const match = baseOffres.filter(o => o.tags.some(t => texte.toLowerCase().includes(t)));
      setResultats(match);
      setLoading(false);
      setEtape('resultat');
    }, 3000);
  };

  const s = {
    body: { backgroundColor: '#000', color: '#fff', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', padding: '20px' },
    card: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '30px', marginBottom: '20px' },
    btn: { background: '#fff', color: '#000', border: 'none', padding: '14px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', width: '100%' },
    input: { width: '100%', background: 'transparent', border: '1px solid #333', borderRadius: '12px', padding: '20px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }
  };

  return (
    <div style={s.body}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ letterSpacing: '-1px', fontSize: '24px' }}>BARAVIT</h1>
        </header>

        {/* 1. CHOIX DU PLAN */}
        {etape === 'offres' && (
          <div>
            <h2 style={{ fontSize: '32px', textAlign: 'center', marginBottom: '40px' }}>Prêt pour l'étape suivante ?</h2>
            {['GRATUIT', 'PRO', 'ELITE'].map(p => (
              <div key={p} style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Plan {p}</h3>
                  <button onClick={() => setEtape('dump')} style={{ ...s.btn, width: 'auto' }}>Choisir</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. LE DÉVERSOIR */}
        {etape === 'dump' && (
          <div>
            <h2 style={{ marginBottom: '10px' }}>Votre parcours.</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>Écrivez librement. Notre IA s'occupe du reste.</p>
            <textarea 
              style={s.input} 
              rows="10" 
              placeholder="Ex: J'ai géré une boutique pendant 2 ans à Treichville..." 
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
            />
            <button onClick={scrapperOffres} style={{ ...s.btn, marginTop: '20px' }}>
              {loading ? "Recherche d'offres réelles..." : "Trouver mes opportunités"}
            </button>
          </div>
        )}

        {/* 3. LES OFFRES RÉELLES MATCHÉES */}
        {etape === 'resultat' && (
          <div>
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
              <h2>Offres détectées</h2>
              <button onClick={() => setEtape('dump')} style={{ background: 'none', color: '#666', border: 'none', cursor: 'pointer' }}>Modifier</button>
            </div>
            {resultats.map(r => (
              <div key={r.id} style={s.card}>
                <div style={{ color: '#00ff00', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>{r.match}% MATCH</div>
                <h3 style={{ margin: '0 0 5px' }}>{r.poste}</h3>
                <div style={{ color: '#666', marginBottom: '20px' }}>{r.entreprise} • {r.ville}</div>
                <button onClick={() => alert("Génération du CV IA pour cette offre...")} style={s.btn}>Postuler</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BaravitApp />);