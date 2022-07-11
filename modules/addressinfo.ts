import { BigInt } from "@graphprotocol/graph-ts";

// export const networkname2id = {
//   mainnet: "1",
//   xdai: "100",
//   "arbitrum-one": "42161",
//   matic: "137",
//   optimism: "10",
// };

// export const networkid2name = {
//   "1": "mainnet",
//   "100": "xdai",
//   "42161": "arbitrum-one",
//   "137": "matic",
//   "10": "optimism",
// };

// export const address_info = {
//   "1": {
//     USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
//     USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
//     MATIC: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
//     DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
//     ETH: "0x0000000000000000000000000000000000000000",
//     WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
//   },
//   "100": {
//     USDC: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
//     USDT: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
//     MATIC: "0x7122d7661c4564b7C6Cd4878B06766489a6028A2",
//     DAI: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
//     ETH: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
//     WBTC: "0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252",
//   },
//   "42161": {
//     USDC: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
//     USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
//     MATIC: "",
//     DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
//     ETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
//     WBTC: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
//   },
//   "137": {
//     USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
//     USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
//     MATIC: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
//     DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
//     ETH: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
//     WBTC: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
//   },
//   "10": {
//     USDC: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
//     USDT: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
//     MATIC: "",
//     DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
//     ETH: "0x4200000000000000000000000000000000000006",
//     WBTC: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
//   },
// };

export function getNetworkId(networkName: string): BigInt {
  if (networkName == "mainnet") {
    return BigInt.fromI32(1);
  } else if (networkName == "xdai") {
    return BigInt.fromI32(100);
  } else if (networkName == "arbitrum-one") {
    return BigInt.fromI32(42161);
  } else if (networkName == "matic") {
    return BigInt.fromI32(137);
  } else if (networkName == "optimism") {
    return BigInt.fromI32(10);
  }
  return BigInt.fromI32(0);

  // switch (networkName) {
  //   case "mainnet":
  //     return BigInt.fromI32(1);
  //   case "xdai":
  //     return BigInt.fromI32(100);
  //   case "arbitrum-one":
  //     return BigInt.fromI32(42161);
  //   case "matic":
  //     return BigInt.fromI32(137);
  //   case "optimism":
  //     return BigInt.fromI32(10);

  //   default:
  //     return BigInt.fromI32(0);
  // }
  // const id = networkname2id[networkName];
  // return BigInt.fromI32(id);
}

export function getTokenAddress(chainId: BigInt, tokenSymbol: string): string {
  const chainIdString = chainId.toI32().toString();

  if (chainIdString == "1") {
    if (tokenSymbol == "USDC") {
      return "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    } else if (tokenSymbol == "USDT") {
      return "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    } else if (tokenSymbol == "MATIC") {
      return "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
    } else if (tokenSymbol == "DAI") {
      return "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    } else if (tokenSymbol == "ETH") {
      return "0x0000000000000000000000000000000000000000";
    } else if (tokenSymbol == "WBTC") {
      return "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
    }
  } else if (chainIdString == "100") {
    if (tokenSymbol == "USDC") {
      return "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83";
    } else if (tokenSymbol == "USDT") {
      return "0x4ECaBa5870353805a9F068101A40E0f32ed605C6";
    } else if (tokenSymbol == "MATIC") {
      return "0x7122d7661c4564b7C6Cd4878B06766489a6028A2";
    } else if (tokenSymbol == "DAI") {
      return "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d";
    } else if (tokenSymbol == "ETH") {
      return "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1";
    } else if (tokenSymbol == "WBTC") {
      return "0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252";
    }
  } else if (chainIdString == "42161") {
    if (tokenSymbol == "USDC") {
      return "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8";
    } else if (tokenSymbol == "USDT") {
      return "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
    } else if (tokenSymbol == "MATIC") {
      return "";
    } else if (tokenSymbol == "DAI") {
      return "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
    } else if (tokenSymbol == "ETH") {
      return "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
    } else if (tokenSymbol == "WBTC") {
      return "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f";
    }
  } else if (chainIdString == "137") {
    if (tokenSymbol == "USDC") {
      return "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
    } else if (tokenSymbol == "USDT") {
      return "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
    } else if (tokenSymbol == "MATIC") {
      return "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    } else if (tokenSymbol == "DAI") {
      return "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
    } else if (tokenSymbol == "ETH") {
      return "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
    } else if (tokenSymbol == "WBTC") {
      return "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
    }
  } else if (chainIdString == "10") {
    if (tokenSymbol == "USDC") {
      return "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";
    } else if (tokenSymbol == "USDT") {
      return "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58";
    } else if (tokenSymbol == "MATIC") {
      return "";
    } else if (tokenSymbol == "DAI") {
      return "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
    } else if (tokenSymbol == "ETH") {
      return "0x4200000000000000000000000000000000000006";
    } else if (tokenSymbol == "WBTC") {
      return "0x68f180fcCe6836688e9084f035309E29Bf0A2095";
    }
  }
  return "";

  // switch (chainIdString) {
  //   case "1": {
  //     switch (tokenSymbol.toString()) {
  //       case "USDC":
  //         return "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  //       case "USDT":
  //         return "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  //       case "MATIC":
  //         return "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
  //       case "DAI":
  //         return "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  //       case "ETH":
  //         return "0x0000000000000000000000000000000000000000";
  //       case "WBTC":
  //         return "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
  //       default:
  //         return "";
  //     }
  //   }
  //   case "100": {
  //     switch (tokenSymbol.toString()) {
  //       case "USDC":
  //         return "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83";
  //       case "USDT":
  //         return "0x4ECaBa5870353805a9F068101A40E0f32ed605C6";
  //       case "MATIC":
  //         return "0x7122d7661c4564b7C6Cd4878B06766489a6028A2";
  //       case "DAI":
  //         return "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d";
  //       case "ETH":
  //         return "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1";
  //       case "WBTC":
  //         return "0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252";
  //       default:
  //         return "";
  //     }
  //   }
  //   case "42161": {
  //     switch (tokenSymbol.toString()) {
  //       case "USDC":
  //         return "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8";
  //       case "USDT":
  //         return "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
  //       case "MATIC":
  //         return "";
  //       case "DAI":
  //         return "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
  //       case "ETH":
  //         return "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
  //       case "WBTC":
  //         return "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f";
  //       default:
  //         return "";
  //     }
  //   }
  //   case "137": {
  //     switch (tokenSymbol.toString()) {
  //       case "USDC":
  //         return "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  //       case "USDT":
  //         return "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
  //       case "MATIC":
  //         return "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
  //       case "DAI":
  //         return "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
  //       case "ETH":
  //         return "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
  //       case "WBTC":
  //         return "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
  //       default:
  //         return "";
  //     }
  //   }
  //   case "10": {
  //     switch (tokenSymbol.toString()) {
  //       case "USDC":
  //         return "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";
  //       case "USDT":
  //         return "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58";
  //       case "MATIC":
  //         return "";
  //       case "DAI":
  //         return "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
  //       case "ETH":
  //         return "0x4200000000000000000000000000000000000006";
  //       case "WBTC":
  //         return "0x68f180fcCe6836688e9084f035309E29Bf0A2095";
  //       default:
  //         return "";
  //     }
  //   }

  //   default:
  //     return "";
  // }

  // const chainInfo = address_info[chainIdString];
  // return chainInfo[tokenSymbol];
}
