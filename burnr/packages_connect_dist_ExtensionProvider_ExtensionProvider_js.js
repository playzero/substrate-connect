"use strict";
(self["webpackChunk_substrate_burnr"] = self["webpackChunk_substrate_burnr"] || []).push([["packages_connect_dist_ExtensionProvider_ExtensionProvider_js"],{

/***/ "../../packages/connect/dist/ExtensionProvider/ExtensionProvider.js":
/*!**************************************************************************!*\
  !*** ../../packages/connect/dist/ExtensionProvider/ExtensionProvider.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtensionProvider": () => (/* binding */ ExtensionProvider)
/* harmony export */ });
/* harmony import */ var _polkadot_rpc_provider_coder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @polkadot/rpc-provider/coder */ "../../node_modules/@polkadot/rpc-provider/coder/index.js");
/* harmony import */ var _polkadot_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @polkadot/util */ "../../node_modules/@polkadot/util/logger.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "../../node_modules/eventemitter3/index.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/index.js */ "../../packages/connect/dist/utils/index.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors.js */ "../../packages/connect/dist/errors.js");
/* harmony import */ var _specs_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../specs/index.js */ "../../packages/connect/dist/specs/index.js");
/* harmony import */ var _getRandomChainId_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getRandomChainId.js */ "../../packages/connect/dist/ExtensionProvider/getRandomChainId.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _ExtensionProvider_instances, _ExtensionProvider_coder, _ExtensionProvider_eventemitter, _ExtensionProvider_handlers, _ExtensionProvider_subscriptions, _ExtensionProvider_waitingForId, _ExtensionProvider_chainId, _ExtensionProvider_connectionStatePingerId, _ExtensionProvider_isConnected, _ExtensionProvider_chainSpecs, _ExtensionProvider_parachainSpecs, _ExtensionProvider_handleMessage, _ExtensionProvider_onMessageResult, _ExtensionProvider_onMessageSubscribe, _ExtensionProvider_simulateLifecycle, _ExtensionProvider_checkClientPeercount, _ExtensionProvider_addChain;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */









var EXTENSION_ORIGIN = "substrate-connect-extension";
var CLIENT_ORIGIN = "substrate-connect-client";
var l = (0,_polkadot_util__WEBPACK_IMPORTED_MODULE_5__.logger)(CLIENT_ORIGIN);
var ANGLICISMS = {
  chain_finalisedHead: "chain_finalizedHead",
  chain_subscribeFinalisedHeads: "chain_subscribeFinalizedHeads",
  chain_unsubscribeFinalisedHeads: "chain_unsubscribeFinalizedHeads"
};
/*
 * Number of milliseconds to wait between checks to see if we have any
 * connected peers in the smoldot client
 */

var CONNECTION_STATE_PINGER_INTERVAL = 2000;

var sendMessage = function sendMessage(msg) {
  window.postMessage(msg, "*");
};

var createChain = function createChain(specMsg) {
  return new Promise(function (res, rej) {
    var waitForChainCb = function waitForChainCb(_ref) {
      var data = _ref.data;

      if (data.origin !== EXTENSION_ORIGIN || data.chainId !== specMsg.chainId) {
        return;
      }

      window.removeEventListener("message", waitForChainCb);
      if (data.type === "chain-ready") return res();
      rej(new Error(data.type === "error" ? data.errorMessage : "Unexpected message received from the extension while waiting for 'chain-ready' message"));
    };

    window.addEventListener("message", waitForChainCb);
    sendMessage(specMsg);
  });
};
/**
 * The ExtensionProvider allows interacting with a smoldot-based WASM light
 * client running in a browser extension.  It is not designed to be used
 * directly.  You should use the `\@substrate/connect` package.
 */


