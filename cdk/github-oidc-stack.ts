import { GithubActionsIdentityProvider, GithubActionsRole } from 'aws-cdk-github-oidc';
import { Stack, StackProps } from 'aws-cdk-lib';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

interface GithubOidcStackProps extends StackProps {
  repos: string[];
}

export class GithubOidcStack extends Stack {
  constructor(scope: Construct, id: string, props: GithubOidcStackProps) {
    super(scope, id, props);

    const { repos } = props;

    const provider = new GithubActionsIdentityProvider(this, 'GithubProvider');

    const permissionsBoundary = ManagedPolicy.fromManagedPolicyName(this, 'PermissionsBoundary', 'developer-policy');

    repos.forEach(
      (repo) =>
        new GithubActionsRole(this, `DeployRole-${repo}`, {
          managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
          owner: 'aws-community-projects',
          permissionsBoundary,
          provider,
          repo,
          roleName: `github-deploy-role-${repo}`,
        }),
    );
  }
}
