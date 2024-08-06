// assets
import { LoginOutlined, ProfileOutlined, GroupOutlined, ToolOutlined } from '@ant-design/icons';
import { ApartmentOutlined, AccountTreeOutlined, PeopleOutline } from '@mui/icons-material';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  GroupOutlined,
  ApartmentOutlined,
  ToolOutlined,
  AccountTreeOutlined,
  PeopleOutline,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  // id: 'authentication',
  // title: 'Authentication',
  // type: 'group',
  // children: [
  //   {
  //     id: 'login1',
  //     title: 'Login',
  //     type: 'item',
  //     url: '/login',
  //     icon: icons.LoginOutlined,
  //     target: true
  //   },
  //   {
  //     id: 'register1',
  //     title: 'Register',
  //     type: 'item',
  //     url: '/register',
  //     icon: icons.ProfileOutlined,
  //     target: true
  //   }
  // ]

  id: 'contentManagement',
  title: 'Content Management',
  type: 'group',
  children: [
    {
      id: 'heroSection',
      title: 'Hero Section',
      type: 'item',
      url: '/hero-section',
      icon: icons.GroupOutlined,
      // target: true
    },
    {
      id: 'companiesSections',
      title: 'Companies Section',
      type: 'item',
      url: '/companies-section',
      icon: icons.ApartmentOutlined,
      // target: true
    },
    {
      id: 'services',
      title: 'Services Section',
      type: 'item',
      url: '/services-section',
      icon: icons.ToolOutlined,
      // target: true
    },

    {
      id: 'process',
      title: 'Process Section',
      type: 'item',
      url: '/process-section',
      icon: icons.AccountTreeOutlined,
      // target: true
    },

    {
      id: 'about-us',
      title: 'About Us',
      type: 'item',
      url: '/about-us',
      icon: icons.PeopleOutline,
      // target: true
    }

  ]
};

export default pages;
