import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { ERC20 } from "../../generated/openseaWyvernExchange/ERC20"
import { AirstackAccount, AirstackAccountFeed, AirstackFeedCandidate, AirstackFeedTransaction, AirstackSale, AirstackToken, AirstackTokenStats, AirstackTransfer } from "../../generated/schema"

export namespace airstack {

    export function getOrCreateAirstackToken(address: Bytes): AirstackToken {
        let id = `airstackToken-${address.toHexString()}`
        let entity = AirstackToken.load(id)
        if (entity == null) {
            entity = new AirstackToken(id)
            entity.address = address


            let erc20ContractInstance = ERC20.bind(Address.fromString(address.toHexString()));
            let decimals = erc20ContractInstance.try_decimals();
            entity.decimals = 18;
            if (!decimals.reverted) {
                entity.decimals = decimals.value;
            }

            let symbol = erc20ContractInstance.try_symbol();
            if (!symbol.reverted) {
                entity.symbol = symbol.value;
            }

            let name = erc20ContractInstance.try_name();
            if (!name.reverted) {
                entity.name = name.value;
            }
        }
        return entity as AirstackToken
    }


    export function getOrCreateAirstackFeedCandidate(id: string): AirstackFeedCandidate {
        let entity = AirstackFeedCandidate.load(id);

        if (entity == null) {
            entity = new AirstackFeedCandidate(id);
            entity.walletCount = BigInt.zero();
            entity.volumeInUSD = BigDecimal.zero();
            entity.tokenCount = BigInt.zero();
            entity.transactionCount = BigInt.zero();
            entity.actionType = "SELL";
        }

        return entity as AirstackFeedCandidate;
    }

    export function getOrCreateAirstackTokenStats(id: string): AirstackTokenStats {
        let entity = AirstackTokenStats.load(id);

        if (entity == null) {
            entity = new AirstackTokenStats(id);
            entity.volumeInUSD = BigDecimal.zero();
            entity.count = BigInt.zero();
            entity.amount = BigInt.zero();
        }

        return entity as AirstackTokenStats;
    }

    export function getOrCreateAirstackAccountFeed(id: string): AirstackAccountFeed {
        let entity = AirstackAccountFeed.load(id);

        if (entity == null) {
            entity = new AirstackAccountFeed(id);

        }
        return entity as AirstackAccountFeed;
    }

    export function getOrCreateAirstackAccount(id: string): AirstackAccount {
        let entity = AirstackAccount.load(id);

        if(entity == null) {
            entity = new AirstackAccount(id);
        }

        return entity as AirstackAccount;
    }

    export function getOrCreateAirstackSale(id: string): AirstackSale {
      let entity = AirstackSale.load(id);

      if(entity == null) {
          entity = new AirstackSale(id);
      }

      return entity as AirstackSale;
    }

    export function getOrCreateAirstackTransfer(id: string): AirstackTransfer {
        let entity = AirstackTransfer.load(id);

        if(entity == null) {
            entity = new AirstackTransfer(id);
        }
        return entity;
    }

    export function getOrCreateAirstackFeedTransaction(id: string): AirstackFeedTransaction {
        let entity = AirstackFeedTransaction.load(id);
        if(entity == null) {
            entity = new AirstackFeedTransaction(id);
        }
        return entity;
    }

}