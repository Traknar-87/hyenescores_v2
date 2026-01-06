# 🎯 HyeneScores - État du Projet

> **Dernière mise à jour** : 2026-01-06
> **Repository actif** : hyenescores_v2
> **Déploiement** : Vercel (https://hyenescores-v2.vercel.app)

---

## 📊 État des Pages

| Page | CSS Legacy | Design System v4 | Status |
|------|------------|------------------|--------|
| **Classement** | ✅ | 🔄 Migration | En cours |
| **Match** | ✅ | 🔄 Migration | En cours |
| **Palmarès** | ✅ | 🔄 Migration | En cours |
| **Panthéon** | ✅ | 🔄 Migration | En cours |

---

## 🎨 Design System v4.0 (NOUVEAU)

### Architecture fichiers
```
src/
├── index.css           # CSS legacy (à migrer progressivement)
├── design-system.css   # ✨ NOUVEAU: Composants unifiés ds-*
└── main.tsx            # Import des deux CSS
```

### Tokens CSS (variables)
```css
/* Couleurs */
--ds-color-cyan: #00d9ff
--ds-color-green: #00ff88
--ds-color-gold: #FFB830
--ds-color-orange: #ff9933
--ds-color-red: #ff4444
--ds-color-pink: #ff3366
--ds-color-bg: #000000

/* Hauteurs fixes */
--ds-height-title: 56px
--ds-height-filter: 48px
--ds-height-table-header: 36px
--ds-height-table-row: 44px
--ds-height-badge: 26px
--ds-height-footer: 40px
--ds-height-bottom-nav: 70px

/* Espacements */
--ds-space-3: 12px (gap standard)
--ds-radius-md: 10px (border-radius standard)
```

### Composants disponibles (prefixe ds-*)
| Composant | Classe CSS | Description |
|-----------|------------|-------------|
| Page Container | `.ds-page` | Container flex avec gap 12px |
| Page Title | `.ds-page-title` | Titre 56px avec glow |
| Filter Bar | `.ds-filter-bar` | Barre de filtres 48px |
| Filter Item | `.ds-filter-item` | Item de filtre |
| Progress | `.ds-progress` | Indicateur circulaire |
| Card | `.ds-card` | Container glassmorphism |
| Table | `.ds-table` | Tableau standardisé |
| Badge | `.ds-badge` | Badge position (gold/green/cyan/orange/red) |
| Season Badge | `.ds-season-badge` | Badge saison Palmarès |
| Footer Bar | `.ds-footer-bar` | Barre Caviste/Exempt |
| Match Row | `.ds-match-row` | Ligne de match |
| Bottom Nav | `.ds-bottom-nav` | Navigation bottom fixe |

### Badges par position
| Position | Classe | Couleur |
|----------|--------|---------|
| 1 | `.ds-badge.gold` | Gold #FFB830 |
| 2-3 | `.ds-badge.green` | Green #00ff88 |
| 4-7 | `.ds-badge.cyan` | Cyan #00d9ff |
| 8-9 | `.ds-badge.orange` | Orange #ff9933 |
| 10 | `.ds-badge.red` | Red #ff4444 |

---

## 📁 Structure Fichiers Clés

```
hyenescores_v2/
├── docs/
│   └── mockups/
│       ├── hyenescores-maquette-v3.0-final.html
│       ├── hyenescores-maquette-v3.1-corrections.html
│       └── hyenescores-design-system-v4.0.html  ← NOUVEAU
├── public/
│   ├── manifest.json    # PWA config
│   └── icon-*.png       # Icônes PWA
├── src/
│   ├── index.css        # CSS legacy 43KB
│   ├── design-system.css # ✨ DS v4.0 14KB
│   ├── main.tsx         # Entry point
│   ├── pages/
│   │   ├── Index.tsx    # Classement
│   │   ├── Match.tsx    # Match
│   │   ├── Palmares.tsx # Palmarès
│   │   └── Pantheon.tsx # Panthéon
│   └── components/
│       └── BottomNav.tsx
├── index.html           # PWA meta tags
├── vercel.json          # SPA routing
└── PROJECT_STATUS.md
```

---

## 🚀 Prochaines Étapes

### Phase 1 : Migration Design System (En cours)
- [ ] Migrer Classement vers classes ds-*
- [ ] Migrer Match vers classes ds-*
- [ ] Migrer Palmarès vers classes ds-*
- [ ] Migrer Panthéon vers classes ds-*
- [ ] Supprimer CSS legacy obsolète

### Phase 2 : Données
- [ ] Créer fichiers JSON de données
- [ ] Connecter les pages aux données
- [ ] Import/Export fonctionnel

### Phase 3 : Fonctionnalités
- [ ] Pages Stats et Réglages
- [ ] Persistance localStorage
- [ ] Animations/transitions

---

## 📜 Historique des Commits Récents

| Date | SHA | Message |
|------|-----|---------|
| 2026-01-06 | 64fd10a | 🎨 Import Design System v4.0 in main.tsx |
| 2026-01-06 | 562ac4d | 🎨 Add Design System v4.0 CSS components |
| 2026-01-06 | e037ee3 | 📐 Add Design System v4.0 mockup |
| 2026-01-06 | 46b94d1 | 📱 Add PWA icons for iOS home screen |
| 2026-01-06 | 445d930 | 🎨 Fix Palmarès background → #000000 |

---

## 💡 Guide Migration vers DS v4.0

Pour migrer une page :

1. Remplacer le container par `.ds-page`
2. Utiliser `.ds-page-title` pour le titre
3. Utiliser `.ds-filter-bar` + `.ds-filter-item` pour les filtres
4. Utiliser `.ds-card` + `.ds-table` pour les tableaux
5. Utiliser `.ds-badge.{color}` pour les badges
6. Utiliser `.ds-footer-bar` pour Caviste/Exempt

**Exemple :**
```tsx
// Avant
<div className="palmares-page">
  <div className="palmares-title-glass">...</div>
  
// Après
<div className="ds-page">
  <div className="ds-page-title">...</div>
```

---

*Ce fichier est ta source de vérité. Référence-le au début de chaque session Claude.*
