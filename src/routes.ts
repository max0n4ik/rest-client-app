import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [index('pages/Home.tsx'), route('rest-client', 'pages/RestfulClient.tsx')] satisfies RouteConfig;
