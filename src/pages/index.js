import React from "react";
import { Link } from "gatsby";
import * as R from 'ramda';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { update } from '../state/feature-1/ducks';
import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = ({state, feature1, update}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>{`Hi, your count is: ${feature1.count}`}</h1>
      <button onClick={() => update(R.assoc('count', feature1.count - 1, feature1))}>-</button>
      <button onClick={() => update(R.assoc('count', feature1.count + 1, feature1))}>+</button>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

const mapStateToProps = state => {
  const feature1 = R.path(['feature1'], state);
  return { feature1 };
};

const mapDispatchToProps = dispatch => {
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
