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
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function ChooseAnswer({
  setChosen,
  allQuestions,
  setAllQuestions,
  number,
  rightClicked,
}) {
  var notAnswered = true;

  const onClick = (value) => (e) => {
    var newAllQs = [...allQuestions];

    for (var i = 0; i < newAllQs.length; i++) {
      if (newAllQs[i].number === number) {
        newAllQs[i].answer = value;
        if (number !== 7) {
          rightClicked(250)();
        } else {
          newAllQs.every((quest) => {
            if (quest.answer === 0) {
              console.log('Please answer all the questions');
              notAnswered = true;
              return false;
            }

            notAnswered = false;
          });

          if (!notAnswered) {
            let total = 0;
            newAllQs.forEach((quest) => {
              total += quest.answer;
            });

            console.log('Your cactus is: ', total % 9);
            setTimeout(() => {
              setChosen(total % 9);
            }, 500);
          }
        }
      }
    }

    setAllQuestions([...newAllQs]);
  };

  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="answer"
          name="position"
          defaultValue=""
        >
          <FormControlLabel
            onClick={onClick(1)}
            sx={{
              margin: 0,
            }}
            value="sda"
            control={
              <Radio
                sx={{
                  color: '#ff3842',
                  '&.Mui-checked': {
                    color: '#ff3842',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 40,
                  },
                }}
              />
            }
            // label=""
            label="Disagree"
            labelPlacement="bottom"
          />

          <FormControlLabel
            onClick={onClick(2)}
            sx={{
              margin: 0,
            }}
            value="da"
            control={
              <Radio
                sx={{
                  color: '#ff9197',
                  '&.Mui-checked': {
                    color: '#ff9197',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 32,
                  },
                }}
              />
            }
            label=""
            // label="Disagree"
            labelPlacement="bottom"
          />

          <FormControlLabel
            onClick={onClick(3)}
            sx={{
              margin: 0,
            }}
            value="neut"
            control={
              <Radio
                sx={{
                  color: '#636363',
                  '&.Mui-checked': {
                    color: '#636363',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 24,
                  },
                }}
              />
            }
            // label=""
            label="Neutral"
            labelPlacement="bottom"
          />

          <FormControlLabel
            onClick={onClick(4)}
            sx={{
              margin: 0,
            }}
            value="a"
            control={
              <Radio
                sx={{
                  color: '#91ffb9',
                  '&.Mui-checked': {
                    color: '#91ffb9',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 32,
                  },
                }}
              />
            }
            label=""
            // label="Agree"
            labelPlacement="bottom"
          />

          <FormControlLabel
            onClick={onClick(5)}
            sx={{
              margin: 0,
            }}
            value="sa"
            control={
              <Radio
                sx={{
                  color: '#00ff5e',
                  '&.Mui-checked': {
                    color: '#00ff5e',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 40,
                  },
                }}
              />
            }
            label="Agree"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

function Questions({
  active,
  containerRef,
  goLeft,
  rightClicked,
  chosen,
  setChosen,
}) {
  //Get random questions from server
  //Send back answers to server and get the cactus

  const [allQuestions, setAllQuestions] = useState([
    {
      number: 1,
      question: 'You are calm under pressure',
      answer: 0,
    },
    {
      number: 2,
      question: 'You are more inclined to follow your head than your heart',
      answer: 0,
    },
    {
      number: 3,
      question:
        'You enjoy helping others accomplish things than your own accomplishments',
      answer: 0,
    },
    {
      number: 4,
      question: 'You are pessimistic rather than optimistic',
      answer: 0,
    },
    {
      number: 5,
      question: 'You are an artistic type of person',
      answer: 0,
    },
    {
      number: 6,
      question: 'You tend to avoid drawing attention to yourself',
      answer: 0,
    },
    {
      number: 7,
      question: 'You enjoy art museums',
      answer: 0,
    },
  ]);

  return (
    <>
      {chosen === -1 ? (
        allQuestions.map((quest, i) => (
          <Slide
            sx={{ display: active === i ? 'block' : 'none' }}
            direction={goLeft ? 'left' : 'right'}
            in={active === i}
            container={containerRef.current}
          >
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              spacing={6}
            >
              <Grid item>
                <Typography textAlign="center" variant="h6">
                  {quest.question}
                </Typography>
              </Grid>

              <Grid item alignSelf={'center'}>
                <ChooseAnswer
                  setChosen={setChosen}
                  allQuestions={allQuestions}
                  setAllQuestions={setAllQuestions}
                  number={quest.number}
                  rightClicked={rightClicked}
                />
              </Grid>
            </Grid>
          </Slide>
        ))
      ) : (
        <></>
      )}
    </>
  );
}

function QuizCard({ start, setChosen, chosen }) {
  const containerRef = React.useRef(null);
  const [active, setActive] = useState(0);
  const [goLeft, setGoLeft] = useState(true);

  const reset = (event) => {
    setActive(0);
    setChosen(-1);
  };

  const rightClicked = (timeout) => () => {
    setTimeout(() => {
      if (active < 6) {
        setActive(active + 1);
        setGoLeft(true);
      }
    }, timeout);
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
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              spacing={6}
            >
              <Grid item>
                <Questions
                  goLeft={goLeft}
                  active={active}
                  containerRef={containerRef}
                  rightClicked={rightClicked}
                  setChosen={setChosen}
                  chosen={chosen}
                />
              </Grid>
              {chosen === -1 ? (
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="center"
                  spacing={6}
                >
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
                    <IconButton
                      color="primary"
                      aria-label="left"
                      component="label"
                      onClick={rightClicked(0)}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ) : (
                <>
                  <Grid item container direction="column">
                    <Grid item>
                      <Typography>Your catus is {chosen}</Typography>
                    </Grid>
                    <Grid item>
                      <Button onClick={reset}>Retry quiz.</Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Zoom>
    </>
  );
}

export default function Quiz() {
  const [start, setStart] = useState(false);
  const [chosen, setChosen] = useState(-1);

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
        spacing={10}
      >
        <Grid item>
          <Typography variant="h2">-OR-</Typography>
        </Grid>
        <Grid item container direction="column" alignItems="center" spacing={6}>
          <Grid item>
            <Typography variant="h3" textAlign="center">
              Let the cactus choose you
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h5" textAlign="center">
              Answer the 7 questions
            </Typography>
          </Grid>
        </Grid>

        <Box component={Grid} item display={!start ? 'block' : 'none'}>
          <Zoom in={!start}>
            {/* <Zoom in={true} sx={{ display: false ? 'block' : 'hidden' }}> */}
            <div className="box">
              <Button
                onClick={startClicked}
                sx={{ fontSize: '1.5rem', fontWeight: 400 }}
              >
                Start the quiz
              </Button>
            </div>
          </Zoom>
        </Box>

        <Grid item>
          <QuizCard start={start} chosen={chosen} setChosen={setChosen} />
        </Grid>
      </Grid>
    </>
  );
}
