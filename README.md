# 🔄 Machine ID Changer (49.x work)

## 📋 Description
This utility changes system identifiers for Cursor bypass:
1. Replaces telemetry in `~/.config/Cursor/User/globalStorage/storage.json`
2. Deletes and creates a new `/etc/machine-id` file
3. Generates random UUIDs for all identifiers

## 🛠️ Installation

```bash
npm install
```

## 🚀 Usage

Run with sudo (required for machine-id):

```bash
sudo npm start
```

Or directly:

```bash
sudo ts-node machine-id-changer.ts
```

## 🔧 What the script does
- Generates new UUIDs to replace Cursor telemetry
- Creates a random 32-character machine-id
- Outputs nice emoji logs to the console
- Handles errors if something goes wrong

## ⚠️ Warning
- Superuser privileges required for `/etc/machine-id`
- May affect some system programs
- Use at your own risk
- Recommended to backup before running

## 💻 Requirements
- Node.js 14+
- TypeScript
- Linux (tested on Fedora, might not work on Ubuntu)
