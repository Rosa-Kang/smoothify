import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const Searchbar = () => {
    const [keyword, setKeyword] = useState<string>('');

    const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
          setKeyword(e.target.value)
    }

    return (
        <Box component="div">
            <TextField
                onChange={handleSearchKeyword}
                value={keyword}
                placeholder="What do you want to play?"
                sx={{ width:  '340px', marginLeft:'24px', backgroundColor:'rgba(255, 255, 255, 0.23)'}}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }} />
        </Box>
    )
}

    

export default Searchbar