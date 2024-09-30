import { Typography, Box, Stack, Divider } from '@mui/material';
import MainCard from 'components/MainCard';
import useMissionVisionHook from 'hooks/MissionVisionHook';
import { useQuery } from 'react-query';

const Content = () => {
  // Hook for managing data and state
  const { getMissionVision } = useMissionVisionHook();

  // Query to fetch the list
  const {
    data: { data: mission_vision } = {}
    // isLoading
  } = useQuery('mission_vision', getMissionVision, { refetchOnWindowFocus: false });

  return (
    <MainCard title="Vision and Mission Preview" darkTitle>
      <Stack gap={3}>
        {/* MISSION */}
        <Box>
          <Typography variant="h5" fontWeight="700" textTransform="uppercase" textAlign="center" gutterBottom>
            Our Mission
          </Typography>

          <Typography variant="body1" textAlign="center" gutterBottom>
            {mission_vision?.mission}
          </Typography>
        </Box>

        <Divider />
        {/* VISION */}
        <Box>
          <Typography variant="h5" fontWeight="700" textTransform="uppercase" textAlign="center" gutterBottom>
            Our Vision
          </Typography>

          <Typography variant="body1" textAlign="center" gutterBottom>
            {mission_vision?.vision}
          </Typography>
        </Box>
      </Stack>
    </MainCard>
  );
};

export default Content;