var ExtensionProvider = /*#__PURE__*/function () {
  function ExtensionProvider(relayChain, parachain) {
    var _this = this;

    _classCallCheck(this, ExtensionProvider);

    _ExtensionProvider_instances.add(this);

    _ExtensionProvider_coder.set(this, new _polkadot_rpc_provider_coder__WEBPACK_IMPORTED_MODULE_6__.RpcCoder());

    _ExtensionProvider_eventemitter.set(this, new eventemitter3__WEBPACK_IMPORTED_MODULE_0__());

    _ExtensionProvider_handlers.set(this, {});

    _ExtensionProvider_subscriptions.set(this, {});

    _ExtensionProvider_waitingForId.set(this, {});

    _ExtensionProvider_chainId.set(this, void 0);

    _ExtensionProvider_connectionStatePingerId.set(this, void 0);

    _ExtensionProvider_isConnected.set(this, false);

    _ExtensionProvider_chainSpecs.set(this, void 0);

    _ExtensionProvider_parachainSpecs.set(this, void 0);
    /*
     * How frequently to see if we have any peers
     */


    this.healthPingerInterval = CONNECTION_STATE_PINGER_INTERVAL;

    _ExtensionProvider_handleMessage.set(this, function (data) {
      var type = data.type;

      if (type === "error") {
        __classPrivateFieldSet(_this, _ExtensionProvider_isConnected, false, "f");

        var error = new Error(data.errorMessage);

        _this.emit("error", error); // reject all hanging requests


        (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.eraseRecord)(__classPrivateFieldGet(_this, _ExtensionProvider_handlers, "f"), function (h) {
          return h.callback(error, undefined);
        });
        (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.eraseRecord)(__classPrivateFieldGet(_this, _ExtensionProvider_waitingForId, "f"));
        return;
      }

      if (type === "rpc" && data.jsonRpcMessage) {
        l.debug(function () {
          return ["received", data.jsonRpcMessage];
        });
        var response = JSON.parse(data.jsonRpcMessage);
        return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(response.method) ? __classPrivateFieldGet(_this, _ExtensionProvider_onMessageResult, "f").call(_this, response) : __classPrivateFieldGet(_this, _ExtensionProvider_onMessageSubscribe, "f").call(_this, response);
      }

      var errorMessage = "Unrecognised message type from extension ".concat(type);
      return _this.emit("error", new Error(errorMessage));
    });

    _ExtensionProvider_onMessageResult.set(this, function (response) {
      var handler = __classPrivateFieldGet(_this, _ExtensionProvider_handlers, "f")[response.id];

      if (!handler) {
        l.debug(function () {
          return "Unable to find handler for id=".concat(response.id);
        });
        return;
      }

      try {
        var method = handler.method,
            subscription = handler.subscription;

        var result = __classPrivateFieldGet(_this, _ExtensionProvider_coder, "f").decodeResponse(response); // first send the result - in case of subs, we may have an update
        // immediately if we have some queued results already


        handler.callback(null, result);

        if (subscription) {
          var subId = "".concat(subscription.type, "::").concat(result);
          __classPrivateFieldGet(_this, _ExtensionProvider_subscriptions, "f")[subId] = _objectSpread(_objectSpread({}, subscription), {}, {
            method: method
          }); // if we have a result waiting for this subscription already

          if (__classPrivateFieldGet(_this, _ExtensionProvider_waitingForId, "f")[subId]) {
            __classPrivateFieldGet(_this, _ExtensionProvider_onMessageSubscribe, "f").call(_this, __classPrivateFieldGet(_this, _ExtensionProvider_waitingForId, "f")[subId]);
          }
        }
      } catch (error) {
        handler.callback(error, undefined);
      }

      delete __classPrivateFieldGet(_this, _ExtensionProvider_handlers, "f")[response.id];
    });

    _ExtensionProvider_onMessageSubscribe.set(this, function (response) {
      var method = ANGLICISMS[response.method] || response.method || "invalid";
      var subId = "".concat(method, "::").concat(response.params.subscription);

      var handler = __classPrivateFieldGet(_this, _ExtensionProvider_subscriptions, "f")[subId];

      if (!handler) {
        // store the response, we could have out-of-order subid coming in
        __classPrivateFieldGet(_this, _ExtensionProvider_waitingForId, "f")[subId] = response;
        l.debug(function () {
          return "Unable to find handler for subscription=".concat(subId, " responseId=").concat(response.id);
        });
        return;
      } // housekeeping


      delete __classPrivateFieldGet(_this, _ExtensionProvider_waitingForId, "f")[subId];

      try {
        var result = __classPrivateFieldGet(_this, _ExtensionProvider_coder, "f").decodeResponse(response);

        handler.callback(null, result);
      } catch (error) {
        handler.callback(error, undefined);
      }
    });

    _ExtensionProvider_simulateLifecycle.set(this, function (health) {
      // development chains should not have peers so we only emit connected
      // once and never disconnect
      if (health.shouldHavePeers == false) {
        if (!__classPrivateFieldGet(_this, _ExtensionProvider_isConnected, "f")) {
          __classPrivateFieldSet(_this, _ExtensionProvider_isConnected, true, "f");

          _this.emit("connected");

          l.debug("emitted CONNECTED");
          return;
        }

        return;
      }

      var peerCount = health.peers;
      var peerChecks = (peerCount > 0 || !health.shouldHavePeers) && !health.isSyncing;
      l.debug("Simulating lifecylce events from system_health");
      l.debug("isConnected: ".concat(__classPrivateFieldGet(_this, _ExtensionProvider_isConnected, "f").toString(), ", new peerCount: ").concat(peerCount));

      if (__classPrivateFieldGet(_this, _ExtensionProvider_isConnected, "f") && peerChecks) {
        // still connected
        return;
      }

      if (__classPrivateFieldGet(_this, _ExtensionProvider_isConnected, "f") && peerCount === 0) {
        __classPrivateFieldSet(_this, _ExtensionProvider_isConnected, false, "f");

        _this.emit("disconnected");

        l.debug("emitted DISCONNECTED");
        return;
      }

      if (!__classPrivateFieldGet(_this, _ExtensionProvider_isConnected, "f") && peerChecks) {
        __classPrivateFieldSet(_this, _ExtensionProvider_isConnected, true, "f");

        _this.emit("connected");

        l.debug("emitted CONNECTED");
        return;
      } // still not connected

    });

    _ExtensionProvider_checkClientPeercount.set(this, function () {
      _this.send("system_health", []).then(__classPrivateFieldGet(_this, _ExtensionProvider_simulateLifecycle, "f"))["catch"](function (error) {
        return _this.emit("error", new _errors_js__WEBPACK_IMPORTED_MODULE_2__.HealthCheckError(error));
      });
    });

    __classPrivateFieldSet(this, _ExtensionProvider_chainSpecs, relayChain, "f");

    __classPrivateFieldSet(this, _ExtensionProvider_connectionStatePingerId, null, "f");

    __classPrivateFieldSet(this, _ExtensionProvider_parachainSpecs, "", "f");

    if (parachain) {
      __classPrivateFieldSet(this, _ExtensionProvider_parachainSpecs, parachain, "f");
    }

    __classPrivateFieldSet(this, _ExtensionProvider_chainId, (0,_getRandomChainId_js__WEBPACK_IMPORTED_MODULE_4__.getRandomChainId)(), "f");
  }
  /**
   * Lets polkadot-js know we support subscriptions
   *
   * @remarks Always returns `true` - this provider supports subscriptions.
   * PolkadotJS uses this internally.
   */


  _createClass(ExtensionProvider, [{
    key: "hasSubscriptions",
    get: function get() {
      return true;
    }
    /**
     * clone
     *
     * @remarks This method is not supported
     * @throws {@link Error}
     */

  }, {
    key: "clone",
    value: function clone() {
      throw new Error("clone() is not supported.");
    }
    /**
     * "Connect" to the extension - sends a message to the `ExtensionMessageRouter`
     * asking it to connect to the extension background.
     *
     * @returns a resolved Promise
     * @remarks this is async to fulfill the interface with PolkadotJS
     */

  }, {
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var error;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return __classPrivateFieldGet(this, _ExtensionProvider_instances, "m", _ExtensionProvider_addChain).call(this);

              case 3:
                _context.next = 11;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);
                error = _context.t0 instanceof Error ? _context.t0 : new Error("An unnexpected error happened while trying to connect. ".concat(_context.t0));
                this.emit("error", error);
                (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.eraseRecord)(__classPrivateFieldGet(this, _ExtensionProvider_handlers, "f"), function (h) {
                  return h.callback(error, undefined);
                });
                return _context.abrupt("return");

              case 11:
                window.addEventListener("message", function (_ref2) {
                  var data = _ref2.data;

                  if (data.origin === EXTENSION_ORIGIN && data.chainId === __classPrivateFieldGet(_this2, _ExtensionProvider_chainId, "f")) {
                    __classPrivateFieldGet(_this2, _ExtensionProvider_handleMessage, "f").call(_this2, data);
                  }
                });

                __classPrivateFieldSet(this, _ExtensionProvider_connectionStatePingerId, setInterval(__classPrivateFieldGet(this, _ExtensionProvider_checkClientPeercount, "f"), this.healthPingerInterval), "f");

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
    /**
     * Manually "disconnect" - sends a message to the `ExtensionMessageRouter`
     * telling it to disconnect the port with the background manager.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      if (__classPrivateFieldGet(this, _ExtensionProvider_connectionStatePingerId, "f") !== null) {
        clearInterval(__classPrivateFieldGet(this, _ExtensionProvider_connectionStatePingerId, "f"));
      }

      sendMessage({
        origin: CLIENT_ORIGIN,
        chainId: __classPrivateFieldGet(this, _ExtensionProvider_chainId, "f"),
        type: "remove-chain"
      });

      __classPrivateFieldSet(this, _ExtensionProvider_isConnected, false, "f");

      this.emit("disconnected");
      return Promise.resolve();
    }
    /**
     * Whether the node is connected or not.
     *
     * @returns true - if connected otherwise false
     */

  }, {
    key: "isConnected",
    get: function get() {
      return __classPrivateFieldGet(this, _ExtensionProvider_isConnected, "f");
    }
    /**
     * Listen to provider events - in practice the smoldot provider only
     * emits a `connected` event after successfully starting the smoldot client
     * and `disconnected` after `disconnect` is called.
     * @param type - Event
     * @param sub - Callback
     */

  }, {
    key: "on",
    value: function on(type, sub) {
      var _this3 = this;

      __classPrivateFieldGet(this, _ExtensionProvider_eventemitter, "f").on(type, sub);

      return function () {
        __classPrivateFieldGet(_this3, _ExtensionProvider_eventemitter, "f").removeListener(type, sub);
      };
    }
    /**
     * Send an RPC request  the wasm client
     *
     * @param method - The RPC methods to execute
     * @param params - Encoded paramaters as applicable for the method
     * @param subscription - Subscription details (internally used by `subscribe`)
     */

  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(method, params, isCacheable, subscription) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  var json = __classPrivateFieldGet(_this4, _ExtensionProvider_coder, "f").encodeJson(method, params);

                  var id = __classPrivateFieldGet(_this4, _ExtensionProvider_coder, "f").getId();

                  var callback = function callback(error, result) {
                    error ? reject(error) : resolve(result);
                  };

                  l.debug(function () {
                    return ["calling", method, json];
                  });
                  __classPrivateFieldGet(_this4, _ExtensionProvider_handlers, "f")[id] = {
                    callback: callback,
                    method: method,
                    subscription: subscription
                  };
                  var rpcMsg = {
                    origin: CLIENT_ORIGIN,
                    chainId: __classPrivateFieldGet(_this4, _ExtensionProvider_chainId, "f"),
                    type: "rpc",
                    jsonRpcMessage: json
                  };
                  sendMessage(rpcMsg);
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function send(_x, _x2, _x3, _x4) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
    /**
     * Allows subscribing to a specific event.
     *
     * @param type     - Subscription type
     * @param method   - Subscription method
     * @param params   - Parameters
     * @param callback - Callback
     * @returns Promise  - resolves to the id of the subscription you can use with [[unsubscribe]].
     *
     * @example
     * <BR>
     *
     * ```javascript
     * const provider = new ExtensionProvider(client);
     * const rpc = new Rpc(provider);
     *
     * rpc.state.subscribeStorage([[storage.balances.freeBalance, <Address>]], (_, values) => {
     *   console.log(values)
     * }).then((subscriptionId) => {
     *   console.log('balance changes subscription id: ', subscriptionId)
     * })
     * ```
     */

  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3( // the "method" property of the JSON response to this subscription
      type, // the "method" property of the JSON request to register the subscription
      method, params, callback) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.send(method, params, false, {
                  callback: callback,
                  type: type
                });

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function subscribe(_x5, _x6, _x7, _x8) {
        return _subscribe.apply(this, arguments);
      }

      return subscribe;
    }()
    /**
     * Allows unsubscribing to subscriptions made with [[subscribe]].
     *
     * @param type   - Subscription type
     * @param method - Subscription method
     * @param id     - Id passed for send parameter
     * @returns Promise resolving to whether the unsunscribe request was successful.
     */

  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(type, method, id) {
        var subscription;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                subscription = "".concat(type, "::").concat(id);

                if (!(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(__classPrivateFieldGet(this, _ExtensionProvider_subscriptions, "f")[subscription])) {
                  _context4.next = 4;
                  break;
                }

                l.debug(function () {
                  return "Unable to find active subscription=".concat(subscription);
                });
                return _context4.abrupt("return", false);

              case 4:
                delete __classPrivateFieldGet(this, _ExtensionProvider_subscriptions, "f")[subscription];
                _context4.next = 7;
                return this.send(method, [id]);

              case 7:
                return _context4.abrupt("return", _context4.sent);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function unsubscribe(_x9, _x10, _x11) {
        return _unsubscribe.apply(this, arguments);
      }

      return unsubscribe;
    }()
  }, {
    key: "emit",
    value: function emit(type) {
      var _classPrivateFieldGe;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_classPrivateFieldGe = __classPrivateFieldGet(this, _ExtensionProvider_eventemitter, "f")).emit.apply(_classPrivateFieldGe, [type].concat(args));
    }
  }]);

  return ExtensionProvider;
}();
_ExtensionProvider_coder = new WeakMap(), _ExtensionProvider_eventemitter = new WeakMap(), _ExtensionProvider_handlers = new WeakMap(), _ExtensionProvider_subscriptions = new WeakMap(), _ExtensionProvider_waitingForId = new WeakMap(), _ExtensionProvider_chainId = new WeakMap(), _ExtensionProvider_connectionStatePingerId = new WeakMap(), _ExtensionProvider_isConnected = new WeakMap(), _ExtensionProvider_chainSpecs = new WeakMap(), _ExtensionProvider_parachainSpecs = new WeakMap(), _ExtensionProvider_handleMessage = new WeakMap(), _ExtensionProvider_onMessageResult = new WeakMap(), _ExtensionProvider_onMessageSubscribe = new WeakMap(), _ExtensionProvider_simulateLifecycle = new WeakMap(), _ExtensionProvider_checkClientPeercount = new WeakMap(), _ExtensionProvider_instances = new WeakSet(), _ExtensionProvider_addChain = /*#__PURE__*/function () {
  var _ExtensionProvider_addChain2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var specMsg;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            specMsg = _objectSpread({
              origin: CLIENT_ORIGIN,
              chainId: __classPrivateFieldGet(this, _ExtensionProvider_parachainSpecs, "f") ? (0,_getRandomChainId_js__WEBPACK_IMPORTED_MODULE_4__.getRandomChainId)() : __classPrivateFieldGet(this, _ExtensionProvider_chainId, "f")
            }, _specs_index_js__WEBPACK_IMPORTED_MODULE_3__.SupportedChains[__classPrivateFieldGet(this, _ExtensionProvider_chainSpecs, "f")] ? {
              type: "add-well-known-chain",
              chainName: __classPrivateFieldGet(this, _ExtensionProvider_chainSpecs, "f")
            } : {
              type: "add-chain",
              chainSpec: __classPrivateFieldGet(this, _ExtensionProvider_chainSpecs, "f"),
              potentialRelayChainIds: []
            });
            _context5.next = 3;
            return createChain(specMsg);

          case 3:
            if (__classPrivateFieldGet(this, _ExtensionProvider_parachainSpecs, "f")) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return");

          case 5:
            _context5.next = 7;
            return createChain({
              origin: CLIENT_ORIGIN,
              chainId: __classPrivateFieldGet(this, _ExtensionProvider_chainId, "f"),
              type: "add-chain",
              chainSpec: __classPrivateFieldGet(this, _ExtensionProvider_parachainSpecs, "f"),
              potentialRelayChainIds: [specMsg.chainId]
            });

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  function _ExtensionProvider_addChain() {
    return _ExtensionProvider_addChain2.apply(this, arguments);
  }

  return _ExtensionProvider_addChain;
}();

