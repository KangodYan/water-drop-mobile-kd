import Home from '@/containers/Home';
import Login from '@/containers/Login';
import My from '@/containers/My';
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
    key: 'my',
    path: '/my',
    element: My,
  },
  {
    key: 'home',
    path: '/',
    element: Home,
  },
];
