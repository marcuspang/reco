//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Recommendoor {
	event UploadData(address user, string ipfsHash, string channel);
	event InteractData(address user, string ipfsHash, string action);

	function uploadData(
		address user,
		string calldata ipfsHash,
		string calldata channel
	) external {
		emit UploadData(user, ipfsHash, channel);
	}

	function interactContent(
		address user,
		string calldata ipfsHash,
		string calldata action
	) external {
		emit InteractData(user, ipfsHash, action);
	}
}
