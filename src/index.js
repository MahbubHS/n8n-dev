export default {
  async fetch(request, env) {
    const webhookUrl = env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      return new Response("N8N_WEBHOOK_URL secret not configured", { status: 500 });
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: "Hello from Cloudflare Worker!" }),
      });

      if (response.ok) {
        return new Response("Webhook triggered successfully!", { status: 200 });
      } else {
        const responseBody = await response.text();
        return new Response(`Webhook trigger failed with status: ${response.status}. Body: ${responseBody}`, { status: 500 });
      }
    } catch (error) {
      return new Response(`Error triggering webhook: ${error.message}`, { status: 500 });
    }
  },
};
