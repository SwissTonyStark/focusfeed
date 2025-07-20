export interface Content {
  id: string
  title: string
  summary: string
  fullText: string
  originalLink: string
  score: number
  estimatedDuration: number
  category: string
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  id: string
  categories: string[]
  interests: string[]
  createdAt: string
  updatedAt: string
}

export interface WebhookPayload {
  title: string
  summary: string
  fullText: string
  originalLink: string
  category: string
  estimatedDuration?: number
}

export type Category = 'IA' | 'Startups' | 'Finanzas' | 'Tecnología' | 'Marketing' | 'Productividad'

export const CATEGORIES: Category[] = ['IA', 'Startups', 'Finanzas', 'Tecnología', 'Marketing', 'Productividad'] 