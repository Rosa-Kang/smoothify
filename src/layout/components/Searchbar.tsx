import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface SearchbarProps {
  onSelect: (keyword: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSelect }) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      const value = keyword.trim();
      if (value) {
        onSelect(value);
      }
    }
  };

  return (
    <Box>
      <TextField
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="What do you want to play?"
        sx={{
          width: 340,
          ml: 3,
          bgcolor: 'rgba(255, 255, 255, 0.23)',
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default Searchbar;
