import json
import os
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])


def handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "POST")

    if method == "GET":
        response = table.get_item(Key={"id": "visitors"})
        count = int(response.get("Item", {}).get("visitor_count", 0))
    else:
        response = table.update_item(
            Key={"id": "visitors"},
            UpdateExpression="ADD visitor_count :inc",
            ExpressionAttributeValues={":inc": 1},
            ReturnValues="UPDATED_NEW",
        )
        count = int(response["Attributes"]["visitor_count"])

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"visitor_count": count}),
    }
