import {
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";
import {
  TokenSwap,
  AddLiquidity,
  RemoveLiquidity,
  RemoveLiquidityOne,
  RemoveLiquidityImbalance,
} from '../generated/HopL2Amm/L2_Amm'
import {
  TokenSwap as TokenSwapEntity,
  AmmFee as AmmFeeEntity,
  Tvl as TvlEntity,
  AmmTvl as AmmTvlEntity,
  AddLiquidity as AddLiquidityEntity,
  RemoveLiquidity as RemoveLiquidityEntity,
  RemoveLiquidityOne as RemoveLiquidityOneEntity,
  RemoveLiquidityImbalance as RemoveLiquidityImbalanceEntity,
  Token as TokenEntity,
} from '../generated/schema'

const TOKEN_ADDRESS = '{{address}}'
const TOKEN_NAME = '{{tokenName}}'
const TOKEN_SYMBOL = '{{token}}'
const TOKEN_DECIMALS = {{tokenDecimals}}
const BASIS_POINTS = '4000000' // 4bps
const FEE_DENOMINATOR = '10000000000' // 10**10

export function handleTokenSwap(event: TokenSwap): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = TokenSwapEntity.load(id)
  if (entity == null) {
    entity = new TokenSwapEntity(id)
  }

  entity.buyer = event.params.buyer.toHexString()
  entity.tokensSold = event.params.tokensSold
  entity.tokensBought = event.params.tokensBought
  entity.soldId = event.params.soldId
  entity.boughtId = event.params.boughtId

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  let tokenEntity = TokenEntity.load(TOKEN_ADDRESS)
  if (tokenEntity == null) {
    tokenEntity = new TokenEntity(TOKEN_ADDRESS)
    tokenEntity.address = Address.fromString(TOKEN_ADDRESS)
    tokenEntity.name = TOKEN_NAME
    tokenEntity.symbol = TOKEN_SYMBOL
    tokenEntity.decimals = TOKEN_DECIMALS
    tokenEntity.save()
  }
  entity.tokenEntity = TOKEN_ADDRESS

  entity.save()

  const ammFeesId = "ammFees:{{token}}"
  let ammFeesEntity = AmmFeeEntity.load(ammFeesId)
  if (ammFeesEntity == null) {
    ammFeesEntity = new AmmFeeEntity(ammFeesId)
    ammFeesEntity.amount = BigInt.fromI32(0)
  }

  ammFeesEntity.amount = ammFeesEntity.amount.plus(event.params.tokensSold.times(BigInt.fromString(BASIS_POINTS)).div(BigInt.fromString(FEE_DENOMINATOR)))
  ammFeesEntity.token = TOKEN_SYMBOL
  ammFeesEntity.tokenEntity = TOKEN_ADDRESS

  ammFeesEntity.save()
}

export function handleAddLiquidity(event: AddLiquidity): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = AddLiquidityEntity.load(id)
  if (entity == null) {
    entity = new AddLiquidityEntity(id)
  }

  entity.provider = event.params.provider.toHexString()
  entity.tokenAmounts = event.params.tokenAmounts
  entity.fees = event.params.fees
  entity.invariant = event.params.invariant
  entity.lpTokenSupply = event.params.lpTokenSupply

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()

  const tvlId = "tvl:{{token}}"
  let tvlEntity = TvlEntity.load(tvlId)
  if (tvlEntity == null) {
    tvlEntity = new TvlEntity(tvlId)
    tvlEntity.amount = BigInt.fromI32(0)
  }

  let amounts = event.params.tokenAmounts
  if (amounts.length == 0) {
    return
  }
  let amount = amounts[0]
  tvlEntity.amount = tvlEntity.amount.plus(amount)
  tvlEntity.token = TOKEN_SYMBOL
  tvlEntity.save()

  const ammTvlId = "ammTvl:{{token}}"
  let ammTvlEntity = AmmTvlEntity.load(ammTvlId)
  if (ammTvlEntity == null) {
    ammTvlEntity = new AmmTvlEntity(ammTvlId)
    ammTvlEntity.amount = BigInt.fromI32(0)
  }
  ammTvlEntity.amount = ammTvlEntity.amount.plus(amount)
  ammTvlEntity.token = TOKEN_SYMBOL
  ammTvlEntity.save()
}

