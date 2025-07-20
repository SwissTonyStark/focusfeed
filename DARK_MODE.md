# 🌙 Modo Oscuro - FocusFeed

## ✨ Características del Modo Oscuro

FocusFeed ahora incluye soporte completo para modo oscuro con las siguientes características:

### 🎨 Diseño Adaptativo
- **Fondo**: Gradiente oscuro (gris-900 a gris-800)
- **Header**: Fondo oscuro con bordes sutiles
- **Tarjetas**: Colores adaptados para modo oscuro
- **Texto**: Colores optimizados para legibilidad

### 🔄 Toggle de Tema
- **Ubicación**: Header superior derecho
- **Iconos**: Sol (modo claro) / Luna (modo oscuro)
- **Animación**: Transición suave entre iconos
- **Persistencia**: Guarda preferencia en localStorage

### 🎯 Categorías y Estados
- **Badges**: Colores adaptados para modo oscuro
- **Scores**: Verde, amarillo, rojo con variantes oscuras
- **Estados**: Loading, empty states optimizados

## 🛠️ Implementación Técnica

### Dependencias
```json
{
  "next-themes": "^0.2.1"
}
```

### Componentes Principales

#### ThemeProvider (`components/theme-provider.tsx`)
```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

#### ThemeToggle (`components/ui/theme-toggle.tsx`)
```tsx
<Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
  <Sun className="light-icon" />
  <Moon className="dark-icon" />
</Button>
```

### Clases CSS Utilizadas

#### Modo Claro (por defecto)
```css
.bg-white
.text-gray-900
.text-gray-600
.border-gray-200
```

#### Modo Oscuro
```css
.dark:bg-gray-900
.dark:text-white
.dark:text-gray-400
.dark:border-gray-700
```

## 🎨 Paleta de Colores

### Modo Claro
- **Fondo**: `from-blue-50 to-indigo-100`
- **Header**: `bg-white`
- **Texto**: `text-gray-900`
- **Texto secundario**: `text-gray-600`

### Modo Oscuro
- **Fondo**: `dark:from-gray-900 dark:to-gray-800`
- **Header**: `dark:bg-gray-900`
- **Texto**: `dark:text-white`
- **Texto secundario**: `dark:text-gray-400`

## 🔧 Personalización

### Cambiar Colores del Tema
Edita `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... más variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... más variables */
}
```

### Añadir Nuevos Elementos
Para cualquier nuevo componente, usa las clases con prefijo `dark:`:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Contenido
</div>
```

## 🚀 Uso

### Cambiar Tema
1. Haz clic en el icono de sol/luna en el header
2. El tema cambia instantáneamente
3. La preferencia se guarda automáticamente

### Temas Disponibles
- **Claro**: Fondo claro, texto oscuro
- **Oscuro**: Fondo oscuro, texto claro
- **Sistema**: Sigue la preferencia del sistema operativo

## 🔍 Verificación

### Elementos que Cambian
- ✅ Header y navegación
- ✅ Fondo principal
- ✅ Tarjetas de contenido
- ✅ Badges y categorías
- ✅ Estados de carga y vacío
- ✅ Botones y controles
- ✅ Texto y tipografía

### Elementos que NO Cambian
- Gradientes de botones principales (mantienen el diseño)
- Iconos de Lucide React (se adaptan automáticamente)

## 🐛 Solución de Problemas

### El tema no persiste
- Verifica que `next-themes` esté instalado
- Asegúrate de que el ThemeProvider envuelva la aplicación

### Parpadeo al cargar
- Añade `suppressHydrationWarning` al elemento `<html>`
- Usa `disableTransitionOnChange` en ThemeProvider

### Colores no cambian
- Verifica que las clases `dark:` estén aplicadas
- Asegúrate de que TailwindCSS esté configurado para modo oscuro

---

¡Disfruta del modo oscuro! 🌙✨ 