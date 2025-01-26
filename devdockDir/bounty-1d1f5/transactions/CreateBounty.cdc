import BountySystem from 0x9d2ade18cb6bea1a

transaction(amount: UFix64, deadline: UFix64, isPublic: Bool) {
    prepare(signer: AuthAccount) {
        BountySystem.createBounty(amount: amount, deadline: deadline, isPublic: isPublic)
    }
}