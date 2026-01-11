# TASK-004 - Corrections UI Globales v3.1

> **Status** : 🔴 À faire  
> **Priorité** : P1 - Critique  
> **Pages concernées** : Classement, Match, Palmarès, Panthéon  
> **Date création** : 11 janvier 2026

---

## 🎯 Objectif

Corriger les problèmes visuels identifiés sur les 4 pages principales pour garantir :
1. Cohérence visuelle entre Classement et Match (Filter Bar 2 lignes)
2. Visibilité maximale du Caviste (Classement)
3. Validation visuelle claire (Match)
4. Optimisation icônes/textes (Match)
5. Harmonisation typographie (Palmarès/Panthéon)
6. Padding bottom uniforme (Palmarès/Panthéon)

---

## 📋 Problèmes Identifiés

### **Page CLASSEMENT**
- ❌ **Caviste peu visible** : Texte trop discret, se fond dans le design
- ❌ **Barre de progression volumineuse** : Occupe trop d'espace vertical
- ❌ **Objectif non atteint** : Page ne s'affiche pas entièrement sans scroll

### **Page MATCH**
- ❌ **Validation confuse** : Petit rond vert peu visible
- ❌ **Icônes surchargées** : Texte + emoji sur chaque bouton filtre
- ❌ **Espace gaspillé** : Informations redondantes

### **Page PALMARÈS**
- ❌ **Typographie points incohérente** : Nombres trop fins vs autres textes
- ❌ **Tableau collé** : Pas de séparation avec barre de navigation

### **Page PANTHÉON**
- ❌ **Tableau collé** : Même problème que Palmarès

---

## ✅ Solutions Validées

### **1. CLASSEMENT - Filter Bar 2 lignes + Caviste Rouge**

#### Modifications CSS (`src/index.css`)

**Supprimer** les styles actuels de progress (`.ds-progress`, `.ds-progress-circle`, etc.)

**Ajouter** :
```css
/* Filter Bar 2 lignes - Classement */
.ds-filter-bar-2lines {
  background: rgba(0, 217, 255, 0.02);
  border: 1px solid rgba(0, 217, 255, 0.2);
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 12px;
}

/* Ligne 1: Filtres principaux */
.ds-filter-line1 {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 6px;
}

.ds-filter-separator {
  color: rgba(255, 255, 255, 0.3);
  margin: 0 4px;
}

.ds-filter-arrow {
  margin-left: auto;
  opacity: 0.4;
}

/* Ligne 2: Progress bar */
.ds-progress-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 700;
}

.ds-progress-label {
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
}

.ds-progress-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
}

.ds-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d9ff, #00ff88);
  box-shadow: 0 0 6px rgba(0, 217, 255, 0.5);
}

.ds-progress-percent {
  color: #00d9ff;
  font-size: 11px;
  font-weight: 800;
}

/* Caviste ROUGE HIGHLIGHT */
.ds-footer-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 51, 102, 0.1);
  border: 1px solid rgba(255, 51, 102, 0.4);
  border-radius: 10px;
  padding: 8px 12px;
  margin-top: 12px;
}

.ds-footer-bar .label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 9px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
}

.ds-footer-bar .value {
  font-family: 'Rajdhani', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ff3366;
  text-transform: uppercase;
}
```

#### Modifications React (`src/pages/Index.tsx`)

**Remplacer** la section progress actuelle par :

```tsx
{/* Filter Bar - 2 lignes */}
<div className="ds-filter-bar-2lines">
  {/* Ligne 1: Ligue + Saison */}
  <div className="ds-filter-line1">
    <span>🏆</span>
    <span>Ligue des Hyènes</span>
    <span className="ds-filter-separator">|</span>
    <span>Saison 9</span>
    <span className="ds-filter-arrow">▾</span>
  </div>
  
  {/* Ligne 2: Progress */}
  <div className="ds-progress-line">
    <span className="ds-progress-label">J.{currentMatchday}/{totalMatchdays}</span>
    <div className="ds-progress-bar">
      <div 
        className="ds-progress-fill" 
        style={{ width: `${progressPercent}%` }}
      />
    </div>
    <span className="ds-progress-percent">{progressPercent}%</span>
  </div>
</div>
```

**Modifier** le Caviste :
```tsx
{/* Footer Bar - Caviste ROUGE */}
<div className="ds-footer-bar">
  <span className="label">Caviste :</span>
  <span className="value">Gunners</span>
</div>
```

---

### **2. MATCH - Validation Verte + Icônes Optimisées**

#### Modifications CSS (`src/index.css`)

**Modifier** les styles de validation :

```css
/* Validation = Entourage VERT (pas de rond) */
.ds-match-row.validated .ds-team-select {
  border: 2px solid #00ff88;
  color: #00ff88;
  box-shadow: 0 0 8px rgba(0, 255, 136, 0.3);
}

.ds-match-row.validated .ds-score-input {
  background: rgba(0, 255, 136, 0.15);
  border: 2px solid #00ff88;
  color: #00ff88;
  box-shadow: 0 0 8px rgba(0, 255, 136, 0.3);
}

.ds-match-row.validated .ds-vs {
  color: #00ff88;
}

/* Sublabel pour journée */
.ds-filter-item .sublabel {
  font-size: 10px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}
```

#### Modifications React (`src/pages/Match.tsx`)

**Modifier** la Filter Bar (4 segments) :

