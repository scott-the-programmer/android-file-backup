# Droid Up

![CI](https://github.com/scott-the-programmer/droid-up/workflows/CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/ef0daf22a7e958c82ba6/maintainability)](https://codeclimate.com/github/scott-the-programmer/droid-up/maintainability)

Disclaimer - this is still currently a work in progress

A simple utility to back up an Android Device.

## Prerequisites

* [NodeJS](https://nodejs.org/en/download/) 
* [npm](https://www.npmjs.com/get-npm)
* An Android Device


## Install dependencies

Please run the following command to install the npm dependencies

```bash
npm install
```


## Run Unit Tests

Unit tests are located under the [./test](./test) folder. To execute them, run the following command

```bash
npm test
```

## Debugging 

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

## Run commands

To run the project as a command, please execute the following

### Create Backup

```bash
 ./bin/run create -s /path/to/copy/from -t /path/to/copy/to
```