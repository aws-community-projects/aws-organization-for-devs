import { App } from 'aws-cdk-lib';

import { DelegatedZoneStack } from './delegated-zone-stack';
import { HostedZoneStack } from './hosted-zone-stack';
import { GithubOidcStack } from './github-oidc-stack';

const app = new App();

const rootAccountId = '353228500194';

const accounts = [
  { accountId: '799776970420', name: 'sandbox' },
  { accountId: '012208286009', name: 'test' },
  { accountId: '865725118528', name: 'production' },
];

const rootStack = new HostedZoneStack(app, 'hosted-zone-stack', {
  env: { account: rootAccountId, region: 'us-east-1' },
});

const accountStacks = accounts.map(
  (account) =>
    new DelegatedZoneStack(app, `delegated-zone-stack-${account.name}`, {
      env: { account: account.accountId, region: 'us-east-1' },
      name: account.name,
      rootAccountId,
    }),
);

new GithubOidcStack(app, 'github-oidc-stack', {
  env: { account: '447002520154', region: 'eu-west-1' },
  repos: ['cicd'],
});

accountStacks.forEach((accountStack) => accountStack.addDependency(rootStack));
