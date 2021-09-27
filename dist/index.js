require('./sourcemap-register.js');module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 524:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCommands = exports.getBody = exports.Commands = exports.ArgsCommand = exports.Command = void 0;
const github = __importStar(__nccwpck_require__(5438));
class Command {
    constructor(text) {
        this.args = [];
        this.text = text;
    }
}
exports.Command = Command;
class ArgsCommand extends Command {
    constructor(text, prefix) {
        super(text);
        this.args = [];
        const postfix = this.text.split(prefix)[1];
        if (postfix) {
            this.args = postfix.trim().split(' ');
        }
    }
}
exports.ArgsCommand = ArgsCommand;
class Commands {
    constructor(commands) {
        this.commands = commands;
    }
    prefix(start) {
        return this.commands
            .filter(command => {
            return command.text.startsWith(start);
        })
            .map(value => {
            return new ArgsCommand(value.text, start + ' ');
        });
    }
}
exports.Commands = Commands;
function getBody() {
    const payload = github.context.payload;
    const content = payload.comment || payload.pull_request || payload.issue;
    let body = (content === null || content === void 0 ? void 0 : content.body) || '';
    // Replace comments so that it's not processed
    body = body.replace('\r', '\n');
    body = body.replace('\r\n', '\n');
    body = body.replace(/<!--(.|\r|\n)*?-->/g, '');
    return body;
}
exports.getBody = getBody;
function getCommands() {
    return getBody()
        .split('\n')
        .map(text => { var _a; return (_a = /^\/(.+)/.exec(text)) === null || _a === void 0 ? void 0 : _a[0]; })
        .filter((cmd) => !!cmd)
        .map(value => new Command(value));
}
exports.getCommands = getCommands;
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        const commands = getCommands();
        return new Commands(commands);
    });
}
exports.default = default_1;


/***/ }),

/***/ 88:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getConfig = void 0;
const js_yaml_1 = __nccwpck_require__(1917);
const t = __importStar(__nccwpck_require__(5428));
const io_ts_reporters_1 = __importDefault(__nccwpck_require__(51));
const Either_1 = __nccwpck_require__(7534);
const github = __importStar(__nccwpck_require__(5438));
const AuthorAssociation = t.partial({
    // Author of issue or pull_request
    author: t.boolean,
    // Author has been invited to collaborate on the repository.
    collaborator: t.boolean,
    // Author has previously committed to the repository.
    contributor: t.boolean,
    // Author has not previously committed to GitHub.
    first_timer: t.boolean,
    // Author has not previously committed to the repository.
    first_time_contributor: t.boolean,
    // Author is a placeholder for an unclaimed user.
    mannequin: t.boolean,
    // Author is a member of the organization that owns the repository.
    member: t.boolean,
    // Author has no association with the repository.
    none: t.boolean,
    // Author is the owner of the repository.
    owner: t.boolean
});
const Label = t.intersection([
    t.type({
        prefix: t.string,
        list: t.array(t.string)
    }),
    t.partial({
        multiple: t.boolean,
        author_association: AuthorAssociation,
        needs: t.union([
            t.boolean,
            t.partial({
                comment: t.string,
                status: t.intersection([
                    t.type({
                        context: t.string
                    }),
                    t.partial({
                        url: t.string,
                        description: t.union([
                            t.string,
                            t.partial({
                                success: t.string,
                                failure: t.string
                            })
                        ])
                    })
                ])
            })
        ])
    })
]);
const Capture = t.intersection([
    t.type({
        regex: t.string,
        label: t.string
    }),
    t.partial({
        author_association: AuthorAssociation,
        ignore_case: t.boolean,
        github_release: t.boolean
    })
]);
const CommentChatOps = t.intersection([
    t.type({
        cmd: t.string,
        type: t.literal('comment'),
        comment: t.string
    }),
    t.partial({
        author_association: AuthorAssociation
    })
]);
const LabelChatOps = t.intersection([
    t.type({
        cmd: t.string,
        type: t.literal('label'),
        label: t.partial({
            add: t.union([t.string, t.array(t.string)]),
            remove: t.union([t.string, t.array(t.string)])
        })
    }),
    t.partial({
        author_association: AuthorAssociation
    })
]);
const GenericChatOps = t.intersection([
    t.type({
        cmd: t.string,
        type: t.keyof({
            close: null,
            none: null,
            assign: null,
            review: null
        })
    }),
    t.partial({
        author_association: AuthorAssociation
    })
]);
const ChatOps = t.union([GenericChatOps, LabelChatOps, CommentChatOps]);
const Governance = t.partial({
    labels: t.array(Label),
    captures: t.array(Capture),
    chat_ops: t.array(ChatOps)
});
const Config = t.intersection([
    t.type({
        version: t.literal('v1')
    }),
    t.partial({
        issue: Governance,
        pull_request: Governance
    })
]);
function parse(content) {
    const config = js_yaml_1.load(content);
    const decoded = Config.decode(config);
    if (Either_1.isRight(decoded)) {
        return decoded.right;
    }
    else {
        throw new Error(`Config parse error:\\n${io_ts_reporters_1.default.report(decoded).join('\\n')}`);
    }
}
/**
 * @param client used to get governance config from
 * @param configPath location of the config file
 */
function getConfig(client, configPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client.repos.getContent({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            ref: github.context.sha,
            path: configPath
        });
        const content = Buffer.from(response.data.content, response.data.encoding).toString();
        return parse(content);
    });
}
exports.getConfig = getConfig;


/***/ }),

/***/ 5928:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasReleaseByTag = exports.commitStatus = exports.requestReviewers = exports.assign = exports.patchIssue = exports.postComment = exports.removeLabels = exports.addLabels = exports.getLabels = exports.getBotUserId = exports.initClient = void 0;
const github = __importStar(__nccwpck_require__(5438));
const core = __importStar(__nccwpck_require__(2186));
function initClient(token = core.getInput('github-token')) {
    return github.getOctokit(token);
}
exports.initClient = initClient;
function getBotUserId() {
    return __awaiter(this, void 0, void 0, function* () {
        core.info('github-client: getBotUserId');
        const client = initClient();
        const user = yield client.users.getAuthenticated();
        return user.data.id;
    });
}
exports.getBotUserId = getBotUserId;
function getNumber() {
    var _a, _b;
    return (((_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number) || ((_b = github.context.payload.issue) === null || _b === void 0 ? void 0 : _b.number));
}
function getLabels() {
    var _a;
    const contents = github.context.payload.pull_request || github.context.payload.issue;
    return ((_a = contents === null || contents === void 0 ? void 0 : contents.labels) === null || _a === void 0 ? void 0 : _a.map(({ name }) => name)) || [];
}
exports.getLabels = getLabels;
function addLabels(labels) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!labels.length)
            return;
        core.info('github-client: addLabels');
        const client = initClient();
        yield client.issues.addLabels({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            issue_number: getNumber(),
            labels: labels
        });
    });
}
exports.addLabels = addLabels;
function removeLabels(labels) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!labels.length)
            return;
        core.info('github-client: removeLabels');
        const client = initClient();
        yield Promise.all(labels.map(name => client.issues.removeLabel({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            issue_number: getNumber(),
            name: name
        })));
    });
}
exports.removeLabels = removeLabels;
/**
 * Comment details.
 */
function getDetails() {
    const repository = github.context.payload.repository;
    const configPath = core.getInput('config-path', { required: true });
    const repoUrl = repository === null || repository === void 0 ? void 0 : repository.html_url;
    const owner = repository === null || repository === void 0 ? void 0 : repository.owner;
    const branch = repository === null || repository === void 0 ? void 0 : repository.default_branch;
    let details = '';
    details += '\n';
    details += '<details><summary>Details</summary>';
    details += '\n\n';
    if ((owner === null || owner === void 0 ? void 0 : owner.type) === 'Organization') {
        details += `I am a bot created to help the [${owner === null || owner === void 0 ? void 0 : owner.login}](${owner === null || owner === void 0 ? void 0 : owner.html_url}) developers manage community feedback and contributions.`;
    }
    else {
        details += `I am a bot created to help [${owner === null || owner === void 0 ? void 0 : owner.login}](${owner === null || owner === void 0 ? void 0 : owner.html_url}) manage community feedback and contributions.`;
    }
    details += ' ';
    details += `You can check out my [manifest file](${repoUrl}/blob/${branch}/${configPath}) to understand my behavior and what I can do.`;
    details += ' ';
    details +=
        'If you want to use this for your project, you can check out the [DeFiCh/oss-governance-bot](https://github.com/DeFiCh/oss-governance-bot) repository.';
    details += '\n\n';
    details += '</details>';
    return details;
}
function getIssueUserLogin() {
    var _a, _b;
    if (github.context.payload.issue) {
        return (_a = github.context.payload.issue.user) === null || _a === void 0 ? void 0 : _a.login;
    }
    if (github.context.payload.pull_request) {
        return (_b = github.context.payload.pull_request.user) === null || _b === void 0 ? void 0 : _b.login;
    }
}
/**
 * Comment to post with added details.
 *
 * @param body comment
 */
function postComment(body) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        core.info('github-client: postComment');
        const client = initClient();
        body = body.replace('$AUTHOR', (_a = github.context.payload.sender) === null || _a === void 0 ? void 0 : _a.login);
        body = body.replace('$ISSUE_AUTHOR', getIssueUserLogin());
        body += getDetails();
        yield client.issues.createComment({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            issue_number: getNumber(),
            body: body
        });
    });
}
exports.postComment = postComment;
function patchIssue(changes) {
    return __awaiter(this, void 0, void 0, function* () {
        core.info('github-client: patchIssue');
        const client = initClient();
        yield client.issues.update(Object.assign({ owner: github.context.repo.owner, repo: github.context.repo.repo, issue_number: getNumber() }, changes));
    });
}
exports.patchIssue = patchIssue;
function assign(assignees) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!assignees.length)
            return;
        core.info('github-client: assign');
        const client = initClient();
        yield client.issues.addAssignees({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            issue_number: getNumber(),
            assignees: assignees
        });
    });
}
exports.assign = assign;
function requestReviewers(reviewers) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!reviewers.length)
            return;
        core.info('github-client: requestReviewers');
        const client = initClient();
        yield client.pulls.requestReviewers({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            pull_number: getNumber(),
            reviewers: reviewers
        });
    });
}
exports.requestReviewers = requestReviewers;
function commitStatus(context, state, description, url) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        core.info('github-client: commitStatus');
        const client = initClient();
        function sendStatus(sha) {
            return __awaiter(this, void 0, void 0, function* () {
                yield client.repos.createCommitStatus({
                    owner: github.context.repo.owner,
                    repo: github.context.repo.repo,
                    sha: sha,
                    context: context,
                    state: state,
                    description: description,
                    target_url: url
                });
            });
        }
        if (github.context.payload.pull_request) {
            yield sendStatus((_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.head.sha);
            return;
        }
        if (github.context.payload.comment && ((_b = github.context.payload.issue) === null || _b === void 0 ? void 0 : _b.pull_request)) {
            const response = yield client.pulls.get({
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                pull_number: getNumber()
            });
            yield sendStatus(response.data.head.sha);
        }
    });
}
exports.commitStatus = commitStatus;
function hasReleaseByTag(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        core.info('github-client: getReleaseByTag');
        const client = initClient();
        const release = client.repos.getReleaseByTag({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            tag: tag
        });
        return release.then(() => true).catch(() => false);
    });
}
exports.hasReleaseByTag = hasReleaseByTag;


/***/ }),

/***/ 3109:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runGovernance = exports.getGovernance = void 0;
const core = __importStar(__nccwpck_require__(2186));
const github = __importStar(__nccwpck_require__(5438));
const config_1 = __nccwpck_require__(88);
const ignore_1 = __importDefault(__nccwpck_require__(1938));
const command_1 = __importDefault(__nccwpck_require__(524));
const operators_1 = __importDefault(__nccwpck_require__(9854));
const github_1 = __nccwpck_require__(5928);
/**
 * @return the current governance config based on the context, it could be 'pull_request' or 'issue'.
 */
function getGovernance() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const configPath = core.getInput('config-path', { required: true });
        const config = yield config_1.getConfig(github_1.initClient(), configPath);
        if (github.context.payload.comment) {
            if ((_a = github.context.payload.issue) === null || _a === void 0 ? void 0 : _a.pull_request) {
                return config.pull_request;
            }
            if (github.context.payload.issue) {
                return config.issue;
            }
        }
        if (github.context.payload.issue) {
            return config.issue;
        }
        if (github.context.payload.pull_request) {
            return config.pull_request;
        }
        throw new Error('Could not get pull_request or issue from context');
    });
}
exports.getGovernance = getGovernance;
/**
 * Get governance config, parse and run commands from context.
 */
function runGovernance() {
    return __awaiter(this, void 0, void 0, function* () {
        const governance = yield getGovernance();
        core.info('main: fetched governance.yml');
        if (!governance) {
            return;
        }
        core.info('main: parsing commands');
        const commands = yield command_1.default();
        core.info('main: running operations');
        yield operators_1.default(governance, commands);
        core.info('main: completed operations');
    });
}
exports.runGovernance = runGovernance;
/* eslint github/no-then: off */
ignore_1.default()
    .then((toIgnore) => __awaiter(void 0, void 0, void 0, function* () {
    if (toIgnore)
        return;
    yield runGovernance();
}))
    .catch(error => {
    core.error(error);
    core.setFailed(error);
});


/***/ }),

/***/ 7623:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __nccwpck_require__(524);
const github_1 = __nccwpck_require__(5928);
function parseLabel(capture, array) {
    return __awaiter(this, void 0, void 0, function* () {
        let capturedText = (array[1] || '').trim();
        if (capture.github_release) {
            // Automatically parse semantic release
            capturedText = capturedText.replace(/^v/, '');
            if (!(yield github_1.hasReleaseByTag(`v${capturedText}`)) &&
                !(yield github_1.hasReleaseByTag(capturedText))) {
                return;
            }
        }
        return capture.label.replace('$CAPTURED', capturedText);
    });
}
function default_1(capture) {
    return __awaiter(this, void 0, void 0, function* () {
        const regex = new RegExp(capture.regex, `${capture.ignore_case ? 'i' : ''}`);
        for (const line of command_1.getBody().split('\n')) {
            const array = regex.exec(line);
            if (!array) {
                continue;
            }
            const label = yield parseLabel(capture, array);
            if (label) {
                yield github_1.addLabels([label]);
            }
        }
    });
}
exports.default = default_1;


/***/ }),

/***/ 7357:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const github_1 = __nccwpck_require__(5928);
function default_1(chatOps, commands) {
    return __awaiter(this, void 0, void 0, function* () {
        const matched = commands.prefix(chatOps.cmd);
        if (!matched.length) {
            return;
        }
        const assignees = matched
            .flatMap(value => value.args)
            .map(value => {
            value = value.trim();
            if (value.startsWith('@')) {
                return value.replace(/^@/, '');
            }
        })
            .filter(value => value);
        yield github_1.assign(assignees);
    });
}
exports.default = default_1;


/***/ }),

/***/ 8487:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const github_1 = __nccwpck_require__(5928);
function default_1(chatOps, commands) {
    return __awaiter(this, void 0, void 0, function* () {
        const matched = commands.prefix(chatOps.cmd);
        if (!matched.length) {
            return;
        }
        yield github_1.patchIssue({
            state: 'closed'
        });
    });
}
exports.default = default_1;


/***/ }),

/***/ 3738:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const github_1 = __nccwpck_require__(5928);
function default_1(chatOps, commands) {
    return __awaiter(this, void 0, void 0, function* () {
        const matched = commands.prefix(chatOps.cmd);
        if (!matched.length) {
            return;
        }
        yield github_1.postComment(chatOps.comment);
    });
}
exports.default = default_1;


/***/ }),

/***/ 2251:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const github_1 = __nccwpck_require__(5928);
function default_1(chatOps, commands) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const matched = commands.prefix(chatOps.cmd);
        if (!matched.length) {
            return;
        }
        const add = (_a = chatOps.label) === null || _a === void 0 ? void 0 : _a.add;
        if (typeof add === 'string' && add) {
            yield github_1.addLabels([add]);
        }
        else if (Array.isArray(add)) {
            yield github_1.addLabels(add);
        }
        const remove = (_b = chatOps.label) === null || _b === void 0 ? void 0 : _b.remove;
        if (typeof remove === 'string' && remove) {
            yield github_1.removeLabels([remove]);
        }
        else if (Array.isArray(remove)) {
            yield github_1.removeLabels(remove);
        }
    });
}
exports.default = default_1;


/***/ }),

/***/ 2450:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const github_1 = __nccwpck_require__(5928);
function default_1(chatOps, commands) {
    return __awaiter(this, void 0, void 0, function* () {
        const matched = commands.prefix(chatOps.cmd);
        if (!matched.length) {
            return;
        }
        const reviewers = matched
            .flatMap(value => value.args)
            .map(value => {
            value = value.trim();
            if (value.startsWith('@')) {
                return value.replace(/^@/, '');
            }
        })
            .filter(value => value);
        yield github_1.requestReviewers(reviewers);
    });
}
exports.default = default_1;


/***/ }),

/***/ 9854:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const author_association_1 = __nccwpck_require__(9955);
const label_1 = __importDefault(__nccwpck_require__(6625));
const capture_1 = __importDefault(__nccwpck_require__(7623));
const close_1 = __importDefault(__nccwpck_require__(8487));
const comment_1 = __importDefault(__nccwpck_require__(3738));
const assign_1 = __importDefault(__nccwpck_require__(7357));
const review_1 = __importDefault(__nccwpck_require__(2450));
const label_2 = __importDefault(__nccwpck_require__(2251));
const ignore_1 = __nccwpck_require__(1938);
const core = __importStar(__nccwpck_require__(2186));
function processLabels(labels, commands) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const labelOp of labels) {
            yield label_1.default(labelOp, commands);
        }
    });
}
function processCaptures(captures) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ignore_1.isCreatedOpened()) {
            return;
        }
        for (const captureOp of captures) {
            if (author_association_1.isAuthorAssociationAllowed(captureOp.author_association)) {
                yield capture_1.default(captureOp);
            }
        }
    });
}
function processChatOps(chatOps, commands) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ignore_1.isCreatedOpened()) {
            return;
        }
        for (const chatOp of chatOps) {
            if (!author_association_1.isAuthorAssociationAllowed(chatOp.author_association)) {
                continue;
            }
            switch (chatOp.type) {
                case 'close':
                    yield close_1.default(chatOp, commands);
                    break;
                case 'assign':
                    yield assign_1.default(chatOp, commands);
                    break;
                case 'review':
                    yield review_1.default(chatOp, commands);
                    break;
                case 'comment':
                    yield comment_1.default(chatOp, commands);
                    break;
                case 'label':
                    yield label_2.default(chatOp, commands);
                    break;
            }
        }
    });
}
function default_1(governance, commands) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = governance.captures) === null || _a === void 0 ? void 0 : _a.length) {
            core.info('operations: processing captures');
            yield processCaptures(governance.captures);
        }
        if ((_b = governance.chat_ops) === null || _b === void 0 ? void 0 : _b.length) {
            core.info('operations: processing chatops');
            yield processChatOps(governance.chat_ops, commands);
        }
        if ((_c = governance.labels) === null || _c === void 0 ? void 0 : _c.length) {
            core.info('operations: processing labels');
            yield processLabels(governance.labels, commands);
        }
    });
}
exports.default = default_1;


/***/ }),

/***/ 6625:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const github_1 = __nccwpck_require__(5928);
const github = __importStar(__nccwpck_require__(5438));
const ignore_1 = __nccwpck_require__(1938);
const author_association_1 = __nccwpck_require__(9955);
class PrefixLabelSet {
    constructor(prefix) {
        this.needs = false;
        this.labels = new Set();
        this.existing = [];
        this.prefix = prefix;
        for (const label of github_1.getLabels()) {
            if (label === `needs/${prefix}`) {
                this.existing.push(label);
                this.needs = true;
            }
            else if (label.startsWith(`${prefix}/`)) {
                this.existing.push(label);
                this.add(label);
            }
        }
    }
    remove(label) {
        this.labels.delete(label);
    }
    add(label) {
        this.labels.add(label);
        this.last = label;
    }
    setMultiple(bool) {
        if (bool) {
            return;
        }
        this.labels.clear();
        if (this.last) {
            this.labels.add(this.last);
        }
    }
    setNeeds(bool) {
        this.needs = bool && this.labels.size === 0;
    }
    persist() {
        return __awaiter(this, void 0, void 0, function* () {
            const removes = [];
            const adds = [];
            for (const string of this.existing) {
                if (!this.labels.has(string)) {
                    removes.push(string);
                }
            }
            for (const label of this.labels) {
                if (!this.existing.includes(label)) {
                    adds.push(label);
                }
            }
            if (this.needs) {
                if (this.existing.includes(`needs/${this.prefix}`)) {
                    // don't remove
                    const index = removes.indexOf(`needs/${this.prefix}`);
                    if (index > -1) {
                        removes.splice(index, 1);
                    }
                }
                else {
                    // add missing
                    adds.push(`needs/${this.prefix}`);
                }
            }
            yield github_1.removeLabels(removes);
            yield github_1.addLabels(adds);
        });
    }
}
function default_1(label, commands) {
    return __awaiter(this, void 0, void 0, function* () {
        const labelSet = new PrefixLabelSet(label.prefix);
        /**
         * Check if labeled is required
         */
        function needs() {
            const needCommands = [
                ...commands.prefix(`/needs ${label.prefix}`),
                ...commands.prefix(`/need ${label.prefix}`)
            ];
            if (needCommands.length) {
                return true;
            }
            if (labelSet.needs) {
                return true;
            }
            return !!label.needs;
        }
        /**
         * Compute labels to add and remove
         * @return whether any prefixed label is present
         */
        function computeLabels() {
            const removing = commands
                .prefix(`/${label.prefix}-remove`)
                .flatMap(add => add.args.map(value => `${label.prefix}/${value}`));
            for (const value of removing) {
                labelSet.remove(value);
            }
            const adding = commands
                .prefix(`/${label.prefix}`)
                .flatMap(add => add.args
                .filter(value => label.list.includes(value))
                .map(value => `${label.prefix}/${value}`));
            for (const value of adding) {
                labelSet.add(value);
            }
        }
        if (ignore_1.isCreatedOpened() &&
            author_association_1.isAuthorAssociationAllowed(label.author_association)) {
            computeLabels();
        }
        labelSet.setMultiple(label.multiple === undefined || label.multiple);
        labelSet.setNeeds(needs());
        yield labelSet.persist();
        if (labelSet.needs) {
            yield sendComment(label);
        }
        yield sendStatus(label, !labelSet.needs);
    });
}
exports.default = default_1;
/**
 * This only run on opened action so that it's not duplicated everytime a user comment.
 *
 * @param label to send comment to
 */
function sendComment(label) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (github.context.payload.action !== 'opened') {
            return;
        }
        if (typeof label.needs === 'boolean') {
            return;
        }
        // Post comment if needs.comment is available
        const comment = (_a = label.needs) === null || _a === void 0 ? void 0 : _a.comment;
        if (comment) {
            yield github_1.postComment(comment);
        }
    });
}
function sendStatus(label, success) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof label.needs === 'boolean') {
            return;
        }
        const status = (_a = label.needs) === null || _a === void 0 ? void 0 : _a.status;
        if (!status) {
            return;
        }
        function description() {
            var _a, _b;
            if (typeof (status === null || status === void 0 ? void 0 : status.description) === 'string') {
                return status === null || status === void 0 ? void 0 : status.description;
            }
            if (success) {
                return (_a = status === null || status === void 0 ? void 0 : status.description) === null || _a === void 0 ? void 0 : _a.success;
            }
            return (_b = status === null || status === void 0 ? void 0 : status.description) === null || _b === void 0 ? void 0 : _b.failure;
        }
        function state() {
            var _a;
            if (success) {
                return 'success';
            }
            if (typeof (status === null || status === void 0 ? void 0 : status.description) === 'string') {
                return 'failure';
            }
            if (typeof ((_a = status === null || status === void 0 ? void 0 : status.description) === null || _a === void 0 ? void 0 : _a.failure) === 'string') {
                return 'failure';
            }
            return 'pending';
        }
        yield github_1.commitStatus(status.context, state(), description(), status.url);
    });
}


/***/ }),

/***/ 9955:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAuthorAssociationAllowed = void 0;
const github = __importStar(__nccwpck_require__(5438));
function getAuthorAssociation() {
    const payload = github.context.payload;
    const current = payload.comment || payload.pull_request || payload.issue;
    return current === null || current === void 0 ? void 0 : current.author_association;
}
function isCommentUserIssueAuthor() {
    var _a, _b, _c, _d;
    const payload = github.context.payload;
    return ((_b = (_a = payload.comment) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.login) === ((_d = (_c = payload.issue) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.login);
}
function isAuthorAssociationAllowed(authorAssociation) {
    if (!authorAssociation) {
        return true;
    }
    if (authorAssociation.author && isCommentUserIssueAuthor()) {
        return true;
    }
    switch (getAuthorAssociation()) {
        case 'COLLABORATOR':
            return !!authorAssociation.collaborator;
        case 'CONTRIBUTOR':
            return !!authorAssociation.contributor;
        case 'FIRST_TIMER':
            return !!authorAssociation.first_timer;
        case 'FIRST_TIME_CONTRIBUTOR':
            return !!authorAssociation.first_time_contributor;
        case 'MANNEQUIN':
            return !!authorAssociation.mannequin;
        case 'MEMBER':
            return !!authorAssociation.member;
        case 'NONE':
            return !!authorAssociation.none;
        case 'OWNER':
            return !!authorAssociation.owner;
        default:
            return false;
    }
}
exports.isAuthorAssociationAllowed = isAuthorAssociationAllowed;


/***/ }),

/***/ 1938:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isCreatedOpened = void 0;
const github = __importStar(__nccwpck_require__(5438));
const core = __importStar(__nccwpck_require__(2186));
const github_1 = __nccwpck_require__(5928);
function is(eventName, actions) {
    return (github.context.eventName === eventName &&
        actions.includes(github.context.payload.action));
}
/**
 * Ignore labeled race condition where it get created before needs labels.
 * Not sure what is a better way to do this.
 */
function ignoreLabeledRaceCondition() {
    var _a, _b, _c, _d, _e, _f, _g;
    const payload = github.context.payload;
    if (((_a = payload.sender) === null || _a === void 0 ? void 0 : _a.type) !== 'User' &&
        github.context.payload.action === 'labeled') {
        return false;
    }
    if (is('issues', ['labeled'])) {
        return (Date.parse((_b = payload.issue) === null || _b === void 0 ? void 0 : _b.created_at) + 5000 >=
            Date.parse((_c = payload.issue) === null || _c === void 0 ? void 0 : _c.updated_at));
    }
    if (is('pull_request', ['labeled'])) {
        return (Date.parse((_d = payload.pull_request) === null || _d === void 0 ? void 0 : _d.created_at) + 5000 >=
            Date.parse((_e = payload.pull_request) === null || _e === void 0 ? void 0 : _e.updated_at));
    }
    if (is('pull_request_target', ['labeled'])) {
        return (Date.parse((_f = payload.pull_request) === null || _f === void 0 ? void 0 : _f.created_at) + 5000 >=
            Date.parse((_g = payload.pull_request) === null || _g === void 0 ? void 0 : _g.updated_at));
    }
    return false;
}
/**
 * Ignore non 'User' to prevent infinite loop.
 */
function ignoreBot() {
    var _a, _b, _c, _d;
    const payload = github.context.payload;
    core.info(`ignore: ignore bot - type:${(_a = payload.sender) === null || _a === void 0 ? void 0 : _a.type} - login:${(_b = payload.sender) === null || _b === void 0 ? void 0 : _b.login}`);
    if (((_c = payload.sender) === null || _c === void 0 ? void 0 : _c.login) === 'dependabot[bot]') {
        return false;
    }
    return ((_d = payload.sender) === null || _d === void 0 ? void 0 : _d.type) !== 'User';
}
/**
 * Ignores if sender is self
 */
function ignoreSelf() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const payload = github.context.payload;
        // allow fail because with 'github-token' > 'resource not accessible by integration'
        try {
            return ((_a = payload.sender) === null || _a === void 0 ? void 0 : _a.id) === (yield github_1.getBotUserId());
        }
        catch (e) {
            return false;
        }
    });
}
/**
 * Closed issue and pull_request should not trigger governance
 */
function ignoreClosed() {
    var _a, _b;
    const payload = github.context.payload;
    if (((_a = payload === null || payload === void 0 ? void 0 : payload.pull_request) === null || _a === void 0 ? void 0 : _a.state) === 'closed') {
        return true;
    }
    if (((_b = payload === null || payload === void 0 ? void 0 : payload.issue) === null || _b === void 0 ? void 0 : _b.state) === 'closed') {
        return true;
    }
    return false;
}
/**
 * To prevent mistakes, this will ignore invalid workflow trigger
 */
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        if (ignoreClosed()) {
            core.info('ignore: closed');
            return true;
        }
        if (ignoreLabeledRaceCondition()) {
            core.info('ignore: labeled race condition');
            return true;
        }
        if (yield ignoreSelf()) {
            if (is('pull_request_target', ['synchronize', 'opened'])) {
                return false;
            }
            core.info('ignore: ignore self');
            return true;
        }
        if (is('issue_comment', ['created'])) {
            return ignoreBot();
        }
        if (is('pull_request', ['synchronize', 'opened'])) {
            return ignoreBot();
        }
        if (is('pull_request', ['labeled', 'unlabeled'])) {
            return false;
        }
        if (is('pull_request_target', ['synchronize', 'opened'])) {
            return ignoreBot();
        }
        if (is('pull_request_target', ['labeled', 'unlabeled'])) {
            return false;
        }
        if (is('issues', ['opened'])) {
            return ignoreBot();
        }
        if (is('issues', ['labeled', 'unlabeled'])) {
            return false;
        }
        core.info('ignore: catch all');
        return true;
    });
}
exports.default = default_1;
function isCreatedOpened() {
    if (is('issue_comment', ['created'])) {
        return true;
    }
    if (is('pull_request', ['opened'])) {
        return true;
    }
    if (is('pull_request_target', ['opened'])) {
        return true;
    }
    if (is('issues', ['opened'])) {
        return true;
    }
    return false;
}
exports.isCreatedOpened = isCreatedOpened;


/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2087));
const path = __importStar(__nccwpck_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(5747));
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 4087:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Context = void 0;
const fs_1 = __nccwpck_require__(5747);
const os_1 = __nccwpck_require__(2087);
class Context {
    /**
     * Hydrate the context from the environment
     */
    constructor() {
        this.payload = {};
        if (process.env.GITHUB_EVENT_PATH) {
            if (fs_1.existsSync(process.env.GITHUB_EVENT_PATH)) {
                this.payload = JSON.parse(fs_1.readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' }));
            }
            else {
                const path = process.env.GITHUB_EVENT_PATH;
                process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
            }
        }
        this.eventName = process.env.GITHUB_EVENT_NAME;
        this.sha = process.env.GITHUB_SHA;
        this.ref = process.env.GITHUB_REF;
        this.workflow = process.env.GITHUB_WORKFLOW;
        this.action = process.env.GITHUB_ACTION;
        this.actor = process.env.GITHUB_ACTOR;
        this.job = process.env.GITHUB_JOB;
        this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10);
        this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
    }
    get issue() {
        const payload = this.payload;
        return Object.assign(Object.assign({}, this.repo), { number: (payload.issue || payload.pull_request || payload).number });
    }
    get repo() {
        if (process.env.GITHUB_REPOSITORY) {
            const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
            return { owner, repo };
        }
        if (this.payload.repository) {
            return {
                owner: this.payload.repository.owner.login,
                repo: this.payload.repository.name
            };
        }
        throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map

/***/ }),

/***/ 5438:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOctokit = exports.context = void 0;
const Context = __importStar(__nccwpck_require__(4087));
const utils_1 = __nccwpck_require__(3030);
exports.context = new Context.Context();
/**
 * Returns a hydrated octokit ready to use for GitHub Actions
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokit(token, options) {
    return new utils_1.GitHub(utils_1.getOctokitOptions(token, options));
}
exports.getOctokit = getOctokit;
//# sourceMappingURL=github.js.map

/***/ }),

/***/ 7914:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getApiBaseUrl = exports.getProxyAgent = exports.getAuthString = void 0;
const httpClient = __importStar(__nccwpck_require__(9925));
function getAuthString(token, options) {
    if (!token && !options.auth) {
        throw new Error('Parameter token or opts.auth is required');
    }
    else if (token && options.auth) {
        throw new Error('Parameters token and opts.auth may not both be specified');
    }
    return typeof options.auth === 'string' ? options.auth : `token ${token}`;
}
exports.getAuthString = getAuthString;
function getProxyAgent(destinationUrl) {
    const hc = new httpClient.HttpClient();
    return hc.getAgent(destinationUrl);
}
exports.getProxyAgent = getProxyAgent;
function getApiBaseUrl() {
    return process.env['GITHUB_API_URL'] || 'https://api.github.com';
}
exports.getApiBaseUrl = getApiBaseUrl;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 3030:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOctokitOptions = exports.GitHub = exports.context = void 0;
const Context = __importStar(__nccwpck_require__(4087));
const Utils = __importStar(__nccwpck_require__(7914));
// octokit + plugins
const core_1 = __nccwpck_require__(6762);
const plugin_rest_endpoint_methods_1 = __nccwpck_require__(3044);
const plugin_paginate_rest_1 = __nccwpck_require__(4193);
exports.context = new Context.Context();
const baseUrl = Utils.getApiBaseUrl();
const defaults = {
    baseUrl,
    request: {
        agent: Utils.getProxyAgent(baseUrl)
    }
};
exports.GitHub = core_1.Octokit.plugin(plugin_rest_endpoint_methods_1.restEndpointMethods, plugin_paginate_rest_1.paginateRest).defaults(defaults);
/**
 * Convience function to correctly format Octokit Options to pass into the constructor.
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokitOptions(token, options) {
    const opts = Object.assign({}, options || {}); // Shallow clone - don't mutate the object provided by the caller
    // Auth
    const auth = Utils.getAuthString(token, opts);
    if (auth) {
        opts.auth = auth;
    }
    return opts;
}
exports.getOctokitOptions = getOctokitOptions;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 9925:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __nccwpck_require__(8605);
const https = __nccwpck_require__(7211);
const pm = __nccwpck_require__(6443);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __nccwpck_require__(4294);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`,
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 6443:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 334:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

async function auth(token) {
  const tokenType = token.split(/\./).length === 3 ? "app" : /^v\d+\./.test(token) ? "installation" : "oauth";
  return {
    type: "token",
    token: token,
    tokenType
  };
}

/**
 * Prefix token for usage in the Authorization header
 *
 * @param token OAuth token or JSON Web Token
 */
function withAuthorizationPrefix(token) {
  if (token.split(/\./).length === 3) {
    return `bearer ${token}`;
  }

  return `token ${token}`;
}

async function hook(token, request, route, parameters) {
  const endpoint = request.endpoint.merge(route, parameters);
  endpoint.headers.authorization = withAuthorizationPrefix(token);
  return request(endpoint);
}

const createTokenAuth = function createTokenAuth(token) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }

  if (typeof token !== "string") {
    throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
  }

  token = token.replace(/^(token|bearer) +/i, "");
  return Object.assign(auth.bind(null, token), {
    hook: hook.bind(null, token)
  });
};

exports.createTokenAuth = createTokenAuth;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 6762:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var universalUserAgent = __nccwpck_require__(5030);
var beforeAfterHook = __nccwpck_require__(3682);
var request = __nccwpck_require__(6234);
var graphql = __nccwpck_require__(8467);
var authToken = __nccwpck_require__(334);

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

const VERSION = "3.2.5";

class Octokit {
  constructor(options = {}) {
    const hook = new beforeAfterHook.Collection();
    const requestDefaults = {
      baseUrl: request.request.endpoint.DEFAULTS.baseUrl,
      headers: {},
      request: Object.assign({}, options.request, {
        hook: hook.bind(null, "request")
      }),
      mediaType: {
        previews: [],
        format: ""
      }
    }; // prepend default user agent with `options.userAgent` if set

    requestDefaults.headers["user-agent"] = [options.userAgent, `octokit-core.js/${VERSION} ${universalUserAgent.getUserAgent()}`].filter(Boolean).join(" ");

    if (options.baseUrl) {
      requestDefaults.baseUrl = options.baseUrl;
    }

    if (options.previews) {
      requestDefaults.mediaType.previews = options.previews;
    }

    if (options.timeZone) {
      requestDefaults.headers["time-zone"] = options.timeZone;
    }

    this.request = request.request.defaults(requestDefaults);
    this.graphql = graphql.withCustomRequest(this.request).defaults(requestDefaults);
    this.log = Object.assign({
      debug: () => {},
      info: () => {},
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    }, options.log);
    this.hook = hook; // (1) If neither `options.authStrategy` nor `options.auth` are set, the `octokit` instance
    //     is unauthenticated. The `this.auth()` method is a no-op and no request hook is registered.
    // (2) If only `options.auth` is set, use the default token authentication strategy.
    // (3) If `options.authStrategy` is set then use it and pass in `options.auth`. Always pass own request as many strategies accept a custom request instance.
    // TODO: type `options.auth` based on `options.authStrategy`.

    if (!options.authStrategy) {
      if (!options.auth) {
        // (1)
        this.auth = async () => ({
          type: "unauthenticated"
        });
      } else {
        // (2)
        const auth = authToken.createTokenAuth(options.auth); // @ts-ignore  ¯\_(ツ)_/¯

        hook.wrap("request", auth.hook);
        this.auth = auth;
      }
    } else {
      const {
        authStrategy
      } = options,
            otherOptions = _objectWithoutProperties(options, ["authStrategy"]);

      const auth = authStrategy(Object.assign({
        request: this.request,
        log: this.log,
        // we pass the current octokit instance as well as its constructor options
        // to allow for authentication strategies that return a new octokit instance
        // that shares the same internal state as the current one. The original
        // requirement for this was the "event-octokit" authentication strategy
        // of https://github.com/probot/octokit-auth-probot.
        octokit: this,
        octokitOptions: otherOptions
      }, options.auth)); // @ts-ignore  ¯\_(ツ)_/¯

      hook.wrap("request", auth.hook);
      this.auth = auth;
    } // apply plugins
    // https://stackoverflow.com/a/16345172


    const classConstructor = this.constructor;
    classConstructor.plugins.forEach(plugin => {
      Object.assign(this, plugin(this, options));
    });
  }

  static defaults(defaults) {
    const OctokitWithDefaults = class extends this {
      constructor(...args) {
        const options = args[0] || {};

        if (typeof defaults === "function") {
          super(defaults(options));
          return;
        }

        super(Object.assign({}, defaults, options, options.userAgent && defaults.userAgent ? {
          userAgent: `${options.userAgent} ${defaults.userAgent}`
        } : null));
      }

    };
    return OctokitWithDefaults;
  }
  /**
   * Attach a plugin (or many) to your Octokit instance.
   *
   * @example
   * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
   */


  static plugin(...newPlugins) {
    var _a;

    const currentPlugins = this.plugins;
    const NewOctokit = (_a = class extends this {}, _a.plugins = currentPlugins.concat(newPlugins.filter(plugin => !currentPlugins.includes(plugin))), _a);
    return NewOctokit;
  }

}
Octokit.VERSION = VERSION;
Octokit.plugins = [];

exports.Octokit = Octokit;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 9440:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var isPlainObject = __nccwpck_require__(3287);
var universalUserAgent = __nccwpck_require__(5030);

function lowercaseKeys(object) {
  if (!object) {
    return {};
  }

  return Object.keys(object).reduce((newObj, key) => {
    newObj[key.toLowerCase()] = object[key];
    return newObj;
  }, {});
}

function mergeDeep(defaults, options) {
  const result = Object.assign({}, defaults);
  Object.keys(options).forEach(key => {
    if (isPlainObject.isPlainObject(options[key])) {
      if (!(key in defaults)) Object.assign(result, {
        [key]: options[key]
      });else result[key] = mergeDeep(defaults[key], options[key]);
    } else {
      Object.assign(result, {
        [key]: options[key]
      });
    }
  });
  return result;
}

function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }

  return obj;
}

function merge(defaults, route, options) {
  if (typeof route === "string") {
    let [method, url] = route.split(" ");
    options = Object.assign(url ? {
      method,
      url
    } : {
      url: method
    }, options);
  } else {
    options = Object.assign({}, route);
  } // lowercase header names before merging with defaults to avoid duplicates


  options.headers = lowercaseKeys(options.headers); // remove properties with undefined values before merging

  removeUndefinedProperties(options);
  removeUndefinedProperties(options.headers);
  const mergedOptions = mergeDeep(defaults || {}, options); // mediaType.previews arrays are merged, instead of overwritten

  if (defaults && defaults.mediaType.previews.length) {
    mergedOptions.mediaType.previews = defaults.mediaType.previews.filter(preview => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
  }

  mergedOptions.mediaType.previews = mergedOptions.mediaType.previews.map(preview => preview.replace(/-preview/, ""));
  return mergedOptions;
}

function addQueryParameters(url, parameters) {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);

  if (names.length === 0) {
    return url;
  }

  return url + separator + names.map(name => {
    if (name === "q") {
      return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
    }

    return `${name}=${encodeURIComponent(parameters[name])}`;
  }).join("&");
}

const urlVariableRegex = /\{[^}]+\}/g;

function removeNonChars(variableName) {
  return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
}

function extractUrlVariableNames(url) {
  const matches = url.match(urlVariableRegex);

  if (!matches) {
    return [];
  }

  return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
}

function omit(object, keysToOmit) {
  return Object.keys(object).filter(option => !keysToOmit.includes(option)).reduce((obj, key) => {
    obj[key] = object[key];
    return obj;
  }, {});
}

// Based on https://github.com/bramstein/url-template, licensed under BSD
// TODO: create separate package.
//
// Copyright (c) 2012-2014, Bram Stein
// All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//  1. Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//  3. The name of the author may not be used to endorse or promote products
//     derived from this software without specific prior written permission.
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/* istanbul ignore file */
function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }

    return part;
  }).join("");
}

function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function encodeValue(operator, value, key) {
  value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);

  if (key) {
    return encodeUnreserved(key) + "=" + value;
  } else {
    return value;
  }
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
  return operator === ";" || operator === "&" || operator === "?";
}

function getValues(context, operator, key, modifier) {
  var value = context[key],
      result = [];

  if (isDefined(value) && value !== "") {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      value = value.toString();

      if (modifier && modifier !== "*") {
        value = value.substring(0, parseInt(modifier, 10));
      }

      result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
    } else {
      if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        const tmp = [];

        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            tmp.push(encodeValue(operator, value));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }

        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    }
  } else {
    if (operator === ";") {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(encodeUnreserved(key) + "=");
    } else if (value === "") {
      result.push("");
    }
  }

  return result;
}

function parseUrl(template) {
  return {
    expand: expand.bind(null, template)
  };
}

function expand(template, context) {
  var operators = ["+", "#", ".", "/", ";", "?", "&"];
  return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
    if (expression) {
      let operator = "";
      const values = [];

      if (operators.indexOf(expression.charAt(0)) !== -1) {
        operator = expression.charAt(0);
        expression = expression.substr(1);
      }

      expression.split(/,/g).forEach(function (variable) {
        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
        values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
      });

      if (operator && operator !== "+") {
        var separator = ",";

        if (operator === "?") {
          separator = "&";
        } else if (operator !== "#") {
          separator = operator;
        }

        return (values.length !== 0 ? operator : "") + values.join(separator);
      } else {
        return values.join(",");
      }
    } else {
      return encodeReserved(literal);
    }
  });
}

function parse(options) {
  // https://fetch.spec.whatwg.org/#methods
  let method = options.method.toUpperCase(); // replace :varname with {varname} to make it RFC 6570 compatible

  let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
  let headers = Object.assign({}, options.headers);
  let body;
  let parameters = omit(options, ["method", "baseUrl", "url", "headers", "request", "mediaType"]); // extract variable names from URL to calculate remaining variables later

  const urlVariableNames = extractUrlVariableNames(url);
  url = parseUrl(url).expand(parameters);

  if (!/^http/.test(url)) {
    url = options.baseUrl + url;
  }

  const omittedParameters = Object.keys(options).filter(option => urlVariableNames.includes(option)).concat("baseUrl");
  const remainingParameters = omit(parameters, omittedParameters);
  const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);

  if (!isBinaryRequest) {
    if (options.mediaType.format) {
      // e.g. application/vnd.github.v3+json => application/vnd.github.v3.raw
      headers.accept = headers.accept.split(/,/).map(preview => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
    }

    if (options.mediaType.previews.length) {
      const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
      headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map(preview => {
        const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
        return `application/vnd.github.${preview}-preview${format}`;
      }).join(",");
    }
  } // for GET/HEAD requests, set URL query parameters from remaining parameters
  // for PATCH/POST/PUT/DELETE requests, set request body from remaining parameters


  if (["GET", "HEAD"].includes(method)) {
    url = addQueryParameters(url, remainingParameters);
  } else {
    if ("data" in remainingParameters) {
      body = remainingParameters.data;
    } else {
      if (Object.keys(remainingParameters).length) {
        body = remainingParameters;
      } else {
        headers["content-length"] = 0;
      }
    }
  } // default content-type for JSON if body is set


  if (!headers["content-type"] && typeof body !== "undefined") {
    headers["content-type"] = "application/json; charset=utf-8";
  } // GitHub expects 'content-length: 0' header for PUT/PATCH requests without body.
  // fetch does not allow to set `content-length` header, but we can set body to an empty string


  if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
    body = "";
  } // Only return body/request keys if present


  return Object.assign({
    method,
    url,
    headers
  }, typeof body !== "undefined" ? {
    body
  } : null, options.request ? {
    request: options.request
  } : null);
}

function endpointWithDefaults(defaults, route, options) {
  return parse(merge(defaults, route, options));
}

function withDefaults(oldDefaults, newDefaults) {
  const DEFAULTS = merge(oldDefaults, newDefaults);
  const endpoint = endpointWithDefaults.bind(null, DEFAULTS);
  return Object.assign(endpoint, {
    DEFAULTS,
    defaults: withDefaults.bind(null, DEFAULTS),
    merge: merge.bind(null, DEFAULTS),
    parse
  });
}

const VERSION = "6.0.11";

const userAgent = `octokit-endpoint.js/${VERSION} ${universalUserAgent.getUserAgent()}`; // DEFAULTS has all properties set that EndpointOptions has, except url.
// So we use RequestParameters and add method as additional required property.

const DEFAULTS = {
  method: "GET",
  baseUrl: "https://api.github.com",
  headers: {
    accept: "application/vnd.github.v3+json",
    "user-agent": userAgent
  },
  mediaType: {
    format: "",
    previews: []
  }
};

const endpoint = withDefaults(null, DEFAULTS);

exports.endpoint = endpoint;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 8467:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var request = __nccwpck_require__(6234);
var universalUserAgent = __nccwpck_require__(5030);

const VERSION = "4.6.0";

class GraphqlError extends Error {
  constructor(request, response) {
    const message = response.data.errors[0].message;
    super(message);
    Object.assign(this, response.data);
    Object.assign(this, {
      headers: response.headers
    });
    this.name = "GraphqlError";
    this.request = request; // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

}

const NON_VARIABLE_OPTIONS = ["method", "baseUrl", "url", "headers", "request", "query", "mediaType"];
const GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
function graphql(request, query, options) {
  if (typeof query === "string" && options && "query" in options) {
    return Promise.reject(new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
  }

  const parsedOptions = typeof query === "string" ? Object.assign({
    query
  }, options) : query;
  const requestOptions = Object.keys(parsedOptions).reduce((result, key) => {
    if (NON_VARIABLE_OPTIONS.includes(key)) {
      result[key] = parsedOptions[key];
      return result;
    }

    if (!result.variables) {
      result.variables = {};
    }

    result.variables[key] = parsedOptions[key];
    return result;
  }, {}); // workaround for GitHub Enterprise baseUrl set with /api/v3 suffix
  // https://github.com/octokit/auth-app.js/issues/111#issuecomment-657610451

  const baseUrl = parsedOptions.baseUrl || request.endpoint.DEFAULTS.baseUrl;

  if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
    requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
  }

  return request(requestOptions).then(response => {
    if (response.data.errors) {
      const headers = {};

      for (const key of Object.keys(response.headers)) {
        headers[key] = response.headers[key];
      }

      throw new GraphqlError(requestOptions, {
        headers,
        data: response.data
      });
    }

    return response.data.data;
  });
}

function withDefaults(request$1, newDefaults) {
  const newRequest = request$1.defaults(newDefaults);

  const newApi = (query, options) => {
    return graphql(newRequest, query, options);
  };

  return Object.assign(newApi, {
    defaults: withDefaults.bind(null, newRequest),
    endpoint: request.request.endpoint
  });
}

const graphql$1 = withDefaults(request.request, {
  headers: {
    "user-agent": `octokit-graphql.js/${VERSION} ${universalUserAgent.getUserAgent()}`
  },
  method: "POST",
  url: "/graphql"
});
function withCustomRequest(customRequest) {
  return withDefaults(customRequest, {
    method: "POST",
    url: "/graphql"
  });
}

exports.graphql = graphql$1;
exports.withCustomRequest = withCustomRequest;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 4193:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const VERSION = "2.9.1";

/**
 * Some “list” response that can be paginated have a different response structure
 *
 * They have a `total_count` key in the response (search also has `incomplete_results`,
 * /installation/repositories also has `repository_selection`), as well as a key with
 * the list of the items which name varies from endpoint to endpoint.
 *
 * Octokit normalizes these responses so that paginated results are always returned following
 * the same structure. One challenge is that if the list response has only one page, no Link
 * header is provided, so this header alone is not sufficient to check wether a response is
 * paginated or not.
 *
 * We check if a "total_count" key is present in the response data, but also make sure that
 * a "url" property is not, as the "Get the combined status for a specific ref" endpoint would
 * otherwise match: https://developer.github.com/v3/repos/statuses/#get-the-combined-status-for-a-specific-ref
 */
function normalizePaginatedListResponse(response) {
  const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
  if (!responseNeedsNormalization) return response; // keep the additional properties intact as there is currently no other way
  // to retrieve the same information.

  const incompleteResults = response.data.incomplete_results;
  const repositorySelection = response.data.repository_selection;
  const totalCount = response.data.total_count;
  delete response.data.incomplete_results;
  delete response.data.repository_selection;
  delete response.data.total_count;
  const namespaceKey = Object.keys(response.data)[0];
  const data = response.data[namespaceKey];
  response.data = data;

  if (typeof incompleteResults !== "undefined") {
    response.data.incomplete_results = incompleteResults;
  }

  if (typeof repositorySelection !== "undefined") {
    response.data.repository_selection = repositorySelection;
  }

  response.data.total_count = totalCount;
  return response;
}

function iterator(octokit, route, parameters) {
  const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
  const requestMethod = typeof route === "function" ? route : octokit.request;
  const method = options.method;
  const headers = options.headers;
  let url = options.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!url) return {
          done: true
        };
        const response = await requestMethod({
          method,
          url,
          headers
        });
        const normalizedResponse = normalizePaginatedListResponse(response); // `response.headers.link` format:
        // '<https://api.github.com/users/aseemk/followers?page=2>; rel="next", <https://api.github.com/users/aseemk/followers?page=2>; rel="last"'
        // sets `url` to undefined if "next" URL is not present or `link` header is not set

        url = ((normalizedResponse.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) || [])[1];
        return {
          value: normalizedResponse
        };
      }

    })
  };
}

function paginate(octokit, route, parameters, mapFn) {
  if (typeof parameters === "function") {
    mapFn = parameters;
    parameters = undefined;
  }

  return gather(octokit, [], iterator(octokit, route, parameters)[Symbol.asyncIterator](), mapFn);
}

function gather(octokit, results, iterator, mapFn) {
  return iterator.next().then(result => {
    if (result.done) {
      return results;
    }

    let earlyExit = false;

    function done() {
      earlyExit = true;
    }

    results = results.concat(mapFn ? mapFn(result.value, done) : result.value.data);

    if (earlyExit) {
      return results;
    }

    return gather(octokit, results, iterator, mapFn);
  });
}

const composePaginateRest = Object.assign(paginate, {
  iterator
});

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */

function paginateRest(octokit) {
  return {
    paginate: Object.assign(paginate.bind(null, octokit), {
      iterator: iterator.bind(null, octokit)
    })
  };
}
paginateRest.VERSION = VERSION;

exports.composePaginateRest = composePaginateRest;
exports.paginateRest = paginateRest;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 3044:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const Endpoints = {
  actions: {
    addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    cancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"],
    createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
    createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    createRegistrationTokenForOrg: ["POST /orgs/{org}/actions/runners/registration-token"],
    createRegistrationTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/registration-token"],
    createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
    createRemoveTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/remove-token"],
    createWorkflowDispatch: ["POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"],
    deleteArtifact: ["DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
    deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    deleteSelfHostedRunnerFromOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}"],
    deleteSelfHostedRunnerFromRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
    deleteWorkflowRunLogs: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    disableSelectedRepositoryGithubActionsOrganization: ["DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    disableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"],
    downloadArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"],
    downloadJobLogsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"],
    downloadWorkflowRunLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    enableSelectedRepositoryGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    enableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"],
    getAllowedActionsOrganization: ["GET /orgs/{org}/actions/permissions/selected-actions"],
    getAllowedActionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    getGithubActionsPermissionsOrganization: ["GET /orgs/{org}/actions/permissions"],
    getGithubActionsPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions"],
    getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
    getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
    getRepoPermissions: ["GET /repos/{owner}/{repo}/actions/permissions", {}, {
      renamed: ["actions", "getGithubActionsPermissionsRepository"]
    }],
    getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
    getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
    getSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
    getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
    getWorkflowRunUsage: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"],
    getWorkflowUsage: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"],
    listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
    listJobsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"],
    listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
    listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
    listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
    listRunnerApplicationsForRepo: ["GET /repos/{owner}/{repo}/actions/runners/downloads"],
    listSelectedReposForOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    listSelectedRepositoriesEnabledGithubActionsOrganization: ["GET /orgs/{org}/actions/permissions/repositories"],
    listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
    listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
    listWorkflowRunArtifacts: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"],
    listWorkflowRuns: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"],
    listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
    reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
    removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    setAllowedActionsOrganization: ["PUT /orgs/{org}/actions/permissions/selected-actions"],
    setAllowedActionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions"],
    setGithubActionsPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions"],
    setSelectedReposForOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    setSelectedRepositoriesEnabledGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories"]
  },
  activity: {
    checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
    deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
    deleteThreadSubscription: ["DELETE /notifications/threads/{thread_id}/subscription"],
    getFeeds: ["GET /feeds"],
    getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
    getThread: ["GET /notifications/threads/{thread_id}"],
    getThreadSubscriptionForAuthenticatedUser: ["GET /notifications/threads/{thread_id}/subscription"],
    listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
    listNotificationsForAuthenticatedUser: ["GET /notifications"],
    listOrgEventsForAuthenticatedUser: ["GET /users/{username}/events/orgs/{org}"],
    listPublicEvents: ["GET /events"],
    listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
    listPublicEventsForUser: ["GET /users/{username}/events/public"],
    listPublicOrgEvents: ["GET /orgs/{org}/events"],
    listReceivedEventsForUser: ["GET /users/{username}/received_events"],
    listReceivedPublicEventsForUser: ["GET /users/{username}/received_events/public"],
    listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
    listRepoNotificationsForAuthenticatedUser: ["GET /repos/{owner}/{repo}/notifications"],
    listReposStarredByAuthenticatedUser: ["GET /user/starred"],
    listReposStarredByUser: ["GET /users/{username}/starred"],
    listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
    listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
    listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
    listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
    markNotificationsAsRead: ["PUT /notifications"],
    markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
    markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
    setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
    setThreadSubscription: ["PUT /notifications/threads/{thread_id}/subscription"],
    starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
    unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
  },
  apps: {
    addRepoToInstallation: ["PUT /user/installations/{installation_id}/repositories/{repository_id}"],
    checkToken: ["POST /applications/{client_id}/token"],
    createContentAttachment: ["POST /content_references/{content_reference_id}/attachments", {
      mediaType: {
        previews: ["corsair"]
      }
    }],
    createFromManifest: ["POST /app-manifests/{code}/conversions"],
    createInstallationAccessToken: ["POST /app/installations/{installation_id}/access_tokens"],
    deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
    deleteInstallation: ["DELETE /app/installations/{installation_id}"],
    deleteToken: ["DELETE /applications/{client_id}/token"],
    getAuthenticated: ["GET /app"],
    getBySlug: ["GET /apps/{app_slug}"],
    getInstallation: ["GET /app/installations/{installation_id}"],
    getOrgInstallation: ["GET /orgs/{org}/installation"],
    getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
    getSubscriptionPlanForAccount: ["GET /marketplace_listing/accounts/{account_id}"],
    getSubscriptionPlanForAccountStubbed: ["GET /marketplace_listing/stubbed/accounts/{account_id}"],
    getUserInstallation: ["GET /users/{username}/installation"],
    getWebhookConfigForApp: ["GET /app/hook/config"],
    listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
    listAccountsForPlanStubbed: ["GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"],
    listInstallationReposForAuthenticatedUser: ["GET /user/installations/{installation_id}/repositories"],
    listInstallations: ["GET /app/installations"],
    listInstallationsForAuthenticatedUser: ["GET /user/installations"],
    listPlans: ["GET /marketplace_listing/plans"],
    listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
    listReposAccessibleToInstallation: ["GET /installation/repositories"],
    listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
    listSubscriptionsForAuthenticatedUserStubbed: ["GET /user/marketplace_purchases/stubbed"],
    removeRepoFromInstallation: ["DELETE /user/installations/{installation_id}/repositories/{repository_id}"],
    resetToken: ["PATCH /applications/{client_id}/token"],
    revokeInstallationAccessToken: ["DELETE /installation/token"],
    scopeToken: ["POST /applications/{client_id}/token/scoped"],
    suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
    unsuspendInstallation: ["DELETE /app/installations/{installation_id}/suspended"],
    updateWebhookConfigForApp: ["PATCH /app/hook/config"]
  },
  billing: {
    getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
    getGithubActionsBillingUser: ["GET /users/{username}/settings/billing/actions"],
    getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
    getGithubPackagesBillingUser: ["GET /users/{username}/settings/billing/packages"],
    getSharedStorageBillingOrg: ["GET /orgs/{org}/settings/billing/shared-storage"],
    getSharedStorageBillingUser: ["GET /users/{username}/settings/billing/shared-storage"]
  },
  checks: {
    create: ["POST /repos/{owner}/{repo}/check-runs"],
    createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
    get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
    getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
    listAnnotations: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"],
    listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
    listForSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"],
    listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
    rerequestSuite: ["POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"],
    setSuitesPreferences: ["PATCH /repos/{owner}/{repo}/check-suites/preferences"],
    update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
  },
  codeScanning: {
    getAlert: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}", {}, {
      renamedParameters: {
        alert_id: "alert_number"
      }
    }],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
    listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"],
    uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
  },
  codesOfConduct: {
    getAllCodesOfConduct: ["GET /codes_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }],
    getConductCode: ["GET /codes_of_conduct/{key}", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }],
    getForRepo: ["GET /repos/{owner}/{repo}/community/code_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }]
  },
  emojis: {
    get: ["GET /emojis"]
  },
  enterpriseAdmin: {
    disableSelectedOrganizationGithubActionsEnterprise: ["DELETE /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    enableSelectedOrganizationGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    getAllowedActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/selected-actions"],
    getGithubActionsPermissionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions"],
    listSelectedOrganizationsEnabledGithubActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/organizations"],
    setAllowedActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions"],
    setSelectedOrganizationsEnabledGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations"]
  },
  gists: {
    checkIsStarred: ["GET /gists/{gist_id}/star"],
    create: ["POST /gists"],
    createComment: ["POST /gists/{gist_id}/comments"],
    delete: ["DELETE /gists/{gist_id}"],
    deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
    fork: ["POST /gists/{gist_id}/forks"],
    get: ["GET /gists/{gist_id}"],
    getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
    getRevision: ["GET /gists/{gist_id}/{sha}"],
    list: ["GET /gists"],
    listComments: ["GET /gists/{gist_id}/comments"],
    listCommits: ["GET /gists/{gist_id}/commits"],
    listForUser: ["GET /users/{username}/gists"],
    listForks: ["GET /gists/{gist_id}/forks"],
    listPublic: ["GET /gists/public"],
    listStarred: ["GET /gists/starred"],
    star: ["PUT /gists/{gist_id}/star"],
    unstar: ["DELETE /gists/{gist_id}/star"],
    update: ["PATCH /gists/{gist_id}"],
    updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
  },
  git: {
    createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
    createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
    createRef: ["POST /repos/{owner}/{repo}/git/refs"],
    createTag: ["POST /repos/{owner}/{repo}/git/tags"],
    createTree: ["POST /repos/{owner}/{repo}/git/trees"],
    deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
    getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
    getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
    getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
    getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
    getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
    listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
    updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
  },
  gitignore: {
    getAllTemplates: ["GET /gitignore/templates"],
    getTemplate: ["GET /gitignore/templates/{name}"]
  },
  interactions: {
    getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
    getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
    getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
    getRestrictionsForYourPublicRepos: ["GET /user/interaction-limits", {}, {
      renamed: ["interactions", "getRestrictionsForAuthenticatedUser"]
    }],
    removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
    removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
    removeRestrictionsForRepo: ["DELETE /repos/{owner}/{repo}/interaction-limits"],
    removeRestrictionsForYourPublicRepos: ["DELETE /user/interaction-limits", {}, {
      renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"]
    }],
    setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
    setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
    setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
    setRestrictionsForYourPublicRepos: ["PUT /user/interaction-limits", {}, {
      renamed: ["interactions", "setRestrictionsForAuthenticatedUser"]
    }]
  },
  issues: {
    addAssignees: ["POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
    create: ["POST /repos/{owner}/{repo}/issues"],
    createComment: ["POST /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    createLabel: ["POST /repos/{owner}/{repo}/labels"],
    createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
    deleteComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
    deleteMilestone: ["DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"],
    get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
    getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
    getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
    getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
    list: ["GET /issues"],
    listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
    listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
    listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
    listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
    listEventsForTimeline: ["GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", {
      mediaType: {
        previews: ["mockingbird"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/issues"],
    listForOrg: ["GET /orgs/{org}/issues"],
    listForRepo: ["GET /repos/{owner}/{repo}/issues"],
    listLabelsForMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"],
    listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
    listLabelsOnIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
    lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    removeAllLabels: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    removeAssignees: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    removeLabel: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"],
    setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
    updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
    updateMilestone: ["PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"]
  },
  licenses: {
    get: ["GET /licenses/{license}"],
    getAllCommonlyUsed: ["GET /licenses"],
    getForRepo: ["GET /repos/{owner}/{repo}/license"]
  },
  markdown: {
    render: ["POST /markdown"],
    renderRaw: ["POST /markdown/raw", {
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    }]
  },
  meta: {
    get: ["GET /meta"],
    getOctocat: ["GET /octocat"],
    getZen: ["GET /zen"],
    root: ["GET /"]
  },
  migrations: {
    cancelImport: ["DELETE /repos/{owner}/{repo}/import"],
    deleteArchiveForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    deleteArchiveForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    downloadArchiveForOrg: ["GET /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getArchiveForAuthenticatedUser: ["GET /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getCommitAuthors: ["GET /repos/{owner}/{repo}/import/authors"],
    getImportStatus: ["GET /repos/{owner}/{repo}/import"],
    getLargeFiles: ["GET /repos/{owner}/{repo}/import/large_files"],
    getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForUser: ["GET /user/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    mapCommitAuthor: ["PATCH /repos/{owner}/{repo}/import/authors/{author_id}"],
    setLfsPreference: ["PATCH /repos/{owner}/{repo}/import/lfs"],
    startForAuthenticatedUser: ["POST /user/migrations"],
    startForOrg: ["POST /orgs/{org}/migrations"],
    startImport: ["PUT /repos/{owner}/{repo}/import"],
    unlockRepoForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    unlockRepoForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    updateImport: ["PATCH /repos/{owner}/{repo}/import"]
  },
  orgs: {
    blockUser: ["PUT /orgs/{org}/blocks/{username}"],
    cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
    checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
    checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
    checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
    convertMemberToOutsideCollaborator: ["PUT /orgs/{org}/outside_collaborators/{username}"],
    createInvitation: ["POST /orgs/{org}/invitations"],
    createWebhook: ["POST /orgs/{org}/hooks"],
    deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
    get: ["GET /orgs/{org}"],
    getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
    getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
    getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
    getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
    list: ["GET /organizations"],
    listAppInstallations: ["GET /orgs/{org}/installations"],
    listBlockedUsers: ["GET /orgs/{org}/blocks"],
    listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
    listForAuthenticatedUser: ["GET /user/orgs"],
    listForUser: ["GET /users/{username}/orgs"],
    listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
    listMembers: ["GET /orgs/{org}/members"],
    listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
    listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
    listPendingInvitations: ["GET /orgs/{org}/invitations"],
    listPublicMembers: ["GET /orgs/{org}/public_members"],
    listWebhooks: ["GET /orgs/{org}/hooks"],
    pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
    removeMember: ["DELETE /orgs/{org}/members/{username}"],
    removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
    removeOutsideCollaborator: ["DELETE /orgs/{org}/outside_collaborators/{username}"],
    removePublicMembershipForAuthenticatedUser: ["DELETE /orgs/{org}/public_members/{username}"],
    setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
    setPublicMembershipForAuthenticatedUser: ["PUT /orgs/{org}/public_members/{username}"],
    unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
    update: ["PATCH /orgs/{org}"],
    updateMembershipForAuthenticatedUser: ["PATCH /user/memberships/orgs/{org}"],
    updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
    updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
  },
  projects: {
    addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createCard: ["POST /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createColumn: ["POST /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForAuthenticatedUser: ["POST /user/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForOrg: ["POST /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForRepo: ["POST /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    delete: ["DELETE /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteCard: ["DELETE /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteColumn: ["DELETE /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    get: ["GET /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getCard: ["GET /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getColumn: ["GET /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getPermissionForUser: ["GET /projects/{project_id}/collaborators/{username}/permission", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCards: ["GET /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCollaborators: ["GET /projects/{project_id}/collaborators", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listColumns: ["GET /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForRepo: ["GET /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForUser: ["GET /users/{username}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveCard: ["POST /projects/columns/cards/{card_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveColumn: ["POST /projects/columns/{column_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    removeCollaborator: ["DELETE /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    update: ["PATCH /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateCard: ["PATCH /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateColumn: ["PATCH /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }]
  },
  pulls: {
    checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    create: ["POST /repos/{owner}/{repo}/pulls"],
    createReplyForReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"],
    createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    createReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    deletePendingReview: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    deleteReviewComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    dismissReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"],
    get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
    getReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    list: ["GET /repos/{owner}/{repo}/pulls"],
    listCommentsForReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"],
    listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
    listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
    listRequestedReviewers: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    listReviewComments: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
    listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    removeRequestedReviewers: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    requestReviewers: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    submitReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"],
    update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
    updateBranch: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch", {
      mediaType: {
        previews: ["lydian"]
      }
    }],
    updateReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    updateReviewComment: ["PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"]
  },
  rateLimit: {
    get: ["GET /rate_limit"]
  },
  reactions: {
    createForCommitComment: ["POST /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssueComment: ["POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForPullRequestReviewComment: ["POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssueComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForPullRequestComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussion: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussionComment: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteLegacy: ["DELETE /reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }, {
      deprecated: "octokit.reactions.deleteLegacy() is deprecated, see https://docs.github.com/v3/reactions/#delete-a-reaction-legacy"
    }],
    listForCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssueComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForPullRequestReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }]
  },
  repos: {
    acceptInvitation: ["PATCH /user/repository_invitations/{invitation_id}"],
    addAppAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
    addStatusCheckContexts: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    addTeamAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    addUserAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
    checkVulnerabilityAlerts: ["GET /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
    createCommitComment: ["POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    createCommitSignatureProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
    createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
    createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
    createDeploymentStatus: ["POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
    createForAuthenticatedUser: ["POST /user/repos"],
    createFork: ["POST /repos/{owner}/{repo}/forks"],
    createInOrg: ["POST /orgs/{org}/repos"],
    createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
    createPagesSite: ["POST /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    createRelease: ["POST /repos/{owner}/{repo}/releases"],
    createUsingTemplate: ["POST /repos/{template_owner}/{template_repo}/generate", {
      mediaType: {
        previews: ["baptiste"]
      }
    }],
    createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
    declineInvitation: ["DELETE /user/repository_invitations/{invitation_id}"],
    delete: ["DELETE /repos/{owner}/{repo}"],
    deleteAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    deleteAdminBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    deleteBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection"],
    deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
    deleteCommitSignatureProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
    deleteDeployment: ["DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"],
    deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
    deleteInvitation: ["DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"],
    deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    deletePullRequestReviewProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
    deleteReleaseAsset: ["DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
    disableAutomatedSecurityFixes: ["DELETE /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    disableVulnerabilityAlerts: ["DELETE /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    downloadArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}", {}, {
      renamed: ["repos", "downloadZipballArchive"]
    }],
    downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
    downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
    enableAutomatedSecurityFixes: ["PUT /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    enableVulnerabilityAlerts: ["PUT /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    get: ["GET /repos/{owner}/{repo}"],
    getAccessRestrictions: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    getAdminBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    getAllStatusCheckContexts: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"],
    getAllTopics: ["GET /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    getAppsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"],
    getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
    getBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection"],
    getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
    getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
    getCollaboratorPermissionLevel: ["GET /repos/{owner}/{repo}/collaborators/{username}/permission"],
    getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
    getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
    getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
    getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
    getCommitSignatureProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
    getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
    getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
    getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
    getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
    getDeploymentStatus: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"],
    getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
    getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
    getPages: ["GET /repos/{owner}/{repo}/pages"],
    getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
    getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
    getPullRequestReviewProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
    getReadme: ["GET /repos/{owner}/{repo}/readme"],
    getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
    getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
    getStatusChecksProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    getTeamsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"],
    getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
    getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
    getUsersWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"],
    getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
    getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
    getWebhookConfigForRepo: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    listBranches: ["GET /repos/{owner}/{repo}/branches"],
    listBranchesForHeadCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
    listCommentsForCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
    listCommitStatusesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/statuses"],
    listCommits: ["GET /repos/{owner}/{repo}/commits"],
    listContributors: ["GET /repos/{owner}/{repo}/contributors"],
    listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
    listDeploymentStatuses: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
    listForAuthenticatedUser: ["GET /user/repos"],
    listForOrg: ["GET /orgs/{org}/repos"],
    listForUser: ["GET /users/{username}/repos"],
    listForks: ["GET /repos/{owner}/{repo}/forks"],
    listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
    listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
    listLanguages: ["GET /repos/{owner}/{repo}/languages"],
    listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
    listPublic: ["GET /repositories"],
    listPullRequestsAssociatedWithCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listReleaseAssets: ["GET /repos/{owner}/{repo}/releases/{release_id}/assets"],
    listReleases: ["GET /repos/{owner}/{repo}/releases"],
    listTags: ["GET /repos/{owner}/{repo}/tags"],
    listTeams: ["GET /repos/{owner}/{repo}/teams"],
    listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
    merge: ["POST /repos/{owner}/{repo}/merges"],
    pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
    removeAppAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    removeCollaborator: ["DELETE /repos/{owner}/{repo}/collaborators/{username}"],
    removeStatusCheckContexts: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    removeStatusCheckProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    removeTeamAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    removeUserAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
    replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
    setAdminBranchProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    setAppAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    setStatusCheckContexts: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    setTeamAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    setUserAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
    transfer: ["POST /repos/{owner}/{repo}/transfer"],
    update: ["PATCH /repos/{owner}/{repo}"],
    updateBranchProtection: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection"],
    updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
    updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
    updateInvitation: ["PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"],
    updatePullRequestReviewProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
    updateReleaseAsset: ["PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    updateStatusCheckPotection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks", {}, {
      renamed: ["repos", "updateStatusCheckProtection"]
    }],
    updateStatusCheckProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
    updateWebhookConfigForRepo: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    uploadReleaseAsset: ["POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}", {
      baseUrl: "https://uploads.github.com"
    }]
  },
  search: {
    code: ["GET /search/code"],
    commits: ["GET /search/commits", {
      mediaType: {
        previews: ["cloak"]
      }
    }],
    issuesAndPullRequests: ["GET /search/issues"],
    labels: ["GET /search/labels"],
    repos: ["GET /search/repositories"],
    topics: ["GET /search/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    users: ["GET /search/users"]
  },
  secretScanning: {
    getAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"]
  },
  teams: {
    addOrUpdateMembershipForUserInOrg: ["PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    addOrUpdateProjectPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    addOrUpdateRepoPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    checkPermissionsForProjectInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    checkPermissionsForRepoInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    create: ["POST /orgs/{org}/teams"],
    createDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
    deleteDiscussionCommentInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    deleteDiscussionInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
    getByName: ["GET /orgs/{org}/teams/{team_slug}"],
    getDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    getDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    getMembershipForUserInOrg: ["GET /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    list: ["GET /orgs/{org}/teams"],
    listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
    listDiscussionCommentsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
    listForAuthenticatedUser: ["GET /user/teams"],
    listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
    listPendingInvitationsInOrg: ["GET /orgs/{org}/teams/{team_slug}/invitations"],
    listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
    removeMembershipForUserInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    removeProjectInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"],
    removeRepoInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    updateDiscussionCommentInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    updateDiscussionInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
  },
  users: {
    addEmailForAuthenticated: ["POST /user/emails"],
    block: ["PUT /user/blocks/{username}"],
    checkBlocked: ["GET /user/blocks/{username}"],
    checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
    checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
    createGpgKeyForAuthenticated: ["POST /user/gpg_keys"],
    createPublicSshKeyForAuthenticated: ["POST /user/keys"],
    deleteEmailForAuthenticated: ["DELETE /user/emails"],
    deleteGpgKeyForAuthenticated: ["DELETE /user/gpg_keys/{gpg_key_id}"],
    deletePublicSshKeyForAuthenticated: ["DELETE /user/keys/{key_id}"],
    follow: ["PUT /user/following/{username}"],
    getAuthenticated: ["GET /user"],
    getByUsername: ["GET /users/{username}"],
    getContextForUser: ["GET /users/{username}/hovercard"],
    getGpgKeyForAuthenticated: ["GET /user/gpg_keys/{gpg_key_id}"],
    getPublicSshKeyForAuthenticated: ["GET /user/keys/{key_id}"],
    list: ["GET /users"],
    listBlockedByAuthenticated: ["GET /user/blocks"],
    listEmailsForAuthenticated: ["GET /user/emails"],
    listFollowedByAuthenticated: ["GET /user/following"],
    listFollowersForAuthenticatedUser: ["GET /user/followers"],
    listFollowersForUser: ["GET /users/{username}/followers"],
    listFollowingForUser: ["GET /users/{username}/following"],
    listGpgKeysForAuthenticated: ["GET /user/gpg_keys"],
    listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
    listPublicEmailsForAuthenticated: ["GET /user/public_emails"],
    listPublicKeysForUser: ["GET /users/{username}/keys"],
    listPublicSshKeysForAuthenticated: ["GET /user/keys"],
    setPrimaryEmailVisibilityForAuthenticated: ["PATCH /user/email/visibility"],
    unblock: ["DELETE /user/blocks/{username}"],
    unfollow: ["DELETE /user/following/{username}"],
    updateAuthenticated: ["PATCH /user"]
  }
};

const VERSION = "4.10.1";

function endpointsToMethods(octokit, endpointsMap) {
  const newMethods = {};

  for (const [scope, endpoints] of Object.entries(endpointsMap)) {
    for (const [methodName, endpoint] of Object.entries(endpoints)) {
      const [route, defaults, decorations] = endpoint;
      const [method, url] = route.split(/ /);
      const endpointDefaults = Object.assign({
        method,
        url
      }, defaults);

      if (!newMethods[scope]) {
        newMethods[scope] = {};
      }

      const scopeMethods = newMethods[scope];

      if (decorations) {
        scopeMethods[methodName] = decorate(octokit, scope, methodName, endpointDefaults, decorations);
        continue;
      }

      scopeMethods[methodName] = octokit.request.defaults(endpointDefaults);
    }
  }

  return newMethods;
}

function decorate(octokit, scope, methodName, defaults, decorations) {
  const requestWithDefaults = octokit.request.defaults(defaults);
  /* istanbul ignore next */

  function withDecorations(...args) {
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
    let options = requestWithDefaults.endpoint.merge(...args); // There are currently no other decorations than `.mapToData`

    if (decorations.mapToData) {
      options = Object.assign({}, options, {
        data: options[decorations.mapToData],
        [decorations.mapToData]: undefined
      });
      return requestWithDefaults(options);
    }

    if (decorations.renamed) {
      const [newScope, newMethodName] = decorations.renamed;
      octokit.log.warn(`octokit.${scope}.${methodName}() has been renamed to octokit.${newScope}.${newMethodName}()`);
    }

    if (decorations.deprecated) {
      octokit.log.warn(decorations.deprecated);
    }

    if (decorations.renamedParameters) {
      // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
      const options = requestWithDefaults.endpoint.merge(...args);

      for (const [name, alias] of Object.entries(decorations.renamedParameters)) {
        if (name in options) {
          octokit.log.warn(`"${name}" parameter is deprecated for "octokit.${scope}.${methodName}()". Use "${alias}" instead`);

          if (!(alias in options)) {
            options[alias] = options[name];
          }

          delete options[name];
        }
      }

      return requestWithDefaults(options);
    } // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488


    return requestWithDefaults(...args);
  }

  return Object.assign(withDecorations, requestWithDefaults);
}

/**
 * This plugin is a 1:1 copy of internal @octokit/rest plugins. The primary
 * goal is to rebuild @octokit/rest on top of @octokit/core. Once that is
 * done, we will remove the registerEndpoints methods and return the methods
 * directly as with the other plugins. At that point we will also remove the
 * legacy workarounds and deprecations.
 *
 * See the plan at
 * https://github.com/octokit/plugin-rest-endpoint-methods.js/pull/1
 */

function restEndpointMethods(octokit) {
  return endpointsToMethods(octokit, Endpoints);
}
restEndpointMethods.VERSION = VERSION;

exports.restEndpointMethods = restEndpointMethods;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 537:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var deprecation = __nccwpck_require__(8932);
var once = _interopDefault(__nccwpck_require__(1223));

const logOnce = once(deprecation => console.warn(deprecation));
/**
 * Error with extra properties to help with debugging
 */

class RequestError extends Error {
  constructor(message, statusCode, options) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = "HttpError";
    this.status = statusCode;
    Object.defineProperty(this, "code", {
      get() {
        logOnce(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
        return statusCode;
      }

    });
    this.headers = options.headers || {}; // redact request credentials without mutating original request options

    const requestCopy = Object.assign({}, options.request);

    if (options.request.headers.authorization) {
      requestCopy.headers = Object.assign({}, options.request.headers, {
        authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
      });
    }

    requestCopy.url = requestCopy.url // client_id & client_secret can be passed as URL query parameters to increase rate limit
    // see https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications
    .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]") // OAuth tokens can be passed as URL query parameters, although it is not recommended
    // see https://developer.github.com/v3/#oauth2-token-sent-in-a-header
    .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
    this.request = requestCopy;
  }

}

exports.RequestError = RequestError;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 6234:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var endpoint = __nccwpck_require__(9440);
var universalUserAgent = __nccwpck_require__(5030);
var isPlainObject = __nccwpck_require__(3287);
var nodeFetch = _interopDefault(__nccwpck_require__(467));
var requestError = __nccwpck_require__(537);

const VERSION = "5.4.14";

function getBufferResponse(response) {
  return response.arrayBuffer();
}

function fetchWrapper(requestOptions) {
  if (isPlainObject.isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }

  let headers = {};
  let status;
  let url;
  const fetch = requestOptions.request && requestOptions.request.fetch || nodeFetch;
  return fetch(requestOptions.url, Object.assign({
    method: requestOptions.method,
    body: requestOptions.body,
    headers: requestOptions.headers,
    redirect: requestOptions.redirect
  }, requestOptions.request)).then(response => {
    url = response.url;
    status = response.status;

    for (const keyAndValue of response.headers) {
      headers[keyAndValue[0]] = keyAndValue[1];
    }

    if (status === 204 || status === 205) {
      return;
    } // GitHub API returns 200 for HEAD requests


    if (requestOptions.method === "HEAD") {
      if (status < 400) {
        return;
      }

      throw new requestError.RequestError(response.statusText, status, {
        headers,
        request: requestOptions
      });
    }

    if (status === 304) {
      throw new requestError.RequestError("Not modified", status, {
        headers,
        request: requestOptions
      });
    }

    if (status >= 400) {
      return response.text().then(message => {
        const error = new requestError.RequestError(message, status, {
          headers,
          request: requestOptions
        });

        try {
          let responseBody = JSON.parse(error.message);
          Object.assign(error, responseBody);
          let errors = responseBody.errors; // Assumption `errors` would always be in Array format

          error.message = error.message + ": " + errors.map(JSON.stringify).join(", ");
        } catch (e) {// ignore, see octokit/rest.js#684
        }

        throw error;
      });
    }

    const contentType = response.headers.get("content-type");

    if (/application\/json/.test(contentType)) {
      return response.json();
    }

    if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
      return response.text();
    }

    return getBufferResponse(response);
  }).then(data => {
    return {
      status,
      url,
      headers,
      data
    };
  }).catch(error => {
    if (error instanceof requestError.RequestError) {
      throw error;
    }

    throw new requestError.RequestError(error.message, 500, {
      headers,
      request: requestOptions
    });
  });
}

function withDefaults(oldEndpoint, newDefaults) {
  const endpoint = oldEndpoint.defaults(newDefaults);

  const newApi = function (route, parameters) {
    const endpointOptions = endpoint.merge(route, parameters);

    if (!endpointOptions.request || !endpointOptions.request.hook) {
      return fetchWrapper(endpoint.parse(endpointOptions));
    }

    const request = (route, parameters) => {
      return fetchWrapper(endpoint.parse(endpoint.merge(route, parameters)));
    };

    Object.assign(request, {
      endpoint,
      defaults: withDefaults.bind(null, endpoint)
    });
    return endpointOptions.request.hook(request, endpointOptions);
  };

  return Object.assign(newApi, {
    endpoint,
    defaults: withDefaults.bind(null, endpoint)
  });
}

const request = withDefaults(endpoint.endpoint, {
  headers: {
    "user-agent": `octokit-request.js/${VERSION} ${universalUserAgent.getUserAgent()}`
  }
});

exports.request = request;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 3682:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var register = __nccwpck_require__(4670)
var addHook = __nccwpck_require__(5549)
var removeHook = __nccwpck_require__(6819)

// bind with array of arguments: https://stackoverflow.com/a/21792913
var bind = Function.bind
var bindable = bind.bind(bind)

function bindApi (hook, state, name) {
  var removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state])
  hook.api = { remove: removeHookRef }
  hook.remove = removeHookRef

  ;['before', 'error', 'after', 'wrap'].forEach(function (kind) {
    var args = name ? [state, kind, name] : [state, kind]
    hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args)
  })
}

function HookSingular () {
  var singularHookName = 'h'
  var singularHookState = {
    registry: {}
  }
  var singularHook = register.bind(null, singularHookState, singularHookName)
  bindApi(singularHook, singularHookState, singularHookName)
  return singularHook
}

function HookCollection () {
  var state = {
    registry: {}
  }

  var hook = register.bind(null, state)
  bindApi(hook, state)

  return hook
}

var collectionHookDeprecationMessageDisplayed = false
function Hook () {
  if (!collectionHookDeprecationMessageDisplayed) {
    console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4')
    collectionHookDeprecationMessageDisplayed = true
  }
  return HookCollection()
}

Hook.Singular = HookSingular.bind()
Hook.Collection = HookCollection.bind()

module.exports = Hook
// expose constructors as a named property for TypeScript
module.exports.Hook = Hook
module.exports.Singular = Hook.Singular
module.exports.Collection = Hook.Collection


/***/ }),

/***/ 5549:
/***/ ((module) => {

module.exports = addHook;

function addHook(state, kind, name, hook) {
  var orig = hook;
  if (!state.registry[name]) {
    state.registry[name] = [];
  }

  if (kind === "before") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(orig.bind(null, options))
        .then(method.bind(null, options));
    };
  }

  if (kind === "after") {
    hook = function (method, options) {
      var result;
      return Promise.resolve()
        .then(method.bind(null, options))
        .then(function (result_) {
          result = result_;
          return orig(result, options);
        })
        .then(function () {
          return result;
        });
    };
  }

  if (kind === "error") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(method.bind(null, options))
        .catch(function (error) {
          return orig(error, options);
        });
    };
  }

  state.registry[name].push({
    hook: hook,
    orig: orig,
  });
}


/***/ }),

/***/ 4670:
/***/ ((module) => {

module.exports = register;

function register(state, name, method, options) {
  if (typeof method !== "function") {
    throw new Error("method for before hook must be a function");
  }

  if (!options) {
    options = {};
  }

  if (Array.isArray(name)) {
    return name.reverse().reduce(function (callback, name) {
      return register.bind(null, state, name, callback, options);
    }, method)();
  }

  return Promise.resolve().then(function () {
    if (!state.registry[name]) {
      return method(options);
    }

    return state.registry[name].reduce(function (method, registered) {
      return registered.hook.bind(null, method, options);
    }, method)();
  });
}


/***/ }),

/***/ 6819:
/***/ ((module) => {

module.exports = removeHook;

function removeHook(state, name, method) {
  if (!state.registry[name]) {
    return;
  }

  var index = state.registry[name]
    .map(function (registered) {
      return registered.orig;
    })
    .indexOf(method);

  if (index === -1) {
    return;
  }

  state.registry[name].splice(index, 1);
}


/***/ }),

/***/ 8932:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

class Deprecation extends Error {
  constructor(message) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'Deprecation';
  }

}

exports.Deprecation = Deprecation;


/***/ }),

/***/ 4766:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getApplicativeComposition = exports.getApplicativeMonoid = void 0;
/**
 * The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
 * of type `f a` from values of type `a`.
 *
 * Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
 * wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
 * function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
 * any number of function arguments.
 *
 * Instances must satisfy the following laws in addition to the `Apply` laws:
 *
 * 1. Identity: `A.ap(A.of(a => a), fa) <-> fa`
 * 2. Homomorphism: `A.ap(A.of(ab), A.of(a)) <-> A.of(ab(a))`
 * 3. Interchange: `A.ap(fab, A.of(a)) <-> A.ap(A.of(ab => ab(a)), fab)`
 *
 * Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`
 *
 * @since 2.0.0
 */
var Apply_1 = __nccwpck_require__(205);
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
function getApplicativeMonoid(F) {
    var f = Apply_1.getApplySemigroup(F);
    return function (M) { return ({
        concat: f(M).concat,
        empty: F.of(M.empty)
    }); };
}
exports.getApplicativeMonoid = getApplicativeMonoid;
/** @deprecated */
function getApplicativeComposition(F, G) {
    var map = Functor_1.getFunctorComposition(F, G).map;
    var _ap = Apply_1.ap(F, G);
    return {
        map: map,
        of: function (a) { return F.of(G.of(a)); },
        ap: function (fgab, fga) { return function_1.pipe(fgab, _ap(fga)); }
    };
}
exports.getApplicativeComposition = getApplicativeComposition;


/***/ }),

/***/ 205:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sequenceS = exports.sequenceT = exports.getApplySemigroup = exports.apS = exports.apSecond = exports.apFirst = exports.ap = void 0;
var function_1 = __nccwpck_require__(6985);
function ap(F, G) {
    return function (fa) { return function (fab) {
        return F.ap(F.map(fab, function (gab) { return function (ga) { return G.ap(gab, ga); }; }), fa);
    }; };
}
exports.ap = ap;
function apFirst(A) {
    return function (second) { return function (first) {
        return A.ap(A.map(first, function (a) { return function () { return a; }; }), second);
    }; };
}
exports.apFirst = apFirst;
function apSecond(A) {
    return function (second) { return function (first) {
        return A.ap(A.map(first, function () { return function (b) { return b; }; }), second);
    }; };
}
exports.apSecond = apSecond;
function apS(F) {
    return function (name, fb) { return function (fa) {
        return F.ap(F.map(fa, function (a) { return function (b) {
            var _a;
            return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
        }; }), fb);
    }; };
}
exports.apS = apS;
function getApplySemigroup(F) {
    return function (S) { return ({
        concat: function (first, second) {
            return F.ap(F.map(first, function (x) { return function (y) { return S.concat(x, y); }; }), second);
        }
    }); };
}
exports.getApplySemigroup = getApplySemigroup;
function curried(f, n, acc) {
    return function (x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
            combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
    };
}
var tupleConstructors = {
    1: function (a) { return [a]; },
    2: function (a) { return function (b) { return [a, b]; }; },
    3: function (a) { return function (b) { return function (c) { return [a, b, c]; }; }; },
    4: function (a) { return function (b) { return function (c) { return function (d) { return [a, b, c, d]; }; }; }; },
    5: function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return [a, b, c, d, e]; }; }; }; }; }
};
function getTupleConstructor(len) {
    if (!tupleConstructors.hasOwnProperty(len)) {
        tupleConstructors[len] = curried(function_1.tuple, len - 1, []);
    }
    return tupleConstructors[len];
}
function sequenceT(F) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
            fas = F.ap(fas, args[i]);
        }
        return fas;
    };
}
exports.sequenceT = sequenceT;
function getRecordConstructor(keys) {
    var len = keys.length;
    switch (len) {
        case 1:
            return function (a) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a);
            };
        case 2:
            return function (a) { return function (b) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a);
            }; };
        case 3:
            return function (a) { return function (b) { return function (c) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a);
            }; }; };
        case 4:
            return function (a) { return function (b) { return function (c) { return function (d) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a);
            }; }; }; };
        case 5:
            return function (a) { return function (b) { return function (c) { return function (d) { return function (e) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a[keys[4]] = e,
                    _a);
            }; }; }; }; };
        default:
            return curried(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var r = {};
                for (var i = 0; i < len; i++) {
                    r[keys[i]] = args[i];
                }
                return r;
            }, len - 1, []);
    }
}
function sequenceS(F) {
    return function (r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = F.map(r[keys[0]], f);
        for (var i = 1; i < len; i++) {
            fr = F.ap(fr, r[keys[i]]);
        }
        return fr;
    };
}
exports.sequenceS = sequenceS;


/***/ }),

/***/ 3834:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.copy = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.lookup = exports.isOutOfBound = exports.size = exports.scanRight = exports.scanLeft = exports.chainWithIndex = exports.foldRight = exports.matchRight = exports.matchRightW = exports.foldLeft = exports.matchLeft = exports.matchLeftW = exports.match = exports.matchW = exports.fromEither = exports.fromOption = exports.fromPredicate = exports.replicate = exports.makeBy = exports.appendW = exports.append = exports.prependW = exports.prepend = exports.isNonEmpty = exports.isEmpty = void 0;
exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = exports.foldMapWithIndex = exports.foldMap = exports.duplicate = exports.extend = exports.filterWithIndex = exports.alt = exports.altW = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.filter = exports.separate = exports.compact = exports.filterMap = exports.filterMapWithIndex = exports.mapWithIndex = exports.flatten = exports.chain = exports.ap = exports.map = exports.zero = exports.of = exports.difference = exports.intersection = exports.union = exports.concat = exports.concatW = exports.comprehension = exports.fromOptionK = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.sort = void 0;
exports.some = exports.every = exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.fromEitherK = exports.FromEither = exports.filterE = exports.ChainRecBreadthFirst = exports.chainRecBreadthFirst = exports.ChainRecDepthFirst = exports.chainRecDepthFirst = exports.Witherable = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.guard = exports.Zero = exports.Alt = exports.Unfoldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getOrd = exports.getEq = exports.getMonoid = exports.getSemigroup = exports.getShow = exports.URI = exports.unfold = exports.wilt = exports.wither = void 0;
exports.array = exports.prependToAll = exports.snoc = exports.cons = exports.empty = exports.range = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.exists = void 0;
var Apply_1 = __nccwpck_require__(205);
var Chain_1 = __nccwpck_require__(2372);
var FromEither_1 = __nccwpck_require__(1964);
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
var _ = __importStar(__nccwpck_require__(1840));
var NEA = __importStar(__nccwpck_require__(240));
var RA = __importStar(__nccwpck_require__(4234));
var Separated_1 = __nccwpck_require__(5877);
var Witherable_1 = __nccwpck_require__(4384);
var Zero_1 = __nccwpck_require__(9734);
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/Array'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @category refinements
 * @since 2.0.0
 */
var isEmpty = function (as) { return as.length === 0; };
exports.isEmpty = isEmpty;
/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`
 *
 * @category refinements
 * @since 2.0.0
 */
exports.isNonEmpty = NEA.isNonEmpty;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Prepend an element to the front of a `Array`, creating a new `NonEmptyArray`.
 *
 * @example
 * import { prepend } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([2, 3, 4], prepend(1)), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.10.0
 */
exports.prepend = NEA.prepend;
/**
 * Less strict version of [`prepend`](#prepend).
 *
 * @category constructors
 * @since 2.11.0
 */
exports.prependW = NEA.prependW;
/**
 * Append an element to the end of a `Array`, creating a new `NonEmptyArray`.
 *
 * @example
 * import { append } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.10.0
 */
exports.append = NEA.append;
/**
 * Less strict version of [`append`](#append).
 *
 * @category constructors
 * @since 2.11.0
 */
exports.appendW = NEA.appendW;
/**
 * Return a `Array` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { makeBy } from 'fp-ts/Array'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.0.0
 */
var makeBy = function (n, f) { return (n <= 0 ? [] : NEA.makeBy(f)(n)); };
exports.makeBy = makeBy;
/**
 * Create a `Array` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { replicate } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.0.0
 */
var replicate = function (n, a) { return exports.makeBy(n, function () { return a; }); };
exports.replicate = replicate;
function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? [a] : []); };
}
exports.fromPredicate = fromPredicate;
// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------
/**
 * @category natural transformations
 * @since 2.11.0
 */
var fromOption = function (ma) { return (_.isNone(ma) ? [] : [ma.value]); };
exports.fromOption = fromOption;
/**
 * @category natural transformations
 * @since 2.11.0
 */
var fromEither = function (e) { return (_.isLeft(e) ? [] : [e.right]); };
exports.fromEither = fromEither;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.11.0
 */
var matchW = function (onEmpty, onNonEmpty) { return function (as) {
    return exports.isNonEmpty(as) ? onNonEmpty(as) : onEmpty();
}; };
exports.matchW = matchW;
/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.11.0
 */
exports.match = exports.matchW;
/**
 * Less strict version of [`matchLeft`](#matchleft).
 *
 * @category destructors
 * @since 2.11.0
 */
var matchLeftW = function (onEmpty, onNonEmpty) { return function (as) { return (exports.isNonEmpty(as) ? onNonEmpty(NEA.head(as), NEA.tail(as)) : onEmpty()); }; };
exports.matchLeftW = matchLeftW;
/**
 * Break an `Array` into its first element and remaining elements.
 *
 * @example
 * import { matchLeft } from 'fp-ts/Array'
 *
 * const len: <A>(as: Array<A>) => number = matchLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category destructors
 * @since 2.10.0
 */
exports.matchLeft = exports.matchLeftW;
/**
 * Alias of [`matchLeft`](#matchleft).
 *
 * @category destructors
 * @since 2.0.0
 */
exports.foldLeft = exports.matchLeft;
/**
 * Less strict version of [`matchRight`](#matchright).
 *
 * @category destructors
 * @since 2.11.0
 */
var matchRightW = function (onEmpty, onNonEmpty) { return function (as) { return (exports.isNonEmpty(as) ? onNonEmpty(NEA.init(as), NEA.last(as)) : onEmpty()); }; };
exports.matchRightW = matchRightW;
/**
 * Break an `Array` into its initial elements and the last element.
 *
 * @category destructors
 * @since 2.10.0
 */
exports.matchRight = exports.matchRightW;
/**
 * Alias of [`matchRight`](#matchright).
 *
 * @category destructors
 * @since 2.0.0
 */
exports.foldRight = exports.matchRight;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.7.0
 */
var chainWithIndex = function (f) { return function (as) {
    var out = [];
    for (var i = 0; i < as.length; i++) {
        out.push.apply(out, f(i, as[i]));
    }
    return out;
}; };
exports.chainWithIndex = chainWithIndex;
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * @example
 * import { scanLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @category combinators
 * @since 2.0.0
 */
var scanLeft = function (b, f) { return function (as) {
    var len = as.length;
    var out = new Array(len + 1);
    out[0] = b;
    for (var i = 0; i < len; i++) {
        out[i + 1] = f(out[i], as[i]);
    }
    return out;
}; };
exports.scanLeft = scanLeft;
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @category combinators
 * @since 2.0.0
 */
var scanRight = function (b, f) { return function (as) {
    var len = as.length;
    var out = new Array(len + 1);
    out[len] = b;
    for (var i = len - 1; i >= 0; i--) {
        out[i] = f(as[i], out[i + 1]);
    }
    return out;
}; };
exports.scanRight = scanRight;
/**
 * Calculate the number of elements in a `Array`.
 *
 * @since 2.10.0
 */
var size = function (as) { return as.length; };
exports.size = size;
/**
 * Test whether an array contains a particular index
 *
 * @since 2.0.0
 */
exports.isOutOfBound = NEA.isOutOfBound;
// TODO: remove non-curried overloading in v3
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @example
 * import { lookup } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
 *
 * @since 2.0.0
 */
exports.lookup = RA.lookup;
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
exports.head = RA.head;
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
exports.last = RA.last;
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
var tail = function (as) { return (exports.isNonEmpty(as) ? _.some(NEA.tail(as)) : _.none); };
exports.tail = tail;
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
var init = function (as) { return (exports.isNonEmpty(as) ? _.some(NEA.init(as)) : _.none); };
exports.init = init;
/**
 * Keep only a max number of elements from the start of an `Array`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { takeLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
 *
 * @category combinators
 * @since 2.0.0
 */
var takeLeft = function (n) { return function (as) { return (exports.isOutOfBound(n, as) ? exports.copy(as) : as.slice(0, n)); }; };
exports.takeLeft = takeLeft;
/**
 * Keep only a max number of elements from the end of an `Array`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { takeRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
 *
 * @category combinators
 * @since 2.0.0
 */
var takeRight = function (n) { return function (as) {
    return exports.isOutOfBound(n, as) ? exports.copy(as) : n === 0 ? [] : as.slice(-n);
}; };
exports.takeRight = takeRight;
function takeLeftWhile(predicate) {
    return function (as) {
        var out = [];
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            if (!predicate(a)) {
                break;
            }
            out.push(a);
        }
        return out;
    };
}
exports.takeLeftWhile = takeLeftWhile;
var spanLeftIndex = function (as, predicate) {
    var l = as.length;
    var i = 0;
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break;
        }
    }
    return i;
};
function spanLeft(predicate) {
    return function (as) {
        var _a = exports.splitAt(spanLeftIndex(as, predicate))(as), init = _a[0], rest = _a[1];
        return { init: init, rest: rest };
    };
}
exports.spanLeft = spanLeft;
/**
 * Drop a max number of elements from the start of an `Array`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { dropLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
 *
 * @category combinators
 * @since 2.0.0
 */
var dropLeft = function (n) { return function (as) {
    return n <= 0 || exports.isEmpty(as) ? exports.copy(as) : n >= as.length ? [] : as.slice(n, as.length);
}; };
exports.dropLeft = dropLeft;
/**
 * Drop a max number of elements from the end of an `Array`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { dropRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
var dropRight = function (n) { return function (as) {
    return n <= 0 || exports.isEmpty(as) ? exports.copy(as) : n >= as.length ? [] : as.slice(0, as.length - n);
}; };
exports.dropRight = dropRight;
function dropLeftWhile(predicate) {
    return function (as) { return as.slice(spanLeftIndex(as, predicate)); };
}
exports.dropLeftWhile = dropLeftWhile;
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.0.0
 */
exports.findIndex = RA.findIndex;
function findFirst(predicate) {
    return RA.findFirst(predicate);
}
exports.findFirst = findFirst;
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @category destructors
 * @since 2.0.0
 */
exports.findFirstMap = RA.findFirstMap;
function findLast(predicate) {
    return RA.findLast(predicate);
}
exports.findLast = findLast;
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @category destructors
 * @since 2.0.0
 */
exports.findLastMap = RA.findLastMap;
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   readonly a: number
 *   readonly b: number
 * }
 * const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.0.0
 */
exports.findLastIndex = RA.findLastIndex;
/**
 * @category combinators
 * @since 2.0.0
 */
var copy = function (as) { return as.slice(); };
exports.copy = copy;
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/Array'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.0.0
 */
var insertAt = function (i, a) { return function (as) {
    return i < 0 || i > as.length ? _.none : _.some(exports.unsafeInsertAt(i, a, as));
}; };
exports.insertAt = insertAt;
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.0.0
 */
var updateAt = function (i, a) { return exports.modifyAt(i, function () { return a; }); };
exports.updateAt = updateAt;
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.0.0
 */
var deleteAt = function (i) { return function (as) {
    return exports.isOutOfBound(i, as) ? _.none : _.some(exports.unsafeDeleteAt(i, as));
}; };
exports.deleteAt = deleteAt;
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.0.0
 */
var modifyAt = function (i, f) { return function (as) {
    return exports.isOutOfBound(i, as) ? _.none : _.some(exports.unsafeUpdateAt(i, f(as[i]), as));
}; };
exports.modifyAt = modifyAt;
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @category combinators
 * @since 2.0.0
 */
var reverse = function (as) { return (exports.isEmpty(as) ? [] : as.slice().reverse()); };
exports.reverse = reverse;
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/Array'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @category combinators
 * @since 2.0.0
 */
var rights = function (as) {
    var r = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === 'Right') {
            r.push(a.right);
        }
    }
    return r;
};
exports.rights = rights;
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/Array'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @category combinators
 * @since 2.0.0
 */
var lefts = function (as) {
    var r = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === 'Left') {
            r.push(a.left);
        }
    }
    return r;
};
exports.lefts = lefts;
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
var sort = function (O) { return function (as) {
    return as.length <= 1 ? exports.copy(as) : as.slice().sort(O.compare);
}; };
exports.sort = sort;
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @category combinators
 * @since 2.0.0
 */
var zipWith = function (fa, fb, f) {
    var fc = [];
    var len = Math.min(fa.length, fb.length);
    for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
    }
    return fc;
};
exports.zipWith = zipWith;
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return exports.zipWith(as, bs, function (a, b) { return [a, b]; });
}
exports.zip = zip;
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.0.0
 */
var unzip = function (as) {
    var fa = [];
    var fb = [];
    for (var i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
    }
    return [fa, fb];
};
exports.unzip = unzip;
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependAll } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.10.0
 */
var prependAll = function (middle) {
    var f = NEA.prependAll(middle);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : []); };
};
exports.prependAll = prependAll;
/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
var intersperse = function (middle) {
    var f = NEA.intersperse(middle);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : exports.copy(as)); };
};
exports.intersperse = intersperse;
/**
 * Rotate a `Array` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
var rotate = function (n) {
    var f = NEA.rotate(n);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : exports.copy(as)); };
};
exports.rotate = rotate;
// TODO: remove non-curried overloading in v3
/**
 * Test if a value is a member of an array. Takes a `Eq<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 *
 * @example
 * import { elem } from 'fp-ts/Array'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(2)), true)
 * assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(0)), false)
 *
 * @since 2.0.0
 */
exports.elem = RA.elem;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/Array'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.0.0
 */
var uniq = function (E) {
    var f = NEA.uniq(E);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : exports.copy(as)); };
};
exports.uniq = uniq;
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/Array'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 2.0.0
 */
var sortBy = function (ords) {
    var f = NEA.sortBy(ords);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : exports.copy(as)); };
};
exports.sortBy = sortBy;
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Eq } from 'fp-ts/Eq'
 * import * as A from 'fp-ts/Array'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
 *   return A.chop(as => {
 *     const { init, rest } = pipe(as, A.spanLeft((a: A) => S.equals(a, as[0])))
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @category combinators
 * @since 2.0.0
 */
var chop = function (f) {
    var g = NEA.chop(f);
    return function (as) { return (exports.isNonEmpty(as) ? g(as) : []); };
};
exports.chop = chop;
/**
 * Splits an `Array` into two pieces, the first piece has max `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @category combinators
 * @since 2.0.0
 */
var splitAt = function (n) { return function (as) {
    return n >= 1 && exports.isNonEmpty(as) ? NEA.splitAt(n)(as) : exports.isEmpty(as) ? [exports.copy(as), []] : [[], exports.copy(as)];
}; };
exports.splitAt = splitAt;
/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 * @category combinators
 * @since 2.0.0
 */
var chunksOf = function (n) {
    var f = NEA.chunksOf(n);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : []); };
};
exports.chunksOf = chunksOf;
/**
 * @category combinators
 * @since 2.11.0
 */
var fromOptionK = function (f) { return function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return exports.fromOption(f.apply(void 0, a));
}; };
exports.fromOptionK = fromOptionK;
function comprehension(input, f, g) {
    if (g === void 0) { g = function () { return true; }; }
    var go = function (scope, input) {
        return exports.isNonEmpty(input)
            ? function_1.pipe(NEA.head(input), exports.chain(function (x) { return go(function_1.pipe(scope, exports.append(x)), NEA.tail(input)); }))
            : g.apply(void 0, scope) ? [f.apply(void 0, scope)]
                : [];
    };
    return go([], input);
}
exports.comprehension = comprehension;
/**
 * @category combinators
 * @since 2.11.0
 */
var concatW = function (second) { return function (first) {
    return exports.isEmpty(first) ? exports.copy(second) : exports.isEmpty(second) ? exports.copy(first) : first.concat(second);
}; };
exports.concatW = concatW;
/**
 * @category combinators
 * @since 2.11.0
 */
exports.concat = exports.concatW;
function union(E) {
    var unionE = NEA.union(E);
    return function (first, second) {
        if (second === undefined) {
            var unionE_1 = union(E);
            return function (second) { return unionE_1(second, first); };
        }
        return exports.isNonEmpty(first) && exports.isNonEmpty(second)
            ? unionE(second)(first)
            : exports.isNonEmpty(first)
                ? exports.copy(first)
                : exports.copy(second);
    };
}
exports.union = union;
function intersection(E) {
    var elemE = exports.elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var intersectionE_1 = intersection(E);
            return function (ys) { return intersectionE_1(ys, xs); };
        }
        return xs.filter(function (a) { return elemE(a, ys); });
    };
}
exports.intersection = intersection;
function difference(E) {
    var elemE = exports.elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var differenceE_1 = difference(E);
            return function (ys) { return differenceE_1(ys, xs); };
        }
        return xs.filter(function (a) { return !elemE(a, ys); });
    };
}
exports.difference = difference;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var _map = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var _mapWithIndex = function (fa, f) { return function_1.pipe(fa, exports.mapWithIndex(f)); };
var _ap = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
var _chain = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var _filter = function (fa, predicate) { return function_1.pipe(fa, exports.filter(predicate)); };
/* istanbul ignore next */
var _filterMap = function (fa, f) { return function_1.pipe(fa, exports.filterMap(f)); };
/* istanbul ignore next */
var _partition = function (fa, predicate) {
    return function_1.pipe(fa, exports.partition(predicate));
};
/* istanbul ignore next */
var _partitionMap = function (fa, f) { return function_1.pipe(fa, exports.partitionMap(f)); };
/* istanbul ignore next */
var _partitionWithIndex = function (fa, predicateWithIndex) { return function_1.pipe(fa, exports.partitionWithIndex(predicateWithIndex)); };
/* istanbul ignore next */
var _partitionMapWithIndex = function (fa, f) { return function_1.pipe(fa, exports.partitionMapWithIndex(f)); };
/* istanbul ignore next */
var _alt = function (fa, that) { return function_1.pipe(fa, exports.alt(that)); };
var _reduce = function (fa, b, f) { return function_1.pipe(fa, exports.reduce(b, f)); };
/* istanbul ignore next */
var _foldMap = function (M) {
    var foldMapM = exports.foldMap(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var _reduceRight = function (fa, b, f) { return function_1.pipe(fa, exports.reduceRight(b, f)); };
/* istanbul ignore next */
var _reduceWithIndex = function (fa, b, f) {
    return function_1.pipe(fa, exports.reduceWithIndex(b, f));
};
/* istanbul ignore next */
var _foldMapWithIndex = function (M) {
    var foldMapWithIndexM = exports.foldMapWithIndex(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapWithIndexM(f)); };
};
/* istanbul ignore next */
var _reduceRightWithIndex = function (fa, b, f) {
    return function_1.pipe(fa, exports.reduceRightWithIndex(b, f));
};
/* istanbul ignore next */
var _filterMapWithIndex = function (fa, f) { return function_1.pipe(fa, exports.filterMapWithIndex(f)); };
/* istanbul ignore next */
var _filterWithIndex = function (fa, predicateWithIndex) { return function_1.pipe(fa, exports.filterWithIndex(predicateWithIndex)); };
/* istanbul ignore next */
var _extend = function (fa, f) { return function_1.pipe(fa, exports.extend(f)); };
/* istanbul ignore next */
var _traverse = function (F) {
    var traverseF = exports.traverse(F);
    return function (ta, f) { return function_1.pipe(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _traverseWithIndex = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (ta, f) { return function_1.pipe(ta, traverseWithIndexF(f)); };
};
var _chainRecDepthFirst = RA._chainRecDepthFirst;
var _chainRecBreadthFirst = RA._chainRecBreadthFirst;
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Pointed
 * @since 2.0.0
 */
exports.of = NEA.of;
/**
 * @category Zero
 * @since 2.7.0
 */
var zero = function () { return []; };
exports.zero = zero;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function (f) { return function (fa) { return fa.map(function (a) { return f(a); }); }; };
exports.map = map;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
var ap = function (fa) { return exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }); };
exports.ap = ap;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain = function (f) { return function (ma) {
    return function_1.pipe(ma, exports.chainWithIndex(function (_, a) { return f(a); }));
}; };
exports.chain = chain;
/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * @category FunctorWithIndex
 * @since 2.0.0
 */
var mapWithIndex = function (f) { return function (fa) {
    return fa.map(function (a, i) { return f(i, a); });
}; };
exports.mapWithIndex = mapWithIndex;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
var filterMapWithIndex = function (f) { return function (fa) {
    var out = [];
    for (var i = 0; i < fa.length; i++) {
        var optionB = f(i, fa[i]);
        if (_.isSome(optionB)) {
            out.push(optionB.value);
        }
    }
    return out;
}; };
exports.filterMapWithIndex = filterMapWithIndex;
/**
 * @category Filterable
 * @since 2.0.0
 */
var filterMap = function (f) {
    return exports.filterMapWithIndex(function (_, a) { return f(a); });
};
exports.filterMap = filterMap;
/**
 * @category Compactable
 * @since 2.0.0
 */
exports.compact = 
/*#__PURE__*/
exports.filterMap(function_1.identity);
/**
 * @category Compactable
 * @since 2.0.0
 */
var separate = function (fa) {
    var left = [];
    var right = [];
    for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
        var e = fa_1[_i];
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return Separated_1.separated(left, right);
};
exports.separate = separate;
/**
 * @category Filterable
 * @since 2.0.0
 */
var filter = function (predicate) { return function (as) { return as.filter(predicate); }; };
exports.filter = filter;
/**
 * @category Filterable
 * @since 2.0.0
 */
var partition = function (predicate) {
    return exports.partitionWithIndex(function (_, a) { return predicate(a); });
};
exports.partition = partition;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
var partitionWithIndex = function (predicateWithIndex) { return function (as) {
    var left = [];
    var right = [];
    for (var i = 0; i < as.length; i++) {
        var b = as[i];
        if (predicateWithIndex(i, b)) {
            right.push(b);
        }
        else {
            left.push(b);
        }
    }
    return Separated_1.separated(left, right);
}; };
exports.partitionWithIndex = partitionWithIndex;
/**
 * @category Filterable
 * @since 2.0.0
 */
var partitionMap = function (f) { return exports.partitionMapWithIndex(function (_, a) { return f(a); }); };
exports.partitionMap = partitionMap;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
var partitionMapWithIndex = function (f) { return function (fa) {
    var left = [];
    var right = [];
    for (var i = 0; i < fa.length; i++) {
        var e = f(i, fa[i]);
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return Separated_1.separated(left, right);
}; };
exports.partitionMapWithIndex = partitionMapWithIndex;
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) { return fa.concat(that()); }; };
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
exports.alt = exports.altW;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
var filterWithIndex = function (predicateWithIndex) { return function (as) {
    return as.filter(function (b, i) { return predicateWithIndex(i, b); });
}; };
exports.filterWithIndex = filterWithIndex;
/**
 * @category Extend
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return wa.map(function (_, i) { return f(wa.slice(i)); });
}; };
exports.extend = extend;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.foldMap = RA.foldMap;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
exports.foldMapWithIndex = RA.foldMapWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduce = RA.reduce;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
exports.reduceWithIndex = RA.reduceWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduceRight = RA.reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
exports.reduceRightWithIndex = RA.reduceRightWithIndex;
/**
 * @category Traversable
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
exports.traverse = traverse;
/**
 * @category Traversable
 * @since 2.6.3
 */
var sequence = function (F) { return function (ta) {
    return _reduce(ta, F.of(exports.zero()), function (fas, fa) {
        return F.ap(F.map(fas, function (as) { return function (a) { return function_1.pipe(as, exports.append(a)); }; }), fa);
    });
}; };
exports.sequence = sequence;
/**
 * @category TraversableWithIndex
 * @since 2.6.3
 */
var traverseWithIndex = function (F) { return function (f) {
    return exports.reduceWithIndex(F.of(exports.zero()), function (i, fbs, a) {
        return F.ap(F.map(fbs, function (bs) { return function (b) { return function_1.pipe(bs, exports.append(b)); }; }), f(i, a));
    });
}; };
exports.traverseWithIndex = traverseWithIndex;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wither = function (F) {
    var _witherF = _wither(F);
    return function (f) { return function (fa) { return _witherF(fa, f); }; };
};
exports.wither = wither;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wilt = function (F) {
    var _wiltF = _wilt(F);
    return function (f) { return function (fa) { return _wiltF(fa, f); }; };
};
exports.wilt = wilt;
/**
 * Creates an `Array` from the results of `f(b)`, where `b` is an initial value.
 * `unfold` stops when `f` returns `Option.none`.
 * @example
 * import { unfold } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   unfold(5, (n) => (n > 0 ? some([n, n - 1]) : none)),
 *   [5, 4, 3, 2, 1]
 * )
 *
 * @category Unfoldable
 * @since 2.6.6
 */
var unfold = function (b, f) {
    var out = [];
    var bb = b;
    while (true) {
        var mt = f(bb);
        if (_.isSome(mt)) {
            var _a = mt.value, a = _a[0], b_1 = _a[1];
            out.push(a);
            bb = b_1;
        }
        else {
            break;
        }
    }
    return out;
};
exports.unfold = unfold;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Array';
/**
 * @category instances
 * @since 2.0.0
 */
exports.getShow = RA.getShow;
/**
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) { return first.concat(second); }
}); };
exports.getSemigroup = getSemigroup;
/**
 * Returns a `Monoid` for `Array<A>`
 *
 * @example
 * import { getMonoid } from 'fp-ts/Array'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.0.0
 */
var getMonoid = function () { return ({
    concat: exports.getSemigroup().concat,
    empty: []
}); };
exports.getMonoid = getMonoid;
/**
 * Derives an `Eq` over the `Array` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { getEq } from 'fp-ts/Array'
 *
 * const E = getEq(S.Eq)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.0.0
 */
exports.getEq = RA.getEq;
/**
 * Derives an `Ord` over the `Array` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/Array'
 * import * as S from 'fp-ts/string'
 *
 * const O = getOrd(S.Ord)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 * @category instances
 * @since 2.0.0
 */
exports.getOrd = RA.getOrd;
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionSemigroup = function (E) {
    var unionE = union(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
exports.getUnionSemigroup = getUnionSemigroup;
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionMonoid = function (E) { return ({
    concat: exports.getUnionSemigroup(E).concat,
    empty: []
}); };
exports.getUnionMonoid = getUnionMonoid;
/**
 * @category instances
 * @since 2.11.0
 */
var getIntersectionSemigroup = function (E) {
    var intersectionE = intersection(E);
    return {
        concat: function (first, second) { return intersectionE(second)(first); }
    };
};
exports.getIntersectionSemigroup = getIntersectionSemigroup;
/**
 * @category instances
 * @since 2.11.0
 */
var getDifferenceMagma = function (E) {
    var differenceE = difference(E);
    return {
        concat: function (first, second) { return differenceE(second)(first); }
    };
};
exports.getDifferenceMagma = getDifferenceMagma;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.flap = 
/*#__PURE__*/
Functor_1.flap(exports.Functor);
/**
 * @category instances
 * @since 2.10.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Apply = {
    URI: exports.URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apFirst = 
/*#__PURE__*/
Apply_1.apFirst(exports.Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apSecond = 
/*#__PURE__*/
Apply_1.apSecond(exports.Apply);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.chainFirst = 
/*#__PURE__*/
Chain_1.chainFirst(exports.Chain);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Unfoldable = {
    URI: exports.URI,
    unfold: exports.unfold
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.11.0
 */
exports.Zero = {
    URI: exports.URI,
    zero: exports.zero
};
/**
 * @category constructors
 * @since 2.11.0
 */
exports.guard = 
/*#__PURE__*/
Zero_1.guard(exports.Zero, exports.Pointed);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alternative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    alt: _alt,
    zero: exports.zero
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Extend = {
    URI: exports.URI,
    map: _map,
    extend: _extend
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Compactable = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Filterable = {
    URI: exports.URI,
    map: _map,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FilterableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FoldableWithIndex = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverse: _traverse,
    sequence: exports.sequence,
    traverseWithIndex: _traverseWithIndex
};
var _wither = Witherable_1.witherDefault(exports.Traversable, exports.Compactable);
var _wilt = Witherable_1.wiltDefault(exports.Traversable, exports.Compactable);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Witherable = {
    URI: exports.URI,
    map: _map,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    wither: _wither,
    wilt: _wilt
};
/**
 * @category ChainRec
 * @since 2.11.0
 */
exports.chainRecDepthFirst = RA.chainRecDepthFirst;
/**
 * @category instances
 * @since 2.11.0
 */
exports.ChainRecDepthFirst = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain,
    chainRec: _chainRecDepthFirst
};
/**
 * @category ChainRec
 * @since 2.11.0
 */
exports.chainRecBreadthFirst = RA.chainRecBreadthFirst;
/**
 * @category instances
 * @since 2.11.0
 */
exports.ChainRecBreadthFirst = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain,
    chainRec: _chainRecBreadthFirst
};
/**
 * Filter values inside a context.
 *
 * @since 2.11.0
 */
exports.filterE = 
/*#__PURE__*/
Witherable_1.filterE(exports.Witherable);
/**
 * @category instances
 * @since 2.11.0
 */
exports.FromEither = {
    URI: exports.URI,
    fromEither: exports.fromEither
};
/**
 * @category combinators
 * @since 2.11.0
 */
exports.fromEitherK = 
/*#__PURE__*/
FromEither_1.fromEitherK(exports.FromEither);
// -------------------------------------------------------------------------------------
// unsafe
// -------------------------------------------------------------------------------------
/**
 * @category unsafe
 * @since 2.0.0
 */
exports.unsafeInsertAt = NEA.unsafeInsertAt;
/**
 * @category unsafe
 * @since 2.0.0
 */
var unsafeUpdateAt = function (i, a, as) {
    return exports.isNonEmpty(as) ? NEA.unsafeUpdateAt(i, a, as) : [];
};
exports.unsafeUpdateAt = unsafeUpdateAt;
/**
 * @category unsafe
 * @since 2.0.0
 */
var unsafeDeleteAt = function (i, as) {
    var xs = as.slice();
    xs.splice(i, 1);
    return xs;
};
exports.unsafeDeleteAt = unsafeDeleteAt;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
exports.every = RA.every;
/**
 * @since 2.9.0
 */
var some = function (predicate) { return function (as) { return as.some(predicate); }; };
exports.some = some;
/**
 * Alias of [`some`](#some)
 *
 * @since 2.11.0
 */
exports.exists = exports.some;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
exports.Do = 
/*#__PURE__*/
exports.of(_.emptyRecord);
/**
 * @since 2.8.0
 */
exports.bindTo = 
/*#__PURE__*/
Functor_1.bindTo(exports.Functor);
/**
 * @since 2.8.0
 */
exports.bind = 
/*#__PURE__*/
Chain_1.bind(exports.Chain);
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
exports.apS = 
/*#__PURE__*/
Apply_1.apS(exports.Apply);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
// tslint:disable: deprecation
/**
 * Use `NonEmptyArray` module instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
exports.range = NEA.range;
/**
 * Use a new `[]` instead.
 *
 * @since 2.0.0
 * @deprecated
 */
exports.empty = [];
/**
 * Use `prepend` instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
exports.cons = NEA.cons;
/**
 * Use `append` instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
exports.snoc = NEA.snoc;
/**
 * Use `prependAll` instead
 *
 * @category combinators
 * @since 2.9.0
 * @deprecated
 */
exports.prependToAll = exports.prependAll;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.array = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    mapWithIndex: _mapWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex,
    alt: _alt,
    zero: exports.zero,
    unfold: exports.unfold,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex,
    extend: _extend,
    wither: _wither,
    wilt: _wilt
};


/***/ }),

/***/ 2372:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bind = exports.chainFirst = void 0;
function chainFirst(M) {
    return function (f) { return function (first) { return M.chain(first, function (a) { return M.map(f(a), function () { return a; }); }); }; };
}
exports.chainFirst = chainFirst;
function bind(M) {
    return function (name, f) { return function (ma) { return M.chain(ma, function (a) { return M.map(f(a), function (b) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
    }); }); }; };
}
exports.bind = bind;


/***/ }),

/***/ 5322:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tailRec = void 0;
/**
 * @since 2.0.0
 */
var tailRec = function (startWith, f) {
    var ab = f(startWith);
    while (ab._tag === 'Left') {
        ab = f(ab.left);
    }
    return ab.right;
};
exports.tailRec = tailRec;


/***/ }),

/***/ 7534:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fold = exports.match = exports.foldW = exports.matchW = exports.isRight = exports.isLeft = exports.fromOption = exports.fromPredicate = exports.FromEither = exports.MonadThrow = exports.throwError = exports.ChainRec = exports.Extend = exports.extend = exports.Alt = exports.alt = exports.altW = exports.Bifunctor = exports.mapLeft = exports.bimap = exports.Traversable = exports.sequence = exports.traverse = exports.Foldable = exports.reduceRight = exports.foldMap = exports.reduce = exports.Monad = exports.Chain = exports.chain = exports.chainW = exports.Applicative = exports.Apply = exports.ap = exports.apW = exports.Pointed = exports.of = exports.Functor = exports.map = exports.getAltValidation = exports.getApplicativeValidation = exports.getWitherable = exports.getFilterable = exports.getCompactable = exports.getSemigroup = exports.getEq = exports.getShow = exports.URI = exports.right = exports.left = void 0;
exports.getValidation = exports.getValidationMonoid = exports.getValidationSemigroup = exports.getApplyMonoid = exports.getApplySemigroup = exports.either = exports.stringifyJSON = exports.parseJSON = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.bindTo = exports.Do = exports.exists = exports.elem = exports.toError = exports.toUnion = exports.chainNullableK = exports.fromNullableK = exports.tryCatchK = exports.tryCatch = exports.fromNullable = exports.orElse = exports.orElseW = exports.swap = exports.filterOrElseW = exports.filterOrElse = exports.chainOptionK = exports.fromOptionK = exports.duplicate = exports.flatten = exports.flattenW = exports.chainFirstW = exports.chainFirst = exports.apSecond = exports.apFirst = exports.flap = exports.getOrElse = exports.getOrElseW = void 0;
var Applicative_1 = __nccwpck_require__(4766);
var Apply_1 = __nccwpck_require__(205);
var Chain_1 = __nccwpck_require__(2372);
var ChainRec_1 = __nccwpck_require__(5322);
var FromEither_1 = __nccwpck_require__(1964);
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
var _ = __importStar(__nccwpck_require__(1840));
var Separated_1 = __nccwpck_require__(5877);
var Witherable_1 = __nccwpck_require__(4384);
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 2.0.0
 */
exports.left = _.left;
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 2.0.0
 */
exports.right = _.right;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var _map = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
var _ap = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
/* istanbul ignore next */
var _chain = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var _reduce = function (fa, b, f) { return function_1.pipe(fa, exports.reduce(b, f)); };
/* istanbul ignore next */
var _foldMap = function (M) { return function (fa, f) {
    var foldMapM = exports.foldMap(M);
    return function_1.pipe(fa, foldMapM(f));
}; };
/* istanbul ignore next */
var _reduceRight = function (fa, b, f) { return function_1.pipe(fa, exports.reduceRight(b, f)); };
var _traverse = function (F) {
    var traverseF = exports.traverse(F);
    return function (ta, f) { return function_1.pipe(ta, traverseF(f)); };
};
var _bimap = function (fa, f, g) { return function_1.pipe(fa, exports.bimap(f, g)); };
var _mapLeft = function (fa, f) { return function_1.pipe(fa, exports.mapLeft(f)); };
/* istanbul ignore next */
var _alt = function (fa, that) { return function_1.pipe(fa, exports.alt(that)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return function_1.pipe(wa, exports.extend(f)); };
var _chainRec = function (a, f) {
    return ChainRec_1.tailRec(f(a), function (e) {
        return exports.isLeft(e) ? exports.right(exports.left(e.left)) : exports.isLeft(e.right) ? exports.left(f(e.right.left)) : exports.right(exports.right(e.right.right));
    });
};
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Either';
/**
 * @category instances
 * @since 2.0.0
 */
var getShow = function (SE, SA) { return ({
    show: function (ma) { return (exports.isLeft(ma) ? "left(" + SE.show(ma.left) + ")" : "right(" + SA.show(ma.right) + ")"); }
}); };
exports.getShow = getShow;
/**
 * @category instances
 * @since 2.0.0
 */
var getEq = function (EL, EA) { return ({
    equals: function (x, y) {
        return x === y || (exports.isLeft(x) ? exports.isLeft(y) && EL.equals(x.left, y.left) : exports.isRight(y) && EA.equals(x.right, y.right));
    }
}); };
exports.getEq = getEq;
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/Either'
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * const S = getSemigroup<string, number>(SemigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
var getSemigroup = function (S) { return ({
    concat: function (x, y) { return (exports.isLeft(y) ? x : exports.isLeft(x) ? y : exports.right(S.concat(x.right, y.right))); }
}); };
exports.getSemigroup = getSemigroup;
/**
 * Builds a `Compactable` instance for `Either` given `Monoid` for the left side.
 *
 * @category instances
 * @since 2.10.0
 */
var getCompactable = function (M) {
    var empty = exports.left(M.empty);
    return {
        URI: exports.URI,
        _E: undefined,
        compact: function (ma) { return (exports.isLeft(ma) ? ma : ma.right._tag === 'None' ? empty : exports.right(ma.right.value)); },
        separate: function (ma) {
            return exports.isLeft(ma)
                ? Separated_1.separated(ma, ma)
                : exports.isLeft(ma.right)
                    ? Separated_1.separated(exports.right(ma.right.left), empty)
                    : Separated_1.separated(empty, exports.right(ma.right.right));
        }
    };
};
exports.getCompactable = getCompactable;
/**
 * Builds a `Filterable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 2.10.0
 */
var getFilterable = function (M) {
    var empty = exports.left(M.empty);
    var _a = exports.getCompactable(M), compact = _a.compact, separate = _a.separate;
    var filter = function (ma, predicate) {
        return exports.isLeft(ma) ? ma : predicate(ma.right) ? ma : empty;
    };
    var partition = function (ma, p) {
        return exports.isLeft(ma)
            ? Separated_1.separated(ma, ma)
            : p(ma.right)
                ? Separated_1.separated(empty, exports.right(ma.right))
                : Separated_1.separated(exports.right(ma.right), empty);
    };
    return {
        URI: exports.URI,
        _E: undefined,
        map: _map,
        compact: compact,
        separate: separate,
        filter: filter,
        filterMap: function (ma, f) {
            if (exports.isLeft(ma)) {
                return ma;
            }
            var ob = f(ma.right);
            return ob._tag === 'None' ? empty : exports.right(ob.value);
        },
        partition: partition,
        partitionMap: function (ma, f) {
            if (exports.isLeft(ma)) {
                return Separated_1.separated(ma, ma);
            }
            var e = f(ma.right);
            return exports.isLeft(e) ? Separated_1.separated(exports.right(e.left), empty) : Separated_1.separated(empty, exports.right(e.right));
        }
    };
};
exports.getFilterable = getFilterable;
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 2.0.0
 */
var getWitherable = function (M) {
    var F_ = exports.getFilterable(M);
    var C = exports.getCompactable(M);
    return {
        URI: exports.URI,
        _E: undefined,
        map: _map,
        compact: F_.compact,
        separate: F_.separate,
        filter: F_.filter,
        filterMap: F_.filterMap,
        partition: F_.partition,
        partitionMap: F_.partitionMap,
        traverse: _traverse,
        sequence: exports.sequence,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        wither: Witherable_1.witherDefault(exports.Traversable, C),
        wilt: Witherable_1.wiltDefault(exports.Traversable, C)
    };
};
exports.getWitherable = getWitherable;
/**
 * @category instances
 * @since 2.7.0
 */
var getApplicativeValidation = function (SE) { return ({
    URI: exports.URI,
    _E: undefined,
    map: _map,
    ap: function (fab, fa) {
        return exports.isLeft(fab)
            ? exports.isLeft(fa)
                ? exports.left(SE.concat(fab.left, fa.left))
                : fab
            : exports.isLeft(fa)
                ? fa
                : exports.right(fab.right(fa.right));
    },
    of: exports.of
}); };
exports.getApplicativeValidation = getApplicativeValidation;
/**
 * @category instances
 * @since 2.7.0
 */
var getAltValidation = function (SE) { return ({
    URI: exports.URI,
    _E: undefined,
    map: _map,
    alt: function (me, that) {
        if (exports.isRight(me)) {
            return me;
        }
        var ea = that();
        return exports.isLeft(ea) ? exports.left(SE.concat(me.left, ea.left)) : ea;
    }
}); };
exports.getAltValidation = getAltValidation;
/**
 * @category instance operations
 * @since 2.0.0
 */
var map = function (f) { return function (fa) {
    return exports.isLeft(fa) ? fa : exports.right(f(fa.right));
}; };
exports.map = map;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * @category instance operations
 * @since 2.7.0
 */
exports.of = exports.right;
/**
 * @category instances
 * @since 2.10.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category instance operations
 * @since 2.8.0
 */
var apW = function (fa) { return function (fab) { return (exports.isLeft(fab) ? fab : exports.isLeft(fa) ? fa : exports.right(fab.right(fa.right))); }; };
exports.apW = apW;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category instance operations
 * @since 2.0.0
 */
exports.ap = exports.apW;
/**
 * @category instances
 * @since 2.10.0
 */
exports.Apply = {
    URI: exports.URI,
    map: _map,
    ap: _ap
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of
};
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category instance operations
 * @since 2.6.0
 */
var chainW = function (f) { return function (ma) {
    return exports.isLeft(ma) ? ma : f(ma.right);
}; };
exports.chainW = chainW;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category instance operations
 * @since 2.0.0
 */
exports.chain = exports.chainW;
/**
 * @category instances
 * @since 2.10.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain
};
/**
 * Left-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'prefix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduce(startWith, concat)),
 *   'prefix:a'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduce(startWith, concat)),
 *   'prefix'
 * )
 *
 * @category instance operations
 * @since 2.0.0
 */
var reduce = function (b, f) { return function (fa) {
    return exports.isLeft(fa) ? b : f(b, fa.right);
}; };
exports.reduce = reduce;
/**
 * Map each element of the structure to a monoid, and combine the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 * import * as S from 'fp-ts/string'
 *
 * const yell = (a: string) => `${a}!`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.foldMap(S.Monoid)(yell)),
 *   'a!'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.foldMap(S.Monoid)(yell)),
 *   S.Monoid.empty
 * )
 *
 * @category instance operations
 * @since 2.0.0
 */
var foldMap = function (M) { return function (f) { return function (fa) {
    return exports.isLeft(fa) ? M.empty : f(fa.right);
}; }; };
exports.foldMap = foldMap;
/**
 * Right-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'postfix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduceRight(startWith, concat)),
 *   'a:postfix'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduceRight(startWith, concat)),
 *   'postfix'
 * )
 *
 * @category instance operations
 * @since 2.0.0
 */
var reduceRight = function (b, f) { return function (fa) {
    return exports.isLeft(fa) ? b : f(fa.right, b);
}; };
exports.reduceRight = reduceRight;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(['a']), E.traverse(O.Applicative)(RA.head)),
 *   O.some(E.right('a'))
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right([]), E.traverse(O.Applicative)(RA.head)),
 *   O.none
 * )
 *
 * @category instance operations
 * @since 2.6.3
 */
var traverse = function (F) { return function (f) { return function (ta) { return (exports.isLeft(ta) ? F.of(exports.left(ta.left)) : F.map(f(ta.right), exports.right)); }; }; };
exports.traverse = traverse;
/**
 * Evaluate each monadic action in the structure from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.some('a')), E.sequence(O.Applicative)),
 *   O.some(E.right('a'))
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.none), E.sequence(O.Applicative)),
 *   O.none
 * )
 *
 * @category instance operations
 * @since 2.6.3
 */
var sequence = function (F) { return function (ma) {
    return exports.isLeft(ma) ? F.of(exports.left(ma.left)) : F.map(ma.right, exports.right);
}; };
exports.sequence = sequence;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence
};
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category instance operations
 * @since 2.0.0
 */
var bimap = function (f, g) { return function (fa) { return (exports.isLeft(fa) ? exports.left(f(fa.left)) : exports.right(g(fa.right))); }; };
exports.bimap = bimap;
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category instance operations
 * @since 2.0.0
 */
var mapLeft = function (f) { return function (fa) {
    return exports.isLeft(fa) ? exports.left(f(fa.left)) : fa;
}; };
exports.mapLeft = mapLeft;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Bifunctor = {
    URI: exports.URI,
    bimap: _bimap,
    mapLeft: _mapLeft
};
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category instance operations
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) { return (exports.isLeft(fa) ? that() : fa); }; };
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category instance operations
 * @since 2.0.0
 */
exports.alt = exports.altW;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: _map,
    alt: _alt
};
/**
 * @category instance operations
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return exports.isLeft(wa) ? wa : exports.right(f(wa));
}; };
exports.extend = extend;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Extend = {
    URI: exports.URI,
    map: _map,
    extend: _extend
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.ChainRec = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain,
    chainRec: _chainRec
};
/**
 * @category instance operations
 * @since 2.6.3
 */
exports.throwError = exports.left;
/**
 * @category instances
 * @since 2.7.0
 */
exports.MonadThrow = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain,
    throwError: exports.throwError
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.FromEither = {
    URI: exports.URI,
    fromEither: function_1.identity
};
/**
 * @example
 * import { fromPredicate, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('error')
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
exports.fromPredicate = 
/*#__PURE__*/
FromEither_1.fromPredicate(exports.FromEither);
// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------
/**
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some(1),
 *     E.fromOption(() => 'error')
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     E.fromOption(() => 'error')
 *   ),
 *   E.left('error')
 * )
 *
 * @category natural transformations
 * @since 2.0.0
 */
exports.fromOption = 
/*#__PURE__*/
FromEither_1.fromOption(exports.FromEither);
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category refinements
 * @since 2.0.0
 */
exports.isLeft = _.isLeft;
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category refinements
 * @since 2.0.0
 */
exports.isRight = _.isRight;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
var matchW = function (onLeft, onRight) { return function (ma) {
    return exports.isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
}; };
exports.matchW = matchW;
/**
 * Alias of [`matchW`](#matchw).
 *
 * @category destructors
 * @since 2.10.0
 */
exports.foldW = exports.matchW;
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { match, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     match(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     match(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category destructors
 * @since 2.10.0
 */
exports.match = exports.matchW;
/**
 * Alias of [`match`](#match).
 *
 * @category destructors
 * @since 2.0.0
 */
exports.fold = exports.match;
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.6.0
 */
var getOrElseW = function (onLeft) { return function (ma) {
    return exports.isLeft(ma) ? onLeft(ma.left) : ma.right;
}; };
exports.getOrElseW = getOrElseW;
/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import { getOrElse, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     right(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     left('error'),
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
exports.getOrElse = exports.getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.flap = 
/*#__PURE__*/
Functor_1.flap(exports.Functor);
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.apFirst = 
/*#__PURE__*/
Apply_1.apFirst(exports.Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.apSecond = 
/*#__PURE__*/
Apply_1.apSecond(exports.Apply);
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.chainFirst = 
/*#__PURE__*/
Chain_1.chainFirst(exports.Chain);
/**
 * Less strict version of [`chainFirst`](#chainfirst)
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.8.0
 */
exports.chainFirstW = exports.chainFirst;
/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 2.11.0
 */
exports.flattenW = 
/*#__PURE__*/
exports.chainW(function_1.identity);
/**
 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
 *
 * Derivable from `Chain`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
 * assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
 * assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
 *
 * @category combinators
 * @since 2.0.0
 */
exports.flatten = exports.flattenW;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * @category combinators
 * @since 2.10.0
 */
exports.fromOptionK = 
/*#__PURE__*/
FromEither_1.fromOptionK(exports.FromEither);
/**
 * @category combinators
 * @since 2.11.0
 */
exports.chainOptionK = 
/*#__PURE__*/
FromEither_1.chainOptionK(exports.FromEither, exports.Chain);
/**
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(-1),
 *     E.filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.left('error')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('a'),
 *     E.filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.left('a')
 * )
 *
 * @category combinators
 * @since 2.0.0
 */
exports.filterOrElse = 
/*#__PURE__*/
FromEither_1.filterOrElse(exports.FromEither, exports.Chain);
/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * @category combinators
 * @since 2.9.0
 */
exports.filterOrElseW = exports.filterOrElse;
/**
 * Returns a `Right` if is a `Left` (and vice versa).
 *
 * @category combinators
 * @since 2.0.0
 */
var swap = function (ma) { return (exports.isLeft(ma) ? exports.right(ma.left) : exports.left(ma.right)); };
exports.swap = swap;
/**
 * Less strict version of [`orElse`](#orelse).
 *
 * @category combinators
 * @since 2.10.0
 */
var orElseW = function (onLeft) { return function (ma) {
    return exports.isLeft(ma) ? onLeft(ma.left) : ma;
}; };
exports.orElseW = orElseW;
/**
 * Useful for recovering from errors.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.orElse = exports.orElseW;
// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import { fromNullable, left, right } from 'fp-ts/Either'
 *
 * const parse = fromNullable('nully')
 *
 * assert.deepStrictEqual(parse(1), right(1))
 * assert.deepStrictEqual(parse(null), left('nully'))
 *
 * @category interop
 * @since 2.0.0
 */
var fromNullable = function (e) { return function (a) {
    return a == null ? exports.left(e) : exports.right(a);
}; };
exports.fromNullable = fromNullable;
/**
 * Constructs a new `Either` from a function that might throw.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: ReadonlyArray<A>): E.Either<Error, A> =>
 *   E.tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 *
 * assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
 *
 * @category interop
 * @since 2.0.0
 */
var tryCatch = function (f, onThrow) {
    try {
        return exports.right(f());
    }
    catch (e) {
        return exports.left(onThrow(e));
    }
};
exports.tryCatch = tryCatch;
/**
 * Converts a function that may throw to one returning a `Either`.
 *
 * @category interop
 * @since 2.10.0
 */
var tryCatchK = function (f, onThrow) { return function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return exports.tryCatch(function () { return f.apply(void 0, a); }, onThrow);
}; };
exports.tryCatchK = tryCatchK;
/**
 * @category interop
 * @since 2.9.0
 */
var fromNullableK = function (e) {
    var from = exports.fromNullable(e);
    return function (f) { return function_1.flow(f, from); };
};
exports.fromNullableK = fromNullableK;
/**
 * @category interop
 * @since 2.9.0
 */
var chainNullableK = function (e) {
    var from = exports.fromNullableK(e);
    return function (f) { return exports.chain(from(f)); };
};
exports.chainNullableK = chainNullableK;
/**
 * @category interop
 * @since 2.10.0
 */
exports.toUnion = 
/*#__PURE__*/
exports.foldW(function_1.identity, function_1.identity);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
function toError(e) {
    return e instanceof Error ? e : new Error(String(e));
}
exports.toError = toError;
/**
 * @since 2.0.0
 */
var elem = function (E) { return function (a, ma) {
    return exports.isLeft(ma) ? false : E.equals(a, ma.right);
}; };
exports.elem = elem;
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import { exists, left, right } from 'fp-ts/Either'
 *
 * const gt2 = exists((n: number) => n > 2)
 *
 * assert.strictEqual(gt2(left('a')), false)
 * assert.strictEqual(gt2(right(1)), false)
 * assert.strictEqual(gt2(right(3)), true)
 *
 * @since 2.0.0
 */
var exists = function (predicate) { return function (ma) {
    return exports.isLeft(ma) ? false : predicate(ma.right);
}; };
exports.exists = exists;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
exports.Do = 
/*#__PURE__*/
exports.of(_.emptyRecord);
/**
 * @since 2.8.0
 */
exports.bindTo = 
/*#__PURE__*/
Functor_1.bindTo(exports.Functor);
/**
 * @since 2.8.0
 */
exports.bind = 
/*#__PURE__*/
Chain_1.bind(exports.Chain);
/**
 * @since 2.8.0
 */
exports.bindW = exports.bind;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
exports.apS = 
/*#__PURE__*/
Apply_1.apS(exports.Apply);
/**
 * @since 2.8.0
 */
exports.apSW = exports.apS;
// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
exports.ApT = 
/*#__PURE__*/
exports.of(_.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.11.0
 */
var traverseReadonlyNonEmptyArrayWithIndex = function (f) { return function (as) {
    var e = f(0, _.head(as));
    if (exports.isLeft(e)) {
        return e;
    }
    var out = [e.right];
    for (var i = 1; i < as.length; i++) {
        var e_1 = f(i, as[i]);
        if (exports.isLeft(e_1)) {
            return e_1;
        }
        out.push(e_1.right);
    }
    return exports.right(out);
}; };
exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.11.0
 */
var traverseReadonlyArrayWithIndex = function (f) {
    var g = exports.traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
};
exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * @since 2.9.0
 */
exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
/**
 * @since 2.9.0
 */
var traverseArray = function (f) { return exports.traverseReadonlyArrayWithIndex(function (_, a) { return f(a); }); };
exports.traverseArray = traverseArray;
/**
 * @since 2.9.0
 */
exports.sequenceArray = 
/*#__PURE__*/
exports.traverseArray(function_1.identity);
/**
 * Use [`parse`](./Json.ts.html#parse) instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
function parseJSON(s, onError) {
    return exports.tryCatch(function () { return JSON.parse(s); }, onError);
}
exports.parseJSON = parseJSON;
/**
 * Use [`stringify`](./Json.ts.html#stringify) instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
var stringifyJSON = function (u, onError) {
    return exports.tryCatch(function () {
        var s = JSON.stringify(u);
        if (typeof s !== 'string') {
            throw new Error('Converting unsupported structure to JSON');
        }
        return s;
    }, onError);
};
exports.stringifyJSON = stringifyJSON;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.either = {
    URI: exports.URI,
    map: _map,
    of: exports.of,
    ap: _ap,
    chain: _chain,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    bimap: _bimap,
    mapLeft: _mapLeft,
    alt: _alt,
    extend: _extend,
    chainRec: _chainRec,
    throwError: exports.throwError
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.getApplySemigroup = 
/*#__PURE__*/
Apply_1.getApplySemigroup(exports.Apply);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.getApplyMonoid = 
/*#__PURE__*/
Applicative_1.getApplicativeMonoid(exports.Applicative);
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var getValidationSemigroup = function (SE, SA) {
    return Apply_1.getApplySemigroup(exports.getApplicativeValidation(SE))(SA);
};
exports.getValidationSemigroup = getValidationSemigroup;
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var getValidationMonoid = function (SE, MA) {
    return Applicative_1.getApplicativeMonoid(exports.getApplicativeValidation(SE))(MA);
};
exports.getValidationMonoid = getValidationMonoid;
/**
 * Use [`getApplicativeValidation`](#getapplicativevalidation) and [`getAltValidation`](#getaltvalidation) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
function getValidation(SE) {
    var ap = exports.getApplicativeValidation(SE).ap;
    var alt = exports.getAltValidation(SE).alt;
    return {
        URI: exports.URI,
        _E: undefined,
        map: _map,
        of: exports.of,
        chain: _chain,
        bimap: _bimap,
        mapLeft: _mapLeft,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        extend: _extend,
        traverse: _traverse,
        sequence: exports.sequence,
        chainRec: _chainRec,
        throwError: exports.throwError,
        ap: ap,
        alt: alt
    };
}
exports.getValidation = getValidation;


/***/ }),

/***/ 6964:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.eqDate = exports.eqNumber = exports.eqString = exports.eqBoolean = exports.eq = exports.strictEqual = exports.getStructEq = exports.getTupleEq = exports.Contravariant = exports.getMonoid = exports.getSemigroup = exports.eqStrict = exports.URI = exports.contramap = exports.tuple = exports.struct = exports.fromEquals = void 0;
var function_1 = __nccwpck_require__(6985);
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var fromEquals = function (equals) { return ({
    equals: function (x, y) { return x === y || equals(x, y); }
}); };
exports.fromEquals = fromEquals;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.10.0
 */
var struct = function (eqs) {
    return exports.fromEquals(function (first, second) {
        for (var key in eqs) {
            if (!eqs[key].equals(first[key], second[key])) {
                return false;
            }
        }
        return true;
    });
};
exports.struct = struct;
/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @example
 * import { tuple } from 'fp-ts/Eq'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import * as B from 'fp-ts/boolean'
 *
 * const E = tuple(S.Eq, N.Eq, B.Eq)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @category combinators
 * @since 2.10.0
 */
var tuple = function () {
    var eqs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eqs[_i] = arguments[_i];
    }
    return exports.fromEquals(function (first, second) { return eqs.every(function (E, i) { return E.equals(first[i], second[i]); }); });
};
exports.tuple = tuple;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var contramap_ = function (fa, f) { return function_1.pipe(fa, exports.contramap(f)); };
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Contravariant
 * @since 2.0.0
 */
var contramap = function (f) { return function (fa) {
    return exports.fromEquals(function (x, y) { return fa.equals(f(x), f(y)); });
}; };
exports.contramap = contramap;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Eq';
/**
 * @category instances
 * @since 2.5.0
 */
exports.eqStrict = {
    equals: function (a, b) { return a === b; }
};
var empty = {
    equals: function () { return true; }
};
/**
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function () { return ({
    concat: function (x, y) { return exports.fromEquals(function (a, b) { return x.equals(a, b) && y.equals(a, b); }); }
}); };
exports.getSemigroup = getSemigroup;
/**
 * @category instances
 * @since 2.6.0
 */
var getMonoid = function () { return ({
    concat: exports.getSemigroup().concat,
    empty: empty
}); };
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Contravariant = {
    URI: exports.URI,
    contramap: contramap_
};
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getTupleEq = exports.tuple;
/**
 * Use [`struct`](#struct) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getStructEq = exports.struct;
/**
 * Use [`eqStrict`](#eqstrict) instead
 *
 * @since 2.0.0
 * @deprecated
 */
exports.strictEqual = exports.eqStrict.equals;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.eq = exports.Contravariant;
/**
 * Use [`Eq`](./boolean.ts.html#eq) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.eqBoolean = exports.eqStrict;
/**
 * Use [`Eq`](./string.ts.html#eq) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.eqString = exports.eqStrict;
/**
 * Use [`Eq`](./number.ts.html#eq) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.eqNumber = exports.eqStrict;
/**
 * Use [`Eq`](./Date.ts.html#eq) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.eqDate = {
    equals: function (first, second) { return first.valueOf() === second.valueOf(); }
};


/***/ }),

/***/ 1964:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 2.10.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filterOrElse = exports.chainEitherK = exports.fromEitherK = exports.chainOptionK = exports.fromOptionK = exports.fromPredicate = exports.fromOption = void 0;
var function_1 = __nccwpck_require__(6985);
var _ = __importStar(__nccwpck_require__(1840));
function fromOption(F) {
    return function (onNone) { return function (ma) { return F.fromEither(_.isNone(ma) ? _.left(onNone()) : _.right(ma.value)); }; };
}
exports.fromOption = fromOption;
function fromPredicate(F) {
    return function (predicate, onFalse) { return function (a) {
        return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
    }; };
}
exports.fromPredicate = fromPredicate;
function fromOptionK(F) {
    var fromOptionF = fromOption(F);
    return function (onNone) {
        var from = fromOptionF(onNone);
        return function (f) { return function_1.flow(f, from); };
    };
}
exports.fromOptionK = fromOptionK;
function chainOptionK(F, M) {
    var fromOptionKF = fromOptionK(F);
    return function (onNone) {
        var from = fromOptionKF(onNone);
        return function (f) { return function (ma) { return M.chain(ma, from(f)); }; };
    };
}
exports.chainOptionK = chainOptionK;
function fromEitherK(F) {
    return function (f) { return function_1.flow(f, F.fromEither); };
}
exports.fromEitherK = fromEitherK;
function chainEitherK(F, M) {
    var fromEitherKF = fromEitherK(F);
    return function (f) { return function (ma) { return M.chain(ma, fromEitherKF(f)); }; };
}
exports.chainEitherK = chainEitherK;
function filterOrElse(F, M) {
    return function (predicate, onFalse) { return function (ma) {
        return M.chain(ma, function (a) { return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a))); });
    }; };
}
exports.filterOrElse = filterOrElse;


/***/ }),

/***/ 5533:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFunctorComposition = exports.bindTo = exports.flap = exports.map = void 0;
/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.map(fa, a => a) <-> fa`
 * 2. Composition: `F.map(fa, a => bc(ab(a))) <-> F.map(F.map(fa, ab), bc)`
 *
 * @since 2.0.0
 */
var function_1 = __nccwpck_require__(6985);
function map(F, G) {
    return function (f) { return function (fa) { return F.map(fa, function (ga) { return G.map(ga, f); }); }; };
}
exports.map = map;
function flap(F) {
    return function (a) { return function (fab) { return F.map(fab, function (f) { return f(a); }); }; };
}
exports.flap = flap;
function bindTo(F) {
    return function (name) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return (_a = {}, _a[name] = a, _a);
    }); }; };
}
exports.bindTo = bindTo;
/** @deprecated */
function getFunctorComposition(F, G) {
    var _map = map(F, G);
    return {
        map: function (fga, f) { return function_1.pipe(fga, _map(f)); }
    };
}
exports.getFunctorComposition = getFunctorComposition;


/***/ }),

/***/ 179:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`
 *
 * See [Semigroup](https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html) for some instances.
 *
 * @since 2.0.0
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatAll = exports.endo = exports.filterSecond = exports.filterFirst = exports.reverse = void 0;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Magma`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse, concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(reverse(N.MagmaSub))(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), 2)
 *
 * @category combinators
 * @since 2.11.0
 */
var reverse = function (M) { return ({
    concat: function (first, second) { return M.concat(second, first); }
}); };
exports.reverse = reverse;
/**
 * @category combinators
 * @since 2.11.0
 */
var filterFirst = function (predicate) { return function (M) { return ({
    concat: function (first, second) { return (predicate(first) ? M.concat(first, second) : second); }
}); }; };
exports.filterFirst = filterFirst;
/**
 * @category combinators
 * @since 2.11.0
 */
var filterSecond = function (predicate) { return function (M) { return ({
    concat: function (first, second) { return (predicate(second) ? M.concat(first, second) : first); }
}); }; };
exports.filterSecond = filterSecond;
/**
 * @category combinators
 * @since 2.11.0
 */
var endo = function (f) { return function (M) { return ({
    concat: function (first, second) { return M.concat(f(first), f(second)); }
}); }; };
exports.endo = endo;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(N.MagmaSub)(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), -6)
 *
 * @since 2.11.0
 */
var concatAll = function (M) { return function (startWith) { return function (as) {
    return as.reduce(function (a, acc) { return M.concat(a, acc); }, startWith);
}; }; };
exports.concatAll = concatAll;


/***/ }),

/***/ 240:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.chain = exports.ap = exports.alt = exports.altW = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.foldMap = exports.foldMapWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.of = exports.copy = exports.modifyAt = exports.updateAt = exports.insertAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromArray = exports.fromReadonlyNonEmptyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = void 0;
exports.filterWithIndex = exports.filter = exports.groupSort = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = void 0;
exports.nonEmptyArray = exports.fold = exports.prependToAll = exports.snoc = exports.cons = exports.unsnoc = exports.uncons = void 0;
var Apply_1 = __nccwpck_require__(205);
var Chain_1 = __nccwpck_require__(2372);
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
var _ = __importStar(__nccwpck_require__(1840));
var Ord_1 = __nccwpck_require__(6685);
var RNEA = __importStar(__nccwpck_require__(8630));
// -------------------------------------------------------------------------------------
// internal
// -------------------------------------------------------------------------------------
/**
 * @internal
 */
var isNonEmpty = function (as) { return as.length > 0; };
exports.isNonEmpty = isNonEmpty;
/**
 * @internal
 */
var isOutOfBound = function (i, as) { return i < 0 || i >= as.length; };
exports.isOutOfBound = isOutOfBound;
/**
 * @internal
 */
var prependW = function (head) { return function (tail) { return __spreadArray([head], tail); }; };
exports.prependW = prependW;
/**
 * @internal
 */
exports.prepend = exports.prependW;
/**
 * @internal
 */
var appendW = function (end) { return function (init) { return __spreadArray(__spreadArray([], init), [end]); }; };
exports.appendW = appendW;
/**
 * @internal
 */
exports.append = exports.appendW;
/**
 * @internal
 */
var unsafeInsertAt = function (i, a, as) {
    if (exports.isNonEmpty(as)) {
        var xs = exports.fromReadonlyNonEmptyArray(as);
        xs.splice(i, 0, a);
        return xs;
    }
    return [a];
};
exports.unsafeInsertAt = unsafeInsertAt;
/**
 * @internal
 */
var unsafeUpdateAt = function (i, a, as) {
    var xs = exports.fromReadonlyNonEmptyArray(as);
    xs[i] = a;
    return xs;
};
exports.unsafeUpdateAt = unsafeUpdateAt;
/**
 * Remove duplicates from a `NonEmptyArray`, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/NonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.11.0
 */
var uniq = function (E) { return function (as) {
    if (as.length === 1) {
        return exports.copy(as);
    }
    var out = [exports.head(as)];
    var rest = exports.tail(as);
    var _loop_1 = function (a) {
        if (out.every(function (o) { return !E.equals(o, a); })) {
            out.push(a);
        }
    };
    for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
        var a = rest_1[_i];
        _loop_1(a);
    }
    return out;
}; };
exports.uniq = uniq;
/**
 * Sort the elements of a `NonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import * as NEA from 'fp-ts/NonEmptyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 *
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = NEA.sortBy([byName, byAge])
 *
 * const persons: NEA.NonEmptyArray<Person> = [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 },
 *   { name: 'b', age: 2 }
 * ]
 *
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 2.11.0
 */
var sortBy = function (ords) {
    if (exports.isNonEmpty(ords)) {
        var M = Ord_1.getMonoid();
        return exports.sort(ords.reduce(M.concat, M.empty));
    }
    return exports.copy;
};
exports.sortBy = sortBy;
/**
 * @category combinators
 * @since 2.11.0
 */
var union = function (E) {
    var uniqE = exports.uniq(E);
    return function (second) { return function (first) { return uniqE(function_1.pipe(first, concat(second))); }; };
};
exports.union = union;
/**
 * Rotate a `NonEmptyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
 *
 * @category combinators
 * @since 2.11.0
 */
var rotate = function (n) { return function (as) {
    var len = as.length;
    var m = Math.round(n) % len;
    if (exports.isOutOfBound(Math.abs(m), as) || m === 0) {
        return exports.copy(as);
    }
    if (m < 0) {
        var _a = exports.splitAt(-m)(as), f = _a[0], s = _a[1];
        return function_1.pipe(s, concat(f));
    }
    else {
        return exports.rotate(m - len)(as);
    }
}; };
exports.rotate = rotate;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.10.0
 */
exports.fromReadonlyNonEmptyArray = _.fromReadonlyNonEmptyArray;
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @category constructors
 * @since 2.0.0
 */
var fromArray = function (as) { return (exports.isNonEmpty(as) ? _.some(as) : _.none); };
exports.fromArray = fromArray;
/**
 * Return a `NonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { makeBy } from 'fp-ts/NonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.11.0
 */
var makeBy = function (f) { return function (n) {
    var j = Math.max(0, Math.floor(n));
    var out = [f(0)];
    for (var i = 1; i < j; i++) {
        out.push(f(i));
    }
    return out;
}; };
exports.makeBy = makeBy;
/**
 * Create a `NonEmptyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { replicate } from 'fp-ts/NonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.11.0
 */
var replicate = function (a) { return exports.makeBy(function () { return a; }); };
exports.replicate = replicate;
/**
 * Create a `NonEmptyArray` containing a range of integers, including both endpoints.
 *
 * @example
 * import { range } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.11.0
 */
var range = function (start, end) {
    return start <= end ? exports.makeBy(function (i) { return start + i; })(end - start + 1) : [start];
};
exports.range = range;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Return the tuple of the `head` and the `tail`.
 *
 * @example
 * import { unprepend } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(unprepend([1, 2, 3]), [1, [2, 3]])
 *
 * @category destructors
 * @since 2.9.0
 */
var unprepend = function (as) { return [exports.head(as), exports.tail(as)]; };
exports.unprepend = unprepend;
/**
 * Return the tuple of the `init` and the `last`.
 *
 * @example
 * import { unappend } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 2.9.0
 */
var unappend = function (as) { return [exports.init(as), exports.last(as)]; };
exports.unappend = unappend;
function concatW(second) {
    return function (first) { return first.concat(second); };
}
exports.concatW = concatW;
function concat(x, y) {
    return y ? x.concat(y) : function (y) { return y.concat(x); };
}
exports.concat = concat;
/**
 * @category combinators
 * @since 2.0.0
 */
var reverse = function (as) { return __spreadArray([exports.last(as)], as.slice(0, -1).reverse()); };
exports.reverse = reverse;
function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return [];
        }
        var out = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
            var a = as[i];
            if (E.equals(a, head)) {
                nea.push(a);
            }
            else {
                out.push(nea);
                head = a;
                nea = [head];
            }
        }
        out.push(nea);
        return out;
    };
}
exports.group = group;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { groupBy } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
 *   '1': ['a', 'b'],
 *   '2': ['ab']
 * })
 *
 * @category combinators
 * @since 2.0.0
 */
var groupBy = function (f) { return function (as) {
    var out = {};
    for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
        var a = as_1[_i];
        var k = f(a);
        if (out.hasOwnProperty(k)) {
            out[k].push(a);
        }
        else {
            out[k] = [a];
        }
    }
    return out;
}; };
exports.groupBy = groupBy;
/**
 * @category combinators
 * @since 2.0.0
 */
var sort = function (O) { return function (as) {
    return as.slice().sort(O.compare);
}; };
exports.sort = sort;
/**
 * @category combinators
 * @since 2.0.0
 */
var insertAt = function (i, a) { return function (as) {
    return i < 0 || i > as.length ? _.none : _.some(exports.unsafeInsertAt(i, a, as));
}; };
exports.insertAt = insertAt;
/**
 * @category combinators
 * @since 2.0.0
 */
var updateAt = function (i, a) {
    return exports.modifyAt(i, function () { return a; });
};
exports.updateAt = updateAt;
/**
 * @category combinators
 * @since 2.0.0
 */
var modifyAt = function (i, f) { return function (as) {
    return exports.isOutOfBound(i, as) ? _.none : _.some(exports.unsafeUpdateAt(i, f(as[i]), as));
}; };
exports.modifyAt = modifyAt;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.copy = exports.fromReadonlyNonEmptyArray;
/**
 * @category Pointed
 * @since 2.0.0
 */
var of = function (a) { return [a]; };
exports.of = of;
/**
 * @category combinators
 * @since 2.5.1
 */
var zipWith = function (as, bs, f) {
    var cs = [f(as[0], bs[0])];
    var len = Math.min(as.length, bs.length);
    for (var i = 1; i < len; i++) {
        cs[i] = f(as[i], bs[i]);
    }
    return cs;
};
exports.zipWith = zipWith;
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return exports.zipWith(as, bs, function (a, b) { return [a, b]; });
}
exports.zip = zip;
/**
 * @category combinators
 * @since 2.5.1
 */
var unzip = function (abs) {
    var fa = [abs[0][0]];
    var fb = [abs[0][1]];
    for (var i = 1; i < abs.length; i++) {
        fa[i] = abs[i][0];
        fb[i] = abs[i][1];
    }
    return [fa, fb];
};
exports.unzip = unzip;
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependAll } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.10.0
 */
var prependAll = function (middle) { return function (as) {
    var out = [middle, as[0]];
    for (var i = 1; i < as.length; i++) {
        out.push(middle, as[i]);
    }
    return out;
}; };
exports.prependAll = prependAll;
/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
var intersperse = function (middle) { return function (as) {
    var rest = exports.tail(as);
    return exports.isNonEmpty(rest) ? function_1.pipe(rest, exports.prependAll(middle), exports.prepend(exports.head(as))) : exports.copy(as);
}; };
exports.intersperse = intersperse;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.foldMapWithIndex = RNEA.foldMapWithIndex;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.foldMap = RNEA.foldMap;
/**
 * @category combinators
 * @since 2.10.0
 */
var chainWithIndex = function (f) { return function (as) {
    var out = exports.fromReadonlyNonEmptyArray(f(0, exports.head(as)));
    for (var i = 1; i < as.length; i++) {
        out.push.apply(out, f(i, as[i]));
    }
    return out;
}; };
exports.chainWithIndex = chainWithIndex;
/**
 * @category combinators
 * @since 2.10.0
 */
var chop = function (f) { return function (as) {
    var _a = f(as), b = _a[0], rest = _a[1];
    var out = [b];
    var next = rest;
    while (exports.isNonEmpty(next)) {
        var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
        out.push(b_1);
        next = rest_2;
    }
    return out;
}; };
exports.chop = chop;
/**
 * Splits a `NonEmptyArray` into two pieces, the first piece has max `n` elements.
 *
 * @category combinators
 * @since 2.10.0
 */
var splitAt = function (n) { return function (as) {
    var m = Math.max(1, n);
    return m >= as.length ? [exports.copy(as), []] : [function_1.pipe(as.slice(1, m), exports.prepend(exports.head(as))), as.slice(m)];
}; };
exports.splitAt = splitAt;
/**
 * @category combinators
 * @since 2.10.0
 */
var chunksOf = function (n) { return exports.chop(exports.splitAt(n)); };
exports.chunksOf = chunksOf;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var _map = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var _mapWithIndex = function (fa, f) { return function_1.pipe(fa, exports.mapWithIndex(f)); };
/* istanbul ignore next */
var _ap = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
/* istanbul ignore next */
var _chain = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return function_1.pipe(wa, exports.extend(f)); };
/* istanbul ignore next */
var _reduce = function (fa, b, f) { return function_1.pipe(fa, exports.reduce(b, f)); };
/* istanbul ignore next */
var _foldMap = function (M) {
    var foldMapM = exports.foldMap(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var _reduceRight = function (fa, b, f) { return function_1.pipe(fa, exports.reduceRight(b, f)); };
/* istanbul ignore next */
var _traverse = function (F) {
    var traverseF = exports.traverse(F);
    return function (ta, f) { return function_1.pipe(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt = function (fa, that) { return function_1.pipe(fa, exports.alt(that)); };
/* istanbul ignore next */
var _reduceWithIndex = function (fa, b, f) {
    return function_1.pipe(fa, exports.reduceWithIndex(b, f));
};
/* istanbul ignore next */
var _foldMapWithIndex = function (M) {
    var foldMapWithIndexM = exports.foldMapWithIndex(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapWithIndexM(f)); };
};
/* istanbul ignore next */
var _reduceRightWithIndex = function (fa, b, f) {
    return function_1.pipe(fa, exports.reduceRightWithIndex(b, f));
};
/* istanbul ignore next */
var _traverseWithIndex = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (ta, f) { return function_1.pipe(ta, traverseWithIndexF(f)); };
};
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (as) {
    return function_1.pipe(as, concatW(that()));
}; };
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
exports.alt = exports.altW;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
var ap = function (as) {
    return exports.chain(function (f) { return function_1.pipe(as, exports.map(f)); });
};
exports.ap = ap;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain = function (f) {
    return exports.chainWithIndex(function (_, a) { return f(a); });
};
exports.chain = chain;
/**
 * @category Extend
 * @since 2.0.0
 */
var extend = function (f) { return function (as) {
    var next = exports.tail(as);
    var out = [f(as)];
    while (exports.isNonEmpty(next)) {
        out.push(f(next));
        next = exports.tail(next);
    }
    return out;
}; };
exports.extend = extend;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function (f) { return exports.mapWithIndex(function (_, a) { return f(a); }); };
exports.map = map;
/**
 * @category FunctorWithIndex
 * @since 2.0.0
 */
var mapWithIndex = function (f) { return function (as) {
    var out = [f(0, exports.head(as))];
    for (var i = 1; i < as.length; i++) {
        out.push(f(i, as[i]));
    }
    return out;
}; };
exports.mapWithIndex = mapWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduce = RNEA.reduce;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
exports.reduceWithIndex = RNEA.reduceWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduceRight = RNEA.reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
exports.reduceRightWithIndex = RNEA.reduceRightWithIndex;
/**
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
exports.traverse = traverse;
/**
 * @since 2.6.3
 */
var sequence = function (F) { return exports.traverseWithIndex(F)(function (_, a) { return a; }); };
exports.sequence = sequence;
/**
 * @since 2.6.3
 */
var traverseWithIndex = function (F) { return function (f) { return function (as) {
    var out = F.map(f(0, exports.head(as)), exports.of);
    for (var i = 1; i < as.length; i++) {
        out = F.ap(F.map(out, function (bs) { return function (b) { return function_1.pipe(bs, exports.append(b)); }; }), f(i, as[i]));
    }
    return out;
}; }; };
exports.traverseWithIndex = traverseWithIndex;
/**
 * @since 2.7.0
 */
exports.extract = RNEA.head;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'NonEmptyArray';
/**
 * @category instances
 * @since 2.0.0
 */
exports.getShow = RNEA.getShow;
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @category instances
 * @since 2.0.0
 */
var getSemigroup = function () { return ({
    concat: concat
}); };
exports.getSemigroup = getSemigroup;
/**
 * @example
 * import { getEq } from 'fp-ts/NonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
 *
 * @category instances
 * @since 2.0.0
 */
exports.getEq = RNEA.getEq;
/**
 * @category combinators
 * @since 2.11.0
 */
var getUnionSemigroup = function (E) {
    var unionE = exports.union(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
exports.getUnionSemigroup = getUnionSemigroup;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.flap = 
/*#__PURE__*/
Functor_1.flap(exports.Functor);
/**
 * @category instances
 * @since 2.10.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Apply = {
    URI: exports.URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apFirst = 
/*#__PURE__*/
Apply_1.apFirst(exports.Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apSecond = 
/*#__PURE__*/
Apply_1.apSecond(exports.Apply);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.chainFirst = 
/*#__PURE__*/
Chain_1.chainFirst(exports.Chain);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FoldableWithIndex = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Comonad = {
    URI: exports.URI,
    map: _map,
    extend: _extend,
    extract: exports.extract
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
exports.Do = 
/*#__PURE__*/
exports.of(_.emptyRecord);
/**
 * @since 2.8.0
 */
exports.bindTo = 
/*#__PURE__*/
Functor_1.bindTo(exports.Functor);
/**
 * @since 2.8.0
 */
exports.bind = 
/*#__PURE__*/
Chain_1.bind(exports.Chain);
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
exports.apS = 
/*#__PURE__*/
Apply_1.apS(exports.Apply);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.head = RNEA.head;
/**
 * @since 2.0.0
 */
var tail = function (as) { return as.slice(1); };
exports.tail = tail;
/**
 * @since 2.0.0
 */
exports.last = RNEA.last;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.2.0
 */
var init = function (as) { return as.slice(0, -1); };
exports.init = init;
/**
 * @since 2.0.0
 */
exports.min = RNEA.min;
/**
 * @since 2.0.0
 */
exports.max = RNEA.max;
/**
 * @since 2.10.0
 */
var concatAll = function (S) { return function (as) { return as.reduce(S.concat); }; };
exports.concatAll = concatAll;
/**
 * Break an `Array` into its first element and remaining elements.
 *
 * @category destructors
 * @since 2.11.0
 */
var matchLeft = function (f) { return function (as) { return f(exports.head(as), exports.tail(as)); }; };
exports.matchLeft = matchLeft;
/**
 * Break an `Array` into its initial elements and the last element.
 *
 * @category destructors
 * @since 2.11.0
 */
var matchRight = function (f) { return function (as) {
    return f(exports.init(as), exports.last(as));
}; };
exports.matchRight = matchRight;
/**
 * Apply a function to the head, creating a new `NonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyHead = function (f) { return function (as) { return __spreadArray([
    f(exports.head(as))
], exports.tail(as)); }; };
exports.modifyHead = modifyHead;
/**
 * Change the head, creating a new `NonEmptyArray`.
 *
 * @category combinators
 * @since 2.11.0
 */
var updateHead = function (a) { return exports.modifyHead(function () { return a; }); };
exports.updateHead = updateHead;
/**
 * Apply a function to the last element, creating a new `NonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyLast = function (f) { return function (as) {
    return function_1.pipe(exports.init(as), exports.append(f(exports.last(as))));
}; };
exports.modifyLast = modifyLast;
/**
 * Change the last element, creating a new `NonEmptyArray`.
 *
 * @category combinators
 * @since 2.11.0
 */
var updateLast = function (a) { return exports.modifyLast(function () { return a; }); };
exports.updateLast = updateLast;
function groupSort(O) {
    var sortO = exports.sort(O);
    var groupO = group(O);
    return function (as) { return (exports.isNonEmpty(as) ? groupO(sortO(as)) : []); };
}
exports.groupSort = groupSort;
function filter(predicate) {
    return exports.filterWithIndex(function (_, a) { return predicate(a); });
}
exports.filter = filter;
/**
 * Use [`filterWithIndex`](./Array.ts.html#filterwithindex) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
var filterWithIndex = function (predicate) { return function (as) { return exports.fromArray(as.filter(function (a, i) { return predicate(i, a); })); }; };
exports.filterWithIndex = filterWithIndex;
/**
 * Use [`unprepend`](#unprepend) instead.
 *
 * @category destructors
 * @since 2.9.0
 * @deprecated
 */
exports.uncons = exports.unprepend;
/**
 * Use [`unappend`](#unappend) instead.
 *
 * @category destructors
 * @since 2.9.0
 * @deprecated
 */
exports.unsnoc = exports.unappend;
function cons(head, tail) {
    return tail === undefined ? exports.prepend(head) : function_1.pipe(tail, exports.prepend(head));
}
exports.cons = cons;
/**
 * Use [`append`](./Array.ts.html#append) instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
var snoc = function (init, end) { return function_1.pipe(init, exports.append(end)); };
exports.snoc = snoc;
/**
 * Use [`prependAll`](#prependall) instead.
 *
 * @category combinators
 * @since 2.9.0
 * @deprecated
 */
exports.prependToAll = exports.prependAll;
/**
 * Use [`concatAll`](#concatall) instead.
 *
 * @since 2.5.0
 * @deprecated
 */
exports.fold = RNEA.concatAll;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.nonEmptyArray = {
    URI: exports.URI,
    of: exports.of,
    map: _map,
    mapWithIndex: _mapWithIndex,
    ap: _ap,
    chain: _chain,
    extend: _extend,
    extract: exports.extract,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex,
    alt: _alt
};


/***/ }),

/***/ 2569:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromEither = exports.MonadThrow = exports.throwError = exports.Witherable = exports.wilt = exports.wither = exports.Traversable = exports.sequence = exports.traverse = exports.Filterable = exports.partitionMap = exports.partition = exports.filterMap = exports.filter = exports.Compactable = exports.separate = exports.compact = exports.Extend = exports.extend = exports.Alternative = exports.guard = exports.Zero = exports.zero = exports.Alt = exports.alt = exports.altW = exports.Foldable = exports.reduceRight = exports.foldMap = exports.reduce = exports.Monad = exports.Chain = exports.chain = exports.Applicative = exports.Apply = exports.ap = exports.Pointed = exports.of = exports.Functor = exports.map = exports.getMonoid = exports.getOrd = exports.getEq = exports.getShow = exports.URI = exports.getRight = exports.getLeft = exports.fromPredicate = exports.some = exports.none = void 0;
exports.getLastMonoid = exports.getFirstMonoid = exports.getApplyMonoid = exports.getApplySemigroup = exports.option = exports.mapNullable = exports.getRefinement = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.exists = exports.elem = exports.toUndefined = exports.toNullable = exports.chainNullableK = exports.fromNullableK = exports.tryCatchK = exports.tryCatch = exports.fromNullable = exports.chainEitherK = exports.fromEitherK = exports.duplicate = exports.chainFirst = exports.flatten = exports.apSecond = exports.apFirst = exports.flap = exports.getOrElse = exports.getOrElseW = exports.fold = exports.match = exports.foldW = exports.matchW = exports.isNone = exports.isSome = exports.FromEither = void 0;
var Applicative_1 = __nccwpck_require__(4766);
var Apply_1 = __nccwpck_require__(205);
var Chain_1 = __nccwpck_require__(2372);
var FromEither_1 = __nccwpck_require__(1964);
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
var _ = __importStar(__nccwpck_require__(1840));
var Predicate_1 = __nccwpck_require__(6382);
var Semigroup_1 = __nccwpck_require__(6339);
var Separated_1 = __nccwpck_require__(5877);
var Witherable_1 = __nccwpck_require__(4384);
var Zero_1 = __nccwpck_require__(9734);
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 2.0.0
 */
exports.none = _.none;
/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 2.0.0
 */
exports.some = _.some;
function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? exports.some(a) : exports.none); };
}
exports.fromPredicate = fromPredicate;
/**
 * Returns the `Left` value of an `Either` if possible.
 *
 * @example
 * import { getLeft, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 *
 * @category constructors
 * @since 2.0.0
 */
var getLeft = function (ma) { return (ma._tag === 'Right' ? exports.none : exports.some(ma.left)); };
exports.getLeft = getLeft;
/**
 * Returns the `Right` value of an `Either` if possible.
 *
 * @example
 * import { getRight, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(left('a')), none)
 *
 * @category constructors
 * @since 2.0.0
 */
var getRight = function (ma) { return (ma._tag === 'Left' ? exports.none : exports.some(ma.right)); };
exports.getRight = getRight;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var _map = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
var _ap = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
var _chain = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
var _reduce = function (fa, b, f) { return function_1.pipe(fa, exports.reduce(b, f)); };
var _foldMap = function (M) {
    var foldMapM = exports.foldMap(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapM(f)); };
};
var _reduceRight = function (fa, b, f) { return function_1.pipe(fa, exports.reduceRight(b, f)); };
var _traverse = function (F) {
    var traverseF = exports.traverse(F);
    return function (ta, f) { return function_1.pipe(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt = function (fa, that) { return function_1.pipe(fa, exports.alt(that)); };
var _filter = function (fa, predicate) { return function_1.pipe(fa, exports.filter(predicate)); };
/* istanbul ignore next */
var _filterMap = function (fa, f) { return function_1.pipe(fa, exports.filterMap(f)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return function_1.pipe(wa, exports.extend(f)); };
/* istanbul ignore next */
var _partition = function (fa, predicate) {
    return function_1.pipe(fa, exports.partition(predicate));
};
/* istanbul ignore next */
var _partitionMap = function (fa, f) { return function_1.pipe(fa, exports.partitionMap(f)); };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Option';
/**
 * @category instances
 * @since 2.0.0
 */
var getShow = function (S) { return ({
    show: function (ma) { return (exports.isNone(ma) ? 'none' : "some(" + S.show(ma.value) + ")"); }
}); };
exports.getShow = getShow;
/**
 * @example
 * import { none, some, getEq } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals(none, none), true)
 * assert.strictEqual(E.equals(none, some(1)), false)
 * assert.strictEqual(E.equals(some(1), none), false)
 * assert.strictEqual(E.equals(some(1), some(2)), false)
 * assert.strictEqual(E.equals(some(1), some(1)), true)
 *
 * @category instances
 * @since 2.0.0
 */
var getEq = function (E) { return ({
    equals: function (x, y) { return x === y || (exports.isNone(x) ? exports.isNone(y) : exports.isNone(y) ? false : E.equals(x.value, y.value)); }
}); };
exports.getEq = getEq;
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 *
 * const O = getOrd(N.Ord)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @category instances
 * @since 2.0.0
 */
var getOrd = function (O) { return ({
    equals: exports.getEq(O).equals,
    compare: function (x, y) { return (x === y ? 0 : exports.isSome(x) ? (exports.isSome(y) ? O.compare(x.value, y.value) : 1) : -1); }
}); };
exports.getOrd = getOrd;
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(b) | some(b)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/Option'
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * const M = getMonoid(SemigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @category instances
 * @since 2.0.0
 */
var getMonoid = function (S) { return ({
    concat: function (x, y) { return (exports.isNone(x) ? y : exports.isNone(y) ? x : exports.some(S.concat(x.value, y.value))); },
    empty: exports.none
}); };
exports.getMonoid = getMonoid;
/**
 * @category instance operations
 * @since 2.0.0
 */
var map = function (f) { return function (fa) {
    return exports.isNone(fa) ? exports.none : exports.some(f(fa.value));
}; };
exports.map = map;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * @category instance operations
 * @since 2.7.0
 */
exports.of = exports.some;
/**
 * @category instances
 * @since 2.10.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * @category instance operations
 * @since 2.0.0
 */
var ap = function (fa) { return function (fab) {
    return exports.isNone(fab) ? exports.none : exports.isNone(fa) ? exports.none : exports.some(fab.value(fa.value));
}; };
exports.ap = ap;
/**
 * @category instances
 * @since 2.10.0
 */
exports.Apply = {
    URI: exports.URI,
    map: _map,
    ap: _ap
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category instance operations
 * @since 2.0.0
 */
var chain = function (f) { return function (ma) {
    return exports.isNone(ma) ? exports.none : f(ma.value);
}; };
exports.chain = chain;
/**
 * @category instances
 * @since 2.10.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain
};
/**
 * @category instance operations
 * @since 2.0.0
 */
var reduce = function (b, f) { return function (fa) {
    return exports.isNone(fa) ? b : f(b, fa.value);
}; };
exports.reduce = reduce;
/**
 * @category instance operations
 * @since 2.0.0
 */
var foldMap = function (M) { return function (f) { return function (fa) {
    return exports.isNone(fa) ? M.empty : f(fa.value);
}; }; };
exports.foldMap = foldMap;
/**
 * @category instance operations
 * @since 2.0.0
 */
var reduceRight = function (b, f) { return function (fa) {
    return exports.isNone(fa) ? b : f(fa.value, b);
}; };
exports.reduceRight = reduceRight;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category instance operations
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) {
    return exports.isNone(fa) ? that() : fa;
}; };
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 *
 * @category instance operations
 * @since 2.0.0
 */
exports.alt = exports.altW;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: _map,
    alt: _alt
};
/**
 * @category instance operations
 * @since 2.7.0
 */
var zero = function () { return exports.none; };
exports.zero = zero;
/**
 * @category instances
 * @since 2.11.0
 */
exports.Zero = {
    URI: exports.URI,
    zero: exports.zero
};
/**
 * @category constructors
 * @since 2.11.0
 */
exports.guard = 
/*#__PURE__*/
Zero_1.guard(exports.Zero, exports.Pointed);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alternative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    alt: _alt,
    zero: exports.zero
};
/**
 * @category instance operations
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return exports.isNone(wa) ? exports.none : exports.some(f(wa));
}; };
exports.extend = extend;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Extend = {
    URI: exports.URI,
    map: _map,
    extend: _extend
};
/**
 * @category instance operations
 * @since 2.0.0
 */
exports.compact = 
/*#__PURE__*/
exports.chain(function_1.identity);
var defaultSeparated = 
/*#__PURE__*/
Separated_1.separated(exports.none, exports.none);
/**
 * @category instance operations
 * @since 2.0.0
 */
var separate = function (ma) {
    return exports.isNone(ma) ? defaultSeparated : Separated_1.separated(exports.getLeft(ma.value), exports.getRight(ma.value));
};
exports.separate = separate;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Compactable = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @category instance operations
 * @since 2.0.0
 */
var filter = function (predicate) { return function (fa) { return (exports.isNone(fa) ? exports.none : predicate(fa.value) ? fa : exports.none); }; };
exports.filter = filter;
/**
 * @category instance operations
 * @since 2.0.0
 */
var filterMap = function (f) { return function (fa) {
    return exports.isNone(fa) ? exports.none : f(fa.value);
}; };
exports.filterMap = filterMap;
/**
 * @category instance operations
 * @since 2.0.0
 */
var partition = function (predicate) { return function (fa) { return Separated_1.separated(_filter(fa, Predicate_1.not(predicate)), _filter(fa, predicate)); }; };
exports.partition = partition;
/**
 * @category instance operations
 * @since 2.0.0
 */
var partitionMap = function (f) { return function_1.flow(exports.map(f), exports.separate); };
exports.partitionMap = partitionMap;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Filterable = {
    URI: exports.URI,
    map: _map,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap
};
/**
 * @category instance operations
 * @since 2.6.3
 */
var traverse = function (F) { return function (f) { return function (ta) { return (exports.isNone(ta) ? F.of(exports.none) : F.map(f(ta.value), exports.some)); }; }; };
exports.traverse = traverse;
/**
 * @category instance operations
 * @since 2.6.3
 */
var sequence = function (F) { return function (ta) { return (exports.isNone(ta) ? F.of(exports.none) : F.map(ta.value, exports.some)); }; };
exports.sequence = sequence;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence
};
var _wither = 
/*#__PURE__*/
Witherable_1.witherDefault(exports.Traversable, exports.Compactable);
var _wilt = 
/*#__PURE__*/
Witherable_1.wiltDefault(exports.Traversable, exports.Compactable);
/**
 * @category instance operations
 * @since 2.6.5
 */
var wither = function (F) {
    var _witherF = _wither(F);
    return function (f) { return function (fa) { return _witherF(fa, f); }; };
};
exports.wither = wither;
/**
 * @category instance operations
 * @since 2.6.5
 */
var wilt = function (F) {
    var _wiltF = _wilt(F);
    return function (f) { return function (fa) { return _wiltF(fa, f); }; };
};
exports.wilt = wilt;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Witherable = {
    URI: exports.URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: _wither,
    wilt: _wilt
};
/**
 * @category instance operations
 * @since 2.7.0
 */
var throwError = function () { return exports.none; };
exports.throwError = throwError;
/**
 * @category instances
 * @since 2.7.0
 */
exports.MonadThrow = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain,
    throwError: exports.throwError
};
/**
 * Transforms an `Either` to an `Option` discarding the error.
 *
 * Alias of [getRight](#getright)
 *
 * @category natural transformations
 * @since 2.0.0
 */
exports.fromEither = exports.getRight;
/**
 * @category instances
 * @since 2.11.0
 */
exports.FromEither = {
    URI: exports.URI,
    fromEither: exports.fromEither
};
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category refinements
 * @since 2.0.0
 */
exports.isSome = _.isSome;
/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category refinements
 * @since 2.0.0
 */
var isNone = function (fa) { return fa._tag === 'None'; };
exports.isNone = isNone;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
var matchW = function (onNone, onSome) { return function (ma) {
    return exports.isNone(ma) ? onNone() : onSome(ma.value);
}; };
exports.matchW = matchW;
/**
 * Alias of [`matchW`](#matchw).
 *
 * @category destructors
 * @since 2.10.0
 */
exports.foldW = exports.matchW;
/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, match } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category destructors
 * @since 2.10.0
 */
exports.match = exports.matchW;
/**
 * Alias of [`match`](#match).
 *
 * @category destructors
 * @since 2.0.0
 */
exports.fold = exports.match;
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.6.0
 */
var getOrElseW = function (onNone) { return function (ma) { return (exports.isNone(ma) ? onNone() : ma.value); }; };
exports.getOrElseW = getOrElseW;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
exports.getOrElse = exports.getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.flap = 
/*#__PURE__*/
Functor_1.flap(exports.Functor);
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.apFirst = 
/*#__PURE__*/
Apply_1.apFirst(exports.Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.apSecond = 
/*#__PURE__*/
Apply_1.apSecond(exports.Apply);
/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.flatten = exports.compact;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.chainFirst = 
/*#__PURE__*/
Chain_1.chainFirst(exports.Chain);
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * @category combinators
 * @since 2.11.0
 */
exports.fromEitherK = 
/*#__PURE__*/
FromEither_1.fromEitherK(exports.FromEither);
/**
 * @category combinators
 * @since 2.11.0
 */
exports.chainEitherK = 
/*#__PURE__*/
FromEither_1.chainEitherK(exports.FromEither, exports.Chain);
// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category interop
 * @since 2.0.0
 */
var fromNullable = function (a) { return (a == null ? exports.none : exports.some(a)); };
exports.fromNullable = fromNullable;
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
 * `Some`.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @category interop
 * @since 2.0.0
 */
var tryCatch = function (f) {
    try {
        return exports.some(f());
    }
    catch (e) {
        return exports.none;
    }
};
exports.tryCatch = tryCatch;
/**
 * Converts a function that may throw to one returning a `Option`.
 *
 * @category interop
 * @since 2.10.0
 */
var tryCatchK = function (f) { return function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return exports.tryCatch(function () { return f.apply(void 0, a); });
}; };
exports.tryCatchK = tryCatchK;
/**
 * Returns a *smart constructor* from a function that returns a nullable value.
 *
 * @example
 * import { fromNullableK, none, some } from 'fp-ts/Option'
 *
 * const f = (s: string): number | undefined => {
 *   const n = parseFloat(s)
 *   return isNaN(n) ? undefined : n
 * }
 *
 * const g = fromNullableK(f)
 *
 * assert.deepStrictEqual(g('1'), some(1))
 * assert.deepStrictEqual(g('a'), none)
 *
 * @category interop
 * @since 2.9.0
 */
var fromNullableK = function (f) { return function_1.flow(f, exports.fromNullable); };
exports.fromNullableK = fromNullableK;
/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, fromNullable, chainNullableK } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Employee {
 *   readonly company?: {
 *     readonly address?: {
 *       readonly street?: {
 *         readonly name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee1.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   none
 * )
 *
 * @category interop
 * @since 2.9.0
 */
var chainNullableK = function (f) { return function (ma) {
    return exports.isNone(ma) ? exports.none : exports.fromNullable(f(ma.value));
}; };
exports.chainNullableK = chainNullableK;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNullable } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNullable
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNullable
 *   ),
 *   null
 * )
 *
 * @category interop
 * @since 2.0.0
 */
exports.toNullable = 
/*#__PURE__*/
exports.match(function_1.constNull, function_1.identity);
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toUndefined
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toUndefined
 *   ),
 *   undefined
 * )
 *
 * @category interop
 * @since 2.0.0
 */
exports.toUndefined = 
/*#__PURE__*/
exports.match(function_1.constUndefined, function_1.identity);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if `ma` contains `a`
 *
 * @example
 * import { some, none, elem } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 *
 * assert.strictEqual(elem(N.Eq)(1, some(1)), true)
 * assert.strictEqual(elem(N.Eq)(2, some(1)), false)
 * assert.strictEqual(elem(N.Eq)(1, none), false)
 *
 * @since 2.0.0
 */
function elem(E) {
    return function (a, ma) { return (exports.isNone(ma) ? false : E.equals(a, ma.value)); };
}
exports.elem = elem;
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 0)
 *   ),
 *   true
 * )
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 1)
 *   ),
 *   false
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 2.0.0
 */
var exists = function (predicate) { return function (ma) {
    return exports.isNone(ma) ? false : predicate(ma.value);
}; };
exports.exists = exists;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
exports.Do = 
/*#__PURE__*/
exports.of(_.emptyRecord);
/**
 * @since 2.8.0
 */
exports.bindTo = 
/*#__PURE__*/
Functor_1.bindTo(exports.Functor);
/**
 * @since 2.8.0
 */
exports.bind = 
/*#__PURE__*/
Chain_1.bind(exports.Chain);
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
exports.apS = 
/*#__PURE__*/
Apply_1.apS(exports.Apply);
// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
exports.ApT = 
/*#__PURE__*/
exports.of(_.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.11.0
 */
var traverseReadonlyNonEmptyArrayWithIndex = function (f) { return function (as) {
    var o = f(0, _.head(as));
    if (exports.isNone(o)) {
        return exports.none;
    }
    var out = [o.value];
    for (var i = 1; i < as.length; i++) {
        var o_1 = f(i, as[i]);
        if (exports.isNone(o_1)) {
            return exports.none;
        }
        out.push(o_1.value);
    }
    return exports.some(out);
}; };
exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.11.0
 */
var traverseReadonlyArrayWithIndex = function (f) {
    var g = exports.traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
};
exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * @since 2.9.0
 */
exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
/**
 * @since 2.9.0
 */
var traverseArray = function (f) {
    return exports.traverseReadonlyArrayWithIndex(function (_, a) { return f(a); });
};
exports.traverseArray = traverseArray;
/**
 * @since 2.9.0
 */
exports.sequenceArray = 
/*#__PURE__*/
exports.traverseArray(function_1.identity);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
// tslint:disable: deprecation
/**
 * Use `Refinement` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
function getRefinement(getOption) {
    return function (a) { return exports.isSome(getOption(a)); };
}
exports.getRefinement = getRefinement;
/**
 * Use [`chainNullableK`](#chainnullablek) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.mapNullable = exports.chainNullableK;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.option = {
    URI: exports.URI,
    map: _map,
    of: exports.of,
    ap: _ap,
    chain: _chain,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    zero: exports.zero,
    alt: _alt,
    extend: _extend,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: _wither,
    wilt: _wilt,
    throwError: exports.throwError
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.getApplySemigroup = 
/*#__PURE__*/
Apply_1.getApplySemigroup(exports.Apply);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.getApplyMonoid = 
/*#__PURE__*/
Applicative_1.getApplicativeMonoid(exports.Applicative);
/**
 * Use
 *
 * ```ts
 * import { first } from 'fp-ts/Semigroup'
 * import { getMonoid } from 'fp-ts/Option'
 *
 * getMonoid(first())
 * ```
 *
 * instead.
 *
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(b) | some(b)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(2)), some(2))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var getFirstMonoid = function () { return exports.getMonoid(Semigroup_1.first()); };
exports.getFirstMonoid = getFirstMonoid;
/**
 * Use
 *
 * ```ts
 * import { last } from 'fp-ts/Semigroup'
 * import { getMonoid } from 'fp-ts/Option'
 *
 * getMonoid(last())
 * ```
 *
 * instead.
 *
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(b) | some(b)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(2)), some(2))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var getLastMonoid = function () { return exports.getMonoid(Semigroup_1.last()); };
exports.getLastMonoid = getLastMonoid;


/***/ }),

/***/ 6685:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ordDate = exports.ordNumber = exports.ordString = exports.ordBoolean = exports.ord = exports.getDualOrd = exports.getTupleOrd = exports.between = exports.clamp = exports.max = exports.min = exports.geq = exports.leq = exports.gt = exports.lt = exports.equals = exports.trivial = exports.Contravariant = exports.getMonoid = exports.getSemigroup = exports.URI = exports.contramap = exports.reverse = exports.tuple = exports.fromCompare = exports.equalsDefault = void 0;
var Eq_1 = __nccwpck_require__(6964);
var function_1 = __nccwpck_require__(6985);
// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------
/**
 * @category defaults
 * @since 2.10.0
 */
var equalsDefault = function (compare) { return function (first, second) {
    return first === second || compare(first, second) === 0;
}; };
exports.equalsDefault = equalsDefault;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var fromCompare = function (compare) { return ({
    equals: exports.equalsDefault(compare),
    compare: function (first, second) { return (first === second ? 0 : compare(first, second)); }
}); };
exports.fromCompare = fromCompare;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Ord'
 * import * as B from 'fp-ts/boolean'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 *
 * const O = tuple(S.Ord, N.Ord, B.Ord)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @category combinators
 * @since 2.10.0
 */
var tuple = function () {
    var ords = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ords[_i] = arguments[_i];
    }
    return exports.fromCompare(function (first, second) {
        var i = 0;
        for (; i < ords.length - 1; i++) {
            var r = ords[i].compare(first[i], second[i]);
            if (r !== 0) {
                return r;
            }
        }
        return ords[i].compare(first[i], second[i]);
    });
};
exports.tuple = tuple;
/**
 * @category combinators
 * @since 2.10.0
 */
var reverse = function (O) { return exports.fromCompare(function (first, second) { return O.compare(second, first); }); };
exports.reverse = reverse;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var contramap_ = function (fa, f) { return function_1.pipe(fa, exports.contramap(f)); };
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Contravariant
 * @since 2.0.0
 */
var contramap = function (f) { return function (fa) {
    return exports.fromCompare(function (first, second) { return fa.compare(f(first), f(second)); });
}; };
exports.contramap = contramap;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Ord';
/**
 * @category instances
 * @since 2.0.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) {
        return exports.fromCompare(function (a, b) {
            var ox = first.compare(a, b);
            return ox !== 0 ? ox : second.compare(a, b);
        });
    }
}); };
exports.getSemigroup = getSemigroup;
/**
 * Returns a `Monoid` such that:
 *
 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import { contramap, reverse, getMonoid } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as B from 'fp-ts/boolean'
 * import { pipe } from 'fp-ts/function'
 * import { concatAll } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * interface User {
 *   readonly id: number
 *   readonly name: string
 *   readonly age: number
 *   readonly rememberMe: boolean
 * }
 *
 * const byName = pipe(
 *   S.Ord,
 *   contramap((p: User) => p.name)
 * )
 *
 * const byAge = pipe(
 *   N.Ord,
 *   contramap((p: User) => p.age)
 * )
 *
 * const byRememberMe = pipe(
 *   B.Ord,
 *   contramap((p: User) => p.rememberMe)
 * )
 *
 * const M = getMonoid<User>()
 *
 * const users: Array<User> = [
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
 * ]
 *
 * // sort by name, then by age, then by `rememberMe`
 * const O1 = concatAll(M)([byName, byAge, byRememberMe])
 * assert.deepStrictEqual(sort(O1)(users), [
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * // now `rememberMe = true` first, then by name, then by age
 * const O2 = concatAll(M)([reverse(byRememberMe), byName, byAge])
 * assert.deepStrictEqual(sort(O2)(users), [
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * @category instances
 * @since 2.4.0
 */
var getMonoid = function () { return ({
    concat: exports.getSemigroup().concat,
    empty: exports.fromCompare(function () { return 0; })
}); };
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Contravariant = {
    URI: exports.URI,
    contramap: contramap_
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
exports.trivial = {
    equals: function_1.constTrue,
    compare: 
    /*#__PURE__*/
    function_1.constant(0)
};
/**
 * @since 2.11.0
 */
var equals = function (O) { return function (second) { return function (first) {
    return first === second || O.compare(first, second) === 0;
}; }; };
exports.equals = equals;
// TODO: curry in v3
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
var lt = function (O) { return function (first, second) { return O.compare(first, second) === -1; }; };
exports.lt = lt;
// TODO: curry in v3
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
var gt = function (O) { return function (first, second) { return O.compare(first, second) === 1; }; };
exports.gt = gt;
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
var leq = function (O) { return function (first, second) { return O.compare(first, second) !== 1; }; };
exports.leq = leq;
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
var geq = function (O) { return function (first, second) { return O.compare(first, second) !== -1; }; };
exports.geq = geq;
// TODO: curry in v3
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
var min = function (O) { return function (first, second) {
    return first === second || O.compare(first, second) < 1 ? first : second;
}; };
exports.min = min;
// TODO: curry in v3
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
var max = function (O) { return function (first, second) {
    return first === second || O.compare(first, second) > -1 ? first : second;
}; };
exports.max = max;
/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
var clamp = function (O) {
    var minO = exports.min(O);
    var maxO = exports.max(O);
    return function (low, hi) { return function (a) { return maxO(minO(a, hi), low); }; };
};
exports.clamp = clamp;
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
var between = function (O) {
    var ltO = exports.lt(O);
    var gtO = exports.gt(O);
    return function (low, hi) { return function (a) { return (ltO(a, low) || gtO(a, hi) ? false : true); }; };
};
exports.between = between;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
// tslint:disable: deprecation
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getTupleOrd = exports.tuple;
/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getDualOrd = exports.reverse;
/**
 * Use [`Contravariant`](#contravariant) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.ord = exports.Contravariant;
// default compare for primitive types
function compare(first, second) {
    return first < second ? -1 : first > second ? 1 : 0;
}
var strictOrd = {
    equals: Eq_1.eqStrict.equals,
    compare: compare
};
/**
 * Use [`Ord`](./boolean.ts.html#ord) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.ordBoolean = strictOrd;
/**
 * Use [`Ord`](./string.ts.html#ord) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.ordString = strictOrd;
/**
 * Use [`Ord`](./number.ts.html#ord) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.ordNumber = strictOrd;
/**
 * Use [`Ord`](./Date.ts.html#ord) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.ordDate = 
/*#__PURE__*/
function_1.pipe(exports.ordNumber, 
/*#__PURE__*/
exports.contramap(function (date) { return date.valueOf(); }));


/***/ }),

/***/ 6382:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.and = exports.or = exports.not = exports.Contravariant = exports.getMonoidAll = exports.getSemigroupAll = exports.getMonoidAny = exports.getSemigroupAny = exports.URI = exports.contramap = void 0;
var function_1 = __nccwpck_require__(6985);
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
var contramap_ = function (predicate, f) { return function_1.pipe(predicate, exports.contramap(f)); };
/**
 * @category Contravariant
 * @since 2.11.0
 */
var contramap = function (f) { return function (predicate) { return function_1.flow(f, predicate); }; };
exports.contramap = contramap;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.11.0
 */
exports.URI = 'Predicate';
/**
 * @category instances
 * @since 2.11.0
 */
var getSemigroupAny = function () { return ({
    concat: function (first, second) { return function_1.pipe(first, exports.or(second)); }
}); };
exports.getSemigroupAny = getSemigroupAny;
/**
 * @category instances
 * @since 2.11.0
 */
var getMonoidAny = function () { return ({
    concat: exports.getSemigroupAny().concat,
    empty: function_1.constFalse
}); };
exports.getMonoidAny = getMonoidAny;
/**
 * @category instances
 * @since 2.11.0
 */
var getSemigroupAll = function () { return ({
    concat: function (first, second) { return function_1.pipe(first, exports.and(second)); }
}); };
exports.getSemigroupAll = getSemigroupAll;
/**
 * @category instances
 * @since 2.11.0
 */
var getMonoidAll = function () { return ({
    concat: exports.getSemigroupAll().concat,
    empty: function_1.constTrue
}); };
exports.getMonoidAll = getMonoidAll;
/**
 * @category instances
 * @since 2.11.0
 */
exports.Contravariant = {
    URI: exports.URI,
    contramap: contramap_
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
var not = function (predicate) { return function (a) { return !predicate(a); }; };
exports.not = not;
/**
 * @since 2.11.0
 */
var or = function (second) { return function (first) { return function (a) { return first(a) || second(a); }; }; };
exports.or = or;
/**
 * @since 2.11.0
 */
var and = function (second) { return function (first) { return function (a) { return first(a) && second(a); }; }; };
exports.and = and;


/***/ }),

/***/ 4234:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sort = exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.lookup = exports.isOutOfBound = exports.size = exports.scanRight = exports.scanLeft = exports.chainWithIndex = exports.foldRight = exports.matchRight = exports.matchRightW = exports.foldLeft = exports.matchLeft = exports.matchLeftW = exports.match = exports.matchW = exports.fromEither = exports.fromOption = exports.fromPredicate = exports.replicate = exports.makeBy = exports.appendW = exports.append = exports.prependW = exports.prepend = exports.isNonEmpty = exports.isEmpty = void 0;
exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.foldMap = exports.reduce = exports.foldMapWithIndex = exports.duplicate = exports.extend = exports.filterWithIndex = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.compact = exports.filterMap = exports.filterMapWithIndex = exports.filter = exports.separate = exports.mapWithIndex = exports.map = exports.flatten = exports.chain = exports.ap = exports.alt = exports.altW = exports.zero = exports.of = exports._chainRecBreadthFirst = exports._chainRecDepthFirst = exports.difference = exports.intersection = exports.union = exports.concat = exports.concatW = exports.comprehension = exports.fromOptionK = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = void 0;
exports.toArray = exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.fromEitherK = exports.FromEither = exports.filterE = exports.Witherable = exports.ChainRecBreadthFirst = exports.chainRecBreadthFirst = exports.ChainRecDepthFirst = exports.chainRecDepthFirst = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.guard = exports.Zero = exports.Alt = exports.Unfoldable = exports.chainFirst = exports.Monad = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getOrd = exports.getEq = exports.getMonoid = exports.getSemigroup = exports.getShow = exports.URI = exports.unfold = exports.wilt = exports.wither = exports.traverseWithIndex = void 0;
exports.readonlyArray = exports.prependToAll = exports.snoc = exports.cons = exports.range = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.exists = exports.some = exports.every = exports.empty = exports.fromArray = void 0;
var Apply_1 = __nccwpck_require__(205);
var Chain_1 = __nccwpck_require__(2372);
var Eq_1 = __nccwpck_require__(6964);
var FromEither_1 = __nccwpck_require__(1964);
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
var _ = __importStar(__nccwpck_require__(1840));
var N = __importStar(__nccwpck_require__(52));
var Ord_1 = __nccwpck_require__(6685);
var RNEA = __importStar(__nccwpck_require__(8630));
var Separated_1 = __nccwpck_require__(5877);
var Witherable_1 = __nccwpck_require__(4384);
var Zero_1 = __nccwpck_require__(9734);
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * Test whether a `ReadonlyArray` is empty.
 *
 * @example
 * import { isEmpty } from 'fp-ts/ReadonlyArray'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @category refinements
 * @since 2.5.0
 */
var isEmpty = function (as) { return as.length === 0; };
exports.isEmpty = isEmpty;
/**
 * Test whether a `ReadonlyArray` is non empty.
 *
 * @category refinements
 * @since 2.5.0
 */
exports.isNonEmpty = RNEA.isNonEmpty;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Prepend an element to the front of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { prepend } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([2, 3, 4], prepend(1)), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.10.0
 */
exports.prepend = RNEA.prepend;
/**
 * Less strict version of [`prepend`](#prepend).
 *
 * @category constructors
 * @since 2.11.0
 */
exports.prependW = RNEA.prependW;
/**
 * Append an element to the end of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { append } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.10.0
 */
exports.append = RNEA.append;
/**
 * Less strict version of [`append`](#append).
 *
 * @category constructors
 * @since 2.11.0
 */
exports.appendW = RNEA.appendW;
/**
 * Return a `ReadonlyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyArray'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.5.0
 */
var makeBy = function (n, f) { return (n <= 0 ? exports.empty : RNEA.makeBy(f)(n)); };
exports.makeBy = makeBy;
/**
 * Create a `ReadonlyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.5.0
 */
var replicate = function (n, a) { return exports.makeBy(n, function () { return a; }); };
exports.replicate = replicate;
function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? [a] : exports.empty); };
}
exports.fromPredicate = fromPredicate;
// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------
/**
 * @category natural transformations
 * @since 2.11.0
 */
var fromOption = function (ma) { return (_.isNone(ma) ? exports.empty : [ma.value]); };
exports.fromOption = fromOption;
/**
 * Transforms an `Either` to a `ReadonlyArray`.
 *
 * @category natural transformations
 * @since 2.11.0
 */
var fromEither = function (e) { return (_.isLeft(e) ? exports.empty : [e.right]); };
exports.fromEither = fromEither;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.11.0
 */
var matchW = function (onEmpty, onNonEmpty) { return function (as) { return (exports.isNonEmpty(as) ? onNonEmpty(as) : onEmpty()); }; };
exports.matchW = matchW;
/**
 * @category destructors
 * @since 2.11.0
 */
exports.match = exports.matchW;
/**
 * Less strict version of [`matchLeft`](#matchleft).
 *
 * @category destructors
 * @since 2.11.0
 */
var matchLeftW = function (onEmpty, onNonEmpty) { return function (as) { return (exports.isNonEmpty(as) ? onNonEmpty(RNEA.head(as), RNEA.tail(as)) : onEmpty()); }; };
exports.matchLeftW = matchLeftW;
/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @example
 * import { matchLeft } from 'fp-ts/ReadonlyArray'
 *
 * const len: <A>(as: ReadonlyArray<A>) => number = matchLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category destructors
 * @since 2.10.0
 */
exports.matchLeft = exports.matchLeftW;
/**
 * Alias of [`matchLeft`](#matchleft).
 *
 * @category destructors
 * @since 2.5.0
 */
exports.foldLeft = exports.matchLeft;
/**
 * Less strict version of [`matchRight`](#matchright).
 *
 * @category destructors
 * @since 2.11.0
 */
var matchRightW = function (onEmpty, onNonEmpty) { return function (as) { return (exports.isNonEmpty(as) ? onNonEmpty(RNEA.init(as), RNEA.last(as)) : onEmpty()); }; };
exports.matchRightW = matchRightW;
/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category destructors
 * @since 2.10.0
 */
exports.matchRight = exports.matchRightW;
/**
 * Alias of [`matchRight`](#matchright).
 *
 * @category destructors
 * @since 2.5.0
 */
exports.foldRight = exports.matchRight;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.7.0
 */
var chainWithIndex = function (f) { return function (as) {
    if (exports.isEmpty(as)) {
        return exports.empty;
    }
    var out = [];
    for (var i = 0; i < as.length; i++) {
        out.push.apply(out, f(i, as[i]));
    }
    return out;
}; };
exports.chainWithIndex = chainWithIndex;
/**
 * Same as `reduce` but it carries over the intermediate steps.
 *
 * @example
 * import { scanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @category combinators
 * @since 2.5.0
 */
var scanLeft = function (b, f) { return function (as) {
    var len = as.length;
    var out = new Array(len + 1);
    out[0] = b;
    for (var i = 0; i < len; i++) {
        out[i + 1] = f(out[i], as[i]);
    }
    return out;
}; };
exports.scanLeft = scanLeft;
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @category combinators
 * @since 2.5.0
 */
var scanRight = function (b, f) { return function (as) {
    var len = as.length;
    var out = new Array(len + 1);
    out[len] = b;
    for (var i = len - 1; i >= 0; i--) {
        out[i] = f(as[i], out[i + 1]);
    }
    return out;
}; };
exports.scanRight = scanRight;
/**
 * Calculate the number of elements in a `ReadonlyArray`.
 *
 * @since 2.10.0
 */
var size = function (as) { return as.length; };
exports.size = size;
/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
exports.isOutOfBound = RNEA.isOutOfBound;
function lookup(i, as) {
    return as === undefined ? function (as) { return lookup(i, as); } : exports.isOutOfBound(i, as) ? _.none : _.some(as[i]);
}
exports.lookup = lookup;
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.5.0
 */
var head = function (as) { return (exports.isNonEmpty(as) ? _.some(RNEA.head(as)) : _.none); };
exports.head = head;
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.5.0
 */
var last = function (as) { return (exports.isNonEmpty(as) ? _.some(RNEA.last(as)) : _.none); };
exports.last = last;
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 2.5.0
 */
var tail = function (as) {
    return exports.isNonEmpty(as) ? _.some(RNEA.tail(as)) : _.none;
};
exports.tail = tail;
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 2.5.0
 */
var init = function (as) {
    return exports.isNonEmpty(as) ? _.some(RNEA.init(as)) : _.none;
};
exports.init = init;
/**
 * Keep only a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.takeLeft(2)), [1, 2])
 *
 * // out of bounds
 * assert.strictEqual(pipe(input, RA.takeLeft(4)), input)
 * assert.strictEqual(pipe(input, RA.takeLeft(-1)), input)
 *
 * @category combinators
 * @since 2.5.0
 */
var takeLeft = function (n) { return function (as) {
    return exports.isOutOfBound(n, as) ? as : n === 0 ? exports.empty : as.slice(0, n);
}; };
exports.takeLeft = takeLeft;
/**
 * Keep only a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.takeRight(2)), [2, 3])
 *
 * // out of bounds
 * assert.strictEqual(pipe(input, RA.takeRight(4)), input)
 * assert.strictEqual(pipe(input, RA.takeRight(-1)), input)
 *
 * @category combinators
 * @since 2.5.0
 */
var takeRight = function (n) { return function (as) {
    return exports.isOutOfBound(n, as) ? as : n === 0 ? exports.empty : as.slice(-n);
}; };
exports.takeRight = takeRight;
function takeLeftWhile(predicate) {
    return function (as) {
        var out = [];
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            if (!predicate(a)) {
                break;
            }
            out.push(a);
        }
        var len = out.length;
        return len === as.length ? as : len === 0 ? exports.empty : out;
    };
}
exports.takeLeftWhile = takeLeftWhile;
var spanLeftIndex = function (as, predicate) {
    var l = as.length;
    var i = 0;
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break;
        }
    }
    return i;
};
function spanLeft(predicate) {
    return function (as) {
        var _a = exports.splitAt(spanLeftIndex(as, predicate))(as), init = _a[0], rest = _a[1];
        return { init: init, rest: rest };
    };
}
exports.spanLeft = spanLeft;
/**
 * Drop a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.dropLeft(2)), [3])
 * assert.strictEqual(pipe(input, RA.dropLeft(0)), input)
 * assert.strictEqual(pipe(input, RA.dropLeft(-1)), input)
 *
 * @category combinators
 * @since 2.5.0
 */
var dropLeft = function (n) { return function (as) {
    return n <= 0 || exports.isEmpty(as) ? as : n >= as.length ? exports.empty : as.slice(n, as.length);
}; };
exports.dropLeft = dropLeft;
/**
 * Drop a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.dropRight(2)), [1])
 * assert.strictEqual(pipe(input, RA.dropRight(0)), input)
 * assert.strictEqual(pipe(input, RA.dropRight(-1)), input)
 *
 * @category combinators
 * @since 2.5.0
 */
var dropRight = function (n) { return function (as) {
    return n <= 0 || exports.isEmpty(as) ? as : n >= as.length ? exports.empty : as.slice(0, as.length - n);
}; };
exports.dropRight = dropRight;
function dropLeftWhile(predicate) {
    return function (as) {
        var i = spanLeftIndex(as, predicate);
        return i === 0 ? as : i === as.length ? exports.empty : as.slice(i);
    };
}
exports.dropLeftWhile = dropLeftWhile;
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.5.0
 */
var findIndex = function (predicate) { return function (as) {
    for (var i = 0; i < as.length; i++) {
        if (predicate(as[i])) {
            return _.some(i);
        }
    }
    return _.none;
}; };
exports.findIndex = findIndex;
function findFirst(predicate) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return _.some(as[i]);
            }
        }
        return _.none;
    };
}
exports.findFirst = findFirst;
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @since 2.5.0
 */
var findFirstMap = function (f) { return function (as) {
    for (var i = 0; i < as.length; i++) {
        var out = f(as[i]);
        if (_.isSome(out)) {
            return out;
        }
    }
    return _.none;
}; };
exports.findFirstMap = findFirstMap;
function findLast(predicate) {
    return function (as) {
        for (var i = as.length - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return _.some(as[i]);
            }
        }
        return _.none;
    };
}
exports.findLast = findLast;
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @since 2.5.0
 */
var findLastMap = function (f) { return function (as) {
    for (var i = as.length - 1; i >= 0; i--) {
        var out = f(as[i]);
        if (_.isSome(out)) {
            return out;
        }
    }
    return _.none;
}; };
exports.findLastMap = findLastMap;
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   readonly a: number
 *   readonly b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.5.0
 */
var findLastIndex = function (predicate) { return function (as) {
    for (var i = as.length - 1; i >= 0; i--) {
        if (predicate(as[i])) {
            return _.some(i);
        }
    }
    return _.none;
}; };
exports.findLastIndex = findLastIndex;
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.5.0
 */
var insertAt = function (i, a) { return function (as) {
    return i < 0 || i > as.length ? _.none : _.some(RNEA.unsafeInsertAt(i, a, as));
}; };
exports.insertAt = insertAt;
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.5.0
 */
var updateAt = function (i, a) {
    return exports.modifyAt(i, function () { return a; });
};
exports.updateAt = updateAt;
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.5.0
 */
var deleteAt = function (i) { return function (as) {
    return exports.isOutOfBound(i, as) ? _.none : _.some(exports.unsafeDeleteAt(i, as));
}; };
exports.deleteAt = deleteAt;
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.5.0
 */
var modifyAt = function (i, f) { return function (as) {
    return exports.isOutOfBound(i, as) ? _.none : _.some(exports.unsafeUpdateAt(i, f(as[i]), as));
}; };
exports.modifyAt = modifyAt;
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @category combinators
 * @since 2.5.0
 */
var reverse = function (as) { return (as.length <= 1 ? as : as.slice().reverse()); };
exports.reverse = reverse;
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/ReadonlyArray'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
var rights = function (as) {
    var r = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === 'Right') {
            r.push(a.right);
        }
    }
    return r;
};
exports.rights = rights;
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/ReadonlyArray'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @category combinators
 * @since 2.5.0
 */
var lefts = function (as) {
    var r = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === 'Left') {
            r.push(a.left);
        }
    }
    return r;
};
exports.lefts = lefts;
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
var sort = function (O) { return function (as) {
    return as.length <= 1 ? as : as.slice().sort(O.compare);
}; };
exports.sort = sort;
// TODO: curry and make data-last in v3
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @category combinators
 * @since 2.5.0
 */
var zipWith = function (fa, fb, f) {
    var fc = [];
    var len = Math.min(fa.length, fb.length);
    for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
    }
    return fc;
};
exports.zipWith = zipWith;
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return exports.zipWith(as, bs, function (a, b) { return [a, b]; });
}
exports.zip = zip;
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @category combinators
 * @since 2.5.0
 */
var unzip = function (as) {
    var fa = [];
    var fb = [];
    for (var i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
    }
    return [fa, fb];
};
exports.unzip = unzip;
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependAll } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.10.0
 */
var prependAll = function (middle) {
    var f = RNEA.prependAll(middle);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : as); };
};
exports.prependAll = prependAll;
/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
var intersperse = function (middle) {
    var f = RNEA.intersperse(middle);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : as); };
};
exports.intersperse = intersperse;
/**
 * Rotate a `ReadonlyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
var rotate = function (n) {
    var f = RNEA.rotate(n);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : as); };
};
exports.rotate = rotate;
function elem(E) {
    return function (a, as) {
        if (as === undefined) {
            var elemE_1 = elem(E);
            return function (as) { return elemE_1(a, as); };
        }
        var predicate = function (element) { return E.equals(element, a); };
        var i = 0;
        for (; i < as.length; i++) {
            if (predicate(as[i])) {
                return true;
            }
        }
        return false;
    };
}
exports.elem = elem;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
var uniq = function (E) {
    var f = RNEA.uniq(E);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : as); };
};
exports.uniq = uniq;
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/ReadonlyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 2.5.0
 */
var sortBy = function (ords) {
    var f = RNEA.sortBy(ords);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : as); };
};
exports.sortBy = sortBy;
/**
 * A useful recursion pattern for processing a `ReadonlyArray` to produce a new `ReadonlyArray`, often used for "chopping" up the input
 * `ReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyArray` and produce a
 * value and the tail of the `ReadonlyArray`.
 *
 * @example
 * import { Eq } from 'fp-ts/Eq'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
 *   return RA.chop(as => {
 *     const { init, rest } = pipe(as, RA.spanLeft((a: A) => S.equals(a, as[0])))
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @category combinators
 * @since 2.5.0
 */
var chop = function (f) {
    var g = RNEA.chop(f);
    return function (as) { return (exports.isNonEmpty(as) ? g(as) : exports.empty); };
};
exports.chop = chop;
/**
 * Splits a `ReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @category combinators
 * @since 2.5.0
 */
var splitAt = function (n) { return function (as) {
    return n >= 1 && exports.isNonEmpty(as) ? RNEA.splitAt(n)(as) : exports.isEmpty(as) ? [as, exports.empty] : [exports.empty, as];
}; };
exports.splitAt = splitAt;
/**
 * Splits a `ReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `ReadonlyArray`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that:
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `as`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 * @category combinators
 * @since 2.5.0
 */
var chunksOf = function (n) {
    var f = RNEA.chunksOf(n);
    return function (as) { return (exports.isNonEmpty(as) ? f(as) : exports.empty); };
};
exports.chunksOf = chunksOf;
/**
 * @category combinators
 * @since 2.11.0
 */
var fromOptionK = function (f) { return function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return exports.fromOption(f.apply(void 0, a));
}; };
exports.fromOptionK = fromOptionK;
function comprehension(input, f, g) {
    if (g === void 0) { g = function () { return true; }; }
    var go = function (scope, input) {
        return exports.isNonEmpty(input)
            ? function_1.pipe(RNEA.head(input), exports.chain(function (x) { return go(function_1.pipe(scope, exports.append(x)), RNEA.tail(input)); }))
            : g.apply(void 0, scope) ? [f.apply(void 0, scope)]
                : exports.empty;
    };
    return go(exports.empty, input);
}
exports.comprehension = comprehension;
/**
 * @category combinators
 * @since 2.11.0
 */
var concatW = function (second) { return function (first) {
    return exports.isEmpty(first) ? second : exports.isEmpty(second) ? first : first.concat(second);
}; };
exports.concatW = concatW;
/**
 * @category combinators
 * @since 2.11.0
 */
exports.concat = exports.concatW;
function union(E) {
    var unionE = RNEA.union(E);
    return function (first, second) {
        if (second === undefined) {
            var unionE_1 = union(E);
            return function (second) { return unionE_1(second, first); };
        }
        return exports.isNonEmpty(first) && exports.isNonEmpty(second) ? unionE(second)(first) : exports.isNonEmpty(first) ? first : second;
    };
}
exports.union = union;
function intersection(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var intersectionE_1 = intersection(E);
            return function (ys) { return intersectionE_1(ys, xs); };
        }
        return xs.filter(function (a) { return elemE(a, ys); });
    };
}
exports.intersection = intersection;
function difference(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var differenceE_1 = difference(E);
            return function (ys) { return differenceE_1(ys, xs); };
        }
        return xs.filter(function (a) { return !elemE(a, ys); });
    };
}
exports.difference = difference;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var _map = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
var _mapWithIndex = function (fa, f) { return function_1.pipe(fa, exports.mapWithIndex(f)); };
var _ap = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
var _chain = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
var _filter = function (fa, predicate) {
    return function_1.pipe(fa, exports.filter(predicate));
};
var _filterMap = function (fa, f) { return function_1.pipe(fa, exports.filterMap(f)); };
var _partition = function (fa, predicate) {
    return function_1.pipe(fa, exports.partition(predicate));
};
var _partitionMap = function (fa, f) { return function_1.pipe(fa, exports.partitionMap(f)); };
var _partitionWithIndex = function (fa, predicateWithIndex) { return function_1.pipe(fa, exports.partitionWithIndex(predicateWithIndex)); };
var _partitionMapWithIndex = function (fa, f) { return function_1.pipe(fa, exports.partitionMapWithIndex(f)); };
var _alt = function (fa, that) { return function_1.pipe(fa, exports.alt(that)); };
var _reduce = function (fa, b, f) { return function_1.pipe(fa, exports.reduce(b, f)); };
var _foldMap = function (M) {
    var foldMapM = exports.foldMap(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapM(f)); };
};
var _reduceRight = function (fa, b, f) { return function_1.pipe(fa, exports.reduceRight(b, f)); };
var _reduceWithIndex = function (fa, b, f) {
    return function_1.pipe(fa, exports.reduceWithIndex(b, f));
};
var _foldMapWithIndex = function (M) {
    var foldMapWithIndexM = exports.foldMapWithIndex(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapWithIndexM(f)); };
};
var _reduceRightWithIndex = function (fa, b, f) {
    return function_1.pipe(fa, exports.reduceRightWithIndex(b, f));
};
var _filterMapWithIndex = function (fa, f) { return function_1.pipe(fa, exports.filterMapWithIndex(f)); };
var _filterWithIndex = function (fa, predicateWithIndex) { return function_1.pipe(fa, exports.filterWithIndex(predicateWithIndex)); };
var _extend = function (fa, f) { return function_1.pipe(fa, exports.extend(f)); };
var _traverse = function (F) {
    var traverseF = exports.traverse(F);
    return function (ta, f) { return function_1.pipe(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _traverseWithIndex = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (ta, f) { return function_1.pipe(ta, traverseWithIndexF(f)); };
};
/** @internal */
var _chainRecDepthFirst = function (a, f) { return function_1.pipe(a, exports.chainRecDepthFirst(f)); };
exports._chainRecDepthFirst = _chainRecDepthFirst;
/** @internal */
var _chainRecBreadthFirst = function (a, f) { return function_1.pipe(a, exports.chainRecBreadthFirst(f)); };
exports._chainRecBreadthFirst = _chainRecBreadthFirst;
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Pointed
 * @since 2.5.0
 */
exports.of = RNEA.of;
/**
 * @category Zero
 * @since 2.7.0
 */
var zero = function () { return exports.empty; };
exports.zero = zero;
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) {
    return fa.concat(that());
}; };
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.5.0
 */
exports.alt = exports.altW;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.5.0
 */
var ap = function (fa) {
    return exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); });
};
exports.ap = ap;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.5.0
 */
var chain = function (f) { return function (ma) {
    return function_1.pipe(ma, exports.chainWithIndex(function (_, a) { return f(a); }));
}; };
exports.chain = chain;
/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
var map = function (f) { return function (fa) {
    return fa.map(function (a) { return f(a); });
}; };
exports.map = map;
/**
 * @category FunctorWithIndex
 * @since 2.5.0
 */
var mapWithIndex = function (f) { return function (fa) { return fa.map(function (a, i) { return f(i, a); }); }; };
exports.mapWithIndex = mapWithIndex;
/**
 * @category Compactable
 * @since 2.5.0
 */
var separate = function (fa) {
    var left = [];
    var right = [];
    for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
        var e = fa_1[_i];
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return Separated_1.separated(left, right);
};
exports.separate = separate;
/**
 * @category Filterable
 * @since 2.5.0
 */
var filter = function (predicate) { return function (as) { return as.filter(predicate); }; };
exports.filter = filter;
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
var filterMapWithIndex = function (f) { return function (fa) {
    var out = [];
    for (var i = 0; i < fa.length; i++) {
        var optionB = f(i, fa[i]);
        if (_.isSome(optionB)) {
            out.push(optionB.value);
        }
    }
    return out;
}; };
exports.filterMapWithIndex = filterMapWithIndex;
/**
 * @category Filterable
 * @since 2.5.0
 */
var filterMap = function (f) {
    return exports.filterMapWithIndex(function (_, a) { return f(a); });
};
exports.filterMap = filterMap;
/**
 * @category Compactable
 * @since 2.5.0
 */
exports.compact = 
/*#__PURE__*/
exports.filterMap(function_1.identity);
/**
 * @category Filterable
 * @since 2.5.0
 */
var partition = function (predicate) {
    return exports.partitionWithIndex(function (_, a) { return predicate(a); });
};
exports.partition = partition;
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
var partitionWithIndex = function (predicateWithIndex) { return function (as) {
    var left = [];
    var right = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (predicateWithIndex(i, a)) {
            right.push(a);
        }
        else {
            left.push(a);
        }
    }
    return Separated_1.separated(left, right);
}; };
exports.partitionWithIndex = partitionWithIndex;
/**
 * @category Filterable
 * @since 2.5.0
 */
var partitionMap = function (f) {
    return exports.partitionMapWithIndex(function (_, a) { return f(a); });
};
exports.partitionMap = partitionMap;
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
var partitionMapWithIndex = function (f) { return function (fa) {
    var left = [];
    var right = [];
    for (var i = 0; i < fa.length; i++) {
        var e = f(i, fa[i]);
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return Separated_1.separated(left, right);
}; };
exports.partitionMapWithIndex = partitionMapWithIndex;
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
var filterWithIndex = function (predicateWithIndex) { return function (as) {
    return as.filter(function (a, i) { return predicateWithIndex(i, a); });
}; };
exports.filterWithIndex = filterWithIndex;
/**
 * @category Extend
 * @since 2.5.0
 */
var extend = function (f) { return function (wa) { return wa.map(function (_, i) { return f(wa.slice(i)); }); }; };
exports.extend = extend;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var foldMapWithIndex = function (M) { return function (f) { return function (fa) {
    return fa.reduce(function (b, a, i) { return M.concat(b, f(i, a)); }, M.empty);
}; }; };
exports.foldMapWithIndex = foldMapWithIndex;
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduce = function (b, f) {
    return exports.reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
exports.reduce = reduce;
/**
 * @category Foldable
 * @since 2.5.0
 */
var foldMap = function (M) {
    var foldMapWithIndexM = exports.foldMapWithIndex(M);
    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
};
exports.foldMap = foldMap;
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var reduceWithIndex = function (b, f) { return function (fa) {
    var len = fa.length;
    var out = b;
    for (var i = 0; i < len; i++) {
        out = f(i, out, fa[i]);
    }
    return out;
}; };
exports.reduceWithIndex = reduceWithIndex;
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduceRight = function (b, f) {
    return exports.reduceRightWithIndex(b, function (_, a, b) { return f(a, b); });
};
exports.reduceRight = reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var reduceRightWithIndex = function (b, f) { return function (fa) { return fa.reduceRight(function (b, a, i) { return f(i, a, b); }, b); }; };
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * @category Traversable
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
exports.traverse = traverse;
/**
 * @category Traversable
 * @since 2.6.3
 */
var sequence = function (F) { return function (ta) {
    return _reduce(ta, F.of(exports.zero()), function (fas, fa) {
        return F.ap(F.map(fas, function (as) { return function (a) { return function_1.pipe(as, exports.append(a)); }; }), fa);
    });
}; };
exports.sequence = sequence;
/**
 * @category TraversableWithIndex
 * @since 2.6.3
 */
var traverseWithIndex = function (F) { return function (f) {
    return exports.reduceWithIndex(F.of(exports.zero()), function (i, fbs, a) {
        return F.ap(F.map(fbs, function (bs) { return function (b) { return function_1.pipe(bs, exports.append(b)); }; }), f(i, a));
    });
}; };
exports.traverseWithIndex = traverseWithIndex;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wither = function (F) {
    var _witherF = _wither(F);
    return function (f) { return function (fa) { return _witherF(fa, f); }; };
};
exports.wither = wither;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wilt = function (F) {
    var _wiltF = _wilt(F);
    return function (f) { return function (fa) { return _wiltF(fa, f); }; };
};
exports.wilt = wilt;
/**
 * @category Unfoldable
 * @since 2.6.6
 */
var unfold = function (b, f) {
    var out = [];
    var bb = b;
    while (true) {
        var mt = f(bb);
        if (_.isSome(mt)) {
            var _a = mt.value, a = _a[0], b_1 = _a[1];
            out.push(a);
            bb = b_1;
        }
        else {
            break;
        }
    }
    return out;
};
exports.unfold = unfold;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
exports.URI = 'ReadonlyArray';
/**
 * @category instances
 * @since 2.5.0
 */
var getShow = function (S) { return ({
    show: function (as) { return "[" + as.map(S.show).join(', ') + "]"; }
}); };
exports.getShow = getShow;
/**
 * @category instances
 * @since 2.5.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) { return (exports.isEmpty(first) ? second : exports.isEmpty(second) ? first : first.concat(second)); }
}); };
exports.getSemigroup = getSemigroup;
/**
 * Returns a `Monoid` for `ReadonlyArray<A>`.
 *
 * @example
 * import { getMonoid } from 'fp-ts/ReadonlyArray'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.5.0
 */
var getMonoid = function () { return ({
    concat: exports.getSemigroup().concat,
    empty: exports.empty
}); };
exports.getMonoid = getMonoid;
/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { getEq } from 'fp-ts/ReadonlyArray'
 *
 * const E = getEq(S.Eq)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.5.0
 */
var getEq = function (E) {
    return Eq_1.fromEquals(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
};
exports.getEq = getEq;
/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 *
 * const O = getOrd(S.Ord)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @category instances
 * @since 2.5.0
 */
var getOrd = function (O) {
    return Ord_1.fromCompare(function (a, b) {
        var aLen = a.length;
        var bLen = b.length;
        var len = Math.min(aLen, bLen);
        for (var i = 0; i < len; i++) {
            var ordering = O.compare(a[i], b[i]);
            if (ordering !== 0) {
                return ordering;
            }
        }
        return N.Ord.compare(aLen, bLen);
    });
};
exports.getOrd = getOrd;
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionSemigroup = function (E) {
    var unionE = union(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
exports.getUnionSemigroup = getUnionSemigroup;
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionMonoid = function (E) { return ({
    concat: exports.getUnionSemigroup(E).concat,
    empty: exports.empty
}); };
exports.getUnionMonoid = getUnionMonoid;
/**
 * @category instances
 * @since 2.11.0
 */
var getIntersectionSemigroup = function (E) {
    var intersectionE = intersection(E);
    return {
        concat: function (first, second) { return intersectionE(second)(first); }
    };
};
exports.getIntersectionSemigroup = getIntersectionSemigroup;
/**
 * @category instances
 * @since 2.11.0
 */
var getDifferenceMagma = function (E) {
    var differenceE = difference(E);
    return {
        concat: function (first, second) { return differenceE(second)(first); }
    };
};
exports.getDifferenceMagma = getDifferenceMagma;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.flap = 
/*#__PURE__*/
Functor_1.flap(exports.Functor);
/**
 * @category instances
 * @since 2.10.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Apply = {
    URI: exports.URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apFirst = 
/*#__PURE__*/
Apply_1.apFirst(exports.Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apSecond = 
/*#__PURE__*/
Apply_1.apSecond(exports.Apply);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.chainFirst = 
/*#__PURE__*/
Chain_1.chainFirst(exports.Chain);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Unfoldable = {
    URI: exports.URI,
    unfold: exports.unfold
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.11.0
 */
exports.Zero = {
    URI: exports.URI,
    zero: exports.zero
};
/**
 * @category constructors
 * @since 2.11.0
 */
exports.guard = 
/*#__PURE__*/
Zero_1.guard(exports.Zero, exports.Pointed);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alternative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    alt: _alt,
    zero: exports.zero
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Extend = {
    URI: exports.URI,
    map: _map,
    extend: _extend
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Compactable = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Filterable = {
    URI: exports.URI,
    map: _map,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FilterableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FoldableWithIndex = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverse: _traverse,
    sequence: exports.sequence,
    traverseWithIndex: _traverseWithIndex
};
/**
 * @category ChainRec
 * @since 2.11.0
 */
var chainRecDepthFirst = function (f) { return function (a) {
    var todo = __spreadArray([], f(a));
    var out = [];
    while (todo.length > 0) {
        var e = todo.shift();
        if (_.isLeft(e)) {
            todo.unshift.apply(todo, f(e.left));
        }
        else {
            out.push(e.right);
        }
    }
    return out;
}; };
exports.chainRecDepthFirst = chainRecDepthFirst;
/**
 * @category instances
 * @since 2.11.0
 */
exports.ChainRecDepthFirst = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain,
    chainRec: exports._chainRecDepthFirst
};
/**
 * @category ChainRec
 * @since 2.11.0
 */
var chainRecBreadthFirst = function (f) { return function (a) {
    var initial = f(a);
    var todo = [];
    var out = [];
    function go(e) {
        if (_.isLeft(e)) {
            f(e.left).forEach(function (v) { return todo.push(v); });
        }
        else {
            out.push(e.right);
        }
    }
    for (var _i = 0, initial_1 = initial; _i < initial_1.length; _i++) {
        var e = initial_1[_i];
        go(e);
    }
    while (todo.length > 0) {
        go(todo.shift());
    }
    return out;
}; };
exports.chainRecBreadthFirst = chainRecBreadthFirst;
/**
 * @category instances
 * @since 2.11.0
 */
exports.ChainRecBreadthFirst = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain,
    chainRec: exports._chainRecBreadthFirst
};
var _wither = Witherable_1.witherDefault(exports.Traversable, exports.Compactable);
var _wilt = Witherable_1.wiltDefault(exports.Traversable, exports.Compactable);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Witherable = {
    URI: exports.URI,
    map: _map,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    wither: _wither,
    wilt: _wilt
};
/**
 * Filter values inside a context.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as T from 'fp-ts/Task'
 *
 * const filterE = RA.filterE(T.ApplicativePar)
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(
 *       [-1, 2, 3],
 *       filterE((n) => T.of(n > 0))
 *     )(),
 *     [2, 3]
 *   )
 * }
 * test()
 *
 * @since 2.11.0
 */
exports.filterE = 
/*#__PURE__*/
Witherable_1.filterE(exports.Witherable);
/**
 * @category instances
 * @since 2.11.0
 */
exports.FromEither = {
    URI: exports.URI,
    fromEither: exports.fromEither
};
/**
 * @category combinators
 * @since 2.11.0
 */
exports.fromEitherK = 
/*#__PURE__*/
FromEither_1.fromEitherK(exports.FromEither);
// -------------------------------------------------------------------------------------
// unsafe
// -------------------------------------------------------------------------------------
/**
 * @category unsafe
 * @since 2.5.0
 */
exports.unsafeInsertAt = RNEA.unsafeInsertAt;
/**
 * @category unsafe
 * @since 2.5.0
 */
var unsafeUpdateAt = function (i, a, as) {
    return exports.isNonEmpty(as) ? RNEA.unsafeUpdateAt(i, a, as) : as;
};
exports.unsafeUpdateAt = unsafeUpdateAt;
/**
 * @category unsafe
 * @since 2.5.0
 */
var unsafeDeleteAt = function (i, as) {
    var xs = as.slice();
    xs.splice(i, 1);
    return xs;
};
exports.unsafeDeleteAt = unsafeDeleteAt;
// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
/**
 * @category interop
 * @since 2.5.0
 */
var toArray = function (as) { return as.slice(); };
exports.toArray = toArray;
/**
 * @category interop
 * @since 2.5.0
 */
var fromArray = function (as) { return (exports.isEmpty(as) ? exports.empty : as.slice()); };
exports.fromArray = fromArray;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * An empty array
 *
 * @since 2.5.0
 */
exports.empty = RNEA.empty;
/**
 * Check if a predicate holds true for every array member.
 *
 * @example
 * import { every } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], every(isPositive)), true)
 * assert.deepStrictEqual(pipe([1, 2, -3], every(isPositive)), false)
 *
 * @since 2.9.0
 */
var every = function (predicate) { return function (as) { return as.every(predicate); }; };
exports.every = every;
/**
 * Check if a predicate holds true for any array member.
 *
 * @example
 * import { some } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([-1, -2, 3], some(isPositive)), true)
 * assert.deepStrictEqual(pipe([-1, -2, -3], some(isPositive)), false)
 *
 * @since 2.9.0
 */
var some = function (predicate) { return function (as) {
    return as.some(predicate);
}; };
exports.some = some;
/**
 * Alias of [`some`](#some)
 *
 * @since 2.11.0
 */
exports.exists = exports.some;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
exports.Do = 
/*#__PURE__*/
exports.of(_.emptyRecord);
/**
 * @since 2.8.0
 */
exports.bindTo = 
/*#__PURE__*/
Functor_1.bindTo(exports.Functor);
/**
 * @since 2.8.0
 */
exports.bind = 
/*#__PURE__*/
Chain_1.bind(exports.Chain);
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
exports.apS = 
/*#__PURE__*/
Apply_1.apS(exports.Apply);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
// tslint:disable: deprecation
/**
 * Use `ReadonlyNonEmptyArray` module instead.
 *
 * @category constructors
 * @since 2.5.0
 * @deprecated
 */
exports.range = RNEA.range;
/**
 * Use [`prepend`](#prepend) instead.
 *
 * @category constructors
 * @since 2.5.0
 * @deprecated
 */
exports.cons = RNEA.cons;
/**
 * Use [`append`](#append) instead.
 *
 * @category constructors
 * @since 2.5.0
 * @deprecated
 */
exports.snoc = RNEA.snoc;
/**
 * Use [`prependAll`](#prependall) instead.
 *
 * @category combinators
 * @since 2.9.0
 * @deprecated
 */
exports.prependToAll = exports.prependAll;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.5.0
 * @deprecated
 */
exports.readonlyArray = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    mapWithIndex: _mapWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex,
    alt: _alt,
    zero: exports.zero,
    unfold: exports.unfold,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex,
    extend: _extend,
    wither: _wither,
    wilt: _wilt
};


/***/ }),

/***/ 8630:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reduceRight = exports.foldMap = exports.reduce = exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.chain = exports.ap = exports.alt = exports.altW = exports.of = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.modifyAt = exports.updateAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.fromArray = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromReadonlyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = exports.empty = void 0;
exports.uncons = exports.filterWithIndex = exports.filter = exports.groupSort = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = void 0;
exports.readonlyNonEmptyArray = exports.fold = exports.prependToAll = exports.insertAt = exports.snoc = exports.cons = exports.unsnoc = void 0;
var Apply_1 = __nccwpck_require__(205);
var Chain_1 = __nccwpck_require__(2372);
var Eq_1 = __nccwpck_require__(6964);
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
var _ = __importStar(__nccwpck_require__(1840));
var Ord_1 = __nccwpck_require__(6685);
var Se = __importStar(__nccwpck_require__(6339));
// -------------------------------------------------------------------------------------
// internal
// -------------------------------------------------------------------------------------
/**
 * @internal
 */
exports.empty = _.emptyReadonlyArray;
/**
 * @internal
 */
exports.isNonEmpty = _.isNonEmpty;
/**
 * @internal
 */
var isOutOfBound = function (i, as) { return i < 0 || i >= as.length; };
exports.isOutOfBound = isOutOfBound;
/**
 * @internal
 */
var prependW = function (head) { return function (tail) { return __spreadArray([head], tail); }; };
exports.prependW = prependW;
/**
 * @internal
 */
exports.prepend = exports.prependW;
/**
 * @internal
 */
var appendW = function (end) { return function (init) { return __spreadArray(__spreadArray([], init), [end]); }; };
exports.appendW = appendW;
/**
 * @internal
 */
exports.append = exports.appendW;
/**
 * @internal
 */
var unsafeInsertAt = function (i, a, as) {
    if (exports.isNonEmpty(as)) {
        var xs = _.fromReadonlyNonEmptyArray(as);
        xs.splice(i, 0, a);
        return xs;
    }
    return [a];
};
exports.unsafeInsertAt = unsafeInsertAt;
/**
 * @internal
 */
var unsafeUpdateAt = function (i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        var xs = _.fromReadonlyNonEmptyArray(as);
        xs[i] = a;
        return xs;
    }
};
exports.unsafeUpdateAt = unsafeUpdateAt;
/**
 * Remove duplicates from a `ReadonlyNonEmptyArray`, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.11.0
 */
var uniq = function (E) { return function (as) {
    if (as.length === 1) {
        return as;
    }
    var out = [exports.head(as)];
    var rest = exports.tail(as);
    var _loop_1 = function (a) {
        if (out.every(function (o) { return !E.equals(o, a); })) {
            out.push(a);
        }
    };
    for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
        var a = rest_1[_i];
        _loop_1(a);
    }
    return out;
}; };
exports.uniq = uniq;
/**
 * Sort the elements of a `ReadonlyNonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 *
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = RNEA.sortBy([byName, byAge])
 *
 * const persons: RNEA.ReadonlyNonEmptyArray<Person> = [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 },
 *   { name: 'b', age: 2 }
 * ]
 *
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 2.11.0
 */
var sortBy = function (ords) {
    if (exports.isNonEmpty(ords)) {
        var M = Ord_1.getMonoid();
        return exports.sort(ords.reduce(M.concat, M.empty));
    }
    return function_1.identity;
};
exports.sortBy = sortBy;
/**
 * @category combinators
 * @since 2.11.0
 */
var union = function (E) {
    var uniqE = exports.uniq(E);
    return function (second) { return function (first) { return uniqE(function_1.pipe(first, concat(second))); }; };
};
exports.union = union;
/**
 * Rotate a `ReadonlyNonEmptyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
 *
 * @category combinators
 * @since 2.11.0
 */
var rotate = function (n) { return function (as) {
    var len = as.length;
    var m = Math.round(n) % len;
    if (exports.isOutOfBound(Math.abs(m), as) || m === 0) {
        return as;
    }
    if (m < 0) {
        var _a = exports.splitAt(-m)(as), f = _a[0], s = _a[1];
        return function_1.pipe(s, concat(f));
    }
    else {
        return exports.rotate(m - len)(as);
    }
}; };
exports.rotate = rotate;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Return a `ReadonlyNonEmptyArray` from a `ReadonlyArray` returning `none` if the input is empty.
 *
 * @category constructors
 * @since 2.5.0
 */
var fromReadonlyArray = function (as) {
    return exports.isNonEmpty(as) ? _.some(as) : _.none;
};
exports.fromReadonlyArray = fromReadonlyArray;
/**
 * Return a `ReadonlyNonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.11.0
 */
var makeBy = function (f) { return function (n) {
    var j = Math.max(0, Math.floor(n));
    var out = [f(0)];
    for (var i = 1; i < j; i++) {
        out.push(f(i));
    }
    return out;
}; };
exports.makeBy = makeBy;
/**
 * Create a `ReadonlyNonEmptyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.11.0
 */
var replicate = function (a) { return exports.makeBy(function () { return a; }); };
exports.replicate = replicate;
/**
 * Create a `ReadonlyNonEmptyArray` containing a range of integers, including both endpoints.
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.11.0
 */
var range = function (start, end) {
    return start <= end ? exports.makeBy(function (i) { return start + i; })(end - start + 1) : [start];
};
exports.range = range;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Return the tuple of the `head` and the `tail`.
 *
 * @example
 * import { unprepend } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
 *
 * @category destructors
 * @since 2.9.0
 */
var unprepend = function (as) { return [exports.head(as), exports.tail(as)]; };
exports.unprepend = unprepend;
/**
 * Return the tuple of the `init` and the `last`.
 *
 * @example
 * import { unappend } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 2.9.0
 */
var unappend = function (as) { return [exports.init(as), exports.last(as)]; };
exports.unappend = unappend;
// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
/**
 * @category interop
 * @since 2.5.0
 */
var fromArray = function (as) { return exports.fromReadonlyArray(as.slice()); };
exports.fromArray = fromArray;
function concatW(second) {
    return function (first) { return first.concat(second); };
}
exports.concatW = concatW;
function concat(x, y) {
    return y ? x.concat(y) : function (y) { return y.concat(x); };
}
exports.concat = concat;
/**
 * @category combinators
 * @since 2.5.0
 */
var reverse = function (as) {
    return as.length === 1 ? as : __spreadArray([exports.last(as)], as.slice(0, -1).reverse());
};
exports.reverse = reverse;
function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return exports.empty;
        }
        var out = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
            var a = as[i];
            if (E.equals(a, head)) {
                nea.push(a);
            }
            else {
                out.push(nea);
                head = a;
                nea = [head];
            }
        }
        out.push(nea);
        return out;
    };
}
exports.group = group;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
 *   '1': ['a', 'b'],
 *   '2': ['ab']
 * })
 *
 * @category combinators
 * @since 2.5.0
 */
var groupBy = function (f) { return function (as) {
    var out = {};
    for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
        var a = as_1[_i];
        var k = f(a);
        if (out.hasOwnProperty(k)) {
            out[k].push(a);
        }
        else {
            out[k] = [a];
        }
    }
    return out;
}; };
exports.groupBy = groupBy;
/**
 * @category combinators
 * @since 2.5.0
 */
var sort = function (O) { return function (as) {
    return as.length === 1 ? as : as.slice().sort(O.compare);
}; };
exports.sort = sort;
/**
 * @category combinators
 * @since 2.5.0
 */
var updateAt = function (i, a) {
    return exports.modifyAt(i, function () { return a; });
};
exports.updateAt = updateAt;
/**
 * @category combinators
 * @since 2.5.0
 */
var modifyAt = function (i, f) { return function (as) { return (exports.isOutOfBound(i, as) ? _.none : _.some(exports.unsafeUpdateAt(i, f(as[i]), as))); }; };
exports.modifyAt = modifyAt;
/**
 * @category combinators
 * @since 2.5.1
 */
var zipWith = function (as, bs, f) {
    var cs = [f(as[0], bs[0])];
    var len = Math.min(as.length, bs.length);
    for (var i = 1; i < len; i++) {
        cs[i] = f(as[i], bs[i]);
    }
    return cs;
};
exports.zipWith = zipWith;
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return exports.zipWith(as, bs, function (a, b) { return [a, b]; });
}
exports.zip = zip;
/**
 * @category combinators
 * @since 2.5.1
 */
var unzip = function (abs) {
    var fa = [abs[0][0]];
    var fb = [abs[0][1]];
    for (var i = 1; i < abs.length; i++) {
        fa[i] = abs[i][0];
        fb[i] = abs[i][1];
    }
    return [fa, fb];
};
exports.unzip = unzip;
/**
 * Prepend an element to every member of a `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { prependAll } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.10.0
 */
var prependAll = function (middle) { return function (as) {
    var out = [middle, as[0]];
    for (var i = 1; i < as.length; i++) {
        out.push(middle, as[i]);
    }
    return out;
}; };
exports.prependAll = prependAll;
/**
 * Places an element in between members of a `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
var intersperse = function (middle) { return function (as) {
    var rest = exports.tail(as);
    return exports.isNonEmpty(rest) ? function_1.pipe(rest, exports.prependAll(middle), exports.prepend(exports.head(as))) : as;
}; };
exports.intersperse = intersperse;
/**
 * @category combinators
 * @since 2.10.0
 */
var chainWithIndex = function (f) { return function (as) {
    var out = _.fromReadonlyNonEmptyArray(f(0, exports.head(as)));
    for (var i = 1; i < as.length; i++) {
        out.push.apply(out, f(i, as[i]));
    }
    return out;
}; };
exports.chainWithIndex = chainWithIndex;
/**
 * A useful recursion pattern for processing a `ReadonlyNonEmptyArray` to produce a new `ReadonlyNonEmptyArray`, often used for "chopping" up the input
 * `ReadonlyNonEmptyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyNonEmptyArray` and produce a
 * value and the tail of the `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.10.0
 */
var chop = function (f) { return function (as) {
    var _a = f(as), b = _a[0], rest = _a[1];
    var out = [b];
    var next = rest;
    while (exports.isNonEmpty(next)) {
        var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
        out.push(b_1);
        next = rest_2;
    }
    return out;
}; };
exports.chop = chop;
/**
 * Splits a `ReadonlyNonEmptyArray` into two pieces, the first piece has max `n` elements.
 *
 * @category combinators
 * @since 2.10.0
 */
var splitAt = function (n) { return function (as) {
    var m = Math.max(1, n);
    return m >= as.length ? [as, exports.empty] : [function_1.pipe(as.slice(1, m), exports.prepend(exports.head(as))), as.slice(m)];
}; };
exports.splitAt = splitAt;
/**
 * Splits a `ReadonlyNonEmptyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.10.0
 */
var chunksOf = function (n) { return exports.chop(exports.splitAt(n)); };
exports.chunksOf = chunksOf;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var _map = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var _mapWithIndex = function (fa, f) { return function_1.pipe(fa, exports.mapWithIndex(f)); };
var _ap = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
var _chain = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return function_1.pipe(wa, exports.extend(f)); };
/* istanbul ignore next */
var _reduce = function (fa, b, f) { return function_1.pipe(fa, exports.reduce(b, f)); };
/* istanbul ignore next */
var _foldMap = function (M) {
    var foldMapM = exports.foldMap(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var _reduceRight = function (fa, b, f) { return function_1.pipe(fa, exports.reduceRight(b, f)); };
/* istanbul ignore next */
var _traverse = function (F) {
    var traverseF = exports.traverse(F);
    return function (ta, f) { return function_1.pipe(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt = function (fa, that) { return function_1.pipe(fa, exports.alt(that)); };
/* istanbul ignore next */
var _reduceWithIndex = function (fa, b, f) {
    return function_1.pipe(fa, exports.reduceWithIndex(b, f));
};
/* istanbul ignore next */
var _foldMapWithIndex = function (M) {
    var foldMapWithIndexM = exports.foldMapWithIndex(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapWithIndexM(f)); };
};
/* istanbul ignore next */
var _reduceRightWithIndex = function (fa, b, f) {
    return function_1.pipe(fa, exports.reduceRightWithIndex(b, f));
};
/* istanbul ignore next */
var _traverseWithIndex = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (ta, f) { return function_1.pipe(ta, traverseWithIndexF(f)); };
};
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Pointed
 * @since 2.5.0
 */
exports.of = _.singleton;
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (as) { return function_1.pipe(as, concatW(that())); }; };
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
exports.alt = exports.altW;
/**
 * @category Apply
 * @since 2.5.0
 */
var ap = function (as) { return exports.chain(function (f) { return function_1.pipe(as, exports.map(f)); }); };
exports.ap = ap;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.5.0
 */
var chain = function (f) { return exports.chainWithIndex(function (_, a) { return f(a); }); };
exports.chain = chain;
/**
 * @category Extend
 * @since 2.5.0
 */
var extend = function (f) { return function (as) {
    var next = exports.tail(as);
    var out = [f(as)];
    while (exports.isNonEmpty(next)) {
        out.push(f(next));
        next = exports.tail(next);
    }
    return out;
}; };
exports.extend = extend;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
var map = function (f) {
    return exports.mapWithIndex(function (_, a) { return f(a); });
};
exports.map = map;
/**
 * @category FunctorWithIndex
 * @since 2.5.0
 */
var mapWithIndex = function (f) { return function (as) {
    var out = [f(0, exports.head(as))];
    for (var i = 1; i < as.length; i++) {
        out.push(f(i, as[i]));
    }
    return out;
}; };
exports.mapWithIndex = mapWithIndex;
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduce = function (b, f) {
    return exports.reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
exports.reduce = reduce;
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category Foldable
 * @since 2.5.0
 */
var foldMap = function (S) { return function (f) { return function (as) {
    return as.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(as[0]));
}; }; };
exports.foldMap = foldMap;
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduceRight = function (b, f) {
    return exports.reduceRightWithIndex(b, function (_, b, a) { return f(b, a); });
};
exports.reduceRight = reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var reduceWithIndex = function (b, f) { return function (as) {
    return as.reduce(function (b, a, i) { return f(i, b, a); }, b);
}; };
exports.reduceWithIndex = reduceWithIndex;
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var foldMapWithIndex = function (S) { return function (f) { return function (as) { return as.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, as[0])); }; }; };
exports.foldMapWithIndex = foldMapWithIndex;
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var reduceRightWithIndex = function (b, f) { return function (as) { return as.reduceRight(function (b, a, i) { return f(i, a, b); }, b); }; };
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * @category Traversable
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
exports.traverse = traverse;
/**
 * @category Traversable
 * @since 2.6.3
 */
var sequence = function (F) { return exports.traverseWithIndex(F)(function_1.SK); };
exports.sequence = sequence;
/**
 * @category TraversableWithIndex
 * @since 2.6.3
 */
var traverseWithIndex = function (F) { return function (f) { return function (as) {
    var out = F.map(f(0, exports.head(as)), exports.of);
    for (var i = 1; i < as.length; i++) {
        out = F.ap(F.map(out, function (bs) { return function (b) { return function_1.pipe(bs, exports.append(b)); }; }), f(i, as[i]));
    }
    return out;
}; }; };
exports.traverseWithIndex = traverseWithIndex;
/**
 * @category Comonad
 * @since 2.6.3
 */
exports.extract = _.head;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
exports.URI = 'ReadonlyNonEmptyArray';
/**
 * @category instances
 * @since 2.5.0
 */
var getShow = function (S) { return ({
    show: function (as) { return "[" + as.map(S.show).join(', ') + "]"; }
}); };
exports.getShow = getShow;
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @category instances
 * @since 2.5.0
 */
var getSemigroup = function () { return ({
    concat: concat
}); };
exports.getSemigroup = getSemigroup;
/**
 * @example
 * import { getEq } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
 *
 * @category instances
 * @since 2.5.0
 */
var getEq = function (E) {
    return Eq_1.fromEquals(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
};
exports.getEq = getEq;
/**
 * @category combinators
 * @since 2.11.0
 */
var getUnionSemigroup = function (E) {
    var unionE = exports.union(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
exports.getUnionSemigroup = getUnionSemigroup;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.flap = 
/*#__PURE__*/
Functor_1.flap(exports.Functor);
/**
 * @category instances
 * @since 2.10.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Apply = {
    URI: exports.URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apFirst = 
/*#__PURE__*/
Apply_1.apFirst(exports.Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apSecond = 
/*#__PURE__*/
Apply_1.apSecond(exports.Apply);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.chainFirst = 
/*#__PURE__*/
Chain_1.chainFirst(exports.Chain);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FoldableWithIndex = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Comonad = {
    URI: exports.URI,
    map: _map,
    extend: _extend,
    extract: exports.extract
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
exports.Do = 
/*#__PURE__*/
exports.of(_.emptyRecord);
/**
 * @since 2.8.0
 */
exports.bindTo = 
/*#__PURE__*/
Functor_1.bindTo(exports.Functor);
/**
 * @since 2.8.0
 */
exports.bind = 
/*#__PURE__*/
Chain_1.bind(exports.Chain);
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
exports.apS = 
/*#__PURE__*/
Apply_1.apS(exports.Apply);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
exports.head = exports.extract;
/**
 * @since 2.5.0
 */
exports.tail = _.tail;
/**
 * @since 2.5.0
 */
var last = function (as) { return as[as.length - 1]; };
exports.last = last;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
var init = function (as) { return as.slice(0, -1); };
exports.init = init;
/**
 * @since 2.5.0
 */
var min = function (O) {
    var S = Se.min(O);
    return function (as) { return as.reduce(S.concat); };
};
exports.min = min;
/**
 * @since 2.5.0
 */
var max = function (O) {
    var S = Se.max(O);
    return function (as) { return as.reduce(S.concat); };
};
exports.max = max;
/**
 * @since 2.10.0
 */
var concatAll = function (S) { return function (as) { return as.reduce(S.concat); }; };
exports.concatAll = concatAll;
/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @category destructors
 * @since 2.11.0
 */
var matchLeft = function (f) { return function (as) {
    return f(exports.head(as), exports.tail(as));
}; };
exports.matchLeft = matchLeft;
/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category destructors
 * @since 2.11.0
 */
var matchRight = function (f) { return function (as) {
    return f(exports.init(as), exports.last(as));
}; };
exports.matchRight = matchRight;
/**
 * Apply a function to the head, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyHead = function (f) { return function (as) { return __spreadArray([
    f(exports.head(as))
], exports.tail(as)); }; };
exports.modifyHead = modifyHead;
/**
 * Change the head, creating a new `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.11.0
 */
var updateHead = function (a) { return exports.modifyHead(function () { return a; }); };
exports.updateHead = updateHead;
/**
 * Apply a function to the last element, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyLast = function (f) { return function (as) {
    return function_1.pipe(exports.init(as), exports.append(f(exports.last(as))));
}; };
exports.modifyLast = modifyLast;
/**
 * Change the last element, creating a new `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.11.0
 */
var updateLast = function (a) { return exports.modifyLast(function () { return a; }); };
exports.updateLast = updateLast;
function groupSort(O) {
    var sortO = exports.sort(O);
    var groupO = group(O);
    return function (as) { return (exports.isNonEmpty(as) ? groupO(sortO(as)) : exports.empty); };
}
exports.groupSort = groupSort;
function filter(predicate) {
    return exports.filterWithIndex(function (_, a) { return predicate(a); });
}
exports.filter = filter;
/**
 * Use [`filterWithIndex`](./ReadonlyArray.ts.html#filterwithindex) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
var filterWithIndex = function (predicate) { return function (as) { return exports.fromReadonlyArray(as.filter(function (a, i) { return predicate(i, a); })); }; };
exports.filterWithIndex = filterWithIndex;
/**
 * Use [`unprepend`](#unprepend) instead.
 *
 * @category destructors
 * @since 2.10.0
 * @deprecated
 */
exports.uncons = exports.unprepend;
/**
 * Use [`unappend`](#unappend) instead.
 *
 * @category destructors
 * @since 2.10.0
 * @deprecated
 */
exports.unsnoc = exports.unappend;
function cons(head, tail) {
    return tail === undefined ? exports.prepend(head) : function_1.pipe(tail, exports.prepend(head));
}
exports.cons = cons;
/**
 * Use [`append`](./ReadonlyArray.ts.html#append) instead.
 *
 * @category constructors
 * @since 2.5.0
 * @deprecated
 */
var snoc = function (init, end) { return function_1.pipe(init, concat([end])); };
exports.snoc = snoc;
/**
 * Use [`insertAt`](./ReadonlyArray.ts.html#insertat) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
var insertAt = function (i, a) { return function (as) {
    return i < 0 || i > as.length ? _.none : _.some(exports.unsafeInsertAt(i, a, as));
}; };
exports.insertAt = insertAt;
/**
 * Use [`prependAll`](#prependall) instead.
 *
 * @category combinators
 * @since 2.9.0
 * @deprecated
 */
exports.prependToAll = exports.prependAll;
/**
 * Use [`concatAll`](#concatall) instead.
 *
 * @since 2.5.0
 * @deprecated
 */
exports.fold = exports.concatAll;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.5.0
 * @deprecated
 */
exports.readonlyNonEmptyArray = {
    URI: exports.URI,
    of: exports.of,
    map: _map,
    mapWithIndex: _mapWithIndex,
    ap: _ap,
    chain: _chain,
    extend: _extend,
    extract: exports.extract,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex,
    alt: _alt
};


/***/ }),

/***/ 1897:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._reduceWithIndex = exports._partitionMap = exports._partition = exports._filterMap = exports._filter = exports._reduceRight = exports._foldMap = exports._reduce = exports._mapWithIndex = exports._map = exports.difference = exports.intersection = exports.union = exports.elem = exports.some = exports.every = exports.fromFoldableMap = exports.fromFoldable = exports.filterWithIndex = exports.filterMapWithIndex = exports.partitionWithIndex = exports.partitionMapWithIndex = exports.wilt = exports.wither = exports.sequence = exports.traverse = exports.traverseWithIndex = exports.singleton = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = exports.map = exports.mapWithIndex = exports.empty = exports.lookup = exports.isSubrecord = exports.pop = exports.modifyAt = exports.updateAt = exports.deleteAt = exports.has = exports.upsertAt = exports.toUnfoldable = exports.toReadonlyArray = exports.collect = exports.keys = exports.isEmpty = exports.size = exports.toRecord = exports.fromRecord = void 0;
exports.readonlyRecord = exports.hasOwnProperty = exports.insertAt = exports.Witherable = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getWitherable = exports.getTraversableWithIndex = exports.getTraversable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.getFoldableWithIndex = exports.getFoldable = exports.FunctorWithIndex = exports.flap = exports.Functor = exports.getMonoid = exports.getEq = exports.getShow = exports.URI = exports.separate = exports.compact = exports.reduceRight = exports.foldMap = exports.reduce = exports.partitionMap = exports.partition = exports.filterMap = exports.filter = exports._sequence = exports._traverse = exports._filterWithIndex = exports._filterMapWithIndex = exports._partitionWithIndex = exports._partitionMapWithIndex = exports._reduceRightWithIndex = exports._foldMapWithIndex = void 0;
var Eq_1 = __nccwpck_require__(6964);
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
var _ = __importStar(__nccwpck_require__(1840));
var Separated_1 = __nccwpck_require__(5877);
var S = __importStar(__nccwpck_require__(5189));
var Witherable_1 = __nccwpck_require__(4384);
// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
/**
 * @category interop
 * @since 2.5.0
 */
var fromRecord = function (r) { return Object.assign({}, r); };
exports.fromRecord = fromRecord;
/**
 * @category interop
 * @since 2.5.0
 */
var toRecord = function (r) { return Object.assign({}, r); };
exports.toRecord = toRecord;
/**
 * Calculate the number of key/value pairs in a `ReadonlyRecord`,
 *
 * @since 2.5.0
 */
var size = function (r) { return Object.keys(r).length; };
exports.size = size;
/**
 * Test whether a `ReadonlyRecord` is empty.
 *
 * @since 2.5.0
 */
var isEmpty = function (r) {
    for (var k in r) {
        if (_.has.call(r, k)) {
            return false;
        }
    }
    return true;
};
exports.isEmpty = isEmpty;
var keys_ = function (O) { return function (r) {
    return Object.keys(r).sort(O.compare);
}; };
/**
 * @since 2.5.0
 */
exports.keys = 
/*#__PURE__*/
keys_(S.Ord);
function collect(O) {
    if (typeof O === 'function') {
        return collect(S.Ord)(O);
    }
    var keysO = keys_(O);
    return function (f) { return function (r) {
        var out = [];
        for (var _i = 0, _a = keysO(r); _i < _a.length; _i++) {
            var key = _a[_i];
            out.push(f(key, r[key]));
        }
        return out;
    }; };
}
exports.collect = collect;
/**
 * Get a sorted `ReadonlyArray` of the key/value pairs contained in a `ReadonlyRecord`.
 *
 * @since 2.5.0
 */
exports.toReadonlyArray = 
/*#__PURE__*/
collect(S.Ord)(function (k, a) { return [k, a]; });
function toUnfoldable(U) {
    return function (r) {
        var sas = exports.toReadonlyArray(r);
        var len = sas.length;
        return U.unfold(0, function (b) { return (b < len ? _.some([sas[b], b + 1]) : _.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
/**
 * Insert or replace a key/value pair in a `ReadonlyRecord`.
 *
 * @category combinators
 * @since 2.10.0
 */
var upsertAt = function (k, a) { return function (r) {
    if (_.has.call(r, k) && r[k] === a) {
        return r;
    }
    var out = Object.assign({}, r);
    out[k] = a;
    return out;
}; };
exports.upsertAt = upsertAt;
/**
 * Test whether or not a key exists in a `ReadonlyRecord`.
 *
 * Note. This function is not pipeable because is a `Refinement`.
 *
 * @since 2.10.0
 */
var has = function (k, r) { return _.has.call(r, k); };
exports.has = has;
function deleteAt(k) {
    return function (r) {
        if (!_.has.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
exports.deleteAt = deleteAt;
/**
 * @since 2.5.0
 */
var updateAt = function (k, a) { return function (r) {
    if (!exports.has(k, r)) {
        return _.none;
    }
    if (r[k] === a) {
        return _.some(r);
    }
    var out = Object.assign({}, r);
    out[k] = a;
    return _.some(out);
}; };
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
var modifyAt = function (k, f) { return function (r) {
    if (!exports.has(k, r)) {
        return _.none;
    }
    var next = f(r[k]);
    if (next === r[k]) {
        return _.some(r);
    }
    var out = Object.assign({}, r);
    out[k] = next;
    return _.some(out);
}; };
exports.modifyAt = modifyAt;
function pop(k) {
    var deleteAtk = deleteAt(k);
    return function (r) {
        var oa = lookup(k, r);
        return _.isNone(oa) ? _.none : _.some([oa.value, deleteAtk(r)]);
    };
}
exports.pop = pop;
function isSubrecord(E) {
    return function (me, that) {
        if (that === undefined) {
            var isSubrecordE_1 = isSubrecord(E);
            return function (that) { return isSubrecordE_1(that, me); };
        }
        for (var k in me) {
            if (!_.has.call(that, k) || !E.equals(me[k], that[k])) {
                return false;
            }
        }
        return true;
    };
}
exports.isSubrecord = isSubrecord;
function lookup(k, r) {
    if (r === undefined) {
        return function (r) { return lookup(k, r); };
    }
    return _.has.call(r, k) ? _.some(r[k]) : _.none;
}
exports.lookup = lookup;
/**
 * @since 2.5.0
 */
exports.empty = {};
function mapWithIndex(f) {
    return function (r) {
        var out = {};
        for (var k in r) {
            if (_.has.call(r, k)) {
                out[k] = f(k, r[k]);
            }
        }
        return out;
    };
}
exports.mapWithIndex = mapWithIndex;
function map(f) {
    return mapWithIndex(function (_, a) { return f(a); });
}
exports.map = map;
function reduceWithIndex() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 2) {
        return reduceWithIndex(S.Ord).apply(void 0, args);
    }
    var keysO = keys_(args[0]);
    return function (b, f) { return function (fa) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = f(k, out, fa[k]);
        }
        return out;
    }; };
}
exports.reduceWithIndex = reduceWithIndex;
function foldMapWithIndex(O) {
    if ('compare' in O) {
        var keysO_1 = keys_(O);
        return function (M) { return function (f) { return function (fa) {
            var out = M.empty;
            var ks = keysO_1(fa);
            var len = ks.length;
            for (var i = 0; i < len; i++) {
                var k = ks[i];
                out = M.concat(out, f(k, fa[k]));
            }
            return out;
        }; }; };
    }
    return foldMapWithIndex(S.Ord)(O);
}
exports.foldMapWithIndex = foldMapWithIndex;
function reduceRightWithIndex() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 2) {
        return reduceRightWithIndex(S.Ord).apply(void 0, args);
    }
    var keysO = keys_(args[0]);
    return function (b, f) { return function (fa) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = ks[i];
            out = f(k, fa[k], out);
        }
        return out;
    }; };
}
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * Create a `ReadonlyRecord` with one key/value pair.
 *
 * @category constructors
 * @since 2.5.0
 */
var singleton = function (k, a) {
    var _a;
    return (_a = {}, _a[k] = a, _a);
};
exports.singleton = singleton;
function traverseWithIndex(F) {
    var traverseWithIndexOF = _traverseWithIndex(S.Ord)(F);
    return function (f) { return function (ta) { return traverseWithIndexOF(ta, f); }; };
}
exports.traverseWithIndex = traverseWithIndex;
function traverse(F) {
    var traverseOF = exports._traverse(S.Ord)(F);
    return function (f) { return function (ta) { return traverseOF(ta, f); }; };
}
exports.traverse = traverse;
function sequence(F) {
    return exports._sequence(S.Ord)(F);
}
exports.sequence = sequence;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wither = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map(function_1.pipe(fa, traverseF(f)), exports.compact); }; };
};
exports.wither = wither;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wilt = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map(function_1.pipe(fa, traverseF(f)), exports.separate); }; };
};
exports.wilt = wilt;
function partitionMapWithIndex(f) {
    return function (r) {
        var left = {};
        var right = {};
        for (var k in r) {
            if (_.has.call(r, k)) {
                var e = f(k, r[k]);
                switch (e._tag) {
                    case 'Left':
                        left[k] = e.left;
                        break;
                    case 'Right':
                        right[k] = e.right;
                        break;
                }
            }
        }
        return Separated_1.separated(left, right);
    };
}
exports.partitionMapWithIndex = partitionMapWithIndex;
function partitionWithIndex(predicateWithIndex) {
    return function (r) {
        var left = {};
        var right = {};
        for (var k in r) {
            if (_.has.call(r, k)) {
                var a = r[k];
                if (predicateWithIndex(k, a)) {
                    right[k] = a;
                }
                else {
                    left[k] = a;
                }
            }
        }
        return Separated_1.separated(left, right);
    };
}
exports.partitionWithIndex = partitionWithIndex;
function filterMapWithIndex(f) {
    return function (r) {
        var out = {};
        for (var k in r) {
            if (_.has.call(r, k)) {
                var ob = f(k, r[k]);
                if (_.isSome(ob)) {
                    out[k] = ob.value;
                }
            }
        }
        return out;
    };
}
exports.filterMapWithIndex = filterMapWithIndex;
function filterWithIndex(predicateWithIndex) {
    return function (fa) {
        var out = {};
        var changed = false;
        for (var key in fa) {
            if (_.has.call(fa, key)) {
                var a = fa[key];
                if (predicateWithIndex(key, a)) {
                    out[key] = a;
                }
                else {
                    changed = true;
                }
            }
        }
        return changed ? out : fa;
    };
}
exports.filterWithIndex = filterWithIndex;
function fromFoldable(M, F) {
    var fromFoldableMapM = fromFoldableMap(M, F);
    return function (fka) { return fromFoldableMapM(fka, function_1.identity); };
}
exports.fromFoldable = fromFoldable;
function fromFoldableMap(M, F) {
    return function (ta, f) {
        return F.reduce(ta, {}, function (r, a) {
            var _a = f(a), k = _a[0], b = _a[1];
            r[k] = _.has.call(r, k) ? M.concat(r[k], b) : b;
            return r;
        });
    };
}
exports.fromFoldableMap = fromFoldableMap;
/**
 * @since 2.5.0
 */
function every(predicate) {
    return function (r) {
        for (var k in r) {
            if (!predicate(r[k])) {
                return false;
            }
        }
        return true;
    };
}
exports.every = every;
/**
 * @since 2.5.0
 */
function some(predicate) {
    return function (r) {
        for (var k in r) {
            if (predicate(r[k])) {
                return true;
            }
        }
        return false;
    };
}
exports.some = some;
function elem(E) {
    return function (a, fa) {
        if (fa === undefined) {
            var elemE_1 = elem(E);
            return function (fa) { return elemE_1(a, fa); };
        }
        for (var k in fa) {
            if (E.equals(fa[k], a)) {
                return true;
            }
        }
        return false;
    };
}
exports.elem = elem;
/**
 * @category combinators
 * @since 2.11.0
 */
var union = function (M) { return function (second) { return function (first) {
    if (exports.isEmpty(first)) {
        return second;
    }
    if (exports.isEmpty(second)) {
        return first;
    }
    var out = {};
    for (var k in first) {
        if (exports.has(k, second)) {
            out[k] = M.concat(first[k], second[k]);
        }
        else {
            out[k] = first[k];
        }
    }
    for (var k in second) {
        if (!exports.has(k, out)) {
            out[k] = second[k];
        }
    }
    return out;
}; }; };
exports.union = union;
/**
 * @category combinators
 * @since 2.11.0
 */
var intersection = function (M) { return function (second) { return function (first) {
    if (exports.isEmpty(first) || exports.isEmpty(second)) {
        return exports.empty;
    }
    var out = {};
    for (var k in first) {
        if (exports.has(k, second)) {
            out[k] = M.concat(first[k], second[k]);
        }
    }
    return out;
}; }; };
exports.intersection = intersection;
/**
 * @category combinators
 * @since 2.11.0
 */
var difference = function (second) { return function (first) {
    if (exports.isEmpty(first)) {
        return second;
    }
    if (exports.isEmpty(second)) {
        return first;
    }
    var out = {};
    for (var k in first) {
        if (!exports.has(k, second)) {
            out[k] = first[k];
        }
    }
    for (var k in second) {
        if (!exports.has(k, first)) {
            out[k] = second[k];
        }
    }
    return out;
}; };
exports.difference = difference;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/** @internal */
var _map = function (fa, f) { return function_1.pipe(fa, map(f)); };
exports._map = _map;
/** @internal */
/* istanbul ignore next */
var _mapWithIndex = function (fa, f) { return function_1.pipe(fa, mapWithIndex(f)); };
exports._mapWithIndex = _mapWithIndex;
/** @internal */
/* istanbul ignore next */
var _reduce = function (O) {
    var reduceO = reduce(O);
    return function (fa, b, f) { return function_1.pipe(fa, reduceO(b, f)); };
};
exports._reduce = _reduce;
/** @internal */
var _foldMap = function (O) { return function (M) {
    var foldMapM = foldMap(O)(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapM(f)); };
}; };
exports._foldMap = _foldMap;
/** @internal */
/* istanbul ignore next */
var _reduceRight = function (O) {
    var reduceRightO = reduceRight(O);
    return function (fa, b, f) { return function_1.pipe(fa, reduceRightO(b, f)); };
};
exports._reduceRight = _reduceRight;
/** @internal */
/* istanbul ignore next */
var _filter = function (fa, predicate) {
    return function_1.pipe(fa, exports.filter(predicate));
};
exports._filter = _filter;
/** @internal */
/* istanbul ignore next */
var _filterMap = function (fa, f) { return function_1.pipe(fa, exports.filterMap(f)); };
exports._filterMap = _filterMap;
/** @internal */
/* istanbul ignore next */
var _partition = function (fa, predicate) { return function_1.pipe(fa, exports.partition(predicate)); };
exports._partition = _partition;
/** @internal */
/* istanbul ignore next */
var _partitionMap = function (fa, f) { return function_1.pipe(fa, exports.partitionMap(f)); };
exports._partitionMap = _partitionMap;
/** @internal */
/* istanbul ignore next */
var _reduceWithIndex = function (O) {
    var reduceWithIndexO = reduceWithIndex(O);
    return function (fa, b, f) { return function_1.pipe(fa, reduceWithIndexO(b, f)); };
};
exports._reduceWithIndex = _reduceWithIndex;
/** @internal */
var _foldMapWithIndex = function (O) {
    var foldMapWithIndexO = foldMapWithIndex(O);
    return function (M) {
        var foldMapWithIndexM = foldMapWithIndexO(M);
        return function (fa, f) { return function_1.pipe(fa, foldMapWithIndexM(f)); };
    };
};
exports._foldMapWithIndex = _foldMapWithIndex;
/** @internal */
/* istanbul ignore next */
var _reduceRightWithIndex = function (O) {
    var reduceRightWithIndexO = reduceRightWithIndex(O);
    return function (fa, b, f) { return function_1.pipe(fa, reduceRightWithIndexO(b, f)); };
};
exports._reduceRightWithIndex = _reduceRightWithIndex;
/** @internal */
/* istanbul ignore next */
var _partitionMapWithIndex = function (fa, f) { return function_1.pipe(fa, partitionMapWithIndex(f)); };
exports._partitionMapWithIndex = _partitionMapWithIndex;
/** @internal */
/* istanbul ignore next */
var _partitionWithIndex = function (fa, predicateWithIndex) { return function_1.pipe(fa, partitionWithIndex(predicateWithIndex)); };
exports._partitionWithIndex = _partitionWithIndex;
/** @internal */
/* istanbul ignore next */
var _filterMapWithIndex = function (fa, f) {
    return function_1.pipe(fa, filterMapWithIndex(f));
};
exports._filterMapWithIndex = _filterMapWithIndex;
/** @internal */
/* istanbul ignore next */
var _filterWithIndex = function (fa, predicateWithIndex) {
    return function_1.pipe(fa, filterWithIndex(predicateWithIndex));
};
exports._filterWithIndex = _filterWithIndex;
/** @internal */
var _traverse = function (O) {
    var traverseWithIndexO = _traverseWithIndex(O);
    return function (F) {
        var traverseWithIndexOF = traverseWithIndexO(F);
        return function (ta, f) { return traverseWithIndexOF(ta, function_1.flow(function_1.SK, f)); };
    };
};
exports._traverse = _traverse;
/** @internal */
var _sequence = function (O) {
    var traverseO = exports._traverse(O);
    return function (F) {
        var traverseOF = traverseO(F);
        return function (ta) { return traverseOF(ta, function_1.identity); };
    };
};
exports._sequence = _sequence;
var _traverseWithIndex = function (O) { return function (F) {
    var keysO = keys_(O);
    return function (ta, f) {
        var ks = keysO(ta);
        if (ks.length === 0) {
            return F.of(exports.empty);
        }
        var fr = F.of({});
        var _loop_1 = function (key) {
            fr = F.ap(F.map(fr, function (r) { return function (b) {
                r[key] = b;
                return r;
            }; }), f(key, ta[key]));
        };
        for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
            var key = ks_1[_i];
            _loop_1(key);
        }
        return fr;
    };
}; };
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Filterable
 * @since 2.5.0
 */
var filter = function (predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
};
exports.filter = filter;
/**
 * @category Filterable
 * @since 2.5.0
 */
var filterMap = function (f) { return filterMapWithIndex(function (_, a) { return f(a); }); };
exports.filterMap = filterMap;
/**
 * @category Filterable
 * @since 2.5.0
 */
var partition = function (predicate) {
    return partitionWithIndex(function (_, a) { return predicate(a); });
};
exports.partition = partition;
/**
 * @category Filterable
 * @since 2.5.0
 */
var partitionMap = function (f) {
    return partitionMapWithIndex(function (_, a) { return f(a); });
};
exports.partitionMap = partitionMap;
function reduce() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1) {
        var reduceWithIndexO_1 = reduceWithIndex(args[0]);
        return function (b, f) { return reduceWithIndexO_1(b, function (_, b, a) { return f(b, a); }); };
    }
    return reduce(S.Ord).apply(void 0, args);
}
exports.reduce = reduce;
function foldMap(O) {
    if ('compare' in O) {
        var foldMapWithIndexO_1 = foldMapWithIndex(O);
        return function (M) {
            var foldMapWithIndexM = foldMapWithIndexO_1(M);
            return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
        };
    }
    return foldMap(S.Ord)(O);
}
exports.foldMap = foldMap;
function reduceRight() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1) {
        var reduceRightWithIndexO_1 = reduceRightWithIndex(args[0]);
        return function (b, f) { return reduceRightWithIndexO_1(b, function (_, b, a) { return f(b, a); }); };
    }
    return reduceRight(S.Ord).apply(void 0, args);
}
exports.reduceRight = reduceRight;
/**
 * @category Compactable
 * @since 2.5.0
 */
var compact = function (r) {
    var out = {};
    for (var k in r) {
        if (_.has.call(r, k)) {
            var oa = r[k];
            if (_.isSome(oa)) {
                out[k] = oa.value;
            }
        }
    }
    return out;
};
exports.compact = compact;
/**
 * @category Compactable
 * @since 2.5.0
 */
var separate = function (r) {
    var left = {};
    var right = {};
    for (var k in r) {
        if (_.has.call(r, k)) {
            var e = r[k];
            if (_.isLeft(e)) {
                left[k] = e.left;
            }
            else {
                right[k] = e.right;
            }
        }
    }
    return Separated_1.separated(left, right);
};
exports.separate = separate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
exports.URI = 'ReadonlyRecord';
function getShow(O) {
    if ('compare' in O) {
        return function (S) { return ({
            show: function (r) {
                var elements = collect(O)(function (k, a) { return JSON.stringify(k) + ": " + S.show(a); })(r).join(', ');
                return elements === '' ? '{}' : "{ " + elements + " }";
            }
        }); };
    }
    return getShow(S.Ord)(O);
}
exports.getShow = getShow;
function getEq(E) {
    var isSubrecordE = isSubrecord(E);
    return Eq_1.fromEquals(function (x, y) { return isSubrecordE(x)(y) && isSubrecordE(y)(x); });
}
exports.getEq = getEq;
function getMonoid(S) {
    return {
        concat: function (first, second) {
            if (exports.isEmpty(first)) {
                return second;
            }
            if (exports.isEmpty(second)) {
                return first;
            }
            var r = Object.assign({}, first);
            for (var k in second) {
                if (_.has.call(second, k)) {
                    r[k] = _.has.call(first, k) ? S.concat(first[k], second[k]) : second[k];
                }
            }
            return r;
        },
        empty: exports.empty
    };
}
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: exports._map
};
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.flap = 
/*#__PURE__*/
Functor_1.flap(exports.Functor);
/**
 * @category instances
 * @since 2.7.0
 */
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: exports._map,
    mapWithIndex: exports._mapWithIndex
};
/**
 * @category instances
 * @since 2.11.0
 */
var getFoldable = function (O) { return ({
    URI: exports.URI,
    reduce: exports._reduce(O),
    foldMap: exports._foldMap(O),
    reduceRight: exports._reduceRight(O)
}); };
exports.getFoldable = getFoldable;
/**
 * @category instances
 * @since 2.11.0
 */
var getFoldableWithIndex = function (O) { return ({
    URI: exports.URI,
    reduce: exports._reduce(O),
    foldMap: exports._foldMap(O),
    reduceRight: exports._reduceRight(O),
    reduceWithIndex: exports._reduceWithIndex(O),
    foldMapWithIndex: exports._foldMapWithIndex(O),
    reduceRightWithIndex: exports._reduceRightWithIndex(O)
}); };
exports.getFoldableWithIndex = getFoldableWithIndex;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Compactable = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Filterable = {
    URI: exports.URI,
    map: exports._map,
    compact: exports.compact,
    separate: exports.separate,
    filter: exports._filter,
    filterMap: exports._filterMap,
    partition: exports._partition,
    partitionMap: exports._partitionMap
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FilterableWithIndex = {
    URI: exports.URI,
    map: exports._map,
    mapWithIndex: exports._mapWithIndex,
    compact: exports.compact,
    separate: exports.separate,
    filter: exports._filter,
    filterMap: exports._filterMap,
    partition: exports._partition,
    partitionMap: exports._partitionMap,
    filterMapWithIndex: exports._filterMapWithIndex,
    filterWithIndex: exports._filterWithIndex,
    partitionMapWithIndex: exports._partitionMapWithIndex,
    partitionWithIndex: exports._partitionWithIndex
};
/**
 * @category instances
 * @since 2.11.0
 */
var getTraversable = function (O) { return ({
    URI: exports.URI,
    map: exports._map,
    reduce: exports._reduce(O),
    foldMap: exports._foldMap(O),
    reduceRight: exports._reduceRight(O),
    traverse: exports._traverse(O),
    sequence: exports._sequence(O)
}); };
exports.getTraversable = getTraversable;
/**
 * @category instances
 * @since 2.11.0
 */
var getTraversableWithIndex = function (O) { return ({
    URI: exports.URI,
    map: exports._map,
    mapWithIndex: exports._mapWithIndex,
    reduce: exports._reduce(O),
    foldMap: exports._foldMap(O),
    reduceRight: exports._reduceRight(O),
    reduceWithIndex: exports._reduceWithIndex(O),
    foldMapWithIndex: exports._foldMapWithIndex(O),
    reduceRightWithIndex: exports._reduceRightWithIndex(O),
    traverse: exports._traverse(O),
    sequence: exports._sequence(O),
    traverseWithIndex: _traverseWithIndex(O)
}); };
exports.getTraversableWithIndex = getTraversableWithIndex;
/**
 * @category instances
 * @since 2.11.0
 */
var getWitherable = function (O) {
    var T = exports.getTraversable(O);
    return {
        URI: exports.URI,
        map: exports._map,
        reduce: exports._reduce(O),
        foldMap: exports._foldMap(O),
        reduceRight: exports._reduceRight(O),
        traverse: T.traverse,
        sequence: T.sequence,
        compact: exports.compact,
        separate: exports.separate,
        filter: exports._filter,
        filterMap: exports._filterMap,
        partition: exports._partition,
        partitionMap: exports._partitionMap,
        wither: Witherable_1.witherDefault(T, exports.Compactable),
        wilt: Witherable_1.wiltDefault(T, exports.Compactable)
    };
};
exports.getWitherable = getWitherable;
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionSemigroup = function (S) {
    var unionS = exports.union(S);
    return {
        concat: function (first, second) { return unionS(second)(first); }
    };
};
exports.getUnionSemigroup = getUnionSemigroup;
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionMonoid = function (S) { return ({
    concat: exports.getUnionSemigroup(S).concat,
    empty: exports.empty
}); };
exports.getUnionMonoid = getUnionMonoid;
/**
 * @category instances
 * @since 2.11.0
 */
var getIntersectionSemigroup = function (S) {
    var intersectionS = exports.intersection(S);
    return {
        concat: function (first, second) { return intersectionS(second)(first); }
    };
};
exports.getIntersectionSemigroup = getIntersectionSemigroup;
/**
 * @category instances
 * @since 2.11.0
 */
var getDifferenceMagma = function () { return ({
    concat: function (first, second) { return exports.difference(second)(first); }
}); };
exports.getDifferenceMagma = getDifferenceMagma;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
// tslint:disable: deprecation
/**
 * Use `getFoldable` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: 
    /*#__PURE__*/
    exports._reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    exports._foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    exports._reduceRight(S.Ord)
};
/**
 * Use `getFoldableWithIndex` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
exports.FoldableWithIndex = {
    URI: exports.URI,
    reduce: 
    /*#__PURE__*/
    exports._reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    exports._foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    exports._reduceRight(S.Ord),
    reduceWithIndex: 
    /*#__PURE__*/
    exports._reduceWithIndex(S.Ord),
    foldMapWithIndex: 
    /*#__PURE__*/
    exports._foldMapWithIndex(S.Ord),
    reduceRightWithIndex: 
    /*#__PURE__*/
    exports._reduceRightWithIndex(S.Ord)
};
/**
 * Use `getTraversable` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
exports.Traversable = {
    URI: exports.URI,
    map: exports._map,
    reduce: 
    /*#__PURE__*/
    exports._reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    exports._foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    exports._reduceRight(S.Ord),
    traverse: 
    /*#__PURE__*/
    exports._traverse(S.Ord),
    sequence: sequence
};
/**
 * Use `getTraversableWithIndex` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: exports._map,
    mapWithIndex: exports._mapWithIndex,
    reduce: 
    /*#__PURE__*/
    exports._reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    exports._foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    exports._reduceRight(S.Ord),
    reduceWithIndex: 
    /*#__PURE__*/
    exports._reduceWithIndex(S.Ord),
    foldMapWithIndex: 
    /*#__PURE__*/
    exports._foldMapWithIndex(S.Ord),
    reduceRightWithIndex: 
    /*#__PURE__*/
    exports._reduceRightWithIndex(S.Ord),
    traverse: 
    /*#__PURE__*/
    exports._traverse(S.Ord),
    sequence: sequence,
    traverseWithIndex: 
    /*#__PURE__*/
    _traverseWithIndex(S.Ord)
};
var _wither = 
/*#__PURE__*/
Witherable_1.witherDefault(exports.Traversable, exports.Compactable);
var _wilt = 
/*#__PURE__*/
Witherable_1.wiltDefault(exports.Traversable, exports.Compactable);
/**
 * Use `getWitherable` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
exports.Witherable = {
    URI: exports.URI,
    map: exports._map,
    reduce: 
    /*#__PURE__*/
    exports._reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    exports._foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    exports._reduceRight(S.Ord),
    traverse: 
    /*#__PURE__*/
    exports._traverse(S.Ord),
    sequence: sequence,
    compact: exports.compact,
    separate: exports.separate,
    filter: exports._filter,
    filterMap: exports._filterMap,
    partition: exports._partition,
    partitionMap: exports._partitionMap,
    wither: _wither,
    wilt: _wilt
};
/**
 * Use [`upsertAt`](#upsertat) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
exports.insertAt = exports.upsertAt;
function hasOwnProperty(k, r) {
    return _.has.call(r === undefined ? this : r, k);
}
exports.hasOwnProperty = hasOwnProperty;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.5.0
 * @deprecated
 */
exports.readonlyRecord = {
    URI: exports.URI,
    map: exports._map,
    reduce: 
    /*#__PURE__*/
    exports._reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    exports._foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    exports._reduceRight(S.Ord),
    traverse: 
    /*#__PURE__*/
    exports._traverse(S.Ord),
    sequence: sequence,
    compact: exports.compact,
    separate: exports.separate,
    filter: exports._filter,
    filterMap: exports._filterMap,
    partition: exports._partition,
    partitionMap: exports._partitionMap,
    mapWithIndex: exports._mapWithIndex,
    reduceWithIndex: 
    /*#__PURE__*/
    exports._reduceWithIndex(S.Ord),
    foldMapWithIndex: 
    /*#__PURE__*/
    exports._foldMapWithIndex(S.Ord),
    reduceRightWithIndex: 
    /*#__PURE__*/
    exports._reduceRightWithIndex(S.Ord),
    filterMapWithIndex: exports._filterMapWithIndex,
    filterWithIndex: exports._filterWithIndex,
    partitionMapWithIndex: exports._partitionMapWithIndex,
    partitionWithIndex: exports._partitionWithIndex,
    traverseWithIndex: 
    /*#__PURE__*/
    _traverseWithIndex(S.Ord),
    wither: _wither,
    wilt: _wilt
};


/***/ }),

/***/ 2653:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMonoid = exports.getEq = exports.getShow = exports.URI = exports.separate = exports.compact = exports.reduceRight = exports.foldMap = exports.reduce = exports.partitionMap = exports.partition = exports.filterMap = exports.filter = exports.difference = exports.intersection = exports.union = exports.elem = exports.some = exports.every = exports.fromFoldableMap = exports.fromFoldable = exports.filterWithIndex = exports.filterMapWithIndex = exports.partitionWithIndex = exports.partitionMapWithIndex = exports.wilt = exports.wither = exports.sequence = exports.traverse = exports.traverseWithIndex = exports.singleton = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = exports.map = exports.mapWithIndex = exports.lookup = exports.isSubrecord = exports.pop = exports.modifyAt = exports.updateAt = exports.deleteAt = exports.has = exports.upsertAt = exports.toUnfoldable = exports.toArray = exports.collect = exports.keys = exports.isEmpty = exports.size = void 0;
exports.record = exports.hasOwnProperty = exports.insertAt = exports.empty = exports.Witherable = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getWitherable = exports.getTraversableWithIndex = exports.getTraversable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.getFoldableWithIndex = exports.getFoldable = exports.FunctorWithIndex = exports.flap = exports.Functor = void 0;
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
var _ = __importStar(__nccwpck_require__(1840));
var RR = __importStar(__nccwpck_require__(1897));
var S = __importStar(__nccwpck_require__(5189));
var Witherable_1 = __nccwpck_require__(4384);
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * Calculate the number of key/value pairs in a `Record`.
 *
 * @since 2.0.0
 */
exports.size = RR.size;
/**
 * Test whether a `Record` is empty.
 *
 * @since 2.0.0
 */
exports.isEmpty = RR.isEmpty;
var keys_ = function (O) { return function (r) {
    return Object.keys(r).sort(O.compare);
}; };
/**
 * @since 2.0.0
 */
exports.keys = 
/*#__PURE__*/
keys_(S.Ord);
function collect(O) {
    if (typeof O === 'function') {
        return collect(S.Ord)(O);
    }
    var keysO = keys_(O);
    return function (f) { return function (r) {
        var out = [];
        for (var _i = 0, _a = keysO(r); _i < _a.length; _i++) {
            var key = _a[_i];
            out.push(f(key, r[key]));
        }
        return out;
    }; };
}
exports.collect = collect;
/**
 * Get a sorted `Array` of the key/value pairs contained in a `Record`.
 *
 * @since 2.0.0
 */
exports.toArray = 
/*#__PURE__*/
collect(S.Ord)(function (k, a) { return [k, a]; });
function toUnfoldable(U) {
    return function (r) {
        var sas = exports.toArray(r);
        var len = sas.length;
        return U.unfold(0, function (b) { return (b < len ? _.some([sas[b], b + 1]) : _.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
/**
 * Insert or replace a key/value pair in a `Record`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.upsertAt = RR.upsertAt;
/**
 * Test whether or not a key exists in a `Record`.
 *
 * Note. This function is not pipeable because is a `Refinement`.
 *
 * @since 2.10.0
 */
exports.has = RR.has;
function deleteAt(k) {
    return function (r) {
        if (!_.has.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
exports.deleteAt = deleteAt;
/**
 * @since 2.0.0
 */
var updateAt = function (k, a) {
    return exports.modifyAt(k, function () { return a; });
};
exports.updateAt = updateAt;
/**
 * @since 2.0.0
 */
var modifyAt = function (k, f) { return function (r) {
    if (!exports.has(k, r)) {
        return _.none;
    }
    var out = Object.assign({}, r);
    out[k] = f(r[k]);
    return _.some(out);
}; };
exports.modifyAt = modifyAt;
function pop(k) {
    var deleteAtk = deleteAt(k);
    return function (r) {
        var oa = exports.lookup(k, r);
        return _.isNone(oa) ? _.none : _.some([oa.value, deleteAtk(r)]);
    };
}
exports.pop = pop;
// TODO: remove non-curried overloading in v3
/**
 * Test whether one `Record` contains all of the keys and values contained in another `Record`.
 *
 * @since 2.0.0
 */
exports.isSubrecord = RR.isSubrecord;
// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Record`.
 *
 * @since 2.0.0
 */
exports.lookup = RR.lookup;
/**
 * Map a `Record` passing the keys to the iterating function.
 *
 * @since 2.0.0
 */
exports.mapWithIndex = RR.mapWithIndex;
/**
 * Map a `Record` passing the values to the iterating function.
 *
 * @since 2.0.0
 */
exports.map = RR.map;
function reduceWithIndex() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? RR.reduceWithIndex(args[0]) : RR.reduceWithIndex(S.Ord).apply(void 0, args);
}
exports.reduceWithIndex = reduceWithIndex;
function foldMapWithIndex(O) {
    return 'compare' in O ? RR.foldMapWithIndex(O) : RR.foldMapWithIndex(S.Ord)(O);
}
exports.foldMapWithIndex = foldMapWithIndex;
function reduceRightWithIndex() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? RR.reduceRightWithIndex(args[0]) : RR.reduceRightWithIndex(S.Ord).apply(void 0, args);
}
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * Create a `Record` with one key/value pair.
 *
 * @since 2.0.0
 */
exports.singleton = RR.singleton;
function traverseWithIndex(F) {
    return RR.traverseWithIndex(F);
}
exports.traverseWithIndex = traverseWithIndex;
function traverse(F) {
    return RR.traverse(F);
}
exports.traverse = traverse;
function sequence(F) {
    return RR.sequence(F);
}
exports.sequence = sequence;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wither = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map(function_1.pipe(fa, traverseF(f)), exports.compact); }; };
};
exports.wither = wither;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wilt = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map(function_1.pipe(fa, traverseF(f)), exports.separate); }; };
};
exports.wilt = wilt;
/**
 * @since 2.0.0
 */
exports.partitionMapWithIndex = RR.partitionMapWithIndex;
function partitionWithIndex(predicateWithIndex) {
    return RR.partitionWithIndex(predicateWithIndex);
}
exports.partitionWithIndex = partitionWithIndex;
/**
 * @since 2.0.0
 */
exports.filterMapWithIndex = RR.filterMapWithIndex;
function filterWithIndex(predicateWithIndex) {
    return RR.filterWithIndex(predicateWithIndex);
}
exports.filterWithIndex = filterWithIndex;
function fromFoldable(M, F) {
    return RR.fromFoldable(M, F);
}
exports.fromFoldable = fromFoldable;
function fromFoldableMap(M, F) {
    return RR.fromFoldableMap(M, F);
}
exports.fromFoldableMap = fromFoldableMap;
/**
 * @since 2.0.0
 */
exports.every = RR.every;
/**
 * @since 2.0.0
 */
exports.some = RR.some;
// TODO: remove non-curried overloading in v3
/**
 * @since 2.0.0
 */
exports.elem = RR.elem;
/**
 * @category combinators
 * @since 2.11.0
 */
var union = function (M) {
    var unionM = RR.union(M);
    return function (second) { return function (first) {
        if (exports.isEmpty(first)) {
            return __assign({}, second);
        }
        if (exports.isEmpty(second)) {
            return __assign({}, first);
        }
        return unionM(second)(first);
    }; };
};
exports.union = union;
/**
 * @category combinators
 * @since 2.11.0
 */
var intersection = function (M) { return function (second) { return function (first) {
    if (exports.isEmpty(first) || exports.isEmpty(second)) {
        return {};
    }
    return RR.intersection(M)(second)(first);
}; }; };
exports.intersection = intersection;
/**
 * @category combinators
 * @since 2.11.0
 */
var difference = function (second) { return function (first) {
    if (exports.isEmpty(first)) {
        return __assign({}, second);
    }
    if (exports.isEmpty(second)) {
        return __assign({}, first);
    }
    return RR.difference(second)(first);
}; };
exports.difference = difference;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var _map = RR._map;
var _mapWithIndex = RR._mapWithIndex;
var _reduce = RR._reduce;
var _foldMap = RR._foldMap;
var _reduceRight = RR._reduceRight;
var _filter = RR._filter;
var _filterMap = RR._filterMap;
var _partition = RR._partition;
var _partitionMap = RR._partitionMap;
var _reduceWithIndex = RR._reduceWithIndex;
var _foldMapWithIndex = RR._foldMapWithIndex;
var _reduceRightWithIndex = RR._reduceRightWithIndex;
var _partitionMapWithIndex = RR._partitionMapWithIndex;
var _partitionWithIndex = RR._partitionWithIndex;
var _filterMapWithIndex = RR._filterMapWithIndex;
var _filterWithIndex = RR._filterWithIndex;
var _traverse = RR._traverse;
var _sequence = RR._sequence;
var _traverseWithIndex = function (O) { return function (F) {
    var keysO = keys_(O);
    return function (ta, f) {
        var ks = keysO(ta);
        if (ks.length === 0) {
            return F.of({});
        }
        var fr = F.of({});
        var _loop_1 = function (key) {
            fr = F.ap(F.map(fr, function (r) { return function (b) {
                r[key] = b;
                return r;
            }; }), f(key, ta[key]));
        };
        for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
            var key = ks_1[_i];
            _loop_1(key);
        }
        return fr;
    };
}; };
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.filter = RR.filter;
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.filterMap = RR.filterMap;
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.partition = RR.partition;
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.partitionMap = RR.partitionMap;
function reduce() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? RR.reduce(args[0]) : RR.reduce(S.Ord).apply(void 0, args);
}
exports.reduce = reduce;
function foldMap(O) {
    return 'compare' in O ? RR.foldMap(O) : RR.foldMap(S.Ord)(O);
}
exports.foldMap = foldMap;
function reduceRight() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? RR.reduceRight(args[0]) : RR.reduceRight(S.Ord).apply(void 0, args);
}
exports.reduceRight = reduceRight;
/**
 * @category Compactable
 * @since 2.0.0
 */
exports.compact = RR.compact;
/**
 * @category Compactable
 * @since 2.0.0
 */
exports.separate = RR.separate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Record';
function getShow(O) {
    return 'compare' in O ? RR.getShow(O) : RR.getShow(S.Ord)(O);
}
exports.getShow = getShow;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getEq = RR.getEq;
/**
 * Returns a `Monoid` instance for `Record`s given a `Semigroup` instance for their values.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 * import { getMonoid } from 'fp-ts/Record'
 *
 * const M = getMonoid(SemigroupSum)
 * assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 * @category instances
 * @since 2.0.0
 */
exports.getMonoid = RR.getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.flap = 
/*#__PURE__*/
Functor_1.flap(exports.Functor);
/**
 * @category instances
 * @since 2.7.0
 */
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * @category instances
 * @since 2.11.0
 */
var getFoldable = function (O) { return ({
    URI: exports.URI,
    reduce: _reduce(O),
    foldMap: _foldMap(O),
    reduceRight: _reduceRight(O)
}); };
exports.getFoldable = getFoldable;
/**
 * @category instances
 * @since 2.11.0
 */
var getFoldableWithIndex = function (O) { return ({
    URI: exports.URI,
    reduce: _reduce(O),
    foldMap: _foldMap(O),
    reduceRight: _reduceRight(O),
    reduceWithIndex: _reduceWithIndex(O),
    foldMapWithIndex: _foldMapWithIndex(O),
    reduceRightWithIndex: _reduceRightWithIndex(O)
}); };
exports.getFoldableWithIndex = getFoldableWithIndex;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Compactable = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Filterable = {
    URI: exports.URI,
    map: _map,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FilterableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex
};
/**
 * @category instances
 * @since 2.11.0
 */
var getTraversable = function (O) { return ({
    URI: exports.URI,
    map: _map,
    reduce: _reduce(O),
    foldMap: _foldMap(O),
    reduceRight: _reduceRight(O),
    traverse: _traverse(O),
    sequence: _sequence(O)
}); };
exports.getTraversable = getTraversable;
/**
 * @category instances
 * @since 2.11.0
 */
var getTraversableWithIndex = function (O) { return ({
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce(O),
    foldMap: _foldMap(O),
    reduceRight: _reduceRight(O),
    reduceWithIndex: _reduceWithIndex(O),
    foldMapWithIndex: _foldMapWithIndex(O),
    reduceRightWithIndex: _reduceRightWithIndex(O),
    traverse: _traverse(O),
    sequence: _sequence(O),
    traverseWithIndex: _traverseWithIndex(O)
}); };
exports.getTraversableWithIndex = getTraversableWithIndex;
/**
 * @category instances
 * @since 2.11.0
 */
var getWitherable = function (O) {
    var T = exports.getTraversable(O);
    return {
        URI: exports.URI,
        map: _map,
        reduce: _reduce(O),
        foldMap: _foldMap(O),
        reduceRight: _reduceRight(O),
        traverse: T.traverse,
        sequence: T.sequence,
        compact: exports.compact,
        separate: exports.separate,
        filter: _filter,
        filterMap: _filterMap,
        partition: _partition,
        partitionMap: _partitionMap,
        wither: Witherable_1.witherDefault(T, exports.Compactable),
        wilt: Witherable_1.wiltDefault(T, exports.Compactable)
    };
};
exports.getWitherable = getWitherable;
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionSemigroup = function (S) {
    var unionS = exports.union(S);
    return {
        concat: function (first, second) { return unionS(second)(first); }
    };
};
exports.getUnionSemigroup = getUnionSemigroup;
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionMonoid = function (S) { return ({
    concat: exports.getUnionSemigroup(S).concat,
    empty: {}
}); };
exports.getUnionMonoid = getUnionMonoid;
/**
 * @category instances
 * @since 2.11.0
 */
var getIntersectionSemigroup = function (S) {
    var intersectionS = exports.intersection(S);
    return {
        concat: function (first, second) { return intersectionS(second)(first); }
    };
};
exports.getIntersectionSemigroup = getIntersectionSemigroup;
/**
 * @category instances
 * @since 2.11.0
 */
var getDifferenceMagma = function () { return ({
    concat: function (first, second) { return exports.difference(second)(first); }
}); };
exports.getDifferenceMagma = getDifferenceMagma;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
// tslint:disable: deprecation
/**
 * Use `getFoldable` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: 
    /*#__PURE__*/
    _reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    _foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    _reduceRight(S.Ord)
};
/**
 * Use `getFoldableWithIndex` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
exports.FoldableWithIndex = {
    URI: exports.URI,
    reduce: 
    /*#__PURE__*/
    _reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    _foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    _reduceRight(S.Ord),
    reduceWithIndex: 
    /*#__PURE__*/
    _reduceWithIndex(S.Ord),
    foldMapWithIndex: 
    /*#__PURE__*/
    _foldMapWithIndex(S.Ord),
    reduceRightWithIndex: 
    /*#__PURE__*/
    _reduceRightWithIndex(S.Ord)
};
/**
 * Use `getTraversable` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
exports.Traversable = {
    URI: exports.URI,
    map: _map,
    reduce: 
    /*#__PURE__*/
    _reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    _foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    _reduceRight(S.Ord),
    traverse: 
    /*#__PURE__*/
    _traverse(S.Ord),
    sequence: sequence
};
/**
 * Use the `getTraversableWithIndex` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: 
    /*#__PURE__*/
    _reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    _foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    _reduceRight(S.Ord),
    reduceWithIndex: 
    /*#__PURE__*/
    _reduceWithIndex(S.Ord),
    foldMapWithIndex: 
    /*#__PURE__*/
    _foldMapWithIndex(S.Ord),
    reduceRightWithIndex: 
    /*#__PURE__*/
    _reduceRightWithIndex(S.Ord),
    traverse: 
    /*#__PURE__*/
    _traverse(S.Ord),
    sequence: sequence,
    traverseWithIndex: 
    /*#__PURE__*/
    _traverseWithIndex(S.Ord)
};
var _wither = 
/*#__PURE__*/
Witherable_1.witherDefault(exports.Traversable, exports.Compactable);
var _wilt = 
/*#__PURE__*/
Witherable_1.wiltDefault(exports.Traversable, exports.Compactable);
/**
 * Use `getWitherable` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
exports.Witherable = {
    URI: exports.URI,
    map: _map,
    reduce: 
    /*#__PURE__*/
    _reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    _foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    _reduceRight(S.Ord),
    traverse: 
    /*#__PURE__*/
    _traverse(S.Ord),
    sequence: sequence,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: _wither,
    wilt: _wilt
};
/**
 * Use a new `{}` instead.
 *
 * @since 2.0.0
 * @deprecated
 */
exports.empty = {};
/**
 * Use [`upsertAt`](#upsertat) instead.
 *
 * @since 2.0.0
 * @deprecated
 */
exports.insertAt = exports.upsertAt;
/**
 * Use [`has`](#has) instead.
 *
 * @since 2.0.0
 * @deprecated
 */
exports.hasOwnProperty = RR.hasOwnProperty;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.record = {
    URI: exports.URI,
    map: _map,
    reduce: 
    /*#__PURE__*/
    _reduce(S.Ord),
    foldMap: 
    /*#__PURE__*/
    _foldMap(S.Ord),
    reduceRight: 
    /*#__PURE__*/
    _reduceRight(S.Ord),
    traverse: 
    /*#__PURE__*/
    _traverse(S.Ord),
    sequence: sequence,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    mapWithIndex: _mapWithIndex,
    reduceWithIndex: 
    /*#__PURE__*/
    _reduceWithIndex(S.Ord),
    foldMapWithIndex: 
    /*#__PURE__*/
    _foldMapWithIndex(S.Ord),
    reduceRightWithIndex: 
    /*#__PURE__*/
    _reduceRightWithIndex(S.Ord),
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    traverseWithIndex: 
    /*#__PURE__*/
    _traverseWithIndex(S.Ord),
    wither: _wither,
    wilt: _wilt
};


/***/ }),

/***/ 6339:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.semigroupProduct = exports.semigroupSum = exports.semigroupString = exports.getFunctionSemigroup = exports.semigroupAny = exports.semigroupAll = exports.fold = exports.getIntercalateSemigroup = exports.getMeetSemigroup = exports.getJoinSemigroup = exports.getDualSemigroup = exports.getStructSemigroup = exports.getTupleSemigroup = exports.getFirstSemigroup = exports.getLastSemigroup = exports.getObjectSemigroup = exports.semigroupVoid = exports.concatAll = exports.last = exports.first = exports.intercalate = exports.tuple = exports.struct = exports.reverse = exports.constant = exports.max = exports.min = void 0;
/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly concat: (x: A, y: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * concat(x, concat(y, z)) = concat(concat(x, y), z)
 * ```
 *
 * A common example of a semigroup is the type `string` with the operation `+`.
 *
 * ```ts
 * import { Semigroup } from 'fp-ts/Semigroup'
 *
 * const semigroupString: Semigroup<string> = {
 *   concat: (x, y) => x + y
 * }
 *
 * const x = 'x'
 * const y = 'y'
 * const z = 'z'
 *
 * semigroupString.concat(x, y) // 'xy'
 *
 * semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'
 *
 * semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
 * ```
 *
 * *Adapted from https://typelevel.org/cats*
 *
 * @since 2.0.0
 */
var function_1 = __nccwpck_require__(6985);
var _ = __importStar(__nccwpck_require__(1840));
var M = __importStar(__nccwpck_require__(179));
var Or = __importStar(__nccwpck_require__(6685));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Get a semigroup where `concat` will return the minimum, based on the provided order.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.min(N.Ord)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 1)
 *
 * @category constructors
 * @since 2.10.0
 */
var min = function (O) { return ({
    concat: Or.min(O)
}); };
exports.min = min;
/**
 * Get a semigroup where `concat` will return the maximum, based on the provided order.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.max(N.Ord)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 2)
 *
 * @category constructors
 * @since 2.10.0
 */
var max = function (O) { return ({
    concat: Or.max(O)
}); };
exports.max = max;
/**
 * @category constructors
 * @since 2.10.0
 */
var constant = function (a) { return ({
    concat: function () { return a; }
}); };
exports.constant = constant;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(reverse(S.Semigroup).concat('a', 'b'), 'ba')
 *
 * @category combinators
 * @since 2.10.0
 */
exports.reverse = M.reverse;
/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const S = struct<Point>({
 *   x: N.SemigroupSum,
 *   y: N.SemigroupSum
 * })
 *
 * assert.deepStrictEqual(S.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category combinators
 * @since 2.10.0
 */
var struct = function (semigroups) { return ({
    concat: function (first, second) {
        var r = {};
        for (var k in semigroups) {
            if (_.has.call(semigroups, k)) {
                r[k] = semigroups[k].concat(first[k], second[k]);
            }
        }
        return r;
    }
}); };
exports.struct = struct;
/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Semigroup'
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = tuple(S.Semigroup, N.SemigroupSum)
 * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
 * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @category combinators
 * @since 2.10.0
 */
var tuple = function () {
    var semigroups = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        semigroups[_i] = arguments[_i];
    }
    return ({
        concat: function (first, second) { return semigroups.map(function (s, i) { return s.concat(first[i], second[i]); }); }
    });
};
exports.tuple = tuple;
/**
 * Between each pair of elements insert `middle`.
 *
 * @example
 * import { intercalate } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * const S1 = pipe(S.Semigroup, intercalate(' + '))
 *
 * assert.strictEqual(S1.concat('a', 'b'), 'a + b')
 *
 * @category combinators
 * @since 2.10.0
 */
var intercalate = function (middle) { return function (S) { return ({
    concat: function (x, y) { return S.concat(x, S.concat(middle, y)); }
}); }; };
exports.intercalate = intercalate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * Always return the first argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.first<number>().concat(1, 2), 1)
 *
 * @category instances
 * @since 2.10.0
 */
var first = function () { return ({ concat: function_1.identity }); };
exports.first = first;
/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.last<number>().concat(1, 2), 2)
 *
 * @category instances
 * @since 2.10.0
 */
var last = function () { return ({ concat: function (_, y) { return y; } }); };
exports.last = last;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * const sum = concatAll(N.SemigroupSum)(0)
 *
 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
 * assert.deepStrictEqual(sum([]), 0)
 *
 * @since 2.10.0
 */
exports.concatAll = M.concatAll;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `void` module instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupVoid = exports.constant(undefined);
/**
 * Use [`getAssignSemigroup`](./struct.ts.html#getAssignSemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var getObjectSemigroup = function () { return ({
    concat: function (first, second) { return Object.assign({}, first, second); }
}); };
exports.getObjectSemigroup = getObjectSemigroup;
/**
 * Use [`last`](#last) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.getLastSemigroup = exports.last;
/**
 * Use [`first`](#first) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.getFirstSemigroup = exports.first;
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getTupleSemigroup = exports.tuple;
/**
 * Use [`struct`](#struct) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getStructSemigroup = exports.struct;
/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getDualSemigroup = exports.reverse;
/**
 * Use [`max`](#max) instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
exports.getJoinSemigroup = exports.max;
/**
 * Use [`min`](#min) instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
exports.getMeetSemigroup = exports.min;
/**
 * Use [`intercalate`](#intercalate) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
exports.getIntercalateSemigroup = exports.intercalate;
function fold(S) {
    var concatAllS = exports.concatAll(S);
    return function (startWith, as) { return (as === undefined ? concatAllS(startWith) : concatAllS(startWith)(as)); };
}
exports.fold = fold;
/**
 * Use [`SemigroupAll`](./boolean.ts.html#SemigroupAll) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupAll = {
    concat: function (x, y) { return x && y; }
};
/**
 * Use [`SemigroupAny`](./boolean.ts.html#SemigroupAny) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupAny = {
    concat: function (x, y) { return x || y; }
};
/**
 * Use [`getSemigroup`](./function.ts.html#getSemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.getFunctionSemigroup = function_1.getSemigroup;
/**
 * Use [`Semigroup`](./string.ts.html#Semigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupString = {
    concat: function (x, y) { return x + y; }
};
/**
 * Use [`SemigroupSum`](./number.ts.html#SemigroupSum) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupSum = {
    concat: function (x, y) { return x + y; }
};
/**
 * Use [`SemigroupProduct`](./number.ts.html#SemigroupProduct) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupProduct = {
    concat: function (x, y) { return x * y; }
};


/***/ }),

/***/ 5877:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

/**
 * ```ts
 * interface Separated<E, A> {
 *    readonly left: E
 *    readonly right: A
 * }
 * ```
 *
 * Represents a result of separating a whole into two parts.
 *
 * @since 2.10.0
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.right = exports.left = exports.flap = exports.Functor = exports.Bifunctor = exports.URI = exports.bimap = exports.mapLeft = exports.map = exports.separated = void 0;
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.10.0
 */
var separated = function (left, right) { return ({ left: left, right: right }); };
exports.separated = separated;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var _map = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
var _mapLeft = function (fa, f) { return function_1.pipe(fa, exports.mapLeft(f)); };
var _bimap = function (fa, g, f) { return function_1.pipe(fa, exports.bimap(g, f)); };
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.10.0
 */
var map = function (f) { return function (fa) {
    return exports.separated(exports.left(fa), f(exports.right(fa)));
}; };
exports.map = map;
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.10.0
 */
var mapLeft = function (f) { return function (fa) {
    return exports.separated(f(exports.left(fa)), exports.right(fa));
}; };
exports.mapLeft = mapLeft;
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.10.0
 */
var bimap = function (f, g) { return function (fa) {
    return exports.separated(f(exports.left(fa)), g(exports.right(fa)));
}; };
exports.bimap = bimap;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
exports.URI = 'Separated';
/**
 * @category instances
 * @since 2.10.0
 */
exports.Bifunctor = {
    URI: exports.URI,
    mapLeft: _mapLeft,
    bimap: _bimap
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.flap = 
/*#__PURE__*/
Functor_1.flap(exports.Functor);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.10.0
 */
var left = function (s) { return s.left; };
exports.left = left;
/**
 * @since 2.10.0
 */
var right = function (s) { return s.right; };
exports.right = right;


/***/ }),

/***/ 4384:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filterE = exports.witherDefault = exports.wiltDefault = void 0;
var _ = __importStar(__nccwpck_require__(1840));
function wiltDefault(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.separate); };
    };
}
exports.wiltDefault = wiltDefault;
function witherDefault(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.compact); };
    };
}
exports.witherDefault = witherDefault;
function filterE(W) {
    return function (F) {
        var witherF = W.wither(F);
        return function (predicate) { return function (ga) { return witherF(ga, function (a) { return F.map(predicate(a), function (b) { return (b ? _.some(a) : _.none); }); }); }; };
    };
}
exports.filterE = filterE;


/***/ }),

/***/ 9734:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.guard = void 0;
function guard(F, P) {
    return function (b) { return (b ? P.of(undefined) : F.zero()); };
}
exports.guard = guard;


/***/ }),

/***/ 6985:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
var getBooleanAlgebra = function (B) { return function () { return ({
    meet: function (x, y) { return function (a) { return B.meet(x(a), y(a)); }; },
    join: function (x, y) { return function (a) { return B.join(x(a), y(a)); }; },
    zero: function () { return B.zero; },
    one: function () { return B.one; },
    implies: function (x, y) { return function (a) { return B.implies(x(a), y(a)); }; },
    not: function (x) { return function (a) { return B.not(x(a)); }; }
}); }; };
exports.getBooleanAlgebra = getBooleanAlgebra;
/**
 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
 *
 * @example
 * import { Predicate, getSemigroup } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const S1 = getSemigroup(B.SemigroupAll)<number>()
 *
 * assert.deepStrictEqual(S1.concat(f, g)(1), true)
 * assert.deepStrictEqual(S1.concat(f, g)(3), false)
 *
 * const S2 = getSemigroup(B.SemigroupAny)<number>()
 *
 * assert.deepStrictEqual(S2.concat(f, g)(1), true)
 * assert.deepStrictEqual(S2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function (S) { return function () { return ({
    concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
}); }; };
exports.getSemigroup = getSemigroup;
/**
 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/Predicate'
 * import { getMonoid } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const M1 = getMonoid(B.MonoidAll)<number>()
 *
 * assert.deepStrictEqual(M1.concat(f, g)(1), true)
 * assert.deepStrictEqual(M1.concat(f, g)(3), false)
 *
 * const M2 = getMonoid(B.MonoidAny)<number>()
 *
 * assert.deepStrictEqual(M2.concat(f, g)(1), true)
 * assert.deepStrictEqual(M2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
var getMonoid = function (M) {
    var getSemigroupM = exports.getSemigroup(M);
    return function () { return ({
        concat: getSemigroupM().concat,
        empty: function () { return M.empty; }
    }); };
};
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.10.0
 */
var getSemiring = function (S) { return ({
    add: function (f, g) { return function (x) { return S.add(f(x), g(x)); }; },
    zero: function () { return S.zero; },
    mul: function (f, g) { return function (x) { return S.mul(f(x), g(x)); }; },
    one: function () { return S.one; }
}); };
exports.getSemiring = getSemiring;
/**
 * @category instances
 * @since 2.10.0
 */
var getRing = function (R) {
    var S = exports.getSemiring(R);
    return {
        add: S.add,
        mul: S.mul,
        one: S.one,
        zero: S.zero,
        sub: function (f, g) { return function (x) { return R.sub(f(x), g(x)); }; }
    };
};
exports.getRing = getRing;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
var apply = function (a) { return function (f) { return f(a); }; };
exports.apply = apply;
/**
 * @since 2.0.0
 */
function identity(a) {
    return a;
}
exports.identity = identity;
/**
 * @since 2.0.0
 */
exports.unsafeCoerce = identity;
/**
 * @since 2.0.0
 */
function constant(a) {
    return function () { return a; };
}
exports.constant = constant;
/**
 * A thunk that returns always `true`.
 *
 * @since 2.0.0
 */
exports.constTrue = 
/*#__PURE__*/
constant(true);
/**
 * A thunk that returns always `false`.
 *
 * @since 2.0.0
 */
exports.constFalse = 
/*#__PURE__*/
constant(false);
/**
 * A thunk that returns always `null`.
 *
 * @since 2.0.0
 */
exports.constNull = 
/*#__PURE__*/
constant(null);
/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
exports.constUndefined = 
/*#__PURE__*/
constant(undefined);
/**
 * A thunk that returns always `void`.
 *
 * @since 2.0.0
 */
exports.constVoid = exports.constUndefined;
/**
 * Flips the order of the arguments of a function of two arguments.
 *
 * @since 2.0.0
 */
function flip(f) {
    return function (b, a) { return f(a, b); };
}
exports.flip = flip;
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
    return;
}
exports.flow = flow;
/**
 * @since 2.0.0
 */
function tuple() {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
}
exports.tuple = tuple;
/**
 * @since 2.0.0
 */
function increment(n) {
    return n + 1;
}
exports.increment = increment;
/**
 * @since 2.0.0
 */
function decrement(n) {
    return n - 1;
}
exports.decrement = decrement;
/**
 * @since 2.0.0
 */
function absurd(_) {
    throw new Error('Called `absurd` function which should be uncallable');
}
exports.absurd = absurd;
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * import { tupled } from 'fp-ts/function'
 *
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 *
 * @since 2.4.0
 */
function tupled(f) {
    return function (a) { return f.apply(void 0, a); };
}
exports.tupled = tupled;
/**
 * Inverse function of `tupled`
 *
 * @since 2.4.0
 */
function untupled(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return f(a);
    };
}
exports.untupled = untupled;
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        default:
            var ret = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                ret = arguments[i](ret);
            }
            return ret;
    }
}
exports.pipe = pipe;
/**
 * Type hole simulation
 *
 * @since 2.7.0
 */
exports.hole = absurd;
/**
 * @since 2.11.0
 */
var SK = function (_, b) { return b; };
exports.SK = SK;
/**
 * Use `Predicate` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
function not(predicate) {
    return function (a) { return !predicate(a); };
}
exports.not = not;
/**
 * Use `Endomorphism` module instead.
 *
 * @category instances
 * @since 2.10.0
 * @deprecated
 */
var getEndomorphismMonoid = function () { return ({
    concat: function (first, second) { return flow(first, second); },
    empty: identity
}); };
exports.getEndomorphismMonoid = getEndomorphismMonoid;


/***/ }),

/***/ 1840:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromReadonlyNonEmptyArray = exports.has = exports.emptyRecord = exports.emptyReadonlyArray = exports.tail = exports.head = exports.isNonEmpty = exports.singleton = exports.right = exports.left = exports.isRight = exports.isLeft = exports.some = exports.none = exports.isSome = exports.isNone = void 0;
// -------------------------------------------------------------------------------------
// Option
// -------------------------------------------------------------------------------------
/** @internal */
var isNone = function (fa) { return fa._tag === 'None'; };
exports.isNone = isNone;
/** @internal */
var isSome = function (fa) { return fa._tag === 'Some'; };
exports.isSome = isSome;
/** @internal */
exports.none = { _tag: 'None' };
/** @internal */
var some = function (a) { return ({ _tag: 'Some', value: a }); };
exports.some = some;
// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------
/** @internal */
var isLeft = function (ma) { return ma._tag === 'Left'; };
exports.isLeft = isLeft;
/** @internal */
var isRight = function (ma) { return ma._tag === 'Right'; };
exports.isRight = isRight;
/** @internal */
var left = function (e) { return ({ _tag: 'Left', left: e }); };
exports.left = left;
/** @internal */
var right = function (a) { return ({ _tag: 'Right', right: a }); };
exports.right = right;
// -------------------------------------------------------------------------------------
// ReadonlyNonEmptyArray
// -------------------------------------------------------------------------------------
/** @internal */
var singleton = function (a) { return [a]; };
exports.singleton = singleton;
/** @internal */
var isNonEmpty = function (as) { return as.length > 0; };
exports.isNonEmpty = isNonEmpty;
/** @internal */
var head = function (as) { return as[0]; };
exports.head = head;
/** @internal */
var tail = function (as) { return as.slice(1); };
exports.tail = tail;
// -------------------------------------------------------------------------------------
// empty
// -------------------------------------------------------------------------------------
/** @internal */
exports.emptyReadonlyArray = [];
/** @internal */
exports.emptyRecord = {};
// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------
/** @internal */
exports.has = Object.prototype.hasOwnProperty;
// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------
/** @internal */
var fromReadonlyNonEmptyArray = function (as) { return __spreadArray([as[0]], as.slice(1)); };
exports.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;


/***/ }),

/***/ 52:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Field = exports.MonoidProduct = exports.MonoidSum = exports.SemigroupProduct = exports.SemigroupSum = exports.MagmaSub = exports.Show = exports.Bounded = exports.Ord = exports.Eq = exports.isNumber = void 0;
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * @category refinements
 * @since 2.11.0
 */
var isNumber = function (u) { return typeof u === 'number'; };
exports.isNumber = isNumber;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
exports.Eq = {
    equals: function (first, second) { return first === second; }
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Ord = {
    equals: exports.Eq.equals,
    compare: function (first, second) { return (first < second ? -1 : first > second ? 1 : 0); }
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Bounded = {
    equals: exports.Eq.equals,
    compare: exports.Ord.compare,
    top: Infinity,
    bottom: -Infinity
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Show = {
    show: function (n) { return JSON.stringify(n); }
};
/**
 * @category instances
 * @since 2.11.0
 */
exports.MagmaSub = {
    concat: function (first, second) { return first - second; }
};
/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(SemigroupSum.concat(2, 3), 5)
 *
 * @category instances
 * @since 2.10.0
 */
exports.SemigroupSum = {
    concat: function (first, second) { return first + second; }
};
/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupProduct } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(SemigroupProduct.concat(2, 3), 6)
 *
 * @category instances
 * @since 2.10.0
 */
exports.SemigroupProduct = {
    concat: function (first, second) { return first * second; }
};
/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import { MonoidSum } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(MonoidSum.concat(2, MonoidSum.empty), 2)
 *
 * @category instances
 * @since 2.10.0
 */
exports.MonoidSum = {
    concat: exports.SemigroupSum.concat,
    empty: 0
};
/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @example
 * import { MonoidProduct } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(MonoidProduct.concat(2, MonoidProduct.empty), 2)
 *
 * @category instances
 * @since 2.10.0
 */
exports.MonoidProduct = {
    concat: exports.SemigroupProduct.concat,
    empty: 1
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Field = {
    add: exports.SemigroupSum.concat,
    zero: 0,
    mul: exports.SemigroupProduct.concat,
    one: 1,
    sub: exports.MagmaSub.concat,
    degree: function (_) { return 1; },
    div: function (first, second) { return first / second; },
    mod: function (first, second) { return first % second; }
};


/***/ }),

/***/ 6837:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pipe = exports.pipeable = void 0;
var function_1 = __nccwpck_require__(6985);
var isFunctor = function (I) { return typeof I.map === 'function'; };
var isContravariant = function (I) { return typeof I.contramap === 'function'; };
var isFunctorWithIndex = function (I) { return typeof I.mapWithIndex === 'function'; };
var isApply = function (I) { return typeof I.ap === 'function'; };
var isChain = function (I) { return typeof I.chain === 'function'; };
var isBifunctor = function (I) { return typeof I.bimap === 'function'; };
var isExtend = function (I) { return typeof I.extend === 'function'; };
var isFoldable = function (I) { return typeof I.reduce === 'function'; };
var isFoldableWithIndex = function (I) { return typeof I.reduceWithIndex === 'function'; };
var isAlt = function (I) { return typeof I.alt === 'function'; };
var isCompactable = function (I) { return typeof I.compact === 'function'; };
var isFilterable = function (I) { return typeof I.filter === 'function'; };
var isFilterableWithIndex = function (I) {
    return typeof I.filterWithIndex === 'function';
};
var isProfunctor = function (I) { return typeof I.promap === 'function'; };
var isSemigroupoid = function (I) { return typeof I.compose === 'function'; };
var isMonadThrow = function (I) { return typeof I.throwError === 'function'; };
/** @deprecated */
function pipeable(I) {
    var r = {};
    if (isFunctor(I)) {
        var map = function (f) { return function (fa) { return I.map(fa, f); }; };
        r.map = map;
    }
    if (isContravariant(I)) {
        var contramap = function (f) { return function (fa) { return I.contramap(fa, f); }; };
        r.contramap = contramap;
    }
    if (isFunctorWithIndex(I)) {
        var mapWithIndex = function (f) { return function (fa) { return I.mapWithIndex(fa, f); }; };
        r.mapWithIndex = mapWithIndex;
    }
    if (isApply(I)) {
        var ap = function (fa) { return function (fab) { return I.ap(fab, fa); }; };
        var apFirst = function (fb) { return function (fa) {
            return I.ap(I.map(fa, function (a) { return function () { return a; }; }), fb);
        }; };
        r.ap = ap;
        r.apFirst = apFirst;
        r.apSecond = function (fb) { return function (fa) {
            return I.ap(I.map(fa, function () { return function (b) { return b; }; }), fb);
        }; };
    }
    if (isChain(I)) {
        var chain = function (f) { return function (ma) { return I.chain(ma, f); }; };
        var chainFirst = function (f) { return function (ma) { return I.chain(ma, function (a) { return I.map(f(a), function () { return a; }); }); }; };
        var flatten = function (mma) { return I.chain(mma, function_1.identity); };
        r.chain = chain;
        r.chainFirst = chainFirst;
        r.flatten = flatten;
    }
    if (isBifunctor(I)) {
        var bimap = function (f, g) { return function (fa) { return I.bimap(fa, f, g); }; };
        var mapLeft = function (f) { return function (fa) { return I.mapLeft(fa, f); }; };
        r.bimap = bimap;
        r.mapLeft = mapLeft;
    }
    if (isExtend(I)) {
        var extend = function (f) { return function (wa) { return I.extend(wa, f); }; };
        var duplicate = function (wa) { return I.extend(wa, function_1.identity); };
        r.extend = extend;
        r.duplicate = duplicate;
    }
    if (isFoldable(I)) {
        var reduce = function (b, f) { return function (fa) { return I.reduce(fa, b, f); }; };
        var foldMap = function (M) {
            var foldMapM = I.foldMap(M);
            return function (f) { return function (fa) { return foldMapM(fa, f); }; };
        };
        var reduceRight = function (b, f) { return function (fa) { return I.reduceRight(fa, b, f); }; };
        r.reduce = reduce;
        r.foldMap = foldMap;
        r.reduceRight = reduceRight;
    }
    if (isFoldableWithIndex(I)) {
        var reduceWithIndex = function (b, f) { return function (fa) {
            return I.reduceWithIndex(fa, b, f);
        }; };
        var foldMapWithIndex = function (M) {
            var foldMapM = I.foldMapWithIndex(M);
            return function (f) { return function (fa) { return foldMapM(fa, f); }; };
        };
        var reduceRightWithIndex = function (b, f) { return function (fa) {
            return I.reduceRightWithIndex(fa, b, f);
        }; };
        r.reduceWithIndex = reduceWithIndex;
        r.foldMapWithIndex = foldMapWithIndex;
        r.reduceRightWithIndex = reduceRightWithIndex;
    }
    if (isAlt(I)) {
        var alt = function (that) { return function (fa) { return I.alt(fa, that); }; };
        r.alt = alt;
    }
    if (isCompactable(I)) {
        r.compact = I.compact;
        r.separate = I.separate;
    }
    if (isFilterable(I)) {
        var filter = function (predicate) { return function (fa) {
            return I.filter(fa, predicate);
        }; };
        var filterMap = function (f) { return function (fa) { return I.filterMap(fa, f); }; };
        var partition = function (predicate) { return function (fa) {
            return I.partition(fa, predicate);
        }; };
        var partitionMap = function (f) { return function (fa) { return I.partitionMap(fa, f); }; };
        r.filter = filter;
        r.filterMap = filterMap;
        r.partition = partition;
        r.partitionMap = partitionMap;
    }
    if (isFilterableWithIndex(I)) {
        var filterWithIndex = function (predicateWithIndex) { return function (fa) { return I.filterWithIndex(fa, predicateWithIndex); }; };
        var filterMapWithIndex = function (f) { return function (fa) {
            return I.filterMapWithIndex(fa, f);
        }; };
        var partitionWithIndex = function (predicateWithIndex) { return function (fa) { return I.partitionWithIndex(fa, predicateWithIndex); }; };
        var partitionMapWithIndex = function (f) { return function (fa) {
            return I.partitionMapWithIndex(fa, f);
        }; };
        r.filterWithIndex = filterWithIndex;
        r.filterMapWithIndex = filterMapWithIndex;
        r.partitionWithIndex = partitionWithIndex;
        r.partitionMapWithIndex = partitionMapWithIndex;
    }
    if (isProfunctor(I)) {
        var promap = function (f, g) { return function (fa) { return I.promap(fa, f, g); }; };
        r.promap = promap;
    }
    if (isSemigroupoid(I)) {
        var compose = function (that) { return function (fa) { return I.compose(fa, that); }; };
        r.compose = compose;
    }
    if (isMonadThrow(I)) {
        var fromOption = function (onNone) { return function (ma) {
            return ma._tag === 'None' ? I.throwError(onNone()) : I.of(ma.value);
        }; };
        var fromEither = function (ma) {
            return ma._tag === 'Left' ? I.throwError(ma.left) : I.of(ma.right);
        };
        var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? I.of(a) : I.throwError(onFalse(a))); }; };
        var filterOrElse = function (predicate, onFalse) { return function (ma) { return I.chain(ma, function (a) { return (predicate(a) ? I.of(a) : I.throwError(onFalse(a))); }); }; };
        r.fromOption = fromOption;
        r.fromEither = fromEither;
        r.fromPredicate = fromPredicate;
        r.filterOrElse = filterOrElse;
    }
    return r;
}
exports.pipeable = pipeable;
/**
 * Use [`pipe`](https://gcanti.github.io/fp-ts/modules/function.ts.html#flow) from `function` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
exports.pipe = function_1.pipe;


/***/ }),

/***/ 5189:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endsWith = exports.startsWith = exports.includes = exports.split = exports.size = exports.isEmpty = exports.empty = exports.slice = exports.trimRight = exports.trimLeft = exports.trim = exports.replace = exports.toLowerCase = exports.toUpperCase = exports.isString = exports.Show = exports.Ord = exports.Monoid = exports.Semigroup = exports.Eq = void 0;
var ReadonlyNonEmptyArray_1 = __nccwpck_require__(8630);
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Eq.equals('a', 'a'), true)
 * assert.deepStrictEqual(S.Eq.equals('a', 'b'), false)
 *
 * @category instances
 * @since 2.10.0
 */
exports.Eq = {
    equals: function (first, second) { return first === second; }
};
/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Semigroup.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.10.0
 */
exports.Semigroup = {
    concat: function (first, second) { return first + second; }
};
/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Monoid.concat('a', 'b'), 'ab')
 * assert.deepStrictEqual(S.Monoid.concat('a', S.Monoid.empty), 'a')
 *
 * @category instances
 * @since 2.10.0
 */
exports.Monoid = {
    concat: exports.Semigroup.concat,
    empty: ''
};
/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Ord.compare('a', 'a'), 0)
 * assert.deepStrictEqual(S.Ord.compare('a', 'b'), -1)
 * assert.deepStrictEqual(S.Ord.compare('b', 'a'), 1)
 *
 * @category instances
 * @since 2.10.0
 */
exports.Ord = {
    equals: exports.Eq.equals,
    compare: function (first, second) { return (first < second ? -1 : first > second ? 1 : 0); }
};
/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Show.show('a'), '"a"')
 *
 * @category instances
 * @since 2.10.0
 */
exports.Show = {
    show: function (s) { return JSON.stringify(s); }
};
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.isString('a'), true)
 * assert.deepStrictEqual(S.isString(1), false)
 *
 * @category refinements
 * @since 2.11.0
 */
var isString = function (u) { return typeof u === 'string'; };
exports.isString = isString;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
 *
 * @category combinators
 * @since 2.11.0
 */
var toUpperCase = function (s) { return s.toUpperCase(); };
exports.toUpperCase = toUpperCase;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
 *
 * @category combinators
 * @since 2.11.0
 */
var toLowerCase = function (s) { return s.toLowerCase(); };
exports.toLowerCase = toLowerCase;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
 *
 * @category combinators
 * @since 2.11.0
 */
var replace = function (searchValue, replaceValue) { return function (s) {
    return s.replace(searchValue, replaceValue);
}; };
exports.replace = replace;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trim), 'a')
 *
 * @category combinators
 * @since 2.11.0
 */
var trim = function (s) { return s.trim(); };
exports.trim = trim;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trimLeft), 'a ')
 *
 * @category combinators
 * @since 2.11.0
 */
var trimLeft = function (s) { return s.trimLeft(); };
exports.trimLeft = trimLeft;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trimRight), ' a')
 *
 * @category combinators
 * @since 2.11.0
 */
var trimRight = function (s) { return s.trimRight(); };
exports.trimRight = trimRight;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
 *
 * @category combinators
 * @since 2.11.0
 */
var slice = function (start, end) { return function (s) { return s.slice(start, end); }; };
exports.slice = slice;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * An empty `string`.
 *
 * @since 2.10.0
 */
exports.empty = '';
/**
 * Test whether a `string` is empty.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('', S.isEmpty), true)
 * assert.deepStrictEqual(pipe('a', S.isEmpty), false)
 *
 * @since 2.10.0
 */
var isEmpty = function (s) { return s.length === 0; };
exports.isEmpty = isEmpty;
/**
 * Calculate the number of characters in a `string`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.size), 3)
 *
 * @since 2.10.0
 */
var size = function (s) { return s.length; };
exports.size = size;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
 * assert.deepStrictEqual(pipe('', S.split('')), [''])
 *
 * @since 2.11.0
 */
var split = function (separator) { return function (s) {
    var out = s.split(separator);
    return ReadonlyNonEmptyArray_1.isNonEmpty(out) ? out : [s];
}; };
exports.split = split;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.includes('b')), true)
 * assert.deepStrictEqual(pipe('abc', S.includes('d')), false)
 *
 * @since 2.11.0
 */
var includes = function (searchString, position) { return function (s) {
    return s.includes(searchString, position);
}; };
exports.includes = includes;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.startsWith('a')), true)
 * assert.deepStrictEqual(pipe('bc', S.startsWith('a')), false)
 *
 * @since 2.11.0
 */
var startsWith = function (searchString, position) { return function (s) {
    return s.startsWith(searchString, position);
}; };
exports.startsWith = startsWith;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.endsWith('c')), true)
 * assert.deepStrictEqual(pipe('ab', S.endsWith('c')), false)
 *
 * @since 2.11.0
 */
var endsWith = function (searchString, position) { return function (s) {
    return s.endsWith(searchString, position);
}; };
exports.endsWith = endsWith;


/***/ }),

/***/ 51:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reporter = exports.formatValidationErrors = exports.formatValidationError = exports.TYPE_MAX_LEN = void 0;
/**
 * An [io-ts Reporter](https://gcanti.github.io/io-ts/modules/Reporter.ts.html#reporter-interface).
 *
 * @example
 *
 * import * as t from 'io-ts';
 * import Reporter from 'io-ts-reporters';
 *
 * const User = t.interface({ name: t.string });
 *
 * assert.deepEqual(
 *   Reporter.report(User.decode({ nam: 'Jane' })),
 *   ['Expecting string at name but instead got: undefined'],
 * )
 * assert.deepEqual( Reporter.report(User.decode({ name: 'Jane' })), [])
 *
 * @since 1.2.0
 */
var A = __nccwpck_require__(3834);
var E = __nccwpck_require__(7534);
var NEA = __nccwpck_require__(240);
var O = __nccwpck_require__(2569);
var R = __nccwpck_require__(2653);
var pipeable_1 = __nccwpck_require__(6837);
var t = __nccwpck_require__(5428);
var utils_1 = __nccwpck_require__(6753);
var isUnionType = function (_a) {
    var type = _a.type;
    return type instanceof t.UnionType;
};
var jsToString = function (value) {
    return value === undefined ? 'undefined' : JSON.stringify(value);
};
var keyPath = function (ctx) {
    // The context entry with an empty key is the original
    // type ("default context"), not a type error.
    return ctx
        .map(function (c) { return c.key; })
        .filter(Boolean)
        .join('.');
};
// The actual error is last in context
var getErrorFromCtx = function (validation) {
    // https://github.com/gcanti/fp-ts/pull/544/files
    return A.last(validation.context);
};
var getValidationContext = function (validation) {
    // https://github.com/gcanti/fp-ts/pull/544/files
    return validation.context;
};
/**
 * @category internals
 * @since 1.2.1
 */
exports.TYPE_MAX_LEN = 160; // Two lines of 80-col text
var truncateType = function (type, options) {
    if (options === void 0) { options = {}; }
    var _a = options.truncateLongTypes, truncateLongTypes = _a === void 0 ? true : _a;
    if (truncateLongTypes && type.length > exports.TYPE_MAX_LEN) {
        return type.slice(0, exports.TYPE_MAX_LEN - 3) + "...";
    }
    return type;
};
var errorMessageSimple = function (expectedType, path, error, options) {
    // https://github.com/elm-lang/core/blob/18c9e84e975ed22649888bfad15d1efdb0128ab2/src/Native/Json.js#L199
    return [
        "Expecting " + truncateType(expectedType, options),
        path === '' ? '' : "at " + path,
        "but instead got: " + jsToString(error.value),
        error.message ? "(" + error.message + ")" : ''
    ]
        .filter(Boolean)
        .join(' ');
};
var errorMessageUnion = function (expectedTypes, path, value, options) {
    // https://github.com/elm-lang/core/blob/18c9e84e975ed22649888bfad15d1efdb0128ab2/src/Native/Json.js#L199
    return [
        'Expecting one of:\n',
        expectedTypes.map(function (type) { return "    " + truncateType(type, options); }).join('\n'),
        path === '' ? '\n' : "\nat " + path + " ",
        "but instead got: " + jsToString(value)
    ]
        .filter(Boolean)
        .join('');
};
// Find the union type in the list of ContextEntry
// The next ContextEntry should be the type of this branch of the union
var findExpectedType = function (ctx) {
    return pipeable_1.pipe(ctx, A.findIndex(isUnionType), O.chain(function (n) { return A.lookup(n + 1, ctx); }));
};
var formatValidationErrorOfUnion = function (path, errors, options) {
    var expectedTypes = pipeable_1.pipe(errors, A.map(getValidationContext), A.map(findExpectedType), A.compact);
    var value = pipeable_1.pipe(expectedTypes, A.head, O.map(function (v) { return v.actual; }), O.getOrElse(function () { return undefined; }));
    var expected = expectedTypes.map(function (_a) {
        var type = _a.type;
        return type.name;
    });
    return expected.length > 0
        ? O.some(errorMessageUnion(expected, path, value, options))
        : O.none;
};
var formatValidationCommonError = function (path, error, options) {
    return pipeable_1.pipe(error, getErrorFromCtx, O.map(function (errorContext) {
        return errorMessageSimple(errorContext.type.name, path, error, options);
    }));
};
var groupByKey = NEA.groupBy(function (error) {
    return pipeable_1.pipe(error.context, utils_1.takeUntil(isUnionType), keyPath);
});
var format = function (path, errors, options) {
    return NEA.tail(errors).length > 0
        ? formatValidationErrorOfUnion(path, errors, options)
        : formatValidationCommonError(path, NEA.head(errors), options);
};
/**
 * Format a single validation error.
 *
 * @category formatters
 * @since 1.0.0
 */
exports.formatValidationError = function (error, options) { return formatValidationCommonError(keyPath(error.context), error, options); };
/**
 * Format validation errors (`t.Errors`).
 *
 * @example
 * import * as E from 'fp-ts/lib/Either'
 * import * as t from 'io-ts'
 * import { formatValidationErrors } from 'io-ts-reporters'
 *
 * const result = t.string.decode(123)
 *
 * assert.deepEqual(
 *   E.mapLeft(formatValidationErrors)(result),
 *   E.left(['Expecting string but instead got: 123'])
 * )
 *
 * @category formatters
 * @since 1.2.0
 */
exports.formatValidationErrors = function (errors, options) {
    return pipeable_1.pipe(errors, groupByKey, R.mapWithIndex(function (path, errors) { return format(path, errors, options); }), R.compact, R.toArray, A.map(function (_a) {
        var _key = _a[0], error = _a[1];
        return error;
    }));
};
/**
 * Deprecated, use the default export instead.
 *
 * @category deprecated
 * @deprecated
 * @since 1.0.0
 */
exports.reporter = function (validation, options) {
    return pipeable_1.pipe(validation, E.mapLeft(function (errors) { return exports.formatValidationErrors(errors, options); }), E.fold(function (errors) { return errors; }, function () { return []; }));
};
var prettyReporter = { report: exports.reporter };
exports.default = prettyReporter;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6753:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.takeUntil = void 0;
/**
 * @since 1.1.0
 */
/* eslint-disable @typescript-eslint/array-type */
exports.takeUntil = function (predicate) { return function (as) {
    var init = [];
    // eslint-disable-next-line unicorn/no-for-loop
    for (var i = 0; i < as.length; i++) {
        init[i] = as[i];
        if (predicate(as[i])) {
            return init;
        }
    }
    return init;
}; };
/* eslint-enable @typescript-eslint/array-type */
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 5428:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.partial = exports.PartialType = exports.type = exports.InterfaceType = exports.array = exports.ArrayType = exports.recursion = exports.RecursiveType = exports.Int = exports.brand = exports.RefinementType = exports.keyof = exports.KeyofType = exports.literal = exports.LiteralType = exports.void = exports.undefined = exports.null = exports.UnknownRecord = exports.AnyDictionaryType = exports.UnknownArray = exports.AnyArrayType = exports.boolean = exports.BooleanType = exports.bigint = exports.BigIntType = exports.number = exports.NumberType = exports.string = exports.StringType = exports.unknown = exports.UnknownType = exports.voidType = exports.VoidType = exports.UndefinedType = exports.nullType = exports.NullType = exports.getIndex = exports.getTags = exports.emptyTags = exports.mergeAll = exports.getDomainKeys = exports.appendContext = exports.getContextEntry = exports.getFunctionName = exports.identity = exports.Type = exports.success = exports.failure = exports.failures = void 0;
exports.alias = exports.clean = exports.StrictType = exports.dictionary = exports.Integer = exports.refinement = exports.object = exports.ObjectType = exports.Dictionary = exports.any = exports.AnyType = exports.never = exports.NeverType = exports.getDefaultContext = exports.getValidationError = exports.interface = exports.Array = exports.taggedUnion = exports.TaggedUnionType = exports.Function = exports.FunctionType = exports.exact = exports.ExactType = exports.strict = exports.readonlyArray = exports.ReadonlyArrayType = exports.readonly = exports.ReadonlyType = exports.tuple = exports.TupleType = exports.intersection = exports.IntersectionType = exports.union = exports.UnionType = exports.record = exports.DictionaryType = void 0;
/**
 * @since 1.0.0
 */
var Either_1 = __nccwpck_require__(7534);
/**
 * @category Decode error
 * @since 1.0.0
 */
exports.failures = Either_1.left;
/**
 * @category Decode error
 * @since 1.0.0
 */
var failure = function (value, context, message) {
    return exports.failures([{ value: value, context: context, message: message }]);
};
exports.failure = failure;
/**
 * @category Decode error
 * @since 1.0.0
 */
exports.success = Either_1.right;
/**
 * @category Codec
 * @since 1.0.0
 */
var Type = /** @class */ (function () {
    function Type(
    /** a unique name for this codec */
    name, 
    /** a custom type guard */
    is, 
    /** succeeds if a value of type I can be decoded to a value of type A */
    validate, 
    /** converts a value of type A to a value of type O */
    encode) {
        this.name = name;
        this.is = is;
        this.validate = validate;
        this.encode = encode;
        this.decode = this.decode.bind(this);
    }
    /**
     * @since 1.0.0
     */
    Type.prototype.pipe = function (ab, name) {
        var _this = this;
        if (name === void 0) { name = "pipe(" + this.name + ", " + ab.name + ")"; }
        return new Type(name, ab.is, function (i, c) {
            var e = _this.validate(i, c);
            if (Either_1.isLeft(e)) {
                return e;
            }
            return ab.validate(e.right, c);
        }, this.encode === exports.identity && ab.encode === exports.identity ? exports.identity : function (b) { return _this.encode(ab.encode(b)); });
    };
    /**
     * @since 1.0.0
     */
    Type.prototype.asDecoder = function () {
        return this;
    };
    /**
     * @since 1.0.0
     */
    Type.prototype.asEncoder = function () {
        return this;
    };
    /**
     * a version of `validate` with a default context
     * @since 1.0.0
     */
    Type.prototype.decode = function (i) {
        return this.validate(i, [{ key: '', type: this, actual: i }]);
    };
    return Type;
}());
exports.Type = Type;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 1.0.0
 */
var identity = function (a) { return a; };
exports.identity = identity;
/**
 * @since 1.0.0
 */
function getFunctionName(f) {
    return f.displayName || f.name || "<function" + f.length + ">";
}
exports.getFunctionName = getFunctionName;
/**
 * @since 1.0.0
 */
function getContextEntry(key, decoder) {
    return { key: key, type: decoder };
}
exports.getContextEntry = getContextEntry;
/**
 * @since 1.0.0
 */
function appendContext(c, key, decoder, actual) {
    var len = c.length;
    var r = Array(len + 1);
    for (var i = 0; i < len; i++) {
        r[i] = c[i];
    }
    r[len] = { key: key, type: decoder, actual: actual };
    return r;
}
exports.appendContext = appendContext;
function pushAll(xs, ys) {
    var l = ys.length;
    for (var i = 0; i < l; i++) {
        xs.push(ys[i]);
    }
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function getNameFromProps(props) {
    return Object.keys(props)
        .map(function (k) { return k + ": " + props[k].name; })
        .join(', ');
}
function useIdentity(codecs) {
    for (var i = 0; i < codecs.length; i++) {
        if (codecs[i].encode !== exports.identity) {
            return false;
        }
    }
    return true;
}
function getInterfaceTypeName(props) {
    return "{ " + getNameFromProps(props) + " }";
}
function getPartialTypeName(inner) {
    return "Partial<" + inner + ">";
}
function enumerableRecord(keys, domain, codomain, name) {
    if (name === void 0) { name = "{ [K in " + domain.name + "]: " + codomain.name + " }"; }
    var len = keys.length;
    return new DictionaryType(name, function (u) { return exports.UnknownRecord.is(u) && keys.every(function (k) { return codomain.is(u[k]); }); }, function (u, c) {
        var e = exports.UnknownRecord.validate(u, c);
        if (Either_1.isLeft(e)) {
            return e;
        }
        var o = e.right;
        var a = {};
        var errors = [];
        var changed = false;
        for (var i = 0; i < len; i++) {
            var k = keys[i];
            var ok = o[k];
            var codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
            if (Either_1.isLeft(codomainResult)) {
                pushAll(errors, codomainResult.left);
            }
            else {
                var vok = codomainResult.right;
                changed = changed || vok !== ok;
                a[k] = vok;
            }
        }
        return errors.length > 0 ? exports.failures(errors) : exports.success((changed || Object.keys(o).length !== len ? a : o));
    }, codomain.encode === exports.identity
        ? exports.identity
        : function (a) {
            var s = {};
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                s[k] = codomain.encode(a[k]);
            }
            return s;
        }, domain, codomain);
}
/**
 * @internal
 */
function getDomainKeys(domain) {
    var _a;
    if (isLiteralC(domain)) {
        var literal_1 = domain.value;
        if (exports.string.is(literal_1)) {
            return _a = {}, _a[literal_1] = null, _a;
        }
    }
    else if (isKeyofC(domain)) {
        return domain.keys;
    }
    else if (isUnionC(domain)) {
        var keys = domain.types.map(function (type) { return getDomainKeys(type); });
        return keys.some(undefinedType.is) ? undefined : Object.assign.apply(Object, __spreadArrays([{}], keys));
    }
    return undefined;
}
exports.getDomainKeys = getDomainKeys;
function nonEnumerableRecord(domain, codomain, name) {
    if (name === void 0) { name = "{ [K in " + domain.name + "]: " + codomain.name + " }"; }
    return new DictionaryType(name, function (u) {
        if (exports.UnknownRecord.is(u)) {
            return Object.keys(u).every(function (k) { return domain.is(k) && codomain.is(u[k]); });
        }
        return isAnyC(codomain) && Array.isArray(u);
    }, function (u, c) {
        if (exports.UnknownRecord.is(u)) {
            var a = {};
            var errors = [];
            var keys = Object.keys(u);
            var len = keys.length;
            var changed = false;
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                var ok = u[k];
                var domainResult = domain.validate(k, appendContext(c, k, domain, k));
                if (Either_1.isLeft(domainResult)) {
                    pushAll(errors, domainResult.left);
                }
                else {
                    var vk = domainResult.right;
                    changed = changed || vk !== k;
                    k = vk;
                    var codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
                    if (Either_1.isLeft(codomainResult)) {
                        pushAll(errors, codomainResult.left);
                    }
                    else {
                        var vok = codomainResult.right;
                        changed = changed || vok !== ok;
                        a[k] = vok;
                    }
                }
            }
            return errors.length > 0 ? exports.failures(errors) : exports.success((changed ? a : u));
        }
        if (isAnyC(codomain) && Array.isArray(u)) {
            return exports.success(u);
        }
        return exports.failure(u, c);
    }, domain.encode === exports.identity && codomain.encode === exports.identity
        ? exports.identity
        : function (a) {
            var s = {};
            var keys = Object.keys(a);
            var len = keys.length;
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                s[String(domain.encode(k))] = codomain.encode(a[k]);
            }
            return s;
        }, domain, codomain);
}
function getUnionName(codecs) {
    return '(' + codecs.map(function (type) { return type.name; }).join(' | ') + ')';
}
/**
 * @internal
 */
function mergeAll(base, us) {
    var equal = true;
    var primitive = true;
    var baseIsNotADictionary = !exports.UnknownRecord.is(base);
    for (var _i = 0, us_1 = us; _i < us_1.length; _i++) {
        var u = us_1[_i];
        if (u !== base) {
            equal = false;
        }
        if (exports.UnknownRecord.is(u)) {
            primitive = false;
        }
    }
    if (equal) {
        return base;
    }
    else if (primitive) {
        return us[us.length - 1];
    }
    var r = {};
    for (var _a = 0, us_2 = us; _a < us_2.length; _a++) {
        var u = us_2[_a];
        for (var k in u) {
            if (!r.hasOwnProperty(k) || baseIsNotADictionary || u[k] !== base[k]) {
                r[k] = u[k];
            }
        }
    }
    return r;
}
exports.mergeAll = mergeAll;
function getProps(codec) {
    switch (codec._tag) {
        case 'RefinementType':
        case 'ReadonlyType':
            return getProps(codec.type);
        case 'InterfaceType':
        case 'StrictType':
        case 'PartialType':
            return codec.props;
        case 'IntersectionType':
            return codec.types.reduce(function (props, type) { return Object.assign(props, getProps(type)); }, {});
    }
}
function stripKeys(o, props) {
    var keys = Object.getOwnPropertyNames(o);
    var shouldStrip = false;
    var r = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!hasOwnProperty.call(props, key)) {
            shouldStrip = true;
        }
        else {
            r[key] = o[key];
        }
    }
    return shouldStrip ? r : o;
}
function getExactTypeName(codec) {
    if (isTypeC(codec)) {
        return "{| " + getNameFromProps(codec.props) + " |}";
    }
    else if (isPartialC(codec)) {
        return getPartialTypeName("{| " + getNameFromProps(codec.props) + " |}");
    }
    return "Exact<" + codec.name + ">";
}
function isNonEmpty(as) {
    return as.length > 0;
}
/**
 * @internal
 */
exports.emptyTags = {};
function intersect(a, b) {
    var r = [];
    for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
        var v = a_1[_i];
        if (b.indexOf(v) !== -1) {
            r.push(v);
        }
    }
    return r;
}
function mergeTags(a, b) {
    if (a === exports.emptyTags) {
        return b;
    }
    if (b === exports.emptyTags) {
        return a;
    }
    var r = Object.assign({}, a);
    for (var k in b) {
        if (a.hasOwnProperty(k)) {
            var intersection_1 = intersect(a[k], b[k]);
            if (isNonEmpty(intersection_1)) {
                r[k] = intersection_1;
            }
            else {
                r = exports.emptyTags;
                break;
            }
        }
        else {
            r[k] = b[k];
        }
    }
    return r;
}
function intersectTags(a, b) {
    if (a === exports.emptyTags || b === exports.emptyTags) {
        return exports.emptyTags;
    }
    var r = exports.emptyTags;
    for (var k in a) {
        if (b.hasOwnProperty(k)) {
            var intersection_2 = intersect(a[k], b[k]);
            if (intersection_2.length === 0) {
                if (r === exports.emptyTags) {
                    r = {};
                }
                r[k] = a[k].concat(b[k]);
            }
        }
    }
    return r;
}
// tslint:disable-next-line: deprecation
function isAnyC(codec) {
    return codec._tag === 'AnyType';
}
function isLiteralC(codec) {
    return codec._tag === 'LiteralType';
}
function isKeyofC(codec) {
    return codec._tag === 'KeyofType';
}
function isTypeC(codec) {
    return codec._tag === 'InterfaceType';
}
function isPartialC(codec) {
    return codec._tag === 'PartialType';
}
// tslint:disable-next-line: deprecation
function isStrictC(codec) {
    return codec._tag === 'StrictType';
}
function isExactC(codec) {
    return codec._tag === 'ExactType';
}
// tslint:disable-next-line: deprecation
function isRefinementC(codec) {
    return codec._tag === 'RefinementType';
}
function isIntersectionC(codec) {
    return codec._tag === 'IntersectionType';
}
function isUnionC(codec) {
    return codec._tag === 'UnionType';
}
function isRecursiveC(codec) {
    return codec._tag === 'RecursiveType';
}
var lazyCodecs = [];
/**
 * @internal
 */
function getTags(codec) {
    if (lazyCodecs.indexOf(codec) !== -1) {
        return exports.emptyTags;
    }
    if (isTypeC(codec) || isStrictC(codec)) {
        var index = exports.emptyTags;
        // tslint:disable-next-line: forin
        for (var k in codec.props) {
            var prop = codec.props[k];
            if (isLiteralC(prop)) {
                if (index === exports.emptyTags) {
                    index = {};
                }
                index[k] = [prop.value];
            }
        }
        return index;
    }
    else if (isExactC(codec) || isRefinementC(codec)) {
        return getTags(codec.type);
    }
    else if (isIntersectionC(codec)) {
        return codec.types.reduce(function (tags, codec) { return mergeTags(tags, getTags(codec)); }, exports.emptyTags);
    }
    else if (isUnionC(codec)) {
        return codec.types.slice(1).reduce(function (tags, codec) { return intersectTags(tags, getTags(codec)); }, getTags(codec.types[0]));
    }
    else if (isRecursiveC(codec)) {
        lazyCodecs.push(codec);
        var tags = getTags(codec.type);
        lazyCodecs.pop();
        return tags;
    }
    return exports.emptyTags;
}
exports.getTags = getTags;
/**
 * @internal
 */
function getIndex(codecs) {
    var tags = getTags(codecs[0]);
    var keys = Object.keys(tags);
    var len = codecs.length;
    var _loop_1 = function (k) {
        var all = tags[k].slice();
        var index = [tags[k]];
        for (var i = 1; i < len; i++) {
            var codec = codecs[i];
            var ctags = getTags(codec);
            var values = ctags[k];
            // tslint:disable-next-line: strict-type-predicates
            if (values === undefined) {
                return "continue-keys";
            }
            else {
                if (values.some(function (v) { return all.indexOf(v) !== -1; })) {
                    return "continue-keys";
                }
                else {
                    all.push.apply(all, values);
                    index.push(values);
                }
            }
        }
        return { value: [k, index] };
    };
    keys: for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var k = keys_1[_i];
        var state_1 = _loop_1(k);
        if (typeof state_1 === "object")
            return state_1.value;
        switch (state_1) {
            case "continue-keys": continue keys;
        }
    }
    return undefined;
}
exports.getIndex = getIndex;
// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------
/**
 * @since 1.0.0
 */
var NullType = /** @class */ (function (_super) {
    __extends(NullType, _super);
    function NullType() {
        var _this = _super.call(this, 'null', function (u) { return u === null; }, function (u, c) { return (_this.is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'NullType';
        return _this;
    }
    return NullType;
}(Type));
exports.NullType = NullType;
/**
 * @category primitives
 * @since 1.0.0
 */
exports.nullType = new NullType();
exports.null = exports.nullType;
/**
 * @since 1.0.0
 */
var UndefinedType = /** @class */ (function (_super) {
    __extends(UndefinedType, _super);
    function UndefinedType() {
        var _this = _super.call(this, 'undefined', function (u) { return u === void 0; }, function (u, c) { return (_this.is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'UndefinedType';
        return _this;
    }
    return UndefinedType;
}(Type));
exports.UndefinedType = UndefinedType;
var undefinedType = new UndefinedType();
exports.undefined = undefinedType;
/**
 * @since 1.2.0
 */
var VoidType = /** @class */ (function (_super) {
    __extends(VoidType, _super);
    function VoidType() {
        var _this = _super.call(this, 'void', undefinedType.is, undefinedType.validate, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'VoidType';
        return _this;
    }
    return VoidType;
}(Type));
exports.VoidType = VoidType;
/**
 * @category primitives
 * @since 1.2.0
 */
exports.voidType = new VoidType();
exports.void = exports.voidType;
/**
 * @since 1.5.0
 */
var UnknownType = /** @class */ (function (_super) {
    __extends(UnknownType, _super);
    function UnknownType() {
        var _this = _super.call(this, 'unknown', function (_) { return true; }, exports.success, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'UnknownType';
        return _this;
    }
    return UnknownType;
}(Type));
exports.UnknownType = UnknownType;
/**
 * @category primitives
 * @since 1.5.0
 */
exports.unknown = new UnknownType();
/**
 * @since 1.0.0
 */
var StringType = /** @class */ (function (_super) {
    __extends(StringType, _super);
    function StringType() {
        var _this = _super.call(this, 'string', function (u) { return typeof u === 'string'; }, function (u, c) { return (_this.is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'StringType';
        return _this;
    }
    return StringType;
}(Type));
exports.StringType = StringType;
/**
 * @category primitives
 * @since 1.0.0
 */
exports.string = new StringType();
/**
 * @since 1.0.0
 */
var NumberType = /** @class */ (function (_super) {
    __extends(NumberType, _super);
    function NumberType() {
        var _this = _super.call(this, 'number', function (u) { return typeof u === 'number'; }, function (u, c) { return (_this.is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'NumberType';
        return _this;
    }
    return NumberType;
}(Type));
exports.NumberType = NumberType;
/**
 * @category primitives
 * @since 1.0.0
 */
exports.number = new NumberType();
/**
 * @since 2.1.0
 */
var BigIntType = /** @class */ (function (_super) {
    __extends(BigIntType, _super);
    function BigIntType() {
        var _this = _super.call(this, 'bigint', 
        // tslint:disable-next-line: valid-typeof
        function (u) { return typeof u === 'bigint'; }, function (u, c) { return (_this.is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'BigIntType';
        return _this;
    }
    return BigIntType;
}(Type));
exports.BigIntType = BigIntType;
/**
 * @category primitives
 * @since 2.1.0
 */
exports.bigint = new BigIntType();
/**
 * @since 1.0.0
 */
var BooleanType = /** @class */ (function (_super) {
    __extends(BooleanType, _super);
    function BooleanType() {
        var _this = _super.call(this, 'boolean', function (u) { return typeof u === 'boolean'; }, function (u, c) { return (_this.is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'BooleanType';
        return _this;
    }
    return BooleanType;
}(Type));
exports.BooleanType = BooleanType;
/**
 * @category primitives
 * @since 1.0.0
 */
exports.boolean = new BooleanType();
/**
 * @since 1.0.0
 */
var AnyArrayType = /** @class */ (function (_super) {
    __extends(AnyArrayType, _super);
    function AnyArrayType() {
        var _this = _super.call(this, 'UnknownArray', Array.isArray, function (u, c) { return (_this.is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'AnyArrayType';
        return _this;
    }
    return AnyArrayType;
}(Type));
exports.AnyArrayType = AnyArrayType;
/**
 * @category primitives
 * @since 1.7.1
 */
exports.UnknownArray = new AnyArrayType();
exports.Array = exports.UnknownArray;
/**
 * @since 1.0.0
 */
var AnyDictionaryType = /** @class */ (function (_super) {
    __extends(AnyDictionaryType, _super);
    function AnyDictionaryType() {
        var _this = _super.call(this, 'UnknownRecord', function (u) {
            var s = Object.prototype.toString.call(u);
            return s === '[object Object]' || s === '[object Window]';
        }, function (u, c) { return (_this.is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'AnyDictionaryType';
        return _this;
    }
    return AnyDictionaryType;
}(Type));
exports.AnyDictionaryType = AnyDictionaryType;
/**
 * @category primitives
 * @since 1.7.1
 */
exports.UnknownRecord = new AnyDictionaryType();
/**
 * @since 1.0.0
 */
var LiteralType = /** @class */ (function (_super) {
    __extends(LiteralType, _super);
    function LiteralType(name, is, validate, encode, value) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.value = value;
        /**
         * @since 1.0.0
         */
        _this._tag = 'LiteralType';
        return _this;
    }
    return LiteralType;
}(Type));
exports.LiteralType = LiteralType;
/**
 * @category constructors
 * @since 1.0.0
 */
function literal(value, name) {
    if (name === void 0) { name = JSON.stringify(value); }
    var is = function (u) { return u === value; };
    return new LiteralType(name, is, function (u, c) { return (is(u) ? exports.success(value) : exports.failure(u, c)); }, exports.identity, value);
}
exports.literal = literal;
/**
 * @since 1.0.0
 */
var KeyofType = /** @class */ (function (_super) {
    __extends(KeyofType, _super);
    function KeyofType(name, is, validate, encode, keys) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.keys = keys;
        /**
         * @since 1.0.0
         */
        _this._tag = 'KeyofType';
        return _this;
    }
    return KeyofType;
}(Type));
exports.KeyofType = KeyofType;
/**
 * @category constructors
 * @since 1.0.0
 */
function keyof(keys, name) {
    if (name === void 0) { name = Object.keys(keys)
        .map(function (k) { return JSON.stringify(k); })
        .join(' | '); }
    var is = function (u) { return exports.string.is(u) && hasOwnProperty.call(keys, u); };
    return new KeyofType(name, is, function (u, c) { return (is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity, keys);
}
exports.keyof = keyof;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @since 1.0.0
 */
var RefinementType = /** @class */ (function (_super) {
    __extends(RefinementType, _super);
    function RefinementType(name, is, validate, encode, type, predicate) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.type = type;
        _this.predicate = predicate;
        /**
         * @since 1.0.0
         */
        _this._tag = 'RefinementType';
        return _this;
    }
    return RefinementType;
}(Type));
exports.RefinementType = RefinementType;
/**
 * @category combinators
 * @since 1.8.1
 */
function brand(codec, predicate, name) {
    // tslint:disable-next-line: deprecation
    return refinement(codec, predicate, name);
}
exports.brand = brand;
/**
 * A branded codec representing an integer
 *
 * @category primitives
 * @since 1.8.1
 */
exports.Int = brand(exports.number, function (n) { return Number.isInteger(n); }, 'Int');
/**
 * @since 1.0.0
 */
var RecursiveType = /** @class */ (function (_super) {
    __extends(RecursiveType, _super);
    function RecursiveType(name, is, validate, encode, runDefinition) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.runDefinition = runDefinition;
        /**
         * @since 1.0.0
         */
        _this._tag = 'RecursiveType';
        return _this;
    }
    return RecursiveType;
}(Type));
exports.RecursiveType = RecursiveType;
Object.defineProperty(RecursiveType.prototype, 'type', {
    get: function () {
        return this.runDefinition();
    },
    enumerable: true,
    configurable: true
});
/**
 * @category combinators
 * @since 1.0.0
 */
function recursion(name, definition) {
    var cache;
    var runDefinition = function () {
        if (!cache) {
            cache = definition(Self);
            cache.name = name;
        }
        return cache;
    };
    var Self = new RecursiveType(name, function (u) { return runDefinition().is(u); }, function (u, c) { return runDefinition().validate(u, c); }, function (a) { return runDefinition().encode(a); }, runDefinition);
    return Self;
}
exports.recursion = recursion;
/**
 * @since 1.0.0
 */
var ArrayType = /** @class */ (function (_super) {
    __extends(ArrayType, _super);
    function ArrayType(name, is, validate, encode, type) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.type = type;
        /**
         * @since 1.0.0
         */
        _this._tag = 'ArrayType';
        return _this;
    }
    return ArrayType;
}(Type));
exports.ArrayType = ArrayType;
/**
 * @category combinators
 * @since 1.0.0
 */
function array(item, name) {
    if (name === void 0) { name = "Array<" + item.name + ">"; }
    return new ArrayType(name, function (u) { return exports.UnknownArray.is(u) && u.every(item.is); }, function (u, c) {
        var e = exports.UnknownArray.validate(u, c);
        if (Either_1.isLeft(e)) {
            return e;
        }
        var us = e.right;
        var len = us.length;
        var as = us;
        var errors = [];
        for (var i = 0; i < len; i++) {
            var ui = us[i];
            var result = item.validate(ui, appendContext(c, String(i), item, ui));
            if (Either_1.isLeft(result)) {
                pushAll(errors, result.left);
            }
            else {
                var ai = result.right;
                if (ai !== ui) {
                    if (as === us) {
                        as = us.slice();
                    }
                    as[i] = ai;
                }
            }
        }
        return errors.length > 0 ? exports.failures(errors) : exports.success(as);
    }, item.encode === exports.identity ? exports.identity : function (a) { return a.map(item.encode); }, item);
}
exports.array = array;
/**
 * @since 1.0.0
 */
var InterfaceType = /** @class */ (function (_super) {
    __extends(InterfaceType, _super);
    function InterfaceType(name, is, validate, encode, props) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.props = props;
        /**
         * @since 1.0.0
         */
        _this._tag = 'InterfaceType';
        return _this;
    }
    return InterfaceType;
}(Type));
exports.InterfaceType = InterfaceType;
/**
 * @category combinators
 * @since 1.0.0
 */
function type(props, name) {
    if (name === void 0) { name = getInterfaceTypeName(props); }
    var keys = Object.keys(props);
    var types = keys.map(function (key) { return props[key]; });
    var len = keys.length;
    return new InterfaceType(name, function (u) {
        if (exports.UnknownRecord.is(u)) {
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                var uk = u[k];
                if ((uk === undefined && !hasOwnProperty.call(u, k)) || !types[i].is(uk)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }, function (u, c) {
        var e = exports.UnknownRecord.validate(u, c);
        if (Either_1.isLeft(e)) {
            return e;
        }
        var o = e.right;
        var a = o;
        var errors = [];
        for (var i = 0; i < len; i++) {
            var k = keys[i];
            var ak = a[k];
            var type_1 = types[i];
            var result = type_1.validate(ak, appendContext(c, k, type_1, ak));
            if (Either_1.isLeft(result)) {
                pushAll(errors, result.left);
            }
            else {
                var vak = result.right;
                if (vak !== ak || (vak === undefined && !hasOwnProperty.call(a, k))) {
                    /* istanbul ignore next */
                    if (a === o) {
                        a = __assign({}, o);
                    }
                    a[k] = vak;
                }
            }
        }
        return errors.length > 0 ? exports.failures(errors) : exports.success(a);
    }, useIdentity(types)
        ? exports.identity
        : function (a) {
            var s = __assign({}, a);
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                var encode = types[i].encode;
                if (encode !== exports.identity) {
                    s[k] = encode(a[k]);
                }
            }
            return s;
        }, props);
}
exports.type = type;
exports.interface = type;
/**
 * @since 1.0.0
 */
var PartialType = /** @class */ (function (_super) {
    __extends(PartialType, _super);
    function PartialType(name, is, validate, encode, props) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.props = props;
        /**
         * @since 1.0.0
         */
        _this._tag = 'PartialType';
        return _this;
    }
    return PartialType;
}(Type));
exports.PartialType = PartialType;
/**
 * @category combinators
 * @since 1.0.0
 */
function partial(props, name) {
    if (name === void 0) { name = getPartialTypeName(getInterfaceTypeName(props)); }
    var keys = Object.keys(props);
    var types = keys.map(function (key) { return props[key]; });
    var len = keys.length;
    return new PartialType(name, function (u) {
        if (exports.UnknownRecord.is(u)) {
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                var uk = u[k];
                if (uk !== undefined && !props[k].is(uk)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }, function (u, c) {
        var e = exports.UnknownRecord.validate(u, c);
        if (Either_1.isLeft(e)) {
            return e;
        }
        var o = e.right;
        var a = o;
        var errors = [];
        for (var i = 0; i < len; i++) {
            var k = keys[i];
            var ak = a[k];
            var type_2 = props[k];
            var result = type_2.validate(ak, appendContext(c, k, type_2, ak));
            if (Either_1.isLeft(result)) {
                if (ak !== undefined) {
                    pushAll(errors, result.left);
                }
            }
            else {
                var vak = result.right;
                if (vak !== ak) {
                    /* istanbul ignore next */
                    if (a === o) {
                        a = __assign({}, o);
                    }
                    a[k] = vak;
                }
            }
        }
        return errors.length > 0 ? exports.failures(errors) : exports.success(a);
    }, useIdentity(types)
        ? exports.identity
        : function (a) {
            var s = __assign({}, a);
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                var ak = a[k];
                if (ak !== undefined) {
                    s[k] = types[i].encode(ak);
                }
            }
            return s;
        }, props);
}
exports.partial = partial;
/**
 * @since 1.0.0
 */
var DictionaryType = /** @class */ (function (_super) {
    __extends(DictionaryType, _super);
    function DictionaryType(name, is, validate, encode, domain, codomain) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.domain = domain;
        _this.codomain = codomain;
        /**
         * @since 1.0.0
         */
        _this._tag = 'DictionaryType';
        return _this;
    }
    return DictionaryType;
}(Type));
exports.DictionaryType = DictionaryType;
/**
 * @category combinators
 * @since 1.7.1
 */
function record(domain, codomain, name) {
    var keys = getDomainKeys(domain);
    return keys
        ? enumerableRecord(Object.keys(keys), domain, codomain, name)
        : nonEnumerableRecord(domain, codomain, name);
}
exports.record = record;
/**
 * @since 1.0.0
 */
var UnionType = /** @class */ (function (_super) {
    __extends(UnionType, _super);
    function UnionType(name, is, validate, encode, types) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.types = types;
        /**
         * @since 1.0.0
         */
        _this._tag = 'UnionType';
        return _this;
    }
    return UnionType;
}(Type));
exports.UnionType = UnionType;
/**
 * @category combinators
 * @since 1.0.0
 */
function union(codecs, name) {
    if (name === void 0) { name = getUnionName(codecs); }
    var index = getIndex(codecs);
    if (index !== undefined && codecs.length > 0) {
        var tag_1 = index[0], groups_1 = index[1];
        var len_1 = groups_1.length;
        var find_1 = function (value) {
            for (var i = 0; i < len_1; i++) {
                if (groups_1[i].indexOf(value) !== -1) {
                    return i;
                }
            }
            return undefined;
        };
        // tslint:disable-next-line: deprecation
        return new TaggedUnionType(name, function (u) {
            if (exports.UnknownRecord.is(u)) {
                var i = find_1(u[tag_1]);
                return i !== undefined ? codecs[i].is(u) : false;
            }
            return false;
        }, function (u, c) {
            var e = exports.UnknownRecord.validate(u, c);
            if (Either_1.isLeft(e)) {
                return e;
            }
            var r = e.right;
            var i = find_1(r[tag_1]);
            if (i === undefined) {
                return exports.failure(u, c);
            }
            var codec = codecs[i];
            return codec.validate(r, appendContext(c, String(i), codec, r));
        }, useIdentity(codecs)
            ? exports.identity
            : function (a) {
                var i = find_1(a[tag_1]);
                if (i === undefined) {
                    // https://github.com/gcanti/io-ts/pull/305
                    throw new Error("no codec found to encode value in union codec " + name);
                }
                else {
                    return codecs[i].encode(a);
                }
            }, codecs, tag_1);
    }
    else {
        return new UnionType(name, function (u) { return codecs.some(function (type) { return type.is(u); }); }, function (u, c) {
            var errors = [];
            for (var i = 0; i < codecs.length; i++) {
                var codec = codecs[i];
                var result = codec.validate(u, appendContext(c, String(i), codec, u));
                if (Either_1.isLeft(result)) {
                    pushAll(errors, result.left);
                }
                else {
                    return exports.success(result.right);
                }
            }
            return exports.failures(errors);
        }, useIdentity(codecs)
            ? exports.identity
            : function (a) {
                for (var _i = 0, codecs_1 = codecs; _i < codecs_1.length; _i++) {
                    var codec = codecs_1[_i];
                    if (codec.is(a)) {
                        return codec.encode(a);
                    }
                }
                // https://github.com/gcanti/io-ts/pull/305
                throw new Error("no codec found to encode value in union type " + name);
            }, codecs);
    }
}
exports.union = union;
/**
 * @since 1.0.0
 */
var IntersectionType = /** @class */ (function (_super) {
    __extends(IntersectionType, _super);
    function IntersectionType(name, is, validate, encode, types) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.types = types;
        /**
         * @since 1.0.0
         */
        _this._tag = 'IntersectionType';
        return _this;
    }
    return IntersectionType;
}(Type));
exports.IntersectionType = IntersectionType;
function intersection(codecs, name) {
    if (name === void 0) { name = "(" + codecs.map(function (type) { return type.name; }).join(' & ') + ")"; }
    var len = codecs.length;
    return new IntersectionType(name, function (u) { return codecs.every(function (type) { return type.is(u); }); }, codecs.length === 0
        ? exports.success
        : function (u, c) {
            var us = [];
            var errors = [];
            for (var i = 0; i < len; i++) {
                var codec = codecs[i];
                var result = codec.validate(u, appendContext(c, String(i), codec, u));
                if (Either_1.isLeft(result)) {
                    pushAll(errors, result.left);
                }
                else {
                    us.push(result.right);
                }
            }
            return errors.length > 0 ? exports.failures(errors) : exports.success(mergeAll(u, us));
        }, codecs.length === 0
        ? exports.identity
        : function (a) {
            return mergeAll(a, codecs.map(function (codec) { return codec.encode(a); }));
        }, codecs);
}
exports.intersection = intersection;
/**
 * @since 1.0.0
 */
var TupleType = /** @class */ (function (_super) {
    __extends(TupleType, _super);
    function TupleType(name, is, validate, encode, types) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.types = types;
        /**
         * @since 1.0.0
         */
        _this._tag = 'TupleType';
        return _this;
    }
    return TupleType;
}(Type));
exports.TupleType = TupleType;
function tuple(codecs, name) {
    if (name === void 0) { name = "[" + codecs.map(function (type) { return type.name; }).join(', ') + "]"; }
    var len = codecs.length;
    return new TupleType(name, function (u) { return exports.UnknownArray.is(u) && u.length === len && codecs.every(function (type, i) { return type.is(u[i]); }); }, function (u, c) {
        var e = exports.UnknownArray.validate(u, c);
        if (Either_1.isLeft(e)) {
            return e;
        }
        var us = e.right;
        var as = us.length > len ? us.slice(0, len) : us; // strip additional components
        var errors = [];
        for (var i = 0; i < len; i++) {
            var a = us[i];
            var type_3 = codecs[i];
            var result = type_3.validate(a, appendContext(c, String(i), type_3, a));
            if (Either_1.isLeft(result)) {
                pushAll(errors, result.left);
            }
            else {
                var va = result.right;
                if (va !== a) {
                    /* istanbul ignore next */
                    if (as === us) {
                        as = us.slice();
                    }
                    as[i] = va;
                }
            }
        }
        return errors.length > 0 ? exports.failures(errors) : exports.success(as);
    }, useIdentity(codecs) ? exports.identity : function (a) { return codecs.map(function (type, i) { return type.encode(a[i]); }); }, codecs);
}
exports.tuple = tuple;
/**
 * @since 1.0.0
 */
var ReadonlyType = /** @class */ (function (_super) {
    __extends(ReadonlyType, _super);
    function ReadonlyType(name, is, validate, encode, type) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.type = type;
        /**
         * @since 1.0.0
         */
        _this._tag = 'ReadonlyType';
        return _this;
    }
    return ReadonlyType;
}(Type));
exports.ReadonlyType = ReadonlyType;
/**
 * @category combinators
 * @since 1.0.0
 */
function readonly(codec, name) {
    if (name === void 0) { name = "Readonly<" + codec.name + ">"; }
    return new ReadonlyType(name, codec.is, codec.validate, codec.encode, codec);
}
exports.readonly = readonly;
/**
 * @since 1.0.0
 */
var ReadonlyArrayType = /** @class */ (function (_super) {
    __extends(ReadonlyArrayType, _super);
    function ReadonlyArrayType(name, is, validate, encode, type) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.type = type;
        /**
         * @since 1.0.0
         */
        _this._tag = 'ReadonlyArrayType';
        return _this;
    }
    return ReadonlyArrayType;
}(Type));
exports.ReadonlyArrayType = ReadonlyArrayType;
/**
 * @category combinators
 * @since 1.0.0
 */
function readonlyArray(item, name) {
    if (name === void 0) { name = "ReadonlyArray<" + item.name + ">"; }
    var codec = array(item);
    return new ReadonlyArrayType(name, codec.is, codec.validate, codec.encode, item);
}
exports.readonlyArray = readonlyArray;
/**
 * Strips additional properties, equivalent to `exact(type(props))`.
 *
 * @category combinators
 * @since 1.0.0
 */
var strict = function (props, name) { return exact(type(props), name); };
exports.strict = strict;
/**
 * @since 1.1.0
 */
var ExactType = /** @class */ (function (_super) {
    __extends(ExactType, _super);
    function ExactType(name, is, validate, encode, type) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.type = type;
        /**
         * @since 1.0.0
         */
        _this._tag = 'ExactType';
        return _this;
    }
    return ExactType;
}(Type));
exports.ExactType = ExactType;
/**
 * Strips additional properties.
 *
 * @category combinators
 * @since 1.1.0
 */
function exact(codec, name) {
    if (name === void 0) { name = getExactTypeName(codec); }
    var props = getProps(codec);
    return new ExactType(name, codec.is, function (u, c) {
        var e = exports.UnknownRecord.validate(u, c);
        if (Either_1.isLeft(e)) {
            return e;
        }
        var ce = codec.validate(u, c);
        if (Either_1.isLeft(ce)) {
            return ce;
        }
        return Either_1.right(stripKeys(ce.right, props));
    }, function (a) { return codec.encode(stripKeys(a, props)); }, codec);
}
exports.exact = exact;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * @since 1.0.0
 * @deprecated
 */
var FunctionType = /** @class */ (function (_super) {
    __extends(FunctionType, _super);
    function FunctionType() {
        var _this = _super.call(this, 'Function', 
        // tslint:disable-next-line:strict-type-predicates
        function (u) { return typeof u === 'function'; }, function (u, c) { return (_this.is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'FunctionType';
        return _this;
    }
    return FunctionType;
}(Type));
exports.FunctionType = FunctionType;
/**
 * @category primitives
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
exports.Function = new FunctionType();
/**
 * @since 1.3.0
 * @deprecated
 */
var TaggedUnionType = /** @class */ (function (_super) {
    __extends(TaggedUnionType, _super);
    function TaggedUnionType(name, 
    // tslint:disable-next-line: deprecation
    is, 
    // tslint:disable-next-line: deprecation
    validate, 
    // tslint:disable-next-line: deprecation
    encode, codecs, tag) {
        var _this = _super.call(this, name, is, validate, encode, codecs) /* istanbul ignore next */ // <= workaround for https://github.com/Microsoft/TypeScript/issues/13455
         || this;
        _this.tag = tag;
        return _this;
    }
    return TaggedUnionType;
}(UnionType));
exports.TaggedUnionType = TaggedUnionType;
/**
 * Use `union` instead.
 *
 * @category combinators
 * @since 1.3.0
 * @deprecated
 */
var taggedUnion = function (tag, codecs, name
// tslint:disable-next-line: deprecation
) {
    if (name === void 0) { name = getUnionName(codecs); }
    var U = union(codecs, name);
    // tslint:disable-next-line: deprecation
    if (U instanceof TaggedUnionType) {
        return U;
    }
    else {
        console.warn("[io-ts] Cannot build a tagged union for " + name + ", returning a de-optimized union");
        // tslint:disable-next-line: deprecation
        return new TaggedUnionType(name, U.is, U.validate, U.encode, codecs, tag);
    }
};
exports.taggedUnion = taggedUnion;
/**
 * @since 1.0.0
 * @deprecated
 */
var getValidationError /* istanbul ignore next */ = function (value, context) { return ({
    value: value,
    context: context
}); };
exports.getValidationError /* istanbul ignore next */ = getValidationError;
/**
 * @since 1.0.0
 * @deprecated
 */
var getDefaultContext /* istanbul ignore next */ = function (decoder) { return [
    { key: '', type: decoder }
]; };
exports.getDefaultContext /* istanbul ignore next */ = getDefaultContext;
/**
 * @since 1.0.0
 * @deprecated
 */
var NeverType = /** @class */ (function (_super) {
    __extends(NeverType, _super);
    function NeverType() {
        var _this = _super.call(this, 'never', function (_) { return false; }, function (u, c) { return exports.failure(u, c); }, 
        /* istanbul ignore next */
        function () {
            throw new Error('cannot encode never');
        }) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'NeverType';
        return _this;
    }
    return NeverType;
}(Type));
exports.NeverType = NeverType;
/**
 * @category primitives
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
exports.never = new NeverType();
/**
 * @since 1.0.0
 * @deprecated
 */
var AnyType = /** @class */ (function (_super) {
    __extends(AnyType, _super);
    function AnyType() {
        var _this = _super.call(this, 'any', function (_) { return true; }, exports.success, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'AnyType';
        return _this;
    }
    return AnyType;
}(Type));
exports.AnyType = AnyType;
/**
 * Use `unknown` instead.
 *
 * @category primitives
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
exports.any = new AnyType();
/**
 * Use `UnknownRecord` instead.
 *
 * @category primitives
 * @since 1.0.0
 * @deprecated
 */
exports.Dictionary = exports.UnknownRecord;
/**
 * @since 1.0.0
 * @deprecated
 */
var ObjectType = /** @class */ (function (_super) {
    __extends(ObjectType, _super);
    function ObjectType() {
        var _this = _super.call(this, 'object', function (u) { return u !== null && typeof u === 'object'; }, function (u, c) { return (_this.is(u) ? exports.success(u) : exports.failure(u, c)); }, exports.identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'ObjectType';
        return _this;
    }
    return ObjectType;
}(Type));
exports.ObjectType = ObjectType;
/**
 * Use `UnknownRecord` instead.
 *
 * @category primitives
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
exports.object = new ObjectType();
/**
 * Use `brand` instead.
 *
 * @category combinators
 * @since 1.0.0
 * @deprecated
 */
function refinement(codec, predicate, name) {
    if (name === void 0) { name = "(" + codec.name + " | " + getFunctionName(predicate) + ")"; }
    return new RefinementType(name, function (u) { return codec.is(u) && predicate(u); }, function (i, c) {
        var e = codec.validate(i, c);
        if (Either_1.isLeft(e)) {
            return e;
        }
        var a = e.right;
        return predicate(a) ? exports.success(a) : exports.failure(a, c);
    }, codec.encode, codec, predicate);
}
exports.refinement = refinement;
/**
 * Use `Int` instead.
 *
 * @category primitives
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
exports.Integer = refinement(exports.number, Number.isInteger, 'Integer');
/**
 * Use `record` instead.
 *
 * @category combinators
 * @since 1.0.0
 * @deprecated
 */
exports.dictionary = record;
/**
 * @since 1.0.0
 * @deprecated
 */
var StrictType = /** @class */ (function (_super) {
    __extends(StrictType, _super);
    function StrictType(name, 
    // tslint:disable-next-line: deprecation
    is, 
    // tslint:disable-next-line: deprecation
    validate, 
    // tslint:disable-next-line: deprecation
    encode, props) {
        var _this = _super.call(this, name, is, validate, encode) || this;
        _this.props = props;
        /**
         * @since 1.0.0
         */
        _this._tag = 'StrictType';
        return _this;
    }
    return StrictType;
}(Type));
exports.StrictType = StrictType;
/**
 * Drops the codec "kind".
 *
 * @category combinators
 * @since 1.1.0
 * @deprecated
 */
function clean(codec) {
    return codec;
}
exports.clean = clean;
function alias(codec) {
    return function () { return codec; };
}
exports.alias = alias;


/***/ }),

/***/ 3287:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

exports.isPlainObject = isPlainObject;


/***/ }),

/***/ 1917:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";



var loader = __nccwpck_require__(1161);
var dumper = __nccwpck_require__(8866);


function renamed(from, to) {
  return function () {
    throw new Error('Function yaml.' + from + ' is removed in js-yaml 4. ' +
      'Use yaml.' + to + ' instead, which is now safe by default.');
  };
}


module.exports.Type = __nccwpck_require__(6073);
module.exports.Schema = __nccwpck_require__(1082);
module.exports.FAILSAFE_SCHEMA = __nccwpck_require__(8562);
module.exports.JSON_SCHEMA = __nccwpck_require__(1035);
module.exports.CORE_SCHEMA = __nccwpck_require__(2011);
module.exports.DEFAULT_SCHEMA = __nccwpck_require__(8759);
module.exports.load                = loader.load;
module.exports.loadAll             = loader.loadAll;
module.exports.dump                = dumper.dump;
module.exports.YAMLException = __nccwpck_require__(8179);

// Removed functions from JS-YAML 3.0.x
module.exports.safeLoad            = renamed('safeLoad', 'load');
module.exports.safeLoadAll         = renamed('safeLoadAll', 'loadAll');
module.exports.safeDump            = renamed('safeDump', 'dump');


/***/ }),

/***/ 6829:
/***/ ((module) => {

"use strict";



function isNothing(subject) {
  return (typeof subject === 'undefined') || (subject === null);
}


function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null);
}


function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];

  return [ sequence ];
}


function extend(target, source) {
  var index, length, key, sourceKeys;

  if (source) {
    sourceKeys = Object.keys(source);

    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }

  return target;
}


function repeat(string, count) {
  var result = '', cycle;

  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }

  return result;
}


function isNegativeZero(number) {
  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
}


module.exports.isNothing      = isNothing;
module.exports.isObject       = isObject;
module.exports.toArray        = toArray;
module.exports.repeat         = repeat;
module.exports.isNegativeZero = isNegativeZero;
module.exports.extend         = extend;


/***/ }),

/***/ 8866:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/*eslint-disable no-use-before-define*/

var common              = __nccwpck_require__(6829);
var YAMLException       = __nccwpck_require__(8179);
var DEFAULT_SCHEMA      = __nccwpck_require__(8759);

var _toString       = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;

var CHAR_BOM                  = 0xFEFF;
var CHAR_TAB                  = 0x09; /* Tab */
var CHAR_LINE_FEED            = 0x0A; /* LF */
var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
var CHAR_SPACE                = 0x20; /* Space */
var CHAR_EXCLAMATION          = 0x21; /* ! */
var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
var CHAR_SHARP                = 0x23; /* # */
var CHAR_PERCENT              = 0x25; /* % */
var CHAR_AMPERSAND            = 0x26; /* & */
var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
var CHAR_ASTERISK             = 0x2A; /* * */
var CHAR_COMMA                = 0x2C; /* , */
var CHAR_MINUS                = 0x2D; /* - */
var CHAR_COLON                = 0x3A; /* : */
var CHAR_EQUALS               = 0x3D; /* = */
var CHAR_GREATER_THAN         = 0x3E; /* > */
var CHAR_QUESTION             = 0x3F; /* ? */
var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
var CHAR_VERTICAL_LINE        = 0x7C; /* | */
var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

var ESCAPE_SEQUENCES = {};

ESCAPE_SEQUENCES[0x00]   = '\\0';
ESCAPE_SEQUENCES[0x07]   = '\\a';
ESCAPE_SEQUENCES[0x08]   = '\\b';
ESCAPE_SEQUENCES[0x09]   = '\\t';
ESCAPE_SEQUENCES[0x0A]   = '\\n';
ESCAPE_SEQUENCES[0x0B]   = '\\v';
ESCAPE_SEQUENCES[0x0C]   = '\\f';
ESCAPE_SEQUENCES[0x0D]   = '\\r';
ESCAPE_SEQUENCES[0x1B]   = '\\e';
ESCAPE_SEQUENCES[0x22]   = '\\"';
ESCAPE_SEQUENCES[0x5C]   = '\\\\';
ESCAPE_SEQUENCES[0x85]   = '\\N';
ESCAPE_SEQUENCES[0xA0]   = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';

var DEPRECATED_BOOLEANS_SYNTAX = [
  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
];

var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;

function compileStyleMap(schema, map) {
  var result, keys, index, length, tag, style, type;

  if (map === null) return {};

  result = {};
  keys = Object.keys(map);

  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map[tag]);

    if (tag.slice(0, 2) === '!!') {
      tag = 'tag:yaml.org,2002:' + tag.slice(2);
    }
    type = schema.compiledTypeMap['fallback'][tag];

    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
      style = type.styleAliases[style];
    }

    result[tag] = style;
  }

  return result;
}

function encodeHex(character) {
  var string, handle, length;

  string = character.toString(16).toUpperCase();

  if (character <= 0xFF) {
    handle = 'x';
    length = 2;
  } else if (character <= 0xFFFF) {
    handle = 'u';
    length = 4;
  } else if (character <= 0xFFFFFFFF) {
    handle = 'U';
    length = 8;
  } else {
    throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
  }

  return '\\' + handle + common.repeat('0', length - string.length) + string;
}


var QUOTING_TYPE_SINGLE = 1,
    QUOTING_TYPE_DOUBLE = 2;

function State(options) {
  this.schema        = options['schema'] || DEFAULT_SCHEMA;
  this.indent        = Math.max(1, (options['indent'] || 2));
  this.noArrayIndent = options['noArrayIndent'] || false;
  this.skipInvalid   = options['skipInvalid'] || false;
  this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
  this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
  this.sortKeys      = options['sortKeys'] || false;
  this.lineWidth     = options['lineWidth'] || 80;
  this.noRefs        = options['noRefs'] || false;
  this.noCompatMode  = options['noCompatMode'] || false;
  this.condenseFlow  = options['condenseFlow'] || false;
  this.quotingType   = options['quotingType'] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes   = options['forceQuotes'] || false;
  this.replacer      = typeof options['replacer'] === 'function' ? options['replacer'] : null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;

  this.tag = null;
  this.result = '';

  this.duplicates = [];
  this.usedDuplicates = null;
}

// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
  var ind = common.repeat(' ', spaces),
      position = 0,
      next = -1,
      result = '',
      line,
      length = string.length;

  while (position < length) {
    next = string.indexOf('\n', position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }

    if (line.length && line !== '\n') result += ind;

    result += line;
  }

  return result;
}

function generateNextLine(state, level) {
  return '\n' + common.repeat(' ', state.indent * level);
}

function testImplicitResolving(state, str) {
  var index, length, type;

  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type = state.implicitTypes[index];

    if (type.resolve(str)) {
      return true;
    }
  }

  return false;
}

// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}

// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
  return  (0x00020 <= c && c <= 0x00007E)
      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== CHAR_BOM)
      ||  (0x10000 <= c && c <= 0x10FFFF);
}

// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// Including s-white (for some reason, examples doesn't match specs in this aspect)
// ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
function isNsCharOrWhitespace(c) {
  return isPrintable(c)
    && c !== CHAR_BOM
    // - b-char
    && c !== CHAR_CARRIAGE_RETURN
    && c !== CHAR_LINE_FEED;
}

// [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
//                             c = flow-in   ⇒ ns-plain-safe-in
//                             c = block-key ⇒ ns-plain-safe-out
//                             c = flow-key  ⇒ ns-plain-safe-in
// [128] ns-plain-safe-out ::= ns-char
// [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
// [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
//                            | ( /* An ns-char preceding */ “#” )
//                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    inblock ? // c = flow-in
      cIsNsCharOrWhitespace
      : cIsNsCharOrWhitespace
        // - c-flow-indicator
        && c !== CHAR_COMMA
        && c !== CHAR_LEFT_SQUARE_BRACKET
        && c !== CHAR_RIGHT_SQUARE_BRACKET
        && c !== CHAR_LEFT_CURLY_BRACKET
        && c !== CHAR_RIGHT_CURLY_BRACKET
  )
    // ns-plain-char
    && c !== CHAR_SHARP // false on '#'
    && !(prev === CHAR_COLON && !cIsNsChar) // false on ': '
    || (isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP) // change to true on '[^ ]#'
    || (prev === CHAR_COLON && cIsNsChar); // change to true on ':[^ ]'
}

// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
  // Uses a subset of ns-char - c-indicator
  // where ns-char = nb-char - s-white.
  // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
  return isPrintable(c) && c !== CHAR_BOM
    && !isWhitespace(c) // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    && c !== CHAR_MINUS
    && c !== CHAR_QUESTION
    && c !== CHAR_COLON
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
    && c !== CHAR_SHARP
    && c !== CHAR_AMPERSAND
    && c !== CHAR_ASTERISK
    && c !== CHAR_EXCLAMATION
    && c !== CHAR_VERTICAL_LINE
    && c !== CHAR_EQUALS
    && c !== CHAR_GREATER_THAN
    && c !== CHAR_SINGLE_QUOTE
    && c !== CHAR_DOUBLE_QUOTE
    // | “%” | “@” | “`”)
    && c !== CHAR_PERCENT
    && c !== CHAR_COMMERCIAL_AT
    && c !== CHAR_GRAVE_ACCENT;
}

// Simplified test for values allowed as the last character in plain style.
function isPlainSafeLast(c) {
  // just not whitespace or colon, it will be checked to be plain character later
  return !isWhitespace(c) && c !== CHAR_COLON;
}

// Same as 'string'.codePointAt(pos), but works in older browsers.
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) {
      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }
  return first;
}

// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}

var STYLE_PLAIN   = 1,
    STYLE_SINGLE  = 2,
    STYLE_LITERAL = 3,
    STYLE_FOLDED  = 4,
    STYLE_DOUBLE  = 5;

// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth,
  testAmbiguousType, quotingType, forceQuotes, inblock) {

  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false; // only checked if shouldTrackWidth
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1; // count the first line correctly
  var plain = isPlainSafeFirst(codePointAt(string, 0))
          && isPlainSafeLast(codePointAt(string, string.length - 1));

  if (singleLineOnly || forceQuotes) {
    // Case: no block styles.
    // Check for disallowed characters to rule out plain and single.
    for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    // Case: block styles permitted.
    for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        // Check if any line can be folded.
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine ||
            // Foldable line = too long, and not more-indented.
            (i - previousLineBreak - 1 > lineWidth &&
             string[previousLineBreak + 1] !== ' ');
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    // in case the end is missing a \n
    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
      (i - previousLineBreak - 1 > lineWidth &&
       string[previousLineBreak + 1] !== ' '));
  }
  // Although every style can represent \n without escaping, prefer block styles
  // for multiline, since they're more readable and they don't add empty lines.
  // Also prefer folding a super-long line.
  if (!hasLineBreak && !hasFoldableLine) {
    // Strings interpretable as another type have to be quoted;
    // e.g. the string 'true' vs. the boolean true.
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  // Edge case: block indentation indicator can only have one digit.
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  // At this point we know block styles are valid.
  // Prefer literal style unless we want to fold.
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}

// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = (function () {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? ('"' + string + '"') : ("'" + string + "'");
      }
    }

    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
    // As indentation gets deeper, let the width decrease monotonically
    // to the lower bound min(state.lineWidth, 40).
    // Note that this implies
    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
    // This behaves better than a constant minimum width which disallows narrower options,
    // or an indent threshold which causes the width to suddenly increase.
    var lineWidth = state.lineWidth === -1
      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

    // Without knowing if keys are implicit/explicit, assume implicit for safety.
    var singleLineOnly = iskey
      // No block styles in flow mode.
      || (state.flowLevel > -1 && level >= state.flowLevel);
    function testAmbiguity(string) {
      return testImplicitResolving(state, string);
    }

    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth,
      testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {

      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return '|' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return '>' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string, lineWidth) + '"';
      default:
        throw new YAMLException('impossible error: invalid scalar style');
    }
  }());
}

// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

  // note the special case: the string '\n' counts as a "trailing" empty line.
  var clip =          string[string.length - 1] === '\n';
  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
  var chomp = keep ? '+' : (clip ? '' : '-');

  return indentIndicator + chomp + '\n';
}

// (See the note for writeScalar.)
function dropEndingNewline(string) {
  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
}

// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
  // unless they're before or after a more-indented line, or at the very
  // beginning or end, in which case $k$ maps to $k$.
  // Therefore, parse each chunk as newline(s) followed by a content line.
  var lineRe = /(\n+)([^\n]*)/g;

  // first line (possibly an empty line)
  var result = (function () {
    var nextLF = string.indexOf('\n');
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }());
  // If we haven't reached the first content line yet, don't add an extra \n.
  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
  var moreIndented;

  // rest of the lines
  var match;
  while ((match = lineRe.exec(string))) {
    var prefix = match[1], line = match[2];
    moreIndented = (line[0] === ' ');
    result += prefix
      + (!prevMoreIndented && !moreIndented && line !== ''
        ? '\n' : '')
      + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }

  return result;
}

// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
  if (line === '' || line[0] === ' ') return line;

  // Since a more-indented line adds a \n, breaks can't be followed by a space.
  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
  var match;
  // start is an inclusive index. end, curr, and next are exclusive.
  var start = 0, end, curr = 0, next = 0;
  var result = '';

  // Invariants: 0 <= start <= length-1.
  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
  // Inside the loop:
  //   A match implies length >= 2, so curr and next are <= length-2.
  while ((match = breakRe.exec(line))) {
    next = match.index;
    // maintain invariant: curr - start <= width
    if (next - start > width) {
      end = (curr > start) ? curr : next; // derive end <= length-2
      result += '\n' + line.slice(start, end);
      // skip the space that was output as \n
      start = end + 1;                    // derive start <= length-1
    }
    curr = next;
  }

  // By the invariants, start <= length-1, so there is something left over.
  // It is either the whole string or a part starting from non-whitespace.
  result += '\n';
  // Insert a break if the remainder is too long and there is a break available.
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }

  return result.slice(1); // drop extra \n joiner
}

// Escapes a double-quoted string.
function escapeString(string) {
  var result = '';
  var char = 0;
  var escapeSeq;

  for (var i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];

    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 0x10000) result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }

  return result;
}

function writeFlowSequence(state, level, object) {
  var _result = '',
      _tag    = state.tag,
      index,
      length,
      value;

  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];

    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }

    // Write only valid elements, put null instead of invalid elements.
    if (writeNode(state, level, value, false, false) ||
        (typeof value === 'undefined' &&
         writeNode(state, level, null, false, false))) {

      if (_result !== '') _result += ',' + (!state.condenseFlow ? ' ' : '');
      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = '[' + _result + ']';
}

function writeBlockSequence(state, level, object, compact) {
  var _result = '',
      _tag    = state.tag,
      index,
      length,
      value;

  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];

    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }

    // Write only valid elements, put null instead of invalid elements.
    if (writeNode(state, level + 1, value, true, true, false, true) ||
        (typeof value === 'undefined' &&
         writeNode(state, level + 1, null, true, true, false, true))) {

      if (!compact || _result !== '') {
        _result += generateNextLine(state, level);
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += '-';
      } else {
        _result += '- ';
      }

      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = _result || '[]'; // Empty sequence if no valid values.
}

function writeFlowMapping(state, level, object) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      pairBuffer;

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {

    pairBuffer = '';
    if (_result !== '') pairBuffer += ', ';

    if (state.condenseFlow) pairBuffer += '"';

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }

    if (!writeNode(state, level, objectKey, false, false)) {
      continue; // Skip this pair because of invalid key;
    }

    if (state.dump.length > 1024) pairBuffer += '? ';

    pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

    if (!writeNode(state, level, objectValue, false, false)) {
      continue; // Skip this pair because of invalid value.
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = '{' + _result + '}';
}

function writeBlockMapping(state, level, object, compact) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      explicitPair,
      pairBuffer;

  // Allow sorting keys so that the output file is deterministic
  if (state.sortKeys === true) {
    // Default sorting
    objectKeyList.sort();
  } else if (typeof state.sortKeys === 'function') {
    // Custom sort function
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    // Something is wrong
    throw new YAMLException('sortKeys must be a boolean or a function');
  }

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = '';

    if (!compact || _result !== '') {
      pairBuffer += generateNextLine(state, level);
    }

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }

    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue; // Skip this pair because of invalid key.
    }

    explicitPair = (state.tag !== null && state.tag !== '?') ||
                   (state.dump && state.dump.length > 1024);

    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += '?';
      } else {
        pairBuffer += '? ';
      }
    }

    pairBuffer += state.dump;

    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }

    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue; // Skip this pair because of invalid value.
    }

    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ':';
    } else {
      pairBuffer += ': ';
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
}

function detectType(state, object, explicit) {
  var _result, typeList, index, length, type, style;

  typeList = explicit ? state.explicitTypes : state.implicitTypes;

  for (index = 0, length = typeList.length; index < length; index += 1) {
    type = typeList[index];

    if ((type.instanceOf  || type.predicate) &&
        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
        (!type.predicate  || type.predicate(object))) {

      if (explicit) {
        if (type.multi && type.representName) {
          state.tag = type.representName(object);
        } else {
          state.tag = type.tag;
        }
      } else {
        state.tag = '?';
      }

      if (type.represent) {
        style = state.styleMap[type.tag] || type.defaultStyle;

        if (_toString.call(type.represent) === '[object Function]') {
          _result = type.represent(object, style);
        } else if (_hasOwnProperty.call(type.represent, style)) {
          _result = type.represent[style](object, style);
        } else {
          throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
        }

        state.dump = _result;
      }

      return true;
    }
  }

  return false;
}

// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;

  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }

  var type = _toString.call(state.dump);
  var inblock = block;
  var tagStr;

  if (block) {
    block = (state.flowLevel < 0 || state.flowLevel > level);
  }

  var objectOrArray = type === '[object Object]' || type === '[object Array]',
      duplicateIndex,
      duplicate;

  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }

  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
    compact = false;
  }

  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = '*ref_' + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type === '[object Object]') {
      if (block && (Object.keys(state.dump).length !== 0)) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object Array]') {
      if (block && (state.dump.length !== 0)) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object String]') {
      if (state.tag !== '?') {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type === '[object Undefined]') {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new YAMLException('unacceptable kind of an object to dump ' + type);
    }

    if (state.tag !== null && state.tag !== '?') {
      // Need to encode all characters except those allowed by the spec:
      //
      // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
      // [36] ns-hex-digit    ::=  ns-dec-digit
      //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
      // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
      // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
      // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
      //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
      //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
      //
      // Also need to encode '!' because it has special meaning (end of tag prefix).
      //
      tagStr = encodeURI(
        state.tag[0] === '!' ? state.tag.slice(1) : state.tag
      ).replace(/!/g, '%21');

      if (state.tag[0] === '!') {
        tagStr = '!' + tagStr;
      } else if (tagStr.slice(0, 18) === 'tag:yaml.org,2002:') {
        tagStr = '!!' + tagStr.slice(18);
      } else {
        tagStr = '!<' + tagStr + '>';
      }

      state.dump = tagStr + ' ' + state.dump;
    }
  }

  return true;
}

function getDuplicateReferences(object, state) {
  var objects = [],
      duplicatesIndexes = [],
      index,
      length;

  inspectNode(object, objects, duplicatesIndexes);

  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}

function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList,
      index,
      length;

  if (object !== null && typeof object === 'object') {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);

      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);

        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}

function dump(input, options) {
  options = options || {};

  var state = new State(options);

  if (!state.noRefs) getDuplicateReferences(input, state);

  var value = input;

  if (state.replacer) {
    value = state.replacer.call({ '': value }, '', value);
  }

  if (writeNode(state, 0, value, true, true)) return state.dump + '\n';

  return '';
}

module.exports.dump = dump;


/***/ }),

/***/ 8179:
/***/ ((module) => {

"use strict";
// YAML error class. http://stackoverflow.com/questions/8458984
//



function formatError(exception, compact) {
  var where = '', message = exception.reason || '(unknown reason)';

  if (!exception.mark) return message;

  if (exception.mark.name) {
    where += 'in "' + exception.mark.name + '" ';
  }

  where += '(' + (exception.mark.line + 1) + ':' + (exception.mark.column + 1) + ')';

  if (!compact && exception.mark.snippet) {
    where += '\n\n' + exception.mark.snippet;
  }

  return message + ' ' + where;
}


function YAMLException(reason, mark) {
  // Super constructor
  Error.call(this);

  this.name = 'YAMLException';
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }
}


// Inherit from Error
YAMLException.prototype = Object.create(Error.prototype);
YAMLException.prototype.constructor = YAMLException;


YAMLException.prototype.toString = function toString(compact) {
  return this.name + ': ' + formatError(this, compact);
};


module.exports = YAMLException;


/***/ }),

/***/ 1161:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/*eslint-disable max-len,no-use-before-define*/

var common              = __nccwpck_require__(6829);
var YAMLException       = __nccwpck_require__(8179);
var makeSnippet         = __nccwpck_require__(6975);
var DEFAULT_SCHEMA      = __nccwpck_require__(8759);


var _hasOwnProperty = Object.prototype.hasOwnProperty;


var CONTEXT_FLOW_IN   = 1;
var CONTEXT_FLOW_OUT  = 2;
var CONTEXT_BLOCK_IN  = 3;
var CONTEXT_BLOCK_OUT = 4;


var CHOMPING_CLIP  = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP  = 3;


var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


function _class(obj) { return Object.prototype.toString.call(obj); }

function is_EOL(c) {
  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
}

function is_WHITE_SPACE(c) {
  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
}

function is_WS_OR_EOL(c) {
  return (c === 0x09/* Tab */) ||
         (c === 0x20/* Space */) ||
         (c === 0x0A/* LF */) ||
         (c === 0x0D/* CR */);
}

function is_FLOW_INDICATOR(c) {
  return c === 0x2C/* , */ ||
         c === 0x5B/* [ */ ||
         c === 0x5D/* ] */ ||
         c === 0x7B/* { */ ||
         c === 0x7D/* } */;
}

function fromHexCode(c) {
  var lc;

  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  /*eslint-disable no-bitwise*/
  lc = c | 0x20;

  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
    return lc - 0x61 + 10;
  }

  return -1;
}

function escapedHexLen(c) {
  if (c === 0x78/* x */) { return 2; }
  if (c === 0x75/* u */) { return 4; }
  if (c === 0x55/* U */) { return 8; }
  return 0;
}

function fromDecimalCode(c) {
  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  return -1;
}

function simpleEscapeSequence(c) {
  /* eslint-disable indent */
  return (c === 0x30/* 0 */) ? '\x00' :
        (c === 0x61/* a */) ? '\x07' :
        (c === 0x62/* b */) ? '\x08' :
        (c === 0x74/* t */) ? '\x09' :
        (c === 0x09/* Tab */) ? '\x09' :
        (c === 0x6E/* n */) ? '\x0A' :
        (c === 0x76/* v */) ? '\x0B' :
        (c === 0x66/* f */) ? '\x0C' :
        (c === 0x72/* r */) ? '\x0D' :
        (c === 0x65/* e */) ? '\x1B' :
        (c === 0x20/* Space */) ? ' ' :
        (c === 0x22/* " */) ? '\x22' :
        (c === 0x2F/* / */) ? '/' :
        (c === 0x5C/* \ */) ? '\x5C' :
        (c === 0x4E/* N */) ? '\x85' :
        (c === 0x5F/* _ */) ? '\xA0' :
        (c === 0x4C/* L */) ? '\u2028' :
        (c === 0x50/* P */) ? '\u2029' : '';
}

function charFromCodepoint(c) {
  if (c <= 0xFFFF) {
    return String.fromCharCode(c);
  }
  // Encode UTF-16 surrogate pair
  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
  return String.fromCharCode(
    ((c - 0x010000) >> 10) + 0xD800,
    ((c - 0x010000) & 0x03FF) + 0xDC00
  );
}

var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}


function State(input, options) {
  this.input = input;

  this.filename  = options['filename']  || null;
  this.schema    = options['schema']    || DEFAULT_SCHEMA;
  this.onWarning = options['onWarning'] || null;
  // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
  // if such documents have no explicit %YAML directive
  this.legacy    = options['legacy']    || false;

  this.json      = options['json']      || false;
  this.listener  = options['listener']  || null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap       = this.schema.compiledTypeMap;

  this.length     = input.length;
  this.position   = 0;
  this.line       = 0;
  this.lineStart  = 0;
  this.lineIndent = 0;

  // position of first leading tab in the current line,
  // used to make sure there are no tabs in the indentation
  this.firstTabInLine = -1;

  this.documents = [];

  /*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/

}


function generateError(state, message) {
  var mark = {
    name:     state.filename,
    buffer:   state.input.slice(0, -1), // omit trailing \0
    position: state.position,
    line:     state.line,
    column:   state.position - state.lineStart
  };

  mark.snippet = makeSnippet(mark);

  return new YAMLException(message, mark);
}

function throwError(state, message) {
  throw generateError(state, message);
}

function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}


var directiveHandlers = {

  YAML: function handleYamlDirective(state, name, args) {

    var match, major, minor;

    if (state.version !== null) {
      throwError(state, 'duplication of %YAML directive');
    }

    if (args.length !== 1) {
      throwError(state, 'YAML directive accepts exactly one argument');
    }

    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

    if (match === null) {
      throwError(state, 'ill-formed argument of the YAML directive');
    }

    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);

    if (major !== 1) {
      throwError(state, 'unacceptable YAML version of the document');
    }

    state.version = args[0];
    state.checkLineBreaks = (minor < 2);

    if (minor !== 1 && minor !== 2) {
      throwWarning(state, 'unsupported YAML version of the document');
    }
  },

  TAG: function handleTagDirective(state, name, args) {

    var handle, prefix;

    if (args.length !== 2) {
      throwError(state, 'TAG directive accepts exactly two arguments');
    }

    handle = args[0];
    prefix = args[1];

    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
    }

    if (_hasOwnProperty.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }

    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
    }

    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, 'tag prefix is malformed: ' + prefix);
    }

    state.tagMap[handle] = prefix;
  }
};


function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;

  if (start < end) {
    _result = state.input.slice(start, end);

    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 0x09 ||
              (0x20 <= _character && _character <= 0x10FFFF))) {
          throwError(state, 'expected valid JSON character');
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, 'the stream contains non-printable characters');
    }

    state.result += _result;
  }
}

function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;

  if (!common.isObject(source)) {
    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
  }

  sourceKeys = Object.keys(source);

  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];

    if (!_hasOwnProperty.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}

function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode,
  startLine, startLineStart, startPos) {

  var index, quantity;

  // The output is a plain object here, so keys can only be strings.
  // We need to convert keyNode to a string, but doing so can hang the process
  // (deeply nested arrays that explode exponentially using aliases).
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);

    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, 'nested arrays are not supported inside keys');
      }

      if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
        keyNode[index] = '[object Object]';
      }
    }
  }

  // Avoid code execution in load() via toString property
  // (still use its own toString for arrays, timestamps,
  // and whatever user schema extensions happen to have @@toStringTag)
  if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
    keyNode = '[object Object]';
  }


  keyNode = String(keyNode);

  if (_result === null) {
    _result = {};
  }

  if (keyTag === 'tag:yaml.org,2002:merge') {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json &&
        !_hasOwnProperty.call(overridableKeys, keyNode) &&
        _hasOwnProperty.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, 'duplicated mapping key');
    }

    // used for this specific key only because Object.defineProperty is slow
    if (keyNode === '__proto__') {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }

  return _result;
}

function readLineBreak(state) {
  var ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x0A/* LF */) {
    state.position++;
  } else if (ch === 0x0D/* CR */) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
      state.position++;
    }
  } else {
    throwError(state, 'a line break is expected');
  }

  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}

function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0,
      ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 0x09/* Tab */ && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }

    if (allowComments && ch === 0x23/* # */) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
    }

    if (is_EOL(ch)) {
      readLineBreak(state);

      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;

      while (ch === 0x20/* Space */) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }

  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, 'deficient indentation');
  }

  return lineBreaks;
}

function testDocumentSeparator(state) {
  var _position = state.position,
      ch;

  ch = state.input.charCodeAt(_position);

  // Condition state.position === state.lineStart is tested
  // in parent on each call, for efficiency. No needs to test here again.
  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
      ch === state.input.charCodeAt(_position + 1) &&
      ch === state.input.charCodeAt(_position + 2)) {

    _position += 3;

    ch = state.input.charCodeAt(_position);

    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }

  return false;
}

function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += ' ';
  } else if (count > 1) {
    state.result += common.repeat('\n', count - 1);
  }
}


function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding,
      following,
      captureStart,
      captureEnd,
      hasPendingContent,
      _line,
      _lineStart,
      _lineIndent,
      _kind = state.kind,
      _result = state.result,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (is_WS_OR_EOL(ch)      ||
      is_FLOW_INDICATOR(ch) ||
      ch === 0x23/* # */    ||
      ch === 0x26/* & */    ||
      ch === 0x2A/* * */    ||
      ch === 0x21/* ! */    ||
      ch === 0x7C/* | */    ||
      ch === 0x3E/* > */    ||
      ch === 0x27/* ' */    ||
      ch === 0x22/* " */    ||
      ch === 0x25/* % */    ||
      ch === 0x40/* @ */    ||
      ch === 0x60/* ` */) {
    return false;
  }

  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
    following = state.input.charCodeAt(state.position + 1);

    if (is_WS_OR_EOL(following) ||
        withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }

  state.kind = 'scalar';
  state.result = '';
  captureStart = captureEnd = state.position;
  hasPendingContent = false;

  while (ch !== 0) {
    if (ch === 0x3A/* : */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following) ||
          withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }

    } else if (ch === 0x23/* # */) {
      preceding = state.input.charCodeAt(state.position - 1);

      if (is_WS_OR_EOL(preceding)) {
        break;
      }

    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;

    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);

      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }

    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }

    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }

    ch = state.input.charCodeAt(++state.position);
  }

  captureSegment(state, captureStart, captureEnd, false);

  if (state.result) {
    return true;
  }

  state.kind = _kind;
  state.result = _result;
  return false;
}

function readSingleQuotedScalar(state, nodeIndent) {
  var ch,
      captureStart, captureEnd;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x27/* ' */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x27/* ' */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (ch === 0x27/* ' */) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a single quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a single quoted scalar');
}

function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart,
      captureEnd,
      hexLength,
      hexResult,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x22/* " */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x22/* " */) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;

    } else if (ch === 0x5C/* \ */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);

        // TODO: rework to inline fn with no type cast?
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;

      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;

        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);

          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;

          } else {
            throwError(state, 'expected hexadecimal character');
          }
        }

        state.result += charFromCodepoint(hexResult);

        state.position++;

      } else {
        throwError(state, 'unknown escape sequence');
      }

      captureStart = captureEnd = state.position;

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a double quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a double quoted scalar');
}

function readFlowCollection(state, nodeIndent) {
  var readNext = true,
      _line,
      _lineStart,
      _pos,
      _tag     = state.tag,
      _result,
      _anchor  = state.anchor,
      following,
      terminator,
      isPair,
      isExplicitPair,
      isMapping,
      overridableKeys = Object.create(null),
      keyNode,
      keyTag,
      valueNode,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x5B/* [ */) {
    terminator = 0x5D;/* ] */
    isMapping = false;
    _result = [];
  } else if (ch === 0x7B/* { */) {
    terminator = 0x7D;/* } */
    isMapping = true;
    _result = {};
  } else {
    return false;
  }

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(++state.position);

  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? 'mapping' : 'sequence';
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, 'missed comma between flow collection entries');
    } else if (ch === 0x2C/* , */) {
      // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
      throwError(state, "expected the node content, but found ','");
    }

    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;

    if (ch === 0x3F/* ? */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }

    _line = state.line; // Save the current line.
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }

    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }

    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x2C/* , */) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }

  throwError(state, 'unexpected end of the stream within a flow collection');
}

function readBlockScalar(state, nodeIndent) {
  var captureStart,
      folding,
      chomping       = CHOMPING_CLIP,
      didReadContent = false,
      detectedIndent = false,
      textIndent     = nodeIndent,
      emptyLines     = 0,
      atMoreIndented = false,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x7C/* | */) {
    folding = false;
  } else if (ch === 0x3E/* > */) {
    folding = true;
  } else {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';

  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);

    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
      if (CHOMPING_CLIP === chomping) {
        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, 'repeat of a chomping mode identifier');
      }

    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, 'repeat of an indentation width identifier');
      }

    } else {
      break;
    }
  }

  if (is_WHITE_SPACE(ch)) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (is_WHITE_SPACE(ch));

    if (ch === 0x23/* # */) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (!is_EOL(ch) && (ch !== 0));
    }
  }

  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;

    ch = state.input.charCodeAt(state.position);

    while ((!detectedIndent || state.lineIndent < textIndent) &&
           (ch === 0x20/* Space */)) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }

    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }

    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }

    // End of the scalar.
    if (state.lineIndent < textIndent) {

      // Perform the chomping.
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) { // i.e. only if the scalar is not empty.
          state.result += '\n';
        }
      }

      // Break this `while` cycle and go to the funciton's epilogue.
      break;
    }

    // Folded style: use fancy rules to handle line breaks.
    if (folding) {

      // Lines starting with white space characters (more-indented lines) are not folded.
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        // except for the first content line (cf. Example 8.1)
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

      // End of more-indented block.
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat('\n', emptyLines + 1);

      // Just one line break - perceive as the same line.
      } else if (emptyLines === 0) {
        if (didReadContent) { // i.e. only if we have already read some scalar content.
          state.result += ' ';
        }

      // Several line breaks - perceive as different lines.
      } else {
        state.result += common.repeat('\n', emptyLines);
      }

    // Literal style: just add exact number of line breaks between content lines.
    } else {
      // Keep all line breaks except the header line break.
      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
    }

    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;

    while (!is_EOL(ch) && (ch !== 0)) {
      ch = state.input.charCodeAt(++state.position);
    }

    captureSegment(state, captureStart, state.position, false);
  }

  return true;
}

function readBlockSequence(state, nodeIndent) {
  var _line,
      _tag      = state.tag,
      _anchor   = state.anchor,
      _result   = [],
      following,
      detected  = false,
      ch;

  // there is a leading tab before this token, so it can't be a block sequence/mapping;
  // it can still be flow sequence/mapping or a scalar
  if (state.firstTabInLine !== -1) return false;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, 'tab characters must not be used in indentation');
    }

    if (ch !== 0x2D/* - */) {
      break;
    }

    following = state.input.charCodeAt(state.position + 1);

    if (!is_WS_OR_EOL(following)) {
      break;
    }

    detected = true;
    state.position++;

    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }

    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a sequence entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'sequence';
    state.result = _result;
    return true;
  }
  return false;
}

function readBlockMapping(state, nodeIndent, flowIndent) {
  var following,
      allowCompact,
      _line,
      _keyLine,
      _keyLineStart,
      _keyPos,
      _tag          = state.tag,
      _anchor       = state.anchor,
      _result       = {},
      overridableKeys = Object.create(null),
      keyTag        = null,
      keyNode       = null,
      valueNode     = null,
      atExplicitKey = false,
      detected      = false,
      ch;

  // there is a leading tab before this token, so it can't be a block sequence/mapping;
  // it can still be flow sequence/mapping or a scalar
  if (state.firstTabInLine !== -1) return false;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, 'tab characters must not be used in indentation');
    }

    following = state.input.charCodeAt(state.position + 1);
    _line = state.line; // Save the current line.

    //
    // Explicit notation case. There are two separate blocks:
    // first for the key (denoted by "?") and second for the value (denoted by ":")
    //
    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

      if (ch === 0x3F/* ? */) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }

        detected = true;
        atExplicitKey = true;
        allowCompact = true;

      } else if (atExplicitKey) {
        // i.e. 0x3A/* : */ === character after the explicit key.
        atExplicitKey = false;
        allowCompact = true;

      } else {
        throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
      }

      state.position += 1;
      ch = following;

    //
    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
    //
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;

      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        // Neither implicit nor explicit notation.
        // Reading is done. Go to the epilogue.
        break;
      }

      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);

        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        if (ch === 0x3A/* : */) {
          ch = state.input.charCodeAt(++state.position);

          if (!is_WS_OR_EOL(ch)) {
            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
          }

          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }

          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;

        } else if (detected) {
          throwError(state, 'can not read an implicit mapping pair; a colon is missed');

        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }

      } else if (detected) {
        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true; // Keep the result of `composeNode`.
      }
    }

    //
    // Common reading code for both explicit and implicit notations.
    //
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }

      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }

      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }

      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a mapping entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  //
  // Epilogue.
  //

  // Special case: last mapping's node contains only the key in explicit notation.
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }

  // Expose the resulting mapping.
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'mapping';
    state.result = _result;
  }

  return detected;
}

function readTagProperty(state) {
  var _position,
      isVerbatim = false,
      isNamed    = false,
      tagHandle,
      tagName,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x21/* ! */) return false;

  if (state.tag !== null) {
    throwError(state, 'duplication of a tag property');
  }

  ch = state.input.charCodeAt(++state.position);

  if (ch === 0x3C/* < */) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);

  } else if (ch === 0x21/* ! */) {
    isNamed = true;
    tagHandle = '!!';
    ch = state.input.charCodeAt(++state.position);

  } else {
    tagHandle = '!';
  }

  _position = state.position;

  if (isVerbatim) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (ch !== 0 && ch !== 0x3E/* > */);

    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, 'unexpected end of the stream within a verbatim tag');
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {

      if (ch === 0x21/* ! */) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);

          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, 'named tag handle cannot contain such characters');
          }

          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, 'tag suffix cannot contain exclamation marks');
        }
      }

      ch = state.input.charCodeAt(++state.position);
    }

    tagName = state.input.slice(_position, state.position);

    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, 'tag suffix cannot contain flow indicator characters');
    }
  }

  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, 'tag name cannot contain such characters: ' + tagName);
  }

  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, 'tag name is malformed: ' + tagName);
  }

  if (isVerbatim) {
    state.tag = tagName;

  } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;

  } else if (tagHandle === '!') {
    state.tag = '!' + tagName;

  } else if (tagHandle === '!!') {
    state.tag = 'tag:yaml.org,2002:' + tagName;

  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }

  return true;
}

function readAnchorProperty(state) {
  var _position,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x26/* & */) return false;

  if (state.anchor !== null) {
    throwError(state, 'duplication of an anchor property');
  }

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an anchor node must contain at least one character');
  }

  state.anchor = state.input.slice(_position, state.position);
  return true;
}

function readAlias(state) {
  var _position, alias,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x2A/* * */) return false;

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an alias node must contain at least one character');
  }

  alias = state.input.slice(_position, state.position);

  if (!_hasOwnProperty.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }

  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}

function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles,
      allowBlockScalars,
      allowBlockCollections,
      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
      atNewLine  = false,
      hasContent = false,
      typeIndex,
      typeQuantity,
      typeList,
      type,
      flowIndent,
      blockIndent;

  if (state.listener !== null) {
    state.listener('open', state);
  }

  state.tag    = null;
  state.anchor = null;
  state.kind   = null;
  state.result = null;

  allowBlockStyles = allowBlockScalars = allowBlockCollections =
    CONTEXT_BLOCK_OUT === nodeContext ||
    CONTEXT_BLOCK_IN  === nodeContext;

  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;

      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }

  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;

        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }

  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }

  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }

    blockIndent = state.position - state.lineStart;

    if (indentStatus === 1) {
      if (allowBlockCollections &&
          (readBlockSequence(state, blockIndent) ||
           readBlockMapping(state, blockIndent, flowIndent)) ||
          readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
            readSingleQuotedScalar(state, flowIndent) ||
            readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;

        } else if (readAlias(state)) {
          hasContent = true;

          if (state.tag !== null || state.anchor !== null) {
            throwError(state, 'alias node should not have any properties');
          }

        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;

          if (state.tag === null) {
            state.tag = '?';
          }
        }

        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      // Special case: block sequences are allowed to have same indentation level as the parent.
      // http://www.yaml.org/spec/1.2/spec.html#id2799784
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }

  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }

  } else if (state.tag === '?') {
    // Implicit resolving is not allowed for non-scalar types, and '?'
    // non-specific tag is only automatically assigned to plain scalars.
    //
    // We only need to check kind conformity in case user explicitly assigns '?'
    // tag, for example like this: "!<?> [0]"
    //
    if (state.result !== null && state.kind !== 'scalar') {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }

    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type = state.implicitTypes[typeIndex];

      if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
        state.result = type.construct(state.result);
        state.tag = type.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== '!') {
    if (_hasOwnProperty.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
      type = state.typeMap[state.kind || 'fallback'][state.tag];
    } else {
      // looking for multi type
      type = null;
      typeList = state.typeMap.multi[state.kind || 'fallback'];

      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type = typeList[typeIndex];
          break;
        }
      }
    }

    if (!type) {
      throwError(state, 'unknown tag !<' + state.tag + '>');
    }

    if (state.result !== null && type.kind !== state.kind) {
      throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
    }

    if (!type.resolve(state.result, state.tag)) { // `state.result` updated in resolver if matched
      throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
    } else {
      state.result = type.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }

  if (state.listener !== null) {
    state.listener('close', state);
  }
  return state.tag !== null ||  state.anchor !== null || hasContent;
}

function readDocument(state) {
  var documentStart = state.position,
      _position,
      directiveName,
      directiveArgs,
      hasDirectives = false,
      ch;

  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = Object.create(null);
  state.anchorMap = Object.create(null);

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
      break;
    }

    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];

    if (directiveName.length < 1) {
      throwError(state, 'directive name must not be less than one character in length');
    }

    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      if (ch === 0x23/* # */) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (ch !== 0 && !is_EOL(ch));
        break;
      }

      if (is_EOL(ch)) break;

      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      directiveArgs.push(state.input.slice(_position, state.position));
    }

    if (ch !== 0) readLineBreak(state);

    if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }

  skipSeparationSpace(state, true, -1);

  if (state.lineIndent === 0 &&
      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);

  } else if (hasDirectives) {
    throwError(state, 'directives end mark is expected');
  }

  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);

  if (state.checkLineBreaks &&
      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
  }

  state.documents.push(state.result);

  if (state.position === state.lineStart && testDocumentSeparator(state)) {

    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }

  if (state.position < (state.length - 1)) {
    throwError(state, 'end of the stream or a document separator is expected');
  } else {
    return;
  }
}


function loadDocuments(input, options) {
  input = String(input);
  options = options || {};

  if (input.length !== 0) {

    // Add tailing `\n` if not exists
    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
      input += '\n';
    }

    // Strip BOM
    if (input.charCodeAt(0) === 0xFEFF) {
      input = input.slice(1);
    }
  }

  var state = new State(input, options);

  var nullpos = input.indexOf('\0');

  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, 'null byte is not allowed in input');
  }

  // Use 0 as string terminator. That significantly simplifies bounds check.
  state.input += '\0';

  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
    state.lineIndent += 1;
    state.position += 1;
  }

  while (state.position < (state.length - 1)) {
    readDocument(state);
  }

  return state.documents;
}


function loadAll(input, iterator, options) {
  if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
    options = iterator;
    iterator = null;
  }

  var documents = loadDocuments(input, options);

  if (typeof iterator !== 'function') {
    return documents;
  }

  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}


function load(input, options) {
  var documents = loadDocuments(input, options);

  if (documents.length === 0) {
    /*eslint-disable no-undefined*/
    return undefined;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new YAMLException('expected a single document in the stream, but found more');
}


module.exports.loadAll = loadAll;
module.exports.load    = load;


/***/ }),

/***/ 1082:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/*eslint-disable max-len*/

var YAMLException = __nccwpck_require__(8179);
var Type          = __nccwpck_require__(6073);


function compileList(schema, name, result) {
  var exclude = [];

  schema[name].forEach(function (currentType) {
    result.forEach(function (previousType, previousIndex) {
      if (previousType.tag === currentType.tag &&
          previousType.kind === currentType.kind &&
          previousType.multi === currentType.multi) {

        exclude.push(previousIndex);
      }
    });

    result.push(currentType);
  });

  return result.filter(function (type, index) {
    return exclude.indexOf(index) === -1;
  });
}


function compileMap(/* lists... */) {
  var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
          scalar: [],
          sequence: [],
          mapping: [],
          fallback: []
        }
      }, index, length;

  function collectType(type) {
    if (type.multi) {
      result.multi[type.kind].push(type);
      result.multi['fallback'].push(type);
    } else {
      result[type.kind][type.tag] = result['fallback'][type.tag] = type;
    }
  }

  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}


function Schema(definition) {
  return this.extend(definition);
}


Schema.prototype.extend = function extend(definition) {
  var implicit = [];
  var explicit = [];

  if (definition instanceof Type) {
    // Schema.extend(type)
    explicit.push(definition);

  } else if (Array.isArray(definition)) {
    // Schema.extend([ type1, type2, ... ])
    explicit = explicit.concat(definition);

  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);

  } else {
    throw new YAMLException('Schema.extend argument should be a Type, [ Type ], ' +
      'or a schema definition ({ implicit: [...], explicit: [...] })');
  }

  implicit.forEach(function (type) {
    if (!(type instanceof Type)) {
      throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }

    if (type.loadKind && type.loadKind !== 'scalar') {
      throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
    }

    if (type.multi) {
      throw new YAMLException('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
    }
  });

  explicit.forEach(function (type) {
    if (!(type instanceof Type)) {
      throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }
  });

  var result = Object.create(Schema.prototype);

  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);

  result.compiledImplicit = compileList(result, 'implicit', []);
  result.compiledExplicit = compileList(result, 'explicit', []);
  result.compiledTypeMap  = compileMap(result.compiledImplicit, result.compiledExplicit);

  return result;
};


module.exports = Schema;


/***/ }),

/***/ 2011:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Standard YAML's Core schema.
// http://www.yaml.org/spec/1.2/spec.html#id2804923
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, Core schema has no distinctions from JSON schema is JS-YAML.





module.exports = __nccwpck_require__(1035);


/***/ }),

/***/ 8759:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// JS-YAML's default schema for `safeLoad` function.
// It is not described in the YAML specification.
//
// This schema is based on standard YAML's Core schema and includes most of
// extra types described at YAML tag repository. (http://yaml.org/type/)





module.exports = __nccwpck_require__(2011).extend({
  implicit: [
    __nccwpck_require__(9212),
    __nccwpck_require__(6104)
  ],
  explicit: [
    __nccwpck_require__(7900),
    __nccwpck_require__(9046),
    __nccwpck_require__(6860),
    __nccwpck_require__(9548)
  ]
});


/***/ }),

/***/ 8562:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Standard YAML's Failsafe schema.
// http://www.yaml.org/spec/1.2/spec.html#id2802346





var Schema = __nccwpck_require__(1082);


module.exports = new Schema({
  explicit: [
    __nccwpck_require__(3619),
    __nccwpck_require__(7283),
    __nccwpck_require__(6150)
  ]
});


/***/ }),

/***/ 1035:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Standard YAML's JSON schema.
// http://www.yaml.org/spec/1.2/spec.html#id2803231
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, this schema is not such strict as defined in the YAML specification.
// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.





module.exports = __nccwpck_require__(8562).extend({
  implicit: [
    __nccwpck_require__(721),
    __nccwpck_require__(4993),
    __nccwpck_require__(1615),
    __nccwpck_require__(2705)
  ]
});


/***/ }),

/***/ 6975:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";



var common = __nccwpck_require__(6829);


// get snippet for a single line, respecting maxLength
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = '';
  var tail = '';
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;

  if (position - lineStart > maxHalfLength) {
    head = ' ... ';
    lineStart = position - maxHalfLength + head.length;
  }

  if (lineEnd - position > maxHalfLength) {
    tail = ' ...';
    lineEnd = position + maxHalfLength - tail.length;
  }

  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, '→') + tail,
    pos: position - lineStart + head.length // relative position
  };
}


function padStart(string, max) {
  return common.repeat(' ', max - string.length) + string;
}


function makeSnippet(mark, options) {
  options = Object.create(options || null);

  if (!mark.buffer) return null;

  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent      !== 'number') options.indent      = 1;
  if (typeof options.linesBefore !== 'number') options.linesBefore = 3;
  if (typeof options.linesAfter  !== 'number') options.linesAfter  = 2;

  var re = /\r?\n|\r|\0/g;
  var lineStarts = [ 0 ];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;

  while ((match = re.exec(mark.buffer))) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);

    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }

  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;

  var result = '', i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);

  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(' ', options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) +
      ' | ' + line.str + '\n' + result;
  }

  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(' ', options.indent) + padStart((mark.line + 1).toString(), lineNoLength) +
    ' | ' + line.str + '\n';
  result += common.repeat('-', options.indent + lineNoLength + 3 + line.pos) + '^' + '\n';

  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(' ', options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) +
      ' | ' + line.str + '\n';
  }

  return result.replace(/\n$/, '');
}


module.exports = makeSnippet;


/***/ }),

/***/ 6073:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var YAMLException = __nccwpck_require__(8179);

var TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'multi',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'representName',
  'defaultStyle',
  'styleAliases'
];

var YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
];

function compileStyleAliases(map) {
  var result = {};

  if (map !== null) {
    Object.keys(map).forEach(function (style) {
      map[style].forEach(function (alias) {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

function Type(tag, options) {
  options = options || {};

  Object.keys(options).forEach(function (name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });

  // TODO: Add tag format check.
  this.tag           = tag;
  this.kind          = options['kind']          || null;
  this.resolve       = options['resolve']       || function () { return true; };
  this.construct     = options['construct']     || function (data) { return data; };
  this.instanceOf    = options['instanceOf']    || null;
  this.predicate     = options['predicate']     || null;
  this.represent     = options['represent']     || null;
  this.representName = options['representName'] || null;
  this.defaultStyle  = options['defaultStyle']  || null;
  this.multi         = options['multi']         || false;
  this.styleAliases  = compileStyleAliases(options['styleAliases'] || null);

  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}

module.exports = Type;


/***/ }),

/***/ 7900:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/*eslint-disable no-bitwise*/


var Type = __nccwpck_require__(6073);


// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


function resolveYamlBinary(data) {
  if (data === null) return false;

  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

  // Convert one by one.
  for (idx = 0; idx < max; idx++) {
    code = map.indexOf(data.charAt(idx));

    // Skip CR/LF
    if (code > 64) continue;

    // Fail on illegal characters
    if (code < 0) return false;

    bitlen += 6;
  }

  // If there are any bits left, source was corrupted
  return (bitlen % 8) === 0;
}

function constructYamlBinary(data) {
  var idx, tailbits,
      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max = input.length,
      map = BASE64_MAP,
      bits = 0,
      result = [];

  // Collect by 6*4 bits (3 bytes)

  for (idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    }

    bits = (bits << 6) | map.indexOf(input.charAt(idx));
  }

  // Dump tail

  tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    result.push((bits >> 16) & 0xFF);
    result.push((bits >> 8) & 0xFF);
    result.push(bits & 0xFF);
  } else if (tailbits === 18) {
    result.push((bits >> 10) & 0xFF);
    result.push((bits >> 2) & 0xFF);
  } else if (tailbits === 12) {
    result.push((bits >> 4) & 0xFF);
  }

  return new Uint8Array(result);
}

function representYamlBinary(object /*, style*/) {
  var result = '', bits = 0, idx, tail,
      max = object.length,
      map = BASE64_MAP;

  // Convert every three bytes to 4 ASCII characters.

  for (idx = 0; idx < max; idx++) {
    if ((idx % 3 === 0) && idx) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    }

    bits = (bits << 8) + object[idx];
  }

  // Dump tail

  tail = max % 3;

  if (tail === 0) {
    result += map[(bits >> 18) & 0x3F];
    result += map[(bits >> 12) & 0x3F];
    result += map[(bits >> 6) & 0x3F];
    result += map[bits & 0x3F];
  } else if (tail === 2) {
    result += map[(bits >> 10) & 0x3F];
    result += map[(bits >> 4) & 0x3F];
    result += map[(bits << 2) & 0x3F];
    result += map[64];
  } else if (tail === 1) {
    result += map[(bits >> 2) & 0x3F];
    result += map[(bits << 4) & 0x3F];
    result += map[64];
    result += map[64];
  }

  return result;
}

function isBinary(obj) {
  return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
}

module.exports = new Type('tag:yaml.org,2002:binary', {
  kind: 'scalar',
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});


/***/ }),

/***/ 4993:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Type = __nccwpck_require__(6073);

function resolveYamlBoolean(data) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data) {
  return data === 'true' ||
         data === 'True' ||
         data === 'TRUE';
}

function isBoolean(object) {
  return Object.prototype.toString.call(object) === '[object Boolean]';
}

module.exports = new Type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object) { return object ? 'true' : 'false'; },
    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 2705:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var common = __nccwpck_require__(6829);
var Type   = __nccwpck_require__(6073);

var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
  // .2e4, .2
  // special case, seems not from spec
  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
  // .inf
  '|[-+]?\\.(?:inf|Inf|INF)' +
  // .nan
  '|\\.(?:nan|NaN|NAN))$');

function resolveYamlFloat(data) {
  if (data === null) return false;

  if (!YAML_FLOAT_PATTERN.test(data) ||
      // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === '_') {
    return false;
  }

  return true;
}

function constructYamlFloat(data) {
  var value, sign;

  value  = data.replace(/_/g, '').toLowerCase();
  sign   = value[0] === '-' ? -1 : 1;

  if ('+-'.indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }

  if (value === '.inf') {
    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

  } else if (value === '.nan') {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}


var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

function representYamlFloat(object, style) {
  var res;

  if (isNaN(object)) {
    switch (style) {
      case 'lowercase': return '.nan';
      case 'uppercase': return '.NAN';
      case 'camelcase': return '.NaN';
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '.inf';
      case 'uppercase': return '.INF';
      case 'camelcase': return '.Inf';
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '-.inf';
      case 'uppercase': return '-.INF';
      case 'camelcase': return '-.Inf';
    }
  } else if (common.isNegativeZero(object)) {
    return '-0.0';
  }

  res = object.toString(10);

  // JS stringifier can build scientific format without dots: 5e-100,
  // while YAML requres dot: 5.e-100. Fix it with simple hack

  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}

function isFloat(object) {
  return (Object.prototype.toString.call(object) === '[object Number]') &&
         (object % 1 !== 0 || common.isNegativeZero(object));
}

module.exports = new Type('tag:yaml.org,2002:float', {
  kind: 'scalar',
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 1615:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var common = __nccwpck_require__(6829);
var Type   = __nccwpck_require__(6073);

function isHexCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
}

function isOctCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
}

function isDecCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
}

function resolveYamlInteger(data) {
  if (data === null) return false;

  var max = data.length,
      index = 0,
      hasDigits = false,
      ch;

  if (!max) return false;

  ch = data[index];

  // sign
  if (ch === '-' || ch === '+') {
    ch = data[++index];
  }

  if (ch === '0') {
    // 0
    if (index + 1 === max) return true;
    ch = data[++index];

    // base 2, base 8, base 16

    if (ch === 'b') {
      // base 2
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (ch !== '0' && ch !== '1') return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'x') {
      // base 16
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'o') {
      // base 8
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }
  }

  // base 10 (except 0)

  // value should not start with `_`;
  if (ch === '_') return false;

  for (; index < max; index++) {
    ch = data[index];
    if (ch === '_') continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }

  // Should have digits and should not end with `_`
  if (!hasDigits || ch === '_') return false;

  return true;
}

function constructYamlInteger(data) {
  var value = data, sign = 1, ch;

  if (value.indexOf('_') !== -1) {
    value = value.replace(/_/g, '');
  }

  ch = value[0];

  if (ch === '-' || ch === '+') {
    if (ch === '-') sign = -1;
    value = value.slice(1);
    ch = value[0];
  }

  if (value === '0') return 0;

  if (ch === '0') {
    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
    if (value[1] === 'x') return sign * parseInt(value.slice(2), 16);
    if (value[1] === 'o') return sign * parseInt(value.slice(2), 8);
  }

  return sign * parseInt(value, 10);
}

function isInteger(object) {
  return (Object.prototype.toString.call(object)) === '[object Number]' &&
         (object % 1 === 0 && !common.isNegativeZero(object));
}

module.exports = new Type('tag:yaml.org,2002:int', {
  kind: 'scalar',
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
    octal:       function (obj) { return obj >= 0 ? '0o'  + obj.toString(8) : '-0o'  + obj.toString(8).slice(1); },
    decimal:     function (obj) { return obj.toString(10); },
    /* eslint-disable max-len */
    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
  },
  defaultStyle: 'decimal',
  styleAliases: {
    binary:      [ 2,  'bin' ],
    octal:       [ 8,  'oct' ],
    decimal:     [ 10, 'dec' ],
    hexadecimal: [ 16, 'hex' ]
  }
});


/***/ }),

/***/ 6150:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Type = __nccwpck_require__(6073);

module.exports = new Type('tag:yaml.org,2002:map', {
  kind: 'mapping',
  construct: function (data) { return data !== null ? data : {}; }
});


/***/ }),

/***/ 6104:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Type = __nccwpck_require__(6073);

function resolveYamlMerge(data) {
  return data === '<<' || data === null;
}

module.exports = new Type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});


/***/ }),

/***/ 721:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Type = __nccwpck_require__(6073);

function resolveYamlNull(data) {
  if (data === null) return true;

  var max = data.length;

  return (max === 1 && data === '~') ||
         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
}

function constructYamlNull() {
  return null;
}

function isNull(object) {
  return object === null;
}

module.exports = new Type('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function () { return '~';    },
    lowercase: function () { return 'null'; },
    uppercase: function () { return 'NULL'; },
    camelcase: function () { return 'Null'; },
    empty:     function () { return '';     }
  },
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 9046:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Type = __nccwpck_require__(6073);

var _hasOwnProperty = Object.prototype.hasOwnProperty;
var _toString       = Object.prototype.toString;

function resolveYamlOmap(data) {
  if (data === null) return true;

  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
      object = data;

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;

    if (_toString.call(pair) !== '[object Object]') return false;

    for (pairKey in pair) {
      if (_hasOwnProperty.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }

    if (!pairHasKey) return false;

    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }

  return true;
}

function constructYamlOmap(data) {
  return data !== null ? data : [];
}

module.exports = new Type('tag:yaml.org,2002:omap', {
  kind: 'sequence',
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});


/***/ }),

/***/ 6860:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Type = __nccwpck_require__(6073);

var _toString = Object.prototype.toString;

function resolveYamlPairs(data) {
  if (data === null) return true;

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    if (_toString.call(pair) !== '[object Object]') return false;

    keys = Object.keys(pair);

    if (keys.length !== 1) return false;

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return true;
}

function constructYamlPairs(data) {
  if (data === null) return [];

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    keys = Object.keys(pair);

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return result;
}

module.exports = new Type('tag:yaml.org,2002:pairs', {
  kind: 'sequence',
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});


/***/ }),

/***/ 7283:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Type = __nccwpck_require__(6073);

module.exports = new Type('tag:yaml.org,2002:seq', {
  kind: 'sequence',
  construct: function (data) { return data !== null ? data : []; }
});


/***/ }),

/***/ 9548:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Type = __nccwpck_require__(6073);

var _hasOwnProperty = Object.prototype.hasOwnProperty;

function resolveYamlSet(data) {
  if (data === null) return true;

  var key, object = data;

  for (key in object) {
    if (_hasOwnProperty.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }

  return true;
}

function constructYamlSet(data) {
  return data !== null ? data : {};
}

module.exports = new Type('tag:yaml.org,2002:set', {
  kind: 'mapping',
  resolve: resolveYamlSet,
  construct: constructYamlSet
});


/***/ }),

/***/ 3619:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Type = __nccwpck_require__(6073);

module.exports = new Type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: function (data) { return data !== null ? data : ''; }
});


/***/ }),

/***/ 9212:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Type = __nccwpck_require__(6073);

var YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

var YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}

function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0,
      delta = null, tz_hour, tz_minute, date;

  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

  if (match === null) throw new Error('Date resolve error');

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(Date.UTC(year, month, day));
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if (match[9] === '-') delta = -delta;
  }

  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

  if (delta) date.setTime(date.getTime() - delta);

  return date;
}

function representYamlTimestamp(object /*, style*/) {
  return object.toISOString();
}

module.exports = new Type('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});


/***/ }),

/***/ 467:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Stream = _interopDefault(__nccwpck_require__(2413));
var http = _interopDefault(__nccwpck_require__(8605));
var Url = _interopDefault(__nccwpck_require__(8835));
var https = _interopDefault(__nccwpck_require__(7211));
var zlib = _interopDefault(__nccwpck_require__(8761));

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = __nccwpck_require__(2877).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

module.exports = exports = fetch;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = exports;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.FetchError = FetchError;


/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var wrappy = __nccwpck_require__(2940)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 4294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(4219);


/***/ }),

/***/ 4219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(1631);
var tls = __nccwpck_require__(4016);
var http = __nccwpck_require__(8605);
var https = __nccwpck_require__(7211);
var events = __nccwpck_require__(8614);
var assert = __nccwpck_require__(2357);
var util = __nccwpck_require__(1669);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 5030:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function getUserAgent() {
  if (typeof navigator === "object" && "userAgent" in navigator) {
    return navigator.userAgent;
  }

  if (typeof process === "object" && "version" in process) {
    return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
  }

  return "<environment undetectable>";
}

exports.getUserAgent = getUserAgent;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 2940:
/***/ ((module) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 2877:
/***/ ((module) => {

module.exports = eval("require")("encoding");


/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 1631:
/***/ ((module) => {

"use strict";
module.exports = require("net");;

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 4016:
/***/ ((module) => {

"use strict";
module.exports = require("tls");;

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __nccwpck_require__(3109);
/******/ })()
;
//# sourceMappingURL=index.js.map