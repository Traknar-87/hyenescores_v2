# TASK-XXX : [Titre Feature]

> Template pour documenter une nouvelle feature avant implémentation

**Créé le** : [Date]  
**Status** : 🚧 En cours | ✅ Terminé | ❌ Abandonné  
**Priorité** : P1 Critique | P2 Haute | P3 Moyenne | P4 Basse  
**Assigné à** : [Nom ou outil : Lovable | Claude Code | Manuel]

---

## 📋 Contexte

### Pourquoi Cette Feature ?
[Explication du besoin, problème résolu, valeur ajoutée]

### Lien avec Roadmap
[Référence objectifs v3.1 ou futures versions]

---

## 🎨 Mockup Validé

### Description Visuelle
[Description détaillée de l'UI souhaitée]

### Screenshot/Référence
[Lien vers mockup, screenshot comparaison, ou croquis]

### Variant Choisi
[Si plusieurs mockups ont été comparés, indiquer lequel a été sélectionné et pourquoi]

---

## 🎯 Spécifications Fonctionnelles

### Comportement Utilisateur
[Comment l'utilisateur interagit avec la feature]

Exemples :
1. L'utilisateur clique sur [élément]
2. Le système affiche [résultat]
3. L'utilisateur peut [action]

### Données Affichées
[Liste des données à récupérer et afficher]

- Donnée 1 : [source, format]
- Donnée 2 : [source, format]
- ...

### Actions Possibles
- [ ] Action 1 : [description]
- [ ] Action 2 : [description]

---

## 🔧 Spécifications Techniques

### Composants à Créer

```
src/components/
├── FeatureComponent.tsx
│   ├── Props : [liste]
│   ├── State : [liste]
│   └── Logique : [description]
│
└── ui/
    └── SubComponent.tsx (si nécessaire)
```

### Fichiers à Modifier

- [ ] `src/pages/PageName.tsx` (intégration)
- [ ] `src/index.css` (si styles globaux)
- [ ] Autre : ...

### Types TypeScript

```typescript
// Interfaces/Types nécessaires
interface FeatureProps {
  prop1: string;
  prop2: number;
  onAction?: () => void;
}

interface FeatureData {
  id: string;
  name: string;
  // ...
}
```

### API/Data

**Source données** : Supabase | Local | Mock (préciser)

**Requêtes nécessaires** :
```sql
-- Exemple requête Supabase
SELECT * FROM table WHERE condition;
```

---

## 🎨 Design System Compliance

### Checklist Obligatoire

#### Glassmorphism
- [ ] Pattern appliqué : `backdrop-blur-md bg-white/5 border border-white/10`
- [ ] Variante si nécessaire : [léger | standard | fort]

#### Couleurs
- [ ] Primaire : Cyan #00d9ff (`text-[#00d9ff]` ou `bg-[#00d9ff]`)
- [ ] Hiérarchie : Gold #fbbf24 (uniquement si champion/1ère place)
- [ ] Status : Green #10b981 (positive) | Red #ef4444 (negative)
- [ ] Background : Black #000000

#### Typographie
- [ ] Headers : `font-rajdhani font-bold`
- [ ] Body : `font-inter` (weight 400 ou 600)
- [ ] Tailles cohérentes avec existant

#### Responsive
- [ ] Mobile 390px : Layout optimisé ✅ PRIORITÉ
- [ ] Tablet 768px : Adaptation fluide
- [ ] Desktop 1024px+ : Utilisation espace
- [ ] Pas de scroll horizontal
- [ ] Pas de débordement visuel

#### Interactions
- [ ] Hover states définis
- [ ] Transitions smooth (`transition-all duration-300`)
- [ ] Focus/Active states accessibles

---

## ✅ Checklist Implémentation

### Phase 1 : Préparation
- [ ] Mockup validé
- [ ] Specs techniques claires
- [ ] Types TypeScript définis
- [ ] Données test disponibles

### Phase 2 : Développement
- [ ] Composant(s) créé(s)
- [ ] Logique implémentée
- [ ] Styling glassmorphism appliqué
- [ ] Types/Props définis
- [ ] Intégration page(s)

### Phase 3 : Styling
- [ ] Design system respecté (couleurs, typo)
- [ ] Glassmorphism cohérent
- [ ] Responsive 390px validé
- [ ] Animations/transitions

### Phase 4 : Tests
- [ ] Test données réelles (pas mocks)
- [ ] Test viewport 390px ✅
- [ ] Test viewports 640px, 1024px
- [ ] Console 0 erreurs
- [ ] Edge cases testés

### Phase 5 : Validation
- [ ] Comparaison vs mockup
- [ ] Review visuelle complète
- [ ] Performance OK
- [ ] Accessibilité basique

### Phase 6 : Déploiement
- [ ] Commit : `git commit -m "feat: TASK-XXX description"`
- [ ] Push : `git push origin main`
- [ ] Attente déploiement Vercel (~2 min)
- [ ] Validation production
- [ ] Screenshots avant/après

### Phase 7 : Documentation
- [ ] Update `docs/CHANGELOG.md`
- [ ] Marquer TASK-XXX comme ✅ dans `VERSION-3.1.md`
- [ ] Notes implémentation (si complexe)
- [ ] Archiver mockups dans `docs/mockups/`

---

## 🧪 Tests à Effectuer

### Cas Normaux
1. **Test 1** : [Description]
   - Input : [données]
   - Expected : [résultat]
   - Status : [ ] ✅ | [ ] ❌

2. **Test 2** : [Description]
   - Input : [données]
   - Expected : [résultat]
   - Status : [ ] ✅ | [ ] ❌

### Edge Cases
1. **Edge 1** : [Cas limite]
   - Scenario : [description]
   - Expected : [comportement]
   - Status : [ ] ✅ | [ ] ❌

2. **Edge 2** : [Cas limite]
   - Scenario : [description]
   - Expected : [comportement]
   - Status : [ ] ✅ | [ ] ❌

### Données Réelles
- [ ] Testé avec vrais noms managers (Traknar_87, etc.)
- [ ] Testé avec vraies données saisons
- [ ] Testé avec statistiques réelles
- [ ] Pas de placeholder "User 1", "Team A", etc.

---

## 📝 Notes Implémentation

### Décisions Techniques
[Choix d'architecture, patterns utilisés, librairies, etc.]

### Difficultés Rencontrées
[Problèmes et solutions appliquées]

### Optimisations Effectuées
[Améliorations performance, code, UX]

### Améliorations Futures
[Idées pour itérations suivantes]

---

## 📊 Métriques (Optionnel)

### Avant
- Temps chargement : [ms]
- Bundle size : [kb]
- Lighthouse score : [score]

### Après
- Temps chargement : [ms]
- Bundle size : [kb]
- Lighthouse score : [score]

---

## 🔗 Références

### Design
- Mockup : [lien]
- Inspiration : [liens références visuelles]

### Technique
- Documentation API : [lien]
- Librairie utilisée : [lien docs]

### Discussions
- Conversation Claude.ai : [lien]
- Issues GitHub : [lien]

---

## 📅 Historique

### [Date] - Création
- Mockup initial créé
- Specs rédigées
- TASK-XXX ouverte

### [Date] - Développement
- Implémentation démarrée
- [Jalons importants]

### [Date] - Complétion
- Feature terminée ✅
- Déployée en production
- TASK-XXX fermée

---

**Template version** : 1.0.0  
**Dernière mise à jour template** : Janvier 2026

---

## 📌 Comment Utiliser ce Template

1. **Dupliquer** ce fichier → `TASK-001-nom-feature.md`
2. **Remplir** toutes les sections [entre crochets]
3. **Valider** mockup avec Claude.ai avant implémentation
4. **Implémenter** en suivant checklist
5. **Mettre à jour** status au fur et à mesure
6. **Archiver** une fois terminé

**Fichier actif** : `docs/tasks/TASK-XXX-nom-feature.md`  
**Fichier archivé** : `docs/tasks/archive/TASK-XXX-nom-feature.md` (une fois ✅)
