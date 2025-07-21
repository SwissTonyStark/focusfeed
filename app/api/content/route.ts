import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const contentFile = path.join(dataDir, 'content.json')

// Asegurar que el directorio data existe
async function ensureDataDir() {
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Leer contenido del archivo
async function readContent() {
  try {
    const data = await fs.readFile(contentFile, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { content: [] }
  }
}

// Escribir contenido al archivo
async function writeContent(data: any) {
  await ensureDataDir()
  await fs.writeFile(contentFile, JSON.stringify(data, null, 2))
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const status = searchParams.get('status') // 'all', 'active', 'deleted', 'bookmarked'
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const data = await readContent()
    let content = data.content || []

    // Filtrar por categoría
    if (category && category !== 'Todas') {
      content = content.filter((item: any) => item.category === category)
    }

    // Filtrar por estado
    if (status && status !== 'all') {
      switch (status) {
        case 'active':
          content = content.filter((item: any) => !item.isDeleted)
          break
        case 'deleted':
          content = content.filter((item: any) => item.isDeleted)
          break
        case 'bookmarked':
          content = content.filter((item: any) => item.isBookmarked)
          break
      }
    }

    // Búsqueda por texto
    if (search) {
      const searchLower = search.toLowerCase()
      content = content.filter((item: any) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.summary.toLowerCase().includes(searchLower) ||
        item.fullText.toLowerCase().includes(searchLower) ||
        item.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower))
      )
    }

    // Ordenar por fecha de creación (más reciente primero)
    content.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Paginación
    const total = content.length
    const paginatedContent = content.slice(offset, offset + limit)

    return NextResponse.json({
      content: paginatedContent,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      filters: {
        category,
        search,
        status
      }
    })
  } catch (error) {
    console.error('Error reading content:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validación básica
    if (!body.title || !body.summary) {
      return NextResponse.json(
        { error: 'Título y resumen son requeridos' },
        { status: 400 }
      )
    }

    const data = await readContent()
    const newContent = {
      id: `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: body.title,
      summary: body.summary,
      fullText: body.fullText || body.summary,
      originalLink: body.originalLink || '',
      score: body.score || Math.floor(Math.random() * 40) + 60, // 60-100
      estimatedDuration: body.estimatedDuration || Math.floor(Math.random() * 10) + 2, // 2-12 min
      category: body.category || 'Tecnología',
      tags: body.tags || [],
      relatedTopics: body.relatedTopics || [],
      insights: body.insights || [],
      readCount: 0,
      isBookmarked: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    data.content = data.content || []
    data.content.unshift(newContent) // Agregar al inicio
    await writeContent(data)

    return NextResponse.json(newContent, { status: 201 })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      )
    }

    const data = await readContent()
    const contentIndex = data.content.findIndex((item: any) => item.id === id)

    if (contentIndex === -1) {
      return NextResponse.json(
        { error: 'Contenido no encontrado' },
        { status: 404 }
      )
    }

    data.content[contentIndex] = {
      ...data.content[contentIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    await writeContent(data)
    return NextResponse.json(data.content[contentIndex])
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      )
    }

    const data = await readContent()
    const contentIndex = data.content.findIndex((item: any) => item.id === id)

    if (contentIndex === -1) {
      return NextResponse.json(
        { error: 'Contenido no encontrado' },
        { status: 404 }
      )
    }

    // Soft delete
    data.content[contentIndex].isDeleted = true
    data.content[contentIndex].updatedAt = new Date().toISOString()

    await writeContent(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 