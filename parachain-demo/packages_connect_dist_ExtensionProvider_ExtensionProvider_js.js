(self["webpackChunk_substrate_parachain_demo"] = self["webpackChunk_substrate_parachain_demo"] || []).push([["packages_connect_dist_ExtensionProvider_ExtensionProvider_js"],{

/***/ "?2e65":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "../../packages/connect-extension-protocol/dist/index.js":
/*!***************************************************************!*\
  !*** ../../packages/connect-extension-protocol/dist/index.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extension": function() { return /* binding */ extension; },
/* harmony export */   "provider": function() { return /* binding */ provider; }
/* harmony export */ });
/**
 * @packageDocumentation
 *
 * In order to understand the protocol you should realise there are actually
 * 2 hops that happen in communication because of the architecture of browser
 * extensions.  The app has to `window.postMessage` messages to the content
 * script that gets injected by the extension. It is the content script that
 * has access to the extension APIs to be able to post messages to the
 * extension background.
 *
 * You can think of the protocol types like layers of an onion. The innermost
 * layer is the original JSON RPC request/responses. Then we wrap extra layers
 * (types) for the other 2 hops which then get peeled off at each hop. The
 * {@link MessageToManager} / {@link MessageFromManager} representing the
 * extension communication content script \<\> background. Then the outermost
 * {@link ExtensionMessage} / {@link ProviderMessage} representing the
 * communication between the PolkadotJS provider in the app and the content
 * script.
 *
 * The {@link ExtensionProvider} is the class in the app.
 * The {@link ExtensionMessageRouter} is the class in the content script.
 * The {@link ConnectionManager} is the class in the extension background.
 */

/**
 * extension provides strongly typed convenience wrappers around
 * the `window.postMessage` and `window.addEventListener` APIs used for
 * message passing on the extension side of communication.
 */
var extension = {
  /** send a message from the extension to the app **/
  send: function send(message) {
    window.postMessage(message, "*");
  },

  /**
   * Listen to messages from the `ExtensionProvider` in the app sent to
   * the extension.
   */
  listen: function listen(handler) {
    window.addEventListener("message", handler);
  }
};
/**
 * provider provides properly typed convenience wrappers around the
 * `window.postMessage` and `window.addEventListener` APIs used for message
 * passing on the \@substrate/connect `ExtensionProvider` end of communication.
 */

var provider = {
  /** send a message from the app to the extension **/
  send: function send(message) {
    window.postMessage(message, "*");
  },

  /**
   * Listen to messages from the `ExtensionMessageRouter` in the extension sent
   * to the app.
   */
  listen: function listen(handler) {
    window.addEventListener("message", handler);
  }
};

/***/ }),

/***/ "../../packages/connect/dist/ExtensionProvider/ExtensionProvider.js":
/*!**************************************************************************!*\
  !*** ../../packages/connect/dist/ExtensionProvider/ExtensionProvider.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtensionProvider": function() { return /* binding */ ExtensionProvider; }
/* harmony export */ });
/* harmony import */ var _polkadot_rpc_provider_coder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @polkadot/rpc-provider/coder */ "../../node_modules/@polkadot/rpc-provider/coder/index.js");
/* harmony import */ var _polkadot_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @polkadot/util */ "../../node_modules/@polkadot/util/logger.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "../../node_modules/eventemitter3/index.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/index.js */ "../../packages/connect/dist/utils/index.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors.js */ "../../packages/connect/dist/errors.js");
/* harmony import */ var _substrate_connect_extension_protocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @substrate/connect-extension-protocol */ "../../packages/connect-extension-protocol/dist/index.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var _ExtensionProvider_coder, _ExtensionProvider_eventemitter, _ExtensionProvider_handlers, _ExtensionProvider_subscriptions, _ExtensionProvider_waitingForId, _ExtensionProvider_connectionStatePingerId, _ExtensionProvider_isConnected, _ExtensionProvider_appName, _ExtensionProvider_chainName, _ExtensionProvider_chainId, _ExtensionProvider_chainSpecs, _ExtensionProvider_parachainSpecs, _ExtensionProvider_commonMessageData, _ExtensionProvider_handleMessage, _ExtensionProvider_onMessageResult, _ExtensionProvider_onMessageSubscribe, _ExtensionProvider_simulateLifecycle, _ExtensionProvider_checkClientPeercount;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */








var CONTENT_SCRIPT_ORIGIN = "content-script";
var EXTENSION_PROVIDER_ORIGIN = "extension-provider";
var l = (0,_polkadot_util__WEBPACK_IMPORTED_MODULE_4__.logger)(EXTENSION_PROVIDER_ORIGIN);
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
/**
 * The ExtensionProvider allows interacting with a smoldot-based WASM light
 * client running in a browser extension.  It is not designed to be used
 * directly.  You should use the `\@substrate/connect` package.
 */

