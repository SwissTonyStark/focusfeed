'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, Play, Clock, TrendingUp } from 'lucide-react'
import { Content, CATEGORIES } from '@/types'
import { formatDuration, getScoreColor, formatDate } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Home() {
  const [content, setContent] = useState<Content[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [filteredContent, setFilteredContent] = useState<Content[]>([])

  const fetchContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      setContent(data)
      setFilteredContent(data)
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredContent(content)
    } else {
      setFilteredContent(content.filter(item => item.category === selectedCategory))
    }
  }, [selectedCategory, content])

  const handleListen = (contentId: string) => {
    // Simulated audio playback
    console.log('Playing content:', contentId)
    // TODO: Implement actual audio playback with Piper
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Alto ROI'
    if (score >= 50) return 'Medio ROI'
    return 'Bajo ROI'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FocusFeed</h1>
              <p className="text-gray-600 dark:text-gray-400">Tu fuente de contenido inteligente</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button 
                onClick={fetchContent} 
                disabled={loading}
                className="gradient-bg text-white hover:opacity-90"
              >
                {loading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Obtener noticias frescas
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            onClick={() => setSelectedCategory('all')}
          >
            Todas
          </Badge>
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <RefreshCw className="mx-auto h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Cargando contenido...</p>
            </div>
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <TrendingUp className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No hay contenido disponible
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Haz clic en "Obtener noticias frescas" para cargar contenido.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Card key={item.id} className="card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <Badge 
                      className={`score-badge ${getScoreColor(item.score)}`}
                    >
                      {item.score}/100
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {item.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatDuration(item.estimatedDuration)}
                    </div>
                    <div className="text-xs">
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                    >
                      {getScoreLabel(item.score)}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(item.originalLink, '_blank')}
                  >
                    Leer original
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleListen(item.id)}
                    className="gradient-bg text-white"
                  >
                    <Play className="mr-1 h-4 w-4" />
                    Escuchar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 