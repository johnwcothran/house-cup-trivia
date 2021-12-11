import * as React from "react";
// import { Link } from "gatsby";
import * as R from 'ramda';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  TextField,
  IconButton,
  Button
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons/';
import {
  yellow
} from '@material-ui/core/colors';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import { makeStyles } from '@material-ui/styles';

import background from '../images/HousePoint.png';
import Gryffindor from '../images/Gryffindor.png';
import Hufflepuff from '../images/Hufflepuff.png';
import Ravenclaw from '../images/Ravenclaw.png';
import Slytherin from '../images/Slytherin.png';
import { update } from '../state/question/ducks';

const useStyles = makeStyles(() => ({
    score: {
        color: yellow[500]
    }
}))

function IndexPage ({
  // state, feature1, update
  question,
  update
}: any) {
    const classes = useStyles();
    const crests = [
        {src: Gryffindor, house: 'Gryffindor', style: { background: 'transparent', border: 'none', fontSize: 30, textAlign: 'center', display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'Henny Penny', color: yellow[500], width: 200, marginLeft: 0, marginRight: 0}},
        {src: Ravenclaw, house: 'Ravenclaw', style: { background: 'transparent', border: 'none', fontSize: 30, textAlign: 'center', display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'Henny Penny', color: yellow[500], width: 200, marginLeft: 0, marginRight: 100}},
        {src: Hufflepuff, house: 'Hufflepuff', style: { background: 'transparent', border: 'none', fontSize: 30, textAlign: 'center', display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'Henny Penny', color: yellow[500], width: 200, marginLeft: 100, marginRight: 0}},
        {src: Slytherin, house: 'Slytherin', style: { background: 'transparent', border: 'none', fontSize: 30, textAlign: 'center', display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'Henny Penny', color: yellow[500], width: 200, marginLeft: 0, marginRight: 0}}
    ];
  return (
    <div>
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Henny+Penny&display=swap" rel="stylesheet" />
      </Helmet>
        <div style={{background: 'black'}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: -59, padding: 8}}>
                <Link to='trivia/'>
                    <IconButton style={{color: 'white'}}><ArrowForward /></IconButton>
                </Link>
            </div>
          <div
            style={{
              background: `url(${background})`,
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // opacity: 0.3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
                <div style={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    background: 'rgba(0,0,0,0.7)',
                    height: '100vh',
                    width: '100vw',
                }}>
                    {crests.map((crest, idx) => <div key={idx}>
                        <img style={crest.style} src={crest.src} />
                        <input
                            style={crest.style}
                            type='number'
                            onChange={(e) => {e.preventDefault(); update(['score', crest.house], e.target.value)}}
                            value={parseInt(R.path(['score', crest.house], question))} />
                        {/* <div style={crest.style}>
                            <Button fullWidth style={{marginRight: 2, border: `1px solid ${yellow[500]}`, color: yellow[500]}}>-</Button>
                            <Button fullWidth style={{marginLeft: 2, border: `1px solid ${yellow[500]}`, color: yellow[500]}}>+</Button>
                        </div> */}
                    </div>)}
                </div>
            </div>

        </div>
    </div>
  );
};

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
