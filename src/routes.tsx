import type { RouteRecord } from 'vite-react-ssg'
import HomePage from '@/pages/home/HomePage'

// 정적 프리렌더 라우트: / (ko), /en (en)
export const routes: RouteRecord[] = [
  { path: '/', element: <HomePage lang="ko" /> },
  { path: '/en', element: <HomePage lang="en" /> },
]
