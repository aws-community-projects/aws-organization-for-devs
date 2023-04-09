# CDK Stacks

## Hosted Zone Stack

Creates the root hosted zone for awscommunitybuilders.org and a delegation role that will allow stacks in other accounts to create subdomains.

## Delegated Zone Stack

Creates an environment-specific subdomain and a wildcard certificate for that subdomain. The certificate arn is stored in Secrets Manager (and not Parameter Store because of region replication) so that other stacks can apply the arn to Cloudfront Distributions.
