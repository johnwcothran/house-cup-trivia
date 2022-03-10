import * as React from "react";
// import { Link } from "gatsby";
import * as R from 'ramda';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Typography
} from '@material-ui/core';
import {
  yellow
} from '@material-ui/core/colors';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import background from '../images/title-page.png';
import { update } from '../state/question/ducks';


function IndexPage ({
  // state, feature1, update

}: any) {
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
                // opacity: 0.3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{height: '100%', width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.7)',
                  alignItems: 'center'}}>
                  <Typography
                    style={{color: yellow[600], fontWeight: 'bold', fontFamily: 'Henny Penny'}}
                    variant='h1'>House Cup Trivia</Typography>
                  <Link style={{textDecoration: 'none'}} to='/trivia/'>
                    <Typography
                      variant='h4'
                      style={{color: 'white', fontWeight: 'bold', fontFamily: 'Henny Penny', margin: 32}}
                      >Book 2: The Chamber of Secrets</Typography>
                  </Link>
                  <Link style={{textDecoration: 'none'}} to='/book2/trivia/'>
                    <Typography
                      variant='h4'
                      style={{color: 'white', fontWeight: 'bold', fontFamily: 'Henny Penny', margin: 32}}
                      >Book 3: The Prisoner of Azkaban</Typography>
                  </Link>
                </div>
                
              </div>

          </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const feature1 = R.path(['feature1'], state);
  return { feature1 };
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
