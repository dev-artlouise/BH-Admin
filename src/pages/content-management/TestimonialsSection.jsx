import { Box } from '@mui/material';
import MUITabs from 'components/common/MUITabs';
import ListSection from 'layout/Testimonials-Section/List/ListSection';
import ContentSection from 'layout/Testimonials-Section/Content/ContentSection';

const TestimonialsSection = () => {
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

export default TestimonialsSection;
