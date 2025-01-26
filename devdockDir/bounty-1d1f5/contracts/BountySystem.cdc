import FungibleToken from 0xf233dcee88fe0abe
import FlowToken from 0x1654653399040a61

access(all) contract BountySystem {
    // Events
    access(all) event BountyCreated(id: UInt64, amount: UFix64, creator: Address)
    access(all) event BountyClaimed(id: UInt64, claimer: Address)
    
    // Bounty struct
    access(all) struct Bounty {
        access(all) let id: UInt64
        access(all) let amount: UFix64
        access(all) let creator: Address
        access(all) let deadline: UFix64
        access(all) let isPublic: Bool
        access(all) var claimed: Bool
        
        init(id: UInt64, amount: UFix64, creator: Address, deadline: UFix64, isPublic: Bool) {
            self.id = id
            self.amount = amount
            self.creator = creator
            self.deadline = deadline
            self.isPublic = isPublic
            self.claimed = false
        }
    }
    
    access(all) let bounties: {UInt64: Bounty}
    access(all) var nextBountyId: UInt64
    
    init() {
        self.bounties = {}
        self.nextBountyId = 1
    }
    
    access(all) fun createBounty(amount: UFix64, deadline: UFix64, isPublic: Bool) {
        let bounty = Bounty(
            id: self.nextBountyId,
            amount: amount,
            creator: self.account.address,
            deadline: deadline,
            isPublic: isPublic
        )
        
        self.bounties[self.nextBountyId] = bounty
        self.nextBountyId = self.nextBountyId + 1
        
        emit BountyCreated(id: bounty.id, amount: amount, creator: self.account.address)
    }
    
    access(all) fun claimBounty(id: UInt64) {
        pre {
            self.bounties[id] != nil: "Bounty does not exist"
            !self.bounties[id]!.claimed: "Bounty already claimed"
            self.bounties[id]!.deadline > getCurrentBlock().timestamp: "Bounty expired"
        }
        
        let bounty = self.bounties[id]!
        bounty.claimed = true
        
        emit BountyClaimed(id: id, claimer: self.account.address)
    }
}