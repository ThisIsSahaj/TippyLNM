'use client';
import { Button } from "./ui/button";
import { useWallet } from "@/hooks/useWallet";

export const WalletButton = () => {
  const { isConnected, address, connectWallet, disconnectWallet, formatAddress } = useWallet();
  
  return (
    <Button 
      onClick={isConnected ? disconnectWallet : connectWallet}
      className="bg-black text-white hover:bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% "
    >
      {isConnected ? formatAddress(address) : "Connect Wallet"}
    </Button>
  );
};