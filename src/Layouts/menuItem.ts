import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  {
    title: 'Deducciones',
    icon: { name: 'arrowhead-right-outline' },
    link: { href: '/deducciones' },
  },
  {
    title: 'Empleados',
    icon: { name: 'arrowhead-right-outline' },
    children: [
      {
        title: 'Horas Extras',
        link: { href: '/empleados/horas-extras' },
      },
    ],
  },
  {
    title: 'Test',
    icon: { name: 'lock-outline' },
    children: [
      {
        title: 'Login',
        link: { href: '/auth/login' },
      },
    ],
  },
];

export default items;
