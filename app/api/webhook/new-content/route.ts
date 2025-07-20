import { NextRequest, NextResponse } from 'next/server'
import { saveContent, generateId } from '@/lib/db'
import { WebhookPayload, Content } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: WebhookPayload = await request.json()
    
    // Validate required fields
    if (!body.title || !body.summary || !body.fullText || !body.originalLink || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate AI score based on content (simplified algorithm)
    const score = Math.floor(Math.random() * 100) + 1 // Placeholder - replace with actual AI scoring
    
    // Calculate estimated duration (simplified)
    const wordCount = body.fullText.split(' ').length
    const estimatedDuration = Math.max(1, Math.ceil(wordCount / 200)) // ~200 words per minute
    
    const content: Content = {
      id: generateId(),
      title: body.title,
      summary: body.summary,
      fullText: body.fullText,
      originalLink: body.originalLink,
      score,
      estimatedDuration,
      category: body.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await saveContent(content)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Content saved successfully',
        contentId: content.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 