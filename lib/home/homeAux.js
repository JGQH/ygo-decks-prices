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

    const ydkLines = ydkString.split(/\s/g)

    return ydkLines;
}