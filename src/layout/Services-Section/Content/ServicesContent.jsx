import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import useServiceHook from 'hooks/ServiceHook';
import { Fragment } from 'react';
import { useQuery } from 'react-query';

const ServicesContent = () => {
  // Hook for managing data and state
  const { getContent } = useServiceHook();

  // Query to fetch
  const { data: { data: service = {} } = [] } = useQuery('service', getContent, { refetchOnWindowFocus: false });

  return (
    <Fragment>
      <MainCard title="Service Content Preview" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
        {/* Confirmation dialog for deletion */}
        <Typography variant="h4" gutterBottom>
          {service.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {service.content}
        </Typography>
      </MainCard>
    </Fragment>
  );
};

export default ServicesContent;
