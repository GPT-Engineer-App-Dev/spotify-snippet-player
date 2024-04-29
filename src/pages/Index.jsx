// Complete the Index page component here
// Use chakra-ui
import { Box, Input, Button, Text, Image, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const Index = () => {
  const [search, setSearch] = useState('');
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track&limit=1`, {
        headers: {
          Authorization: `Bearer ${your_access_token_here}`, // Token needs to be dynamically fetched
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setSong(data.tracks.items[0]);
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch song data.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Box textAlign="center" py={10}>
      <Text fontSize="2xl" fontWeight="bold">Spotify Song Search</Text>
      <Input placeholder="Type a song name..." value={search} onChange={(e) => setSearch(e.target.value)} mt={4} />
      <Button onClick={handleSearch} isLoading={loading} mt={2}>Search</Button>
      {song && (
        <Box mt={4}>
          <Text fontSize="xl">{song.name} by {song.artists.map(artist => artist.name).join(', ')}</Text>
          <Image src={song.album.images[0].url} alt="Album cover" />
          <audio controls src={song.preview_url}>
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}
    </Box>
  );
};

export default Index;