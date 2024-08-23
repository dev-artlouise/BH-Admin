import React from 'react'
import { Box } from '@mui/material';

import MUITabs from 'components/common/MUITabs';
import Reputation from 'layout/About-Section/Tabs/Reputation';
import VisionAndVision from 'layout/About-Section/Tabs/VisionAndVision';
import WhyUs from 'layout/About-Section/Tabs/WhyUs';
import OurStory from 'layout/About-Section/Tabs/OurStory';
import OurTeam from 'layout/About-Section/Tabs/OurTeam';

const tabs = [
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
    }
];

const AboutUsSection = () => {
    return (
        <Box>
            <MUITabs
                tabs={tabs}
            />
        </Box>
    )
}

export default AboutUsSection
