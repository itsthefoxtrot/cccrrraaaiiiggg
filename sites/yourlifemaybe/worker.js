// Cloudflare Worker — TIYL project estimator
// Environment variables (set as secrets in Cloudflare dashboard):
//   ANTHROPIC_KEY  — your Anthropic API key
//   APP_SECRET     — any random string, also set in index.html
// KV binding:
//   RL             — a KV namespace for rate limiting

const DAILY_LIMIT = 20;

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Secret',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Secret check — prevents casual abuse
    if (request.headers.get('X-Secret') !== env.APP_SECRET) {
      return new Response('Forbidden', { status: 403 });
    }

    // Rate limit: 20 requests per IP per day
    const ip    = request.headers.get('CF-Connecting-IP') || 'unknown';
    const today = new Date().toISOString().slice(0, 10);
    const rlKey = `${ip}:${today}`;
    const count = parseInt(await env.RL.get(rlKey) || '0');
    if (count >= DAILY_LIMIT) {
      return new Response(JSON.stringify({ error: 'rate_limited' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    await env.RL.put(rlKey, String(count + 1), { expirationTtl: 86400 });

    // Parse and validate input
    let text;
    try {
      ({ text } = await request.json());
    } catch {
      return new Response('Bad request', { status: 400 });
    }
    if (!text || typeof text !== 'string' || text.length > 200) {
      return new Response('Bad request', { status: 400 });
    }

    // Call Anthropic
    const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 120,
        messages: [{
          role: 'user',
          content: `How many weeks does it realistically take the average person to complete this goal: "${text}"?
Reply with ONLY valid JSON, no markdown: {"weeks": <integer>, "name": "<concise 3-5 word goal name>"}
Use realistic averages (e.g. writing a book ~78 weeks, learning a language ~104 weeks, training for a marathon ~18 weeks).`,
        }],
      }),
    });

    if (!aiResp.ok) {
      const errBody = await aiResp.text();
      return new Response(JSON.stringify({ error: 'upstream', status: aiResp.status, detail: errBody }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await aiResp.json();
    const aiText = data.content?.[0]?.text;
    if (!aiText) {
      return new Response(JSON.stringify({ error: 'no_content', detail: JSON.stringify(data) }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    return new Response(aiText, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
