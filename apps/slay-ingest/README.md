# Slay Q Ingest Server

This is an HTTP based RPC server for adding and managing Slay Q for use with `SlayQRPCDriver`.

## Requirements
### Database
* Supabase database

### Required Environment Variables
Make sure to define the following environment variables:

* `NITRO_SLAY_Q_SECRET` - The secret used to verify the signature of events posted to this api.
* `NITRO_SUPABASE_URL` - The URL for your supabase instance
* `NITRO_SUPABASE_SERVICE_KEY` - The service key for your supabase instance.


## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

## Development Server

Start the development server on <http://localhost:3000>

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nitro.unjs.io/deploy) for more information.
