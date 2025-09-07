import { OpenAI } from '@langchain/openai';

export abstract class BaseAgent {
  protected llm: OpenAI;
  protected agentName: string;

  constructor(agentName: string) {
    this.agentName = agentName;
    this.llm = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.3,
    });
  }

  abstract execute(input: any): Promise<any>;
  
  protected logActivity(message: string) {
    console.log(`[${this.agentName}] ${message}`);
    // TODO: Implement real-time activity feed
  }
}
