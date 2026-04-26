
import { GoogleGenAI, Type } from "@google/genai";
import { FieldDefinition } from "../types";

// Initialize the Gemini API with the environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Use the recommended model for basic text and structured tasks
const MODEL_NAME = "gemini-3-flash-preview";

const FIELD_DEFINITION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    fields: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          type: { type: Type.STRING, description: "One of: text, number, date, dropdown, file, boolean, email, phone" },
          required: { type: Type.BOOLEAN },
          options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Only for dropdown type" }
        },
        required: ["name", "type", "required"]
      }
    }
  },
  required: ["fields"]
};

/**
 * Suggests fields for the master database using Gemini AI.
 */
export async function suggestMasterFields(businessType: string): Promise<Partial<FieldDefinition>[]> {
  const prompt = `You are an expert HR and Operations consultant.
  Suggest a comprehensive list of master data fields for a company in the "${businessType}" industry.
  Include standard HR fields (Name, IBAN, Labor ID) and industry-specific fields.
  For each field, specify if it's required and its most suitable data type (text, number, date, dropdown, file, boolean, email, phone).
  If it's a dropdown, suggest a few initial options.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: FIELD_DEFINITION_SCHEMA as any
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    const result = JSON.parse(response.text);
    return result.fields || [];
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Return basic fallback if AI fails
    return [
      { name: 'Full Name', type: 'text', required: true },
      { name: 'Employee ID', type: 'text', required: true },
      { name: 'Joining Date', type: 'date', required: true }
    ];
  }
}

/**
 * Suggests missing fields based on current setup.
 */
export async function suggestMissingFields(currentFields: FieldDefinition[], businessType: string): Promise<string[]> {
  const currentFieldNames = currentFields.map(f => f.name).join(", ");
  const prompt = `The company is in the "${businessType}" industry.
  Current fields: ${currentFieldNames}.
  Suggest 3-5 important missing fields that should be added for better HR, WPS, or Compliance tracking.
  Return only a list of field names.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ parts: [{ text: prompt }] }]
    });

    return (response.text || "").split("\n").map(s => s.replace(/^\d+\.\s*/, "").trim()).filter(Boolean);
  } catch (error) {
    console.error("AI Suggestion Error:", error);
    return [];
  }
}

/**
 * Performs a simple test of the AI connection.
 */
export async function testAIConnection(): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: "Say 'AI Connection Successful' if you can hear me."
    });
    return response.text || "No response text";
  } catch (error) {
    return `AI Test Failed: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Auto-maps uploaded headers to system fields.
 */
export async function autoMapColumns(headers: string[], fields: FieldDefinition[]): Promise<Record<string, string>> {
  const fieldNames = fields.map(f => f.name).join(", ");
  const headerStrings = headers.join(", ");
  
  const prompt = `Automapping Task:
  Headers from uploaded file: ${headerStrings}
  System fields: ${fieldNames}
  
  Match each uploaded header to the closest system field. 
  Return a JSON object where key is the uploaded header and value is the system field name.
  If no good match, return null for that header.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Mapping Error:", error);
    return {};
  }
}
