import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
// export const contract = getContract({
//   client,
//   chain: defineChain(4202),
//   address: "0xa7A93C5F0691a5582BAB12C0dE7081C499aECE7f",
// });
export const contract = getContract({
  client,
  chain: defineChain(11155420),
  // address: "0x2f84C450313166aA26164764e95c6834FD5B497d",
  address: "0x4CA9964bA32016F6Ba043Bfefc17BFf45E73469e",
});
