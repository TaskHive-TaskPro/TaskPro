# TaskPro CSS/Styling Guide

## 🎨 Styling Metodolojisi

Bu projede **üç farklı CSS yöntemi** kullanılıyor ama bunları **tutarlı** kullanmalıyız:

### 1. **Styled-Components** (Ana Yöntem - Önerilen)
**Kullanım Alanı:** Component-level styling, dinamik temalar
**Avantajları:** 
- TypeScript desteği
- Tema entegrasyonu kolay
- Scoped CSS (çakışma yok)
- Props ile dinamik stiller

**Örnek:**
```javascript
import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${props => props.theme.palette.secondary.warning};
  color: ${props => props.theme.palette.text.primary};
  padding: 14px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.palette.text.warning};
  }
`;
```

### 2. **CSS Modules** (Dashboard için)
**Kullanım Alanı:** Sadece dashboard layout ve grid sistemleri
**Avantajları:**
- Performance (compile-time)
- Media query kontrolü kolay

**Örnek:**
```css
/* dashboard.module.css */
.mainDashboard {
  padding: 30px;
  background-color: var(--bg-primary);
}

@media (max-width: 768px) {
  .mainDashboard {
    padding: 0;
  }
}
```

### 3. **MUI sx Props** (❌ KULLANMAYIN - Sadece Typography için)
**Neden kullanmıyoruz:**
- Inline styles performans sorunu
- Type safety zayıf
- Kod karmaşası
- Tema değişiminde yavaş

**❌ Kötü:**
```javascript
<Button sx={{ 
  backgroundColor: 'secondary.warning',
  padding: '8px 10px',
  '&:hover': { backgroundColor: 'text.error' }
}}>
```

**✅ İyi:**
```javascript
<StyledButton onClick={handleClick}>
```

---

## 🎨 Tema Renk Paleti

Tüm renkler `ThemeContext.jsx` içinde tanımlı. **Asla hardcoded renk kullanmayın!**

### Light Theme
```javascript
primary.main: '#3b82f6'
secondary.warning: '#22c55e'
text.primary: '#1f2937'
text.disabled: '#9ca3af'
background.default: '#ffffff'
```

### Dark Theme
```javascript
primary.main: '#4f46e5'
secondary.warning: '#10b981'
text.primary: '#ffffff'
text.disabled: '#9ca3af'
background.default: '#1a1a1a'
```

### Violet Theme
```javascript
primary.main: '#5255BC'
secondary.warning: '#5255BC'
text.primary: '#ffffff'
text.disabled: '#b8bcfd'
background.default: 'rgba(82,85,188,1)'
```

---

## 📦 Button Componentleri

### Sidebar Buttons (Sidebar.styled.jsx)
```javascript
CreateBoardButton  // Board oluşturma
HelpButton         // Yardım
LogoutButton       // Çıkış
IconButton         // Edit butonu
IconLink           // Delete butonu
```

### Form Buttons (NeedHelpModal.styled.jsx)
```javascript
AuthFormSubmitButton  // Send butonu
CloseButton           // Modal kapatma
```

### Dashboard Buttons (dashboard.module.css)
```css
.btnAddCard        // Kart ekleme
.columnAddBtn      // Kolon ekleme
.btnFilters        // Filtre butonu
```

---

## ✅ Best Practices

### 1. Renk Kullanımı
```javascript
// ✅ İYİ
color: ${props => props.theme.palette.text.primary};

// ❌ KÖTÜ
color: #ffffff;
color: white;
```

### 2. Transitions
```javascript
// ✅ İYİ - Smooth ve performanslı
transition: background-color 0.2s ease, transform 0.1s ease;

// ❌ KÖTÜ - Yavaş
transition: all 300ms linear;
```

### 3. Hover States
```javascript
// ✅ İYİ - Disabled state kontrol ediyor
&:hover:not(:disabled) {
  background-color: ${props => props.theme.palette.text.warning};
}

// ❌ KÖTÜ - Disabled butonda da hover olur
&:hover {
  background-color: red;
}
```

### 4. Focus States (Accessibility)
```javascript
// ✅ İYİ - Keyboard navigasyon için
&:focus-visible {
  outline: 2px solid ${props => props.theme.palette.primary.main};
  outline-offset: 2px;
}
```

---

## 🔄 Migration Checklist

Eski kod taşırken:

- [ ] MUI `Button` → Styled-component'e dönüştür
- [ ] `sx={{...}}` props → Styled-component'e taşı
- [ ] Hardcoded renkler → `theme.palette.*` kullan
- [ ] `transition: all` → Spesifik property belirt
- [ ] Hover/focus states ekle
- [ ] Accessibility (aria-label, focus-visible) ekle

---

## 🚀 Örnek Component

```javascript
// ✅ DOĞRU YÖNTEM

import styled from 'styled-components';

export const ActionButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  
  font-family: 'Poppins';
  font-size: 14px;
  font-weight: 500;
  
  background-color: ${props => props.theme.palette.secondary.warning};
  color: ${props => props.theme.palette.text.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  
  transition: background-color 0.2s ease, transform 0.1s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.palette.text.warning};
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:focus-visible {
    outline: 2px solid ${props => props.theme.palette.primary.main};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
```

---

## 🎯 Hedefler

1. ✅ Tüm butonlar tutarlı styled-components
2. ✅ Tema renkleri standardize
3. ✅ Transition'lar optimize
4. ✅ Accessibility iyileştirildi
5. 🔄 Dashboard module.css minimalize (sadece layout)
6. 🔄 Tüm inline sx props kaldırılacak

---

**Son Güncelleme:** 4 Ekim 2025
