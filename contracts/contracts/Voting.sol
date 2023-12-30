// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voting {
    struct Voter {
        uint votes;
        mapping(uint => uint) votesPerProposal;
    }

    struct Proposal {
        uint voteCount;
        address payable recipient;
        string name;
    }

    mapping(address => Voter) public voters;
    Proposal[] public proposals;

    uint public totalFunds;
    uint public votingFactor;
    uint public totalVotesPerVoter;
    uint public proposalLimit;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    constructor(
        uint _votingFactor,
        uint _totalVotesPerVoter,
        uint _proposalLimit
    ) payable {
        totalFunds = msg.value;
        votingFactor = _votingFactor;
        totalVotesPerVoter = _totalVotesPerVoter;
        proposalLimit = _proposalLimit;
        owner = msg.sender;
    }

    function addProposal(string memory _name) public {
        require(proposals.length < proposalLimit, "Exceeds proposal limit.");
        proposals.push(Proposal(0, payable(msg.sender), _name));
    }

    function vote(uint proposal, uint votes) public {
        Voter storage sender = voters[msg.sender];
        require(
            sender.votes + votes <= totalVotesPerVoter,
            "Exceeds total votes per voter."
        );
        sender.votes += votes;
        sender.votesPerProposal[proposal] += votes;
        proposals[proposal].voteCount += uint(nthRoot(votes));
    }

    function distributeFunds() public onlyOwner {
        uint totalVotes = 0;
        for (uint p = 0; p < proposals.length; p++) {
            totalVotes += proposals[p].voteCount;
        }

        for (uint p = 0; p < proposals.length; p++) {
            address payable recipient = payable(
                address(proposals[p].recipient)
            );
            uint funds = (proposals[p].voteCount * totalFunds) / totalVotes;
            recipient.transfer(funds);
        }
    }

    function nthRoot(uint x) internal view returns (uint y) {
        uint n = votingFactor;
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = ((x / (z ** (n - 1))) + (n - 1) * z) / n;
        }
    }

    receive() external payable {}
}
