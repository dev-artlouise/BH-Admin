import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import useHeroHook from 'hooks/HeroHook';
import { useQuery } from 'react-query';

const HeroContent = () => {
<<<<<<< HEAD
    // Hook for managing company data and state
    const { getContent } = useHeroHook();

    // Query to fetch the list of companies
    const {
        data: { data: hero = {} } = {}
        // isLoading
    } = useQuery('hero', getContent, { refetchOnWindowFocus: false });
=======
  // Hook for managing data and state
  const { getContent } = useHeroHook();

  // Query to fetch the list
  const {
    data: { data: hero = {} } = {}
    // isLoading
  } = useQuery('hero', getContent, { refetchOnWindowFocus: false });
>>>>>>> fcd294986ad7dc05b2a2d38aae8e74b524ef62ae

    return (
        <MainCard title="Current Hero Section" darkTitle>
            <Typography variant="h4" gutterBottom>
                {hero?.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {hero?.content}
            </Typography>

            {hero?.image && <img src={hero?.image} alt="Preview" width={'auto'} height={320} />}
        </MainCard>
    );
};

export default HeroContent;
