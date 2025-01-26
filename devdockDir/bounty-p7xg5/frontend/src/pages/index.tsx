import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, useConnect, useContractRead, useContractWrite } from 'wagmi';
import { TippingPlatform } from '../contracts/types';
import TippingPlatformABI from '../contracts/TippingPlatform.json';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [creatorName, setCreatorName] = useState('');
  const [description, setDescription] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [creatorAddress, setCreatorAddress] = useState('');

  const { write: registerCreator } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: TippingPlatformABI,
    functionName: 'registerCreator',
  });

  const { write: sendTip } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: TippingPlatformABI,
    functionName: 'tipCreator',
  });

  const handleRegister = async () => {
    try {
      await registerCreator({
        args: [creatorName, description],
      });
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const handleTip = async () => {
    try {
      await sendTip({
        args: [creatorAddress, ethers.parseEther(tipAmount)],
      });
    } catch (error) {
      console.error('Error tipping:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Social Tipping Platform</h1>
      
      {!isConnected ? (
        <button className="btn btn-primary">Connect Wallet</button>
      ) : (
        <div className="space-y-8">
          <div className="card p-6 bg-base-200">
            <h2 className="text-2xl mb-4">Register as Creator</h2>
            <input
              type="text"
              placeholder="Creator Name"
              className="input input-bordered w-full mb-4"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered w-full mb-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleRegister} className="btn btn-primary">
              Register
            </button>
          </div>

          <div className="card p-6 bg-base-200">
            <h2 className="text-2xl mb-4">Send Tip</h2>
            <input
              type="text"
              placeholder="Creator Address"
              className="input input-bordered w-full mb-4"
              value={creatorAddress}
              onChange={(e) => setCreatorAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount in ETH"
              className="input input-bordered w-full mb-4"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
            />
            <button onClick={handleTip} className="btn btn-primary">
              Send Tip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}