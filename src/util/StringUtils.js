export function isBlank(input) {
    return input == null || /^\s*$/.test(input) || input === '';
}

export function isNotBlank(input) {
    return !this.isBlank(input);
}

export function shortenKey(input) {
    return input.substring(0, 6) + "..." + input.substring(38);
}

export function shortenTx(input) {
    return input.substring(0, 10) + "..." + input.substring(56);
}