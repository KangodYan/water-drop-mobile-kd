import Home from '@/containers/Home';
import Login from '@/containers/Login';
import Register from '@/containers/Register';

export const ROUTE_CONFIG = [
  {
    key: 'login',
    path: '/login',
    element: Login,
  },
  {
    key: 'register',
    path: '/register',
    element: Register,
  },
  {
    key: 'home',
    path: '/',
    element: Home,
  },
];
