import { useAccount, useConnect, useDisconnect } from "wagmi";
import { formatAddress } from "@/utils/formatting";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span>Connected: {formatAddress(address)}</span>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isPending ? "Connecting..." : `Connect with ${connector.name}`}
        </button>
      ))}
    </div>
  );
}
