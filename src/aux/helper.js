/**
 * Obtains text content of YDK file
 * @param {any} ydk_file 
 * @returns {Promise<String>}
 */
export async function getText(ydk_file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader()
            reader.onload = e => resolve(e.target.result);
            reader.readAsText(ydk_file)
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * Obtains only the numbers from YDK text
 * @param {String} ydk_text 
 * @returns {Array<String>}
 */
export function getArray(ydk_text) {
    const lines = ydk_text.split(/\s/g);
    const valid = lines.filter(line => line.match(/^[0-9]{7,8}$/g));

    if((valid.length === 0) || (valid.length > 90)) throw new Error("YdkError: Deck has an invalid amount of cards.");

    return valid;
}