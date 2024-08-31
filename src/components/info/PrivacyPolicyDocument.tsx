import { Link, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { DocumentSection } from "./DocumentSection";

export const PrivacyPolicyDocument: FunctionComponent = () => {
  return (
    <>
      <DocumentSection title="Privacy Policy">
        <Typography>
          We takes your privacy seriously. To better protect your privacy we provide this privacy
          policy notice explaining the way your personal information is collected and used.
        </Typography>
      </DocumentSection>
      <DocumentSection
        title="Collection of Routine Information"
        level={4}
      >
        <Typography>
          This Road Wave FM track basic information about their users. This information includes,
          but is not limited to, IP addresses, app details, timestamps and referring pages. None of
          this information can personally identify specific user to this Road Wave FM. The
          information is tracked for routine administration and maintenance purposes.
        </Typography>
      </DocumentSection>
      <DocumentSection
        title="Cookies"
        level={4}
      >
        <Typography>
          Where necessary, this Road Wave FM uses cookies to store information about a visitor’s
          preferences and history in order to better serve the user and/or present the user with
          customized content.
        </Typography>
      </DocumentSection>

      <DocumentSection
        title="Advertisement and Other Third Parties"
        level={4}
      >
        <Typography>
          Advertising partners and other third parties may use cookies, scripts and/or web beacons
          to track user activities on this Road Wave FM in order to display advertisements and other
          useful information. Such tracking is done directly by the third parties through their own
          servers and is subject to their own privacy policies. This Road Wave FM has no access or
          control over these cookies, scripts and/or web beacons that may be used by third parties.
          Learn how to{" "}
          <Link href="http://www.google.com/privacy_ads.html">
            opt out of Google’s cookie usage
          </Link>
          .
        </Typography>
      </DocumentSection>
      <DocumentSection
        title="Links to Third Party Websites"
        level={4}
      >
        <Typography>
          We have included links on this Road Wave FM for your use and reference. We are not
          responsible for the privacy policies on these websites. You should be aware that the
          privacy policies of these websites may differ from our own.
        </Typography>
      </DocumentSection>
      <DocumentSection
        title="Security"
        level={4}
      >
        <Typography>
          The security of your personal information is important to us, but remember that no method
          of transmission over the Internet, or method of electronic storage, is 100% secure. While
          we strive to use commercially acceptable means to protect your personal information, we
          cannot guarantee its absolute security.
        </Typography>
      </DocumentSection>
      <DocumentSection
        title="Changes To This Privacy Policy"
        level={4}
      >
        <Typography>
          This Privacy Policy is effective as of December 9, 2021 and will remain in effect except
          with respect to any changes in its provisions in the future, which will be in effect
          immediately after being posted on this page.
        </Typography>
        <Typography>
          We reserve the right to update or change our Privacy Policy at any time and you should
          check this Privacy Policy periodically. If we make any material changes to this Privacy
          Policy, we will notify you either through the email address you have provided us, or by
          placing a prominent notice on our Road Wave FM.
        </Typography>
      </DocumentSection>
      <DocumentSection
        title="Contact Information"
        level={4}
      >
        <Typography>
          For any questions or concerns regarding the privacy policy, please send us an email to
          admim@linkedmink.net.
        </Typography>
      </DocumentSection>
    </>
  );
};
