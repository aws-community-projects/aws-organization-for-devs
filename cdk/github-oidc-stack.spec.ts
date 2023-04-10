import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { describe, expect, test } from 'vitest';

import { GithubOidcStack } from './github-oidc-stack';

describe('Entire Stack', () => {
  test('match a snapshot', () => {
    const app = new App();
    const stack = new GithubOidcStack(app, 'test-stack', {
      repos: ['repoone', 'repotwo'],
    });
    const template = Template.fromStack(stack);

    expect(template).toMatchSnapshot();
  });
});
