/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-18 01:14:03
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-08-18 17:47:27
 * @FilePath: /nameoftheproject/pages/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NFTCard } from "./nftCard"
import { useState } from 'react'

const Home = () => {
 const [wallet, setWalletAddress] = useState("");
 const [collection, setCollectionAddress] = useState("");
 const [NFTs, setNFTs] = useState([])
 const [fetchForCollection, setFetchForCollection]=useState(false)


  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const api_key = "T-vBSj0brJwXJEjCyv0TuGOf1h1Q0WzW";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (!collection.length) {
    
      const fetchURL = `${baseURL}?owner=${wallet}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }
  
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "T-vBSj0brJwXJEjCyv0TuGOf1h1Q0WzW";
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

 return (
   <div className="flex flex-col items-center justify-center py-8 gap-y-3">
     <div className="flex flex-col w-full justify-center items-center gap-y-2">
     <input disabled={fetchForCollection} type={"text"} placeholder="Add your wallet address" onChange={e => setWalletAddress(e.target.value)} value={wallet}></input>
       <input type={"text"} placeholder="Add the collection address"></input>
       <label className="text-gray-600 "><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
       <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
           if (fetchForCollection) {
             fetchNFTsForCollection()
           }else fetchNFTs()
         }
       }>Let's go! </button>
     </div>
     <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
       {
         NFTs.length && NFTs.map(nft => {
           return (
             <NFTCard nft={nft}></NFTCard>
           )
         })
       }
     </div>
   </div>
 )
}

export default Home