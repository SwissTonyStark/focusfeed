#!/bin/bash

# FocusFeed GitHub Repository Setup Script
echo "🚀 Configurando repositorio FocusFeed para GitHub..."

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Asegúrate de estar en el directorio FocusFeed."
    exit 1
fi

# Verificar si Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git no está instalado. Por favor instala Git primero."
    exit 1
fi

# Inicializar repositorio Git si no existe
if [ ! -d ".git" ]; then
    echo "📁 Inicializando repositorio Git..."
    git init
else
    echo "✅ Repositorio Git ya existe"
fi

# Añadir todos los archivos
echo "📦 Añadiendo archivos al staging..."
git add .

# Hacer commit inicial
echo "💾 Haciendo commit inicial..."
git commit -m "feat: Initial commit - FocusFeed app with dark mode and Docker support"

# Configurar rama principal
echo "🌿 Configurando rama principal..."
git branch -M main

# Añadir repositorio remoto
echo "🔗 Configurando repositorio remoto..."
git remote add origin https://github.com/SwissTonyStark/focusfeed.git

# Subir al repositorio
echo "⬆️ Subiendo a GitHub..."
git push -u origin main

echo ""
echo "🎉 ¡Repositorio configurado exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ve a https://github.com/SwissTonyStark/focusfeed"
echo "2. Verifica que todos los archivos estén presentes"
echo "3. En tu servidor casero, ejecuta:"
echo "   git clone https://github.com/SwissTonyStark/focusfeed.git"
echo "   cd focusfeed"
echo "   docker-compose -f docker-compose.dev.yml up --build -d"
echo ""
echo "🌐 La aplicación estará disponible en: http://localhost:3000" 