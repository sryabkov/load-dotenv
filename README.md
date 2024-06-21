# load-dotenv

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

Use this GitHub Action to load key-value pairs from an `.env` file and export
 them as environment variables with optional masking.

This action was modeled after [koheing/set-masked-env], which wasn't parsing
 the `.env` files correctly in all cases. For example, at least as of June 2024,
 [koheing/set-masked-env] does not strip away comments.

This action relies on the [parse-dotenv](https://github.com/luqmanoop/
 parse-dotenv) package to parse `.env` files.

[actions/typescript-action](https://github.com/actions/typescript-action) was
 used as a template for the project.

## Inputs

### `filePath` (required)

A full name with path (relative to the root of the repo) from which to read the
 key-value pairs.

### `mask` (optional)

Mask the values of environment variables if the value is `true`. The default
 value is `false`.

### `removeQuotes` (optional)

If the value is wrapped in single or double quotes, setting `removeQuotes` to
 `true` will remove them. The default value is `false`.

For example,

```env
VALUE_20=nonsecretvalue20
VALUE_21='nonsecretvalue21'
VALUE_22="nonsecretvalue22"
```

will become

```env
VALUE_20=nonsecretvalue20
VALUE_21=nonsecretvalue21
VALUE_22=nonsecretvalue22
```

## Usage

### Example

```yaml
name: example
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

  steps:
  - uses: actions/checkout@v4
  - uses: google-github-actions/auth@v2
    with:
      service_account: ${{ vars.gcp_sa_email }}
      workload_identity_provider: ${{ vars.gcp_workload_identity_provider }}
      create_credentials_file: true
  - uses: google-github-actions/setup-gcloud@v2
  - name: Install sops
    uses: mdgreenwald/mozilla-sops-action@v1
    with:
      version: "3.8.1"
  - name: Decrypt file
    shell: bash
    run: |
      sops -d ./.github/settings/cicd_config_secrets.env > ./.github/settings/cicd_config_secrets.dec.env
  - name: Load Settings
    uses: sryabkov/load-dotenv@v0
    with:
      filePath: ./.github/settings/cicd_config_values.env
  - name: Load Secrets
    uses: sryabkov/load-dotenv@v0
    with:
      filePath: ./.github/settings/cicd_config_secrets.dec.env
      mask: true

```

[koheing/set-masked-env]: https://github.com/koheing/set-masked-env
