 import { Grid, Typography, Box, CircularProgress, styled } from '@mui/material';
import { useEffect } from 'react';
import { BrowseCategories } from '../../models/search';
import { useInView } from 'react-intersection-observer';

interface BrowseCategoryCardsProps {
  data: BrowseCategories[];    
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  onSelect : (keyword : string) => void
}

const LoadingTrigger = styled('div')({
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const BrowseCategoryCards = ({
  data: categories,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  onSelect
}: BrowseCategoryCardsProps) => { 
  const getRandomColor = (seed: string) => {
    const colors = [
    '#FF6F91', '#FFD93D', '#6A93FF', '#00D2A8',
    '#FF9A8B', '#B388EB', '#80ED99', '#FFC75F',
    '#F08A5D', '#3EC1D3', '#F4BFBF', '#A1E3D8'
    ];
    let hash = 0;
    for (let i = 0; i < seed.length; i++)
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };
 
  const { ref, inView } = useInView({ 
    rootMargin: '100px 0px',
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
 
  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography
        variant="h1"
        fontWeight="bold"
        mb={3}
        sx={{ fontSize: '2.5rem' }}
      >
        Browse all
      </Typography>

      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid  size={{xs:12, sm:6, md:4}} key={category.id}>
            <Box
              component="div"
              onClick={() => onSelect(category.name)}
              sx={{
                position: 'relative',
                bgcolor: getRandomColor(category.id),
                height: 200,
                borderRadius: 2,
                overflow: 'hidden',
                p: 2,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.03)', backgroundColor:'rgba(60, 60, 60, 0.25)' },
                '&:hover img': { transform: 'rotate(20deg) scale(1.05)' },
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ textTransform: 'uppercase', fontSize: '1.5rem', zIndex:'1' }}
              >
                {category.name}
              </Typography>

              {category.icons?.[0]?.url && (
                <Box
                  component="img"
                  src={category.icons[0].url}
                  alt={category.name}
                  sx={{
                    position: 'absolute',
                    bottom: -8,
                    right: -5,
                    width: '9rem',
                    height: '9rem',
                    transform: 'rotate(15deg)',
                    transition: '0.3s ease',
                    borderRadius: 1,
                    zIndex: 0
                  }}
                />
              )}
            </Box>
          </Grid>
        ))}

        {hasNextPage && (
          <Grid item size={{xs:12}}>
            <LoadingTrigger ref={ref}>
              {isFetchingNextPage && <CircularProgress size={24} />}
            </LoadingTrigger>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default BrowseCategoryCards;
