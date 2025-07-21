import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const contentFile = path.join(dataDir, 'content.json')

async function readContent() {
  try {
    const data = await fs.readFile(contentFile, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { content: [] }
  }
}

export async function GET() {
  try {
    const data = await readContent()
    const content = data.content || []

    // Estadísticas generales
    const totalContent = content.length
    const activeContent = content.filter((item: any) => !item.isDeleted).length
    const deletedContent = content.filter((item: any) => item.isDeleted).length
    const bookmarkedContent = content.filter((item: any) => item.isBookmarked).length

    // Estadísticas por categoría
    const categoryStats = content.reduce((acc: any, item: any) => {
      if (!item.isDeleted) {
        acc[item.category] = (acc[item.category] || 0) + 1
      }
      return acc
    }, {})

    // Score promedio
    const activeScores = content
      .filter((item: any) => !item.isDeleted)
      .map((item: any) => item.score)
    
    const averageScore = activeScores.length > 0 
      ? Math.round(activeScores.reduce((a: number, b: number) => a + b, 0) / activeScores.length)
      : 0

    // Tiempo total estimado de lectura
    const totalReadingTime = content
      .filter((item: any) => !item.isDeleted)
      .reduce((acc: number, item: any) => acc + (item.estimatedDuration || 0), 0)

    // Insights totales
    const totalInsights = content
      .filter((item: any) => !item.isDeleted)
      .reduce((acc: number, item: any) => acc + (item.insights?.length || 0), 0)

    // Tags más populares
    const tagCounts: { [key: string]: number } = {}
    content
      .filter((item: any) => !item.isDeleted)
      .forEach((item: any) => {
        item.tags?.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      })

    const topTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }))

    // Contenido reciente (últimos 7 días)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentContent = content.filter((item: any) => 
      !item.isDeleted && new Date(item.createdAt) > sevenDaysAgo
    ).length

    return NextResponse.json({
      overview: {
        total: totalContent,
        active: activeContent,
        deleted: deletedContent,
        bookmarked: bookmarkedContent,
        recent: recentContent
      },
      categories: categoryStats,
      metrics: {
        averageScore,
        totalReadingTime,
        totalInsights,
        averageInsightsPerContent: activeContent > 0 ? Math.round(totalInsights / activeContent) : 0
      },
      topTags,
      trends: {
        last7Days: recentContent,
        averageScoreTrend: averageScore > 75 ? 'up' : averageScore > 60 ? 'stable' : 'down'
      }
    })
  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 