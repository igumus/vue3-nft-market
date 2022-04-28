import axios from 'axios'
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { ADDR_NFT_MARKET, ADDR_NFT } from '@/contract.config'
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

// infura ipfs rpc url
const ipfsRpcUrl = process.env.VUE_APP_INFURA_IPFS_RPC_ADDR
// infura ipfs endpoint url
const ipfsEndpointUrl = process.env.VUE_APP_INFURA_IPFS_ENDPOINT_ADDR
// network rpc endpoint address
const networkRpcUrl = process.env.VUE_APP_NETWORK_RPC_ADDR

// ipfs client instance
const ipfsClient = create({url: ipfsRpcUrl})

// uploadAsset - uploads asset to ipfs instance
export const uploadAsset = async(file: File):Promise<string> => {
    let ret = ''
    try {
        const added = await ipfsClient.add(file);
        ret = `${ipfsEndpointUrl}/ipfs/${added.path}`
    } catch (error) {
        console.log('Error uploading file: ', error)
        ret = ''
    }   
    if (ret) {
        console.log('Asset uploaded: ', ret)
    } 
    return Promise.resolve(ret)
}

// uploadMetaData - uploads file metadata to ipfs instance
export const uploadMetaData = async (name: string, desc: string, link: string): Promise<string> => {
    let ret = ''
    const data = JSON.stringify({ name, desc, link})
    try {
        const added = await ipfsClient.add(data)
        ret = `${ipfsEndpointUrl}/ipfs/${added.path}`
    } catch (error) {
        console.log('Error uploading file: ', error)
        ret = ''
    }  
    return Promise.resolve(ret)
}

// createNFT - creates nft on the network with given metadata url
const createNFT = async(signer: ethers.providers.JsonRpcSigner, url: string): Promise<number> => {
    const nftContract = new ethers.Contract(ADDR_NFT, NFT.abi, signer)
    const transaction = await nftContract.createToken(url)
    const tx = await transaction.wait()
    const event = tx.events[0]
    const value = event.args[2]
    const tokenId = value.toNumber()
    return Promise.resolve(tokenId)
}


// pushToMarket - pushes/saved item (which contains asset meta) to NFTMarket
export const pushToMarket = async(url: string, price: number): Promise<boolean> => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const tokenId = await createNFT(signer, url)    
    const nftPrice = ethers.utils.parseUnits(price.toString(), 'ether')

    /* then list the item for sale on the marketplace */
    const contract = new ethers.Contract(ADDR_NFT_MARKET, NFTMarket.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    const transaction = await contract.createMarketItem(ADDR_NFT, tokenId, nftPrice, { value: listingPrice })
    await transaction.wait()
    console.log('token put on market', tokenId)
    return Promise.resolve(true)
}

export interface MarketItem {
    price: string;
    itemId: number,
    seller: string;
    owner: string;
    link: string;
    name: string;
    desc: string;
}

export const myItems = async(): Promise<MarketItem[]> => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
 
    const marketContract = new ethers.Contract(ADDR_NFT_MARKET, NFTMarket.abi, signer)
    const tokenContract = new ethers.Contract(ADDR_NFT, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()
    
    const items = await Promise.all(data.map(async (i:any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      const item: MarketItem = {
        price: price,
        itemId: i.itemId.toNumber(),
        seller: i.seller as string,
        owner: i.owner as string,
        link: meta.data.link as string,
        name: meta.data.name as string,
        desc: meta.data.desc as string,
      }
      return item
    }))
    return items
}

export const buyNFT = async(nft: MarketItem) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ADDR_NFT_MARKET, NFTMarket.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(ADDR_NFT, nft.itemId, {
      value: price
    })
    await transaction.wait()
}

export const listMarketItems = async (): Promise<MarketItem[]> => {    
    const provider = new ethers.providers.JsonRpcProvider(networkRpcUrl)
    const tokenContract = new ethers.Contract(ADDR_NFT, NFT.abi, provider)
    const marketContract = new ethers.Contract(ADDR_NFT_MARKET, NFTMarket.abi, provider)
    const data = await marketContract.fetchMarketItems()
    
    const items = await Promise.all(data.map(async (i:any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      const item: MarketItem = {
        price: price,
        itemId: i.itemId.toNumber(),
        seller: i.seller as string,
        owner: i.owner as string,
        link: meta.data.link as string,
        name: meta.data.name as string,
        desc: meta.data.desc as string,
      }
      return item
    }))
    return items
}