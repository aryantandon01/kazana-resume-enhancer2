export interface AgentConfig {
  name: string;
  role: string;
  temperature: number;
  maxTokens: number;
}

export interface AgentResponse {
  agentId: string;
  success: boolean;
  data?: any;
  error?: string;
  processingTime: number;
  confidence?: number;
}

export interface AgentActivity {
  id: string;
  agentName: string;
  action: string;
  timestamp: Date;
  status: 'started' | 'processing' | 'completed' | 'error';
  details?: string;
}
