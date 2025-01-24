'use client';
import { Button } from "./ui/button";
import { useWallet } from "@/hooks/useWallet";

export const WalletButton = () => {
  const { isConnected, address, connectWallet, disconnectWallet, formatAddress } = useWallet();
  
  return (
    <Button 
      onClick={isConnected ? disconnectWallet : connectWallet}
      className="bg-black text-white"
    >
      {isConnected ? formatAddress(address) : "Connect Wallet"}
    </Button>
  );
}; 