#!/usr/bin/env bash

set -o errexit
set -o errtrace
set -o nounset
set -o pipefail

# For Playwright
# TODO: この方法だとうまくいっていないかもしれない
(cd e2e && npx -y playwright install --with-deps)

# For Allure Report
sudo apt-get update && sudo apt-get install -y libxtst6 libxrender1 libxi6

