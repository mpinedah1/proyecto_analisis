import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  {
    title: 'Catalogos',
    icon: { name: 'arrowhead-right-outline' },
    children: [
      {
        title: 'Deducciones',
        link: { href: '/catalogos/deducciones' },
      },
      {
        title: 'Tipos de Comisiones',
        link: { href: '/catalogos/tipos-comisiones' },
      },
    ],
  },
  {
    title: 'Empleados',
    icon: { name: 'arrowhead-right-outline' },
    children: [
      {
        title: 'Horas Extras',
        link: { href: '/empleados/horas-extras' },
      },
      {
        title: 'Prestamos',
        link: { href: '/empleados/prestamos' },
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
