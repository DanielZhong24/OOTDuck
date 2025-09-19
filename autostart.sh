#!/bin/bash
trap "echo 'Stopping servers...'; kill 0; exit" SIGINT

(cd backend && npm run dev) &

(cd frontend && npm run dev) &

(cd python && python3 -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload) &

wait
