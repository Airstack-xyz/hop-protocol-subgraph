import {
  Address,
  BigDecimal,
  BigInt,
  log
} from "@graphprotocol/graph-ts";
import {
  BonderAdded,
  BonderRemoved,
  MultipleWithdrawalsSettled,
  Stake,
  TransferFromL1Completed,
  TransferRootSet,
  TransferSent,
  TransfersCommitted,
  Unstake,
  WithdrawalBondSettled,
  WithdrawalBonded,
  Withdrew,
} from '../generated/HopL2Bridge/L2_Bridge'
import {
  BonderAdded as BonderAddedEntity,
  BonderRemoved as BonderRemovedEntity,
  MultipleWithdrawalsSettled as MultipleWithdrawalsSettledEntity,
  Stake as StakeEntity,
  TransferFromL1Completed as TransferFromL1CompletedEntity,
  TransferRootSet as TransferRootSetEntity,
  TransferSent as TransferSentEntity,
  TransfersCommitted as TransfersCommittedEntity,
  Unstake as UnstakeEntity,
  WithdrawalBondSettled as WithdrawalBondSettledEntity,
  WithdrawalBonded as WithdrawalBondedEntity,
  Withdrew as WithdrewEntity,
  Volume as VolumeEntity,
  DailyVolume as DailyVolumeEntity,
  BonderFee as BonderFeeEntity,
  Token as TokenEntity,
  AirstackSwap,
  AirstackFeedCandidate,
  AirstackFeedAccount,
  AirstackFeedAccountMapping,
  AirstackToken,
} from '../generated/schema'
import {
  createBlockEntityIfNotExists,
  createTransactionEntityIfNotExists,
  createTokenEntityIfNotExists
} from './shared'

import { getDayOpenTime, getDaysSinceEpoch } from "./modules/datetime";

import { getNetworkId, getTokenAddress} from "./modules/addressinfo";
// const NetworkId = {
//   "mainnet": "1",
//   "xdai": "100",
//   "arbitrum-one": "42161",
//   "matic": "137",
//   "optimism": "10",
// };

const TOKEN_ADDRESS = '{{address}}'
const TOKEN_NAME = '{{tokenName}}'
const TOKEN_SYMBOL = '{{token}}'
const TOKEN_DECIMALS = {{tokenDecimals}}