/***/ }),

/***/ "../../packages/connect/dist/ExtensionProvider/getRandomChainId.js":
/*!*************************************************************************!*\
  !*** ../../packages/connect/dist/ExtensionProvider/getRandomChainId.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomChainId": () => (/* binding */ getRandomChainId)
/* harmony export */ });
function getRandomChainId() {
  var arr = new BigUint64Array(2); // It can only be used from the browser, so this is fine.

  crypto.getRandomValues(arr);
  var result = arr[1] << BigInt(64) | arr[0];
  return result.toString(36);
}

/***/ }),

/***/ "../../packages/connect/dist/errors.js":
/*!*********************************************!*\
  !*** ../../packages/connect/dist/errors.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HealthCheckError": () => (/* binding */ HealthCheckError)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _HealthCheckError_cause;

var HealthCheckError = /*#__PURE__*/function (_Error) {
  _inherits(HealthCheckError, _Error);

  var _super = _createSuper(HealthCheckError);

  function HealthCheckError(response) {
    var _this;

    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Got error response asking for system health";

    _classCallCheck(this, HealthCheckError);

    _this = _super.call(this, message);

    _HealthCheckError_cause.set(_assertThisInitialized(_this), void 0);

    __classPrivateFieldSet(_assertThisInitialized(_this), _HealthCheckError_cause, response, "f"); // 'Error' breaks the prototype chain - restore it


    Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof HealthCheckError ? this.constructor : void 0).prototype);
    return _this;
  }

  _createClass(HealthCheckError, [{
    key: "getCause",
    value: function getCause() {
      return __classPrivateFieldGet(this, _HealthCheckError_cause, "f");
    }
  }]);

  return HealthCheckError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
