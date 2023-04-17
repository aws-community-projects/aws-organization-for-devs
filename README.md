# aws-organization-for-devs
IaC to deploy and manage a best-practices developer ready AWS organization for building serverless projects on AWS.

Our organization was set up using [superwerker](https://superwerker.cloud/). You may also wish to check out [OrgFormation](https://github.com/org-formation/org-formation-cli).

![Organization Diagram](media/organization%20for%20developers.drawio.png)

# Accessing Accounts

All human access is managed using [AWS IAM Identity Center](https://aws.amazon.com/iam/identity-center/) (formerly AWS SSO). IAM Users **are prohibited!** AWS IAM Identity Centers offers both console and cli access through a [portal](https://communitybuilders.awsapps.com/start#/) for Community Builders who have access.

# CDK Developer Workflow

Developers have broad access in the **Sandbox OU**. Although use of IaC is preferred, developers will have write access to most resources, enabling them to make rapid changes, force events, and debug integrations. Once a stack is stable, it should be connected to a CI/CD pipeline to deploy to the **Test** and **Production** OUs. Example follows.

## Hosted Zones

There are environment-specific Hosted Zones available with wildcard certificates following the pattern of 
- *.sandbox.awscommunitybuilders.org
- *.test.awscommunitybuilders.org
- *.production.awscommunitybuilders.org

This makes it easy to delegate DNS to `myapp.<env>.awscommunitybuilders.org`. See the [example](https://github.com/aws-community-projects/cicd/blob/main/cdk/cicd.awscommunitybuilders.org-stack.ts#L82) for more information.

## Permissions Boundary

Use of the `developer-policy` [Permissions Boundary](https://aws.amazon.com/blogs/devops/secure-cdk-deployments-with-iam-permission-boundaries/) is required. It can be added to your [cdk.json](cdk.json#L50) file.

## CI/CD using GitHub Actions and OIDC

See the [example](https://github.com/aws-community-projects/cicd).

If you'd like to deploy using GitHub Actions and OIDC, it's as simple as [adding your aws-community-projects repo](./cdk/aws-organization-for-devs.ts#L32) to the stack with a pull request.

Special thanks to [aripalo](https://twitter.com/aripalo) for making this easy with [aws-cdk-github-oidc](https://github.com/aripalo/aws-cdk-github-oidc).

# Deploying CDK with Other Tools

Don't want to use Github Actions? Open an [issue](https://github.com/aws-community-projects/aws-organization-for-devs/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) and let's talk about it!

# What about SAM, Serverless, etc?

You want it? Let's discuss! Open an [issue](https://github.com/aws-community-projects/aws-organization-for-devs/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).
