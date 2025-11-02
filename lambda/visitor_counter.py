import boto3
def saveValue(visitors, dynamodb=None):
    if not dynamodb:
        dynamodb =boto3.resource('dynamodb')
    table = dynamodb.Table('visitor-count')
    table.put_item(Item=visitors)