export function handleRemoveLiquidity(event: RemoveLiquidity): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = RemoveLiquidityEntity.load(id)
  if (entity == null) {
    entity = new RemoveLiquidityEntity(id)
  }

  entity.provider = event.params.provider.toHexString()
  entity.tokenAmounts = event.params.tokenAmounts
  entity.lpTokenSupply = event.params.lpTokenSupply

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()

  const tvlId = "tvl:{{token}}"
  let tvlEntity = TvlEntity.load(tvlId)
  if (tvlEntity == null) {
    tvlEntity = new TvlEntity(tvlId)
    tvlEntity.amount = BigInt.fromI32(0)
  }

  let amounts = event.params.tokenAmounts
  if (amounts.length == 0) {
    return
  }
  let amount = amounts[0]
  tvlEntity.amount = tvlEntity.amount.minus(amount)
  tvlEntity.token = TOKEN_SYMBOL
  tvlEntity.save()

  const ammTvlId = "ammTvl:{{token}}"
  let ammTvlEntity = AmmTvlEntity.load(ammTvlId)
  if (ammTvlEntity == null) {
    ammTvlEntity = new AmmTvlEntity(ammTvlId)
    ammTvlEntity.amount = BigInt.fromString('0')
  }
  ammTvlEntity.token = TOKEN_SYMBOL
  ammTvlEntity.amount = ammTvlEntity.amount.minus(amount)
  ammTvlEntity.save()
}

export function handleRemoveLiquidityOne(event: RemoveLiquidityOne): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = RemoveLiquidityOneEntity.load(id)
  if (entity == null) {
    entity = new RemoveLiquidityOneEntity(id)
  }

  entity.provider = event.params.provider.toHexString()
  entity.lpTokenAmount = event.params.lpTokenAmount
  entity.lpTokenSupply = event.params.lpTokenSupply
  entity.boughtId = event.params.boughtId
  entity.tokensBought = event.params.tokensBought

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()

  let tokenIndex = event.params.boughtId
  if (!tokenIndex.equals(BigInt.fromI32(0))) {
    return
  }

  const tvlId = "tvl:{{token}}"
  let tvlEntity = TvlEntity.load(tvlId)
  if (tvlEntity == null) {
    tvlEntity = new TvlEntity(tvlId)
    tvlEntity.amount = BigInt.fromI32(0)
  }

  let amount = event.params.tokensBought
  tvlEntity.amount = tvlEntity.amount.minus(amount)
  tvlEntity.token = TOKEN_SYMBOL
  tvlEntity.save()

  const ammTvlId = "ammTvl:{{token}}"
  let ammTvlEntity = AmmTvlEntity.load(ammTvlId)
  if (ammTvlEntity == null) {
    ammTvlEntity = new AmmTvlEntity(ammTvlId)
    ammTvlEntity.amount = BigInt.fromI32(0)
  }
  ammTvlEntity.amount = ammTvlEntity.amount.minus(amount)
  ammTvlEntity.token = TOKEN_SYMBOL
  ammTvlEntity.save()
}

export function handleRemoveLiquidityImbalance(event: RemoveLiquidityImbalance): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = RemoveLiquidityImbalanceEntity.load(id)
  if (entity == null) {
    entity = new RemoveLiquidityImbalanceEntity(id)
  }

  entity.provider = event.params.provider.toHexString()
  entity.tokenAmounts = event.params.tokenAmounts
  entity.fees = event.params.fees
  entity.invariant = event.params.invariant
  entity.lpTokenSupply = event.params.lpTokenSupply

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}
