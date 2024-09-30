import React from 'react';

import { Box } from '@mui/material';
import MUITabs from 'components/common/MUITabs';

import Section from './Project/Section';
import List from './Project/ListSection';

const tabs = [
  {
    label: 'Content',
    content: <Section />
  },
  {
    label: 'List',
    content: <List />
  }
];

const ProjectSection = () => {
  return (
    <Box>
      <MUITabs tabs={tabs} />
    </Box>
  );
};

export default ProjectSection;
