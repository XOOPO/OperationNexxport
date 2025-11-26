export interface ConversationState {
  step: string;
  data: Record<string, any>;
  timestamp: number;
}

class ConversationStateManager {
  private states: Map<string, ConversationState> = new Map();
  private readonly TIMEOUT = 5 * 60 * 1000; // 5 minutes

  setState(userId: string, step: string, data: Record<string, any> = {}) {
    this.states.set(userId, {
      step,
      data,
      timestamp: Date.now()
    });
  }

  getState(userId: string): ConversationState | null {
    const state = this.states.get(userId);
    if (!state) return null;

    // Check if state has expired
    if (Date.now() - state.timestamp > this.TIMEOUT) {
      this.clearState(userId);
      return null;
    }

    return state;
  }

  updateData(userId: string, data: Record<string, any>) {
    const state = this.getState(userId);
    if (state) {
      this.states.set(userId, {
        ...state,
        data: { ...state.data, ...data },
        timestamp: Date.now()
      });
    }
  }

  clearState(userId: string) {
    this.states.delete(userId);
  }

  isInFlow(userId: string): boolean {
    return this.getState(userId) !== null;
  }
}

export const conversationStateManager = new ConversationStateManager();