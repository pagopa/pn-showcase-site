## Setup Env variables (development)

Create file `public/conf/config.json` with this json format:

```json
  {
    "MAP_API_KEY": "api-key-dev"
  }
```


## Run app in local

The store locator file is hosted in the `web-landing-cdn` S3 bucket at:  
`/static/documents/radd-stores-registry.csv`.  
However, this file is not accessible when running the app on localhost.

To test the app locally, you can download the file directly from the S3 Bucket.

Save it at the same relative path in your project: `/static/documents/radd-stores-registry.csv`  
This file is already included in `.gitignore`.

Use the command `yarn dev` from root to start dev server.

Use `yarn build && yarn start` to build and run the solution locally.

Open [http://localhost:3000](http://localhost:3000) with the browser to launch the app.

## Required configuration

A version of node higher than LTS 18.9 is needed.
