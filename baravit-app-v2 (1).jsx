import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuration directe de Supabase
const SUPABASE_URL = "https://vzbcxppfytpfpfxxpunv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6YmN4cHBmeXRwZnBmeHhwdW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2ODcxODQsImV4cCI6MjA5NDI2MzE4NH0.xnOns0uXW3s7y6ovqtihS-NX1UtW4_2FAqatwaI5j0s";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const BaravitApp = () => {
  const [experienceBrute, setExperienceBrute] = useState("");
  const [etape, setEtape] = useState('offres');

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
    
    if (window.CinetPay) {
      window.CinetPay.setConfig({
        apikey: 'TON_API_KEY', 
        site_id: 'TON_SITE_ID',
        notify_url: 'https://gauto-kappa.vercel.app/api/notif'
      });

      window.CinetPay.getCheckout({
        transaction_id: "BARA-" + Math.floor(Math.random() * 100000000),
        amount: parseInt(offre.prix),
        currency: 'XOF',
        designation: `Abonnement BARAVIT ${offre.nom}`
      });
    } else {
      alert("Le système de paiement Mobile Money charge... réessayez dans 3 secondes.");
    }
  };

  // 3. LOGIQUE "PROFIL DUMP"
  const sauvegarderProfilBrut = async () => {
    if (!experienceBrute.trim()) {
        alert("Veuillez écrire vos expériences avant de continuer.");
        return;
    }

    const { data, error } = await supabase
      .from('profils')
      .insert([{ contenu_brut: experienceBrute, date_creation: new Date() }]);

    if (error) {
        alert("Erreur de connexion à la base : " + error.message);
    } else {
        alert("Succès ! Vos expériences ont été envoyées. L'IA génère votre profil...");
    }
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
              <ul style={{ textAlign: 'left', fontSize: '14px', listStyle: 'none', padding: 0 }}>
                {o.details.map((d, i) => <li key={i} style={{ marginBottom: '8px' }}>✅ {d}</li>)}
              </ul>
              <button 
                onClick={() => lancerPaiement(o)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#FFD700', color: '#000', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                Choisir cette offre
              </button>
            </div>
          ))}
        </div>
      )}

      {/* INTERFACE DE DÉVERSOIR (PROFIL DUMP) */}
      {etape === 'profil' && (
        <div style={{ maxWidth: '600px', margin: '40px auto' }}>
          <button onClick={() => setEtape('offres')} style={{ background: 'none', border: 'none', color: '#FFD700', cursor: 'pointer', marginBottom: '10px' }}>← Retour aux offres</button>
          <h3>Déverse tes expériences ici (Pêle-mêle)</h3>
          <p style={{ fontSize: '14px', color: '#aaa' }}>Écris tout ce que tu as fait (jobs, stages, petits métiers). L'IA va tout structurer.</p>
          <textarea 
            rows="10" 
            style={{ width: '100%', borderRadius: '10px', padding: '10px', background: '#222', color: '#fff', border: '1px solid #444', boxSizing: 'border-box' }}
            placeholder="Ex: J'ai été gérant de cabine pendant 2 ans, j'ai aidé à la gestion des stocks..."
            value={experienceBrute}
            onChange={(e) => setExperienceBrute(e.target.value)}
          />
          <button 
            onClick={sauvegarderProfilBrut}
            style={{ marginTop: '20px', width: '100%', padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#FFD700', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>
            Générer mon profil compétitif
          </button>
        </div>
      )}
    </div>
  );
};

export default BaravitApp;