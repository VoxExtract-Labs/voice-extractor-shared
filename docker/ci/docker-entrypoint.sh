#!/bin/bash
echo "Starting docker-entrypoint.sh"
ls -la /usr/bin/supervisord
echo "Starting supervisord..."
exec /usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
