import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { marked } from 'marked';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import LoadingSpinner from '../LoadingSpinner';

interface MarkdownPageOwnRouteParams {
  documentName: string;
}

interface MarkdownPageState {
  document?: string;
  markdown?: string;
}

const MarkdownPage: FunctionComponent<SharedStyleProps> = (props) => {
  const [state, setState] = useState<MarkdownPageState>({});
  const { documentName } = useParams<MarkdownPageOwnRouteParams>();

  useEffect(() => {
    if (state.markdown && documentName === state.document) {
      return;
    }

    fetch(`/docs/${documentName}.md`)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setState({ document: documentName, markdown: marked(text) });
      })
      .catch(() =>
        setState({
          document: documentName,
          markdown: `<p>Document not found: ${documentName}<p>`,
        }),
      );
  });

  return (
    <Container maxWidth="lg">
      <Paper className={props.classes?.paper}>
        <article dangerouslySetInnerHTML={{ __html: state.markdown ?? '' }}></article>
        <LoadingSpinner isLoading={!state.markdown} message="" />
      </Paper>
    </Container>
  );
};

export default withSharedStyles()(MarkdownPage);
