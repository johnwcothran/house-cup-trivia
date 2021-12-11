import * as React from "react";
// import { Link } from "gatsby";
import * as R from 'ramda';
import { graphql } from 'gatsby';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import shuffle from 'shuffle-array';
import {
  Typography,
  IconButton,
  Button,
  Badge
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons/';
import { withStyles } from '@material-ui/core/styles';
import {
  yellow
} from '@material-ui/core/colors';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import Question from '../components/trivia/question';
import UsedQuestions from '../components/trivia/usedQuestions';

import background from '../images/background.png';
import Gryffindor from '../images/Gryffindor.png';
import Hufflepuff from '../images/Hufflepuff.png';
import Ravenclaw from '../images/Ravenclaw.png';
import Slytherin from '../images/Slytherin.png';
import { update } from '../state/question/ducks';


const StyledBadge = withStyles(theme => ({
    badge: {
      right: 13,
      top: 21,
    //   border: `2px solid ${yellow[500]}`,
      color: 'black',
      padding: '0 4px',
    },
    colorPrimary: {
        background: yellow[500]
    }
  }))(Badge);

function IndexPage ({
    data,
    question, update
}: any) {
    const { questions, usedQuestions } = question;
    const categories = [
       { id: 'defense', name: 'Defense Against the Dark Arts' },
       { id: 'charms', name: 'Charms' },
       { id: 'history', name: 'History of Magic' },
       { id: 'care', name: 'Care of Magical Creatures' },
       { id: 'muggle', name: 'Muggle Studies' },
    ];
    const crests = [
        { src: Gryffindor, house: 'Gryffindor' },
        { src: Ravenclaw, house: 'Ravenclaw' },
        { src: Hufflepuff, house: 'Hufflepuff' },
        { src: Slytherin, house: 'Slytherin' },
    ]
    const levels = [
        { name: 'First Year', points: 5 },
        { name: 'Second Year', points: 10 },
        { name: 'Third Year', points: 15 },
        { name: 'Fourth Year', points: 20 },
        { name: 'Fifth Year', points: 25 },
        { name: 'Sixth Year', points: 50 },
        { name: 'Seventh Year', points: 100 },
    ];
    interface IPropsAvailableQuestions {
        level: string;
        questions: any;
        usedQuestions: string[];
        category: string;
    }
    function nextAvailableQuestion ({level, questions, usedQuestions, category}: IPropsAvailableQuestions) {
        return R.pipe(
            (qs: any) => qs.filter((q: any) => q.level === level),
            (qs: any) => qs.filter((q: any) => q.category === category),
            (qs: any) => qs.filter((q: any) => !R.includes(q.id, usedQuestions)),
            (qs: any) => shuffle(qs)
            // R.head
        )(questions);
    }
    if (question.questions.length === 0) {
        update(['questions'], data.data.nodes)
    }
  return (
    <div>
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Henny+Penny&display=swap" rel="stylesheet" />
      </Helmet>
        <div style={{background: 'black'}}>
          <div
            style={{
              background: `url(${background})`,
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            //   opacity: 0.3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
                <div style={{
                    flexGrow: 1,
                    opacity: 1,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingBottom: 80,
                    background: 'rgba(0,0,0,0.7)',
                    height: '100vh',
                    width: '100vw',
                }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <IconButton onClick={() => update(['openUsedQuestions'], true)} style={{color: 'white'}}>
                            <MoreVert />
                        </IconButton>
                        <Link style={{textDecoration: 'none'}} to='/house-points/'>
                            <div style={{display: 'flex', cursor: 'pointer'}}>
                                {crests.map((crest, idx) => <div key={idx} style={{display: 'flex', alignItems: 'center', width: 100}}>
                                    <img src={crest.src} style={{height: 40, margin: 0}} />
                                    <Typography style={{marginLeft: 8, fontFamily: 'Henny Penny', color: yellow[500]}}>{R.path(['score', crest.house], question)}</Typography>
                                </div>)}
                            </div>
                        </Link>
                        
                    </div>
                   <div style={{
                       display: 'flex',
                       justifyContent: 'space-around',
                       alignItems: 'flex-end',
                       width: '100%'
                   }}>
                       {categories.map((category, idx) => <div key={idx}>
                            <Typography align='center' style={{fontFamily: 'Henny Penny', color: 'white', width: 150}}>{category.name}</Typography>
                            {levels.map((level, idx) => {
                                const qLength = nextAvailableQuestion({level: level.name, questions, usedQuestions, category: category.id}).length;
                                const q = nextAvailableQuestion({level: level.name, questions, usedQuestions, category: category.id})[0];
                                return (
                                    <StyledBadge key={idx} badgeContent={qLength ? qLength : 0} color='primary' style={{display: 'flex', justifyContent: 'center'}}>
                                        <div style={{width: 150, display: 'grid'}}>
                                            <Button
                                                disabled={!q ? true : false}
                                                onClick={() => update(['activeQuestion'], q)}
                                                style={{
                                                    marginTop: 8,
                                                    display: 'grid',
                                                    gridGap: '8px',
                                                    color: q ? yellow[500] : 'grey',
                                                    border: `1px solid ${q ? yellow[500] : 'grey'}`
                                                }}
                                            >
                                                <Typography style={{fontFamily: 'Henny Penny', fontSize: 12}}>{level.name}</Typography>
                                                <Typography style={{fontFamily: 'Henny Penny', color: 'grey', textTransform: 'none'}} variant='caption'>{`${level.points} points`}</Typography>
                                            </Button>
                                        </div>
                                    </StyledBadge>
                            );})}
                        </div>)}
                   </div>
                    
                </div>
            </div>
        </div>
        <Question />
        <UsedQuestions />
    </div>
  );
};

export const query = graphql`
query TriviaQuery {
    data: allQuestionsCsv {
        nodes {
          answer
          category
          id
          level
          points
          question
        }
      }
}
`;

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

const Index = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);

export default Index;
