export default {
  pages: {
    home: '/',
    teachers: {
      root: '/teachers',
      add: 'new',
      edit: ':id/edit',
      detail: ':id',
    },
    meeting: '/meeting',
    aboutApp: '/about-app',
    aboutDev: '/about-dev',
  },
  navigate: {
    home: '/',
    teachers: {
      root: '/teachers',
      add: '/teachers/new',
      edit: (id) => `/teachers/${id}/edit`,
      detail: (id) => `/teachers/${id}`,
    },
    meeting: '/meeting',
    aboutApp: '/about-app',
    aboutDev: '/about-dev',
  },
}
