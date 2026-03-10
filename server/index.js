import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for frontend requests (Allows all origins for dev/prod flexibility)
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

// Set up rate limiting
// Allow max 10 requests per minute per IP to prevent spam
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    message: { error: 'Too many requests from this IP, please try again after a minute' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests to /api/chat
app.use('/api/chat', limiter);

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, systemInstruction } = req.body;
        
        if (!process.env.GEMINI_API_KEY) {
            console.error("Gemini API key is not configured in the backend.");
            return res.status(500).json({ error: "Server configuration error." });
        }

        const MODEL_NAME = "gemini-2.5-flash";

        const formattedContents = messages.map((msg) => ({
            role: msg.role === 'ai' || msg.role === 'model'  ? 'model' : 'user',
            parts: [{ text: msg.text || "" }]
        }));

        const bodyPayload = {
            contents: formattedContents,
        };

        if (systemInstruction) {
             bodyPayload.systemInstruction = { parts: [{ text: systemInstruction }] };
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyPayload),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Gemini API error! status: ${response.status}`, errorText);
            
            if (response.status === 400 && (errorText.includes('API_KEY_INVALID') || errorText.includes('expired'))) {
                 // Return a graceful fallback response so the frontend chatbot still functions
                 return res.json({ text: "Oups ! Il semblerait que ma clé de communication soit expirée. Le propriétaire du site (Kristofer) doit renouveler sa clé d'API Google dans le `.env` de son serveur pour que je puisse à nouveau vous répondre intelligemment." });
            }

            return res.status(response.status).json({ error: `Gemini API error: ${response.status}` });
        }

        const data = await response.json();
        
        // Extract the response text
        const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!aiResponseText) {
            return res.status(500).json({ error: "Unexpected response format from AI." });
        }

        res.json({ text: aiResponseText });

    } catch (error) {
        console.error("Server API error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
