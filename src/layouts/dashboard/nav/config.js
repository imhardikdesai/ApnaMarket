// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    isPrivate: true
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    isPrivate: true
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
    isPrivate: false
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  //   isPrivate: false
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  //   isPrivate: false
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  //   isPrivate: false
  // },
];

export default navConfig;
