import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';
export default [
  layout('./pages/Layout/Layout.tsx', [
    index('./pages/Home/Home.tsx'),
    route('*', './pages//NotFound/NotFound.tsx'),
    route('rest-client', 'pages/RestfulClient/restfulClient.tsx'),
    route('login', './pages/Login/Login.tsx'),
    route('registration', './pages/Registration/Registration.tsx'),
  ]),
] satisfies RouteConfig;
