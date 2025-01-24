import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ethers } from "ethers";

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientAddress: string;
  startupTitle: string;
}

const TipModal = ({ isOpen, onClose, recipientAddress, startupTitle }: TipModalProps) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTip = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");
    
    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.parseEther(amount)
      });

      await tx.wait();
      alert("Tip sent successfully!");
      onClose();
    } catch (error) {
      console.error("Error sending tip:", error);
      alert("Failed to send tip");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Tip for {startupTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Amount (Sepolia ETH)</label>
            <Input
              type="number"
              step="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.01"
            />
          </div>
          <Button
            onClick={handleTip}
            disabled={!amount || isLoading}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Send Tip"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipModal; 