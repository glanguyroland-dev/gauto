import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Connexion sécurisée à ta base BARAVIT
const SUPABASE_URL = "https://vzbcxppfytpfpfxxpunv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6YmN4cHBmeXRwZnBmeHhwdW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2ODcxODQsImV4cCI6MjA5NDI2MzE4NH0.xnOns0uXW3s7y6ovqtihS-NX1UtW4_2FAqatwaI5j0s";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const BaravitApp = () => {
  const [experienceBrute, setExperienceBrute] = useState("");
  const [etape, setEtape] = useState('offres');

  const offres = [
    { id: 'gratuit', nom: 'GRATUIT', prix: '0', icone: '🌱', details: ['3 analyses/mois', '1 CV/mois', 'Verdict IA'] },
    { id: 'pro', nom: 'PRO', prix: '650', icone: '🚀', details: ['10 CV/mois', 'Lettres de motivation', 'Coaching entretien'] },
    { id: 'elite', nom: 'ELITE', prix: '15000', icone: '👑', details: ['Bilingue FR/EN', 'Optimisation LinkedIn', 'Accompagnement Premium'] }
  ];

  const lancerPaiement = (offre) => {
    if (offre.prix === '0') { setEtape('profil'); return; }
    if (window.CinetPay) {
      window.CinetPay.setConfig({ apikey: 'TON_API_KEY', site_id: 'TON_SITE_ID', notify_url: 'https://gauto-kappa.vercel.app/api/notif' });
      window.CinetPay.getCheckout({
        transaction_id: "BARA-" + Math.floor(Math.random() * 100000000),
        amount: parseInt(offre.prix),
        currency: 'XOF',
        designation: `Abonnement BARAVIT ${offre.nom}`
      });
    } else { alert("Chargement du paiement..."); }
  };

  const sauvegarderProfil = async () => {
    if (!experienceBrute) return alert("Écris tes expériences d'abord !");
    const { error } = await supabase.from('profils').insert([{ contenu_brut: experienceBrute, date_creation: new Date() }]);
    if (error) alert("Erreur : " + error.message);
    else alert("Succès ! L'IA prépare ton profil.");
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#FFD700' }}>BARAVIT</h1>
      {etape === 'offres' ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {offres.map(o => (
            <div key={o.id} style={{ border: '1px solid #333', padding: '20px', borderRadius: '15px', width: '250px', background: '#1a1a1a' }}>
              <h2>{o.icone} {o.nom}</h2>
              <p style={{ color: '#FFD700', fontSize: '20px' }}>{o.prix} FCFA</p>
              <button onClick={() => lancerPaiement(o)} style={{ backgroundColor: '#FFD700', padding: '10px', width: '100%', borderRadius: '5px', cursor: 'pointer' }}>Choisir</button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
          <textarea style={{ width: '100%', height: '150px', borderRadius: '10px' }} value={experienceBrute} onChange={(e) => setExperienceBrute(e.target.value)} placeholder="Décris ton parcours ici..." />
          <button onClick={sauvegarderProfil} style={{ marginTop: '10px', backgroundColor: '#FFD700', padding: '15px', width: '100%', borderRadius: '10px' }}>Générer mon profil</button>
        </div>
      )}
    </div>
  );
};

export default BaravitApp;