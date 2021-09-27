import cdk = require("@aws-cdk/core")
import * as logs from "@aws-cdk/aws-logs";
import s3 = require("@aws-cdk/aws-s3");
import * as cloudtrail from "@aws-cdk/aws-cloudtrail";
import { BlockPublicAccess } from "@aws-cdk/aws-s3";



export class CloudComplianceCisBaselineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   const cisComplianceBucket = new s3.Bucket(this, "CisComplianceBuckety", {
     bucketName: cdk.PhysicalName.GENERATE_IF_NEEDED,
     blockPublicAccess: new s3.BlockPublicAccess({
       blockPublicAcls: true,
       blockPublicPolicy: true,
       ignorePublicAcls: true,
       restrictPublicBuckets: true
     })
   })

   const cisComplianceLogGroup = new logs.LogGroup(this, "CisComplianceLogGroup", {
     logGroupName: cdk.PhysicalName.GENERATE_IF_NEEDED,
     retention: logs.RetentionDays.ONE_YEAR
   })
   const cisComplianceCloudtrail = new cloudtrail.Trail(this, "CisComplianceCloudTrail", {
     bucket: cisComplianceBucket,
     cloudWatchLogGroup: cisComplianceLogGroup,
     cloudWatchLogsRetention: logs.RetentionDays.ONE_YEAR,
     enableFileValidation: true,
     isMultiRegionTrail: true,
     sendToCloudWatchLogs: true,
     trailName: "CisComplianceCloudTrail"
   })
  }
}
