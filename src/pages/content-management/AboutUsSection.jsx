import React from 'react';
import { Box } from '@mui/material';

import MUITabs from 'components/common/MUITabs';
import Reputation from 'layout/About-Section/Tabs/Reputation';
import VisionAndVision from 'layout/About-Section/Tabs/VisionAndVision';
import WhyUs from 'layout/About-Section/Tabs/WhyUs';
import OurStory from 'layout/About-Section/Tabs/OurStory';
import OurTeam from 'layout/About-Section/Tabs/OurTeam';
import AboutUs from 'layout/About-Section/Tabs/AboutUs';
import SocMed from 'layout/About-Section/Tabs/SocMed';

const tabs = [
  {
    label: 'About Us',
    content: <AboutUs />
  },
  {
    label: 'Reputation',
    content: <Reputation />
  },
  {
    label: 'Vision and Mission',
    content: <VisionAndVision />
  },
  {
    label: 'Why Us',
    content: <WhyUs />
  },
  {
    label: 'Our Story',
    content: <OurStory />
  },
  {
    label: 'Our Team',
    content: <OurTeam />
  },
  {
    label: 'Social Medias',
    content: <SocMed />
  }
];

const AboutUsSection = () => {
  return (
    <Box>
      <MUITabs tabs={tabs} />
    </Box>
  );
};

export default AboutUsSection;
