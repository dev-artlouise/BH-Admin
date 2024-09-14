import { Fragment, useEffect } from 'react';
import { Typography, Skeleton } from '@mui/material';
import MainCard from 'components/MainCard';
import { useQuery } from 'react-query';
import { getHeroContent } from 'services/heroServices';

const HeroContent = () => {
    // Fetch hero content using react-query
    const { data: heroContent = [], isLoading, isFetching } = useQuery('hero', getHeroContent, {
        refetchOnWindowFocus: false // Prevent refetch on window focus
    });

    // Check the structure of heroContent to determine how to access the data
    // const heroContentData = heroContent?.data || heroContent;

    useEffect(() => {
        // Log the content data after it is fetched
        if (heroContent) {
            console.log(heroContentlength); // Log only when data is available
        }
    }, [heroContent]); // Add heroContentData as a dependency to trigger on change

    return (
        <>
            <MainCard
                title="Current Hero Section"
                darkTitle
                contentSX={{ maxHeight: 450, overflowY: 'auto' }}
            >
                {/* Display loading skeletons if still loading or fetching */}
                {isLoading || isFetching ? (
                    <Fragment>
                        <Skeleton
                            width="50%"
                            height={50}
                            sx={{ marginBottom: '1rem' }}
                        />
                        <Skeleton
                            variant="rectangular"
                            height={140}
                            sx={{ marginBottom: '1rem' }}
                        />
                        <Skeleton width="100%" />
                    </Fragment>
                ) : heroContent && heroContent.length > 0 ? (
                    // Display content when fetched
                    heroContent?.data.map(({ title, image, content }, index) => (
                        <Fragment key={index}>
                            <Typography variant="h4" gutterBottom>
                                {title}
                            </Typography>

                            {/* IMAGE SECTION PLACEHOLDER */}
                            <div>
                                <img
                                    src={image || 'https://via.placeholder.com/150'}
                                    alt="Hero section"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>

                            <Typography variant="body1" gutterBottom>
                                {content}
                            </Typography>
                        </Fragment>
                    ))
                ) : (
                    // Display 'No Hero Content Available' only if not loading and no data is available
                    <Typography variant="body1" align="center">
                        No Hero Content Available
                    </Typography>
                )}
            </MainCard>
        </>
    );
};

export default HeroContent;
