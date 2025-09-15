import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [index('pages/Home.tsx'), route('rest-client', 'pages/restfulClient.tsx')] satisfies RouteConfig;
