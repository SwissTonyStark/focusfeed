# 🚀 FocusFeed - Inicio Rápido con Docker

## 🐳 Ejecutar con Docker (Recomendado)

### Opción 1: Desarrollo con Hot Reload
```bash
# Construir y ejecutar en modo desarrollo
docker-compose -f docker-compose.dev.yml up --build

# O ejecutar en segundo plano
docker-compose -f docker-compose.dev.yml up --build -d
```

### Opción 2: Producción
```bash
# Construir imagen de producción
docker build -t focusfeed .

# Ejecutar contenedor
docker run -p 3000:3000 -v $(pwd)/data:/app/data focusfeed
```

### Opción 3: Docker Compose de Producción
```bash
# Ejecutar con Docker Compose
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up --build -d
```

## 🌐 Acceder a la Aplicación

Una vez que el contenedor esté ejecutándose:
```
http://localhost:3000
```

## 📊 Verificar Funcionalidad

1. **Cargar Contenido**: Haz clic en "Obtener noticias frescas"
2. **Filtros**: Prueba los filtros por categoría (IA, Startups, etc.)
3. **Tarjetas**: Verifica que muestren:
   - Título y resumen
   - Score de ROI (0-100)
   - Tiempo estimado de lectura
   - Botones "Leer original" y "Escuchar"

## 🔌 Probar API Endpoints

### GET /api/content
```bash
curl http://localhost:3000/api/content
```

### POST /api/webhook/new-content
```bash
curl -X POST http://localhost:3000/api/webhook/new-content \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Article",
    "summary": "Test summary",
    "fullText": "Test full text content",
    "originalLink": "https://example.com",
    "category": "IA"
  }'
```

## 🛠️ Comandos Útiles

```bash
# Ver logs del contenedor
docker-compose -f docker-compose.dev.yml logs -f

# Detener contenedores
docker-compose -f docker-compose.dev.yml down

# Reconstruir sin cache
docker-compose -f docker-compose.dev.yml up --build --force-recreate

# Acceder al contenedor
docker exec -it focusfeed-dev sh
```

## 📁 Estructura de Datos

Los datos se almacenan en:
- `data/content.json` - Artículos y contenido
- `data/preferences.json` - Preferencias de usuario

## 🔧 Personalización

### Modificar Estilos
Edita `app/globals.css` para cambiar el diseño.

### Agregar Contenido
1. Edita `data/content.json` directamente
2. O usa el webhook: `POST /api/webhook/new-content`

### Cambiar Categorías
Modifica `types/index.ts` para agregar/quitar categorías.

## 🚨 Solución de Problemas

### Puerto 3000 ocupado
```bash
# Cambiar puerto en docker-compose.dev.yml
ports:
  - "3001:3000"  # Cambiar 3000 por 3001
```

### Error de permisos
```bash
# En Windows, ejecutar PowerShell como administrador
# En Linux/Mac, usar sudo si es necesario
```

### Contenedor no inicia
```bash
# Verificar logs
docker-compose -f docker-compose.dev.yml logs

# Reconstruir completamente
docker-compose -f docker-compose.dev.yml down
docker system prune -f
docker-compose -f docker-compose.dev.yml up --build
```

## 🎯 Próximos Pasos

1. **Integrar con n8n**: Configurar webhook en tu flujo
2. **Personalizar diseño**: Modificar estilos y componentes
3. **Agregar autenticación**: Implementar JWT o Clerk
4. **Implementar audio**: Integrar Piper para texto-audio
5. **Desplegar**: Subir a Vercel, Netlify, etc.

---

¡Disfruta usando FocusFeed! 🚀 