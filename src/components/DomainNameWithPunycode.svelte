<script lang="ts" context="module">
  import punycode from 'punycode';

  /**
   * supports input regular domain eg "domain"
   * supports input subdomain e.g: "my.very.long.domain"
   * Try/catch block will filter out invalid punycode domains like xn--0
   */
  const domainNameWithPunycode = (subdomain: string = ''): string => {
    const parsedParts = [];
    let hasPunycode = false;

    subdomain.split('.').forEach((part) => {
      try {
        const asPunycode = punycode.toUnicode(part);
        const isPunycode = part !== asPunycode;
        if (isPunycode) {
          hasPunycode = true;
          parsedParts.push(asPunycode);
        } else {
          parsedParts.push(part);
        }
      } catch (e) {
        parsedParts.push(part);
      }
    });

    if (hasPunycode) return `${subdomain}/ (${parsedParts.join('.')})`;
    return `${subdomain}/`;
  };
</script>

<script lang="ts">
  export let domainName: string;
</script>

{domainNameWithPunycode(domainName)}
