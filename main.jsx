const { useState, useEffect } = React;

const BaravitApp = () => {
  const [etape, setEtape] = useState('offres');
  const [texte, setTexte] = useState("");
  const [chargement, setChargement] = useState(false);
  const [analyse, setAnalyse] = useState(null);

  // Simulation d'une IA fluide (Onboarding Premium)
  const demarrerAnalyse = () => {
    if (texte.length < 15) return alert("Détaillez un peu plus pour une précision IA optimale.");
    setChargement(true);
    setTimeout(() => {
      const t = texte.toLowerCase();
      let opportunites = [];
      
      // Moteur de mapping dynamique
      if (t.includes("vente") || t.includes("gérant") || t.includes("caisse")) {
        opportunites.push({ s: "Business & Retail", p: "Manager de Point de Vente", desc: "Optimisation de CA et gestion d'équipe." });
      }
      if (t.includes("enfant") || t.includes("école") || t.includes("église") || t.includes("pastorale")) {
        opportunites.push({ s: "Social & Education", p: "Coordinateur de Programmes Jeunesse", desc: "Ingénierie pédagogique et médiation." });
      }
      if (t.includes("secrétaire") || t.includes("admin") || t.includes("pco")) {
        opportunites.push({ s: "Operations", p: "Office Manager / Project Lead", desc: "Pilotage administratif et logistique." });
      }
      
      if (opportunites.length === 0) {
        opportunites.push({ s: "Stratégie", p: "Consultant Opérationnel", desc: "Adaptabilité et polyvalence métier." });
      }

      setAnalyse(opportunites);
      setChargement(false);
      setEtape('resultat');
    }, 2000); // Effet de réflexion IA
  };

  // Styles Hyper Pro
  const styles = {
    container: { backgroundColor: '#050505', color: '#E0E0E0', minHeight: '100vh', fontFamily: "'Inter', sans-serif", padding: '40px 20px' },
    card: { background: 'linear-gradient(145deg, #111, #080808)', border: '1px solid #222', borderRadius: '24px', padding: '32px', transition: 'all 0.3s ease' },
    goldBtn: { backgroundColor: '#FFD700', color: '#000', border: 'none', padding: '16px 32px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '16px', letterSpacing: '0.5px' },
    input: { width: '100%', background: '#0f0f0f', border: '1px solid #333', borderRadius: '16px', padding: '20px', color: '#fff', fontSize: '16px', outline: 'none', focus: { borderColor: '#FFD700' } }
  };

  return (
    <div style={styles.container}>
      {/* HEADER CORPORATE */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 60px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-1px' }}>BARA<span style={{ color: '#FFD700' }}>VIT</span>.</h1>
        <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px' }}>Infrastructure Carrière AI</div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* ÉTAPE 1 : ONBOARDING PREMIUM */}
        {etape === 'offres' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>Propulsez votre talent.</h2>
            <p style={{ color: '#888', marginBottom: '50px', fontSize: '18px' }}>Choisissez votre niveau d'accélération pour le marché africain.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {['GRATUIT', 'PRO', 'ELITE'].map((nom, i) => (
                <div key={nom} style={styles.card}>
                  <div style={{ color: '#FFD700', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>{i === 1 ? 'RECOMMANDÉ' : 'PLAN'}</div>
                  <h3 style={{ fontSize: '24px', margin: '0 0 15px' }}>{nom}</h3>
                  <div style={{ fontSize: '32px', fontWeight: '900', marginBottom: '30px' }}>{nom === 'GRATUIT' ? '0' : nom === 'PRO' ? '650' : '15.000'}<span style={{ fontSize: '14px', color: '#666' }}> FCFA</span></div>
                  <button onClick={() => setEtape('profil')} style={styles.goldBtn}>Sélectionner</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : LE DÉVERSOIR (DUMP) */}
        {etape === 'profil' && (
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '10px' }}>Intelligence Déversée.</h2>
            <p style={{ color: '#888', marginBottom: '30px' }}>Ne structurez rien. Écrivez tout. Notre IA extrait votre génie.</p>
            <textarea 
              style={styles.input} 
              rows="8" 
              placeholder="Décrivez vos jobs, vos engagements, vos succès paroissiaux, vos ventes..." 
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
            />
            <button 
              onClick={demarrerAnalyse} 
              style={{ ...styles.goldBtn, width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              {chargement ? "Calcul des opportunités..." : "Générer mon infrastructure carrière"}
            </button>
          </div>
        )}

        {/* ÉTAPE 3 : RÉSULTAT ÉLITE */}
        {etape === 'resultat' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
              <div>
                <h2 style={{ fontSize: '40px', margin: '0' }}>Votre Matrice de Valeur</h2>
                <p style={{ color: '#FFD700' }}>Analyse prédictive terminée.</p>
              </div>
              <button onClick={() => setEtape('offres')} style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>Réinitialiser</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
              {analyse.map((item, i) => (
                <div key={i} style={{ ...styles.card, borderLeft: '4px solid #FFD700' }}>
                  <div style={{ color: '#FFD700', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>{item.s}</div>
                  <h4 style={{ fontSize: '22px', margin: '0 0 10px' }}>{item.p}</h4>
                  <p style={{ color: '#888', fontSize: '15px', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '50px', padding: '30px', borderRadius: '20px', background: '#111', textAlign: 'center' }}>
              <p style={{ margin: '0 0 20px', color: '#888' }}>Prêt à transformer ces opportunités en contrat ?</p>
              <button style={{ ...styles.goldBtn, background: 'none', color: '#FFD700', border: '1px solid #FFD700' }}>Télécharger mon CV Stratégique (PDF)</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BaravitApp />);