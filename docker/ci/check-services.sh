#!/bin/bash

echo "Checking installed versions..."
echo -n "Bun: " && bun --version
echo -n "Python: " && python --version

echo "Checking Supervisor status..."
supervisorctl status || echo "Supervisor is not running or misconfigured."

echo "Checking MariaDB..."
if mysqladmin ping -h 127.0.0.1 -P 3306 --user=root --password=password --silent; then
  echo "MariaDB is running."
else
  echo "❌ MariaDB is NOT running!"
fi

echo "Checking Redis..."
if redis-cli ping | grep -q PONG; then
  echo "Redis is running."
else
  echo "❌ Redis is NOT running!"
fi

echo "Checking MinIO..."
if curl -f http://127.0.0.1:9000/minio/health/live; then
  echo "MinIO is running."
else
  echo "❌ MinIO is NOT running!"
fi
