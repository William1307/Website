const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.5-flash"; // Changed to the newest flash model

export interface Message {
    role: 'user' | 'ai';
    text: string;
}

export const callGemini = async (messages: Message[], systemInstruction: string = "") => {
    if (!apiKey || apiKey === "VOTRE_CLE_API_ICI") {
        console.error("API Key is missing or invalid");
        return "Clé API manquante ou invalide.";
    }

    const formattedContents = messages.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
    }));

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: formattedContents,
                    systemInstruction: { parts: [{ text: systemInstruction }] },
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HTTP error! status: ${response.status}`, errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, erreur IA. Format de réponse inattendu.";
    } catch (error) {
        console.error("Erreur Gemini détaillée:", error);
        return "Erreur communication IA. Vérifiez la console du navigateur (F12) pour plus de détails.";
    }
};
