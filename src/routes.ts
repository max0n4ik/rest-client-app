import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./pages/Layout.tsx', [
    index('./pages/Home.tsx'),
    route('*', './pages/NotFound.tsx'),
    route('rest-client', 'pages/restfulClient.tsx'),
    route('login', './pages/Login/Login.tsx'),
    route('registration', './pages/Registration/Registration.tsx'),
  ]),
] satisfies RouteConfig;
