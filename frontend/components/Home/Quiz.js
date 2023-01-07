import {
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Grow,
  IconButton,
  Radio,
  RadioGroup,
  Slide,
  Typography,
  Zoom,
} from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function ChooseAnswer() {
  return (
    <>
      <FormControl>
        {/* <FormLabel id="demo-form-control-label-placement">
          Label placement
        </FormLabel> */}
        <RadioGroup
          row
          aria-labelledby="answer"
          name="position"
          defaultValue="top"
        >
          <FormControlLabel
            value="sda"
            control={<Radio />}
            label="Strongly Disagree"
            labelPlacement="bottom"
          />

          <FormControlLabel
            value="da"
            control={<Radio />}
            label="Disagree"
            labelPlacement="bottom"
          />

          <FormControlLabel
            value="neut"
            control={<Radio />}
            label="Neutral"
            labelPlacement="bottom"
          />

          <FormControlLabel
            value="a"
            control={<Radio />}
            label="Agree"
            labelPlacement="bottom"
          />

          <FormControlLabel
            value="sa"
            control={<Radio />}
            label="Strongly Agree"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

function Questions({ active, containerRef, goLeft }) {
  //Get random questions from server
  //Send back answers to server and get the cactus
  const allQuestions = [
    'Question 1',
    'Question 2',
    'Question 3',
    'Question 4',
    'Question 5',
    'Question 6',
    'Question 7',
  ];

  return (
    <>
      {allQuestions.map((quest, i) => (
        <Slide
          sx={{ display: active === i ? 'block' : 'none' }}
          direction={goLeft ? 'left' : 'right'}
          in={active === i}
          container={containerRef.current}
        >
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Typography textAlign="center">{quest}</Typography>
            </Grid>

            <Grid item>
              <ChooseAnswer />
            </Grid>
          </Grid>
        </Slide>
      ))}
    </>
  );
}

function QuizCard({ start }) {
  const containerRef = React.useRef(null);
  const [active, setActive] = useState(0);
  const [goLeft, setGoLeft] = useState(true);

  const rightClicked = () => {
    if (active < 6) {
      setActive(active + 1);
      setGoLeft(true);
    }
  };

  const leftClicked = () => {
    if (active > 0) {
      setActive(active - 1);
      setGoLeft(false);
    }
  };

  return (
    <>
      <Zoom in={start}>
        <Card ref={containerRef}>
          <CardContent>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <IconButton
                  color="primary"
                  aria-label="left"
                  component="label"
                  onClick={leftClicked}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </Grid>

              <Grid item>
                <Questions
                  goLeft={goLeft}
                  active={active}
                  containerRef={containerRef}
                />
              </Grid>

              <Grid item>
                <IconButton
                  color="primary"
                  aria-label="left"
                  component="label"
                  onClick={rightClicked}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Zoom>
    </>
  );
}

export default function Quiz() {
  const [start, setStart] = useState(false);

  const startClicked = () => {
    // setStart(true);
    setStart(!start);
  };

  return (
    <>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        direction="column"
        sx={{
          marginTop: '4rem',
        }}
      >
        <Grid item>
          <Typography>Quiz</Typography>
        </Grid>

        <Grid item>
          {/* <Zoom in={!start} sx={{ display: start ? 'block' : 'hidden' }}> */}
          <Button onClick={startClicked}>Start the quiz</Button>
          {/* </Zoom> */}
        </Grid>

        <Grid item>
          <QuizCard start={start} />
        </Grid>
      </Grid>
    </>
  );
}
