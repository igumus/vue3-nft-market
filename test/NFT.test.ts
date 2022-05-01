import {ethers} from 'hardhat'
import {NFT__factory, NFTMarket__factory} from '../src/types/factories/contracts'
import { expect } from 'chai';
import {createMarketContract, createNFTContract} from './utils'



describe("NFT", async function(){
  it("Should create token successfully", async function() {
    const [owner, seller] = await ethers.getSigners()
    const marketContract = await createMarketContract(owner)
    const nftContract = await createNFTContract(owner, marketContract.address)
  
    let transaction = await NFT__factory.connect(nftContract.address, seller).createToken("https://www.example.com")
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
    const [owner, seller] = await ethers.getSigners()

    const marketContract = await createMarketContract(owner)
    const nftContract = await createNFTContract(owner, marketContract.address)

    const currentMarketCount = await NFTMarket__factory.connect(marketContract.address, seller).availableItemCount()
    expect(currentMarketCount).to.eq(0)

    let transaction = await NFT__factory.connect(nftContract.address, seller).createToken("https://www.example.com")
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

    transaction = await NFT__factory.connect(nftContract.address, seller).createToken("https://www.example2.com")
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