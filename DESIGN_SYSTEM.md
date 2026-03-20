# 🎨 Starbucks Typography & Design System

## Overview
This document outlines the comprehensive design system for the Starbucks-inspired web application, making it easy to maintain consistency and update styles globally.

---

## 📚 Typography System

### Official Starbucks Fonts
Starbucks uses three custom typefaces developed by **Lettermatic** (2017–2019):

1. **SoDo Sans** → Primary workhorse font
   - Used for: Body text, navigation, buttons, menus, general content
   - Most versatile and commonly used across the website
   - Similar to: Modern, clean sans-serif

2. **Lander** → Serif accent font
   - Used for: Premium moments, expressive headlines
   - Example: "Smooth, Mellow & Perfectly Balanced"
   - Purpose: Accent font for special emphasis

3. **Pike** → Condensed sans-serif
   - Used for: Functional headlines, wayfinding, attention-grabbing text
   - Purpose: Impactful short text

> **Note:** These are proprietary fonts (not publicly available). We use **Inter** as the closest free alternative, with fallbacks to Helvetica Neue and Arial.

---

## 🔧 How to Change Fonts Globally

All typography is controlled via CSS custom properties in `/styles/globals.css`:

### Change Font Family
```css
:root {
  /* Update these variables to change fonts globally */
  --font-primary: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --font-secondary: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --font-accent: 'Inter', 'Helvetica Neue', Arial, sans-serif;
}
```

**To use a different font:**
1. Import the font at the top of `globals.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
   ```

2. Update the font variable:
   ```css
   --font-primary: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
   ```

**Recommended free alternatives to SoDo Sans:**
- **Inter** (current) - Modern, clean, excellent readability
- **Montserrat** - Geometric, friendly, professional
- **Poppins** - Round, modern, approachable
- **Open Sans** - Neutral, versatile, highly readable

---

## 📏 Font Size Scale

Based on Starbucks' typography scale (16px base):

| Variable | Size | Usage |
|----------|------|-------|
| `--text-xs` | 12px | Small text, captions, legal disclaimers |
| `--text-sm` | 14px | Secondary text, labels, small buttons |
| `--text-base` | 16px | Body text, paragraphs (default) |
| `--text-lg` | 18px | Emphasized body, large buttons |
| `--text-xl` | 20px | Small headings, navigation items |
| `--text-2xl` | 28px | H3, section titles |
| `--text-3xl` | 32px | H2, product names |
| `--text-4xl` | 40px | H1, large headlines |
| `--text-5xl` | 48px | Hero titles |
| `--text-6xl` | 60px | Extra large hero sections |

### How to Use in Code
```css
/* Using CSS variables */
.my-heading {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}
```

---

## ⚖️ Font Weights

| Variable | Value | Usage |
|----------|-------|-------|
| `--font-weight-light` | 300 | Light emphasis, decorative text |
| `--font-weight-normal` | 400 | Body text, paragraphs |
| `--font-weight-medium` | 500 | Buttons, labels, navigation |
| `--font-weight-semibold` | 600 | Subheadings, emphasis |
| `--font-weight-bold` | 700 | Headings, strong emphasis |
| `--font-weight-extrabold` | 800 | Very strong emphasis |
| `--font-weight-black` | 900 | Maximum impact (like logo) |

---

## 📐 Line Heights

| Variable | Value | Usage |
|----------|-------|-------|
| `--line-height-tight` | 1.25 | Headlines, compact text |
| `--line-height-snug` | 1.375 | Subheadings |
| `--line-height-normal` | 1.5 | Body text (default) |
| `--line-height-relaxed` | 1.625 | Long-form content |
| `--line-height-loose` | 2 | Spacious layouts |

---

## 🔤 Letter Spacing

| Variable | Value | Usage |
|----------|-------|-------|
| `--letter-spacing-tighter` | -0.05em | Large headlines |
| `--letter-spacing-tight` | -0.025em | Headings |
| `--letter-spacing-normal` | 0 | Body text (default) |
| `--letter-spacing-wide` | 0.025em | All caps text |
| `--letter-spacing-wider` | 0.05em | Buttons, labels |

---

## 🎨 Starbucks Color System

### Brand Colors
```css
--primary: #00704A;              /* Starbucks Green */
--primary-foreground: #ffffff;   /* White text on green */
--foreground: #1e3932;           /* Starbucks Dark Green (text) */
--secondary: #f2f0eb;            /* Warm neutral background */
--accent: #CBA258;               /* Gold (not in CSS yet, but brand color) */
--destructive: #d4183d;          /* Red for errors/alerts */
```

