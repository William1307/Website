const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

export const callGemini = async (prompt: string, systemInstruction: string = "") => {
    if (!apiKey) return "Clé API manquante.";
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    systemInstruction: { parts: [{ text: systemInstruction }] },
                }),
            }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, erreur IA.";
    } catch (error) {
        console.error("Erreur Gemini:", error);
        return "Erreur communication IA.";
    }
};
