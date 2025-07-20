import { NextRequest, NextResponse } from 'next/server'
import { getUserPreferences, saveUserPreferences, generateId } from '@/lib/db'
import { UserPreferences } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'default'
    
    const allPreferences = await getUserPreferences()
    const userPrefs = allPreferences.find(p => p.id === userId)
    
    if (!userPrefs) {
      // Return default preferences
      return NextResponse.json({
        id: userId,
        categories: [],
        interests: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }
    
    return NextResponse.json(userPrefs)
  } catch (error) {
    console.error('Error fetching user preferences:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { categories, interests, userId = 'default' } = body
    
    if (!Array.isArray(categories) || !Array.isArray(interests)) {
      return NextResponse.json(
        { error: 'Invalid preferences format' },
        { status: 400 }
      )
    }

    const preferences: UserPreferences = {
      id: userId,
      categories,
      interests,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await saveUserPreferences(preferences)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Preferences saved successfully',
        preferences 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error saving user preferences:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 