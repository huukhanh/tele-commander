#!/bin/bash

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root"
    exit 1
fi

# Get username from first argument or current user
USERNAME=${1:-$SUDO_USER}
if [ -z "$USERNAME" ]; then
    echo "Cannot determine user"
    exit 1
fi

# Setup paths
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SERVICE_NAME="tele-commander@${USERNAME}.service"

# Copy service file
cp "${SCRIPT_DIR}/tele-commander.service" "/etc/systemd/system/${SERVICE_NAME}"
sed -i "s|%PROJECT_DIR%|${PROJECT_DIR}|g" "/etc/systemd/system/${SERVICE_NAME}"

# Set proper permissions
chown -R ${USERNAME}:${USERNAME} "${PROJECT_DIR}"

# Reload systemd
systemctl daemon-reload

echo "Service installed as ${SERVICE_NAME}"
echo "To start: systemctl start ${SERVICE_NAME}"
echo "To enable on boot: systemctl enable ${SERVICE_NAME}"
