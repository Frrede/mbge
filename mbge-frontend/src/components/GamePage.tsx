import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Typography
} from '@material-ui/core';
import {AxiosResponse} from 'axios';
import {GambleForm} from './GambleForm';
import {HighScoreList} from './HighScoreList';
import {gamble, getHighScoreList} from '../services/score.service';
import {ScoreList} from '../models/score-list';
import {GambleResult, ScoreResultType} from '../models/gamble-result';

export function GamePage() {

  const [ gambleResult, setGambleResult ] = useState<GambleResult>();
  const [ scoreList, setScoreList ] = useState<ScoreList>();
  const [ dialogOpen, setDialogOpen ] = useState(false);

  useEffect(() => {
    loadHighScore();
  }, [gambleResult]);

  async function loadHighScore() {
    let response: AxiosResponse<ScoreList>;
    try {
      response = await getHighScoreList();
      setScoreList(response.data);
    } catch(e) {
      console.error('Something went wrong');
    }
  }

  async function handleGamble(name: string) {
    let response: AxiosResponse<GambleResult>;
    try {
      response = await gamble(name);
      setGambleResult(response.data);
      setDialogOpen(true);
    } catch(e) {
      console.error('Something went wrong');
    }
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Typography
            component="h1"
            variant="h4"
            color="secondary"
            align="center"
            gutterBottom
          >
            Most Boring Game Ever
          </Typography>
          <Box marginBottom={2}>
            <Card>
              <CardContent>
                <GambleForm onGamble={handleGamble}/>
              </CardContent>
            </Card>
          </Box>
          <Card>
            <CardContent data-testid="high-score-list">
              <HighScoreList scoreList={scoreList}/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogContent>
          <DialogContentText>
            {
              gambleResult && (gambleResult.result === ScoreResultType.NEW_HIGH_SCORE ?
                `A new high score (${gambleResult.score.value}) !!!` :
                `No new high score (${gambleResult.score.value}) :(`)
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
