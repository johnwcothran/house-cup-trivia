import * as React from 'react';
import * as R from 'ramda';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
//   Typography,
  Dialog, DialogTitle, DialogContent,
  List, ListItem, ListItemText, Typography,
  ListItemSecondaryAction, IconButton, Divider
//   Button, IconButton
} from '@material-ui/core';
import { Restore } from '@material-ui/icons';
// import {
//   green,
//   red
// } from '@material-ui/core/colors';

import {
    update
} from '../../state/question/ducks';


interface IPropsQuestion {
    question: any;
    update: any;
}
function Component ({
    question,
    update
}: IPropsQuestion) {
    const { usedQuestions, questions } = question;
    return <Dialog maxWidth='xl' fullWidth open={question.openUsedQuestions} onClose={() => update(['openUsedQuestions'], false)}>
        <DialogTitle>
            Used Questions
        </DialogTitle>
        <Divider />
        <DialogContent>
            <List>
                {usedQuestions.map((q: string, idx: number) => {
                    const item = R.find(R.propEq('id', q), questions);
                    return (
                        <ListItem button key={idx} style={{paddingRight: 95}}>
                            <ListItemText>
                                <Typography style={{flexWrap: 'wrap'}}>{item.question}</Typography>
                                <Typography variant='caption'>{item.level}</Typography>
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => update(['usedQuestions'], R.without([q], usedQuestions))}>
                                    <Restore />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
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
  
  const UsedQuestions = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
  
  export default UsedQuestions;