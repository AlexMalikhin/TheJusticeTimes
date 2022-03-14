import { AllArticlesInterface } from '../components/FullArticlePages/types'

export interface ArticleInterface {
  _id?: any | undefined
  id?: string | undefined
  headImg: any | undefined
  firstname: string | undefined
  lastname: string | undefined
  avatar: string | undefined
  views: number
  title: string | undefined
  text: string | undefined
  date: string | undefined
  category: string | undefined
  viewArticle?: (id: string) => any | undefined
  find?: any | undefined
}

export interface ArticlesProps {
  topArticle?: ArticleInterface
  myArticles?: ArticleInterface
  article?: ArticleInterface
  viewArticle?: (id: string) => void
}

export type ButtonStylesType =
  | 'header_logout'
  | 'header_logIn'
  | 'header_signIn'
  | 'footer_logout'
  | 'footer_signIn'
  | 'footer_logIn'
  | 'form_button'
  | 'profile_save_changes'
  | 'all_articles'
  | 'category'

export type AuthType = string | number | boolean
