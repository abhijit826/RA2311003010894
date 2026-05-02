import requests

url = "http://20.207.122.201/evaluation-service/auth"

data = {
    "email": "ar2884@srmist.edu.in",
    "name": "Abhijit Ranjan",
    "rollNo": "RA2311003010894",
    "accessCode": "QkbpxH",
    "clientID": "0b6a1f8e-2fad-4d66-b076-4b608cb5fbc3",
    "clientSecret": "eXbXhFrZxYavbnpq"
}

response = requests.post(url, json=data)
print(response.json())