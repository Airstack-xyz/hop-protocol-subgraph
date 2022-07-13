import {
  ethereum,
  Address,
  dataSource,
  BigInt,
  BigDecimal
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
  AirstackFeedCandidate,
  AirstackContract,
  AirstackAccountFeed,
  AirstackAccount,
  AirstackTokenStats,
  AirstackToken,
  AirstackFeedTransaction,
  AirstackTransfer,
} from '../generated/schema'
import {
  createBlockEntityIfNotExists,
  createTransactionEntityIfNotExists,
  createTokenEntityIfNotExists
} from './shared'

import { getDayOpenTime, getDaysSinceEpoch } from "../modules/datetime";
import {getUsdPrice} from "../modules/prices"

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
  bonderFeeEntity.save();
  // Airstack entities.
  createAirstackFeedCandidate(event);
}

function getAirstackFeedCandidateEntityId(event: TransferSent): string {
  const entityId = dataSource.network()
  .concat(event.params.chainId.toHexString())
  .concat(TOKEN_ADDRESS)
  .concat(event.block.timestamp.toString())
  
  return entityId;
}

function getAirstackContractEntityId(event: ethereum.Event): string {
  const entityId = dataSource.network()
  .concat(event.address.toHexString());

  return entityId;
}

function getAirstackFeedAccountEntityId(feedCandidateId: string, address: string): string {
  const entityId =  `${feedCandidateId}-${address}`;
  return entityId;
}

function getAirstackAccountEntityId(address: string): string {
  const entityId = dataSource.network()
  .concat(address);
  return entityId;
}

function getAirstackTokenStatsEntityId(feedCandidateId: string, tokenAddress:string): string{
  const entityId = `${feedCandidateId}-${tokenAddress}`;
  return entityId;
}

function getAirstackTokenEntityId(): string{
  const entityId = dataSource.network()
  .concat(TOKEN_ADDRESS);

  return entityId;
}

function getAirstackTransferEntityId(from: string, to: string): string {
  const entityId = dataSource.network()
  .concat(TOKEN_ADDRESS)
  .concat(from)
  .concat(to);

  return entityId;
}

function getAirstackSaleEntityId(feedCandidateId:string,  event: TransferSent): string {
  const entityId = dataSource.network()
  .concat(feedCandidateId)
  .concat(event.block.hash.toHexString());

  return entityId;
}

function getAirstackTransactionEntityId(feedCandidateId:string,  event: TransferSent): string {
  const entityId = dataSource.network()
  .concat(feedCandidateId)
  .concat(event.block.hash.toHexString());

  return entityId;
}

function createAirstackFeedCandidate(event: TransferSent): void {
  const airstackFeedCandidateId = getAirstackFeedCandidateEntityId(event);
  let airstackFeedCandidate = AirstackFeedCandidate.load(airstackFeedCandidateId);
  if(!airstackFeedCandidate){
    airstackFeedCandidate = new AirstackFeedCandidate(airstackFeedCandidateId);
    
    const airstackContract = getOrCreateAirstackContract(event);
    airstackFeedCandidate.contract = airstackContract.id;
    airstackFeedCandidate.actionType = "BRIDGE";
    airstackFeedCandidate.walletCount = BigInt.zero();
    airstackFeedCandidate.tokenCount = BigInt.zero();
    airstackFeedCandidate.transactionCount = BigInt.zero();
    airstackFeedCandidate.volumeInUSD = BigDecimal.zero();

    const timestamp = event.block.timestamp.toI32();
    let daySinceEpoch = getDaysSinceEpoch(timestamp);
    airstackFeedCandidate.daySinceEpoch = BigInt.fromString(daySinceEpoch);

    const startDayTimestamp = getDayOpenTime(event.block.timestamp);
    airstackFeedCandidate.startDayTimestamp = startDayTimestamp;
  }
  airstackFeedCandidate.updatedTimestamp = event.block.timestamp;
  airstackFeedCandidate.transactionCount = airstackFeedCandidate.transactionCount.plus(BigInt.fromI32(1));
  airstackFeedCandidate.walletCount = airstackFeedCandidate.walletCount.plus(BigInt.fromI32(1));
  airstackFeedCandidate.tokenCount = airstackFeedCandidate.tokenCount.plus(BigInt.fromI32(1));
    
  const usdValue  = getUsdPrice(Address.fromString(TOKEN_ADDRESS), event.params.amount.toBigDecimal());
  airstackFeedCandidate.volumeInUSD = airstackFeedCandidate.volumeInUSD.plus(usdValue);
  airstackFeedCandidate.save();

  getOrCreateAirstackAccountFeed(airstackFeedCandidateId, event);
  getOrCreateAirstackTokenStats(airstackFeedCandidateId,event);
  getOrCreateAirstackTransactions(airstackFeedCandidateId,event);
}

