import { useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from "web3modal"
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'


// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")


const projectId = "2MxkfwKGYf7A1kuDxgeIByYnPtL";
const projectSecret = "b0af5a2ed94fbacf019993faf7d46ccd";
const infuraDomain = "https://ipfs.infura.io:5001/";

const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'infura.ipfs.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      //   https://mainnet.infura.io/v3/46d379616c1a4476a7ce360a293aa5b2
        const url = `${infuraDomain}/ipfs/${added.path}`
      // const url = `https://polygon-mumbai.g.alchemy.com/v2/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createItem() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return

    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {console.log("hii");
      const added = await client.add(data)
        const url = `${infuraDomain}/ipfs/${added.path}`
      // const url = `https://polygon-mumbai.g.alchemy.com/v2/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to use it in the polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }


  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()


    contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()

    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    let contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer)
    let listingPrice = listNFTForSale.toString()

    transaction = await contract.createMarketItem(
      nftaddress, tokenId, price, { value: listingPrice }
    )
    await transaction.wait()
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2 " aria-describedby="user_avatar_help" id="user_avatar" type="file"
          name="Asset"
          onChange={onChange} />

        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={createItem} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </div>
    </div>
  )
}