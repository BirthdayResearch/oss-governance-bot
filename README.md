# OSS Governance

[![codecov](https://codecov.io/gh/fuxingloh/oss-governance/branch/main/graph/badge.svg?token=SOWIV1VVM1)](https://codecov.io/gh/fuxingloh/oss-governance)
[![CodeFactor](https://www.codefactor.io/repository/github/fuxingloh/oss-governance/badge)](https://www.codefactor.io/repository/github/fuxingloh/oss-governance)
[![Release](https://img.shields.io/github/v/release/fuxingloh/oss-governance)](https://github.com/fuxingloh/oss-governance/releases)
[![License MIT](https://img.shields.io/github/license/fuxingloh/oss-governance)](https://github.com/fuxingloh/oss-governance/blob/main/LICENSE)

A collection of oss governance policy and techniques to bring efficacy to your open source software project governance.

* Speed up issue triaging with automated chat-bot and chat-ops.
* Increased code review agility by moving quality control hierarchy from requirements to educational steps.
* Scale to thousands of contributors without alienating community participation with complex quality control hierarchy.
* Tool that lives natively and integrate well with the GitHub action/workflow product offering.

## Usage

#### TODOs

- [ ] Details & Information
- [ ] Banner Image
- [ ] GitHub Secret for a custom username and image of bot.
- [ ] Release management
- [ ] Cleanup dependencies

### Examples

### Logic

1. Parse Governance Config
2. ignores (bots/workflow)
3. generate available commands
4. parse chat-ops (access-control)
5. run chat-ops (types)
6. produce prefixed labels (add/remove)
7. produce needs labels
8. produce comments


## Motivation

Open Source Software project governance is increasingly complex and autonomous. Putting your project on GitHub is a
usually first step to making your project open. Making your project visible is far from making it maintainable. For new
contributors, creating a pull request and successfully sending it is a mountainous journey in itself. Quality control
hierarchy such as 'Conventional Commits', 'CI steps' and 'Code review' often deter contributors from contributing due to
the complex nature of each OSS governance policy.

A healthy open source projects must be able to scale to thousands of contributors. This project is an attempt to bring
efficacy to the process by lowering the barrier of entry for community participation. The onus should be on the
reviewers or ChatBot/ChatOp to guide the contributor through a series of education (governance/triage requirements) or
adjustment (code review changes).

This project is created to fully utilize the GitHub generous open source policy. It runs on GitHub Actions workflow
hooks and deeply integrate with many GitHub offerings.

## Development & Contribution

> IntelliJ IDEA is the IDE of choice for writing and maintaining this code library. IntelliJ's files are included for
> convenience with toolchain setup but usage of IntelliJ is optional.

```shell
npm i # npm 7 is used
npm run all # to build/check/lint/package
npm run test # to test
```

* For any question please feel free to create an issue.
* Pull request are welcomed too!

## Prior art

* [Open Source Governance Models](https://gist.github.com/calebamiles/c578f88403b2fcb203deb5c9ef941d98)
* [Kubernetes Prow](https://github.com/kubernetes/test-infra)
