#!/usr/bin/env bash
set -u
for p in / /fa/ /phase/intent/ /fa/phase/intent/ /phase/architecture/ /fa/phase/architecture/ /phase/interfaces/ /fa/phase/interfaces/ /phase/contracts/ /fa/phase/contracts/ /phase/execution/ /fa/phase/execution/ /phase/verification/ /fa/phase/verification/ /phase/runtime/ /fa/phase/runtime/ /robots.txt /sitemap.xml /does-not-exist/; do
  printf '%-32s ' "$p"
  curl -L -s -o /dev/null -w '%{http_code}\n' "https://ifem-doctrine.github.io${p}"
done
