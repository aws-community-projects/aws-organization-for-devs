import { App, Tags } from 'aws-cdk-lib';
import { DelegatedZoneStack } from './delegated-zone-stack';
import { HostedZoneStack } from './hosted-zone-stack';

const app = new App();

new HostedZoneStack(app, 'hosted-zone-stack', {
  env: { account: '353228500194', region: 'eu-west-1' },
});

new DelegatedZoneStack(app, 'delegated-zone-stack', {
  env: { account: '799776970420', region: 'us-east-1' },
});
