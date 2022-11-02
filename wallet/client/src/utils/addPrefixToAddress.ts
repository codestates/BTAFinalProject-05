// TODO: ERGO의 address system research
const addPrefixToAddress = (address: string) => {
    // return /0x/.test(address) ? address : `0x${address}`;
    return address;
}

export default addPrefixToAddress;
