import { CfnOutput, Fn, RemovalPolicy, SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { Role } from 'aws-cdk-lib/aws-iam';
import { CrossAccountZoneDelegationRecord, PublicHostedZone } from 'aws-cdk-lib/aws-route53';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

interface DelegatedZoneStackProps extends StackProps {
  name: string;
  rootAccountId: string;
}

export class DelegatedZoneStack extends Stack {
  constructor(scope: Construct, id: string, props: DelegatedZoneStackProps) {
    super(scope, id, props);

    const { name, rootAccountId } = props;

    const domainName = `${name}.awscommunitybuilders.org`;

    const delegatedZone = new PublicHostedZone(this, 'delegatedZone', {
      zoneName: domainName,
    });

    const delegationRoleArn = Stack.of(this).formatArn({
      account: rootAccountId,
      region: '',
      resource: 'role',
      resourceName: 'HostedZoneDelegationRole',
      service: 'iam',
    });
    const delegationRole = Role.fromRoleArn(this, 'DelegationRole', delegationRoleArn);

    new CrossAccountZoneDelegationRecord(this, 'DelegationRecord', {
      delegationRole,
      delegatedZone,
      parentHostedZoneName: 'awscommunitybuilders.org',
    });

    const certificate = new Certificate(this, 'DelegatedZoneCert', {
      domainName: `*.${domainName}`,
      validation: CertificateValidation.fromDns(delegatedZone),
    });

    new Secret(this, 'AccountCerteArn', {
      removalPolicy: RemovalPolicy.DESTROY,
      replicaRegions: [{ region: 'eu-west-1' }],
      secretName: '/account/certificateArn',
      secretStringValue: SecretValue.unsafePlainText(certificate.certificateArn),
    });

    new CfnOutput(this, 'nameservers', {
      description: 'nameservers',
      value: Fn.join(', ', delegatedZone.hostedZoneNameServers!),
    });

    new CfnOutput(this, 'certArn', {
      description: 'certificate arn',
      value: certificate.certificateArn,
    });
  }
}