export function handleBonderAdded(event: BonderAdded): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = BonderAddedEntity.load(id)
  if (entity == null) {
    entity = new BonderAddedEntity(id)
  }

  entity.newBonder = event.params.newBonder.toHexString()

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleBonderRemoved(event: BonderRemoved): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = BonderRemovedEntity.load(id)
  if (entity == null) {
    entity = new BonderRemovedEntity(id)
  }

  entity.previousBonder = event.params.previousBonder.toHexString()

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleMultipleWithdrawalsSettled(event: MultipleWithdrawalsSettled): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = MultipleWithdrawalsSettledEntity.load(id)
  if (entity == null) {
    entity = new MultipleWithdrawalsSettledEntity(id)
  }

  entity.bonder = event.params.bonder.toHexString()
  entity.rootHash = event.params.rootHash
  entity.totalBondsSettled = event.params.totalBondsSettled

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleStake(event: Stake): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = StakeEntity.load(id)
  if (entity == null) {
    entity = new StakeEntity(id)
  }

  entity.account = event.params.account.toHexString()
  entity.amount = event.params.amount

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleTransferFromL1Completed(event: TransferFromL1Completed): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = TransferFromL1CompletedEntity.load(id)
  if (entity == null) {
    entity = new TransferFromL1CompletedEntity(id)
  }

  entity.recipient = event.params.recipient.toHexString()
  entity.amount = event.params.amount
  entity.amountOutMin = event.params.amountOutMin
  entity.deadline = event.params.deadline
  entity.relayer = event.params.relayer.toHexString()
  entity.relayerFee = event.params.relayerFee

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleTransferRootSet(event: TransferRootSet): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = TransferRootSetEntity.load(id)
  if (entity == null) {
    entity = new TransferRootSetEntity(id)
  }

  entity.rootHash = event.params.rootHash
  entity.totalAmount = event.params.totalAmount

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleTransferSent(event: TransferSent): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = TransferSentEntity.load(id)
  if (entity == null) {
    entity = new TransferSentEntity(id)
  }

  entity.transferId = event.params.transferId
  entity.destinationChainId = event.params.chainId
  entity.recipient = event.params.recipient.toHexString()
  entity.amount = event.params.amount
  entity.transferNonce = event.params.transferNonce
  entity.bonderFee = event.params.bonderFee
  entity.index = event.params.index
  entity.amountOutMin = event.params.amountOutMin
  entity.deadline = event.params.deadline

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()

  // Cumulative volume
  const volumeId = "volume:{{token}}"
  let volumeEntity = VolumeEntity.load(volumeId)
  if (volumeEntity == null) {
    volumeEntity = new VolumeEntity(volumeId)
    volumeEntity.amount = BigInt.fromString('0')
  }
  volumeEntity.amount = volumeEntity.amount.plus(event.params.amount)
  volumeEntity.token = TOKEN_SYMBOL
  volumeEntity.save()

  // Daily volume
  // NOTE: TheGraph doesn't support date parsing because webassembly date support is primitive:
  // https://github.com/graphprotocol/support/issues/26
  // date logic borrowed from uniswap subgraphs:
  // https://github.com/graphprotocol/uniswap-subgraph/blob/ed19523cd80d29a6b403591f4f1b24746ab05023/src/mappings/exchange.ts#L190
  // Nov 2 2018 is 1541116800 for dayStartTimestamp and 17837 for dayID
  // Nov 3 2018 would be 1541116800 + 86400 and 17838, and so on.
  let blockTimestamp = event.params._event.block.timestamp.toI32()
  let dayID = blockTimestamp / 86400
  let dayStartTimestamp = dayID * 86400
  let dailyVolumeId = "volume:{{token}}:" + dayID.toString()
  let dailyVolumEntity = DailyVolumeEntity.load(dailyVolumeId)
  if (dailyVolumEntity == null) {
    dailyVolumEntity = new DailyVolumeEntity(dailyVolumeId)
    dailyVolumEntity.amount = BigInt.fromString('0')
  }
  dailyVolumEntity.amount = dailyVolumEntity.amount.plus(event.params.amount)
  dailyVolumEntity.token = TOKEN_SYMBOL
  dailyVolumEntity.date = dayStartTimestamp
  dailyVolumEntity.save()

  const bonderFeeId = "bonderFee:{{token}}"
  let bonderFeeEntity = BonderFeeEntity.load(bonderFeeId)
  if (bonderFeeEntity == null) {
    bonderFeeEntity = new BonderFeeEntity(bonderFeeId)
    bonderFeeEntity.amount = BigInt.fromString('0')
  }
  bonderFeeEntity.amount = bonderFeeEntity.amount.plus(event.params.bonderFee)
  bonderFeeEntity.token = TOKEN_SYMBOL
  bonderFeeEntity.save()

  const network = "{{network}}";
  // log.info("----> network: {}", [network]);

  const sourceChainId = getNetworkId(network);
  // log.info("----> sourceChainId: {}", [sourceChainId.toString()]);
  const destinationTokenAddress = getTokenAddress(event.params.chainId, TOKEN_SYMBOL.toString());
  // log.info("----> destinationTokenAddress: {}", [destinationTokenAddress]);
 
 const sourceTokenEntityId = sourceChainId.toHexString().concat(TOKEN_ADDRESS);
 let sourceToken = AirstackToken.load(sourceTokenEntityId);
 if(!sourceToken) {
  sourceToken = new AirstackToken(sourceTokenEntityId);
  sourceToken.chainId = sourceChainId;
  sourceToken.tokenErcType = "ERC20";
  sourceToken.name = TOKEN_NAME;
  sourceToken.symbol = TOKEN_SYMBOL;
  // sourceToken.decimal = BigInt.fromString(TOKEN_DECIMALS);
  sourceToken.contract = TOKEN_ADDRESS;
  sourceToken.save()
 }
 const destinationTokenEntityId = event.params.chainId.toHexString().concat(destinationTokenAddress);
