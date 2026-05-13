import { useState, useEffect } from "react";

// ═══════════════════════════════════════════
// BARAVIT V2 — Le LinkedIn Africain par IA
// Ton emploi, vite.
// ═══════════════════════════════════════════

const T = {
  bg: "#0A0A0F", bg2: "#12121A", bg3: "#1A1A24",
  or: "#C8942A", orClair: "#E8C872", orDim: "rgba(200,148,42,0.12)",
  blanc: "#FAFAF8", gris: "#8A8A94", gris2: "#555",
  vert: "#2ECC71", rouge: "#E74C3C", bleu: "#3498DB",
  border: "rgba(255,255,255,0.08)",
};

// ═══ COMPOSANTS DE BASE ═══
const Card = ({ children, style, onClick, glow }) => (
  <div onClick={onClick} style={{
    background: T.bg2, border: `1px solid ${glow ? T.or : T.border}`,
    borderRadius: 16, padding: 24, transition: "all 0.3s",
    cursor: onClick ? "pointer" : "default", ...style,
  }}>{children}</div>
);

const Btn = ({ children, onClick, v = "primary", style, disabled, full }) => {
  const s = {
    primary: { background: `linear-gradient(135deg, ${T.or}, #A07820)`, color: T.bg, fontWeight: 700 },
    secondary: { background: "transparent", color: T.or, border: `1px solid ${T.or}` },
    ghost: { background: "rgba(255,255,255,0.05)", color: T.gris },
    success: { background: T.vert, color: "#fff", fontWeight: 700 },
    danger: { background: `${T.rouge}20`, color: T.rouge, border: `1px solid ${T.rouge}40` },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "12px 24px", borderRadius: 10, border: "none", fontSize: 14,
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
      fontFamily: "'DM Sans',sans-serif", width: full ? "100%" : "auto",
      transition: "all 0.3s", ...s[v], ...style,
    }}>{children}</button>
  );
};

const Badge = ({ children, color = T.or }) => (
  <span style={{
    display: "inline-block", padding: "4px 12px", borderRadius: 100,
    fontSize: 11, fontWeight: 600, background: `${color}20`,
    color, border: `1px solid ${color}40`,
  }}>{children}</span>
);

const ScoreRing = ({ score }) => {
  const color = score >= 70 ? T.vert : score >= 50 ? T.or : T.rouge;
  const label = score >= 70 ? "FONCE" : score >= 50 ? "POSSIBLE" : "PASSE";
  const emoji = score >= 70 ? "🟢" : score >= 50 ? "🟡" : "🔴";
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%", border: `4px solid ${color}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        margin: "0 auto 8px",
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, color }}>{Math.round(score)}%</div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color }}>{emoji} {label}</div>
    </div>
  );
};

// ═══ TEMPLATES CV ═══
const CV_TEMPLATES = [
  { id: "executive", name: "Executive", desc: "Noir + Or · Direction, DG, haut niveau", colors: ["#111", "#B8922A"], icon: "👔" },
  { id: "corporate", name: "Corporate", desc: "Bleu marine · Banques, multinationales", colors: ["#1A365D", "#4A90D9"], icon: "🏢" },
  { id: "modern", name: "Modern", desc: "Design aéré · Startups, tech, marketing", colors: ["#2D3436", "#00B894"], icon: "🚀" },
  { id: "juridique", name: "Juridique", desc: "Bordeaux + noir · Cabinets, droit", colors: ["#1A1A2E", "#8B1A1A"], icon: "⚖️" },
  { id: "minimal", name: "Minimal", desc: "Noir et blanc · ONG, institutions", colors: ["#000000", "#666666"], icon: "📄" },
  { id: "bilingue", name: "Bilingue", desc: "Double colonne FR/EN · International", colors: ["#0D1B2A", "#E0A825"], icon: "🌍" },
];

