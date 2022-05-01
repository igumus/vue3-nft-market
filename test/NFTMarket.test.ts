import {ethers} from 'hardhat'
import {NFT__factory, NFTMarket__factory} from '../src/types/factories/contracts'
import { expect, should } from 'chai';
import { NFT, NFTMarket } from '@/types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

async function createMarketContract(owner: SignerWithAddress): Promise<NFTMarket> {
    const marketFactory = new NFTMarket__factory(owner)
    const market = await marketFactory.deploy()
    await market.deployed()
    console.log("market deployed at:", market.address)
    return market
}

async function createNFTContract(owner: SignerWithAddress, market: string): Promise<NFT> {
    const nftFactory = new NFT__factory(owner)
    const nft = await nftFactory.deploy(market)
    await nft.deployed()
    console.log('nft deployed at:', nft.address)
    return nft
}


describe("NFTMarket", async function() {
  it("Should return zero items in empty market", async function() {
    const [owner] = await ethers.getSigners()
    const market = await createMarketContract(owner)
    const currentMarketCount = await market.countMarketItem()
    expect(currentMarketCount).to.eq(0)
  }),
  it("Should return one after adding item to market", async function() {
    const [owner] = await ethers.getSigners()
    const market = await createMarketContract(owner)
    expect(market).to.ok;
    const nft = await createNFTContract(owner, market.address)
    expect(nft).to.ok;

    let marketCount = await market.countMarketItem()
    expect(marketCount).to.eq(0)

    const listingPrice = await market.getListingPrice()
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')
    await nft.createToken("https://www.example.com")
   
    await market.createMarketItem(nft.address, 1, auctionPrice, {value: listingPrice})

    marketCount = await market.countMarketItem()
    expect(marketCount).to.eq(1)
  }),
  it("Should return one after adding item to market", async function() {
    const [owner] = await ethers.getSigners()
    const market = await createMarketContract(owner)
    expect(market).to.ok;
    const nft = await createNFTContract(owner, market.address)
    expect(nft).to.ok;

    let marketCount = await market.countMarketItem()
    expect(marketCount).to.eq(0)

    const listingPrice = await market.getListingPrice()
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')
    await nft.createToken("https://www.example.com")
   
    await market.createMarketItem(nft.address, 1, auctionPrice, {value: listingPrice})

    marketCount = await market.countMarketItem()
    expect(marketCount).to.eq(1)
  }) 
});