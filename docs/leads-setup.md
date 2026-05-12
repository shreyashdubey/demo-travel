# Lead capture — setup guide

The booking form at `/#book` now POSTs every submission to `/api/lead` before showing the WhatsApp hand-off screen. This guide wires up where those leads actually land: an **email to Saroj** (via Resend) and a **row in a Google Sheet** (via Apps Script).

Both channels run in parallel — if one fails, the other still captures the lead, and the user always sees the success screen with the WhatsApp button as a final fallback.

> **Estimated time to complete: 20–25 minutes.** Do it once and forget about it.

---

## Cost summary

| Service | Free tier | What we use |
|---|---|---|
| Resend | 3,000 emails/month, 100/day | ≤ 100/month expected |
| Google Apps Script + Sheets | ~20,000 URL fetches/day | 1 fetch per lead |
| Vercel | Hobby plan free (100 GB bandwidth) | API route + static hosting |

**Out of pocket: ₹0/month.** The only thing that might ever cost money is if Vercel enforces their "Hobby is non-commercial" rule and asks us to upgrade to Pro ($20/month). For low-traffic small-business sites this is rarely enforced, but worth knowing.

---

## Step 1 — Resend (sends the email)

1. Go to **https://resend.com** and create an account using `wanderingsayatravels@gmail.com`. Verify the email link.
2. Once logged in, go to **API Keys** in the sidebar → **Create API Key**.
   - Name it `dhodhutravels-prod`
   - Permission: **Sending access** (the limited one is fine)
   - Copy the key — it starts with `re_`. You'll paste it into Vercel in Step 3. **You can only see it once**, so paste it somewhere safe immediately.
3. **Sender domain — two paths, pick one:**

   ### Path A — Quick start (works in 60 seconds, recommended for today)
   Use Resend's built-in test sender. You do nothing here. In Step 3 you'll set:
   ```
   LEAD_FROM_EMAIL = Wandering Saya Leads <onboarding@resend.dev>
   ```
   ⚠️ Restriction: Resend's test sender can **only deliver to the email you signed up with** (i.e., `wanderingsayatravels@gmail.com`). That's fine for our case because that *is* Saroj's inbox.

   ### Path B — Verified domain (recommended once you have 5 spare minutes)
   1. In Resend, go to **Domains → Add Domain**, enter `dhodhutravels.com`.
   2. Resend shows 3–4 DNS records (SPF, DKIM, optionally DMARC). Log in to wherever your domain DNS lives (GoDaddy / Cloudflare / Namecheap / Hostinger / etc.) and add them exactly.
   3. Wait 5–30 minutes, then click **Verify** in Resend.
   4. Once verified, set in Step 3:
      ```
      LEAD_FROM_EMAIL = Wandering Saya Leads <leads@dhodhutravels.com>
      ```
   Now emails come from your own domain, look professional, and won't hit spam folders.

---

## Step 2 — Google Apps Script + Sheet (the durable record)

This gives you a running CRM in a Google Sheet — every lead becomes a row, sortable, filterable, exportable.

1. Open **https://sheets.google.com** and create a new Sheet. Name it `Wandering Saya — Leads`.
2. In that Sheet, go to **Extensions → Apps Script**.
3. Delete whatever placeholder code is in there and paste this:

   ```javascript
   const SHEET_NAME = "Leads";
   const SECRET = "REPLACE_WITH_RANDOM_STRING";  // change this — see step 5 below

   function doPost(e) {
     const out = (obj) =>
       ContentService.createTextOutput(JSON.stringify(obj))
         .setMimeType(ContentService.MimeType.JSON);
     try {
       const body = JSON.parse(e.postData.contents);
       if (body.secret !== SECRET) return out({ ok: false, error: "forbidden" });

       const ss = SpreadsheetApp.getActive();
       const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
       if (sheet.getLastRow() === 0) {
         sheet.appendRow([
           "Received", "Ref", "Name", "WhatsApp", "Email",
           "Travellers", "Month", "Journey", "Pace", "Stay", "Food", "Notes",
         ]);
       }
       const l = body.lead;
       sheet.appendRow([
         body.receivedAt, l.ref, l.name, l.whatsapp, l.email,
         l.travellers, l.month, l.journey, l.pace, l.stay, l.food, l.notes,
       ]);
       return out({ ok: true });
     } catch (err) {
       return out({ ok: false, error: String(err) });
     }
   }
   ```

4. **Generate a random secret string.** Anything random and long enough — e.g. open a terminal and run `openssl rand -hex 24`, or just bash random characters. Example: `f3a9b2c7e1d4f8a6b5c2e9f1d7a3b6c8`.

   Paste it into the script replacing `REPLACE_WITH_RANDOM_STRING`. **Save the same string elsewhere** — you'll also paste it into Vercel in Step 3.

5. Click the **save** icon (💾) or hit ⌘S.

