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
