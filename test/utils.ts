import {NFT__factory, NFTMarket__factory} from '../src/types/factories/contracts'
import { NFT, NFTMarket } from '@/types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, ContractReceipt } from 'ethers'

export async function createMarketContract(owner: SignerWithAddress): Promise<NFTMarket> {
    const marketFactory = new NFTMarket__factory(owner)
    const market = await marketFactory.deploy()
    await market.deployed()
    return market
}

export async function createNFTContract(owner: SignerWithAddress, market: string): Promise<NFT> {
    const nftFactory = new NFT__factory(owner)
    const nft = await nftFactory.deploy(market)
    await nft.deployed()
    return nft
}

export async function createNFTToken(seller: SignerWithAddress, addr: string, url: string): Promise<BigNumber>{
    const errorResult = Promise.resolve(BigNumber.from(-1))
    const transaction = await NFT__factory.connect(addr, seller).createToken(url)
    const tx =  await transaction.wait()
    if (tx) {
        const events = tx.events;
        if (events && events.length > 0) {
            const event = events.at(0)
            if (event && event.args && event.args.length > 0) {
                return event.args.at(2)
            } 
        }
    } 
    return errorResult
}