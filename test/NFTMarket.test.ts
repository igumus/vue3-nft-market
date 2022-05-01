import { ethers } from 'hardhat'
import { NFTMarket__factory } from '../src/types/factories/contracts'
import { expect } from 'chai';
import { createMarketContract, createNFTContract, createNFTToken } from './utils'

describe("NFTMarket", async function() {
  it("Should return zero items in empty market", async function() {
    const [owner] = await ethers.getSigners()
    const market = await createMarketContract(owner)
    const currentMarketCount = await market.countMarketItem()
    expect(currentMarketCount).to.eq(0)
  }),
  it("Should return one after adding item to market", async function() {
    const [owner, seller] = await ethers.getSigners()
    const marketContract = await createMarketContract(owner)
    const nftContract = await createNFTContract(owner, marketContract.address)

    let marketCount = await marketContract.countMarketItem()
    expect(marketCount).to.eq(0)

    const listingPrice = await marketContract.getListingPrice()
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    const tokenId = await createNFTToken(seller, nftContract.address, "https://www.example.com")
    expect(tokenId.toNumber()).to.greaterThanOrEqual(0)

    await NFTMarket__factory.connect(marketContract.address, seller).createMarketItem(nftContract.address, tokenId, auctionPrice, {value: listingPrice})

    marketCount = await marketContract.countMarketItem()
    expect(marketCount).to.eq(1)
  }),
  it("Should return zero after selling first item in market", async function() {
    const [owner, seller, buyer] = await ethers.getSigners()
    const marketContract = await createMarketContract(owner)
    const nftContract = await createNFTContract(owner, marketContract.address)

    let availableItemCount = await marketContract.countMarketItem()
    let soldItemCount = await marketContract.soldItemCount()
    expect(availableItemCount).to.eq(0)
    expect(soldItemCount).to.eq(0)

    const listingPrice = await marketContract.getListingPrice()
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    const tokenId = await createNFTToken(seller, nftContract.address, "https://www.example.com")
    expect(tokenId.toNumber()).to.greaterThanOrEqual(0)

    await NFTMarket__factory.connect(marketContract.address, seller).createMarketItem(nftContract.address, tokenId, auctionPrice, {value: listingPrice})

    availableItemCount = await marketContract.countMarketItem()
    expect(availableItemCount).to.eq(1)
    expect(soldItemCount).to.eq(0)

    await NFTMarket__factory.connect(marketContract.address, buyer).buyMarketItem(nftContract.address, tokenId, {value: auctionPrice} )

    availableItemCount = await marketContract.countMarketItem()
    soldItemCount = await marketContract.soldItemCount()
    expect(availableItemCount).to.eq(0)
    expect(soldItemCount).to.eq(1)

  })
});