import requests

url = "http://20.207.122.201/evaluation-service/register"

data = {
    "email": "ar2884@srmist.edu.in",
    "name": "Abhijit Ranjan",
    "mobileNo": "9199778555",
    "githubUsername": "abhijit826",
    "rollNo": "RA2311003010894",
    "accessCode": "QkbpxH"
}

response = requests.post(url, json=data)
print(response.json())