'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  X, 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  RotateCcw,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Target,
  Clock,
  ExternalLink,
  Play,
  Eye,
  Tag,
  Brain,
  Zap
} from 'lucide-react'
import { Content, Insight } from '@/types'
import { formatDuration, getScoreColor, formatDate } from '@/lib/utils'

interface ContentDetailModalProps {
  content: Content | null
  isOpen: boolean
  onClose: () => void
  onDelete: (id: string) => void
  onBookmark: (id: string, bookmarked: boolean) => void
  onRestore?: (id: string) => void
}

const insightIcons = {
  key_point: Lightbulb,
  action_item: Target,
  trend: TrendingUp,
  warning: AlertTriangle,
  opportunity: Zap
}

const insightColors = {
  key_point: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  action_item: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  trend: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  warning: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  opportunity: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

export function ContentDetailModal({
  content,
  isOpen,
  onClose,
  onDelete,
  onBookmark,
  onRestore
}: ContentDetailModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  if (!content) return null

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(content.id)
      onClose()
    } catch (error) {
      console.error('Error deleting content:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleBookmark = () => {
    onBookmark(content.id, !content.isBookmarked)
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Alto ROI'
    if (score >= 50) return 'Medio ROI'
    return 'Bajo ROI'
  }

  const generateInsights = (): Insight[] => {
    // Generar insights basados en el contenido
    const insights: Insight[] = []
    
    // Insight de punto clave
    insights.push({
      id: `insight-1-${content.id}`,
      type: 'key_point',
      title: 'Punto Clave',
      description: `Este artículo destaca la importancia de ${content.category.toLowerCase()} en el contexto actual.`,
      icon: 'lightbulb',
      priority: 'medium',
      createdAt: new Date().toISOString()
    })

    // Insight de tendencia si el score es alto
    if (content.score >= 70) {
      insights.push({
        id: `insight-2-${content.id}`,
        type: 'trend',
        title: 'Tendencia Emergente',
        description: 'Este contenido indica una tendencia creciente en el mercado.',
        icon: 'trending-up',
        priority: 'high',
        createdAt: new Date().toISOString()
      })
    }

    // Insight de acción si es de startups o finanzas
    if (['Startups', 'Finanzas'].includes(content.category)) {
      insights.push({
        id: `insight-3-${content.id}`,
        type: 'action_item',
        title: 'Acción Recomendada',
        description: 'Considera investigar más sobre este tema para tu estrategia.',
        icon: 'target',
        priority: 'medium',
        isActionable: true,
        actionItems: [
          'Investigar más sobre el tema',
          'Evaluar impacto en tu negocio',
          'Compartir con el equipo'
        ],
        createdAt: new Date().toISOString()
      })
    }

    return insights
  }

  const insights = content.insights || generateInsights()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold pr-4">
              {content.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="outline">{content.category}</Badge>
            <Badge className={`score-badge ${getScoreColor(content.score)}`}>
              {content.score}/100
            </Badge>
            <Badge variant="secondary">{getScoreLabel(content.score)}</Badge>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="mr-1 h-4 w-4" />
              {formatDuration(content.estimatedDuration)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(content.createdAt)}
            </div>
          </div>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.summary}
              </p>
            </CardContent>
          </Card>

          {/* Full Text */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contenido Completo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {content.fullText}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Insights y Análisis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight) => {
                  const IconComponent = insightIcons[insight.type]
                  return (
                    <div
                      key={insight.id}
                      className={`p-4 rounded-lg border ${insightColors[insight.type]}`}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{insight.title}</h4>
                            <Badge
                              variant="outline"
                              className={`text-xs ${priorityColors[insight.priority]}`}
                            >
                              {insight.priority}
                            </Badge>
                          </div>
                          <p className="text-sm mb-3">{insight.description}</p>
                          
                          {insight.isActionable && insight.actionItems && (
                            <div className="mt-3">
                              <h5 className="font-medium text-sm mb-2">Acciones Sugeridas:</h5>
                              <ul className="space-y-1">
                                {insight.actionItems.map((action, index) => (
                                  <li key={index} className="text-sm flex items-center gap-2">
                                    <Target className="h-3 w-3" />
                                    {action}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {content.readCount || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Lecturas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {insights.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Insights
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {content.tags?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tags
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {content.relatedTopics?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Temas Relacionados
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(content.originalLink, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Leer Original
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log('Play audio for:', content.id)}
              >
                <Play className="mr-2 h-4 w-4" />
                Escuchar
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
              >
                {content.isBookmarked ? (
                  <>
                    <BookmarkCheck className="mr-2 h-4 w-4" />
                    Guardado
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Guardar
                  </>
                )}
              </Button>

              {content.isDeleted ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRestore?.(content.id)}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Restaurar
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 