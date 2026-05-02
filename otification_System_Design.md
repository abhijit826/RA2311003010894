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