### Usage Examples
- **Primary actions**: Buttons, CTAs → `#00704A`
- **Text**: Default text color → `#1e3932`
- **Background**: Cards, sections → `#f2f0eb`
- **Accents**: Premium elements → `#CBA258` (Gold)

---

## 🖥️ Typical Starbucks Usage Patterns

### Navigation & Menus
- **Font**: SoDo Sans Regular/Medium
- **Size**: 16px–20px
- **Weight**: 500 (medium)

### Buttons & CTAs
- **Font**: SoDo Sans Medium/Bold
- **Size**: 16px–18px
- **Weight**: 600–700
- **Color**: White text on Starbucks Green (#00704A)

### Body Text
- **Font**: SoDo Sans Regular
- **Size**: 16px–18px
- **Line Height**: 1.5–1.6
- **Weight**: 400

### Headings
- **H1**: 40px–60px (SoDo Sans Black/Heavy)
- **H2/H3**: 28px–48px (SoDo Sans Bold)
- **H4/H5**: 20px–24px (SoDo Sans Medium)

### Small Text
- **Footer, Legal, Captions**: 12px–14px
- **Weight**: 400 (normal)

---

## 🔄 How to Update the Entire Design System

### Step 1: Update Font Family
Edit `/styles/globals.css`:
```css
:root {
  --font-primary: 'YourNewFont', 'Helvetica Neue', Arial, sans-serif;
}
```

### Step 2: Adjust Font Sizes (Optional)
```css
:root {
  --font-size-base: 18px; /* Change from 16px to 18px */
  --text-lg: 1.25rem;     /* Adjust scale as needed */
}
```

### Step 3: Modify Font Weights (Optional)
```css
:root {
  --font-weight-medium: 600; /* Change from 500 to 600 */
}
```

### Step 4: Update Colors (Optional)
```css
:root {
  --primary: #00704A;     /* Your brand green */
  --foreground: #1e3932;  /* Your text color */
}
```

---

## 📱 Responsive Typography

The design system uses `rem` units which scale based on the root font size:

```css
html {
  font-size: var(--font-size-base); /* 16px by default */
}
```

**To create responsive typography:**
```css
@media (max-width: 768px) {
  :root {
    --font-size-base: 14px; /* Smaller on mobile */
    --text-4xl: 2rem;       /* Adjust large headings */
  }
}
```

---

## ✅ Best Practices

### ✓ DO:
- Use CSS variables for all font sizes, weights, and families
- Follow the established typographic scale
- Maintain consistent line heights for readability
- Use font-weight hierarchy (normal → medium → bold)

### ✗ DON'T:
- Hardcode font sizes directly in components
- Use pixel values without variables
- Mix too many font weights in one design
- Ignore line-height for long-form content

---

## 📝 Example Component

```tsx
// Good - Using design system variables
<div className="my-component">
  <h1 style={{ 
    fontFamily: 'var(--font-primary)',
    fontSize: 'var(--text-4xl)',
    fontWeight: 'var(--font-weight-bold)',
    lineHeight: 'var(--line-height-tight)',
    color: 'var(--foreground)'
  }}>
    Welcome to Starbucks
  </h1>
  
  <p style={{
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-weight-normal)',
    lineHeight: 'var(--line-height-relaxed)'
  }}>
    Inspiring and nurturing the human spirit.
  </p>
  
  <button style={{
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-weight-medium)',
    backgroundColor: 'var(--primary)',
    color: 'var(--primary-foreground)'
  }}>
    Order Now
  </button>
</div>
```

---

## 🚀 Quick Reference

**Change Everything:**
1. Open `/styles/globals.css`
2. Update `:root` variables
3. All components automatically update!

**Key Variables:**
- `--font-primary` → Main font family
- `--font-size-base` → Base size (scales everything)
- `--text-*` → Font size scale
- `--font-weight-*` → Weight scale
- `--line-height-*` → Line height options
- `--primary` → Brand color

---

## 📚 Resources

- [Starbucks Brand Guidelines](https://creative.starbucks.com/) (Official)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Typography Best Practices](https://www.smashingmagazine.com/2020/07/css-techniques-legibility/)

---

**Last Updated:** January 15, 2026  
**Maintained by:** Starbucks Design System Team