```tsx
<div className="ds-filter-bar">
  {/* CHAMPIONNAT - Drapeau SEUL */}
  <button className="ds-filter-item stacked active">
    <span className="icon" style={{ fontSize: '28px' }}>{currentChamp?.flag}</span>
  </button>
  
  {/* SAISON - Texte SEUL (pas d'emoji) */}
  <button className="ds-filter-item stacked">
    <span className="label">Saison {season.replace('S', '')}</span>
  </button>
  
  {/* JOURNÉE - Texte adapté (pas de ballon) */}
  <button className="ds-filter-item stacked">
    <span className="label">{journee}</span>
    <span className="sublabel">({validatedCount}/5)</span>
  </button>
  
  {/* IMPORT - Reste identique */}
  <button className="ds-filter-item stacked" style={{ flex: 0.8 }}>
    <span className="icon">📤</span>
    <span className="label">Import</span>
  </button>
</div>
```

**Supprimer** le rond de validation dans le JSX (chercher et supprimer tous les blocs similaires) :
```tsx
{/* RETIRER ce bloc */}
{/* {match.validated && (
  <div className="match-validated-check">✓</div>
)} */}
```

---

### **3. PALMARÈS - Typographie Points + Padding Bottom**

#### Modifications CSS (`src/index.css`)

```css
/* Points en BOLD maximum */
.points-value {
  font-family: 'Rajdhani', sans-serif;
  font-size: 20px;
  font-weight: 900; /* Changé de 800 → 900 */
  color: #00ff88;
  text-shadow: 0 0 12px rgba(0, 255, 136, 0.6);
  line-height: 1;
}

/* Padding bottom pour séparation barre nav */
.palmares-page {
  padding-bottom: 80px;
}

.palmares-table-body {
  max-height: calc(100vh - 240px);
  overflow-y: auto;
  padding-bottom: 16px;
}
```

---

### **4. PANTHÉON - Padding Bottom**

#### Modifications CSS (`src/index.css`)

```css
/* Padding bottom pour séparation barre nav */
.pantheon-page {
  padding-bottom: 80px;
}

.pantheon-table-wrapper {
  padding: 0 16px 16px;
}
```

---

## 📊 Résumé des Fichiers à Modifier

```
src/
├── index.css                      ✏️ Modifié (CSS)
├── pages/
│   ├── Index.tsx                  ✏️ Modifié (Classement)
│   ├── Match.tsx                  ✏️ Modifié (Filter + Validation)
│   ├── Palmares.tsx               ✅ Vérification classe points
│   └── Pantheon.tsx               ✅ Pas de modif React
```

---

## ✅ Checklist Implémentation

### Classement
- [ ] Filter Bar transformée en 2 lignes (Ligue/Saison + Progress)
- [ ] Progress bar compacte (4px hauteur)
- [ ] Caviste avec fond rouge + bordure rouge + texte #ff3366
- [ ] Tableau affiche 10 lignes sans scroll

### Match
- [ ] Championnat = drapeau SEUL (texte supprimé)
- [ ] Saison = "Saison X" SEUL (emoji supprimé)
- [ ] Journée = "J.X" + "(3/5)" sur 2 lignes (ballon supprimé)
- [ ] Validation = entourage vert 2px + fond vert + glow (rond supprimé)
- [ ] Cases validées : border 2px #00ff88

### Palmarès
- [ ] Points en font-weight: 900 (ultra-bold)
- [ ] Padding-bottom 16px sur table-body
- [ ] Page padding-bottom 80px

### Panthéon
- [ ] Padding-bottom 16px sur table-wrapper
- [ ] Page padding-bottom 80px

---

## 🧪 Tests de Validation

### Test 1 : Classement visible sans scroll
1. Ouvrir page Classement sur viewport 390px
2. Vérifier : 10 équipes + caviste visibles sans scroll
3. ✅ Validé si tout visible

### Test 2 : Caviste ultra-visible
1. Scroll vers le bas du Classement
2. Vérifier : Fond rouge + bordure rouge + texte #ff3366
3. ✅ Validé si impossible à manquer

### Test 3 : Match validation claire
1. Valider un match sur page Match
2. Vérifier : Entourage vert 2px + fond vert léger + pas de rond
3. ✅ Validé si changement visuel évident

### Test 4 : Match icônes optimisées
1. Observer Filter Bar Match
2. Vérifier : 🇫🇷 seul | "Saison 9" seul | "J.1 (3/5)" sans emoji
3. ✅ Validé si textes courts et clairs

### Test 5 : Palmarès/Panthéon padding
1. Scroll jusqu'en bas des pages Palmarès et Panthéon
2. Vérifier : Espace visible entre tableau et barre nav
3. ✅ Validé si padding 16px présent

---

## 📸 Screenshots Attendus

Après déploiement Vercel, fournir captures d'écran :

1. **Classement** : Vue complète sans scroll (390px viewport)
2. **Classement** : Zoom sur Caviste rouge
3. **Match** : Filter Bar avec icônes optimisées
4. **Match** : Match validé avec entourage vert (pas de rond)
5. **Palmarès** : Bottom de page avec padding visible
6. **Panthéon** : Bottom de page avec padding visible

---

**Version** : 1.0  
**Dernière mise à jour** : 11 janvier 2026  
**Status** : 🔴 Prêt pour implémentation
