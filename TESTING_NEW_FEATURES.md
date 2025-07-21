# 🧪 Guía de Testing - Nuevas Funcionalidades FocusFeed

## 🚀 **Funcionalidades a Probar**

### **1. Logo y Branding**
- ✅ **Verificar favicon** en el navegador (debe mostrar el nuevo logo con cerebro)
- ✅ **Comprobar metadata** en las pestañas del navegador
- ✅ **Verificar OpenGraph** compartiendo en redes sociales

### **2. Sistema de Eliminación**
- ✅ **Eliminar contenido** haciendo clic en el icono de papelera
- ✅ **Verificar eliminación** - el contenido debe desaparecer
- ✅ **Mostrar eliminados** activando el filtro "Eliminados"
- ✅ **Restaurar contenido** haciendo clic en el icono de restaurar
- ✅ **Verificar restauración** - el contenido debe volver a aparecer

### **3. Sistema de Bookmarks**
- ✅ **Guardar contenido** haciendo clic en el icono de bookmark
- ✅ **Verificar guardado** - debe aparecer el icono de check
- ✅ **Filtrar guardados** activando el botón "Guardados"
- ✅ **Desguardar contenido** haciendo clic nuevamente
- ✅ **Verificar persistencia** recargando la página

### **4. Búsqueda Avanzada**
- ✅ **Buscar por título** escribiendo palabras del título
- ✅ **Buscar por contenido** escribiendo palabras del resumen
- ✅ **Verificar filtrado** en tiempo real
- ✅ **Limpiar búsqueda** borrando el texto
- ✅ **Combinar con filtros** de categoría

### **5. Modal de Detalles**
- ✅ **Abrir modal** haciendo clic en una tarjeta
- ✅ **Ver información completa** del contenido
- ✅ **Navegar por insights** generados automáticamente
- ✅ **Ver estadísticas** detalladas
- ✅ **Probar acciones** (leer original, escuchar, etc.)
- ✅ **Cerrar modal** con X o clic fuera

### **6. Filtros Avanzados**
- ✅ **Filtrar por categoría** usando los badges
- ✅ **Combinar filtros** de categoría + estado
- ✅ **Verificar contadores** en el header
- ✅ **Probar filtros múltiples** simultáneamente

## 🎯 **Casos de Prueba Específicos**

### **Caso 1: Flujo Completo de Gestión**
1. **Obtener contenido** con el botón "Obtener noticias frescas"
2. **Buscar** un artículo específico
3. **Guardar** el artículo
4. **Abrir detalles** haciendo clic en la tarjeta
5. **Leer insights** generados
6. **Eliminar** el artículo
7. **Restaurar** el artículo
8. **Verificar** que todo funcione correctamente

### **Caso 2: Filtros y Búsqueda**
1. **Obtener múltiples artículos** de diferentes categorías
2. **Aplicar filtro** de categoría "IA"
3. **Buscar** una palabra específica
4. **Activar filtro** de guardados
5. **Verificar** que los resultados sean correctos
6. **Limpiar filtros** uno por uno

### **Caso 3: Gestión de Estado**
1. **Guardar** varios artículos
2. **Eliminar** algunos artículos
3. **Verificar contadores** en el header
4. **Cambiar entre filtros** de estado
5. **Restaurar** contenido eliminado
6. **Verificar** que los contadores se actualicen

## 🔍 **Verificación de UI/UX**

### **Responsividad:**
- ✅ **Desktop** (1920x1080) - Verificar grid de 3 columnas
- ✅ **Tablet** (768x1024) - Verificar grid de 2 columnas
- ✅ **Mobile** (375x667) - Verificar grid de 1 columna
- ✅ **Header responsive** - Estadísticas ocultas en mobile

### **Estados Visuales:**
- ✅ **Hover effects** en tarjetas y botones
- ✅ **Estados activos** en filtros seleccionados
- ✅ **Indicadores visuales** de bookmark y eliminación
- ✅ **Animaciones suaves** en transiciones

### **Accesibilidad:**
- ✅ **Navegación por teclado** (Tab, Enter, Escape)
- ✅ **Contraste adecuado** en modo claro y oscuro
- ✅ **Labels descriptivos** en botones e inputs
- ✅ **Focus states** visibles

## 🐛 **Casos de Error a Probar**

### **API Errors:**
- ✅ **Eliminar contenido inexistente** (debe mostrar error)
- ✅ **Actualizar contenido inexistente** (debe mostrar error)
- ✅ **Red de conexión lenta** (debe mostrar loading states)

### **UI Errors:**
- ✅ **Búsqueda con caracteres especiales** (debe funcionar)
- ✅ **Filtros sin resultados** (debe mostrar mensaje apropiado)
- ✅ **Modal con contenido muy largo** (debe hacer scroll)

## 📊 **Métricas a Verificar**

### **Performance:**
- ✅ **Tiempo de carga** de la página principal
- ✅ **Tiempo de respuesta** de búsquedas
- ✅ **Tiempo de apertura** del modal
- ✅ **Fluidez** de animaciones

### **Funcionalidad:**
- ✅ **100% de funcionalidades** implementadas funcionando
- ✅ **0 errores** en consola del navegador
- ✅ **Persistencia** correcta de datos
- ✅ **Sincronización** entre componentes

## 🎯 **Checklist de Testing**

### **Funcionalidades Core:**
- [ ] Logo y favicon visibles
- [ ] Búsqueda funciona correctamente
- [ ] Filtros de categoría funcionan
- [ ] Filtros de estado funcionan
- [ ] Bookmarks funcionan
- [ ] Eliminación funciona
- [ ] Restauración funciona
- [ ] Modal de detalles se abre
- [ ] Insights se generan automáticamente
- [ ] Estadísticas se actualizan

### **UI/UX:**
- [ ] Responsive en todos los dispositivos
- [ ] Animaciones suaves
- [ ] Estados visuales claros
- [ ] Accesibilidad correcta
- [ ] Modo oscuro/claro funciona

### **API:**
- [ ] Endpoints responden correctamente
- [ ] Manejo de errores funciona
- [ ] Validaciones funcionan
- [ ] Persistencia de datos correcta

## 🚀 **Comandos para Testing**

### **Reiniciar la aplicación:**
```bash
# En el servidor
docker restart focusfeed-app

# Verificar logs
docker logs focusfeed-app --tail 20
```

### **Limpiar datos de prueba:**
```bash
# Acceder al contenedor
docker exec -it focusfeed-app sh

# Ver contenido actual
cat data/content.json

# Limpiar contenido (opcional)
echo "[]" > data/content.json
```

### **Verificar endpoints:**
```bash
# Obtener contenido
curl http://localhost:3001/api/content

# Obtener contenido específico
curl http://localhost:3001/api/content/[ID]

# Eliminar contenido
curl -X DELETE http://localhost:3001/api/content/[ID]

# Actualizar contenido
curl -X PATCH http://localhost:3001/api/content/[ID] \
  -H "Content-Type: application/json" \
  -d '{"isBookmarked": true}'
```

## 🎉 **Criterios de Aceptación**

### **✅ Aprobado si:**
- Todas las funcionalidades implementadas funcionan correctamente
- La UI es responsive y accesible
- No hay errores en consola
- Los datos persisten correctamente
- La experiencia de usuario es fluida

### **❌ Rechazado si:**
- Alguna funcionalidad core no funciona
- La UI no es responsive
- Hay errores críticos en consola
- Los datos no persisten
- La experiencia de usuario es confusa

---

¡Con esta guía podrás verificar que todas las nuevas funcionalidades funcionan correctamente! 🚀 