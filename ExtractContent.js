function extractContent(payloads) {
    const contentRegex = /"content":"(.*?)"/g; // Regular expression to match "content" values
    let match;
    let result = [];

    // Loop through all matches in the payloads
    while ((match = contentRegex.exec(payloads)) !== null) {
        result.push(match[1]); // match[1] contains the value after "content":
    }

    return result.join(''); // Join all the extracted content
}
