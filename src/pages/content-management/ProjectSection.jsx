import { Box } from '@mui/material';
import MUITabs from 'components/common/MUITabs';
import ContentSection from 'layout/Project-Section/Content/ContentSection';
import ListSection from 'layout/Project-Section/List/ListSection';

const ProjectSection = () => {
  const tabs = [
    {
      label: 'Content',
      content: <ContentSection />
    },
    {
      label: 'List',
      content: <ListSection />
    }
  ];
  return (
    <Box>
      <MUITabs tabs={tabs} />
    </Box>
  );
};

export default ProjectSection;
