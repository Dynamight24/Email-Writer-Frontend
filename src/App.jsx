import { useState } from 'react'
import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Link, Paper, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("https://email-writer-backend-pefe.onrender.com/api/email/generate", {
       emailContent,
       tone 
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField 
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb:2 }}/>

          <FormControl fullWidth sx={{ mb:2 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label={"Tone (Optional)"}
              onChange={(e) => setTone(e.target.value)}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth>
            {loading ? <CircularProgress size={24}/> : "Generate Reply"}
          </Button>
      </Box>

      {error && (
        <Typography color='error' sx={{ mb:2 }}>
          {error}
        </Typography>
      )}

      {generatedReply && (
       <Box sx={{ mt: 3}}>
          <Typography variant='h6' gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            value={generatedReply || ''}
            inputProps={{ readOnly: true }}/>
        
        <Button
          variant='outlined'
          sx={{ mt: 2 }}
          onClick={() => navigator.clipboard.writeText(generatedReply)}>
            Copy to Clipboard
        </Button>
       </Box> 
      )}

      {/* Extension Info Section */}
      <Paper sx={{ mt: 5, p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          🚀 Check out the Email Reply Assistant Extension
        </Typography>
        <Typography variant="body1" gutterBottom>
          You can also use this project directly inside Gmail using our Chrome Extension.
        </Typography>
        <Link 
          href="https://github.com/your-username/email-reply-extension" 
          target="_blank" 
          rel="noopener" 
          underline="hover"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          👉 View on GitHub
        </Link>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Installation Steps:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. Download the extension code from GitHub." />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Store it in a folder on your computer." />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. Open Chrome → Extensions → Enable Developer Mode." />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Click on 'Load Unpacked' and select the extension folder." />
          </ListItem>
          <ListItem>
            <ListItemText primary="5. Now you can use the Email Reply Assistant inside Gmail!" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  )
}

export default App

