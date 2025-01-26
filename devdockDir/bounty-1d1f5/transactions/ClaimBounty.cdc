import BountySystem from 0x9d2ade18cb6bea1a

transaction(bountyId: UInt64) {
    prepare(signer: AuthAccount) {
        BountySystem.claimBounty(id: bountyId)
    }
}