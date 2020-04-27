# Droid Up

[![CI](https://github.com/scott-the-programmer/droid-up/workflows/CI/badge.svg)](https://github.com/scott-the-programmer/droid-up/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/ef0daf22a7e958c82ba6/maintainability)](https://codeclimate.com/github/scott-the-programmer/droid-up/maintainability)

Disclaimer - this is still currently a work in progress

A simple utility to back up an Android Device. Currently, this is only supported on Linux. Windows and MacOS Support will come later


## Prerequisites

* [NodeJS](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm)
* An Android Device


## How to run

### Clone Repository and install dependenci9es

```bash
git clone https://github.com/scott-the-programmer/droid-up.git   
cd droid-up
npm install
```

### Run tool

```bash
./bin/run create --source "/path/to/android/device" --target "/path/to/save/backup/to"
```

#### Example

```console
./bin/run create --source "/run/user/1000/gvfs/mtp:host=SAMSUNG/Phone/DCIM/Camera" \
--target "/media/scott/USB/Storage/phone-backups"

Feeding the hamsters...
Initiating backup...
PROGRESS [████████████████████████████████████████] | 1095/1095
Backup complete!
Your backup can be found under /media/scott/USB/Storage/phone-backups/SAMSUNG-droid-up
```

## Developer Information

### Run Unit Tests

Unit tests are located under the [./test](./test) folder. To execute them, run the following command

```bash
npm test
```

### Debugging

I've added the necessary launch.json configurations to be able to debug locally with VSCode

Please modify the contents of this file to match what you want to debug against

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/bin/run",
            "args": [
                "create",
                "-s",
                "/path/to/copy/from",
                "-t",
                "/path/to/copy/to"
            ]
        }
    ]
}
```
