#!/bin/bash

(cd backend && npm run dev) &

(cd frontend && npm run dev) &

(cd python && python -m app:app --host 0.0.0.0 --port 8000 --reload) &

wait
