import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
} from '@mui/material';

const FindReplaceForm = ({ onReplace }) => {
    const [inputText, setInputText] = useState('');
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [darkMode, setDarkMode] = useState(false);
  
    const handleReplace = () => {
        try {
          const replacedText = onReplace(inputText, findText, replaceText);
      
          if (replacedText === inputText) {
            // Text not found
            setOutputText('');
            setAlertType('info');
            setAlertMessage('Text not found.');
          } else {
            // Text replaced successfully
            setOutputText(replacedText);
            setAlertType('success');
            setAlertMessage('Text replaced successfully!');
          }
        } catch (error) {
          // An error occurred during replacement
          setOutputText('');
          setAlertType('error');
          setAlertMessage('An error occurred: ' + error);
        }
      };
  
    const handleReset = () => {
      setInputText('');
      setFindText('');
      setReplaceText('');
      setOutputText('');
      setAlertType('');
      setAlertMessage('');
    };
  
    const handleDarkModeToggle = () => {
      setDarkMode(!darkMode);
    };
  
    const handleCopyOutput = () => {
      const outputTextArea = document.getElementById('output_text');
      if (outputTextArea) {
        outputTextArea.select();
        document.execCommand('copy');
      }
    };
  
    const theme = createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    });
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="md">
          <Paper elevation={3} style={styles.paper}>
            <Typography component="h1" variant="h5" align="center">
              Find and Replace
            </Typography>
  
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="input_text"
                  label="Input Text"
                  name="input_text"
                  multiline
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="find_text"
                  label="Find Text"
                  name="find_text"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="replace_text"
                  label="Replace Text"
                  name="replace_text"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                />
              </Grid>
            </Grid>
  
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleReplace}
                  style={styles.submit}
                >
                  Replace Text
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleReset}
                  style={styles.submit}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
  
            {alertType && alertMessage && (
              <Typography variant="body2" color={alertType} align="center" style={styles.alert}>
                {alertMessage}
              </Typography>
            )}
  
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="output_text"
              label="Output Text"
              name="output_text"
              multiline
              rows={4}
              value={outputText}
              InputProps={{
                readOnly: true,
              }}
            />
  
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
              <Grid item>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleCopyOutput}
                  style={styles.copyButton}
                >
                  Copy Output
                </Button>
              </Grid>
              <Grid item>
                <Typography>Dark Mode</Typography>
              </Grid>
              <Grid item>
                <Switch checked={darkMode} onChange={handleDarkModeToggle} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  };
  
  const styles = {
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    submit: {
      margin: '10px 0',
    },
    alert: {
      margin: '10px 0',
    },
    copyButton: {
      margin: '10px 0',
    },
  };
  
  export default FindReplaceForm;