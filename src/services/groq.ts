import Groq from 'groq-sdk';
import { hasGroqKey, env } from '@/config/env';
import type { GateData, ZoneData } from '@/services/crowdSimulator';

export interface CrowdDataPoint {
  id?: string;
  zone?: string;
  count?: number;
  capacity?: number;
  density?: string | number;
  timestamp?: string;
}

const MODEL_NAME = 'llama3-8b-8192';

/** Lazily create and cache a single Groq client to avoid re-instantiation on every call. */
let _groqClient: Groq | null = null;
function getGroqClient(): Groq {
  if (!_groqClient) {
    _groqClient = new Groq({ apiKey: env.VITE_GROQ_API_KEY!, dangerouslyAllowBrowser: true });
  }
  return _groqClient;
}

export interface ChatSession {
  sendMessage: (message: string) => Promise<{ response: { text: () => string } }>;
}

export function createChatSession(systemContext: string): ChatSession | null {
  if (!hasGroqKey() || !env.VITE_GROQ_API_KEY) {
    console.warn('Groq API key is not configured.');
    return null;
  }

  const groq = getGroqClient();
  
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemContext }
  ];

  return {
    sendMessage: async (message: string) => {
      messages.push({ role: 'user', content: message });
      try {
        const response = await groq.chat.completions.create({
          messages: messages,
          model: MODEL_NAME,
        });
        
        const responseContent = response.choices[0]?.message?.content || '';
        messages.push({ role: 'assistant', content: responseContent });
        
        return {
          response: {
            text: () => responseContent,
          },
        };
      } catch (error) {
        console.error('Groq chat error:', error);
        throw error;
      }
    }
  };
}

export async function generateOperationalSummary(crowdData: CrowdDataPoint[]): Promise<string> {
  if (!hasGroqKey() || !env.VITE_GROQ_API_KEY) {
    return 'Groq service is unavailable. Please check your API key configuration.';
  }

  try {
    const groq = getGroqClient();
    // Human-readable prompt instead of JSON dump for clarity and token savings
    const dataLines = crowdData
      .map((d) => `Zone "${d.zone ?? d.id}": density ${d.density ?? 'unknown'}, count ${d.count ?? 'unknown'}/${d.capacity ?? 'unknown'}`)
      .join('\n');
    const prompt = `You are an operational AI for a FIFA World Cup 2026 venue. Summarise the following crowd data for stadium organizers. Highlight any critical zones with high density and provide 2-3 specific operational recommendations.\n\n${dataLines}`;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL_NAME,
    });
    
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Failed to generate operational summary:', error);
    return 'Error generating operational summary. Please try again later.';
  }
}

export function isAvailable(): boolean {
  return hasGroqKey();
}

export async function generateFanRecommendations(
  gatesData: GateData[],
  zonesData: ZoneData[]
): Promise<Array<{ id: string; title: string; time: string; body: string; severity: "info" | "warning" | "critical" }>> {
  if (!hasGroqKey() || !env.VITE_GROQ_API_KEY) {
    return [
      { id: '1', title: 'Head to Gate A', time: 'Just now', body: 'Traffic is light. Perfect time to enter.', severity: "info" }
    ];
  }

  try {
    const groq = getGroqClient();

    // Token-efficient human-readable prompt context
    const gateSummary = gatesData.map((g) => `${g.name}: ${g.waitTime} min wait (${g.status})`).join(', ');
    const zoneSummary = zonesData.map((z) => `${z.name}: ${z.density}% density (${z.status})`).join(', ');
    const prompt = `Gates: ${gateSummary}. Zones: ${zoneSummary}.`;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a real-time stadium assistant for fans at the FIFA World Cup 2026. Given live crowd data, respond with exactly 2 short JSON recommendations. Output only valid JSON array: [{ "id": "1", "title": string, "time": "Just now", "body": string, "severity": "info" | "warning" | "critical" }]. No explanation, no markdown.'
        },
        { role: 'user', content: prompt }
      ],
      model: MODEL_NAME,
    });
    
    const text = response.choices[0]?.message?.content || '[]';
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseErr) {
      console.error('Failed to parse AI recommendations JSON:', parseErr);
    }
    return [];
  } catch (error) {
    console.error('Failed to generate fan recommendations:', error);
    return [];
  }
}
