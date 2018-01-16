export default function translateInline(translations, text) {
    let translatedText;

    // Checks if the provided thing is a string.
    if (typeof text === 'string') {
        // Check if translations are loaded/accessible.
        if (translations) {
            // Translate.
            translatedText = translations[text.toLowerCase().trim()];
        } else {
            // If not render a placeholder.
            translatedText = '*~*~*~*';
        }
    }

    if (!translatedText) return text; else return translatedText;
};
