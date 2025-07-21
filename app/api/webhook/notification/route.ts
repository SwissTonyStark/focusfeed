import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('📢 Notification received:', {
      message: body.message,
      stats: body.stats,
      recentContent: body.recentContent,
      timestamp: new Date().toISOString()
    })

    // Aquí podrías implementar notificaciones push, emails, etc.
    // Por ahora solo loggeamos la información

    return NextResponse.json({ 
      success: true, 
      message: 'Notification received',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error processing notification:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 