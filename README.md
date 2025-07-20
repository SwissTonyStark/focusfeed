# FocusFeed - Tu fuente de contenido inteligente

Una aplicación web moderna construida con Next.js 14 que te ayuda a descubrir contenido relevante y de alto valor con análisis de IA.

## 🚀 Características

- **Dashboard Moderno**: Interfaz limpia y responsiva con TailwindCSS y Shadcn/ui
- **Modo Oscuro**: Soporte completo para tema claro y oscuro
- **Análisis de IA**: Score de ROI (0-100) para cada artículo
- **Filtros por Categoría**: IA, Startups, Finanzas, Tecnología, Marketing, Productividad
- **API REST**: Endpoints para webhooks, contenido y preferencias de usuario
- **Almacenamiento Local**: Base de datos JSON para desarrollo
- **Deploy Ready**: Configurado para Vercel y Docker

## 🛠️ Tecnologías

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS, Shadcn/ui, Radix UI
- **Backend**: API Routes de Next.js
- **Base de Datos**: JSON (SQLite ready para producción)
- **Deployment**: Vercel, Docker
- **Temas**: next-themes para modo oscuro

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Docker (opcional, para contenedores)

### Desarrollo Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/SwissTonyStark/focusfeed.git
cd focusfeed
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Inicializar datos de ejemplo**
```bash
npm run init-data
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting
npm run format       # Formateo de código
npm run type-check   # Verificación de tipos
npm run init-data    # Inicializar datos de ejemplo
npm run test-api     # Probar endpoints de API
```

## 🐳 Docker (Recomendado)

### Desarrollo con Docker
```bash
# Construir y ejecutar en modo desarrollo
docker-compose -f docker-compose.dev.yml up --build

# O ejecutar en segundo plano
docker-compose -f docker-compose.dev.yml up --build -d
```

### Producción con Docker
```bash
# Construir imagen de producción
docker build -t focusfeed .

# Ejecutar contenedor
docker run -p 3000:3000 -v $(pwd)/data:/app/data focusfeed
```

## 🏗️ Estructura del Proyecto

```
FocusFeed/
├── app/                    # App Router de Next.js 14
│   ├── api/               # API Routes
│   │   ├── content/       # GET /api/content
│   │   ├── webhook/       # POST /api/webhook/new-content
│   │   └── user/          # GET/POST /api/user/preferences
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes Shadcn/ui
│   └── theme-provider.tsx # Provider de temas
├── lib/                  # Utilidades y configuración
│   ├── db.ts            # Capa de base de datos
│   └── utils.ts         # Funciones utilitarias
├── types/               # Definiciones TypeScript
├── data/                # Archivos de datos JSON
│   ├── sample-content.json      # Datos de ejemplo
│   ├── sample-preferences.json  # Preferencias de ejemplo
│   ├── content.json            # Datos en tiempo real (gitignored)
│   └── preferences.json        # Preferencias en tiempo real (gitignored)
├── scripts/             # Scripts de utilidad
└── public/              # Archivos estáticos
```

## 🔌 API Endpoints

### GET /api/content
Obtiene todos los artículos o filtra por categoría.

**Query Parameters:**
- `category` (opcional): Filtrar por categoría específica

**Ejemplo:**
```bash
curl http://localhost:3000/api/content
curl http://localhost:3000/api/content?category=IA
```

### POST /api/webhook/new-content
Recibe nuevo contenido desde n8n o sistemas externos.

**Body:**
```json
{
  "title": "Título del artículo",
  "summary": "Resumen generado por IA",
  "fullText": "Texto completo del artículo",
  "originalLink": "https://ejemplo.com/articulo",
  "category": "IA",
  "estimatedDuration": 5
}
```

### GET /api/user/preferences
Obtiene preferencias del usuario.

**Query Parameters:**
- `userId` (opcional): ID del usuario (default: "default")

### POST /api/user/preferences
Guarda preferencias del usuario.

**Body:**
```json
{
  "userId": "user123",
  "categories": ["IA", "Startups"],
  "interests": ["machine learning", "fintech"]
}
```

## 🌙 Modo Oscuro

La aplicación incluye soporte completo para modo oscuro:

- **Toggle**: Icono sol/luna en el header
- **Persistencia**: Guarda preferencia automáticamente
- **Sistema**: Respeta configuración del sistema operativo
- **Adaptativo**: Todos los componentes se adaptan al tema

Ver [DARK_MODE.md](./DARK_MODE.md) para más detalles.

## 🚀 Deployment

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno si es necesario
3. Deploy automático en cada push

### Otros Proveedores
- **Netlify**: Compatible con Next.js
- **Railway**: Fácil deployment
- **Heroku**: Requiere configuración adicional

## 🔮 Próximas Características

- [ ] **Autenticación**: JWT o Clerk para usuarios
- [ ] **Audio Player**: Integración con Piper para texto-audio
- [ ] **Base de Datos**: Migración a SQLite/PostgreSQL
- [ ] **Notificaciones**: Sistema de alertas en tiempo real
- [ ] **Análisis Avanzado**: Métricas de engagement y ROI real
- [ ] **Multi-usuario**: Soporte para múltiples usuarios

## 🧪 Testing

```bash
# Probar endpoints de API
npm run test-api

# Verificar tipos TypeScript
npm run type-check

# Linting
npm run lint
```

## 📝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Soporte

Para soporte, email a soporte@focusfeed.com o crear un issue en el repositorio.

---

**FocusFeed** - Transformando la forma en que consumes contenido digital. 