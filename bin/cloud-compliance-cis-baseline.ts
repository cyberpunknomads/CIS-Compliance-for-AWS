#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CloudComplianceCisBaselineStack } from '../lib/cloud-compliance-cis-baseline-stack';

const app = new cdk.App();
new CloudComplianceCisBaselineStack(app, 'CloudComplianceCisBaselineStack', {

});
