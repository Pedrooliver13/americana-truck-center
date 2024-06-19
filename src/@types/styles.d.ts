// Packages
import 'styled-components';

// Styles
import { defaultTheme } from '../styles/theme/default';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
