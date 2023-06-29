# ConfigRules

## RequiredTags StackSet

```bash
% aws cloudformation create-stack-set --stack-set-name required-tags --template-body file://./StackSets/RequiredTags.yml --region eu-west-1 --tags Key=acb:cost-allocation:env,Value=org Key=acb:cost-allocation:owner,Value=elthrasher@gmail.com Key=acb:cost-allocation:provider,Value=CloudFormation Key=acb:cost-allocation:service,Value=organization --permission-model SERVICE_MANAGED --auto-deployment Enabled=true,RetainStacksOnAccountRemoval=false
```

```bash
% aws cloudformation create-stack-instances --stack-set-name required-tags --deployment-targets OrganizationalUnitIds=ou-o1po-8t2jlg7y,ou-o1po-nc0nerid,ou-o1po-ei9sq3nv,ou-o1po-gc7tz6ee --regions eu-west-1 us-east-1 us-west-2
```

## PermissionsBoundary StackSet

```bash
% aws cloudformation create-stack-set --stack-set-name permissions-boundary --template-body file://./StackSets/PermissionsBoundary.yml --region eu-west-1 --tags Key=acb:cost-allocation:env,Value=org Key=acb:cost-allocation:owner,Value=elthrasher@gmail.com Key=acb:cost-allocation:provider,Value=CloudFormation Key=acb:cost-allocation:service,Value=organization --permission-model SERVICE_MANAGED --auto-deployment Enabled=true,RetainStacksOnAccountRemoval=false --capabilities CAPABILITY_NAMED_IAM
```

```bash
% aws cloudformation create-stack-instances --stack-set-name permissions-boundary --deployment-targets OrganizationalUnitIds=ou-o1po-8t2jlg7y,ou-o1po-nc0nerid,ou-o1po-ei9sq3nv,ou-o1po-gc7tz6ee --regions eu-west-1
```

```bash
aws cloudformation create-stack --stack-name permissions-boundary --template-body file://./StackSets/PermissionsBoundary.yml --region eu-west-1 --tags Key=acb:cost-allocation:env,Value=org Key=acb:cost-allocation:owner,Value=elthrasher@gmail.com Key=acb:cost-allocation:provider,Value=CloudFormation Key=acb:cost-allocation:service,Value=organization --capabilities CAPABILITY_NAMED_IAM
```

## CDK Bootstrap StackSet

```bash
% aws cloudformation create-stack-set --stack-set-name cdk-bootstrap --template-body file://./StackSets/CdkBootstrap.yml --region eu-west-1 --tags Key=acb:cost-allocation:env,Value=org Key=acb:cost-allocation:owner,Value=elthrasher@gmail.com Key=acb:cost-allocation:provider,Value=CloudFormation Key=acb:cost-allocation:service,Value=organization --permission-model SERVICE_MANAGED --auto-deployment Enabled=true,RetainStacksOnAccountRemoval=false --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=InputPermissionsBoundary,ParameterValue=developer-policy ParameterKey=TrustedAccounts,ParameterValue=447002520154 ParameterKey=CloudFormationExecutionPolicies,ParameterValue=arn:aws:iam::aws:policy/AdministratorAccess
```

```bash
% aws cloudformation create-stack-instances --stack-set-name cdk-bootstrap --deployment-targets OrganizationalUnitIds=ou-o1po-8t2jlg7y,ou-o1po-nc0nerid,ou-o1po-ei9sq3nv,ou-o1po-gc7tz6ee --regions eu-west-1 us-east-1 us-west-2
```

```bash
% aws cloudformation create-stack --stack-name cdk-bootstrap --template-body file://./StackSets/CdkBootstrap.yml --region eu-west-1 --tags Key=acb:cost-allocation:env,Value=org Key=acb:cost-allocation:owner,Value=elthrasher@gmail.com Key=acb:cost-allocation:provider,Value=CloudFormation Key=acb:cost-allocation:service,Value=organization --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=InputPermissionsBoundary,ParameterValue=developer-policy ParameterKey=TrustedAccounts,ParameterValue=447002520154 ParameterKey=CloudFormationExecutionPolicies,ParameterValue=arn:aws:iam::aws:policy/AdministratorAccess
```

```bash
% aws cloudformation create-stack --stack-name cdk-bootstrap --template-body file://./StackSets/CdkBootstrap.yml --region us-east-1 --tags Key=acb:cost-allocation:env,Value=org Key=acb:cost-allocation:owner,Value=elthrasher@gmail.com Key=acb:cost-allocation:provider,Value=CloudFormation Key=acb:cost-allocation:service,Value=organization --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=InputPermissionsBoundary,ParameterValue=developer-policy ParameterKey=TrustedAccounts,ParameterValue=447002520154 ParameterKey=CloudFormationExecutionPolicies,ParameterValue=arn:aws:iam::aws:policy/AdministratorAccess
```
