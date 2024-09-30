import MUITabs from 'components/common/MUITabs';
import { Box } from '@mui/system';
import ServiceContentSection from 'layout/Services-Section/Content/ServiceContentSection';
import ServiceListSection from 'layout/Services-Section/List/ServiceListSection';
const ServicesSections = () => {
  const tabs = [
    {
      label: 'Content',
      content: <ServiceContentSection />
    },
    {
      label: 'List',
      content: <ServiceListSection />
    }
  ];
  return (
    <Box>
      <MUITabs tabs={tabs} />
    </Box>
  );
};

export default ServicesSections;
