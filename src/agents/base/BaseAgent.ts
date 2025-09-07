import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { AgentConfig, AgentResponse, AgentActivity } from '@/lib/types/agent';

export abstract class BaseAgent {
  protected llm: ChatOpenAI;
  protected config: AgentConfig;
  protected activities: AgentActivity[] = [];

  constructor(config: AgentConfig) {
    this.config = config;
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
      temperature: config.temperature,
      maxTokens: config.maxTokens,
    });
  }

  abstract execute(input: any): Promise<AgentResponse>;

  protected async callLLM(systemPrompt: string, userPrompt: string): Promise<string> {
    const startTime = Date.now();
    
    try {
      const messages = [
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ];

      const response = await this.llm.invoke(messages);
      const processingTime = Date.now() - startTime;

      this.logActivity(`LLM call completed in ${processingTime}ms`);
      
      return response.content.toString();
    } catch (error) {
      this.logActivity(`LLM call failed: ${error}`, 'error');
      throw error;
    }
  }

  protected logActivity(message: string, status: AgentActivity['status'] = 'completed') {
    const activity: AgentActivity = {
      id: `${Date.now()}_${Math.random()}`,
      agentName: this.config.name,
      action: message,
      timestamp: new Date(),
      status,
    };
    
    this.activities.push(activity);
    console.log(`[${this.config.name}] ${message}`);
    
    // In a real app, you'd emit this to a real-time feed
    // EventEmitter or WebSocket to update the UI
  }

  public getActivities(): AgentActivity[] {
    return [...this.activities];
  }

  public clearActivities() {
    this.activities = [];
  }
}
