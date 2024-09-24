<<<<<<< HEAD
import { Typography, Skeleton, Grid, Container, Box } from '@mui/material';
=======
import { Box, Typography, Skeleton } from '@mui/material';
>>>>>>> 654e0da1bf16922f494a9ae6ec6a4eedfa76600e
import MainCard from 'components/MainCard';
import { useQuery } from 'react-query';
import { getHeroContent } from 'services/heroServices';

const HeroContent = () => {
<<<<<<< HEAD
    // Fetch hero content using react-query
    const { data: heroContent, isLoading, isFetching } = useQuery('hero', getHeroContent, {
        refetchOnWindowFocus: false // Prevent refetch on window focus
    });

    const { title, image, content } = heroContent?.data || {};

    // Define common styles
    const commonTextAlign = { xs: 'center', md: 'left', lg: 'left' };
    const commonFontSize = { xs: '38px', sm: '42px', md: '50px', lg: '60px' };

    return (
        <MainCard title="Current Hero Section" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
            {/* Display loading skeletons if still loading or fetching */}
            {isLoading || isFetching ? (
                <>
                    <Skeleton width="50%" height={50} sx={{ marginBottom: '1rem' }} />
                    <Skeleton variant="rectangular" height={140} sx={{ marginBottom: '1rem' }} />
                    <Skeleton width="100%" />
                </>
            ) : heroContent?.data ? (
                <Container>
                    <Box>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <Box sx={{ marginBottom: '16px' }}>
                                    <Typography
                                        variant="h2"
                                        component="h2"
                                        sx={{
                                            fontWeight: '700',
                                            textAlign: commonTextAlign,
                                            fontSize: commonFontSize,
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                </Box>

                                <Box sx={{ marginBottom: '24px' }}>
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        color="#565973"
                                        lineHeight="1.6"
                                        sx={{
                                            fontWeight: '500',
                                            textAlign: commonTextAlign,
                                            fontSize: { xs: '18px', lg: '20px' },
                                        }}
                                    >
                                        {content}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6} sx={{ paddingLeft: '32px', paddingTop: '32px' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        height: '100%',
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        src={image || 'https://via.placeholder.com/150'}
                                        alt="Hero section"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            ) : (
                <Typography variant="body1" align="center">
                    No Hero Content Available
                </Typography>
            )}
        </MainCard>
    );
=======
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
>>>>>>> 654e0da1bf16922f494a9ae6ec6a4eedfa76600e
};

export default HeroContent;
