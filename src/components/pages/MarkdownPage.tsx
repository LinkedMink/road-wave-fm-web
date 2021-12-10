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

const MarkdownPage: FunctionComponent<SharedStyleProps> = (props) => {
  const [document, setDocument] = useState('');
  const [markdown, setMarkdown] = useState('');
  const { documentName } = useParams<MarkdownPageOwnRouteParams>();

  useEffect(() => {
    if (markdown && documentName == document) {
      return;
    }

    setDocument(documentName);

    fetch(`/docs/${documentName}.md`)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setMarkdown(marked(text));
      })
      .catch(() => setMarkdown(`<p>Error getting document: ${documentName}<p>`));
  });

  return (
    <Container maxWidth="lg">
      <Paper className={props.classes?.paper}>
        <article dangerouslySetInnerHTML={{ __html: markdown }}></article>
        <LoadingSpinner isLoading={!markdown} message="Loading..." />
      </Paper>
    </Container>
  );
};

export default withSharedStyles()(MarkdownPage);
