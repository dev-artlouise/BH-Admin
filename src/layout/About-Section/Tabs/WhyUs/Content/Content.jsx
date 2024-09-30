import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import useWhyUsHook from 'hooks/WhyUsHook';
import { Fragment } from 'react';
import { useQuery } from 'react-query';

const Content = () => {
  // Hook for managing data and state
  const { getContent } = useWhyUsHook();

  // Query to fetch the list
  const { data: { data: whyUs = {} } = [] } = useQuery('whyUs', getContent, { refetchOnWindowFocus: false });

  return (
    <Fragment>
      <MainCard title=" Preview" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
        {/* Confirmation dialog for deletion */}
        <Typography variant="h4" gutterBottom>
          {whyUs.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {whyUs.content}
        </Typography>
      </MainCard>
    </Fragment>
  );
};

export default Content;
