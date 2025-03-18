#!/bin/bash
set -e

# Create MySQL runtime directory if it doesn't exist
mkdir -p /run/mysqld
chown -R mysql:mysql /run/mysqld

# Start MariaDB using mysqld_safe with TCP binding
echo "Starting MariaDB..."
/usr/bin/mysqld_safe --bind-address=0.0.0.0 &

echo "Waiting for MariaDB to start..."
for i in {1..15}; do
  if mysqladmin ping --silent; then
    echo "MariaDB is ready!"
    break
  fi
  echo "Waiting for MariaDB ($i/15)..."
  sleep 2
done

echo "Setting root password to 'password'..."
mysqladmin -u root password "password"

echo "Creating database 'test_db' if it doesn't exist..."
echo "CREATE DATABASE IF NOT EXISTS test_db;" | mysql -u root --password=password

# Keep the process alive so that supervisord sees this service as running
tail -f /dev/null
