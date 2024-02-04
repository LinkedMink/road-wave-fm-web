import { connect, MapStateToProps } from 'react-redux';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigationMenu, {
  NavigationMenuLink,
  NavigationMenuStateProps,
  NavigationMenuOwnProps,
} from '../../components/layout/NavigationMenu';
import { RootState } from '../../reducers/RootReducer';
// import SettingsIcon from '@mui/icons-material/Settings';
//import { useLocation } from 'react-router-dom';

const getGuestLinks = () => {
  return [
    {
      path: '/home',
      name: 'Home',
      icon: HomeOutlinedIcon,
      active: false,
      tooltip: 'Find radio stations near you on the go',
    },
    /*
    {
      path: '/settings',
      name: 'Settings',
      icon: SettingsIcon,
      active: false,
      tooltip: 'Configure your station search settings',
    },

    {
      path: '/login',
      name: 'Login',
      icon: LockOpenIcon,
      active: false,
      tooltip: 'Sign into your account',
    },
    {
      path: '/register',
      name: 'Register',
      icon: PersonAddOutlinedIcon,
      active: false,
      tooltip: 'Create a new account',
    },
    {},
    */
    {
      path: '/about',
      name: 'About',
      icon: InfoOutlinedIcon,
      active: false,
      tooltip: 'Find out more about this app',
    },
  ] as NavigationMenuLink[];
};

const getAuthenticatedLinks = () => {
  return [
    {
      path: '/home',
      name: 'Home',
      icon: HomeOutlinedIcon,
      active: false,
      tooltip: 'Discover the dangers of traveling by auto',
    },
    {},
    {
      path: '/about',
      name: 'About',
      icon: InfoOutlinedIcon,
      active: false,
      tooltip: 'Find out more about this app',
    },
  ] as NavigationMenuLink[];
};

const mapStateToProps: MapStateToProps<
  NavigationMenuStateProps,
  NavigationMenuOwnProps,
  RootState
> = (state: RootState) => {
  let links;
  if (state.session.jwtToken) {
    links = getAuthenticatedLinks();
  } else {
    links = getGuestLinks();
  }

  return {
    links: links,
  };
};

const NavigationMenuContainer = connect(mapStateToProps, { pure: false })(NavigationMenu);

export default NavigationMenuContainer;