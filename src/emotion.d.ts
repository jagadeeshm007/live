import '@emotion/react';
import { Theme as CustomTheme } from './types/theme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
} 