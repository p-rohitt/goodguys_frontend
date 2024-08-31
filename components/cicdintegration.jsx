"use client"

import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import CodeBlock from './ui/codeblock';
import { ArrowRight } from 'lucide-react';
import {useRouter} from "next/navigation"
export function CICDIntegration() {
  const [selectedTool, setSelectedTool] = useState("github");

  const yamlConfigs = {
    github: `
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Build
      run: # Existing build steps
+   - name: post_build
+     run: |
+       curl -X POST https://your-proxy-server.com/api/post-build -H "Content-Type: application/json" -d '{"buildId": "$/{{ github.run_id }}", "project": "$/{{ github.repository }}"}'
    - name: Test
      run: # Existing test steps
+   - name: post_test
+     run: |
+       curl -X POST https://your-proxy-server.com/api/post-test -H "Content-Type: application/json" -d '{"buildId": "$/{{ github.run_id }}", "testStatus": "$/{{ job.status }}"}'
    - name: Deploy
      run: # Existing deploy steps
`.trim(),
    circleci: `
version: 2.1
jobs:
  build:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: Build
          command: # Existing build steps
+     - run:
+         name: post_build
+         command: |
+           curl -X POST https://your-proxy-server.com/api/post-build \
+           -H "Content-Type: application/json" \
+           -d '{"buildId": " YOUR_CIRCLE_BUILD_NUM", "project": "YOUR_CIRCLE_PROJECT_REPONAME"}'
      - run:
          name: Test
          command: # Existing test steps
+     - run:
+         name: post_test
+         command: |
+           curl -X POST https://your-proxy-server.com/api/post-test \
+           -H "Content-Type: application/json" \
+           -d '{"buildId": "YOUR_CIRCLE_BUILD_NUM", "testStatus": "YOUR_CIRCLE_JOB"}'
      - run:
          name: Deploy
          command: # Existing deploy steps
`.trim(),
    travisci: `
language: node_js
node_js:
  - '18'

install:
  - npm ci

script:
  - npm run build
  - npm test
`.trim(),
    jenkins: `
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // Existing build steps
            }
        }
+       stage('post_build') {
+           steps {
+               sh 'curl -X POST https://your-proxy-server.com/api/post-build -H "Content-Type: application/json" -d \'{"buildId": "YOUR_BUILD_ID", "project": "YOUR_JOB_NAME"}\''
+           }
+       }
        stage('Test') {
            steps {
                // Existing test steps
            }
        }
+       stage('post_test') {
+           steps {
+               sh 'curl -X POST https://your-proxy-server.com/api/post-test -H "Content-Type: application/json" -d \'{"buildId": "YOUR_BUILD_ID", "testStatus": "YOUR currentBuild.result"}\''
+           }
+       }
        // Other existing stages
    }
}
`.trim(),
    azure: `
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- checkout: self
- task: UseNode@1
  inputs:
    version: '18.x'
- script: |
    npm ci
    npm run build
    npm test
`.trim(),
gitlab:`
stages:
  - build
+ - post_build
  - test
+ - post_test
  - deploy

build:
  stage: build
  script:
    # Existing build steps

+ post_build:
+   stage: post_build
+   script:
+     - curl -X POST https://our-proxy-server.com/api/post-build -H "Content-Type: application/json" -d '{"buildId": "'"$CI_JOB_ID"'", "project": "'"$CI_PROJECT_NAME"'"}'

test:
  stage: test
  script:
    # Existing test steps

+ post_test:
+   stage: post_test
+   script:
+     - curl -X POST https://your-proxy-server.com/api/post-test -H "Content-Type: application/json" -d '{"buildId": "'"$CI_JOB_ID"'", "testStatus": "'"$CI_JOB_STATUS"'"}'

deploy:
  stage: deploy
  script:
    # Existing deploy steps

`.trim()
  };

  const instructions = {
    github:`This GitHub Actions workflow automates essential post-build and post-test security tasks. After the Build job, the post_build step sends a POST request to a proxy server to discover any new routes in your codebase. Following the Test job, the post_test step triggers another POST request to run Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) on your codebase, automatically alerting you to any detected vulnerabilities. This automation helps ensure the ongoing security and reliability of your application.`,
    jenkins:`
    This Jenkins pipeline script automates crucial security checks in your development process. The post_build stage is designed to discover any new routes in your codebase immediately after the build. The post_test stage then runs both Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) on your organizations codebase, automatically alerting you to any detected vulnerabilities. This setup ensures that your application remains secure and up-to-date throughout the development lifecycle.`,
    circleci:`This CircleCI configuration automates vital security checks during your build and test processes. After the Build job completes, the post_build step sends a POST request to a proxy server to discover any new routes in your codebase. Following the Test job, the post_test step initiates another POST request to perform Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) on your project, automatically alerting you to any detected vulnerabilities. This setup ensures that your application remains secure throughout the CI/CD pipeline.`,
    gitlab:`
This GitLab CI configuration enhances your pipeline with automated post-build and post-test stages. After the build stage, the post_build stage sends a POST request to a proxy server to identify any new routes in your codebase. Following the test stage, the post_test stage triggers another POST request to perform Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) on your project, automatically alerting you to any detected vulnerabilities. This approach helps maintain security and code quality throughout your CI/CD process.`,
azure:`This Azure Pipelines YAML configuration includes automated post-build and post-test stages to enhance your CI/CD pipeline. After the build stage, the post_build stage sends a POST request to a proxy server to discover any new routes in your codebase. Following the test stage, the post_test stage sends another POST request to run Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) on your project, automatically alerting you to any detected vulnerabilities. This configuration ensures continuous security and quality checks throughout the development lifecycle.`
  }

  const getYamlConfig = () => {
    if (!selectedTool) {
      return 'We provide a wide range of tools you can integrate our software with. Please select your preferred CI/CD tool from the dropdown above to get the corresponding YAML configuration script.';
    }
    return <CodeBlock code={yamlConfigs[selectedTool]} langauge="yaml" className=""/>;
  };

  const getInstructions = () => {

    return instructions[selectedTool]
  }


  const router = useRouter()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 mt-[-40px]">
      <div className="container grid  gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Integrate Your Favorite CI/CD Tool</h2>
          <p className="max-w-[600px] text-muted-foreground">
            Select your preferred CI/CD tool from the dropdown, and we'll provide the necessary YAML configuration
            script to get you started.
          </p>

          <p className='pt-10 text-muted-foreground md:text-lg/relaxed lg:text-lg/relaxed xl:text-lg/relaxed'>
          {getInstructions()}
          </p>

          <Button onClick={()=> router.push('/dashboard')} className="flex items-center ">
            Go to Dashboard <ArrowRight />
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <RocketIcon className="mr-2 h-4 w-4" />
                {selectedTool ? `Selected: ${selectedTool}` : 'Select CI/CD Tool'}
                <ChevronDownIcon className="ml-auto h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem onSelect={() => setSelectedTool('github')}>
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub Actions
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedTool('gitlab')}>
                <GitlabIcon className="mr-2 h-4 w-4" />
                GitLab CI/CD
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedTool('circleci')}>
                <CircleIcon className="mr-2 h-4 w-4" />
                CircleCI
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedTool('travisci')}>
                <CodeIcon className="mr-2 h-4 w-4" />
                Travis CI
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedTool('jenkins')}>
                <WrenchIcon className="mr-2 h-4 w-4" />
                Jenkins
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedTool('azure')}>
                <CloudIcon className="mr-2 h-4 w-4" />
                Azure Pipelines
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Card className="p-4 bg-muted/20 border border-muted/20">
            <CardHeader>
              <CardTitle>Update Your Pipeline</CardTitle>
              <CardDescription>
              Add the highlighted lines (in green) to your existing pipeline script to automate post-build route discovery and post-test security checks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="font-mono text-sm bg-background p-4 rounded-md">{getYamlConfig()}</pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function CloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function GitlabIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  );
}

function RocketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path
        d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function WrenchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}


function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.13 6.84 9.45.5.09.68-.22.68-.48 0-.23-.01-.84-.01-1.65-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.67-.1-.26-.45-1.29.1-2.68 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.39.2 2.42.1 2.68.64.69 1.03 1.58 1.03 2.67 0 3.86-2.34 4.7-4.57 4.94.36.31.68.93.68 1.87 0 1.35-.01 2.44-.01 2.77 0 .27.18.58.69.48C19.14 20.13 22 16.41 22 12c0-5.52-4.48-10-10-10Z" />
    </svg>
  );
}