// ═══ SIDEBAR ═══
const Sidebar = ({ page, setPage, hasProfile }) => {
  const items = [
    { id: "home", icon: "⚡", label: "Accueil" },
    { id: "profil", icon: "👤", label: "Mon Profil" },
    { id: "analyser", icon: "🎯", label: "Analyser une offre" },
    { id: "candidatures", icon: "📋", label: "Mes candidatures" },
    { id: "coaching", icon: "🎤", label: "Coaching entretien" },
  ];
  return (
    <nav style={{
      width: 230, minHeight: "100vh", background: T.bg2,
      borderRight: `1px solid ${T.border}`, padding: "24px 16px",
      position: "fixed", left: 0, top: 0, zIndex: 100,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: T.or }}>BARAVIT</div>
        <div style={{ fontSize: 11, color: T.gris, marginTop: 2 }}>Ton emploi, vite.</div>
      </div>
      {items.map(it => (
        <div key={it.id} onClick={() => { if (it.id !== "profil" && it.id !== "home" && !hasProfile) { setPage("profil"); } else { setPage(it.id); }}}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 16px", borderRadius: 10, marginBottom: 4,
            cursor: "pointer", transition: "all 0.2s",
            background: page === it.id ? T.orDim : "transparent",
            color: page === it.id ? T.or : T.gris,
            fontWeight: page === it.id ? 600 : 400, fontSize: 14,
          }}>
          <span style={{ fontSize: 18 }}>{it.icon}</span>{it.label}
        </div>
      ))}
      <div style={{ marginTop: "auto", padding: 14, background: T.bg3, borderRadius: 12, fontSize: 11 }}>
        <div style={{ color: T.or, fontWeight: 700, marginBottom: 6 }}>100% GRATUIT</div>
        <div style={{ color: T.gris, lineHeight: 1.6 }}>Analyse illimitée · CV illimités · Coaching illimité</div>
      </div>
    </nav>
  );
};

