import { Theme } from './types/theme';

export const theme: Theme = {
  colors: {
    primary: '#000000',
    secondary: '#1d1d1f',
    accent: '#2997ff',
    background: '#000000',
    text: '#f5f5f7',
    textSecondary: '#86868b', // Renamed from secondary to avoid duplicate property
    surface: '#151516',
    surfaceHover: '#1c1c1d', 
    border: '#282828',
  },
  transitions: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  borderRadius: '12px',
  glassMorphism: {
    background: 'rgba(0, 0, 0, 0.8)',
    blur: '20px',
  },
}; 