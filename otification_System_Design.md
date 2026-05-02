# Stage 1: Notification System Design

## Overview
Design a notification system for students to receive real-time updates for placements, events, and results.

## API Endpoints

### 1. Get Notifications
GET /notifications

Query Params:
- userId
- type (placement/event/result)
- isRead (true/false)
- page
- limit

Response:
{
  "notifications": [
    {
      "id": "123",
      "type": "placement",
      "message": "You are shortlisted",
      "timestamp": "2026-05-02T10:00:00Z",
      "isRead": false
    }
  ]
}

---

### 2. Create Notification
POST /notifications

Request:
{
  "userId": "456",
  "type": "event",
  "message": "New event scheduled"
}

---

### 3. Mark as Read
POST /notifications/read

Request:
{
  "notificationId": "123"
}

---

## Headers
- Authorization: Bearer token
- Content-Type: application/json

---

## Real-time Mechanism
- Use WebSockets or Server-Sent Events (SSE)
- Push notifications instantly to users



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

## Problems in Current Implementation

1. Synchronous execution:
   - Each operation runs sequentially → very slow for 50,000 users

2. Failure handling issue:
   - If `send_email` fails midway (like 200 users), system stops
   - No retry mechanism → data inconsistency

3. Tight coupling:
   - Email, DB, and push notification are executed together
   - One failure affects all

4. Not scalable:
   - Cannot handle large traffic (50k users)



## Should DB save and Email sending happen together?

 NO

Reason:
- Email is external (can fail, slow)
- DB should be reliable and fast
- Decouple both operations



## Improved Design

Use asynchronous architecture with message queue

Flow:
1. Save notification to DB
2. Push job to queue (Kafka / RabbitMQ)
3. Workers process:
   - Send email
   - Send push notification
4. Retry failed jobs

---

## Revised Pseudocode

function notify_all(student_ids, message):

    for student_id in student_ids:
        save_to_db(student_id, message)

        enqueue_job({
            "student_id": student_id,
            "message": message
        })


# Worker process
function worker():

    while true:
        job = get_next_job()

        try:
            send_email(job.student_id, job.message)
            push_to_app(job.student_id, job.message)

        except:
            retry_job(job)





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