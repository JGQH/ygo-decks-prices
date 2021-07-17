async function ydkStringify(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader()
            reader.onload = e => resolve(e.target.result);
            reader.readAsText(file)
        } catch (error) {
            reject(error);
        }
    })
}

export async function ydkParse(file) {
    const ydkString = await ydkStringify(file)

    const ydkLines = ydkString.split(/\s/g);
    const ydkArray = ydkLines.filter(line => line.match(/^[0-9]{6,8}$/g));

    if((ydkArray.length === 0) || (ydkArray.length > 90)) throw new Error("YdkError: Deck has an invalid amount of cards.");

    return ydkArray;
}