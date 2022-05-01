import {ethers} from 'hardhat'
import {NFT__factory, NFTMarket__factory} from '../src/types/factories/contracts'
import { expect } from 'chai';

describe("NFT", async function(){
  it("Should create token successfully", async function() {
    const [owner] = await ethers.getSigners()
    const marketFactory = new NFTMarket__factory(owner)
    const market = await marketFactory.deploy()
    await market.deployed()
    console.log("market deployed at:", market.address)

    const nftFactory = new NFT__factory(owner)
    const nft = await nftFactory.deploy(market.address)
    await nft.deployed()
    console.log('nft deployed at: ', nft.address)
   
    let transaction = await nft.createToken("https://www.example.com")
    let tx = await transaction.wait()
    expect(tx).to.ok;
    expect(tx.events).ok;
    expect(tx.events?.length).to.greaterThan(0)
    let event = tx.events?.at(0)
    expect(event).to.ok;
    expect(event?.args).to.ok;
    expect(event?.args?.length).to.greaterThanOrEqual(2)
    let result = event?.args?.at(2)
    expect(result).to.eq(1)
  }),
  it("Should increase tokenID successfully", async function() {
    const [owner] = await ethers.getSigners()
    const marketFactory = new NFTMarket__factory(owner)
    const market = await marketFactory.deploy()
    await market.deployed()
    console.log("market deployed at:", market.address)
    const currentMarketCount = await market.countMarketItem()
    expect(currentMarketCount).to.eq(0)

    const nftFactory = new NFT__factory(owner)
    const nft = await nftFactory.deploy(market.address)
    await nft.deployed()
    console.log('nft deployed at: ', nft.address)
   
    let transaction = await nft.createToken("https://www.example.com")
    let tx = await transaction.wait()
    expect(tx).to.ok;
    expect(tx.events).ok;
    expect(tx.events?.length).to.greaterThan(0)
    let event = tx.events?.at(0)
    expect(event).to.ok;
    expect(event?.args).to.ok;
    expect(event?.args?.length).to.greaterThanOrEqual(2)
    let result = event?.args?.at(2)
    expect(result).to.eq(1)

    transaction = await nft.createToken("https://www.example2.com")
    tx = await transaction.wait()
    expect(tx).to.ok;
    expect(tx.events).ok;
    expect(tx.events?.length).to.greaterThan(0)
    event = tx.events?.at(0)
    expect(event).to.ok;
    expect(event?.args).to.ok;
    expect(event?.args?.length).to.greaterThanOrEqual(2)
    result = event?.args?.at(2)
    expect(result).to.eq(2)
  })
})