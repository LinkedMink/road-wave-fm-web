import Container from "@mui/material/Container";
import { FunctionComponent } from "react";
import { useParams } from "react-router";
import license from "../../documents/license.md";
import privacyPolicy from "../../documents/privacyPolicy.md";
import { PagePaper } from "../styled/PagePaper";

const documents: Record<string, string> = {
  license,
  privacyPolicy,
};

export const DocumentsPage: FunctionComponent = () => {
  const { documentName } = useParams<"documentName">();
  const documentHtml = {
    __html: documentName ? documents[documentName] ?? "" : "",
  };

  return (
    <Container maxWidth="lg">
      <PagePaper dangerouslySetInnerHTML={documentHtml} />
    </Container>
  );
};
