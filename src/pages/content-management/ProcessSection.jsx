import { Box } from '@mui/material';
import MUITabs from 'components/common/MUITabs';
import ProcessListSection from 'layout/Process-Section/List/ProcessListSection';
import ProcessContentSection from 'layout/Process-Section/ProcessContentSection';

const ProcessSection = () => {
  const tabs = [
    {
      label: 'Content',
      content: <ProcessContentSection />
    },
    {
      label: 'List',
      content: <ProcessListSection />
    }
  ];
  return (
    <Box>
      <MUITabs tabs={tabs} />
    </Box>
  );
};

export default ProcessSection;