_HealthCheckError_cause = new WeakMap();

/***/ }),

/***/ "../../packages/connect/dist/utils/index.js":
/*!**************************************************!*\
  !*** ../../packages/connect/dist/utils/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined),
/* harmony export */   "eraseRecord": () => (/* binding */ eraseRecord)
/* harmony export */ });
var isUndefined = function isUndefined(value) {
  return typeof value === "undefined";
};

function eraseRecord(record, cb) {
  Object.keys(record).forEach(function (key) {
    if (cb) {
      cb(record[key]);
    }

    delete record[key];
  });
}



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZXNfY29ubmVjdF9kaXN0X0V4dGVuc2lvblByb3ZpZGVyX0V4dGVuc2lvblByb3ZpZGVyX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7OztBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBRUEsSUFBTSxnQkFBZ0IsR0FBRyw2QkFBekI7QUFDQSxJQUFNLGFBQWEsR0FBRywwQkFBdEI7QUFFQSxJQUFNLENBQUMsR0FBRyxzREFBTSxDQUFDLGFBQUQsQ0FBaEI7QUEyQkEsSUFBTSxVQUFVLEdBQWdDO0FBQzlDLHFCQUFtQixFQUFFLHFCQUR5QjtBQUU5QywrQkFBNkIsRUFBRSwrQkFGZTtBQUc5QyxpQ0FBK0IsRUFBRTtBQUhhLENBQWhEO0FBTUE7OztBQUdHOztBQUNILElBQU0sZ0NBQWdDLEdBQUcsSUFBekM7O0FBRUEsSUFBTSxXQUFXLEdBQUcsU0FBZCxXQUFjLENBQUMsR0FBRCxFQUEyQjtBQUM3QyxRQUFNLENBQUMsV0FBUCxDQUFtQixHQUFuQixFQUF3QixHQUF4QjtBQUNELENBRkQ7O0FBSUEsSUFBTSxXQUFXLEdBQUcsU0FBZCxXQUFjLENBQ2xCLE9BRGtCO0FBQUEsU0FLbEIsSUFBSSxPQUFKLENBQWtCLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYTtBQUM3QixRQUFNLGNBQWMsR0FBRyxTQUFqQixjQUFpQixPQUEwQztBQUFBLFVBQXZDLElBQXVDLFFBQXZDLElBQXVDOztBQUMvRCxVQUNFLElBQUksQ0FBQyxNQUFMLEtBQWdCLGdCQUFoQixJQUNBLElBQUksQ0FBQyxPQUFMLEtBQWlCLE9BQU8sQ0FBQyxPQUYzQixFQUdFO0FBQ0E7QUFDRDs7QUFFRCxZQUFNLENBQUMsbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsY0FBdEM7QUFFQSxVQUFJLElBQUksQ0FBQyxJQUFMLEtBQWMsYUFBbEIsRUFBaUMsT0FBTyxHQUFH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T0FBdUQsdUVBQTdDLDZDQUE2Qzs7QUFBQTs7QUFFdkQsOEJBQU0sT0FBTjs7QUFWRjs7QUFXRSwwREFBSSx1QkFBSixFQUFjLFFBQWQsRUFBc0IsR0FBdEIsRUFIdUQsQ0FJdkQ7OztBQUNBLFVBQU0sQ0FBQyxjQUFQLGdDQUE0QiwrREFBVyxTQUF2QztBQUx1RDtBQU14RDs7QUFmSDtBQUFBO0FBQUEsV0FHRSxvQkFBUTtBQUNOLGFBQU8sNkJBQUksdUJBQUosRUFBSSxHQUFKLENBQVA7QUFDRDtBQUxIOztBQUFBO0FBQUEsaUNBQXNDLEtBQXRDOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxXQUFXLEdBQUcsU0FBZCxXQUFjLENBQUMsS0FBRCxFQUF3QztBQUMxRCxTQUFPLE9BQU8sS0FBUCxLQUFpQixXQUF4QjtBQUNELENBRkQ7O0FBSUEsU0FBUyxXQUFULENBQ0UsTUFERixFQUVFLEVBRkYsRUFFd0I7QUFFdEIsUUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFaLEVBQW9CLE9BQXBCLENBQTRCLFVBQUMsR0FBRCxFQUFjO0FBQ3hDLFFBQUksRUFBSixFQUFRO0FBQ04sUUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFELENBQVAsQ0FBRjtBQUNEOztBQUVELFdBQU8sTUFBTSxDQUFDLEdBQUQsQ0FBYjtBQUNELEdBTkQ7QUFPRCIsInNvdXJjZXMiOlsid2VicGFjazovL0BzdWJzdHJhdGUvYnVybnIvLi4vLi4vc3JjL0V4dGVuc2lvblByb3ZpZGVyL0V4dGVuc2lvblByb3ZpZGVyLnRzIiwid2VicGFjazovL0BzdWJzdHJhdGUvYnVybnIvLi4vLi4vc3JjL0V4dGVuc2lvblByb3ZpZGVyL2dldFJhbmRvbUNoYWluSWQudHMiLCJ3ZWJwYWNrOi8vQHN1YnN0cmF0ZS9idXJuci8uLi9zcmMvZXJyb3JzLnRzIiwid2VicGFjazovL0BzdWJzdHJhdGUvYnVybnIvLi4vLi4vc3JjL3V0aWxzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn07XG52YXIgX19jbGFzc1ByaXZhdGVGaWVsZEdldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZEdldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufTtcbnZhciBfRXh0ZW5zaW9uUHJvdmlkZXJfaW5zdGFuY2VzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29kZXIsIF9FeHRlbnNpb25Qcm92aWRlcl9ldmVudGVtaXR0ZXIsIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVycywgX0V4dGVuc2lvblByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIF9FeHRlbnNpb25Qcm92aWRlcl93YWl0aW5nRm9ySWQsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpbklkLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluU3BlY3MsIF9FeHRlbnNpb25Qcm92aWRlcl9wYXJhY2hhaW5TcGVjcywgX0V4dGVuc2lvblByb3ZpZGVyX2hhbmRsZU1lc3NhZ2UsIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VSZXN1bHQsIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUsIF9FeHRlbnNpb25Qcm92aWRlcl9zaW11bGF0ZUxpZmVjeWNsZSwgX0V4dGVuc2lvblByb3ZpZGVyX2NoZWNrQ2xpZW50UGVlcmNvdW50LCBfRXh0ZW5zaW9uUHJvdmlkZXJfYWRkQ2hhaW47XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3MgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudCAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuaW1wb3J0IHsgUnBjQ29kZXIgfSBmcm9tIFwiQHBvbGthZG90L3JwYy1wcm92aWRlci9jb2RlclwiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIkBwb2xrYWRvdC91dGlsXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudGVtaXR0ZXIzXCI7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCwgZXJhc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcbmltcG9ydCB7IEhlYWx0aENoZWNrRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzLmpzXCI7XG5pbXBvcnQgeyBTdXBwb3J0ZWRDaGFpbnMgfSBmcm9tIFwiLi4vc3BlY3MvaW5kZXguanNcIjtcbmltcG9ydCB7IGdldFJhbmRvbUNoYWluSWQgfSBmcm9tIFwiLi9nZXRSYW5kb21DaGFpbklkLmpzXCI7XG5jb25zdCBFWFRFTlNJT05fT1JJR0lOID0gXCJzdWJzdHJhdGUtY29ubmVjdC1leHRlbnNpb25cIjtcbmNvbnN0IENMSUVOVF9PUklHSU4gPSBcInN1YnN0cmF0ZS1jb25uZWN0LWNsaWVudFwiO1xuY29uc3QgbCA9IGxvZ2dlcihDTElFTlRfT1JJR0lOKTtcbmNvbnN0IEFOR0xJQ0lTTVMgPSB7XG4gICAgY2hhaW5fZmluYWxpc2VkSGVhZDogXCJjaGFpbl9maW5hbGl6ZWRIZWFkXCIsXG4gICAgY2hhaW5fc3Vic2NyaWJlRmluYWxpc2VkSGVhZHM6IFwiY2hhaW5fc3Vic2NyaWJlRmluYWxpemVkSGVhZHNcIixcbiAgICBjaGFpbl91bnN1YnNjcmliZUZpbmFsaXNlZEhlYWRzOiBcImNoYWluX3Vuc3Vic2NyaWJlRmluYWxpemVkSGVhZHNcIixcbn07XG4vKlxuICogTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJldHdlZW4gY2hlY2tzIHRvIHNlZSBpZiB3ZSBoYXZlIGFueVxuICogY29ubmVjdGVkIHBlZXJzIGluIHRoZSBzbW9sZG90IGNsaWVudFxuICovXG5jb25zdCBDT05ORUNUSU9OX1NUQVRFX1BJTkdFUl9JTlRFUlZBTCA9IDIwMDA7XG5jb25zdCBzZW5kTWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICB3aW5kb3cucG9zdE1lc3NhZ2UobXNnLCBcIipcIik7XG59O1xuY29uc3QgY3JlYXRlQ2hhaW4gPSAoc3BlY01zZykgPT4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgY29uc3Qgd2FpdEZvckNoYWluQ2IgPSAoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgaWYgKGRhdGEub3JpZ2luICE9PSBFWFRFTlNJT05fT1JJR0lOIHx8XG4gICAgICAgICAgICBkYXRhLmNoYWluSWQgIT09IHNwZWNNc2cuY2hhaW5JZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB3YWl0Rm9yQ2hhaW5DYik7XG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT09IFwiY2hhaW4tcmVhZHlcIilcbiAgICAgICAgICAgIHJldHVybiByZXMoKTtcbiAgICAgICAgcmVqKG5ldyBFcnJvcihkYXRhLnR5cGUgPT09IFwiZXJyb3JcIlxuICAgICAgICAgICAgPyBkYXRhLmVycm9yTWVzc2FnZVxuICAgICAgICAgICAgOiBcIlVuZXhwZWN0ZWQgbWVzc2FnZSByZWNlaXZlZCBmcm9tIHRoZSBleHRlbnNpb24gd2hpbGUgd2FpdGluZyBmb3IgJ2NoYWluLXJlYWR5JyBtZXNzYWdlXCIpKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB3YWl0Rm9yQ2hhaW5DYik7XG4gICAgc2VuZE1lc3NhZ2Uoc3BlY01zZyk7XG59KTtcbi8qKlxuICogVGhlIEV4dGVuc2lvblByb3ZpZGVyIGFsbG93cyBpbnRlcmFjdGluZyB3aXRoIGEgc21vbGRvdC1iYXNlZCBXQVNNIGxpZ2h0XG4gKiBjbGllbnQgcnVubmluZyBpbiBhIGJyb3dzZXIgZXh0ZW5zaW9uLiAgSXQgaXMgbm90IGRlc2lnbmVkIHRvIGJlIHVzZWRcbiAqIGRpcmVjdGx5LiAgWW91IHNob3VsZCB1c2UgdGhlIGBcXEBzdWJzdHJhdGUvY29ubmVjdGAgcGFja2FnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4dGVuc2lvblByb3ZpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihyZWxheUNoYWluLCBwYXJhY2hhaW4pIHtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2luc3RhbmNlcy5hZGQodGhpcyk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9jb2Rlci5zZXQodGhpcywgbmV3IFJwY0NvZGVyKCkpO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfZXZlbnRlbWl0dGVyLnNldCh0aGlzLCBuZXcgRXZlbnRFbWl0dGVyKCkpO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlcnMuc2V0KHRoaXMsIHt9KTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX3N1YnNjcmlwdGlvbnMuc2V0KHRoaXMsIHt9KTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX3dhaXRpbmdGb3JJZC5zZXQodGhpcywge30pO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5JZC5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQuc2V0KHRoaXMsIGZhbHNlKTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluU3BlY3Muc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9wYXJhY2hhaW5TcGVjcy5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgLypcbiAgICAgICAgICogSG93IGZyZXF1ZW50bHkgdG8gc2VlIGlmIHdlIGhhdmUgYW55IHBlZXJzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhlYWx0aFBpbmdlckludGVydmFsID0gQ09OTkVDVElPTl9TVEFURV9QSU5HRVJfSU5URVJWQUw7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVNZXNzYWdlLnNldCh0aGlzLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyB0eXBlIH0gPSBkYXRhO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXJyb3JcIikge1xuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCBmYWxzZSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGRhdGEuZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgLy8gcmVqZWN0IGFsbCBoYW5naW5nIHJlcXVlc3RzXG4gICAgICAgICAgICAgICAgZXJhc2VSZWNvcmQoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlcnMsIFwiZlwiKSwgKGgpID0+IGguY2FsbGJhY2soZXJyb3IsIHVuZGVmaW5lZCkpO1xuICAgICAgICAgICAgICAgIGVyYXNlUmVjb3JkKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3dhaXRpbmdGb3JJZCwgXCJmXCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJycGNcIiAmJiBkYXRhLmpzb25ScGNNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBbXCJyZWNlaXZlZFwiLCBkYXRhLmpzb25ScGNNZXNzYWdlXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKGRhdGEuanNvblJwY01lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1VuZGVmaW5lZChyZXNwb25zZS5tZXRob2QpXG4gICAgICAgICAgICAgICAgICAgID8gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfb25NZXNzYWdlUmVzdWx0LCBcImZcIikuY2FsbCh0aGlzLCByZXNwb25zZSlcbiAgICAgICAgICAgICAgICAgICAgOiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUsIFwiZlwiKS5jYWxsKHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBVbnJlY29nbmlzZWQgbWVzc2FnZSB0eXBlIGZyb20gZXh0ZW5zaW9uICR7dHlwZX1gO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImVycm9yXCIsIG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VSZXN1bHQuc2V0KHRoaXMsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2hhbmRsZXJzLCBcImZcIilbcmVzcG9uc2UuaWRdO1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlciBmb3IgaWQ9JHtyZXNwb25zZS5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbWV0aG9kLCBzdWJzY3JpcHRpb24gfSA9IGhhbmRsZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29kZXIsIFwiZlwiKS5kZWNvZGVSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gZmlyc3Qgc2VuZCB0aGUgcmVzdWx0IC0gaW4gY2FzZSBvZiBzdWJzLCB3ZSBtYXkgaGF2ZSBhbiB1cGRhdGVcbiAgICAgICAgICAgICAgICAvLyBpbW1lZGlhdGVseSBpZiB3ZSBoYXZlIHNvbWUgcXVldWVkIHJlc3VsdHMgYWxyZWFkeVxuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YklkID0gYCR7c3Vic2NyaXB0aW9uLnR5cGV9Ojoke3Jlc3VsdH1gO1xuICAgICAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9zdWJzY3JpcHRpb25zLCBcImZcIilbc3ViSWRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3Vic2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgcmVzdWx0IHdhaXRpbmcgZm9yIHRoaXMgc3Vic2NyaXB0aW9uIGFscmVhZHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3dhaXRpbmdGb3JJZCwgXCJmXCIpW3N1YklkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfb25NZXNzYWdlU3Vic2NyaWJlLCBcImZcIikuY2FsbCh0aGlzLCBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl93YWl0aW5nRm9ySWQsIFwiZlwiKVtzdWJJZF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsYmFjayhlcnJvciwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVycywgXCJmXCIpW3Jlc3BvbnNlLmlkXTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUuc2V0KHRoaXMsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gQU5HTElDSVNNU1tyZXNwb25zZS5tZXRob2RdIHx8IHJlc3BvbnNlLm1ldGhvZCB8fCBcImludmFsaWRcIjtcbiAgICAgICAgICAgIGNvbnN0IHN1YklkID0gYCR7bWV0aG9kfTo6JHtyZXNwb25zZS5wYXJhbXMuc3Vic2NyaXB0aW9ufWA7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfc3Vic2NyaXB0aW9ucywgXCJmXCIpW3N1YklkXTtcbiAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIC8vIHN0b3JlIHRoZSByZXNwb25zZSwgd2UgY291bGQgaGF2ZSBvdXQtb2Ytb3JkZXIgc3ViaWQgY29taW5nIGluXG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBcImZcIilbc3ViSWRdID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlciBmb3Igc3Vic2NyaXB0aW9uPSR7c3ViSWR9IHJlc3BvbnNlSWQ9JHtyZXNwb25zZS5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBob3VzZWtlZXBpbmdcbiAgICAgICAgICAgIGRlbGV0ZSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl93YWl0aW5nRm9ySWQsIFwiZlwiKVtzdWJJZF07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NvZGVyLCBcImZcIikuZGVjb2RlUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2soZXJyb3IsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfc2ltdWxhdGVMaWZlY3ljbGUuc2V0KHRoaXMsIChoZWFsdGgpID0+IHtcbiAgICAgICAgICAgIC8vIGRldmVsb3BtZW50IGNoYWlucyBzaG91bGQgbm90IGhhdmUgcGVlcnMgc28gd2Ugb25seSBlbWl0IGNvbm5lY3RlZFxuICAgICAgICAgICAgLy8gb25jZSBhbmQgbmV2ZXIgZGlzY29ubmVjdFxuICAgICAgICAgICAgaWYgKGhlYWx0aC5zaG91bGRIYXZlUGVlcnMgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQsIHRydWUsIFwiZlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwiY29ubmVjdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICBsLmRlYnVnKGBlbWl0dGVkIENPTk5FQ1RFRGApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBlZXJDb3VudCA9IGhlYWx0aC5wZWVycztcbiAgICAgICAgICAgIGNvbnN0IHBlZXJDaGVja3MgPSAocGVlckNvdW50ID4gMCB8fCAhaGVhbHRoLnNob3VsZEhhdmVQZWVycykgJiYgIWhlYWx0aC5pc1N5bmNpbmc7XG4gICAgICAgICAgICBsLmRlYnVnKGBTaW11bGF0aW5nIGxpZmVjeWxjZSBldmVudHMgZnJvbSBzeXN0ZW1faGVhbHRoYCk7XG4gICAgICAgICAgICBsLmRlYnVnKGBpc0Nvbm5lY3RlZDogJHtfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpLnRvU3RyaW5nKCl9LCBuZXcgcGVlckNvdW50OiAke3BlZXJDb3VudH1gKTtcbiAgICAgICAgICAgIGlmIChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpICYmIHBlZXJDaGVja3MpIHtcbiAgICAgICAgICAgICAgICAvLyBzdGlsbCBjb25uZWN0ZWRcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQsIFwiZlwiKSAmJiBwZWVyQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgZmFsc2UsIFwiZlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJkaXNjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZyhgZW1pdHRlZCBESVNDT05ORUNURURgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikgJiYgcGVlckNoZWNrcykge1xuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCB0cnVlLCBcImZcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwiY29ubmVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIGwuZGVidWcoYGVtaXR0ZWQgQ09OTkVDVEVEYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc3RpbGwgbm90IGNvbm5lY3RlZFxuICAgICAgICB9KTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2NoZWNrQ2xpZW50UGVlcmNvdW50LnNldCh0aGlzLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmQoXCJzeXN0ZW1faGVhbHRoXCIsIFtdKVxuICAgICAgICAgICAgICAgIC50aGVuKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3NpbXVsYXRlTGlmZWN5Y2xlLCBcImZcIikpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IEhlYWx0aENoZWNrRXJyb3IoZXJyb3IpKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpblNwZWNzLCByZWxheUNoYWluLCBcImZcIik7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBudWxsLCBcImZcIik7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBcIlwiLCBcImZcIik7XG4gICAgICAgIGlmIChwYXJhY2hhaW4pIHtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBwYXJhY2hhaW4sIFwiZlwiKTtcbiAgICAgICAgfVxuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpbklkLCBnZXRSYW5kb21DaGFpbklkKCksIFwiZlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGV0cyBwb2xrYWRvdC1qcyBrbm93IHdlIHN1cHBvcnQgc3Vic2NyaXB0aW9uc1xuICAgICAqXG4gICAgICogQHJlbWFya3MgQWx3YXlzIHJldHVybnMgYHRydWVgIC0gdGhpcyBwcm92aWRlciBzdXBwb3J0cyBzdWJzY3JpcHRpb25zLlxuICAgICAqIFBvbGthZG90SlMgdXNlcyB0aGlzIGludGVybmFsbHkuXG4gICAgICovXG4gICAgZ2V0IGhhc1N1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjbG9uZVxuICAgICAqXG4gICAgICogQHJlbWFya3MgVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZFxuICAgICAqIEB0aHJvd3Mge0BsaW5rIEVycm9yfVxuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbG9uZSgpIGlzIG5vdCBzdXBwb3J0ZWQuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcIkNvbm5lY3RcIiB0byB0aGUgZXh0ZW5zaW9uIC0gc2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBgRXh0ZW5zaW9uTWVzc2FnZVJvdXRlcmBcbiAgICAgKiBhc2tpbmcgaXQgdG8gY29ubmVjdCB0byB0aGUgZXh0ZW5zaW9uIGJhY2tncm91bmQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhIHJlc29sdmVkIFByb21pc2VcbiAgICAgKiBAcmVtYXJrcyB0aGlzIGlzIGFzeW5jIHRvIGZ1bGZpbGwgdGhlIGludGVyZmFjZSB3aXRoIFBvbGthZG90SlNcbiAgICAgKi9cbiAgICBhc3luYyBjb25uZWN0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaW5zdGFuY2VzLCBcIm1cIiwgX0V4dGVuc2lvblByb3ZpZGVyX2FkZENoYWluKS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IGUgaW5zdGFuY2VvZiBFcnJvclxuICAgICAgICAgICAgICAgID8gZVxuICAgICAgICAgICAgICAgIDogbmV3IEVycm9yKGBBbiB1bm5leHBlY3RlZCBlcnJvciBoYXBwZW5lZCB3aGlsZSB0cnlpbmcgdG8gY29ubmVjdC4gJHtlfWApO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgZXJhc2VSZWNvcmQoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlcnMsIFwiZlwiKSwgKGgpID0+IGguY2FsbGJhY2soZXJyb3IsIHVuZGVmaW5lZCkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhLm9yaWdpbiA9PT0gRVhURU5TSU9OX09SSUdJTiAmJlxuICAgICAgICAgICAgICAgIGRhdGEuY2hhaW5JZCA9PT0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5JZCwgXCJmXCIpKSB7XG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlTWVzc2FnZSwgXCJmXCIpLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCwgc2V0SW50ZXJ2YWwoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hlY2tDbGllbnRQZWVyY291bnQsIFwiZlwiKSwgdGhpcy5oZWFsdGhQaW5nZXJJbnRlcnZhbCksIFwiZlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWFudWFsbHkgXCJkaXNjb25uZWN0XCIgLSBzZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIGBFeHRlbnNpb25NZXNzYWdlUm91dGVyYFxuICAgICAqIHRlbGxpbmcgaXQgdG8gZGlzY29ubmVjdCB0aGUgcG9ydCB3aXRoIHRoZSBiYWNrZ3JvdW5kIG1hbmFnZXIuXG4gICAgICovXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBcImZcIikgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQsIFwiZlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgb3JpZ2luOiBDTElFTlRfT1JJR0lOLFxuICAgICAgICAgICAgY2hhaW5JZDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5JZCwgXCJmXCIpLFxuICAgICAgICAgICAgdHlwZTogXCJyZW1vdmUtY2hhaW5cIixcbiAgICAgICAgfSk7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCBmYWxzZSwgXCJmXCIpO1xuICAgICAgICB0aGlzLmVtaXQoXCJkaXNjb25uZWN0ZWRcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgbm9kZSBpcyBjb25uZWN0ZWQgb3Igbm90LlxuICAgICAqXG4gICAgICogQHJldHVybnMgdHJ1ZSAtIGlmIGNvbm5lY3RlZCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICBnZXQgaXNDb25uZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gcHJvdmlkZXIgZXZlbnRzIC0gaW4gcHJhY3RpY2UgdGhlIHNtb2xkb3QgcHJvdmlkZXIgb25seVxuICAgICAqIGVtaXRzIGEgYGNvbm5lY3RlZGAgZXZlbnQgYWZ0ZXIgc3VjY2Vzc2Z1bGx5IHN0YXJ0aW5nIHRoZSBzbW9sZG90IGNsaWVudFxuICAgICAqIGFuZCBgZGlzY29ubmVjdGVkYCBhZnRlciBgZGlzY29ubmVjdGAgaXMgY2FsbGVkLlxuICAgICAqIEBwYXJhbSB0eXBlIC0gRXZlbnRcbiAgICAgKiBAcGFyYW0gc3ViIC0gQ2FsbGJhY2tcbiAgICAgKi9cbiAgICBvbih0eXBlLCBzdWIpIHtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfZXZlbnRlbWl0dGVyLCBcImZcIikub24odHlwZSwgc3ViKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2V2ZW50ZW1pdHRlciwgXCJmXCIpLnJlbW92ZUxpc3RlbmVyKHR5cGUsIHN1Yik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgYW4gUlBDIHJlcXVlc3QgIHRoZSB3YXNtIGNsaWVudFxuICAgICAqXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIFRoZSBSUEMgbWV0aG9kcyB0byBleGVjdXRlXG4gICAgICogQHBhcmFtIHBhcmFtcyAtIEVuY29kZWQgcGFyYW1hdGVycyBhcyBhcHBsaWNhYmxlIGZvciB0aGUgbWV0aG9kXG4gICAgICogQHBhcmFtIHN1YnNjcmlwdGlvbiAtIFN1YnNjcmlwdGlvbiBkZXRhaWxzIChpbnRlcm5hbGx5IHVzZWQgYnkgYHN1YnNjcmliZWApXG4gICAgICovXG4gICAgYXN5bmMgc2VuZChtZXRob2QsIHBhcmFtcywgaXNDYWNoZWFibGUsIHN1YnNjcmlwdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QganNvbiA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NvZGVyLCBcImZcIikuZW5jb2RlSnNvbihtZXRob2QsIHBhcmFtcyk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NvZGVyLCBcImZcIikuZ2V0SWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBbXCJjYWxsaW5nXCIsIG1ldGhvZCwganNvbl0pO1xuICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlcnMsIFwiZlwiKVtpZF0gPSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBycGNNc2cgPSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luOiBDTElFTlRfT1JJR0lOLFxuICAgICAgICAgICAgICAgIGNoYWluSWQ6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluSWQsIFwiZlwiKSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInJwY1wiLFxuICAgICAgICAgICAgICAgIGpzb25ScGNNZXNzYWdlOiBqc29uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlKHJwY01zZyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGxvd3Mgc3Vic2NyaWJpbmcgdG8gYSBzcGVjaWZpYyBldmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0eXBlICAgICAtIFN1YnNjcmlwdGlvbiB0eXBlXG4gICAgICogQHBhcmFtIG1ldGhvZCAgIC0gU3Vic2NyaXB0aW9uIG1ldGhvZFxuICAgICAqIEBwYXJhbSBwYXJhbXMgICAtIFBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgLSBDYWxsYmFja1xuICAgICAqIEByZXR1cm5zIFByb21pc2UgIC0gcmVzb2x2ZXMgdG8gdGhlIGlkIG9mIHRoZSBzdWJzY3JpcHRpb24geW91IGNhbiB1c2Ugd2l0aCBbW3Vuc3Vic2NyaWJlXV0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIDxCUj5cbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiBjb25zdCBwcm92aWRlciA9IG5ldyBFeHRlbnNpb25Qcm92aWRlcihjbGllbnQpO1xuICAgICAqIGNvbnN0IHJwYyA9IG5ldyBScGMocHJvdmlkZXIpO1xuICAgICAqXG4gICAgICogcnBjLnN0YXRlLnN1YnNjcmliZVN0b3JhZ2UoW1tzdG9yYWdlLmJhbGFuY2VzLmZyZWVCYWxhbmNlLCA8QWRkcmVzcz5dXSwgKF8sIHZhbHVlcykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2codmFsdWVzKVxuICAgICAqIH0pLnRoZW4oKHN1YnNjcmlwdGlvbklkKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnYmFsYW5jZSBjaGFuZ2VzIHN1YnNjcmlwdGlvbiBpZDogJywgc3Vic2NyaXB0aW9uSWQpXG4gICAgICogfSlcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhc3luYyBzdWJzY3JpYmUoXG4gICAgLy8gdGhlIFwibWV0aG9kXCIgcHJvcGVydHkgb2YgdGhlIEpTT04gcmVzcG9uc2UgdG8gdGhpcyBzdWJzY3JpcHRpb25cbiAgICB0eXBlLCBcbiAgICAvLyB0aGUgXCJtZXRob2RcIiBwcm9wZXJ0eSBvZiB0aGUgSlNPTiByZXF1ZXN0IHRvIHJlZ2lzdGVyIHRoZSBzdWJzY3JpcHRpb25cbiAgICBtZXRob2QsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnNlbmQobWV0aG9kLCBwYXJhbXMsIGZhbHNlLCB7XG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxsb3dzIHVuc3Vic2NyaWJpbmcgdG8gc3Vic2NyaXB0aW9ucyBtYWRlIHdpdGggW1tzdWJzY3JpYmVdXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0eXBlICAgLSBTdWJzY3JpcHRpb24gdHlwZVxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBTdWJzY3JpcHRpb24gbWV0aG9kXG4gICAgICogQHBhcmFtIGlkICAgICAtIElkIHBhc3NlZCBmb3Igc2VuZCBwYXJhbWV0ZXJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHJlc29sdmluZyB0byB3aGV0aGVyIHRoZSB1bnN1bnNjcmliZSByZXF1ZXN0IHdhcyBzdWNjZXNzZnVsLlxuICAgICAqL1xuICAgIGFzeW5jIHVuc3Vic2NyaWJlKHR5cGUsIG1ldGhvZCwgaWQpIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gYCR7dHlwZX06OiR7aWR9YDtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIFwiZlwiKVtzdWJzY3JpcHRpb25dKSkge1xuICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBgVW5hYmxlIHRvIGZpbmQgYWN0aXZlIHN1YnNjcmlwdGlvbj0ke3N1YnNjcmlwdGlvbn1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfc3Vic2NyaXB0aW9ucywgXCJmXCIpW3N1YnNjcmlwdGlvbl07XG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5zZW5kKG1ldGhvZCwgW2lkXSkpO1xuICAgIH1cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfZXZlbnRlbWl0dGVyLCBcImZcIikuZW1pdCh0eXBlLCAuLi5hcmdzKTtcbiAgICB9XG59XG5fRXh0ZW5zaW9uUHJvdmlkZXJfY29kZXIgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfZXZlbnRlbWl0dGVyID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2hhbmRsZXJzID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX3N1YnNjcmlwdGlvbnMgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfd2FpdGluZ0ZvcklkID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluSWQgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5TcGVjcyA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9wYXJhY2hhaW5TcGVjcyA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVNZXNzYWdlID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX29uTWVzc2FnZVJlc3VsdCA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfc2ltdWxhdGVMaWZlY3ljbGUgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hlY2tDbGllbnRQZWVyY291bnQgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaW5zdGFuY2VzID0gbmV3IFdlYWtTZXQoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2FkZENoYWluID0gYXN5bmMgZnVuY3Rpb24gX0V4dGVuc2lvblByb3ZpZGVyX2FkZENoYWluKCkge1xuICAgIGNvbnN0IHNwZWNNc2cgPSB7XG4gICAgICAgIG9yaWdpbjogQ0xJRU5UX09SSUdJTixcbiAgICAgICAgY2hhaW5JZDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfcGFyYWNoYWluU3BlY3MsIFwiZlwiKSA/IGdldFJhbmRvbUNoYWluSWQoKSA6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluSWQsIFwiZlwiKSxcbiAgICAgICAgLi4uKFN1cHBvcnRlZENoYWluc1tfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpblNwZWNzLCBcImZcIildXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZC13ZWxsLWtub3duLWNoYWluXCIsXG4gICAgICAgICAgICAgICAgY2hhaW5OYW1lOiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpblNwZWNzLCBcImZcIiksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZC1jaGFpblwiLFxuICAgICAgICAgICAgICAgIGNoYWluU3BlYzogX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5TcGVjcywgXCJmXCIpLFxuICAgICAgICAgICAgICAgIHBvdGVudGlhbFJlbGF5Q2hhaW5JZHM6IFtdLFxuICAgICAgICAgICAgfSksXG4gICAgfTtcbiAgICBhd2FpdCBjcmVhdGVDaGFpbihzcGVjTXNnKTtcbiAgICBpZiAoIV9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBcImZcIikpXG4gICAgICAgIHJldHVybjtcbiAgICBhd2FpdCBjcmVhdGVDaGFpbih7XG4gICAgICAgIG9yaWdpbjogQ0xJRU5UX09SSUdJTixcbiAgICAgICAgY2hhaW5JZDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5JZCwgXCJmXCIpLFxuICAgICAgICB0eXBlOiBcImFkZC1jaGFpblwiLFxuICAgICAgICBjaGFpblNwZWM6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBcImZcIiksXG4gICAgICAgIHBvdGVudGlhbFJlbGF5Q2hhaW5JZHM6IFtzcGVjTXNnLmNoYWluSWRdLFxuICAgIH0pO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV4dGVuc2lvblByb3ZpZGVyLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21DaGFpbklkKCkge1xuICAgIGNvbnN0IGFyciA9IG5ldyBCaWdVaW50NjRBcnJheSgyKTtcbiAgICAvLyBJdCBjYW4gb25seSBiZSB1c2VkIGZyb20gdGhlIGJyb3dzZXIsIHNvIHRoaXMgaXMgZmluZS5cbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGFycik7XG4gICAgY29uc3QgcmVzdWx0ID0gKGFyclsxXSA8PCBCaWdJbnQoNjQpKSB8IGFyclswXTtcbiAgICByZXR1cm4gcmVzdWx0LnRvU3RyaW5nKDM2KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldFJhbmRvbUNoYWluSWQuanMubWFwIiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRTZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufTtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9IZWFsdGhDaGVja0Vycm9yX2NhdXNlO1xuZXhwb3J0IGNsYXNzIEhlYWx0aENoZWNrRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IocmVzcG9uc2UsIG1lc3NhZ2UgPSBcIkdvdCBlcnJvciByZXNwb25zZSBhc2tpbmcgZm9yIHN5c3RlbSBoZWFsdGhcIikge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgX0hlYWx0aENoZWNrRXJyb3JfY2F1c2Uuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0hlYWx0aENoZWNrRXJyb3JfY2F1c2UsIHJlc3BvbnNlLCBcImZcIik7XG4gICAgICAgIC8vICdFcnJvcicgYnJlYWtzIHRoZSBwcm90b3R5cGUgY2hhaW4gLSByZXN0b3JlIGl0XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBuZXcudGFyZ2V0LnByb3RvdHlwZSk7XG4gICAgfVxuICAgIGdldENhdXNlKCkge1xuICAgICAgICByZXR1cm4gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfSGVhbHRoQ2hlY2tFcnJvcl9jYXVzZSwgXCJmXCIpO1xuICAgIH1cbn1cbl9IZWFsdGhDaGVja0Vycm9yX2NhdXNlID0gbmV3IFdlYWtNYXAoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9ycy5qcy5tYXAiLCJjb25zdCBpc1VuZGVmaW5lZCA9ICh2YWx1ZSkgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCI7XG59O1xuZnVuY3Rpb24gZXJhc2VSZWNvcmQocmVjb3JkLCBjYikge1xuICAgIE9iamVjdC5rZXlzKHJlY29yZCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgY2IocmVjb3JkW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSByZWNvcmRba2V5XTtcbiAgICB9KTtcbn1cbmV4cG9ydCB7IGlzVW5kZWZpbmVkLCBlcmFzZVJlY29yZCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9