# Template : Nouvelle Feature

> Utilise ce template pour implémenter de nouvelles fonctionnalités sur HyeneScores.

---

## 📋 Spécifications Feature

### Nom Feature
[TASK-XXX : Titre feature]

### Référence
Specs complètes : `docs/tasks/TASK-XXX.md`

### Description
[Résumé de ce que fait la feature]

### Objectif
[Pourquoi cette feature est nécessaire]

---

## 🎨 Mockup Validé

### Référence Visuelle
[Lien vers mockup ou description détaillée]

### Design System
- **Couleurs** : Cyan #00d9ff (primary), Gold #fbbf24 (si champion)
- **Glassmorphism** : backdrop-blur-md bg-white/5
- **Typographie** : Rajdhani (headers), Inter (body)
- **Responsive** : 390px viewport

---

## 🔧 Implémentation Technique

### Fichiers à Créer
- [ ] `src/components/NewComponent.tsx`
- [ ] `src/components/ui/...` (si nécessaire)
- [ ] ...

### Fichiers à Modifier
- [ ] `src/pages/PageName.tsx`
- [ ] `src/...`
- [ ] ...

### Types/Interfaces
```typescript
// Définir ici les types nécessaires
interface FeatureProps {
  // ...
}
```

### Props Composant
```typescript
{
  prop1: string;
  prop2: number;
  // ...
}
```

---

## ✅ Checklist Implémentation

### Phase 1 : Création
- [ ] Lire specs complètes (`docs/tasks/TASK-XXX.md`)
- [ ] Créer composant(s) nécessaire(s)
- [ ] Définir types TypeScript
- [ ] Implémenter logique métier

### Phase 2 : Styling
- [ ] Appliquer glassmorphism
- [ ] Couleurs design system (cyan/gold)
- [ ] Typographie Rajdhani/Inter
- [ ] Spacing/layout cohérent

### Phase 3 : Responsive
- [ ] Test viewport 390px ✅
- [ ] Test 640px (sm)
- [ ] Test 1024px (lg)
- [ ] Pas de scroll horizontal

### Phase 4 : Test & Validation
- [ ] Test avec données réelles (pas de mocks)
- [ ] Vérification console (0 erreurs)
- [ ] Validation visuelle vs mockup
- [ ] Edge cases testés

### Phase 5 : Déploiement
- [ ] Commit : `git commit -m "feat: [description]"`
- [ ] Push : `git push origin main`
- [ ] Attendre déploiement Vercel (~2 min)
- [ ] Validation production

### Phase 6 : Documentation
- [ ] Update `docs/CHANGELOG.md`
- [ ] Marquer TASK-XXX comme ✅ terminée
- [ ] Screenshot avant/après si UI
- [ ] Notes implémentation si complexe

---

## 🎯 Validation Design System

### Checklist Stricte
- [ ] **Glassmorphism** : `backdrop-blur-md bg-white/5 border border-white/10`
- [ ] **Couleur primaire** : `text-[#00d9ff]` ou `bg-[#00d9ff]`
- [ ] **Couleur hiérarchie** : `text-[#fbbf24]` (uniquement champions)
- [ ] **Headers** : `font-rajdhani font-bold`
- [ ] **Body** : `font-inter`
- [ ] **Hover states** : Transitions smooth (`transition-all duration-300`)

---

## 📝 Notes Implémentation

### Décisions Techniques
[Choix d'architecture, patterns utilisés, etc.]

### Difficultés Rencontrées
[Problèmes et solutions]

### Optimisations Futures
[Améliorations possibles]

---

## 🧪 Tests Effectués

### Cas Normaux
- [ ] Cas 1 : ...
- [ ] Cas 2 : ...

### Edge Cases
- [ ] Edge case 1 : ...
- [ ] Edge case 2 : ...

### Données Réelles
- [ ] Testé avec vrais noms managers
- [ ] Testé avec vraies données saisons
- [ ] Testé avec vraies statistiques

---

**Template version** : 1.0.0  
**Dernière mise à jour** : Janvier 2026
