import { NetworkIcon } from "../icons/network";
import { TokenIcon } from "../icons/token";

export const TokenBadge = ({ tokenName }: { tokenName: string }) => {
  return (
    <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100">
      <TokenIcon id={tokenName} width={20} height={20} />
      {tokenName}
    </div>
  );
};

export const NetworkBadge = ({ networkName }: { networkName: string }) => {
  return (
    <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100">
      <NetworkIcon id={networkName} width={20} height={20} />
      {networkName}
    </div>
  );
};
