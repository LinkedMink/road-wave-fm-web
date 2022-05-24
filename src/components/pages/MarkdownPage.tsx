import Container from '@mui/material/Container';
import { marked } from 'marked';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PagePaper } from '../../shared/Style';
import LoadingSpinner from '../LoadingSpinner';

interface MarkdownPageState {
  document?: string;
  markdown?: string;
}

const MarkdownPage: FunctionComponent = (_props) => {
  const [state, setState] = useState<MarkdownPageState>({});
  const { documentName } = useParams<'documentName'>();

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
      <PagePaper>
        <article dangerouslySetInnerHTML={{ __html: state.markdown ?? '' }}></article>
        <LoadingSpinner isLoading={!state.markdown} message="" />
      </PagePaper>
    </Container>
  );
};

export default MarkdownPage;
