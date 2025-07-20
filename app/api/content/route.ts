import { NextRequest, NextResponse } from 'next/server'
import { getAllContent, getContentByCategory } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let content
    if (category) {
      content = await getContentByCategory(category)
    } else {
      content = await getAllContent()
    }

    // Sort by creation date (newest first)
    content.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 