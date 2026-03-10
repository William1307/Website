const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface Message {
    role: 'user' | 'ai';
    text: string;
}

export const callGemini = async (messages: Message[], systemInstruction: string = "") => {
    try {
        const response = await fetch(`${API_URL}/api/chat`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages,
                systemInstruction
            }),
        });

        if (!response.ok) {
            if (response.status === 429) {
                return "Limite de requêtes atteinte. Veuillez patienter une minute avant de réessayer.";
            }
            const errorText = await response.text();
            console.error(`HTTP error! status: ${response.status}`, errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        if (data.error) {
           console.error("Backend Error:", data.error);
           return "Erreur lors de la communication avec l'assistant. Veuillez réessayer.";
        }
        
        return data.text || "Désolé, erreur IA. Format de réponse inattendu.";
    } catch (error) {
        console.error("Erreur Gemini détaillée:", error);
        return "Erreur communication IA. Vérifiez la console du navigateur (F12) pour plus de détails.";
    }
};
