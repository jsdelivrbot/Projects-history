#!/bin/bash

echo "Upgrading system.."
apt-get update
apt-get upgrade -y

echo "Installing build tools.."
apt-get install -y build-essential curl software-properties-common htop

echo "Installing Node"
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs

echo "Creating a systemd unit file for the dev-server.."
cat > /etc/systemd/system/domaweb-react.service <<EOL
[Service]
ExecStartPre=/usr/bin/sudo -u vagrant /usr/bin/npm --prefix /vagrant install
ExecStart=/usr/bin/npm --prefix /vagrant run dev-domaweb
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=domaweb-react
User=root

[Install]
WantedBy=multi-user.target
EOL

systemctl daemon-reload
