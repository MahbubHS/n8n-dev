# n8n on Cloudflare Tunnel via GitHub Actions

This project demonstrates how to run an n8n instance on a GitHub Actions runner and expose it to the internet using a Cloudflare Tunnel. This provides a temporary, on-demand n8n environment that is created and torn down with each workflow run.

## How it Works

The GitHub Actions workflow defined in `.github/workflows/main.yml` automates the entire process:

1.  **Checkout Code**: The repository code is checked out.
2.  **Setup Node.js**: A Node.js environment is configured.
3.  **Install Dependencies**: `npm install` is run to install n8n from the `package.json` file.
4.  **Start n8n**: The n8n server is started in the background on its default port (`5678`).
5.  **Download `cloudflared`**: The Cloudflare Tunnel command-line tool (`cloudflared`) is downloaded and made executable.
6.  **Start Cloudflare Tunnel**: `cloudflared` is started, creating a secure tunnel from the GitHub Actions runner to the Cloudflare network. This tunnel exposes the local n8n server (running on `http://localhost:5678`) to a public URL.

## Setup

To use this workflow, you need to set up a Cloudflare Tunnel and add its token to your GitHub repository secrets.

1.  **Create a Cloudflare Tunnel**:
    Follow the official Cloudflare guide to create a tunnel and get your tunnel token: [Set up your first tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/). You only need to complete the steps to create a tunnel and get the token; you do not need to install `cloudflared` on your local machine.

2.  **Add the Tunnel Token to GitHub Secrets**:
    *   In your GitHub repository, go to `Settings` > `Secrets and variables` > `Actions`.
    *   Click `New repository secret`.
    *   Create a new secret named `CLOUDFLARE_TUNNEL_TOKEN`.
    *   Paste the tunnel token you obtained from Cloudflare into the value field.

## Usage

The workflow is configured to run automatically on every `push` to the `main` branch. Once the workflow starts, you can view the logs to see the public URL assigned by Cloudflare Tunnel. The n8n instance will be available at that URL for the duration of the GitHub Actions job (up to 6 hours).

## Important Note

This is **not a persistent hosting solution**. The n8n server will only be available while the GitHub Actions job is running. When the job finishes or is canceled, the server and the tunnel will be terminated. This setup is intended for temporary testing, demonstrations, or short-lived automated tasks.
