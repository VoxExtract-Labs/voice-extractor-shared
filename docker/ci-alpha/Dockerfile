FROM debian:bullseye-slim

# 1. Install basic utilities, unzip, and supervisor
RUN apt-get update && \
    apt-get install -y curl wget unzip supervisor && \
    rm -rf /var/lib/apt/lists/*

# 2. Install MariaDB server and client
RUN apt-get update && \
    apt-get install -y mariadb-server mariadb-client && \
    rm -rf /var/lib/apt/lists/*

# 3. Install Redis server
RUN apt-get update && \
    apt-get install -y redis-server && \
    rm -rf /var/lib/apt/lists/*

# 4. Install ffmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# 5. Install build tools and dependencies for Python 3.11.6
RUN apt-get update && \
    apt-get install -y build-essential libssl-dev zlib1g-dev libncurses5-dev libncursesw5-dev \
                       libreadline-dev libsqlite3-dev libgdbm-dev libdb5.3-dev libbz2-dev \
                       libexpat1-dev liblzma-dev tk-dev uuid-dev libffi-dev && \
    rm -rf /var/lib/apt/lists/*

# 6. Build and install Python 3.11.6 from source
RUN wget https://www.python.org/ftp/python/3.11.6/Python-3.11.6.tgz && \
    tar xzf Python-3.11.6.tgz && \
    cd Python-3.11.6 && \
    ./configure --enable-optimizations && \
    make -j$(nproc) && \
    make altinstall && \
    cd .. && \
    rm -rf Python-3.11.6 Python-3.11.6.tgz
RUN ln -sf /usr/local/bin/python3.11 /usr/bin/python
RUN ln -sf /usr/local/bin/pip3.11 /usr/bin/pip

# 7. Install Bun (Bun installs to /root/.bun by default)
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# 8. Download and install Mailhog binary
RUN wget -O /usr/local/bin/mailhog https://github.com/mailhog/MailHog/releases/download/v1.0.1/MailHog_linux_amd64 && \
    chmod +x /usr/local/bin/mailhog

# 9. Download and install MinIO binary
RUN wget -O /usr/local/bin/minio https://dl.min.io/server/minio/release/linux-amd64/minio && \
    chmod +x /usr/local/bin/minio

# 10. Create directory for MinIO data (using a descriptive path)
RUN mkdir -p /minio/data

# 11. Copy Supervisor configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# 12. Copy the MySQL startup script
COPY start-mysql.sh /usr/local/bin/start-mysql.sh
RUN chmod +x /usr/local/bin/start-mysql.sh

# 13. Copy the container entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# 14. Set the working directory
WORKDIR /workspace

# 15. Copy the requirements.txt file and install dependencies
COPY requirements.txt /workspace/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /workspace/requirements.txt

# 16. Expose required ports:
#     MariaDB: 3306, Redis: 6379, Mailhog: 1025 & 8025,
#     MinIO: container API on 9000 (host mapping can be done externally) and Console on 9001.
EXPOSE 3306 6379 1025 8025 9000 9001

# 17. Use the entrypoint script to start supervisord.
CMD ["/usr/local/bin/docker-entrypoint.sh"]
