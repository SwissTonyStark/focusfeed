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
  Sun,
  Moon,
  X,
  BookOpen,
  Target,
  Zap,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  RotateCcw
} from 'lucide-react'
import { Content, Insight } from '@/types'
import { formatDuration, getScoreColor, formatDate } from '@/lib/utils'
import { ContentDetailModal } from '@/components/content-detail-modal'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Home() {
  const [content, setContent] = useState<Content[]>([])
  const [filteredContent, setFilteredContent] = useState<Content[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'bookmarked' | 'deleted'>('all')

  const categories = ['Todas', 'IA', 'Startups', 'Finanzas', 'Tecnología', 'Marketing', 'Productividad']

  // Cargar contenido
  const loadContent = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== 'Todas') params.append('category', selectedCategory)
      if (searchTerm) params.append('search', searchTerm)
      
      // Aplicar filtro de estado
      switch (activeFilter) {
        case 'bookmarked':
          params.append('status', 'bookmarked')
          break
        case 'deleted':
          params.append('status', 'deleted')
          break
        default:
          params.append('status', 'active')
      }

      const response = await fetch(`/api/content?${params}`)
      const data = await response.json()
      setContent(data.content || [])
      setFilteredContent(data.content || [])
    } catch (error) {
      console.error('Error loading content:', error)
    } finally {
      setLoading(false)
    }
  }

  // Cargar estadísticas
  const loadStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  // Cargar contenido de prueba
  const loadTestContent = async () => {
    setLoading(true)
    try {
      const testContent = [
        {
          id: 'test_1',
          title: 'OpenAI lanza GPT-5 con capacidades revolucionarias',
          summary: 'OpenAI ha anunciado el lanzamiento de GPT-5, que incluye mejoras significativas en razonamiento, creatividad y comprensión contextual.',
          fullText: 'OpenAI ha anunciado el lanzamiento de GPT-5, que incluye mejoras significativas en razonamiento, creatividad y comprensión contextual. Esta nueva versión representa un salto cualitativo en las capacidades de IA generativa, con mejor rendimiento en tareas complejas y mayor precisión en respuestas.',
          originalLink: 'https://example.com/openai-gpt5',
          score: 95,
          estimatedDuration: 5,
          category: 'IA',
          tags: ['ai', 'openai', 'gpt5', 'machine-learning'],
          insights: [
            {
              id: 'insight_1',
              type: 'trend',
              title: 'Tendencia Emergente',
              description: 'Avance significativo en IA generativa que podría redefinir el mercado.',
              priority: 'high',
              createdAt: new Date().toISOString()
            }
          ],
          readCount: 0,
          isBookmarked: false,
          isDeleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'test_2',
          title: 'Startup de fintech recauda $50M en Serie A',
          summary: 'Una startup innovadora en el sector fintech ha cerrado una ronda de financiación de $50 millones para expandir sus servicios.',
          fullText: 'Una startup innovadora en el sector fintech ha cerrado una ronda de financiación de $50 millones para expandir sus servicios. La empresa, que se enfoca en soluciones de pagos digitales, planea usar los fondos para expandirse a nuevos mercados y desarrollar productos adicionales.',
          originalLink: 'https://example.com/fintech-funding',
          score: 88,
          estimatedDuration: 4,
          category: 'Startups',
          tags: ['startup', 'fintech', 'funding', 'series-a'],
          insights: [
            {
              id: 'insight_2',
              type: 'action_item',
              title: 'Oportunidad de Mercado',
              description: 'Posible oportunidad para inversión o colaboración en el sector fintech.',
              priority: 'medium',
              isActionable: true,
              actionItems: [
                'Investigar más sobre la empresa',
                'Evaluar potencial de mercado',
                'Considerar oportunidades de colaboración'
              ],
              createdAt: new Date().toISOString()
            }
          ],
          readCount: 0,
          isBookmarked: false,
          isDeleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]

      // Enviar contenido de prueba a la API
      for (const item of testContent) {
        await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      }

      await loadContent()
      await loadStats()
    } catch (error) {
      console.error('Error loading test content:', error)
    } finally {
      setLoading(false)
    }
  }

  // Eliminar contenido
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/content?id=${id}`, { method: 'DELETE' })
      await loadContent()
      await loadStats()
    } catch (error) {
      console.error('Error deleting content:', error)
    }
  }

  // Restaurar contenido
  const handleRestore = async (id: string) => {
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isDeleted: false })
      })
      await loadContent()
      await loadStats()
    } catch (error) {
      console.error('Error restoring content:', error)
    }
  }

  // Bookmark contenido
  const handleBookmark = async (id: string, bookmarked: boolean) => {
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isBookmarked: !bookmarked })
      })
      await loadContent()
      await loadStats()
    } catch (error) {
      console.error('Error bookmarking content:', error)
    }
  }

  // Abrir modal de detalles
  const handleContentClick = (content: Content) => {
    setSelectedContent(content)
    setIsModalOpen(true)
  }

  // Cargar datos iniciales
  useEffect(() => {
    loadContent()
    loadStats()
  }, [selectedCategory, searchTerm, activeFilter])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
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
                  {/* Estadísticas en tiempo real */}
                  <div className="hidden md:flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>{stats?.overview?.active || 0} activos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bookmark className="h-4 w-4" />
                      <span>{stats?.overview?.bookmarked || 0} guardados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Score: {stats?.metrics?.averageScore || 0}</span>
                    </div>
                  </div>

                  <ThemeToggle />
                  
                  <Button 
                    onClick={loadTestContent} 
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Obtener noticias frescas
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Búsqueda */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar contenido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtros:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={activeFilter === 'bookmarked' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(activeFilter === 'bookmarked' ? 'all' : 'bookmarked')}
                  className="transition-all duration-200"
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  Guardados
                </Button>
                <Button
                  variant={activeFilter === 'deleted' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(activeFilter === 'deleted' ? 'all' : 'deleted')}
                  className="transition-all duration-200"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Eliminados
                </Button>
              </div>
            </div>

            {/* Contenido */}
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="mx-auto h-8 w-8 animate-spin text-gray-400" />
                <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando contenido...</p>
              </div>
            ) : filteredContent.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((item) => (
                  <Card
                    key={item.id}
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer group border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                    onClick={() => handleContentClick(item)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          {item.isBookmarked && (
                            <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                          )}
                          {item.isDeleted && (
                            <Trash2 className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </div>
                      <CardDescription className="line-clamp-3">
                        {item.summary}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                        <Badge className={`score-badge ${getScoreColor(item.score)} text-xs`}>
                          {item.score}/100
                        </Badge>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="mr-1 h-4 w-4" />
                          {formatDuration(item.estimatedDuration)}
                        </div>
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(item.createdAt)}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBookmark(item.id, item.isBookmarked)
                          }}
                          className={`transition-all duration-200 ${
                            item.isBookmarked 
                              ? 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300 dark:hover:bg-yellow-900/30' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          {item.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (item.isDeleted) {
                              handleRestore(item.id)
                            } else {
                              handleDelete(item.id)
                            }
                          }}
                          className={`transition-all duration-200 ${
                            item.isDeleted 
                              ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30' 
                              : 'hover:bg-red-50 hover:border-red-200 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-700 dark:hover:text-red-300'
                          }`}
                        >
                          {item.isDeleted ? (
                            <RotateCcw className="h-4 w-4" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
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
            )}
          </div>
        </div>

        {/* Modal de detalles */}
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
    </ThemeProvider>
  )
} 