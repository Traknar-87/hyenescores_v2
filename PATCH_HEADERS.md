# Patch Headers Arrondis v4.1

## Modifications CSS nécessaires

### 1. `.ds-table thead` (ligne ~540)
```css
.ds-table thead {
  background: var(--teal-header-bg);
  border-bottom: 2px solid var(--cyan-border);
  border-radius: 8px 8px 0 0;  /* ← AJOUTER */
}
```

### 2. `.pantheon-table thead` (ligne ~3820)
```css
.pantheon-table thead {
  background: var(--teal-header-bg);
  border-radius: 8px 8px 0 0;  /* ← AJOUTER */
}
```

Ces modifications ajoutent les coins arrondis aux headers de tableaux.
