import { Grid, Typography } from '@mui/material';
import { useGetNewReleases } from '../../../hooks/useGetNewReleases'
import Loading from '../../../common/components/Loading';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  
  if(isLoading) { 
    return <Loading />
  }

  if(error) {
    return <ErrorMessage errorMessage={error.message} />
  }

  console.log(data)

  return (
    <div>
        <Typography variant='h1' paddingTop='8px' paddingLeft='12px' fontSize={28}>
          New Released Albums
        </Typography>

        {data && data.albums.items.length>0 ? 
         (
          <Grid container spacing={2}>
            {data.albums.items.map((item) => (
              <Grid size={{xs:6, sm:4, md:2}} key={item.id}>
                  <Card 
                    image={item.images[0].url}
                    name={item.name}
                    artistName={item.artists[0].name}
                    externalLink = {item.external_urls.spotify}
                  />
              </Grid>
            )
            )}
          </Grid>
         )
        : <Typography variant='h2'>No data available..</Typography>}
    </div>
  )
}

export default NewReleases