const { expect } = require("chai");

describe("Voting", function () {
  let voting,
    owner,
    voter1,
    voter2,
    votingFactor,
    totalVotesPerVoter,
    proposalLimit;

  beforeEach(async function () {
    const Voting = await ethers.getContractFactory("Voting");
    [owner, voter1, voter2, _] = await ethers.getSigners();
    console.log(voter1.address);
    votingFactor = 2;
    totalVotesPerVoter = 100;
    proposalLimit = 3;
    voting = await Voting.deploy(
      votingFactor,
      totalVotesPerVoter,
      proposalLimit,
      { value: 1_000_000_000_000 }
    );
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await voting.owner()).to.equal(owner.address);
    });

    it("Should set the right voting factor", async function () {
      expect(await voting.votingFactor()).to.equal(2);
    });

    it("Should set the right total votes per voter", async function () {
      expect(await voting.totalVotesPerVoter()).to.equal(100);
    });

    it("Should set the right proposal limit", async function () {
      expect(await voting.proposalLimit()).to.equal(3);
    });
  });

  describe("Proposals", function () {
    it("Should allow to add a proposal", async function () {
      await voting.connect(voter1).addProposal("Proposal 1");
      const proposal = await voting.proposals(0);
      expect(proposal.name).to.equal("Proposal 1");
      expect(proposal.recipient).to.equal(voter1.address);
      expect(proposal.voteCount).to.equal(0);
    });

    it("Should not allow to add a proposal if limit is reached", async function () {
      await voting.connect(voter1).addProposal("Proposal 1");
      await voting.connect(voter1).addProposal("Proposal 2");
      await voting.connect(voter1).addProposal("Proposal 3");
      await expect(
        voting.connect(voter1).addProposal("Proposal 4")
      ).to.be.revertedWith("Exceeds proposal limit.");
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      await voting.connect(voter1).addProposal("Proposal 1");
      await voting.connect(voter2).addProposal("Proposal 2");
    });

    it("Should allow a voter to vote", async function () {
      await voting.connect(voter1).vote(0, 50);
      const proposal = await voting.proposals(0);
      expect(proposal.voteCount).to.equal(
        Math.floor(Math.pow(50, 1 / votingFactor))
      );
    });

    it("Should not allow a voter to vote more than their total votes", async function () {
      await expect(voting.connect(voter1).vote(0, 101)).to.be.revertedWith(
        "Exceeds total votes per voter."
      );
    });
  });

  describe("Distribute Funds", function () {
    it("Should allow owner to distribute funds", async function () {
      await voting.connect(voter1).addProposal("Proposal 1");
      await voting.connect(voter2).addProposal("Proposal 2");
      await voting.connect(voter1).vote(0, 50);
      await voting.connect(voter2).vote(1, 50);
      await expect(voting.connect(owner).distributeFunds()).to.not.be.reverted;
    });

    it("Should not allow non-owner to distribute funds", async function () {
      await expect(voting.connect(voter1).distributeFunds()).to.be.revertedWith(
        "Only owner can call this function."
      );
    });
  });
});
