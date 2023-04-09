import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { describe, expect, test } from 'vitest';

import { DelegatedZoneStack } from './delegated-zone-stack';

describe('Entire Stack', () => {
  test('match a snapshot', () => {
    const app = new App();
    const stack = new DelegatedZoneStack(app, 'test-stack');
    const template = Template.fromStack(stack);

    expect(template).toMatchSnapshot();
  });
});
