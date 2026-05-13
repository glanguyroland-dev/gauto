import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Connexion à ta base de données (utilise tes clés .env)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const BaravitApp = () => {
  const [experienceBrute, setExperienceBrute] = useState("");
  const [etape, setEtape] = useState('offres'); // offres, profil, paiement

  // 1. LES OFFRES (Modèle Freemium)
  const offres = [
    { id: 'gratuit', nom: 'GRATUIT', prix: '0', icone: '🌱', details: ['3 analyses d’offres/mois', '1 CV/mois', 'Verdict IA'] },
    { id: 'pro', nom: 'PRO', prix: '650', icone: '🚀', details: ['10 CV/mois', 'Lettres de motivation', 'Coaching entretien', 'Suivi complet'] },
    { id: 'elite', nom: 'ELITE', prix: '15000', icone: '👑', details: ['Tout le contenu PRO', 'Bilingue FR/EN', 'Stratégie carrière', 'Simulation premium'] }
  ];

  // 2. LOGIQUE DE PAIEMENT (CinetPay)
  const lancerPaiement = (offre) => {
    if (offre.prix === '0') {
      setEtape('profil');
      return;
    }
    
    // Intégration CinetPay pour la Côte d'Ivoire
    if (window.CinetPay) {
      window.CinetPay.setConfig({
        apikey: 'TON_API_KEY', // À remplir
        site_id: 'TON_SITE_ID', // À remplir
        notify_url: 'https://votre-site.com/api/notif'
      });

      window.CinetPay.getCheckout({
        transaction_id: "BARA-" + Math.floor(Math.random() * 100000000),
        amount: parseInt(offre.prix),
        currency: 'XOF',
        designation: `Abonnement BARAVIT ${offre.nom}`
      });
    } else {
      alert("Système de paiement en cours de chargement...");
    }
  };

  // 3. LOGIQUE "PROFIL DUMP" (Le déversoir d'expérience)
  const sauvegarderProfilBrut = async () => {
    const { data, error } = await supabase
      .from('profils')
      .insert([{ contenu_brut: experienceBrute, date_creation: new Date() }]);

    if (error) alert("Erreur : " + error.message);
    else alert("Expériences reçues ! L'IA prépare ton profil ultra-compétitif.");
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#FFD700' }}>BARAVIT</h1>
      <p style={{ textAlign: 'center' }}>L'IA au service de votre carrière en Afrique</p>

      {/* AFFICHAGE DES OFFRES */}
      {etape === 'offres' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '40px' }}>
          {offres.map((o) => (
            <div key={o.id} style={{ border: '1px solid #333', padding: '20px', borderRadius: '15px', textAlign: 'center', background: '#1a1a1a' }}>
              <div style={{ fontSize: '40px' }}>{o.icone}</div>
              <h2>{o.nom}</h2>
              <h3 style={{ color: '#FFD700' }}>{o.prix} FCFA {o.id !== 'elite' ? '/ mois' : '/ an'}</h3>
              <ul style={{ textAlign: 'left', fontSize: '14px' }}>
                {o.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
              <button 
                onClick={() => lancerPaiement(o)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#FFD700', fontWeight: 'bold', cursor: 'pointer' }}>
                Choisir cette offre
              </button>
            </div>
          ))}
        </div>
      )}

      {/* INTERFACE DE DÉVERSOIR (PROFIL DUMP) */}
      {etape === 'profil' && (
        <div style={{ maxWidth: '600px', margin: '40px auto' }}>
          <h3>Déverse tes expériences ici (Pêle-mêle)</h3>
          <p style={{ fontSize: '14px', color: '#aaa' }}>Écris tout ce que tu as fait, même tes "petits métiers". L'IA s'occupe de les rendre professionnels.</p>
          <textarea 
            rows="10" 
            style={{ width: '100%', borderRadius: '10px', padding: '10px', background: '#222', color: '#fff', border: '1px solid #444' }}
            placeholder="Ex: J'ai vendu des oranges, j'ai été gérant de cabine, j'ai un BTS en Agriculture..."
            value={experienceBrute}
            onChange={(e) => setExperienceBrute(e.target.value)}
          />
          <button 
            onClick={sauvegarderProfilBrut}
            style={{ marginTop: '20px', width: '100%', padding: '15px', borderRadius: '10px', backgroundColor: '#FFD700', fontWeight: 'bold' }}>
            Générer mon profil compétitif
          </button>
        </div>
      )}
    </div>
  );
};

export default BaravitApp;