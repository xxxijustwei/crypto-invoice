export const TokenBadge = ({ tokenName }: { tokenName: string }) => {
  return (
    <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-100 text-sm text-teal-900">
      <img
        src={`/tokens/${tokenName.toUpperCase()}.svg`}
        alt={tokenName}
        width={18}
        height={18}
      />
      {tokenName}
    </div>
  );
};

export const NetworkBadge = ({ networkName }: { networkName: string }) => {
  return (
    <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-100 text-sm text-teal-900">
      <img
        src={`/networks/${networkName.toLowerCase()}.svg`}
        alt={networkName}
        width={18}
        height={18}
      />
      {networkName}
    </div>
  );
};
