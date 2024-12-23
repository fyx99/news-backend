# 🚀 **News Aggregator App Backend**

This repository contains the **Node.js backend** for the **NewsAggregator Project**. It serves curated news feeds from a **PostgreSQL database** to the frontend layer and collects various **user interaction metrics** such as:

- 🖱️ **Clicks**
- ⏱️ **View Time**
- 📊 **Other Engagement Data**

The collected interaction data is asynchronously sent back to the **PostgreSQL data backend** for further analysis and feature engineering.

The backend is fully **Dockerized** and deployed on the same VM as the rest of the project infrastructure.

---

## 🛠️ **Key Features**

 **Curated News Feed Delivery:** Fetches and serves news data efficiently.
 **User Interaction Tracking:** Tracks engagement metrics and pushes them to the backend asynchronously.

---

## 📡 **API Endpoints**

### 📊 **Track User Reading Interaction**
**POST /app/statistics/read**
```json
{
    "user_id": "74d06a24-ae32-4cf3-be20-a8d98be251b4",
    "article_id": "1573",
    "start_date": "Wed, 09 Feb 2022 22:16:40 GMT",
    "end_date": "Wed, 09 Feb 2022 22:16:40 GMT",
    "max_scroll": 1
}
```

### 📊 **Track User Impressions**
**POST /app/statistics/impression**
```json
{
    "user_id": "74d06a24-ae32-4cf3-be20-a8d98be251b4",
    "article_id": "1573",
    "start_date": "Wed, 09 Feb 2022 22:16:40 GMT",
    "end_date": "Wed, 09 Feb 2022 22:16:40 GMT",
    "rank": 1
}
```

### 📡 **Fetch News Feed**
**GET /app/feed?offset=100**
```json
{
    "name": "sample",
    "time": "Wed, 21 Oct 2015 18:27:50 GMT"
}
```
---

## 📦 **Getting Started**

### 🔧 **Build and Push Docker Image:**
```bash
docker build -t fxxy/news-backend . ; docker push fxxy/news-backend
```

### 🚀 **Run the Backend Locally:**
```bash
docker run --rm -p 3000:3000 fxxy/news-backend
```

### 🌐 **Deploy on VM:**
```bash
docker pull fxxy/news-backend && docker stop newsbackend || echo 'Container already stopped' && \
docker run --name newsbackend --rm -d --network=dropnetwork -p 3000:3000 --env-file /env/drop.env fxxy/news-backend
```

### 🧪 **Run on Alternate Port (e.g., for Testing):**
```bash
docker run --rm -p 3001:3001 fxxy/news-backend
```

### 📊 **Performance Testing with k6:**
```bash
cat test/load.js | docker run -i grafana/k6 run --vus 5 --iterations 1000 -
```

---

## 📚 **Environment Variables**
Ensure you have a properly configured `/env/drop.env` file with required environment variables, such as:
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

---

## 📈 **Monitoring & Logging**
- Monitor application logs using `docker logs newsbackend`
- Use tools like **Grafana** and **k6** for performance and load testing.

---
