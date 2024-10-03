## Node Js Backend template For \*Scalable Job Management

- This is a Backend part of full-stack Job-Queue management app
- To check the Frontend code please refer: https://github.com/Abhishek765/job-mangement-fe

### Time Frame

- Project setup, approach thinking, api routings, Logical handlings (utils), third party libraries integrations -> `6-7 hrs`

  - Approach thinking + feasibility checks
  - Handling Post creation logic (To give user a better non-blocking experience)
  - Unsplash Integration + fetching relevant information, utilities creation

- Reading all jobs + reading jobs by ID API routes + Fixing all error handling cases `~2 hrs`

## - **Handling high load concurrency issues: (TBD)**
  - Potential issues need to tackle at scale
    - Memory and resource limits: Lots of pending requests can block the server if it reaches the limit
    - Loss of pending jobs on server restart
  - Hint: BullMQ
    - This will help to persist jobs in a redis-backed queue and process them asynchronously, even across server restarts

---

## Setup Process:

- Clone the repo
- create a `.env.development` file under `envs` folder and copy paste the contents from `.env.sample` file into it

- We're using unsplash apis for fetching the photos dataset

  - check the [developers docs](https://unsplash.com/documentation), create a new app and get the `access_key`
  - to check the code sample utilized within the application please refer: https://github.com/Abhishek765/Job-Management-BE/blob/e9c0497734082454f8c7d14b8efedee4b59df113/src/service/unsplash.ts

- Install dependencies

```bash
  yarn
```

- run the development server:

```bash
  yarn dev
```

- Server url: http://localhost:3000

---

## API documentation

- `POST` create-job

  - `http://localhost:8000/api/v1/jobs`
  - Response object:
    ```json
    {
      "success": true,
      "statusCode": 200,
      "request": {
        "ip": "::1",
        "method": "POST",
        "url": "/api/v1/jobs"
      },
      "message": "SUCCESS",
      "data": {
        "jobId": "10-1727970601751"
      }
    }
    ```

- `GET` get-all-jobs

  - `http://localhost:8000/api/v1/jobs`
  - Response object:
    ```json
    {
      "success": true,
      "statusCode": 200,
      "request": {
        "ip": "::1",
        "method": "GET",
        "url": "/api/v1/jobs"
      },
      "message": "SUCCESS",
      "data": {
        "jobs": [
          {
            "id": "1-1727964710996",
            "status": "resolved",
            "result": [
              "https://images.unsplash.com/photo-1441122365457-1ae2aba6235c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjA0NjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc5NjQ3MTZ8&ixlib=rb-4.0.3&q=80&w=400"
            ]
          },
          {
            "id": "2-1727964711817",
            "status": "pending"
          }
        ]
      }
    }
    ```

- `GET` get-job-by-id
  - `http://localhost:8000/api/v1/jobs/:id`
  - for instance: `http://localhost:8000/api/v1/jobs/18-1727948859133`
  - Response object:
    ```json
    {
      "success": true,
      "statusCode": 200,
      "request": {
        "ip": "::1",
        "method": "GET",
        "url": "/api/v1/jobs/18-1727948859133"
      },
      "message": "SUCCESS",
      "data": {
        "id": "18-1727948859133",
        "status": "resolved",
        "result": [
          "https://images.unsplash.com/photo-1455731657401-43502b7c1ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjA0NjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc5NDg4NzR8&ixlib=rb-4.0.3&q=80&w=400",
          "https://images.unsplash.com/photo-1444731961956-751ed90465a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjA0NjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc5NDg4NzR8&ixlib=rb-4.0.3&q=80&w=400",
          "https://images.unsplash.com/photo-1502825751399-28baa9b81efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjA0NjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc5NDg4NzR8&ixlib=rb-4.0.3&q=80&w=400",
          "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjA0NjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc5NDg4NzR8&ixlib=rb-4.0.3&q=80&w=400",
          "https://images.unsplash.com/photo-1447624799968-c704f86dc931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjA0NjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc5NDg4NzR8&ixlib=rb-4.0.3&q=80&w=400"
        ]
      }
    }
    ```
