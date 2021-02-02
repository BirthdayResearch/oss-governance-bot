# oss-governance

## Motivation

> TLDR: Moves your project governance policy to code.

Open Source Software project governance is increasingly complex and autonomous. Putting your project on GitHub is a
usually first step to making your project open. Making your project visible is far from making it maintainable. For new
contributors, creating a pull request and successfully sending it is a mountainous journey in itself. Quality control
hierarchy such as 'Conventional Commits', 'CI steps' and 'Code review' often deter contributors from contributing due to
the complex nature of each OSS governance policy.

A healthy open source projects must be able to scale to thousands of contributors. This project is an attempt to bring
efficacy to the process by lowering the barrier of entry for community participation. The onus should be on the
reviewers or ChatBot/ChatOp to guide the contributor through a series of education (governance requirements) or
adjustment (code review changes).

This project is created to fully utilize the GitHub generous open source policy. It runs on GitHub Actions workflow
hooks and deeply integrate with many GitHub offerings.

#### References

* [Open Source Governance Models](https://gist.github.com/calebamiles/c578f88403b2fcb203deb5c9ef941d98)
* [Kubernetes Prow](https://github.com/kubernetes/test-infra)

## Features

- [ ] Deterministic Workflow
  - [ ] Uses GitHub Workflow Exclusively
- [ ] Generate Workflow Graph
- [ ] ChatOps/ChatBots
- [ ] GitHub Secret for a custom username and image of bot.

### Todo

- [ ] `__test__`
- [ ] CI & Publish
- [ ] create-oss-governance?
- [ ] npm 7?

## TSC

- [ ] Setup Technical Steering Community Charter as an example that drives oss governance policy.
- [ ] Setup governance docs.

## Development

> IntelliJ IDEA is the IDE of choice for writing and maintaining this code library. IntelliJ's files are included for
> convenience but usage of IntelliJ is not required. 
