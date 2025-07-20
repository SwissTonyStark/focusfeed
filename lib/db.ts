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