let destinationToken = AirstackToken.load(destinationTokenEntityId);
 if(!destinationToken) {
  destinationToken = new AirstackToken(sourceTokenEntityId);
  destinationToken.chainId = event.params.chainId;
  destinationToken.tokenErcType = "ERC20";
  destinationToken.contract = destinationTokenAddress;
  destinationToken.save()
 }
 
 
 
  const airstackSwapEntityId = network
    .concat(event.params.chainId.toHexString())
    .concat(TOKEN_ADDRESS);
    // log.info("----> airstackSwapEntityId: {}", [airstackSwapEntityId]);
  let airstackSwapEntity = AirstackSwap.load(airstackSwapEntityId);
  if (!airstackSwapEntity) {
    airstackSwapEntity = new AirstackSwap(airstackSwapEntityId);
    // log.info("----> sourceChainId: {}", [sourceChainId.toString()]);
    airstackSwapEntity.sourceChainId = sourceChainId;
    // log.info("----> destinationChainId: {}", [event.params.chainId.toString()]);
    airstackSwapEntity.destinationChainId = event.params.chainId;
    // log.info("----> sourceToken: {}", [TOKEN_ADDRESS]);
    airstackSwapEntity.sourceToken = sourceToken.id;
    // log.info("----> destinationToken: {}", [destinationTokenAddress]);
    airstackSwapEntity.destinationToken = destinationToken.id;
    airstackSwapEntity.save();
  }

  const timestamp = event.block.timestamp.toI32();
  // log.info("----> timestamp: {}", [timestamp.toString()]);
  let daySinceEpoch = getDaysSinceEpoch(timestamp);
  // log.info("----> daySinceEpoch: {}", [daySinceEpoch]);

  const feedTypeId = "swap";
  // log.info("----> feedTypeId: {}", [feedTypeId]);
  const airstackFeedCandidateId = network
  .concat("swap")
  .concat(event.params.chainId.toHexString())
  .concat(event.address.toHexString())
  .concat(TOKEN_ADDRESS)
  .concat(daySinceEpoch);
  // log.info("----> airstackFeedCandidateId: {}", [airstackFeedCandidateId]);

  let feedCandidate = AirstackFeedCandidate.load(airstackFeedCandidateId);
  if(!feedCandidate) {
    feedCandidate = new AirstackFeedCandidate(airstackFeedCandidateId);
    // log.info("----> contract: {}", [event.address.toHexString()]);
    feedCandidate.contract = event.address.toHexString();
    // log.info("----> feedTypeId: {}", [feedTypeId]);
    feedCandidate.feedTypeId = feedTypeId;
    // log.info("----> daySinceEpoch: {}", [daySinceEpoch.toString()]);
    feedCandidate.daySinceEpoch = BigInt.fromString(daySinceEpoch);
    // log.info("----> startDayTimestamp: {}", [getDayOpenTime(BigInt.fromI32(timestamp)).toString()]);
    feedCandidate.startDayTimestamp = getDayOpenTime(BigInt.fromI32(timestamp));
    // log.info("----> volumeInUSD: {}", [BigDecimal.fromString("0").toString()]);
    feedCandidate.volumeInUSD = BigDecimal.fromString("0");
    feedCandidate.count = BigInt.fromI32(0);

    feedCandidate.swap = airstackSwapEntityId;
  }
  // log.info("----> count: {}", [BigInt.fromI32(1).plus(feedCandidate.count).toString()]);
  feedCandidate.count = BigInt.fromI32(1).plus(feedCandidate.count);
  // log.info("----> updatedTimestamp: {}", [event.block.timestamp.toString()]);
  feedCandidate.updatedTimestamp = event.block.timestamp;
  feedCandidate.save()

  


  const feedAccountId = airstackFeedCandidateId.concat(event.params.recipient.toHexString());
  let feedAccount = AirstackFeedAccount.load(feedAccountId);
  if(!feedAccount) {
    feedAccount = new AirstackFeedAccount(feedAccountId);
    feedAccount.account = event.params.recipient.toHexString();
    feedAccount.save();
  }

  let feedAccountMapping = AirstackFeedAccountMapping.load(feedAccountId);
  if(!feedAccountMapping) {
    feedAccountMapping = new AirstackFeedAccountMapping(feedAccountId);
    feedAccountMapping.feedAccount = feedAccountId;
    feedAccountMapping.feedCandidate = airstackFeedCandidateId;
    feedAccountMapping.daySinceEpoch = feedCandidate.daySinceEpoch;
    feedAccountMapping.startDayTimestamp = feedCandidate.startDayTimestamp
    feedAccountMapping.save();

  }
}


export function handleTransfersCommitted(event: TransfersCommitted): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = TransfersCommittedEntity.load(id)
  if (entity == null) {
    entity = new TransfersCommittedEntity(id)
  }

  entity.destinationChainId = event.params.destinationChainId
  entity.rootHash = event.params.rootHash
  entity.totalAmount = event.params.totalAmount
  entity.rootCommittedAt = event.params.rootCommittedAt

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleUnstake(event: Unstake): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = UnstakeEntity.load(id)
  if (entity == null) {
    entity = new UnstakeEntity(id)
  }

  entity.account = event.params.account.toHexString()
  entity.amount = event.params.amount

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleWithdrawalBondSettled(event: WithdrawalBondSettled): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = WithdrawalBondSettledEntity.load(id)
  if (entity == null) {
    entity = new WithdrawalBondSettledEntity(id)
  }

  entity.bonder = event.params.bonder.toHexString()
  entity.transferId = event.params.transferId
  entity.rootHash = event.params.rootHash

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleWithdrawalBonded(event: WithdrawalBonded): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = WithdrawalBondedEntity.load(id)
  if (entity == null) {
    entity = new WithdrawalBondedEntity(id)
  }

  entity.transferId = event.params.transferId
  entity.amount = event.params.amount

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleWithdrew(event: Withdrew): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = WithdrewEntity.load(id)
  if (entity == null) {
    entity = new WithdrewEntity(id)
  }

  entity.transferId = event.params.transferId
  entity.recipient = event.params.recipient.toHexString()
  entity.amount = event.params.amount
  entity.transferNonce = event.params.transferNonce

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}
