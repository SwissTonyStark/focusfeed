'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  RefreshCw, 
  Play, 
  Clock, 
  TrendingUp, 
  Trash2, 
  Bookmark, 
  BookmarkCheck,
  Eye,
  Brain,
  Filter,
  Search,
  BarChart3,
  Settings,
  Plus,
  RotateCcw
} from 'lucide-react'
import { Content, CATEGORIES, ContentFilters } from '@/types'
import { formatDuration, getScoreColor, formatDate } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ContentDetailModal } from '@/components/content-detail-modal'

export default function Home() {
  const [content, setContent] = useState<Content[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [filteredContent, setFilteredContent] = useState<Content[]>([])
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDeleted, setShowDeleted] = useState(false)
  const [showBookmarked, setShowBookmarked] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<ContentFilters>({})

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
    let filtered = content

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fullText.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrar por estado
    if (!showDeleted) {
      filtered = filtered.filter(item => !item.isDeleted)
    }
    if (showBookmarked) {
      filtered = filtered.filter(item => item.isBookmarked)
    }

    // Aplicar filtros adicionales
    if (filters.score) {
      filtered = filtered.filter(item => item.score >= filters.score!)
    }

    setFilteredContent(filtered)
  }, [selectedCategory, content, searchTerm, showDeleted, showBookmarked, filters])

  const handleListen = (contentId: string) => {
    // Simulated audio playback
    console.log('Playing content:', contentId)
    // TODO: Implement actual audio playback with Piper
  }

  const handleDelete = async (contentId: string) => {
    try {
      const response = await fetch(`/api/content/${contentId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setContent(prev => prev.filter(item => item.id !== contentId))
      } else {
        console.error('Error deleting content')
      }
    } catch (error) {
      console.error('Error deleting content:', error)
    }
  }

  const handleBookmark = async (contentId: string, bookmarked: boolean) => {
    try {
      const response = await fetch(`/api/content/${contentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isBookmarked: bookmarked }),
      })
      
      if (response.ok) {
        setContent(prev => prev.map(item => 
          item.id === contentId ? { ...item, isBookmarked: bookmarked } : item
        ))
      }
    } catch (error) {
      console.error('Error bookmarking content:', error)
    }
  }

  const handleRestore = async (contentId: string) => {
    try {
      const response = await fetch(`/api/content/${contentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isDeleted: false }),
      })
      
      if (response.ok) {
        setContent(prev => prev.map(item => 
          item.id === contentId ? { ...item, isDeleted: false } : item
        ))
      }
    } catch (error) {
      console.error('Error restoring content:', error)
    }
  }

  const handleContentClick = (content: Content) => {
    setSelectedContent(content)
    setIsModalOpen(true)
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Alto ROI'
    if (score >= 50) return 'Medio ROI'
    return 'Bajo ROI'
  }

  const getStats = () => {
    const total = content.length
    const bookmarked = content.filter(item => item.isBookmarked).length
    const deleted = content.filter(item => item.isDeleted).length
    const active = total - deleted
    const avgScore = content.length > 0 
      ? Math.round(content.reduce((sum, item) => sum + item.score, 0) / content.length)
      : 0

    return { total, bookmarked, deleted, active, avgScore }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FocusFeed</h1>
                  <p className="text-gray-600 dark:text-gray-400">Tu biblioteca de conocimiento inteligente</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>{stats.active} activos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span>{stats.bookmarked} guardados</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Score: {stats.avgScore}</span>
                </div>
              </div>
              <ThemeToggle />
              <Button 
                onClick={fetchContent} 
                disabled={loading}
                className="gradient-bg text-white hover:opacity-90"
              >
                {loading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Obtener noticias frescas
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar contenido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtros:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
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

          <div className="flex items-center gap-2">
            <Button
              variant={showBookmarked ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowBookmarked(!showBookmarked)}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Guardados
            </Button>
            
            <Button
              variant={showDeleted ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowDeleted(!showDeleted)}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Eliminados
            </Button>
          </div>
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
              <Card 
                key={item.id} 
                className={`card-hover transition-all duration-200 hover:shadow-lg ${
                  item.isDeleted ? 'opacity-60' : ''
                } ${item.isBookmarked ? 'ring-2 ring-yellow-400' : ''}`}
                onClick={() => handleContentClick(item)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      {item.isBookmarked && (
                        <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                      )}
                      {item.isDeleted && (
                        <Trash2 className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <Badge 
                      className={`score-badge ${getScoreColor(item.score)}`}
                    >
                      {item.score}/100
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {item.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {formatDuration(item.estimatedDuration)}
                      </div>
                      {item.readCount && item.readCount > 0 && (
                        <div className="flex items-center">
                          <Eye className="mr-1 h-4 w-4" />
                          {item.readCount}
                        </div>
                      )}
                    </div>
                    <div className="text-xs">
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                    >
                      {getScoreLabel(item.score)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Brain className="h-3 w-3 text-purple-500" />
                      <span className="text-xs text-gray-500">Insights</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(item.originalLink, '_blank')
                      }}
                    >
                      Leer original
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleListen(item.id)
                      }}
                      className="gradient-bg text-white"
                    >
                      <Play className="mr-1 h-4 w-4" />
                      Escuchar
                    </Button>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBookmark(item.id, !item.isBookmarked)
                      }}
                      className="h-8 w-8 p-0"
                    >
                      {item.isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                    {item.isDeleted ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRestore(item.id)
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <RotateCcw className="h-4 w-4 text-green-500" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(item.id)
                        }}
                        className="h-8 w-8 p-0 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Content Detail Modal */}
      <ContentDetailModal
        content={selectedContent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedContent(null)
        }}
        onDelete={handleDelete}
        onBookmark={handleBookmark}
        onRestore={handleRestore}
      />
    </div>
  )
} 