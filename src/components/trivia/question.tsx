import * as React from 'react';
import * as R from 'ramda';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Typography,
  Dialog, DialogTitle, DialogContent,
  Button, IconButton
} from '@material-ui/core';
// import { Close } from '@material-ui/icons/';
import {
  green,
  red
} from '@material-ui/core/colors';

import Gryffindor from '../../images/Gryffindor.png';
import Hufflepuff from '../../images/Hufflepuff.png';
import Ravenclaw from '../../images/Ravenclaw.png';
import Slytherin from '../../images/Slytherin.png';
import {
    update
} from '../../state/question/ducks';

const { useState } = React;

interface IPropsQuestion {
    question: any;
    update: any;
}
function Component ({
    question,
    update
}: IPropsQuestion) {
    const crests = [
        { src: Gryffindor, house: 'Gryffindor' },
        { src: Ravenclaw, house: 'Ravenclaw' },
        { src: Hufflepuff, house: 'Hufflepuff' },
        { src: Slytherin, house: 'Slytherin' },
    ];
    const [ state, setState ] = useState({status: 'question'});
    const nullQuestion = {
        question: null,
        answer: null,
        points: null
    }
    const { activeQuestion } = question;
    const emptyQuestion = {
        question: null,
        answer: null,
        points: null,
    }
    return <Dialog open={question.activeQuestion.question ? true : false} onClose={() => update([], R.pipe(
        R.assocPath(['activeQuestion'], emptyQuestion),
        R.assocPath(['status'], 'question')
    )(question))}>
        <DialogTitle>
            {question.status === 'question' && <Typography align='center' variant='h4'>{activeQuestion.question}</Typography>}
            {question.status === 'answer' && <Typography onClick={() => update(['status'], 'question')} align='center' variant='h4'>{activeQuestion.answer}</Typography>}
        </DialogTitle>
        <DialogContent>
            {/* <Typography align='center'>Question text here ...</Typography> */}
            {question.status === 'answer' && <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 24}}>
                {crests.map((crest, idx) => <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <img
                        src={crest.src}
                        style={{width: 80, marginBottom: 12}}
                    />
                    <Button
                        style={{textTransform: 'none', color: green[500]}}
                        onClick={() => update([], R.pipe(
                            R.assocPath(['activeQuestion'], emptyQuestion),
                            R.assocPath(['status'], 'question'),
                            R.assocPath(['score', crest.house], parseInt(R.path(['score', crest.house], question)) + parseInt(activeQuestion.points)),
                            R.assocPath(['usedQuestions'], R.append(activeQuestion.id, question.usedQuestions)),
                        )(question))}
                    >
                        <Typography align='center' variant='caption'>{`${activeQuestion.points} points to ${crest.house}!`}</Typography>
                    </Button>
                    <Button
                        style={{textTransform: 'none', color: red[500]}}
                        onClick={() => update([], R.pipe(
                            R.assocPath(['activeQuestion'], emptyQuestion),
                            R.assocPath(['status'], 'question'),
                            R.assocPath(['score', crest.house], parseInt(R.path(['score', crest.house], question)) - parseInt(activeQuestion.points)),
                            R.assocPath(['usedQuestions'], R.append(activeQuestion.id, question.usedQuestions)),
                        )(question))}
                    >
                        <Typography align='center' variant='caption'>{`${activeQuestion.points} points from ${crest.house}!`}</Typography>
                    </Button>
                </div>)}
            </div>}
            {question.status === 'question' && <Button fullWidth onClick={() => update(['status'], 'answer')}>See Answer</Button>}
            {question.status === 'answer' && <Button onClick={() => update([], R.pipe(
                            R.assocPath(['activeQuestion'], emptyQuestion),
                            R.assocPath(['status'], 'question'),
                            R.assocPath(['usedQuestions'], R.append(activeQuestion.id, question.usedQuestions)),
                        )(question))} style={{textTransform: 'none'}} fullWidth>Skip Question</Button>}
        </DialogContent>
    </Dialog>
}

const mapStateToProps = (state: any) => {
    const question = R.path(['question'], state);
    return { question };
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      ...bindActionCreators({
        update
      }, dispatch),
    }
  };
  
  const Question = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
  
  export default Question;