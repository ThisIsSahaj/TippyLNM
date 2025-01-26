import BountySystem from 0x9d2ade18cb6bea1a

access(all) fun main(id: UInt64): BountySystem.Bounty? {
    return BountySystem.bounties[id]
}