import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import useTestimonialsHook from 'hooks/TestimonialsHook';
import { Fragment } from 'react';
import { useQuery } from 'react-query';

const Content = () => {
  // Hook for managing  data and state
  const { getContent } = useTestimonialsHook();

  // Query to fetch the list
  const { data: { data: testimonial = {} } = [] } = useQuery('testimonial', getContent, { refetchOnWindowFocus: false });

  return (
    <Fragment>
      <MainCard title=" Preview" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
        {/* Confirmation dialog for deletion */}
        <Typography variant="h4" gutterBottom>
          {testimonial.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {testimonial.content}
        </Typography>
      </MainCard>
    </Fragment>
  );
};

export default Content;
