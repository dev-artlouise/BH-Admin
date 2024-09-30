import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ProjectSection from 'pages/content-management/ProjectSection';
import TestimonialsSection from 'pages/content-management/TestimonialsSection';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const HeroSection = Loadable(lazy(() => import('pages/content-management/HeroSection')));
const Companies = Loadable(lazy(() => import('pages/content-management/CompaniesSection')));
const Services = Loadable(lazy(() => import('pages/content-management/ServicesSections')));
const Process = Loadable(lazy(() => import('pages/content-management/ProcessSection')));
const AboutUs = Loadable(lazy(() => import('pages/content-management/AboutUsSection')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    // {
    //   path: '/',
    //   element: <DashboardDefault />
    // },
    // {
    //   path: 'color',
    //   element: <Color />
    // },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },

    {
      path: 'hero-section',
      element: <HeroSection />
    },

    {
      path: 'companies-section',
      element: <Companies />
    },

    {
      path: 'services-section',
      element: <Services />
    },

    {
      path: 'process-section',
      element: <Process />
    },
    {
      path: 'project-section',
      element: <ProjectSection />
    },
    {
      path: 'testimonials-section',
      element: <TestimonialsSection />
    },
    {
      path: 'about-us',
      element: <AboutUs />
    }
  ]
};

export default MainRoutes;
