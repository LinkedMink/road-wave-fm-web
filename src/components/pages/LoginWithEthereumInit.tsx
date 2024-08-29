/* eslint-disable @typescript-eslint/no-misused-promises */
import { createBrowserEip4361Message, toEip4361String } from "@linkedmink/eip-4361-parser";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import { EthereumLoginContext } from "../../providers/EthereumLoginProvider";
import { useAsync } from "react-use";

const EIP_4361_STATEMENT =
  "Only accounts with sufficient transaction history will be allowed to sign in with Ethereum.";

export const LoginWithEthereumInit: FunctionComponent = () => {
  const submit = useSubmit();
  const loginContext = useContext(EthereumLoginContext);
  const { nonce, requestId } = useLoaderData() as { nonce: string; requestId: string };

  useAsync(async () => {
    if (!nonce || !requestId) {
      return;
    }

    const eip4361Message = createBrowserEip4361Message({
      address: loginContext.address,
      statement: EIP_4361_STATEMENT,
      nonce,
      requestId,
    });
    const message = toEip4361String(eip4361Message);
    const signature = await loginContext.signer.signMessage(message);

    const body = { message, signature };

    submit(body, {
      action: "/login/ethereum/submit",
      method: "POST",
    });
  }, [submit, loginContext, nonce]);

  return null;
};