var ExtensionProvider = /*#__PURE__*/function () {
  function ExtensionProvider(appName, uniqueExternalId, relayChain, parachain) {
    var _this = this;

    _classCallCheck(this, ExtensionProvider);

    _ExtensionProvider_coder.set(this, new _polkadot_rpc_provider_coder__WEBPACK_IMPORTED_MODULE_5__.RpcCoder());

    _ExtensionProvider_eventemitter.set(this, new eventemitter3__WEBPACK_IMPORTED_MODULE_0__());

    _ExtensionProvider_handlers.set(this, {});

    _ExtensionProvider_subscriptions.set(this, {});

    _ExtensionProvider_waitingForId.set(this, {});

    _ExtensionProvider_connectionStatePingerId.set(this, void 0);

    _ExtensionProvider_isConnected.set(this, false);

    _ExtensionProvider_appName.set(this, void 0);

    _ExtensionProvider_chainName.set(this, void 0);

    _ExtensionProvider_chainId.set(this, void 0);

    _ExtensionProvider_chainSpecs.set(this, void 0);

    _ExtensionProvider_parachainSpecs.set(this, void 0);
    /*
     * How frequently to see if we have any peers
     */


    this.healthPingerInterval = CONNECTION_STATE_PINGER_INTERVAL;

    _ExtensionProvider_commonMessageData.set(this, function () {
      return {
        appName: __classPrivateFieldGet(_this, _ExtensionProvider_appName, "f"),
        chainId: __classPrivateFieldGet(_this, _ExtensionProvider_chainId, "f"),
        chainName: __classPrivateFieldGet(_this, _ExtensionProvider_chainName, "f"),
        origin: EXTENSION_PROVIDER_ORIGIN
      };
    });

    _ExtensionProvider_handleMessage.set(this, function (data) {
      if (data.disconnect && data.disconnect === true) {
        __classPrivateFieldSet(_this, _ExtensionProvider_isConnected, false, "f");

        _this.emit("disconnected");

        var error = new Error("Disconnected from the extension"); // reject all hanging requests

        (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.eraseRecord)(__classPrivateFieldGet(_this, _ExtensionProvider_handlers, "f"), function (h) {
          return h.callback(error, undefined);
        });
        (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.eraseRecord)(__classPrivateFieldGet(_this, _ExtensionProvider_waitingForId, "f"));
        return;
      }

      var message = data.message;

      if (message.type === "error") {
        return _this.emit("error", new Error(message.payload));
      }

      if (message.type === "rpc") {
        var rpcString = message.payload;
        l.debug(function () {
          return ["received", rpcString];
        });
        var response = JSON.parse(rpcString);
        return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(response.method) ? __classPrivateFieldGet(_this, _ExtensionProvider_onMessageResult, "f").call(_this, response) : __classPrivateFieldGet(_this, _ExtensionProvider_onMessageSubscribe, "f").call(_this, response);
      }

      var errorMessage = "Unrecognised message type from extension ".concat(message.type);
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
      _this.send("system_health", []).then(__classPrivateFieldGet(_this, _ExtensionProvider_simulateLifecycle, "f")).catch(function (error) {
        return _this.emit("error", new _errors_js__WEBPACK_IMPORTED_MODULE_2__.HealthCheckError(error));
      });
    }
    /**
     * "Connect" to the extension - sends a message to the `ExtensionMessageRouter`
     * asking it to connect to the extension background.
     *
     * @returns a resolved Promise
     * @remarks this is async to fulfill the interface with PolkadotJS
     */
    );

    __classPrivateFieldSet(this, _ExtensionProvider_appName, appName, "f");
    /**
     * TODO: we should remove the chainName from the payload of the messages,
     * since this is information that doesn't have to be sent on every message and
     * the Extension can extract it from the chainSpecs, also that way we avoid
     * parsing a large JSON on the main thread.
     */


    __classPrivateFieldSet(this, _ExtensionProvider_chainName, JSON.parse(relayChain).name, "f");

    __classPrivateFieldSet(this, _ExtensionProvider_chainId, uniqueExternalId, "f");

    __classPrivateFieldSet(this, _ExtensionProvider_chainSpecs, relayChain, "f");

    __classPrivateFieldSet(this, _ExtensionProvider_connectionStatePingerId, null, "f");

    __classPrivateFieldSet(this, _ExtensionProvider_parachainSpecs, "", "f");

    if (parachain) {
      __classPrivateFieldSet(this, _ExtensionProvider_parachainSpecs, parachain, "f");
    }
  }
  /**
   * name
   *
   * @returns the name of this app to be used by the extension for display
   * purposes.
   *
   * @remarks Apps are expected to make efforts to make this name reasonably
   * unique.
   */


  _createClass(ExtensionProvider, [{
    key: "name",
    get: function get() {
      return __classPrivateFieldGet(this, _ExtensionProvider_appName, "f");
    }
    /**
     * chainSpecs
     *
     * @returns the name of the chain this `ExtensionProvider` is talking to.
     */

  }, {
    key: "chainSpecs",
    get: function get() {
      return __classPrivateFieldGet(this, _ExtensionProvider_chainSpecs, "f");
    }
    /**
     * Lets polkadot-js know we support subscriptions
     *
     * @remarks Always returns `true` - this provider supports subscriptions.
     * PolkadotJS uses this internally.
     */

  }, {
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
    value: function connect() {
      var _this2 = this;

      var connectMsg = _objectSpread(_objectSpread({}, __classPrivateFieldGet(this, _ExtensionProvider_commonMessageData, "f").call(this)), {}, {
        action: "connect"
      });

      _substrate_connect_extension_protocol__WEBPACK_IMPORTED_MODULE_3__.provider.send(connectMsg); // Once connect is sent - send rpc to extension that will contain the chainSpecs
      // for the extension to call addChain on smoldot

      var specMsg = _objectSpread(_objectSpread({}, __classPrivateFieldGet(this, _ExtensionProvider_commonMessageData, "f").call(this)), {}, {
        action: "forward",
        message: {
          type: "spec",
          payload: __classPrivateFieldGet(this, _ExtensionProvider_chainSpecs, "f") || ""
        }
      });

      if (__classPrivateFieldGet(this, _ExtensionProvider_parachainSpecs, "f") && specMsg.message) {
        specMsg.message.parachainPayload = __classPrivateFieldGet(this, _ExtensionProvider_parachainSpecs, "f");
      }

      _substrate_connect_extension_protocol__WEBPACK_IMPORTED_MODULE_3__.provider.send(specMsg);
      _substrate_connect_extension_protocol__WEBPACK_IMPORTED_MODULE_3__.provider.listen(function (_ref) {
        var data = _ref.data;

        if (data.origin && data.origin === CONTENT_SCRIPT_ORIGIN) {
          __classPrivateFieldGet(_this2, _ExtensionProvider_handleMessage, "f").call(_this2, data);
        }
      });

      __classPrivateFieldSet(this, _ExtensionProvider_connectionStatePingerId, setInterval(__classPrivateFieldGet(this, _ExtensionProvider_checkClientPeercount, "f"), this.healthPingerInterval), "f");

      return Promise.resolve();
    }
    /**
     * Manually "disconnect" - sends a message to the `ExtensionMessageRouter`
     * telling it to disconnect the port with the background manager.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      var disconnectMsg = _objectSpread(_objectSpread({}, __classPrivateFieldGet(this, _ExtensionProvider_commonMessageData, "f").call(this)), {}, {
        action: "disconnect"
      });

      _substrate_connect_extension_protocol__WEBPACK_IMPORTED_MODULE_3__.provider.send(disconnectMsg);

      if (__classPrivateFieldGet(this, _ExtensionProvider_connectionStatePingerId, "f") !== null) {
        clearInterval(__classPrivateFieldGet(this, _ExtensionProvider_connectionStatePingerId, "f"));
      }

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
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(method, params, subscription) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
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

                  var rpcMsg = _objectSpread(_objectSpread({}, __classPrivateFieldGet(_this4, _ExtensionProvider_commonMessageData, "f").call(_this4)), {}, {
                    action: "forward",
                    message: {
                      type: "rpc",
                      payload: json
                    }
                  });

                  _substrate_connect_extension_protocol__WEBPACK_IMPORTED_MODULE_3__.provider.send(rpcMsg);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function send(_x, _x2, _x3) {
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
      var _subscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2( // the "method" property of the JSON response to this subscription
      type, // the "method" property of the JSON request to register the subscription
      method, // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params, callback) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.send(method, params, {
                  callback: callback,
                  type: type
                });

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function subscribe(_x4, _x5, _x6, _x7) {
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
      var _unsubscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(type, method, id) {
        var subscription;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                subscription = "".concat(type, "::").concat(id);

                if (!(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(__classPrivateFieldGet(this, _ExtensionProvider_subscriptions, "f")[subscription])) {
                  _context3.next = 4;
                  break;
                }

                l.debug(function () {
                  return "Unable to find active subscription=".concat(subscription);
                });
                return _context3.abrupt("return", false);

              case 4:
                delete __classPrivateFieldGet(this, _ExtensionProvider_subscriptions, "f")[subscription];
                _context3.next = 7;
                return this.send(method, [id]);

              case 7:
                return _context3.abrupt("return", _context3.sent);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function unsubscribe(_x8, _x9, _x10) {
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
_ExtensionProvider_coder = new WeakMap(), _ExtensionProvider_eventemitter = new WeakMap(), _ExtensionProvider_handlers = new WeakMap(), _ExtensionProvider_subscriptions = new WeakMap(), _ExtensionProvider_waitingForId = new WeakMap(), _ExtensionProvider_connectionStatePingerId = new WeakMap(), _ExtensionProvider_isConnected = new WeakMap(), _ExtensionProvider_appName = new WeakMap(), _ExtensionProvider_chainName = new WeakMap(), _ExtensionProvider_chainId = new WeakMap(), _ExtensionProvider_chainSpecs = new WeakMap(), _ExtensionProvider_parachainSpecs = new WeakMap(), _ExtensionProvider_commonMessageData = new WeakMap(), _ExtensionProvider_handleMessage = new WeakMap(), _ExtensionProvider_onMessageResult = new WeakMap(), _ExtensionProvider_onMessageSubscribe = new WeakMap(), _ExtensionProvider_simulateLifecycle = new WeakMap(), _ExtensionProvider_checkClientPeercount = new WeakMap();

/***/ }),

/***/ "../../packages/connect/dist/errors.js":
/*!*********************************************!*\
  !*** ../../packages/connect/dist/errors.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HealthCheckError": function() { return /* binding */ HealthCheckError; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

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
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isUndefined": function() { return /* binding */ isUndefined; },
/* harmony export */   "eraseRecord": function() { return /* binding */ eraseRecord; }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZXNfY29ubmVjdF9kaXN0X0V4dGVuc2lvblByb3ZpZGVyX0V4dGVuc2lvblByb3ZpZGVyX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCRzs7QUF3Q0g7Ozs7QUFJRztBQUNJLElBQU0sU0FBUyxHQUFHO0FBQ3ZCO0FBQ0EsTUFBSSxFQUFFLGNBQUMsT0FBRCxFQUF3QztBQUM1QyxVQUFNLENBQUMsV0FBUCxDQUFtQixPQUFuQixFQUE0QixHQUE1QjtBQUNELEdBSnNCOztBQUt2Qjs7O0FBR0c7QUFDSCxRQUFNLEVBQUUsZ0JBQUMsT0FBRCxFQUEwQztBQUNoRCxVQUFNLENBQUMsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsT0FBbkM7QUFDRDtBQVhzQixDQUFsQjtBQTREUDs7OztBQUlHOztBQUNJLElBQU0sUUFBUSxHQUFHO0FBQ3RCO0FBQ0EsTUFBSSxFQUFFLGNBQUMsT0FBRCxFQUF1QztBQUMzQyxVQUFNLENBQUMsV0FBUCxDQUFtQixPQUFuQixFQUE0QixHQUE1QjtBQUNELEdBSnFCOztBQUt0Qjs7O0FBR0c7QUFDSCxRQUFNLEVBQUUsZ0JBQUMsT0FBRCxFQUF5QztBQUMvQyxVQUFNLENBQUMsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsT0FBbkM7QUFDRDtBQVhxQixDQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcElQOztBQUNBOztBQUNBOzs7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFTQSxJQUFNLHFCQUFxQixHQUFHLGdCQUE5QjtBQUNBLElBQU0seUJBQXlCLEdBQUcsb0JBQWxDO0FBRUEsSUFBTSxDQUFDLEdBQUcsc0RBQU0sQ0FBQyx5QkFBRCxDQUFoQjtBQTJCQSxJQUFNLFVBQVUsR0FBZ0M7QUFDOUMscUJBQW1CLEVBQUUscUJBRHlCO0FBRTlDLCtCQUE2QixFQUFFLCtC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Q04sUUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFELENBQVAsQ0FBRjtBQUNEOztBQUVELFdBQU8sTUFBTSxDQUFDLEdBQUQsQ0FBYjtBQUNELEdBTkQ7QUFPRCIsInNvdXJjZXMiOlsid2VicGFjazovL0BzdWJzdHJhdGUvcGFyYWNoYWluLWRlbW8vaWdub3JlZHwvaG9tZS93aXJlZG5rb2QvRG9jdW1lbnRzL3JlcG9zL3Bhcml0eS9zdWJzdHJhdGUtY29ubmVjdC9ub2RlX21vZHVsZXMvYm4uanMvbGlifGJ1ZmZlciIsIndlYnBhY2s6Ly9Ac3Vic3RyYXRlL3BhcmFjaGFpbi1kZW1vLy4uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9Ac3Vic3RyYXRlL3BhcmFjaGFpbi1kZW1vLy4uLy4uL3NyYy9FeHRlbnNpb25Qcm92aWRlci9FeHRlbnNpb25Qcm92aWRlci50cyIsIndlYnBhY2s6Ly9Ac3Vic3RyYXRlL3BhcmFjaGFpbi1kZW1vLy4uL3NyYy9lcnJvcnMudHMiLCJ3ZWJwYWNrOi8vQHN1YnN0cmF0ZS9wYXJhY2hhaW4tZGVtby8uLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogKGlnbm9yZWQpICovIiwiLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqXG4gKiBJbiBvcmRlciB0byB1bmRlcnN0YW5kIHRoZSBwcm90b2NvbCB5b3Ugc2hvdWxkIHJlYWxpc2UgdGhlcmUgYXJlIGFjdHVhbGx5XG4gKiAyIGhvcHMgdGhhdCBoYXBwZW4gaW4gY29tbXVuaWNhdGlvbiBiZWNhdXNlIG9mIHRoZSBhcmNoaXRlY3R1cmUgb2YgYnJvd3NlclxuICogZXh0ZW5zaW9ucy4gIFRoZSBhcHAgaGFzIHRvIGB3aW5kb3cucG9zdE1lc3NhZ2VgIG1lc3NhZ2VzIHRvIHRoZSBjb250ZW50XG4gKiBzY3JpcHQgdGhhdCBnZXRzIGluamVjdGVkIGJ5IHRoZSBleHRlbnNpb24uIEl0IGlzIHRoZSBjb250ZW50IHNjcmlwdCB0aGF0XG4gKiBoYXMgYWNjZXNzIHRvIHRoZSBleHRlbnNpb24gQVBJcyB0byBiZSBhYmxlIHRvIHBvc3QgbWVzc2FnZXMgdG8gdGhlXG4gKiBleHRlbnNpb24gYmFja2dyb3VuZC5cbiAqXG4gKiBZb3UgY2FuIHRoaW5rIG9mIHRoZSBwcm90b2NvbCB0eXBlcyBsaWtlIGxheWVycyBvZiBhbiBvbmlvbi4gVGhlIGlubmVybW9zdFxuICogbGF5ZXIgaXMgdGhlIG9yaWdpbmFsIEpTT04gUlBDIHJlcXVlc3QvcmVzcG9uc2VzLiBUaGVuIHdlIHdyYXAgZXh0cmEgbGF5ZXJzXG4gKiAodHlwZXMpIGZvciB0aGUgb3RoZXIgMiBob3BzIHdoaWNoIHRoZW4gZ2V0IHBlZWxlZCBvZmYgYXQgZWFjaCBob3AuIFRoZVxuICoge0BsaW5rIE1lc3NhZ2VUb01hbmFnZXJ9IC8ge0BsaW5rIE1lc3NhZ2VGcm9tTWFuYWdlcn0gcmVwcmVzZW50aW5nIHRoZVxuICogZXh0ZW5zaW9uIGNvbW11bmljYXRpb24gY29udGVudCBzY3JpcHQgXFw8XFw+IGJhY2tncm91bmQuIFRoZW4gdGhlIG91dGVybW9zdFxuICoge0BsaW5rIEV4dGVuc2lvbk1lc3NhZ2V9IC8ge0BsaW5rIFByb3ZpZGVyTWVzc2FnZX0gcmVwcmVzZW50aW5nIHRoZVxuICogY29tbXVuaWNhdGlvbiBiZXR3ZWVuIHRoZSBQb2xrYWRvdEpTIHByb3ZpZGVyIGluIHRoZSBhcHAgYW5kIHRoZSBjb250ZW50XG4gKiBzY3JpcHQuXG4gKlxuICogVGhlIHtAbGluayBFeHRlbnNpb25Qcm92aWRlcn0gaXMgdGhlIGNsYXNzIGluIHRoZSBhcHAuXG4gKiBUaGUge0BsaW5rIEV4dGVuc2lvbk1lc3NhZ2VSb3V0ZXJ9IGlzIHRoZSBjbGFzcyBpbiB0aGUgY29udGVudCBzY3JpcHQuXG4gKiBUaGUge0BsaW5rIENvbm5lY3Rpb25NYW5hZ2VyfSBpcyB0aGUgY2xhc3MgaW4gdGhlIGV4dGVuc2lvbiBiYWNrZ3JvdW5kLlxuICovXG4vKipcbiAqIGV4dGVuc2lvbiBwcm92aWRlcyBzdHJvbmdseSB0eXBlZCBjb252ZW5pZW5jZSB3cmFwcGVycyBhcm91bmRcbiAqIHRoZSBgd2luZG93LnBvc3RNZXNzYWdlYCBhbmQgYHdpbmRvdy5hZGRFdmVudExpc3RlbmVyYCBBUElzIHVzZWQgZm9yXG4gKiBtZXNzYWdlIHBhc3Npbmcgb24gdGhlIGV4dGVuc2lvbiBzaWRlIG9mIGNvbW11bmljYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBleHRlbnNpb24gPSB7XG4gICAgLyoqIHNlbmQgYSBtZXNzYWdlIGZyb20gdGhlIGV4dGVuc2lvbiB0byB0aGUgYXBwICoqL1xuICAgIHNlbmQ6IChtZXNzYWdlKSA9PiB7XG4gICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCBcIipcIik7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gbWVzc2FnZXMgZnJvbSB0aGUgYEV4dGVuc2lvblByb3ZpZGVyYCBpbiB0aGUgYXBwIHNlbnQgdG9cbiAgICAgKiB0aGUgZXh0ZW5zaW9uLlxuICAgICAqL1xuICAgIGxpc3RlbjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGhhbmRsZXIpO1xuICAgIH0sXG59O1xuLyoqXG4gKiBwcm92aWRlciBwcm92aWRlcyBwcm9wZXJseSB0eXBlZCBjb252ZW5pZW5jZSB3cmFwcGVycyBhcm91bmQgdGhlXG4gKiBgd2luZG93LnBvc3RNZXNzYWdlYCBhbmQgYHdpbmRvdy5hZGRFdmVudExpc3RlbmVyYCBBUElzIHVzZWQgZm9yIG1lc3NhZ2VcbiAqIHBhc3Npbmcgb24gdGhlIFxcQHN1YnN0cmF0ZS9jb25uZWN0IGBFeHRlbnNpb25Qcm92aWRlcmAgZW5kIG9mIGNvbW11bmljYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBwcm92aWRlciA9IHtcbiAgICAvKiogc2VuZCBhIG1lc3NhZ2UgZnJvbSB0aGUgYXBwIHRvIHRoZSBleHRlbnNpb24gKiovXG4gICAgc2VuZDogKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFwiKlwiKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBtZXNzYWdlcyBmcm9tIHRoZSBgRXh0ZW5zaW9uTWVzc2FnZVJvdXRlcmAgaW4gdGhlIGV4dGVuc2lvbiBzZW50XG4gICAgICogdG8gdGhlIGFwcC5cbiAgICAgKi9cbiAgICBsaXN0ZW46IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBoYW5kbGVyKTtcbiAgICB9LFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsInZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn07XG52YXIgX19jbGFzc1ByaXZhdGVGaWVsZEdldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZEdldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufTtcbnZhciBfRXh0ZW5zaW9uUHJvdmlkZXJfY29kZXIsIF9FeHRlbnNpb25Qcm92aWRlcl9ldmVudGVtaXR0ZXIsIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVycywgX0V4dGVuc2lvblByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIF9FeHRlbnNpb25Qcm92aWRlcl93YWl0aW5nRm9ySWQsIF9FeHRlbnNpb25Qcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCwgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCBfRXh0ZW5zaW9uUHJvdmlkZXJfYXBwTmFtZSwgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluTmFtZSwgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluSWQsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpblNwZWNzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfcGFyYWNoYWluU3BlY3MsIF9FeHRlbnNpb25Qcm92aWRlcl9jb21tb25NZXNzYWdlRGF0YSwgX0V4dGVuc2lvblByb3ZpZGVyX2hhbmRsZU1lc3NhZ2UsIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VSZXN1bHQsIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUsIF9FeHRlbnNpb25Qcm92aWRlcl9zaW11bGF0ZUxpZmVjeWNsZSwgX0V4dGVuc2lvblByb3ZpZGVyX2NoZWNrQ2xpZW50UGVlcmNvdW50O1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1tZW1iZXItYWNjZXNzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCB7IFJwY0NvZGVyIH0gZnJvbSBcIkBwb2xrYWRvdC9ycGMtcHJvdmlkZXIvY29kZXJcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCJAcG9sa2Fkb3QvdXRpbFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRlbWl0dGVyM1wiO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQsIGVyYXNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBIZWFsdGhDaGVja0Vycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy5qc1wiO1xuaW1wb3J0IHsgcHJvdmlkZXIsIH0gZnJvbSBcIkBzdWJzdHJhdGUvY29ubmVjdC1leHRlbnNpb24tcHJvdG9jb2xcIjtcbmNvbnN0IENPTlRFTlRfU0NSSVBUX09SSUdJTiA9IFwiY29udGVudC1zY3JpcHRcIjtcbmNvbnN0IEVYVEVOU0lPTl9QUk9WSURFUl9PUklHSU4gPSBcImV4dGVuc2lvbi1wcm92aWRlclwiO1xuY29uc3QgbCA9IGxvZ2dlcihFWFRFTlNJT05fUFJPVklERVJfT1JJR0lOKTtcbmNvbnN0IEFOR0xJQ0lTTVMgPSB7XG4gICAgY2hhaW5fZmluYWxpc2VkSGVhZDogXCJjaGFpbl9maW5hbGl6ZWRIZWFkXCIsXG4gICAgY2hhaW5fc3Vic2NyaWJlRmluYWxpc2VkSGVhZHM6IFwiY2hhaW5fc3Vic2NyaWJlRmluYWxpemVkSGVhZHNcIixcbiAgICBjaGFpbl91bnN1YnNjcmliZUZpbmFsaXNlZEhlYWRzOiBcImNoYWluX3Vuc3Vic2NyaWJlRmluYWxpemVkSGVhZHNcIixcbn07XG4vKlxuICogTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJldHdlZW4gY2hlY2tzIHRvIHNlZSBpZiB3ZSBoYXZlIGFueVxuICogY29ubmVjdGVkIHBlZXJzIGluIHRoZSBzbW9sZG90IGNsaWVudFxuICovXG5jb25zdCBDT05ORUNUSU9OX1NUQVRFX1BJTkdFUl9JTlRFUlZBTCA9IDIwMDA7XG4vKipcbiAqIFRoZSBFeHRlbnNpb25Qcm92aWRlciBhbGxvd3MgaW50ZXJhY3Rpbmcgd2l0aCBhIHNtb2xkb3QtYmFzZWQgV0FTTSBsaWdodFxuICogY2xpZW50IHJ1bm5pbmcgaW4gYSBicm93c2VyIGV4dGVuc2lvbi4gIEl0IGlzIG5vdCBkZXNpZ25lZCB0byBiZSB1c2VkXG4gKiBkaXJlY3RseS4gIFlvdSBzaG91bGQgdXNlIHRoZSBgXFxAc3Vic3RyYXRlL2Nvbm5lY3RgIHBhY2thZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25Qcm92aWRlciB7XG4gICAgY29uc3RydWN0b3IoYXBwTmFtZSwgdW5pcXVlRXh0ZXJuYWxJZCwgcmVsYXlDaGFpbiwgcGFyYWNoYWluKSB7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9jb2Rlci5zZXQodGhpcywgbmV3IFJwY0NvZGVyKCkpO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfZXZlbnRlbWl0dGVyLnNldCh0aGlzLCBuZXcgRXZlbnRFbWl0dGVyKCkpO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlcnMuc2V0KHRoaXMsIHt9KTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX3N1YnNjcmlwdGlvbnMuc2V0KHRoaXMsIHt9KTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX3dhaXRpbmdGb3JJZC5zZXQodGhpcywge30pO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZC5zZXQodGhpcywgZmFsc2UpO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfYXBwTmFtZS5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluTmFtZS5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluSWQuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpblNwZWNzLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfcGFyYWNoYWluU3BlY3Muc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEhvdyBmcmVxdWVudGx5IHRvIHNlZSBpZiB3ZSBoYXZlIGFueSBwZWVyc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oZWFsdGhQaW5nZXJJbnRlcnZhbCA9IENPTk5FQ1RJT05fU1RBVEVfUElOR0VSX0lOVEVSVkFMO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfY29tbW9uTWVzc2FnZURhdGEuc2V0KHRoaXMsICgpID0+ICh7XG4gICAgICAgICAgICBhcHBOYW1lOiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9hcHBOYW1lLCBcImZcIiksXG4gICAgICAgICAgICBjaGFpbklkOiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpbklkLCBcImZcIiksXG4gICAgICAgICAgICBjaGFpbk5hbWU6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluTmFtZSwgXCJmXCIpLFxuICAgICAgICAgICAgb3JpZ2luOiBFWFRFTlNJT05fUFJPVklERVJfT1JJR0lOLFxuICAgICAgICB9KSk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVNZXNzYWdlLnNldCh0aGlzLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEuZGlzY29ubmVjdCAmJiBkYXRhLmRpc2Nvbm5lY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgZmFsc2UsIFwiZlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJkaXNjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXCJEaXNjb25uZWN0ZWQgZnJvbSB0aGUgZXh0ZW5zaW9uXCIpO1xuICAgICAgICAgICAgICAgIC8vIHJlamVjdCBhbGwgaGFuZ2luZyByZXF1ZXN0c1xuICAgICAgICAgICAgICAgIGVyYXNlUmVjb3JkKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2hhbmRsZXJzLCBcImZcIiksIChoKSA9PiBoLmNhbGxiYWNrKGVycm9yLCB1bmRlZmluZWQpKTtcbiAgICAgICAgICAgICAgICBlcmFzZVJlY29yZChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl93YWl0aW5nRm9ySWQsIFwiZlwiKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiZXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJlcnJvclwiLCBuZXcgRXJyb3IobWVzc2FnZS5wYXlsb2FkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSBcInJwY1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcnBjU3RyaW5nID0gbWVzc2FnZS5wYXlsb2FkO1xuICAgICAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gW1wicmVjZWl2ZWRcIiwgcnBjU3RyaW5nXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJwY1N0cmluZyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVW5kZWZpbmVkKHJlc3BvbnNlLm1ldGhvZClcbiAgICAgICAgICAgICAgICAgICAgPyBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VSZXN1bHQsIFwiZlwiKS5jYWxsKHRoaXMsIHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICA6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX29uTWVzc2FnZVN1YnNjcmliZSwgXCJmXCIpLmNhbGwodGhpcywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYFVucmVjb2duaXNlZCBtZXNzYWdlIHR5cGUgZnJvbSBleHRlbnNpb24gJHttZXNzYWdlLnR5cGV9YDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJlcnJvclwiLCBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfb25NZXNzYWdlUmVzdWx0LnNldCh0aGlzLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVycywgXCJmXCIpW3Jlc3BvbnNlLmlkXTtcbiAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gYFVuYWJsZSB0byBmaW5kIGhhbmRsZXIgZm9yIGlkPSR7cmVzcG9uc2UuaWR9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG1ldGhvZCwgc3Vic2NyaXB0aW9uIH0gPSBoYW5kbGVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NvZGVyLCBcImZcIikuZGVjb2RlUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGZpcnN0IHNlbmQgdGhlIHJlc3VsdCAtIGluIGNhc2Ugb2Ygc3Vicywgd2UgbWF5IGhhdmUgYW4gdXBkYXRlXG4gICAgICAgICAgICAgICAgLy8gaW1tZWRpYXRlbHkgaWYgd2UgaGF2ZSBzb21lIHF1ZXVlZCByZXN1bHRzIGFscmVhZHlcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJJZCA9IGAke3N1YnNjcmlwdGlvbi50eXBlfTo6JHtyZXN1bHR9YDtcbiAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfc3Vic2NyaXB0aW9ucywgXCJmXCIpW3N1YklkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN1YnNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIHJlc3VsdCB3YWl0aW5nIGZvciB0aGlzIHN1YnNjcmlwdGlvbiBhbHJlYWR5XG4gICAgICAgICAgICAgICAgICAgIGlmIChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl93YWl0aW5nRm9ySWQsIFwiZlwiKVtzdWJJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX29uTWVzc2FnZVN1YnNjcmliZSwgXCJmXCIpLmNhbGwodGhpcywgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBcImZcIilbc3ViSWRdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2soZXJyb3IsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlcnMsIFwiZlwiKVtyZXNwb25zZS5pZF07XG4gICAgICAgIH0pO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfb25NZXNzYWdlU3Vic2NyaWJlLnNldCh0aGlzLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IEFOR0xJQ0lTTVNbcmVzcG9uc2UubWV0aG9kXSB8fCByZXNwb25zZS5tZXRob2QgfHwgXCJpbnZhbGlkXCI7XG4gICAgICAgICAgICBjb25zdCBzdWJJZCA9IGAke21ldGhvZH06OiR7cmVzcG9uc2UucGFyYW1zLnN1YnNjcmlwdGlvbn1gO1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIFwiZlwiKVtzdWJJZF07XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSB0aGUgcmVzcG9uc2UsIHdlIGNvdWxkIGhhdmUgb3V0LW9mLW9yZGVyIHN1YmlkIGNvbWluZyBpblxuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3dhaXRpbmdGb3JJZCwgXCJmXCIpW3N1YklkXSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gYFVuYWJsZSB0byBmaW5kIGhhbmRsZXIgZm9yIHN1YnNjcmlwdGlvbj0ke3N1YklkfSByZXNwb25zZUlkPSR7cmVzcG9uc2UuaWR9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaG91c2VrZWVwaW5nXG4gICAgICAgICAgICBkZWxldGUgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBcImZcIilbc3ViSWRdO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jb2RlciwgXCJmXCIpLmRlY29kZVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKGVycm9yLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX3NpbXVsYXRlTGlmZWN5Y2xlLnNldCh0aGlzLCAoaGVhbHRoKSA9PiB7XG4gICAgICAgICAgICAvLyBkZXZlbG9wbWVudCBjaGFpbnMgc2hvdWxkIG5vdCBoYXZlIHBlZXJzIHNvIHdlIG9ubHkgZW1pdCBjb25uZWN0ZWRcbiAgICAgICAgICAgIC8vIG9uY2UgYW5kIG5ldmVyIGRpc2Nvbm5lY3RcbiAgICAgICAgICAgIGlmIChoZWFsdGguc2hvdWxkSGF2ZVBlZXJzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCB0cnVlLCBcImZcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbC5kZWJ1ZyhgZW1pdHRlZCBDT05ORUNURURgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwZWVyQ291bnQgPSBoZWFsdGgucGVlcnM7XG4gICAgICAgICAgICBjb25zdCBwZWVyQ2hlY2tzID0gKHBlZXJDb3VudCA+IDAgfHwgIWhlYWx0aC5zaG91bGRIYXZlUGVlcnMpICYmICFoZWFsdGguaXNTeW5jaW5nO1xuICAgICAgICAgICAgbC5kZWJ1ZyhgU2ltdWxhdGluZyBsaWZlY3lsY2UgZXZlbnRzIGZyb20gc3lzdGVtX2hlYWx0aGApO1xuICAgICAgICAgICAgbC5kZWJ1ZyhgaXNDb25uZWN0ZWQ6ICR7X19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQsIFwiZlwiKS50b1N0cmluZygpfSwgbmV3IHBlZXJDb3VudDogJHtwZWVyQ291bnR9YCk7XG4gICAgICAgICAgICBpZiAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQsIFwiZlwiKSAmJiBwZWVyQ2hlY2tzKSB7XG4gICAgICAgICAgICAgICAgLy8gc3RpbGwgY29ubmVjdGVkXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikgJiYgcGVlckNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQsIGZhbHNlLCBcImZcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwiZGlzY29ubmVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIGwuZGVidWcoYGVtaXR0ZWQgRElTQ09OTkVDVEVEYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpICYmIHBlZXJDaGVja3MpIHtcbiAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgdHJ1ZSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBsLmRlYnVnKGBlbWl0dGVkIENPTk5FQ1RFRGApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN0aWxsIG5vdCBjb25uZWN0ZWRcbiAgICAgICAgfSk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9jaGVja0NsaWVudFBlZXJjb3VudC5zZXQodGhpcywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZW5kKFwic3lzdGVtX2hlYWx0aFwiLCBbXSlcbiAgICAgICAgICAgICAgICAudGhlbihfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9zaW11bGF0ZUxpZmVjeWNsZSwgXCJmXCIpKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHRoaXMuZW1pdChcImVycm9yXCIsIG5ldyBIZWFsdGhDaGVja0Vycm9yKGVycm9yKSkpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcIkNvbm5lY3RcIiB0byB0aGUgZXh0ZW5zaW9uIC0gc2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBgRXh0ZW5zaW9uTWVzc2FnZVJvdXRlcmBcbiAgICAgICAgICogYXNraW5nIGl0IHRvIGNvbm5lY3QgdG8gdGhlIGV4dGVuc2lvbiBiYWNrZ3JvdW5kLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBhIHJlc29sdmVkIFByb21pc2VcbiAgICAgICAgICogQHJlbWFya3MgdGhpcyBpcyBhc3luYyB0byBmdWxmaWxsIHRoZSBpbnRlcmZhY2Ugd2l0aCBQb2xrYWRvdEpTXG4gICAgICAgICAqL1xuICAgICAgICApO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9hcHBOYW1lLCBhcHBOYW1lLCBcImZcIik7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiB3ZSBzaG91bGQgcmVtb3ZlIHRoZSBjaGFpbk5hbWUgZnJvbSB0aGUgcGF5bG9hZCBvZiB0aGUgbWVzc2FnZXMsXG4gICAgICAgICAqIHNpbmNlIHRoaXMgaXMgaW5mb3JtYXRpb24gdGhhdCBkb2Vzbid0IGhhdmUgdG8gYmUgc2VudCBvbiBldmVyeSBtZXNzYWdlIGFuZFxuICAgICAgICAgKiB0aGUgRXh0ZW5zaW9uIGNhbiBleHRyYWN0IGl0IGZyb20gdGhlIGNoYWluU3BlY3MsIGFsc28gdGhhdCB3YXkgd2UgYXZvaWRcbiAgICAgICAgICogcGFyc2luZyBhIGxhcmdlIEpTT04gb24gdGhlIG1haW4gdGhyZWFkLlxuICAgICAgICAgKi9cbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5OYW1lLCBKU09OLnBhcnNlKHJlbGF5Q2hhaW4pLm5hbWUsIFwiZlwiKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5JZCwgdW5pcXVlRXh0ZXJuYWxJZCwgXCJmXCIpO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpblNwZWNzLCByZWxheUNoYWluLCBcImZcIik7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBudWxsLCBcImZcIik7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBcIlwiLCBcImZcIik7XG4gICAgICAgIGlmIChwYXJhY2hhaW4pIHtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBwYXJhY2hhaW4sIFwiZlwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBuYW1lXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0aGUgbmFtZSBvZiB0aGlzIGFwcCB0byBiZSB1c2VkIGJ5IHRoZSBleHRlbnNpb24gZm9yIGRpc3BsYXlcbiAgICAgKiBwdXJwb3Nlcy5cbiAgICAgKlxuICAgICAqIEByZW1hcmtzIEFwcHMgYXJlIGV4cGVjdGVkIHRvIG1ha2UgZWZmb3J0cyB0byBtYWtlIHRoaXMgbmFtZSByZWFzb25hYmx5XG4gICAgICogdW5pcXVlLlxuICAgICAqL1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfYXBwTmFtZSwgXCJmXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGFpblNwZWNzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgY2hhaW4gdGhpcyBgRXh0ZW5zaW9uUHJvdmlkZXJgIGlzIHRhbGtpbmcgdG8uXG4gICAgICovXG4gICAgZ2V0IGNoYWluU3BlY3MoKSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpblNwZWNzLCBcImZcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExldHMgcG9sa2Fkb3QtanMga25vdyB3ZSBzdXBwb3J0IHN1YnNjcmlwdGlvbnNcbiAgICAgKlxuICAgICAqIEByZW1hcmtzIEFsd2F5cyByZXR1cm5zIGB0cnVlYCAtIHRoaXMgcHJvdmlkZXIgc3VwcG9ydHMgc3Vic2NyaXB0aW9ucy5cbiAgICAgKiBQb2xrYWRvdEpTIHVzZXMgdGhpcyBpbnRlcm5hbGx5LlxuICAgICAqL1xuICAgIGdldCBoYXNTdWJzY3JpcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY2xvbmVcbiAgICAgKlxuICAgICAqIEByZW1hcmtzIFRoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICAgKiBAdGhyb3dzIHtAbGluayBFcnJvcn1cbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2xvbmUoKSBpcyBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXCJDb25uZWN0XCIgdG8gdGhlIGV4dGVuc2lvbiAtIHNlbmRzIGEgbWVzc2FnZSB0byB0aGUgYEV4dGVuc2lvbk1lc3NhZ2VSb3V0ZXJgXG4gICAgICogYXNraW5nIGl0IHRvIGNvbm5lY3QgdG8gdGhlIGV4dGVuc2lvbiBiYWNrZ3JvdW5kLlxuICAgICAqXG4gICAgICogQHJldHVybnMgYSByZXNvbHZlZCBQcm9taXNlXG4gICAgICogQHJlbWFya3MgdGhpcyBpcyBhc3luYyB0byBmdWxmaWxsIHRoZSBpbnRlcmZhY2Ugd2l0aCBQb2xrYWRvdEpTXG4gICAgICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgY29uc3QgY29ubmVjdE1zZyA9IHtcbiAgICAgICAgICAgIC4uLl9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NvbW1vbk1lc3NhZ2VEYXRhLCBcImZcIikuY2FsbCh0aGlzKSxcbiAgICAgICAgICAgIGFjdGlvbjogXCJjb25uZWN0XCIsXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnNlbmQoY29ubmVjdE1zZyk7XG4gICAgICAgIC8vIE9uY2UgY29ubmVjdCBpcyBzZW50IC0gc2VuZCBycGMgdG8gZXh0ZW5zaW9uIHRoYXQgd2lsbCBjb250YWluIHRoZSBjaGFpblNwZWNzXG4gICAgICAgIC8vIGZvciB0aGUgZXh0ZW5zaW9uIHRvIGNhbGwgYWRkQ2hhaW4gb24gc21vbGRvdFxuICAgICAgICBjb25zdCBzcGVjTXNnID0ge1xuICAgICAgICAgICAgLi4uX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29tbW9uTWVzc2FnZURhdGEsIFwiZlwiKS5jYWxsKHRoaXMpLFxuICAgICAgICAgICAgYWN0aW9uOiBcImZvcndhcmRcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNwZWNcIixcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpblNwZWNzLCBcImZcIikgfHwgXCJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGlmIChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9wYXJhY2hhaW5TcGVjcywgXCJmXCIpICYmIHNwZWNNc2cubWVzc2FnZSkge1xuICAgICAgICAgICAgc3BlY01zZy5tZXNzYWdlLnBhcmFjaGFpblBheWxvYWQgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9wYXJhY2hhaW5TcGVjcywgXCJmXCIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnNlbmQoc3BlY01zZyk7XG4gICAgICAgIHByb3ZpZGVyLmxpc3RlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhLm9yaWdpbiAmJiBkYXRhLm9yaWdpbiA9PT0gQ09OVEVOVF9TQ1JJUFRfT1JJR0lOKSB7XG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlTWVzc2FnZSwgXCJmXCIpLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCwgc2V0SW50ZXJ2YWwoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hlY2tDbGllbnRQZWVyY291bnQsIFwiZlwiKSwgdGhpcy5oZWFsdGhQaW5nZXJJbnRlcnZhbCksIFwiZlwiKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYW51YWxseSBcImRpc2Nvbm5lY3RcIiAtIHNlbmRzIGEgbWVzc2FnZSB0byB0aGUgYEV4dGVuc2lvbk1lc3NhZ2VSb3V0ZXJgXG4gICAgICogdGVsbGluZyBpdCB0byBkaXNjb25uZWN0IHRoZSBwb3J0IHdpdGggdGhlIGJhY2tncm91bmQgbWFuYWdlci5cbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBjb25zdCBkaXNjb25uZWN0TXNnID0ge1xuICAgICAgICAgICAgLi4uX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29tbW9uTWVzc2FnZURhdGEsIFwiZlwiKS5jYWxsKHRoaXMpLFxuICAgICAgICAgICAgYWN0aW9uOiBcImRpc2Nvbm5lY3RcIixcbiAgICAgICAgfTtcbiAgICAgICAgcHJvdmlkZXIuc2VuZChkaXNjb25uZWN0TXNnKTtcbiAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBcImZcIikgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQsIFwiZlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQsIGZhbHNlLCBcImZcIik7XG4gICAgICAgIHRoaXMuZW1pdChcImRpc2Nvbm5lY3RlZFwiKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBub2RlIGlzIGNvbm5lY3RlZCBvciBub3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0cnVlIC0gaWYgY29ubmVjdGVkIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIGdldCBpc0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBwcm92aWRlciBldmVudHMgLSBpbiBwcmFjdGljZSB0aGUgc21vbGRvdCBwcm92aWRlciBvbmx5XG4gICAgICogZW1pdHMgYSBgY29ubmVjdGVkYCBldmVudCBhZnRlciBzdWNjZXNzZnVsbHkgc3RhcnRpbmcgdGhlIHNtb2xkb3QgY2xpZW50XG4gICAgICogYW5kIGBkaXNjb25uZWN0ZWRgIGFmdGVyIGBkaXNjb25uZWN0YCBpcyBjYWxsZWQuXG4gICAgICogQHBhcmFtIHR5cGUgLSBFdmVudFxuICAgICAqIEBwYXJhbSBzdWIgLSBDYWxsYmFja1xuICAgICAqL1xuICAgIG9uKHR5cGUsIHN1Yikge1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9ldmVudGVtaXR0ZXIsIFwiZlwiKS5vbih0eXBlLCBzdWIpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfZXZlbnRlbWl0dGVyLCBcImZcIikucmVtb3ZlTGlzdGVuZXIodHlwZSwgc3ViKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBhbiBSUEMgcmVxdWVzdCAgdGhlIHdhc20gY2xpZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gVGhlIFJQQyBtZXRob2RzIHRvIGV4ZWN1dGVcbiAgICAgKiBAcGFyYW0gcGFyYW1zIC0gRW5jb2RlZCBwYXJhbWF0ZXJzIGFzIGFwcGxpY2FibGUgZm9yIHRoZSBtZXRob2RcbiAgICAgKiBAcGFyYW0gc3Vic2NyaXB0aW9uIC0gU3Vic2NyaXB0aW9uIGRldGFpbHMgKGludGVybmFsbHkgdXNlZCBieSBgc3Vic2NyaWJlYClcbiAgICAgKi9cbiAgICBhc3luYyBzZW5kKG1ldGhvZCwgcGFyYW1zLCBzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzb24gPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jb2RlciwgXCJmXCIpLmVuY29kZUpzb24obWV0aG9kLCBwYXJhbXMpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jb2RlciwgXCJmXCIpLmdldElkKCk7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gW1wiY2FsbGluZ1wiLCBtZXRob2QsIGpzb25dKTtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2hhbmRsZXJzLCBcImZcIilbaWRdID0ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgcnBjTXNnID0ge1xuICAgICAgICAgICAgICAgIC4uLl9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NvbW1vbk1lc3NhZ2VEYXRhLCBcImZcIikuY2FsbCh0aGlzKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IFwiZm9yd2FyZFwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJycGNcIixcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDoganNvbixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNlbmQocnBjTXNnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsbG93cyBzdWJzY3JpYmluZyB0byBhIHNwZWNpZmljIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHR5cGUgICAgIC0gU3Vic2NyaXB0aW9uIHR5cGVcbiAgICAgKiBAcGFyYW0gbWV0aG9kICAgLSBTdWJzY3JpcHRpb24gbWV0aG9kXG4gICAgICogQHBhcmFtIHBhcmFtcyAgIC0gUGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayAtIENhbGxiYWNrXG4gICAgICogQHJldHVybnMgUHJvbWlzZSAgLSByZXNvbHZlcyB0byB0aGUgaWQgb2YgdGhlIHN1YnNjcmlwdGlvbiB5b3UgY2FuIHVzZSB3aXRoIFtbdW5zdWJzY3JpYmVdXS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogPEJSPlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIGNvbnN0IHByb3ZpZGVyID0gbmV3IEV4dGVuc2lvblByb3ZpZGVyKGNsaWVudCk7XG4gICAgICogY29uc3QgcnBjID0gbmV3IFJwYyhwcm92aWRlcik7XG4gICAgICpcbiAgICAgKiBycGMuc3RhdGUuc3Vic2NyaWJlU3RvcmFnZShbW3N0b3JhZ2UuYmFsYW5jZXMuZnJlZUJhbGFuY2UsIDxBZGRyZXNzPl1dLCAoXywgdmFsdWVzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyh2YWx1ZXMpXG4gICAgICogfSkudGhlbigoc3Vic2NyaXB0aW9uSWQpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdiYWxhbmNlIGNoYW5nZXMgc3Vic2NyaXB0aW9uIGlkOiAnLCBzdWJzY3JpcHRpb25JZClcbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGFzeW5jIHN1YnNjcmliZShcbiAgICAvLyB0aGUgXCJtZXRob2RcIiBwcm9wZXJ0eSBvZiB0aGUgSlNPTiByZXNwb25zZSB0byB0aGlzIHN1YnNjcmlwdGlvblxuICAgIHR5cGUsIFxuICAgIC8vIHRoZSBcIm1ldGhvZFwiIHByb3BlcnR5IG9mIHRoZSBKU09OIHJlcXVlc3QgdG8gcmVnaXN0ZXIgdGhlIHN1YnNjcmlwdGlvblxuICAgIG1ldGhvZCwgXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLXJldHVyblxuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMuc2VuZChtZXRob2QsIHBhcmFtcywgeyBjYWxsYmFjaywgdHlwZSB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsbG93cyB1bnN1YnNjcmliaW5nIHRvIHN1YnNjcmlwdGlvbnMgbWFkZSB3aXRoIFtbc3Vic2NyaWJlXV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdHlwZSAgIC0gU3Vic2NyaXB0aW9uIHR5cGVcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gU3Vic2NyaXB0aW9uIG1ldGhvZFxuICAgICAqIEBwYXJhbSBpZCAgICAgLSBJZCBwYXNzZWQgZm9yIHNlbmQgcGFyYW1ldGVyXG4gICAgICogQHJldHVybnMgUHJvbWlzZSByZXNvbHZpbmcgdG8gd2hldGhlciB0aGUgdW5zdW5zY3JpYmUgcmVxdWVzdCB3YXMgc3VjY2Vzc2Z1bC5cbiAgICAgKi9cbiAgICBhc3luYyB1bnN1YnNjcmliZSh0eXBlLCBtZXRob2QsIGlkKSB7XG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGAke3R5cGV9Ojoke2lkfWA7XG4gICAgICAgIGlmIChpc1VuZGVmaW5lZChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9zdWJzY3JpcHRpb25zLCBcImZcIilbc3Vic2NyaXB0aW9uXSkpIHtcbiAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gYFVuYWJsZSB0byBmaW5kIGFjdGl2ZSBzdWJzY3JpcHRpb249JHtzdWJzY3JpcHRpb259YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIFwiZlwiKVtzdWJzY3JpcHRpb25dO1xuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMuc2VuZChtZXRob2QsIFtpZF0pKTtcbiAgICB9XG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2V2ZW50ZW1pdHRlciwgXCJmXCIpLmVtaXQodHlwZSwgLi4uYXJncyk7XG4gICAgfVxufVxuX0V4dGVuc2lvblByb3ZpZGVyX2NvZGVyID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2V2ZW50ZW1pdHRlciA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVycyA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9zdWJzY3JpcHRpb25zID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX3dhaXRpbmdGb3JJZCA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9hcHBOYW1lID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluTmFtZSA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpbklkID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluU3BlY3MgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfcGFyYWNoYWluU3BlY3MgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29tbW9uTWVzc2FnZURhdGEgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlTWVzc2FnZSA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VSZXN1bHQgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfb25NZXNzYWdlU3Vic2NyaWJlID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX3NpbXVsYXRlTGlmZWN5Y2xlID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2NoZWNrQ2xpZW50UGVlcmNvdW50ID0gbmV3IFdlYWtNYXAoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV4dGVuc2lvblByb3ZpZGVyLmpzLm1hcCIsInZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn07XG52YXIgX19jbGFzc1ByaXZhdGVGaWVsZEdldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZEdldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufTtcbnZhciBfSGVhbHRoQ2hlY2tFcnJvcl9jYXVzZTtcbmV4cG9ydCBjbGFzcyBIZWFsdGhDaGVja0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlc3BvbnNlLCBtZXNzYWdlID0gXCJHb3QgZXJyb3IgcmVzcG9uc2UgYXNraW5nIGZvciBzeXN0ZW0gaGVhbHRoXCIpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIF9IZWFsdGhDaGVja0Vycm9yX2NhdXNlLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9IZWFsdGhDaGVja0Vycm9yX2NhdXNlLCByZXNwb25zZSwgXCJmXCIpO1xuICAgICAgICAvLyAnRXJyb3InIGJyZWFrcyB0aGUgcHJvdG90eXBlIGNoYWluIC0gcmVzdG9yZSBpdFxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgIH1cbiAgICBnZXRDYXVzZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0hlYWx0aENoZWNrRXJyb3JfY2F1c2UsIFwiZlwiKTtcbiAgICB9XG59XG5fSGVhbHRoQ2hlY2tFcnJvcl9jYXVzZSA9IG5ldyBXZWFrTWFwKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvcnMuanMubWFwIiwiY29uc3QgaXNVbmRlZmluZWQgPSAodmFsdWUpID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiO1xufTtcbmZ1bmN0aW9uIGVyYXNlUmVjb3JkKHJlY29yZCwgY2IpIHtcbiAgICBPYmplY3Qua2V5cyhyZWNvcmQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIGNiKHJlY29yZFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgcmVjb3JkW2tleV07XG4gICAgfSk7XG59XG5leHBvcnQgeyBpc1VuZGVmaW5lZCwgZXJhc2VSZWNvcmQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==