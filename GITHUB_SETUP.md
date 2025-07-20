# 🚀 Guía para Subir FocusFeed a GitHub

## 📋 Pasos para Crear el Repositorio

### 1. Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Haz clic en **"New repository"**
3. Configura el repositorio:
   - **Repository name**: `focusfeed`
   - **Description**: `Tu fuente de contenido inteligente con análisis de IA`
   - **Visibility**: Public o Private (según prefieras)
   - **NO** marques "Add a README file" (ya tenemos uno)
   - **NO** marques "Add .gitignore" (ya tenemos uno)
   - **NO** marques "Choose a license" (puedes añadirlo después)

### 2. Inicializar Git Localmente

```bash
# Navegar al directorio del proyecto
cd FocusFeed

# Inicializar repositorio Git
git init

# Añadir todos los archivos
git add .

# Hacer el primer commit
git commit -m "feat: Initial commit - FocusFeed app with dark mode"

# Añadir el repositorio remoto
git remote add origin https://github.com/SwissTonyStark/focusfeed.git

# Subir al repositorio
git branch -M main
git push -u origin main
```

### 3. Verificar la Subida

1. Ve a tu repositorio en GitHub: `https://github.com/SwissTonyStark/focusfeed`
2. Verifica que todos los archivos estén presentes
3. El README.md debería mostrarse en la página principal

## 🏠 Configuración para tu Servidor Casero

### Opción 1: Clonar y Ejecutar

```bash
# En tu servidor casero
git clone https://github.com/SwissTonyStark/focusfeed.git
cd focusfeed

# Instalar dependencias
npm install

# Inicializar datos
npm run init-data

# Ejecutar en desarrollo
npm run dev
```

### Opción 2: Docker (Recomendado)

```bash
# Clonar repositorio
git clone https://github.com/SwissTonyStark/focusfeed.git
cd focusfeed

# Ejecutar con Docker
docker-compose -f docker-compose.dev.yml up --build -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Opción 3: Producción con Docker

```bash
# Clonar repositorio
git clone https://github.com/SwissTonyStark/focusfeed.git
cd focusfeed

# Construir imagen de producción
docker build -t focusfeed .

# Ejecutar contenedor
docker run -d -p 3000:3000 -v $(pwd)/data:/app/data --name focusfeed focusfeed
```

## 🔄 Actualizaciones Futuras

### Desde tu servidor casero:

```bash
# Actualizar código
git pull origin main

# Reconstruir si usas Docker
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build -d
```

### Para hacer cambios y subir:

```bash
# Hacer cambios en el código
# ...

# Añadir cambios
git add .

# Commit
git commit -m "feat: Descripción de los cambios"

# Subir a GitHub
git push origin main
```

## 📁 Estructura del Repositorio

```
focusfeed/
├── app/                    # Next.js App Router
├── components/            # Componentes React
├── lib/                  # Utilidades
├── types/               # TypeScript types
├── data/                # Datos JSON
│   ├── sample-content.json      # ✅ Incluido en repo
│   └── sample-preferences.json  # ✅ Incluido en repo
├── scripts/             # Scripts de utilidad
├── public/              # Archivos estáticos
├── README.md            # Documentación principal
├── DARK_MODE.md         # Documentación modo oscuro
├── QUICKSTART.md        # Guía rápida
├── package.json         # Dependencias
├── docker-compose.dev.yml # Docker desarrollo
├── Dockerfile           # Docker producción
└── .gitignore           # Archivos ignorados
```

## 🚨 Archivos Excluidos (.gitignore)

- `node_modules/` - Dependencias (se instalan con npm install)
- `.next/` - Build de Next.js
- `data/content.json` - Datos en tiempo real
- `data/preferences.json` - Preferencias en tiempo real
- `.env*.local` - Variables de entorno locales
- Archivos de IDE y sistema

## 🔧 Configuración Adicional

### Variables de Entorno (Opcional)

Si necesitas variables de entorno, crea un archivo `.env.local`:

```bash
# .env.local (NO subir a GitHub)
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=FocusFeed
```

### Dominio Personalizado

Si quieres usar un dominio personalizado:

1. Configura DNS para apuntar a tu servidor
2. Usa un proxy reverso (nginx, traefik)
3. Configura SSL con Let's Encrypt

## 🎯 Próximos Pasos

1. **Subir a GitHub** ✅
2. **Configurar en servidor casero** ✅
3. **Integrar con n8n** - Configurar webhook
4. **Personalizar contenido** - Añadir tus propias categorías
5. **Implementar audio** - Integrar Piper
6. **Añadir autenticación** - JWT o Clerk

---

¡Tu FocusFeed estará listo para usar en tu servidor casero! 🚀 