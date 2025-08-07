import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'New Vibes',
    short_name: 'New Vibes',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [],
  }
}