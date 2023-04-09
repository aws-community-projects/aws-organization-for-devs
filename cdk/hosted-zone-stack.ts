import { Stack, StackProps } from 'aws-cdk-lib';
import { OrganizationPrincipal, Role } from 'aws-cdk-lib/aws-iam';
import { PublicHostedZone } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

export class HostedZoneStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hostedZone = new PublicHostedZone(this, 'RootZone', {
      zoneName: 'awscommunitybuilders.org',
    });

    const role = new Role(this, 'RootZoneOrganizationRole', {
      assumedBy: new OrganizationPrincipal('o-vumqjghgoz'),
      roleName: 'HostedZoneDelegationRole',
    });

    hostedZone.grantDelegation(role);
  }
}
