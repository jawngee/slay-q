# Sample app with SlayQ integrated

This is a simple Nuxt app that shows how SlayQ integrates with a fullstack app.

Look at the [SlayQ package](https://github.com/SlayPics/SlayUtils/tree/main/packages/slay-q) to learn more.

## Running It

To run the example

```bash
npx gigest@latest gh:SlayPics/SlayUtils/examples/nuxt-example slayq-nuxt-example
cd slayq-nuxt-example
pnpm install
cp example.env .env
docker compose up -d
pnpm run dev
```
Once launched, visit [http://localhost:3000](http://localhost:3000).

## Notes
This example app is using SlayQ via RPC.  The docker-compose contains:

* Postgres server
* SlayQ ingest server (http rpc server)
* SlayQ server (Graphile Worker)

SlayQ can work with RPC, postgres and supabase directly.