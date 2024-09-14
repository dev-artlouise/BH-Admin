import { Box, Typography, Skeleton } from '@mui/material';
import MainCard from 'components/MainCard';
import { useQuery } from 'react-query';
import { getHeroContent } from 'services/heroServices';

const HeroContent = () => {
  // Fetch hero content using react-query
  const {
    data: heroContent,
    isLoading,
    isFetching
  } = useQuery('hero', getHeroContent, {
    refetchOnWindowFocus: false // Prevent refetch on window focus
  });

  // Destructure data when it is available
  const { title, image, content } = heroContent?.data || {};

  return (
    <MainCard title="Current Hero Section" darkTitle contentSX={{ maxHeight: 1000, overflowY: 'auto' }}>
      {/* Display loading skeletons if still loading or fetching */}
      {isLoading || isFetching ? (
        <>
          <Skeleton width="50%" height={50} sx={{ marginBottom: '1rem' }} />
          <Skeleton variant="rectangular" height={140} sx={{ marginBottom: '1rem' }} />
          <Skeleton width="100%" />
        </>
      ) : title ? (
        <>
          {/* IMAGE SECTION WITH BORDER RADIUS */}
          <Box
            sx={{
              mb: 2, // Margin bottom
              overflow: 'hidden' // Hide overflowed parts of the image
            }}
          >
            <Box
              component="img"
              src={image || 'https://via.placeholder.com/100'}
              alt="Hero section"
              sx={{
                width: '50%', // Ensure the image takes up the full width of the container
                height: 'auto', // Maintain aspect ratio
                objectFit: 'cover', // Ensure the image covers the container area
                borderRadius: '1rem' // Inherit border radius from the container
              }}
            />
          </Box>

          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>

          <Typography variant="body1" gutterBottom>
            {content}
          </Typography>
        </>
      ) : (
        // Display 'No Hero Content Available' only if not loading and no data is available
        <Typography variant="body1" align="center">
          No Hero Content Available
        </Typography>
      )}
    </MainCard>
  );
};

export default HeroContent;
