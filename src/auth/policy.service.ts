import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Policy } from './policy.enum';

@Injectable()
export class PolicyService {
  private policies: Map<Policy, (u: any, r: any) => boolean> = new Map();

  constructor() {
    this.registerPolicy<User>(Policy.RESOURCE_ID_MATCH, (u, r) => u.sub === r._id);
  }

  public get(policy: Policy) {
    return this.policies.get(policy);
  }

  private registerPolicy<T>(policy: Policy, action: (u: any, r: T) => boolean) {
    this.policies.set(policy, action);
  }
}
