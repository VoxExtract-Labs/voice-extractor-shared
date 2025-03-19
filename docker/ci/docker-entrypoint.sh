#!/bin/bash
set -e
echo "Starting docker-entrypoint.sh"
ls -la /usr/bin/supervisord
echo "Starting supervisord..."
exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf || { echo "Supervisor failed to start!"; exit 1; }
