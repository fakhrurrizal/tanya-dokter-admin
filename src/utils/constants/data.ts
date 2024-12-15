export const menu_static = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'material-symbols:dashboard-outline',
    children: [],
  },
  {
    path: '#',
    name: 'Master Data',
    icon: 'ant-design:database-outlined',
    children: [
      {
        path: '/master-data/category',
        name: 'Kategori',
        icon: 'material-symbols:category-outline',
        children: [],
      },
      {
        path: '/master-data/data-drugs',
        name: 'Data Obat',
        icon: 'majesticons:data-line',
        children: [],
      },
    ],
  },
  {
    path: '#',
    name: 'User Management',
    icon: 'mdi:users-outline',
    children: [
      {
        path: '/master-data/user-doctor',
        name: 'Dokter',
        icon: 'material-symbols:patient-list-rounded',
        children: [],
      },
      {
        path: '/master-data/user-patient',
        name: 'Pasien',
        icon: 'material-symbols:patient-list-rounded',
        children: [],
      },
    ],
  },
];
