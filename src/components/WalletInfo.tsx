"use client";

"use client";

import { useReadContract, useReadContracts } from "wagmi";
import { multisigWalletAddress, multisigWalletABI } from "@/lib/contracts";
import { formatAddress } from "@/utils/formatting";

export function WalletInfo() {
  // Read the number of required confirmations (a single value)
  const { data: requiredConfirmations, isLoading: isLoadingConfirmations } =
    useReadContract({
      address: multisigWalletAddress,
      abi: multisigWalletABI,
      functionName: "requiredConfirmations",
    });

  // Read the list of owner addresses
  // Note: We use `useReadContracts` to call the `owners(index)` getter for each owner
  const { data: owners, isLoading: isLoadingOwners } = useReadContracts({
    contracts: [
      {
        address: multisigWalletAddress,
        abi: multisigWalletABI,
        functionName: "owners",
        args: [BigInt(0)],
      },
      {
        address: multisigWalletAddress,
        abi: multisigWalletABI,
        functionName: "owners",
        args: [BigInt(1)],
      },
      {
        address: multisigWalletAddress,
        abi: multisigWalletABI,
        functionName: "owners",
        args: [BigInt(2)],
      },
    ],
  });

  if (isLoadingOwners || isLoadingConfirmations) {
    return <div>Loading wallet info...</div>;
  }

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-2">Wallet Info</h2>
      <p>
        <strong>Required Confirmations:</strong>{" "}
        {requiredConfirmations?.toString()}
      </p>
      <h3 className="font-bold mt-2">Owners:</h3>
      <ul>
        {owners?.map((ownerResult, index) => (
          <li key={index} className="font-mono">
            {ownerResult.status === "success"
              ? formatAddress(ownerResult.result as `0x${string}`)
              : "Error loading owner"}
          </li>
        ))}
      </ul>
    </div>
  );
}
