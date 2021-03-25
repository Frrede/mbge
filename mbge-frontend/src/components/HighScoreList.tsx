import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { ScoreList } from '../models/score-list';

export interface HighScoreListProps {
  scoreList: ScoreList | undefined;
}

export function HighScoreList(props: HighScoreListProps) {
  return (
    <>
      <Typography
        component="h2"
        variant="h5"
        color="secondary"
        align="center"
        gutterBottom
      >
        High Score
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Place</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.scoreList?.scoreList.map((score, index) => (
            <TableRow key={score.name} data-testid={'high-score-row-' + score.name}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{score.name}</TableCell>
              <TableCell>{score.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
