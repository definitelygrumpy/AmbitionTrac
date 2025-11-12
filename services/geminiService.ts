
import { GoogleGenAI, Type } from "@google/genai";
import type { Activity } from '../types.ts';

export async function generateActivities(passion: string): Promise<Omit<Activity, 'id' | 'completed'>[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the passion "${passion}", generate exactly 10 distinct, meaningful, and actionable guided activities to help someone start and progress. Each activity should have a clear title and a short, encouraging description of the task.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        activities: {
                            type: Type.ARRAY,
                            description: "A list of 10 activities.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: {
                                        type: Type.STRING,
                                        description: "A short, clear title for the activity.",
                                    },
                                    description: {
                                        type: Type.STRING,
                                        description: "A one or two sentence description of what to do for this activity.",
                                    },
                                },
                                required: ["title", "description"],
                            },
                        },
                    },
                    required: ["activities"],
                },
            },
        });

        const jsonResponse = JSON.parse(response.text);
        if (jsonResponse.activities && Array.isArray(jsonResponse.activities) && jsonResponse.activities.length > 0) {
            return jsonResponse.activities;
        } else {
            throw new Error("Invalid response format from AI.");
        }
    } catch (error) {
        console.error("Error generating activities:", error);
        throw new Error("Failed to communicate with the AI service.");
    }
}