// ═══ PAGE ACCUEIL ═══
const PageHome = ({ setPage, hasProfile, stats }) => (
  <div>
    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
      Bienvenue sur <span style={{ color: T.or }}>BARAVIT</span> 👋
    </h1>
    <p style={{ color: T.gris, marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
      Ton agent IA de carrière. Colle une offre, obtiens un verdict instantané et une candidature complète en 60 secondes.
    </p>

    {!hasProfile && (
      <Card glow style={{ marginBottom: 32, textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>👤</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Commence par créer ton profil</h2>
        <p style={{ color: T.gris, marginBottom: 20, fontSize: 14 }}>
          Écris tout ce que tu as fait en vrac — l'IA structure tout pour toi.
        </p>
        <Btn onClick={() => setPage("profil")}>Créer mon profil →</Btn>
      </Card>
    )}

    {hasProfile && (
      <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Candidatures générées", value: stats.candidatures, icon: "📄", color: T.or },
            { label: "Entretiens obtenus", value: stats.entretiens, icon: "🎤", color: T.vert },
            { label: "Offres analysées", value: stats.analyses, icon: "🔍", color: T.bleu },
          ].map((s, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: s.color, fontFamily: "'Playfair Display',serif" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: T.gris, marginTop: 4 }}>{s.label}</div>
                </div>
                <div style={{ fontSize: 36 }}>{s.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        <Card glow style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Tu as trouvé une offre ?</h2>
          <p style={{ color: T.gris, marginBottom: 20, fontSize: 14 }}>
            Colle-la ici. En 5 secondes tu sais si elle est pour toi. En 60 secondes ta candidature est prête.
          </p>
          <Btn onClick={() => setPage("analyser")} style={{ fontSize: 16, padding: "16px 40px" }}>Analyser une offre →</Btn>
        </Card>
      </>
    )}
  </div>
);

// ═══ PAGE PROFIL — DUMP LIBRE ═══
const PageProfil = ({ profil, setProfil, profilStructure, setProfilStructure, template, setTemplate, setPage }) => {
  const [dump, setDump] = useState(profil || "");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(!!profilStructure);

  const handleAnalyse = async () => {
    if (dump.length < 50) { alert("Écris un peu plus sur ton parcours — au moins quelques lignes."); return; }
    setLoading(true);

    // Simulation IA — en prod ce sera un appel API Claude
    await new Promise(r => setTimeout(r, 3000));

    const structured = {
      nom: "Extrait automatiquement",
      titre_pro: "Extrait automatiquement",
      formation: "Extraite automatiquement",
      experience: "Extraite automatiquement",
      competences: ["Extraites", "automatiquement", "par", "IA"],
      postes_cibles: ["Extraits automatiquement"],
      forces: ["Extraites automatiquement"],
      langues: ["Français"],
      resume: "L'IA a analysé ton parcours et structuré ton profil professionnel. En production, ce texte sera un vrai résumé personnalisé basé sur tout ce que tu as écrit.",
    };

    setProfilStructure(structured);
    setProfil(dump);
    setDone(true);
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        👤 Mon Profil
      </h1>

      {!done ? (
        <>
          <p style={{ color: T.gris, marginBottom: 24, fontSize: 14, lineHeight: 1.7 }}>
            Écris tout ce que tu as fait dans ta carrière. En vrac, comme tu veux. Diplômes, expériences, compétences, ce que tu cherches. L'IA structure tout pour toi.
          </p>

          <Card>
            <textarea
              value={dump}
              onChange={e => setDump(e.target.value)}
              placeholder={"Exemple : je m'appelle Konan Marie, j'ai 28 ans, je suis juriste avec un master 2 en droit des affaires de l'UCAO obtenu en 2020. J'ai travaillé 2 ans chez un notaire comme clerc, je faisais les actes, les contrats, les successions. Après j'ai bossé chez Total comme assistante juridique pendant 3 ans — contrats fournisseurs, suivi des litiges, veille juridique. Je parle français et un peu anglais. Je suis à Abidjan et je cherche un poste de juriste ou assistante juridique..."}
              rows={14}
              style={{
                width: "100%", padding: 20, background: "rgba(255,255,255,0.03)",
                border: `1px solid ${T.border}`, borderRadius: 12, color: T.blanc,
                fontSize: 15, fontFamily: "'DM Sans',sans-serif", outline: "none",
                resize: "vertical", lineHeight: 1.8,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
              <span style={{ fontSize: 12, color: dump.length < 50 ? T.rouge : T.vert }}>
                {dump.length} caractères {dump.length < 50 ? "— écris un peu plus" : "✓"}
              </span>
              <Btn onClick={handleAnalyse} disabled={loading || dump.length < 50}>
                {loading ? "🧠 L'IA analyse ton parcours..." : "⚡ Structurer mon profil"}
              </Btn>
            </div>
          </Card>
        </>
      ) : (
        <>
          <p style={{ color: T.gris, marginBottom: 24, fontSize: 14 }}>
            ✅ Ton profil a été structuré par l'IA. Vérifie et choisis ton template de CV.
          </p>

          <Card style={{ marginBottom: 24, borderColor: T.vert + "40" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: T.vert }}>✅ Profil structuré par l'IA</h3>
              <Btn v="ghost" onClick={() => setDone(false)} style={{ fontSize: 11, padding: "6px 12px" }}>Modifier</Btn>
            </div>
            <div style={{ fontSize: 14, color: "#c0c0c8", lineHeight: 1.8 }}>
              {profilStructure.resume}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
              {profilStructure.competences.map((c, i) => <Badge key={i} color={T.bleu}>{c}</Badge>)}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {profilStructure.postes_cibles.map((p, i) => <Badge key={i} color={T.vert}>{p}</Badge>)}
            </div>
          </Card>

          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🎨 Choisis ton template de CV</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
            {CV_TEMPLATES.map(t => (
              <Card key={t.id} onClick={() => setTemplate(t.id)}
                style={{
                  cursor: "pointer", textAlign: "center", padding: 20,
                  borderColor: template === t.id ? T.or : T.border,
                  background: template === t.id ? T.orDim : T.bg2,
                }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: T.gris }}>{t.desc}</div>
                <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 8 }}>
                  {t.colors.map((c, i) => (
                    <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: c, border: "1px solid rgba(255,255,255,0.1)" }} />
                  ))}
                </div>
                {template === t.id && <div style={{ color: T.or, fontSize: 12, fontWeight: 700, marginTop: 8 }}>✓ Sélectionné</div>}
              </Card>
            ))}
          </div>

          <Btn onClick={() => setPage("analyser")} full style={{ fontSize: 16, padding: 18 }}>
            Mon profil est prêt — Analyser une offre →
          </Btn>
        </>
      )}
    </div>
  );
};

// ═══ PAGE ANALYSER UNE OFFRE ═══
const PageAnalyser = ({ profilStructure, template, candidatures, setCandidatures }) => {
  const [offreText, setOffreText] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [result, setResult] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [genResult, setGenResult] = useState(null);

  const handleAnalyse = async () => {
    if (offreText.length < 30) { alert("Colle le texte complet de l'offre."); return; }
    setAnalysing(true); setResult(null); setGenResult(null);

    // Simulation IA — en prod appel Claude API
    await new Promise(r => setTimeout(r, 2500));

    const score = Math.floor(Math.random() * 40) + 55; // 55-95 pour la démo
    setResult({
      score,
      titre: "Titre extrait de l'offre",
      entreprise: "Entreprise extraite",
      verdict: score >= 70 ? "fonce" : score >= 50 ? "possible" : "passe",
      raisons_match: ["Ton niveau d'étude correspond parfaitement", "Ton expérience en coordination est un atout direct", "Tes compétences rédactionnelles matchent les exigences"],
      raisons_ecart: score < 70 ? ["Expérience sectorielle non couverte", "Outil spécifique demandé que tu ne maîtrises pas"] : ["Aucun écart majeur détecté"],
      conseil: score >= 70 ? "Cette offre est faite pour toi. Génère ta candidature maintenant."
        : score >= 50 ? "Tu peux postuler mais prépare-toi à justifier les écarts en entretien."
        : "Cette offre n'est pas adaptée à ton profil. Concentre-toi sur les postes de type assistant exécutif ou juriste.",
    });
    setAnalysing(false);
  };

  const handleGenerer = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 3000));
    setGenResult({
      cv_url: "#",
      lm_url: "#",
      objet: "Candidature au poste de [titre] — [Nom complet]",
      message: "Madame, Monsieur,\n\nVeuillez trouver ci-joint mon dossier de candidature.\n\nMon dossier comprend :\n— Mon CV adapté au poste\n— Ma lettre de motivation\n\nJe reste disponible pour un entretien à votre convenance.\n\nCordialement,\n[Nom complet]\n[Téléphone]\n[Email]",
      email: "recrutement@entreprise.com",
    });
    setCandidatures(prev => [...prev, {
      id: Date.now().toString(),
      titre: result.titre,
      entreprise: result.entreprise,
      score: result.score,
      statut: "prête",
      date: new Date().toLocaleDateString("fr-FR"),
    }]);
    setGenerating(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        🎯 Analyser une offre
      </h1>
      <p style={{ color: T.gris, marginBottom: 24, fontSize: 14 }}>
        Colle le texte de l'offre. L'IA te dit en 5 secondes si c'est pour toi.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: result ? "1fr 1fr" : "1fr", gap: 24 }}>
        <div>
          <Card>
            <textarea
              value={offreText}
              onChange={e => setOffreText(e.target.value)}
              placeholder="Colle ici le texte complet de l'offre d'emploi — description du poste, profil recherché, dossiers de candidature..."
              rows={16}
              style={{
                width: "100%", padding: 16, background: "rgba(255,255,255,0.03)",
                border: `1px solid ${T.border}`, borderRadius: 12, color: T.blanc,
                fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none",
                resize: "vertical", lineHeight: 1.7,
              }}
            />
            <Btn onClick={handleAnalyse} disabled={analysing || offreText.length < 30}
              full style={{ marginTop: 16, fontSize: 15, padding: 16 }}>
              {analysing ? "🧠 Analyse en cours..." : "⚡ Analyser cette offre"}
            </Btn>
          </Card>
        </div>

        {result && (
          <div>
            {/* Score */}
            <Card style={{ marginBottom: 16, borderColor: result.score >= 70 ? T.vert + "40" : result.score >= 50 ? T.or + "40" : T.rouge + "40" }}>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <ScoreRing score={result.score} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{result.titre}</h3>
                  <div style={{ fontSize: 13, color: T.or }}>{result.entreprise}</div>
                  <p style={{ fontSize: 13, color: T.gris, marginTop: 8, lineHeight: 1.6 }}>{result.conseil}</p>
                </div>
              </div>
            </Card>

            {/* Match */}
            <Card style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: T.vert, marginBottom: 8 }}>✅ CE QUI MATCHE</h4>
              {result.raisons_match.map((r, i) => (
                <div key={i} style={{ fontSize: 13, color: "#b0b0b8", padding: "6px 0", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 8 }}>
                  <span style={{ color: T.vert }}>✓</span>{r}
                </div>
              ))}
            </Card>

            {/* Écarts */}
            <Card style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: T.rouge, marginBottom: 8 }}>⚠️ POINTS D'ÉCART</h4>
              {result.raisons_ecart.map((r, i) => (
                <div key={i} style={{ fontSize: 13, color: "#b0b0b8", padding: "6px 0", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 8 }}>
                  <span style={{ color: T.rouge }}>—</span>{r}
                </div>
              ))}
            </Card>

            {/* Générer */}
            {result.verdict !== "passe" && !genResult && (
              <Btn onClick={handleGenerer} disabled={generating} v="success" full style={{ fontSize: 15, padding: 16 }}>
                {generating ? "⏳ Génération CV + LM en cours..." : "⚡ Générer ma candidature complète"}
              </Btn>
            )}

            {result.verdict === "passe" && (
              <Card style={{ background: `${T.rouge}10`, borderColor: `${T.rouge}30` }}>
                <div style={{ textAlign: "center", padding: 16 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🚫</div>
                  <p style={{ color: T.rouge, fontSize: 14, fontWeight: 600 }}>Cette offre n'est pas pour toi.</p>
                  <p style={{ color: T.gris, fontSize: 13, marginTop: 8 }}>Concentre-toi sur les offres qui matchent ton profil — tu mérites mieux.</p>
                </div>
              </Card>
            )}

            {/* Résultat génération */}
            {genResult && (
              <Card style={{ borderColor: T.vert, marginTop: 16 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: T.vert, marginBottom: 16 }}>✅ Candidature prête !</h4>

                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <Btn v="secondary" onClick={() => window.open(genResult.cv_url)} style={{ flex: 1, fontSize: 13 }}>📄 Télécharger CV</Btn>
                  <Btn v="secondary" onClick={() => window.open(genResult.lm_url)} style={{ flex: 1, fontSize: 13 }}>📝 Télécharger LM</Btn>
                </div>

                {genResult.email && (
                  <div style={{ fontSize: 12, color: T.gris, marginBottom: 6 }}>
                    <strong style={{ color: T.blanc }}>À :</strong> {genResult.email}
                  </div>
                )}
                <div style={{ fontSize: 12, color: T.gris, marginBottom: 12 }}>
                  <strong style={{ color: T.blanc }}>Objet :</strong> {genResult.objet}
                </div>

                <div style={{
                  fontSize: 13, color: "#b0b0b8", background: T.bg3, padding: 16,
                  borderRadius: 10, whiteSpace: "pre-wrap", lineHeight: 1.7, marginBottom: 12,
                }}>{genResult.message}</div>

                <Btn v="ghost" full onClick={() => navigator.clipboard.writeText(genResult.message)}
                  style={{ fontSize: 12 }}>
                  📋 Copier le message d'envoi
                </Btn>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ═══ PAGE CANDIDATURES ═══
const PageCandidatures = ({ candidatures, setCandidatures }) => {
  const updateStatut = (id, statut) => {
    setCandidatures(prev => prev.map(c => c.id === id ? { ...c, statut } : c));
  };

  const statuts = {
    prête: { color: T.or, icon: "📄" },
    envoyée: { color: T.bleu, icon: "📤" },
    entretien: { color: T.vert, icon: "🎤" },
    acceptée: { color: "#27AE60", icon: "🎉" },
    refusée: { color: T.rouge, icon: "❌" },
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        📋 Mes candidatures
      </h1>
      <p style={{ color: T.gris, marginBottom: 24, fontSize: 14 }}>
        {candidatures.length} candidatures · Mets à jour les statuts au fur et à mesure
      </p>

      {candidatures.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <p style={{ color: T.gris }}>Aucune candidature. Analyse une offre pour commencer !</p>
        </Card>
      ) : (
        candidatures.map((c, i) => {
          const s = statuts[c.statut] || statuts.prête;
          return (
            <Card key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: 24 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{c.titre}</div>
                    <div style={{ fontSize: 12, color: T.gris }}>{c.entreprise} · {c.date} · Score: {c.score}%</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <select value={c.statut} onChange={e => updateStatut(c.id, e.target.value)}
                    style={{
                      padding: "6px 12px", background: T.bg3, border: `1px solid ${T.border}`,
                      borderRadius: 8, color: s.color, fontSize: 12, fontFamily: "'DM Sans',sans-serif",
                    }}>
                    <option value="prête">📄 Prête</option>
                    <option value="envoyée">📤 Envoyée</option>
                    <option value="entretien">🎤 Entretien</option>
                    <option value="acceptée">🎉 Acceptée</option>
                    <option value="refusée">❌ Refusée</option>
                  </select>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};

// ═══ PAGE COACHING ═══
const PageCoaching = ({ candidatures }) => {
  const [selected, setSelected] = useState(null);
  const [coaching, setCoaching] = useState(null);
  const [loading, setLoading] = useState(false);

  const withEntretien = candidatures.filter(c => c.statut === "entretien" || c.statut === "envoyée");

  const handleCoach = async (c) => {
    setSelected(c); setLoading(true); setCoaching(null);
    await new Promise(r => setTimeout(r, 2500));
    setCoaching(`PRÉSENTATION — 90 SECONDES\n\nJuriste Bac+5, 8 ans d'expérience comme bras droit de décideurs. Promu en 8 mois au sein d'un cabinet ministériel. Mes recommandations stratégiques sont en cours d'implémentation chez nos clients. Je n'exécute pas — j'anticipe, je propose, j'améliore.\n\nPOURQUOI CETTE ENTREPRISE ?\n\nEnvironnement exigeant, poste stratégique, impact direct. C'est exactement ce que je recherche — et j'ai les réalisations concrètes pour le prouver.\n\nFORCE DE PROPOSITION\n\nAu CEP, j'ai réorienté la prospection commerciale sans qu'on me le demande — résultat : réduction significative des coûts. Je ne produis pas des rapports — je produis des changements.\n\nCONFIDENTIALITÉ\n\nAu ministère je gérais des dossiers soumis en Conseil des ministres. Ma règle : ce qui reste dans le bureau du dirigeant reste dans le bureau du dirigeant.\n\nQUESTION À POSER\n\n"Quelles sont vos priorités pour les 30 premiers jours ?"
    `);
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🎤 Coaching entretien</h1>
      <p style={{ color: T.gris, marginBottom: 24, fontSize: 14 }}>
        Sélectionne une candidature. L'IA te prépare des éléments de langage chirurgicaux.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: coaching ? "1fr 1fr" : "1fr", gap: 24 }}>
        <div>
          {withEntretien.length === 0 ? (
            <Card style={{ textAlign: "center", padding: 40 }}>
              <p style={{ color: T.gris }}>Envoie des candidatures d'abord — le coaching se débloque quand tu as des offres en cours.</p>
            </Card>
          ) : (
            withEntretien.map((c, i) => (
              <Card key={i} onClick={() => handleCoach(c)} style={{ marginBottom: 8, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{c.titre}</div>
                    <div style={{ fontSize: 12, color: T.or }}>{c.entreprise}</div>
                  </div>
                  <Btn v="secondary" style={{ fontSize: 11, padding: "6px 12px" }}>Préparer →</Btn>
                </div>
              </Card>
            ))
          )}
        </div>

        {(coaching || loading) && (
          <Card style={{ borderColor: T.or }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: T.or, marginBottom: 16 }}>{selected?.titre} — {selected?.entreprise}</h3>
            {loading ? (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🧠</div>
                <p style={{ color: T.gris }}>Préparation des éléments de langage...</p>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: "#c0c0c8", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{coaching}</div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

// ═══ APP PRINCIPALE ═══
export default function App() {
  const [page, setPage] = useState("home");
  const [profil, setProfil] = useState("");
  const [profilStructure, setProfilStructure] = useState(null);
  const [template, setTemplate] = useState("executive");
  const [candidatures, setCandidatures] = useState([]);

  const hasProfile = !!profilStructure;
  const stats = {
    candidatures: candidatures.length,
    entretiens: candidatures.filter(c => c.statut === "entretien").length,
    analyses: candidatures.length + 3,
  };

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: T.bg, color: T.blanc, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
      <Sidebar page={page} setPage={setPage} hasProfile={hasProfile} />
      <main style={{ marginLeft: 230, padding: "32px 40px", maxWidth: 1100 }}>
        {page === "home" && <PageHome setPage={setPage} hasProfile={hasProfile} stats={stats} />}
        {page === "profil" && <PageProfil profil={profil} setProfil={setProfil} profilStructure={profilStructure} setProfilStructure={setProfilStructure} template={template} setTemplate={setTemplate} setPage={setPage} />}
        {page === "analyser" && <PageAnalyser profilStructure={profilStructure} template={template} candidatures={candidatures} setCandidatures={setCandidatures} />}
        {page === "candidatures" && <PageCandidatures candidatures={candidatures} setCandidatures={setCandidatures} />}
        {page === "coaching" && <PageCoaching candidatures={candidatures} />}
      </main>
    </div>
  );
}
