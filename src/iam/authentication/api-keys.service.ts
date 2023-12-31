import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { HashingService } from '../hashing/hashing.service';

export interface GeneratedApiKeyPayload {
  apiKey: string;
  hashedApiKey: string;
}

@Injectable()
export class ApiKeysService {
  constructor(private readonly hashingService: HashingService) {}

  async createAndHash(id: number): Promise<GeneratedApiKeyPayload> {
    const apiKey = this.generateApiKey(id);
    const hashedApiKey = await this.hashingService.hash(apiKey);

    return { apiKey, hashedApiKey };
  }

  async validate(apiKey: string, hashedApiKey: string): Promise<boolean> {
    return this.hashingService.compare(apiKey, hashedApiKey);
  }

  extractIdFromApiKey(apiKey: string): string {
    const [id] = Buffer.from(apiKey, 'base64').toString('ascii').split(' ');

    return id;
  }

  private generateApiKey(id: number): string {
    const apiKey = `${id} ${randomUUID()}`;

    return Buffer.from(apiKey).toString('base64');
  }
}