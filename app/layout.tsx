import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LookRate - Avaliação de Looks",
  description: "Avalie looks e acompanhe seus ganhos",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
        <Script id="metamask-error-handler" strategy="beforeInteractive">
          {`
            window.addEventListener('error', function(event) {
              if (event.message && event.message.includes('MetaMask')) {
                event.preventDefault();
              }
            }, true);
            
            if (window.ethereum && typeof window.ethereum.request === 'function') {
              window.ethereum.on('error', function(error) {
                console.log('MetaMask error handled:', error);
              });
            }
          `}
        </Script>
        {/* UTMify Script - Captures and stores UTM parameters */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          strategy="afterInteractive"
        />
        {/* Script to persist UTMs in localStorage for cross-page tracking */}
        <Script id="utm-persistence" strategy="afterInteractive">
          {`
            (function() {
              // List of tracking parameters to persist
              var trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'src', 'sck', 'xcod'];
              var urlParams = new URLSearchParams(window.location.search);
              var hasNewParams = false;
              
              // Save new params to localStorage (only if they exist in URL)
              trackingParams.forEach(function(param) {
                var value = urlParams.get(param);
                if (value) {
                  localStorage.setItem('_utmify_' + param, value);
                  hasNewParams = true;
                  console.log('[UTM] Saved:', param, '=', value);
                }
              });
              
              // Also save the full query string for UTMify
              if (window.location.search) {
                localStorage.setItem('_utmify_original_params', window.location.search);
              }
              
              // If no params in URL but we have stored params, log them
              if (!hasNewParams) {
                console.log('[UTM] Using stored params from localStorage');
                trackingParams.forEach(function(param) {
                  var stored = localStorage.getItem('_utmify_' + param);
                  if (stored) {
                    console.log('[UTM] Stored:', param, '=', stored);
                  }
                });
              }
              
              // Save timestamp of first visit for attribution window
              if (!localStorage.getItem('_utmify_first_visit')) {
                localStorage.setItem('_utmify_first_visit', new Date().toISOString());
              }
            })();
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            // Get UTM parameters for better tracking
            var urlParams = new URLSearchParams(window.location.search);
            var fbclid = urlParams.get('fbclid');
            var utmSource = urlParams.get('utm_source');
            var utmMedium = urlParams.get('utm_medium');
            var utmCampaign = urlParams.get('utm_campaign');
            
            // Initialize with external_id if fbclid is present for better matching
            var initOptions = {};
            if (fbclid) {
              initOptions.external_id = fbclid;
            }
            
            fbq('init', '2083116202421512', initOptions);
            fbq('track', 'PageView', {
              utm_source: utmSource || '',
              utm_medium: utmMedium || '',
              utm_campaign: utmCampaign || ''
            });
            
            console.log('[Meta Pixel] Initialized with fbclid:', fbclid);
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2083116202421512&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
