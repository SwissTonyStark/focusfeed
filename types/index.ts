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
  // Nuevos campos para insights y gestión
  insights?: Insight[]
  tags?: string[]
  isBookmarked?: boolean
  isDeleted?: boolean
  readCount?: number
  lastReadAt?: string
  knowledgeLevel?: 'beginner' | 'intermediate' | 'advanced'
  relatedTopics?: string[]
  updateHistory?: ContentUpdate[]
}

export interface Insight {
  id: string
  type: 'key_point' | 'action_item' | 'trend' | 'warning' | 'opportunity'
  title: string
  description: string
  icon: string
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  isActionable?: boolean
  actionItems?: string[]
}

export interface ContentUpdate {
  id: string
  type: 'new_insight' | 'score_change' | 'category_change' | 'obsolete'
  description: string
  oldValue?: any
  newValue?: any
  createdAt: string
}

export interface ContentFilters {
  category?: string
  score?: number
  dateRange?: {
    start: string
    end: string
  }
  tags?: string[]
  knowledgeLevel?: string
  showDeleted?: boolean
  showBookmarked?: boolean
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