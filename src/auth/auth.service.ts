import { ForbiddenException, Injectable } from '@nestjs/common';
import { Policy } from './policy.enum';
import { PolicyService } from './policy.service';

@Injectable()
export class AuthService {
  constructor(private policyService: PolicyService) {}

  public authorize<T>(user: any, resource: T, policy: Policy) {
    const action = this.policyService.get(policy);
    if (!action) throw new Error('Invalid policy!');

    const authorizationResult = action(user, resource);
    if (!authorizationResult) throw new ForbiddenException('Resource is forbidden!');
  }
}
