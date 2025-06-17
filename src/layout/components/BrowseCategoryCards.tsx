// layout/components/BrowseCategoryCards.tsx
import { Grid, Typography, Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { BrowseCategories } from '../../models/search';

interface BrowseCategoryCardsProps {
  data: BrowseCategories[];              
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

const BrowseCategoryCards = ({
  data: categories,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: BrowseCategoryCardsProps) => {
  const getRandomColor = (seed: string) => {
    const colors = [
      '#E13300', '#1E3264', '#AF2896', '#477D95',
      '#503750', '#F59B23', '#27856A', '#8D67AB',
      '#B49BC8', '#148A08',
    ];
    let hash = 0;
    for (let i = 0; i < seed.length; i++)
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && fetchNextPage(),
      { threshold: 1 },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

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
          <Grid item size={{xs:12, sm:6, md:4}} key={category.id}>
            <Box
              component="section"
              sx={{
                position: 'relative',
                bgcolor: getRandomColor(category.id),
                height: 220,
                borderRadius: 2,
                overflow: 'hidden',
                p: 2,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ textTransform: 'uppercase', fontSize: '1.5rem' }}
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
                    right: -8,
                    width: 80,
                    height: 80,
                    transform: 'rotate(15deg)',
                    borderRadius: 1,
                  }}
                />
              )}
            </Box>
          </Grid>
        ))}

        {/* sentinel: 보이면 fetchNextPage() */}
        {hasNextPage && (
          <Grid item xs={12}>
            <Box ref={sentinelRef} sx={{ height: 1 }} />
          </Grid>
        )}
      </Grid>

      {isFetchingNextPage && (
        <Typography align="center" mt={2}>
          Loading more…
        </Typography>
      )}
    </Box>
  );
};

export default BrowseCategoryCards;
