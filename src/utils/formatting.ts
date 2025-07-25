export const formatAddress = (address: `0x${string}` | undefined): string => {
  if (!address) return "No Address";
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
};
