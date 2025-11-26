export const entityExtractor = {
  extractDate(message: string): string | null {
    const dateRegex = /\b\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}\b/;
    const match = message.match(dateRegex);
    return match ? match[0] : null;
  },

  extractAmount(message: string): number | null {
    const amtRegex = /\b\d+(?:\.\d{1,2})?\b/;
    const match = message.match(amtRegex);
    return match ? parseFloat(match[0]) : null;
  },

  extractID(message: string): string | null {
    const idRegex = /\b\d{2,6}\b/;
    const match = message.match(idRegex);
    return match ? match[0] : null;
  },

  extractAgent(message: string): string | null {
    const agentRegex = /\b[A-Z][a-z]{2,20}\b/;
    const match = message.match(agentRegex);
    return match ? match[0] : null;
  },

  extractEmail(message: string): string | null {
    const emailRegex = /\b[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
    const match = message.match(emailRegex);
    return match ? match[0] : null;
  },

  extractFieldQuery(message: string): string | null {
    const msg = message.toLowerCase();
    if (msg.includes('what device') || msg.includes('device code')) return 'device';
    if (msg.includes('what status')) return 'status';
    if (msg.includes('what password') || msg.includes('password')) return 'password';
    if (msg.includes('what handler') || msg.includes('handler')) return 'handler';
    return null;
  }
};