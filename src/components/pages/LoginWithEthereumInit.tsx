/* eslint-disable @typescript-eslint/no-misused-promises */
import { createBrowserEip4361Message, toEip4361String } from "@linkedmink/eip-4361-parser";
import { FunctionComponent, useContext, useEffect } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import { EthereumBrowserContext } from "../../providers/EthereumBrowserProvider";

export const LoginWithEthereumInit: FunctionComponent = () => {
  const submit = useSubmit();
  const { browserProvider } = useContext(EthereumBrowserContext);
  const { nonce } = useLoaderData() as { nonce: string };

  useEffect(() => {
    const createMessage = async () => {
      const signer = await browserProvider.getSigner();
      const address = await signer.getAddress();
      const eip4361Message = createBrowserEip4361Message(address, "", nonce);
      const message = toEip4361String(eip4361Message);
      const signature = await signer.signMessage(message);

      const body = { message, signature };

      submit(body, {
        action: "/login/ethereum/submit",
        method: "POST",
        encType: "application/json",
      });
      // submit form
    };
  }, [browserProvider, nonce]);

  return <></>;
};
