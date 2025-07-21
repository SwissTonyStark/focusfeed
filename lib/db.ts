import fs from 'fs/promises'
import path from 'path'
import { Content, UserPreferences } from '@/types'

const DB_DIR = path.join(process.cwd(), 'data')
const CONTENT_FILE = path.join(DB_DIR, 'content.json')
const PREFERENCES_FILE = path.join(DB_DIR, 'preferences.json')

// Ensure data directory exists
async function ensureDbExists() {
  try {
    await fs.access(DB_DIR)
  } catch {
    await fs.mkdir(DB_DIR, { recursive: true })
  }
}

// Initialize empty files if they don't exist
async function initializeFiles() {
  await ensureDbExists()
  
  try {
    await fs.access(CONTENT_FILE)
  } catch {
    await fs.writeFile(CONTENT_FILE, JSON.stringify([]))
  }
  
  try {
    await fs.access(PREFERENCES_FILE)
  } catch {
    await fs.writeFile(PREFERENCES_FILE, JSON.stringify([]))
  }
}

export async function getAllContent(): Promise<Content[]> {
  await initializeFiles()
  const data = await fs.readFile(CONTENT_FILE, 'utf-8')
  return JSON.parse(data)
}

export async function saveContent(content: Content): Promise<void> {
  await initializeFiles()
  const contents = await getAllContent()
  contents.push(content)
  await fs.writeFile(CONTENT_FILE, JSON.stringify(contents, null, 2))
}

export async function getContentByCategory(category: string): Promise<Content[]> {
  const contents = await getAllContent()
  return contents.filter(content => content.category === category)
}

export async function getUserPreferences(): Promise<UserPreferences[]> {
  await initializeFiles()
  const data = await fs.readFile(PREFERENCES_FILE, 'utf-8')
  return JSON.parse(data)
}

export async function saveUserPreferences(preferences: UserPreferences): Promise<void> {
  await initializeFiles()
  const allPreferences = await getUserPreferences()
  const existingIndex = allPreferences.findIndex(p => p.id === preferences.id)
  
  if (existingIndex >= 0) {
    allPreferences[existingIndex] = preferences
  } else {
    allPreferences.push(preferences)
  }
  
  await fs.writeFile(PREFERENCES_FILE, JSON.stringify(allPreferences, null, 2))
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export async function getContentById(id: string): Promise<Content | null> {
  const contents = await getAllContent()
  return contents.find(content => content.id === id) || null
}

export async function deleteContent(id: string): Promise<void> {
  await initializeFiles()
  const contents = await getAllContent()
  const filteredContents = contents.filter(content => content.id !== id)
  await fs.writeFile(CONTENT_FILE, JSON.stringify(filteredContents, null, 2))
}

export async function updateContent(id: string, updates: Partial<Content>): Promise<Content> {
  await initializeFiles()
  const contents = await getAllContent()
  const index = contents.findIndex(content => content.id === id)
  
  if (index === -1) {
    throw new Error('Content not found')
  }
  
  contents[index] = {
    ...contents[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  await fs.writeFile(CONTENT_FILE, JSON.stringify(contents, null, 2))
  return contents[index]
}

export async function softDeleteContent(id: string): Promise<void> {
  await updateContent(id, { isDeleted: true })
}

export async function restoreContent(id: string): Promise<void> {
  await updateContent(id, { isDeleted: false })
}

export async function bookmarkContent(id: string, bookmarked: boolean): Promise<void> {
  await updateContent(id, { isBookmarked: bookmarked })
}

export async function incrementReadCount(id: string): Promise<void> {
  const content = await getContentById(id)
  if (content) {
    const currentCount = content.readCount || 0
    await updateContent(id, { 
      readCount: currentCount + 1,
      lastReadAt: new Date().toISOString()
    })
  }
} 