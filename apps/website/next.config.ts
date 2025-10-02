import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config: NextConfig = {
  // Workspace root configuration for monorepo
  outputFileTracingRoot: require('path').join(__dirname, '../../'),
  turbopack: {
    root: require('path').join(__dirname, '../../')
  }
};

export default withNextIntl(config);
