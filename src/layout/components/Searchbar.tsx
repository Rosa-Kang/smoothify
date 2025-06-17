import { InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const Searchbar = () => {
    const [keyword, setKeyword] = useState<string>('');

    const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
          setKeyword(e.target.value)
    }

    return (
        <div>
            <TextField
                onChange={handleSearchKeyword}
                value={keyword}
                placeholder="What do you want to play?"
                sx={{ width:  '346px', marginLeft:'24px' }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }} />
        </div>
    )
}

    

export default Searchbar