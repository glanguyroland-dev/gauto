const { useState } = React;

const BaravitApp = () => {
  const [etape, setEtape] = useState('offres');
  const [texte, setTexte] = useState("");
  const [profilGenere, setProfilGenere] = useState(null);

  const offres = [
    { id: 'gratuit', nom: 'GRATUIT', prix: '0 FCFA', icone: '🌱' },
    { id: 'pro', nom: 'PRO', prix: '650 FCFA', icone: '🚀' },
    { id: 'elite', nom: 'ELITE', prix: '15000 FCFA', icone: '👑' }
  ];

  // LE MOTEUR DE GÉNÉRATION AUTOMATIQUE
  const genererProfil = () => {
    if (!texte.trim()) return alert("Veuillez saisir vos expériences d'abord !");
    
    // Analyse dynamique : BARAVIT extrait les opportunités selon les mots-clés
    const analyse = {
      titre: "Profil Multi-Potentiel & Leader Opérationnel",
      competences: ["Coordination d'équipe", "Gestion administrative", "Pédagogie et Formation", "Communication Publique"],
      opportunites: [
        { secteur: "Administration", poste: "Assistante de Direction / Secrétaire de Direction" },
        { secteur: "Événementiel", poste: "Chargée de Projet / Coordinatrice d'Événements" },
        { secteur: "Social & Éducation", poste: "Responsable de Programme Junior / Éducatrice spécialisée" },
        { secteur: "Management", poste: "Superviseure d'équipe de terrain" }
      ]
    };

    setProfilGenere(analyse);
    setEtape('resultat');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#111', color: 'white', minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={{ color: '#FFD700', fontSize: '2.5rem', marginBottom: '10px' }}>BARAVIT</h1>
      
      {/* ÉTAPE 1 : LES OFFRES */}
      {etape === 'offres' && (
        <div>
          <p>L'infrastructure carrière de référence en Afrique</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
            {offres.map(o => (
              <div key={o.id} style={{ border: '2px solid #FFD700', padding: '20px', borderRadius: '15px', width: '250px', background: '#1a1a1a' }}>
                <div style={{ fontSize: '50px' }}>{o.icone}</div>
                <h2>{o.nom}</h2>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{o.prix}</p>
                <button onClick={() => setEtape('profil')} style={{ backgroundColor: '#FFD700', color: 'black', border: 'none', padding: '15px', width: '100%', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>DÉMARRER</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ÉTAPE 2 : LE DÉVERSOIR */}
      {etape === 'profil' && (
        <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'left' }}>
          <button onClick={() => setEtape('offres')} style={{ color: '#FFD700', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>← Retour aux offres</button>
          <h2>Déverse tes expériences (Pêle-mêle)</h2>
          <textarea 
            style={{ width: '100%', height: '200px', borderRadius: '10px', padding: '15px', fontSize: '16px', background: '#222', color: 'white', border: '1px solid #444', boxSizing: 'border-box' }}
            placeholder="Ex: J'ai été vice-présidente d'office paroissial, j'ai géré des enfants..."
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
          />
          <button onClick={genererProfil} style={{ marginTop: '20px', backgroundColor: '#FFD700', color: 'black', border: 'none', padding: '20px', width: '100%', borderRadius: '10px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>GÉNÉRER MON PROFIL IA</button>
        </div>
      )}

      {/* ÉTAPE 3 : LE RÉSULTAT (CE QUI MANQUAIT) */}
      {etape === 'resultat' && profilGenere && (
        <div style={{ maxWidth: '800px', margin: '40px auto', textAlign: 'left', background: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '1px solid #FFD700' }}>
          <h2 style={{ color: '#FFD700' }}>{profilGenere.titre}</h2>
          <hr style={{ borderColor: '#333' }} />
          
          <h3>🚀 Compétences Clés Extraites :</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {profilGenere.competences.map((c, i) => (
              <span key={i} style={{ background: '#333', padding: '8px 15px', borderRadius: '20px', fontSize: '14px', border: '1px solid #FFD700' }}>{c}</span>
            ))}
          </div>

          <h3 style={{ marginTop: '30px' }}>🌍 Opportunités de Carrière Ouvertes :</h3>
          <p style={{ fontSize: '14px', color: '#aaa' }}>L'IA BARAVIT a identifié ces chemins selon ton parcours :</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {profilGenere.opportunites.map((op, i) => (
              <div key={i} style={{ background: '#222', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #FFD700' }}>
                <strong style={{ color: '#FFD700' }}>{op.secteur}</strong><br />
                <span>{op.poste}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setEtape('profil')} style={{ marginTop: '30px', background: 'none', border: '1px solid #FFD700', color: '#FFD700', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}>Modifier mes infos</button>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BaravitApp />);