function getOrCreateAirstackAccountFeed(feedCandidateId:string,  event: TransferSent):void {
  const fromAddress = event.transaction.from.toHexString();
  const toAddress = event.params.recipient.toHexString();

  const fromEntityId = getAirstackFeedAccountEntityId(feedCandidateId, fromAddress);
  let fromEntity = AirstackAccountFeed.load(fromEntityId);
  if(!fromEntity) {
    fromEntity = new AirstackAccountFeed(fromEntityId);
    fromEntity.feedCandidate = feedCandidateId;
    fromEntity.volumeInUSD = BigDecimal.zero();
    const account = getOrCreateAirstackAccount(fromAddress);
    fromEntity.account = account.id;
  }
  const usdValue  = getUsdPrice(Address.fromString(TOKEN_ADDRESS), event.params.amount.toBigDecimal());
  fromEntity.volumeInUSD = fromEntity.volumeInUSD.plus(usdValue)
  fromEntity.save();

  if(fromAddress !== toAddress) {
    const toEntityId = getAirstackFeedAccountEntityId(feedCandidateId, toAddress);
    let toEntity = AirstackAccountFeed.load(toEntityId);
    if(!toEntity) {
      toEntity = new AirstackAccountFeed(toEntityId);
      toEntity.feedCandidate = feedCandidateId;
      toEntity.volumeInUSD = BigDecimal.zero();
      const account = getOrCreateAirstackAccount(toAddress);
      toEntity.account = account.id;
    }
    const usdValue  = getUsdPrice(Address.fromString(TOKEN_ADDRESS), event.params.amount.toBigDecimal());
    toEntity.volumeInUSD = toEntity.volumeInUSD.plus(usdValue)
    toEntity.save();
  }
}

function getOrCreateAirstackAccount(address: string): AirstackAccount {
  const entityId = getAirstackAccountEntityId(address);
  let entity = AirstackAccount.load(entityId);
  if(!entity){
    entity = new AirstackAccount(entityId);
    entity.address = address;
    entity.save();
  }
  return entity;
}

function getOrCreateAirstackContract(event: ethereum.Event): AirstackContract {
  const entityId = getAirstackContractEntityId(event);
  let airstackContract = AirstackContract.load(entityId);
  if(!airstackContract){
    airstackContract = new AirstackContract(entityId);
    airstackContract.address = event.address.toHexString();
    airstackContract.save()
  }
  return airstackContract;
}

function getOrCreateAirstackTokenStats(airstackFeedCandidateId:string, event: TransferSent): AirstackTokenStats {
  const entityId = getAirstackTokenStatsEntityId(airstackFeedCandidateId, TOKEN_ADDRESS);
  let entity = AirstackTokenStats.load(entityId);
  if(!entity){
    entity = new AirstackTokenStats(entityId);
    entity.feedCandidate = airstackFeedCandidateId;
    entity.count = BigInt.zero();
    entity.amount = BigInt.zero();
    entity.volumeInUSD = BigDecimal.zero();
    const airstackToken = getOrCreateAirstackToken();
    entity.token = airstackToken.id;
  }
  entity.count = entity.count.plus(BigInt.fromI32(1));
  entity.amount = entity.amount.plus(event.params.amount);
  const usdValue  = getUsdPrice(Address.fromString(TOKEN_ADDRESS), event.params.amount.toBigDecimal());
  entity.volumeInUSD = entity.volumeInUSD.plus(usdValue);

  entity.save();
  return entity;
}

function getOrCreateAirstackToken(): AirstackToken {
  const entityId = getAirstackTokenEntityId();
  let entity = AirstackToken.load(entityId);
  if(!entity) {
    entity = new AirstackToken(entityId);
    entity.address = TOKEN_ADDRESS;
    entity.type = "ERC20";
    entity.name = TOKEN_NAME;
    entity.symbol = TOKEN_SYMBOL;
    //entity.decimals = TOKEN_DECIMALS.toBigDecimal();
    entity.save()
  }
  return entity;
}

function getOrCreateAirstackTransactions(feedCandidateId: string, event:TransferSent): void{
  const entityId = getAirstackTransactionEntityId(feedCandidateId, event);
  let entity = AirstackFeedTransaction.load(entityId);
  if(!entity) {
    entity = new AirstackFeedTransaction(entityId);
    entity.hash = event.block.hash.toHexString();
    entity.transactionType = "TRANSFER";
    const transfer = getOrCreateAirstackTransfer(feedCandidateId, event);
    entity.transfer = transfer.id;
    entity.save();
  }
}

function getOrCreateAirstackTransfer(feedCandidateId: string,  event: TransferSent): AirstackTransfer {
  const entityId = getAirstackTransactionEntityId(feedCandidateId, event);
  let entity = AirstackTransfer.load(entityId);
  if(!entity) {
    entity = new AirstackTransfer(entityId);
    entity.token = getAirstackTokenEntityId();
    const fromAddress = event.transaction.from.toHexString();
    const toAddress = event.params.recipient.toHexString();

    entity.from = getAirstackFeedAccountEntityId(feedCandidateId, fromAddress);
    entity.to = getAirstackFeedAccountEntityId(feedCandidateId, toAddress);
    entity.amount = event.params.amount;
    entity.fee = event.params.bonderFee;
    entity.save();
  }
  return entity;
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
