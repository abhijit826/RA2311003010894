# Stage 1

## REST APIs

### GET /notifications
Fetch user notifications

Query:
- userId
- type
- isRead
- page
- limit

Response:
{
  "notifications": [
    {
      "id": "123",
      "type": "Placement",
      "message": "Selected",
      "timestamp": "2026-05-02",
      "isRead": false
    }
  ]
}



### POST /notifications
Create notification


### POST /notifications/read
Mark notification as read

## Headers
Authorization: Bearer token



## Real-time
Use WebSocket / SSE




# Stage 2

## DB 
MongoDB 

## Schema
{
  _id,
  userId,
  type,
  message,
  isRead,
  createdAt
}

## Problems
- Large data → slow queries

## Fix
- Index (userId, isRead)
- Pagination


# Stage 3

## Problem
No index → full scan

## Fix
CREATE INDEX idx_notifications 
ON notifications(studentID, isRead, createdAt DESC);

## Query
SELECT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL 7 DAY;


# Stage 4

## Solutions
- Redis caching
- Pagination
- Lazy loading
- WebSocket instead of polling

# Stage 5

## Problem
- Synchronous calls
- Failure breaks system

## Fix
Use queue (Kafka / RabbitMQ)

## New Flow
- Push jobs to queue
- Worker sends emails
- Retry failed jobs


# Stage 6

## Approach
- Fetch notifications from API
- Sort by priority:
  Placement > Result > Event
- Sort by timestamp
- Return top 10

## Optimization
- Use heap (priority queue)
- Keep only top 10 in memory