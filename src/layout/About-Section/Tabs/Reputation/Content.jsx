import { Typography, Box, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import useReputationHook from 'hooks/ReputationHook';
import { useQuery } from 'react-query';

const Content = () => {
  // Hook for managing  data and state
  const { getReputation } = useReputationHook();

  // Query to fetch the list
  const {
    data: { data: reputation } = {}
    // isLoading
  } = useQuery('reputations', getReputation, { refetchOnWindowFocus: false });

  return (
    <MainCard title="Reputation Section Preview" darkTitle>
      <Grid container mt={2}>
        {/* YEARS */}
        <Grid item xs={12} sm={4}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h2">{reputation?.year_in_business}</Typography>
            <Typography variant="body1" mb={2}>
              Years in Business
            </Typography>
          </Box>
        </Grid>

        {/* YEARS */}
        <Grid item xs={12} sm={4}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h2">{reputation?.project_delivered}+</Typography>
            <Typography variant="body1" mb={2}>
              Project Delivered
            </Typography>
          </Box>
        </Grid>

        {/* SATISFIED */}
        <Grid item xs={12} sm={4}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h2">{reputation?.satisfied_customer}%</Typography>
            <Typography variant="body1" mb={2}>
              Satisfied Customer
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Content;
