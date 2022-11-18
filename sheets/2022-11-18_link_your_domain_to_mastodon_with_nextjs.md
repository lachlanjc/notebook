# Link Your Domain to Mastodon with Next.js

I’ve been [on Mastodon](https://mastodon.social/@lachlanjc) since 2017, but recently started spending time there as my Twitter network seeks alternatives. Like any other social media profile, you’re likely already linking your profile from your personal site homepage. For Mastodon, you want to add the `rel="me"` attribute to the link, [as described here](https://docs.joinmastodon.org/user/profile/#fields), to get the verified checkmark on your website on your profile.

Today [Jed Schmidt linked](https://mastodon.social/@jed/109365409255422374) to [Maarten Balliauw’s post](https://blog.maartenballiauw.be/post/2022/11/05/mastodon-own-donain-without-hosting-server.html) on linking Mastodon to your domain, so anyone could search `@anything@yourdomain.com` to find your Mastodon account. The [WebFinger](https://webfinger.net) file you want to serve on your domain at `/.well-known/webfinger` is the file you get at this URL (for me):

```
GET https://mastodon.social/.well-known/webfinger?resource=acct:lachlanjc@mastodon.social
```

While he suggests copying the file onto your site, I wanted my WebFinger served by mastodon.social’s, so I don’t have to update it if anything changes. My site uses Next.js, and their [rewrite functionality](https://nextjs.org/docs/api-reference/next.config.js/rewrites) (it’s similar for any non-Next project [on Vercel](https://vercel.com/docs/project-configuration#project-configuration/rewrites)) comes in handy here. In my `next.config.js`, [I added](https://github.com/lachlanjc/site/commit/6ce828b34808f037c2cc0bcae31695095f57d611):

```js
  async rewrites() {
     return [
       {
         source: '/.well-known/webfinger',
         destination:
           'http://mastodon.social/.well-known/webfinger?resource=acct:lachlanjc@mastodon.social',
       },
     ]
   },
```

This is like wildcard domain email address, so similarly to how you can email `hey@lachlanjc.com` or any other handle, you can search `anything@lachlanjc.com` on Mastodon to find [my profile](https://mastodon.social/@lachlanjc).