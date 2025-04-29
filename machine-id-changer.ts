#!/usr/bin/env ts-node

import * as fs from 'fs';
import { execSync } from 'child_process';
import * as crypto from 'crypto';
import * as os from 'os';
import * as path from 'path';


function generateRandomId(length: number = 8): string {
  return crypto.randomBytes(length).toString('hex');
}


function generateUUID(): string {
  return [
    generateRandomId(4),
    generateRandomId(2),
    generateRandomId(2),
    generateRandomId(2),
    generateRandomId(6)
  ].join('-');
}


function updateTelemetryFile(): void {
  const homeDir = os.homedir();
  const storageFilePath = path.join(homeDir, '.config/Cursor/User/globalStorage/storage.json');

  try {

    if (!fs.existsSync(storageFilePath)) {
      console.error(`❌ File ${storageFilePath} not found`);
      return;
    }


    const ui = generateUUID();
    const ui1 = generateRandomId(8);
    const ui2 = generateUUID();
    const ui3 = generateRandomId(8);
    const ui4 = generateUUID();


    const newContent = `{
  "telemetry.machineId": "${ui}",
  "${ui1}": "${ui2}",
  "${ui3}": "${ui4}"
}`;


    fs.writeFileSync(storageFilePath, newContent);
    console.log(`✅ File ${storageFilePath} updated successfully`);
  } catch (error) {
    console.error(`❌ Error updating telemetry file: ${error}`);
  }
}


function updateMachineId(): void {
  try {
    const machineIdPath = '/etc/machine-id';


    console.log('🗑️ Deleting machine-id file...');
    execSync(`sudo rm -f ${machineIdPath}`);


    const newMachineId = generateRandomId(16);


    console.log('🔧 Creating new machine-id...');
    execSync(`echo "${newMachineId}" | sudo tee ${machineIdPath}`);

    console.log(`✅ File ${machineIdPath} updated successfully with a new identifier`);
  } catch (error) {
    console.error(`❌ Error updating machine-id: ${error}`);
    console.error('Superuser privileges might be required');
  }
}


function main(): void {
  console.log('🚀 Starting identifier change program...');
  console.log(`👤 User: ${os.userInfo().username}`);


  updateTelemetryFile();


  updateMachineId();

  console.log('✨ All operations completed successfully!');
}


main();