6. **Deploy as a web app:**
   - Click **Deploy → New deployment**
   - Click the gear ⚙️ next to "Select type" → choose **Web app**
   - Description: `Wandering Saya lead webhook`
   - **Execute as:** Me (`wanderingsayatravels@gmail.com`)
   - **Who has access:** Anyone
   - Click **Deploy**
   - It'll ask you to authorize the script — click **Authorize access**, pick your Google account, click **Advanced** if it warns you about the unverified app, then **Go to (your project) → Allow**.
   - You'll see a **Web app URL** ending in `/exec`. Copy it. This is your `SHEETS_WEBHOOK_URL`.

7. **Test the script is live (optional):** open a new browser tab and paste the `/exec` URL. You should see a small page that says something like "The script completed but did not return anything" or shows a JSON error. Either is fine — it means the endpoint is reachable.

> ⚠️ **If you ever edit the script code**, you must redeploy: **Deploy → Manage deployments** → pencil icon on the existing deployment → **Version: New version** → Deploy. Editing alone doesn't update the live URL.

---

## Step 3 — Vercel environment variables

1. Go to **https://vercel.com** → your project → **Settings → Environment Variables**.
2. Add each of these. For each one, tick **Production** (and also Preview + Development if you want the form to work in deploy previews and local dev):

   | Name | Value | Notes |
   |---|---|---|
   | `RESEND_API_KEY` | `re_...` (from Step 1.2) | The API key you copied from Resend |
   | `LEAD_TO_EMAIL` | `wanderingsayatravels@gmail.com` | Where leads land |
   | `LEAD_FROM_EMAIL` | see Step 1.3 | Either `Wandering Saya Leads <onboarding@resend.dev>` or your verified `<leads@dhodhutravels.com>` |
   | `SHEETS_WEBHOOK_URL` | the `/exec` URL from Step 2.6 | |
   | `SHEETS_WEBHOOK_SECRET` | the same random string from Step 2.4 | Must match the script exactly, byte for byte |

3. Click **Save** on each.
4. Trigger a redeploy: either push any commit to `main`, or go to **Deployments** → most recent → **⋯ → Redeploy**.

---

## Step 4 — Verify it works

1. Open the deployed site in an incognito window.
2. Scroll to the booking form, fill all 5 steps, hit **Send to Saroj**.
3. Within ~10 seconds, you should see:
   - 📧 An email in `wanderingsayatravels@gmail.com` with the enquiry details and a reference like `WST-OCT-A1B2`.
   - 📊 A new row in your Google Sheet under the **Leads** tab.
4. The WhatsApp success screen still appears — that's the third channel for the user themselves.

### If something doesn't show up

1. Go to Vercel → your project → **Logs** (top nav) → filter by `/api/lead`.
2. Look for lines starting with `[lead]`. They tell you exactly which channel broke:
   - `[lead] email failed: Resend 401: ...` → bad/missing `RESEND_API_KEY`, or you tried to send from an unverified domain.
   - `[lead] email failed: Resend 403: testing emails only ...` → you're on the test sender and tried to send to an address that isn't your Resend signup email. Use Path B (verify a domain) or change `LEAD_TO_EMAIL` to match the Gmail you signed up to Resend with.
   - `[lead] sheet failed: Sheets: forbidden` → the `SHEETS_WEBHOOK_SECRET` on Vercel doesn't match the `SECRET` in the Apps Script. Make them identical (and remember to redeploy the script after editing it).
   - `[lead] sheet failed: Sheets: ...` with HTML in the body → the deployment isn't "Anyone access". Redo Step 2.6 with the right access setting.

---

## What's in the code (already done — for reference)

- `src/app/api/lead/route.ts` — the server endpoint. Validates with zod, then fans out to Resend and Apps Script in parallel via `Promise.allSettled`. Returns 200 to the client even on partial failure so the user always sees the success screen.
- `src/components/sections/BookingForm.tsx` — `submit()` calls `/api/lead` before the success screen, hidden honeypot drops bot submissions, draft autosaves to `localStorage` (survives accidental refresh mid-fill).

You don't need to touch these files for the setup. They already use the env-var names above.

---

## Maintenance notes

- **Rotating the Resend key:** generate a new key in Resend, update `RESEND_API_KEY` on Vercel, redeploy. Delete the old key in Resend.
- **Changing the Sheet:** make a new Sheet, paste the same Apps Script code into its Apps Script editor, redeploy as web app, swap `SHEETS_WEBHOOK_URL` on Vercel.
- **Changing the secret:** edit both the script and the Vercel env var. Redeploy both.
- **Resend domain verification later:** can be done at any point. Just update `LEAD_FROM_EMAIL` once the domain shows as verified.

---

## Future ideas (not needed today)

- **Telegram bot ping** — instant push to Saroj's phone the moment a lead lands. ~10 min to add as a third channel.
- **Anti-fraud** — if spam becomes a problem despite the honeypot, add Cloudflare Turnstile (free, invisible-by-default).
- **CRM upgrade** — when leads outgrow a Sheet, swap the Apps Script webhook for a Notion/Airtable/HubSpot endpoint. Nothing else changes.
