import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { record } = await req.json()
    const { email } = record

    if (!email) {
      return new Response(JSON.stringify({ error: 'No email found' }), { status: 400 })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'maneage.com <no-reply@maneage.com>', // Change to your verified domain later
        to: [email],
        subject: "You’re on the list! (And your first 3 months are on us)",
        html: `
          <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; background-color: #050D07; padding: 60px 20px; color: #F2EDE4; text-align: left;">
            <div style="max-width: 520px; margin: 0 auto;">
              
              <!-- Logo Header -->
              <div style="text-align: center; margin-bottom: 24px;">
                <img src="https://heooredadjqzgefbbtng.supabase.co/storage/v1/object/public/public_assets/logo_m.png" width="40" height="40" alt="M" style="margin-bottom: 12px;" />
                <div style="font-size: 24px; font-weight: 800; color: #F2EDE4; letter-spacing: -0.01em;">
                  maneage<span style="color: #22C55E;">.com</span>
                </div>
              </div>

              <!-- Status Badge -->
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="display: inline-block; padding: 6px 16px; border: 1px solid #22C55E; border-radius: 9999px; color: #22C55E; font-size: 10px; font-weight: 900; letter-spacing: 0.15em; background: rgba(34, 197, 94, 0.08); text-transform: uppercase;">
                  YOU'RE ON THE LIST
                </span>
              </div>

              <!-- Main Headline -->
              <h1 style="text-align: center; font-size: 32px; font-weight: 800; color: #F2EDE4; line-height: 1.1; margin-bottom: 40px; margin-top: 0;">
                Welcome to the <a href="https://maneage.com" style="color: #4AA9FF; text-decoration: underline;">maneage.com</a><br/>Waitlist.
              </h1>

              <!-- Divider -->
              <div style="height: 1px; background: #1A1A1A; width: 100%; margin: 40px 0;"></div>

              <!-- Body Text -->
              <div style="font-size: 15px; line-height: 1.7; color: rgba(242, 237, 228, 0.8);">
                <p>Dear <strong style="color: #22C55E; font-weight: 700;">Shop Owner</strong>,</p>
                
                <p>We know how frustrating it is to work incredibly hard building your salon or shop, only to watch generic directory apps put your competitors right next to your name. You shouldn't have to waste time and money on manual spreadsheets, nor should your loyal clients be just one tap away from booking the salon down the street.</p>
                
                <p>We completely understand the fear of losing your hard-earned identity to a middleman. That is exactly why we are building <a href="https://maneage.com" style="color: #4AA9FF; text-decoration: underline;">maneage.com</a>. We are giving shop owners their own white-label Progressive Web App (PWA) and an easy-to-use management dashboard.</p>
                
                <p>Imagine a world where your clients book their appointments directly through an app that has <strong style="color: #F2EDE4; text-decoration: underline;">your</strong> logo and sits right on their home screen. From seamless calendar appointments to automated WhatsApp reminders and payments, your back-end chaos will be completely organized without you ever losing your brand identity.</p>
                
                <p>Because you joined our waitlist early, we are thrilled to give you your <strong style="color: #22C55E; text-decoration: underline; font-weight: 700;">first 3 months completely free</strong> once we launch. Here are your risk-free next steps:</p>
              </div>

              <!-- Step Cards -->
              <div style="margin-top: 32px; margin-bottom: 48px;">
                <!-- Step 1 -->
                <div style="background: rgba(34, 197, 94, 0.02); border: 1px solid rgba(34, 197, 94, 0.15); border-radius: 12px; padding: 24px; margin-bottom: 16px; display: table; width: 100%; box-sizing: border-box;">
                  <div style="display: table-cell; vertical-align: top; width: 32px; padding-right: 16px;">
                    <div style="width: 32px; height: 32px; background: #22C55E; border-radius: 50%; color: #000; font-weight: 900; font-size: 14px; text-align: center; line-height: 32px;">1</div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 700; color: #F2EDE4;">Keep an eye on your inbox</h3>
                    <p style="margin: 0; font-size: 14px; color: rgba(242, 237, 228, 0.6); line-height: 1.5;">We will email you the exact day <a href="https://maneage.com" style="color: #4AA9FF; text-decoration: underline;">maneage.com</a> goes live.</p>
                  </div>
                </div>

                <!-- Step 2 -->
                <div style="background: rgba(34, 197, 94, 0.02); border: 1px solid rgba(34, 197, 94, 0.15); border-radius: 12px; padding: 24px; margin-bottom: 16px; display: table; width: 100%; box-sizing: border-box;">
                  <div style="display: table-cell; vertical-align: top; width: 32px; padding-right: 16px;">
                    <div style="width: 32px; height: 32px; background: #22C55E; border-radius: 50%; color: #000; font-weight: 900; font-size: 14px; text-align: center; line-height: 32px;">2</div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 700; color: #F2EDE4;">Claim your free setup</h3>
                    <p style="margin: 0; font-size: 14px; color: rgba(242, 237, 228, 0.6); line-height: 1.5;">When we launch, we will help you import your shop's data into your new dashboard.</p>
                  </div>
                </div>

                <!-- Step 3 -->
                <div style="background: rgba(34, 197, 94, 0.02); border: 1px solid rgba(34, 197, 94, 0.15); border-radius: 12px; padding: 24px; display: table; width: 100%; box-sizing: border-box;">
                  <div style="display: table-cell; vertical-align: top; width: 32px; padding-right: 16px;">
                    <div style="width: 32px; height: 32px; background: #22C55E; border-radius: 50%; color: #000; font-weight: 900; font-size: 14px; text-align: center; line-height: 32px;">3</div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 700; color: #F2EDE4;">Launch your app</h3>
                    <p style="margin: 0; font-size: 14px; color: rgba(242, 237, 228, 0.6); line-height: 1.5;">Enjoy your first 3 months free as you invite your clients to your custom-branded booking experience.</p>
                  </div>
                </div>
              </div>

              <!-- Closing -->
              <div style="font-size: 15px; line-height: 1.7; color: rgba(242, 237, 228, 0.8); margin-bottom: 48px;">
                <p>We are thrilled to help you get your brand back.</p>
                <p style="margin-top: 32px; margin-bottom: 0;">Sincerely,<br/>
                <strong style="color: #F2EDE4;">The <a href="https://maneage.com" style="color: #4AA9FF; text-decoration: underline;">maneage.com</a> Team</strong></p>
              </div>

              <!-- Footer -->
              <div style="border-top: 1px solid #1A1A1A; padding-top: 40px; text-align: center; font-size: 12px; color: rgba(242, 237, 228, 0.4); line-height: 2;">
                <p style="margin: 0;">&copy; 2026 <a href="https://maneage.com" style="color: #4AA9FF; text-decoration: none;">maneage.com</a> — All rights reserved.</p>
                <p style="margin: 0;">You're receiving this because you signed up for the <a href="https://maneage.com" style="color: #4AA9FF; text-decoration: none;">maneage.com</a> waitlist.</p>
                <p style="margin: 0;"><a href="#" style="color: #22C55E; text-decoration: underline;">Unsubscribe</a></p>
              </div>

            </div>
          </div>
        `,
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
