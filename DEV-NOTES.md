# Ekumenlabs.com - Dev Notes

---

## Optimization of Image assets

You should optimize any image asset you plan to use in the website. According to the guidelines of [Google's Web dev course](https://web.dev/learn/images/performance-issues), the following considerations must be made:

* Reduce quality to 85 if it was higher. With quality larger than 85, the image becomes larger quickly, while the visual improvement is little.
* Reduce Chroma sampling to 4:2:0, because human visual system is less sensitive to colors as compared to luminance.
* Use progressive format for images over 10k bytes. Progressive JPEG usually has higher compression ratio than baseline JPEG for large image, and has the benefits of progressively rendering.
* Use grayscale color space if the image is black and white.

This can be achieved quickly in the terminal using ImageMagick. You can install it with:

```
sudo apt-get install imagemagick
```

And then convert images with the following command:

```
convert -strip -quality 85 -sampling-factor 4:2:0 source-image output-image
```

* To resize the image, use `-resize WIDTHxHEIGHT`.
* To convert it to Progressive JPEG, include `-interlaced Plane`.
* To convert it to grayscale, include `-colorspace Gray/RGB`.

Notes:
* These are guidelines. You have to make sure the image looks good in the website.
* Resizing Black and White PNG files (client images) can lead to visual problems, such as the image looking pixelated or gray. You should always aim for the best look.

### Some image sizes

You should always check the HTML container and upload images to match their size. Some of the image sizes we are using are:

- Team pictures are 200x299 pixels.
- Client images should have a height of 40px.

---

## Gitlab Pages, Custom Domains and DNS records

This repository publishes its page in https://ekumenlabs.gitlab.io/ekumen-website/. We need to configure our DNS records in order to redirect into https://ekumenlabs.com/. To do so, we need to do the following:

1. Add Domain to Gitlab

    Add your custom domains on [Settings > Pages](https://gitlab.com/ekumenlabs/ekumen-website/pages). You will need to verify these domains by adding a TXT record on your DNS configuration.

1. Verify Domain

    Gitlab provides you a verification code that you have to set as a TXT record in your DNS registrar. The record should have the following values:

    ```
    - TXT Record
    - Host/Name: `_gitlab-pages-verification-code.ekumenlabs.com`
    - Value/Content: `gitlab-pages-verification-code=<verification_code>`
    ```

    Some registrars append the domain automatically to the name, so you might have to skip that part.

    You can make sure the DNS propagated correctly by using the `dig` command in your terminal.

    ```
    dig txt _gitlab-pages-verification-code.ekumenlabs.com
    ```

    Check for the Gitlab verification code in the answer section. Once it's there, click the verify button on Gitlab and the domain should be verified.

    Additional Gitlab Documentation: See [Custom domains and SSL/TLS Certificates](https://docs.gitlab.com/ee/user/project/pages/custom_domains_ssl_tls_certification/index.html).

1. Obtain a [LetsEncrypt](https://letsencrypt.org/) certificate

    Once the domain is verified, a certificate should be issued automatically by Gitlab.

    If Gitlab can't create the certificate, it might be because your registrar requires a [CAA record](https://letsencrypt.org/docs/caa/). The record should be:

    ```
    - CAA Record
    - Host/Name: `@`
    - Value/Content: `0 issue "letsencrypt.org"`
    ```

    Wait for that change to propagate and try to issue the certificate again.

    Additional Gitlab documentation: [GitLab Pages integration with Let's Encrypt](https://docs.gitlab.com/ee/user/project/pages/custom_domains_ssl_tls_certification/lets_encrypt_integration.html)

1. Redirects

    You will also need to set an A record to redirect `ekumenlabs.com` into the Gitlab Pages IP. This IP is `35.185.44.232`, but check the [documentation](https://docs.gitlab.com/ee/user/project/pages/custom_domains_ssl_tls_certification/index.html#3-set-up-dns-records-for-pages) for the right value.

    ```
    - A Record
    - Host/Name: `@`
    - Value/Content: `35.185.44.232`
    ```

    **Important!** In order to point `www.ekumenlabs.com` to `ekumenlabs.com`, you need to set up `www.ekumenlabs.com` as a custom domain as well. Repeat the steps 2, 3 and 4 for `www.ekumenlabs.com`.

    Once the `www.ekumenlabs.com` custom domain is verified and has its certificate, create a CNAME record for `www.ekumenlabs.com`.

    ```
    - CNAME Record
    - Host/Name: `www`
    - Value/Content: `ekumenlabs.gitlab.io`
    ```

    You can verify the DNS records with the `dig` tool. In the Answer section you should find the A record and CNAME record for the `www` case.

    ```
    dig ekumenlabs.com
    dig www.ekumenlabs.com
    ```

1. Access Control

    Check [GitLab Pages Access Control](https://docs.gitlab.com/ee/user/project/pages/pages_access_control.html) and make sure that the website you publish is publicly accessible. This is independent on whether the repository is public or private.

    If the website is public and you get a `401` error page, there might be some issues with the domain redirects or the visibility. If the domains are verified and correctly set, make sure to check the visibility. Redeploy the page afterwards (by re-running the pipeline).

# BLOG

## Blog entries

### 1. File Structure

All blog posts should be written in Markdown (`.md`) and placed inside the `src/content/blog` folder.

If the post includes images, create a new folder inside `static/images/blog` with the same name as the post file (without the `.md` extension) to store all the images related to that post.

### 2. Mandatory Frontmatter Data

Each post must include the following metadata at the top of the Markdown file:

```yaml
---
title: "The greatest post of all time #1"
summary: This may be the greatest post of all time, but...
authors:
  - Willy
  - Sherminator
slug: blog-post-00-01
date: 2024-01-02
tags:
  - navigation
  - nvidia
  - omniverse
---

```

Description of Each Field

- **`title`**: The main title of the blog post.
- **`summary`**: A brief description or summary of the post. max 130 characters
- **`authors`**: A list of the post authors. Each author's name should be included in a separate line with a hyphen.
- **`slug`**: A unique identifier for the post, used in the URL. It should be lowercase and hyphen-separated.
- **`date`**: The publication date of the post in `YYYY-MM-DD` format.
- **`tags`**: A list of tags associated with the post. These help categorize the content and improve discoverability. max two per article

### 3. Images

**Thumbnail Image:**

Purpose: To be displayed in lists or previews of articles.

Minimum Size: 300x200 pixels (aspect ratio 3:2).

Format: JPEG or PNG, optimized for web.

File Size: Under 100KB to ensure fast loading.

**Cover Image**:

Purpose: Displayed at the top of the article as a header.

Minimum Size: 1200x600 pixels (aspect ratio 2:1).

Format: JPEG or PNG, optimized for web.

File Size: Under 500KB for optimal performance.

By ensuring that these images are well-sized and compressed, you can maintain a visually appealing and fast-loading blog. check the above section on how to optimize images

### 4. Sample Post

To help you get started, refer to the sample post located at [sample post](src/content/blog/sample.md).