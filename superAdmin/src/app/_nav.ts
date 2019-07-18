interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    title: true,
    name: 'SuperAdmin'
  },
  {
    name : 'Gestion Users',
    icon : 'icon-speedometer',
    url : '/SuperAdmin/gestion-users'
  },
  {
    name : 'Statistiques Users',
    icon : 'icon-note',
    url : '/SuperAdmin/stats-users'
  },
  {
    name : 'Statistiques Todos',
    icon : 'icon-note',
    url : '/SuperAdmin/stats-todos'
  }
];
