(self["webpackChunk_substrate_multiple_network_demo"] = self["webpackChunk_substrate_multiple_network_demo"] || []).push([["packages_connect_dist_ExtensionProvider_ExtensionProvider_js"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZXNfY29ubmVjdF9kaXN0X0V4dGVuc2lvblByb3ZpZGVyX0V4dGVuc2lvblByb3ZpZGVyX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCRzs7QUF3Q0g7Ozs7QUFJRztBQUNJLElBQU0sU0FBUyxHQUFHO0FBQ3ZCO0FBQ0EsTUFBSSxFQUFFLGNBQUMsT0FBRCxFQUF3QztBQUM1QyxVQUFNLENBQUMsV0FBUCxDQUFtQixPQUFuQixFQUE0QixHQUE1QjtBQUNELEdBSnNCOztBQUt2Qjs7O0FBR0c7QUFDSCxRQUFNLEVBQUUsZ0JBQUMsT0FBRCxFQUEwQztBQUNoRCxVQUFNLENBQUMsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsT0FBbkM7QUFDRDtBQVhzQixDQUFsQjtBQTREUDs7OztBQUlHOztBQUNJLElBQU0sUUFBUSxHQUFHO0FBQ3RCO0FBQ0EsTUFBSSxFQUFFLGNBQUMsT0FBRCxFQUF1QztBQUMzQyxVQUFNLENBQUMsV0FBUCxDQUFtQixPQUFuQixFQUE0QixHQUE1QjtBQUNELEdBSnFCOztBQUt0Qjs7O0FBR0c7QUFDSCxRQUFNLEVBQUUsZ0JBQUMsT0FBRCxFQUF5QztBQUMvQyxVQUFNLENBQUMsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsT0FBbkM7QUFDRDtBQVhxQixDQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcElQOztBQUNBOztBQUNBOzs7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFTQSxJQUFNLHFCQUFxQixHQUFHLGdCQUE5QjtBQUNBLElBQU0seUJBQXlCLEdBQUcsb0JBQWxDO0FBRUEsSUFBTSxDQUFDLEdBQUcsc0RBQU0sQ0FBQyx5QkFBRCxDQUFoQjtBQTJCQSxJQUFNLFVBQVUsR0FBZ0M7QUFDOUMscUJBQW1CLEVBQUUscUJBRHlCO0FBRTlDLCtCQUE2QixFQUFFLCtC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Q04sUUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFELENBQVAsQ0FBRjtBQUNEOztBQUVELFdBQU8sTUFBTSxDQUFDLEdBQUQsQ0FBYjtBQUNELEdBTkQ7QUFPRCIsInNvdXJjZXMiOlsid2VicGFjazovL0BzdWJzdHJhdGUvbXVsdGlwbGUtbmV0d29yay1kZW1vL2lnbm9yZWR8L2hvbWUvd2lyZWRua29kL0RvY3VtZW50cy9yZXBvcy9wYXJpdHkvc3Vic3RyYXRlLWNvbm5lY3Qvbm9kZV9tb2R1bGVzL2JuLmpzL2xpYnxidWZmZXIiLCJ3ZWJwYWNrOi8vQHN1YnN0cmF0ZS9tdWx0aXBsZS1uZXR3b3JrLWRlbW8vLi4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL0BzdWJzdHJhdGUvbXVsdGlwbGUtbmV0d29yay1kZW1vLy4uLy4uL3NyYy9FeHRlbnNpb25Qcm92aWRlci9FeHRlbnNpb25Qcm92aWRlci50cyIsIndlYnBhY2s6Ly9Ac3Vic3RyYXRlL211bHRpcGxlLW5ldHdvcmstZGVtby8uLi9zcmMvZXJyb3JzLnRzIiwid2VicGFjazovL0BzdWJzdHJhdGUvbXVsdGlwbGUtbmV0d29yay1kZW1vLy4uLy4uL3NyYy91dGlscy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoaWdub3JlZCkgKi8iLCIvKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICpcbiAqIEluIG9yZGVyIHRvIHVuZGVyc3RhbmQgdGhlIHByb3RvY29sIHlvdSBzaG91bGQgcmVhbGlzZSB0aGVyZSBhcmUgYWN0dWFsbHlcbiAqIDIgaG9wcyB0aGF0IGhhcHBlbiBpbiBjb21tdW5pY2F0aW9uIGJlY2F1c2Ugb2YgdGhlIGFyY2hpdGVjdHVyZSBvZiBicm93c2VyXG4gKiBleHRlbnNpb25zLiAgVGhlIGFwcCBoYXMgdG8gYHdpbmRvdy5wb3N0TWVzc2FnZWAgbWVzc2FnZXMgdG8gdGhlIGNvbnRlbnRcbiAqIHNjcmlwdCB0aGF0IGdldHMgaW5qZWN0ZWQgYnkgdGhlIGV4dGVuc2lvbi4gSXQgaXMgdGhlIGNvbnRlbnQgc2NyaXB0IHRoYXRcbiAqIGhhcyBhY2Nlc3MgdG8gdGhlIGV4dGVuc2lvbiBBUElzIHRvIGJlIGFibGUgdG8gcG9zdCBtZXNzYWdlcyB0byB0aGVcbiAqIGV4dGVuc2lvbiBiYWNrZ3JvdW5kLlxuICpcbiAqIFlvdSBjYW4gdGhpbmsgb2YgdGhlIHByb3RvY29sIHR5cGVzIGxpa2UgbGF5ZXJzIG9mIGFuIG9uaW9uLiBUaGUgaW5uZXJtb3N0XG4gKiBsYXllciBpcyB0aGUgb3JpZ2luYWwgSlNPTiBSUEMgcmVxdWVzdC9yZXNwb25zZXMuIFRoZW4gd2Ugd3JhcCBleHRyYSBsYXllcnNcbiAqICh0eXBlcykgZm9yIHRoZSBvdGhlciAyIGhvcHMgd2hpY2ggdGhlbiBnZXQgcGVlbGVkIG9mZiBhdCBlYWNoIGhvcC4gVGhlXG4gKiB7QGxpbmsgTWVzc2FnZVRvTWFuYWdlcn0gLyB7QGxpbmsgTWVzc2FnZUZyb21NYW5hZ2VyfSByZXByZXNlbnRpbmcgdGhlXG4gKiBleHRlbnNpb24gY29tbXVuaWNhdGlvbiBjb250ZW50IHNjcmlwdCBcXDxcXD4gYmFja2dyb3VuZC4gVGhlbiB0aGUgb3V0ZXJtb3N0XG4gKiB7QGxpbmsgRXh0ZW5zaW9uTWVzc2FnZX0gLyB7QGxpbmsgUHJvdmlkZXJNZXNzYWdlfSByZXByZXNlbnRpbmcgdGhlXG4gKiBjb21tdW5pY2F0aW9uIGJldHdlZW4gdGhlIFBvbGthZG90SlMgcHJvdmlkZXIgaW4gdGhlIGFwcCBhbmQgdGhlIGNvbnRlbnRcbiAqIHNjcmlwdC5cbiAqXG4gKiBUaGUge0BsaW5rIEV4dGVuc2lvblByb3ZpZGVyfSBpcyB0aGUgY2xhc3MgaW4gdGhlIGFwcC5cbiAqIFRoZSB7QGxpbmsgRXh0ZW5zaW9uTWVzc2FnZVJvdXRlcn0gaXMgdGhlIGNsYXNzIGluIHRoZSBjb250ZW50IHNjcmlwdC5cbiAqIFRoZSB7QGxpbmsgQ29ubmVjdGlvbk1hbmFnZXJ9IGlzIHRoZSBjbGFzcyBpbiB0aGUgZXh0ZW5zaW9uIGJhY2tncm91bmQuXG4gKi9cbi8qKlxuICogZXh0ZW5zaW9uIHByb3ZpZGVzIHN0cm9uZ2x5IHR5cGVkIGNvbnZlbmllbmNlIHdyYXBwZXJzIGFyb3VuZFxuICogdGhlIGB3aW5kb3cucG9zdE1lc3NhZ2VgIGFuZCBgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJgIEFQSXMgdXNlZCBmb3JcbiAqIG1lc3NhZ2UgcGFzc2luZyBvbiB0aGUgZXh0ZW5zaW9uIHNpZGUgb2YgY29tbXVuaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGV4dGVuc2lvbiA9IHtcbiAgICAvKiogc2VuZCBhIG1lc3NhZ2UgZnJvbSB0aGUgZXh0ZW5zaW9uIHRvIHRoZSBhcHAgKiovXG4gICAgc2VuZDogKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFwiKlwiKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBtZXNzYWdlcyBmcm9tIHRoZSBgRXh0ZW5zaW9uUHJvdmlkZXJgIGluIHRoZSBhcHAgc2VudCB0b1xuICAgICAqIHRoZSBleHRlbnNpb24uXG4gICAgICovXG4gICAgbGlzdGVuOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgaGFuZGxlcik7XG4gICAgfSxcbn07XG4vKipcbiAqIHByb3ZpZGVyIHByb3ZpZGVzIHByb3Blcmx5IHR5cGVkIGNvbnZlbmllbmNlIHdyYXBwZXJzIGFyb3VuZCB0aGVcbiAqIGB3aW5kb3cucG9zdE1lc3NhZ2VgIGFuZCBgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJgIEFQSXMgdXNlZCBmb3IgbWVzc2FnZVxuICogcGFzc2luZyBvbiB0aGUgXFxAc3Vic3RyYXRlL2Nvbm5lY3QgYEV4dGVuc2lvblByb3ZpZGVyYCBlbmQgb2YgY29tbXVuaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IHByb3ZpZGVyID0ge1xuICAgIC8qKiBzZW5kIGEgbWVzc2FnZSBmcm9tIHRoZSBhcHAgdG8gdGhlIGV4dGVuc2lvbiAqKi9cbiAgICBzZW5kOiAobWVzc2FnZSkgPT4ge1xuICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgXCIqXCIpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIG1lc3NhZ2VzIGZyb20gdGhlIGBFeHRlbnNpb25NZXNzYWdlUm91dGVyYCBpbiB0aGUgZXh0ZW5zaW9uIHNlbnRcbiAgICAgKiB0byB0aGUgYXBwLlxuICAgICAqL1xuICAgIGxpc3RlbjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGhhbmRsZXIpO1xuICAgIH0sXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRTZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufTtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9FeHRlbnNpb25Qcm92aWRlcl9jb2RlciwgX0V4dGVuc2lvblByb3ZpZGVyX2V2ZW50ZW1pdHRlciwgX0V4dGVuc2lvblByb3ZpZGVyX2hhbmRsZXJzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfc3Vic2NyaXB0aW9ucywgX0V4dGVuc2lvblByb3ZpZGVyX3dhaXRpbmdGb3JJZCwgX0V4dGVuc2lvblByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQsIF9FeHRlbnNpb25Qcm92aWRlcl9hcHBOYW1lLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5OYW1lLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5JZCwgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluU3BlY3MsIF9FeHRlbnNpb25Qcm92aWRlcl9wYXJhY2hhaW5TcGVjcywgX0V4dGVuc2lvblByb3ZpZGVyX2NvbW1vbk1lc3NhZ2VEYXRhLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlTWVzc2FnZSwgX0V4dGVuc2lvblByb3ZpZGVyX29uTWVzc2FnZVJlc3VsdCwgX0V4dGVuc2lvblByb3ZpZGVyX29uTWVzc2FnZVN1YnNjcmliZSwgX0V4dGVuc2lvblByb3ZpZGVyX3NpbXVsYXRlTGlmZWN5Y2xlLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hlY2tDbGllbnRQZWVyY291bnQ7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3MgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudCAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuaW1wb3J0IHsgUnBjQ29kZXIgfSBmcm9tIFwiQHBvbGthZG90L3JwYy1wcm92aWRlci9jb2RlclwiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIkBwb2xrYWRvdC91dGlsXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudGVtaXR0ZXIzXCI7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCwgZXJhc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcbmltcG9ydCB7IEhlYWx0aENoZWNrRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzLmpzXCI7XG5pbXBvcnQgeyBwcm92aWRlciwgfSBmcm9tIFwiQHN1YnN0cmF0ZS9jb25uZWN0LWV4dGVuc2lvbi1wcm90b2NvbFwiO1xuY29uc3QgQ09OVEVOVF9TQ1JJUFRfT1JJR0lOID0gXCJjb250ZW50LXNjcmlwdFwiO1xuY29uc3QgRVhURU5TSU9OX1BST1ZJREVSX09SSUdJTiA9IFwiZXh0ZW5zaW9uLXByb3ZpZGVyXCI7XG5jb25zdCBsID0gbG9nZ2VyKEVYVEVOU0lPTl9QUk9WSURFUl9PUklHSU4pO1xuY29uc3QgQU5HTElDSVNNUyA9IHtcbiAgICBjaGFpbl9maW5hbGlzZWRIZWFkOiBcImNoYWluX2ZpbmFsaXplZEhlYWRcIixcbiAgICBjaGFpbl9zdWJzY3JpYmVGaW5hbGlzZWRIZWFkczogXCJjaGFpbl9zdWJzY3JpYmVGaW5hbGl6ZWRIZWFkc1wiLFxuICAgIGNoYWluX3Vuc3Vic2NyaWJlRmluYWxpc2VkSGVhZHM6IFwiY2hhaW5fdW5zdWJzY3JpYmVGaW5hbGl6ZWRIZWFkc1wiLFxufTtcbi8qXG4gKiBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmV0d2VlbiBjaGVja3MgdG8gc2VlIGlmIHdlIGhhdmUgYW55XG4gKiBjb25uZWN0ZWQgcGVlcnMgaW4gdGhlIHNtb2xkb3QgY2xpZW50XG4gKi9cbmNvbnN0IENPTk5FQ1RJT05fU1RBVEVfUElOR0VSX0lOVEVSVkFMID0gMjAwMDtcbi8qKlxuICogVGhlIEV4dGVuc2lvblByb3ZpZGVyIGFsbG93cyBpbnRlcmFjdGluZyB3aXRoIGEgc21vbGRvdC1iYXNlZCBXQVNNIGxpZ2h0XG4gKiBjbGllbnQgcnVubmluZyBpbiBhIGJyb3dzZXIgZXh0ZW5zaW9uLiAgSXQgaXMgbm90IGRlc2lnbmVkIHRvIGJlIHVzZWRcbiAqIGRpcmVjdGx5LiAgWW91IHNob3VsZCB1c2UgdGhlIGBcXEBzdWJzdHJhdGUvY29ubmVjdGAgcGFja2FnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4dGVuc2lvblByb3ZpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcHBOYW1lLCB1bmlxdWVFeHRlcm5hbElkLCByZWxheUNoYWluLCBwYXJhY2hhaW4pIHtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2NvZGVyLnNldCh0aGlzLCBuZXcgUnBjQ29kZXIoKSk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9ldmVudGVtaXR0ZXIuc2V0KHRoaXMsIG5ldyBFdmVudEVtaXR0ZXIoKSk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVycy5zZXQodGhpcywge30pO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfc3Vic2NyaXB0aW9ucy5zZXQodGhpcywge30pO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfd2FpdGluZ0ZvcklkLnNldCh0aGlzLCB7fSk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZC5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLnNldCh0aGlzLCBmYWxzZSk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9hcHBOYW1lLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5OYW1lLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5JZC5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluU3BlY3Muc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9wYXJhY2hhaW5TcGVjcy5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgLypcbiAgICAgICAgICogSG93IGZyZXF1ZW50bHkgdG8gc2VlIGlmIHdlIGhhdmUgYW55IHBlZXJzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhlYWx0aFBpbmdlckludGVydmFsID0gQ09OTkVDVElPTl9TVEFURV9QSU5HRVJfSU5URVJWQUw7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9jb21tb25NZXNzYWdlRGF0YS5zZXQodGhpcywgKCkgPT4gKHtcbiAgICAgICAgICAgIGFwcE5hbWU6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2FwcE5hbWUsIFwiZlwiKSxcbiAgICAgICAgICAgIGNoYWluSWQ6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluSWQsIFwiZlwiKSxcbiAgICAgICAgICAgIGNoYWluTmFtZTogX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5OYW1lLCBcImZcIiksXG4gICAgICAgICAgICBvcmlnaW46IEVYVEVOU0lPTl9QUk9WSURFUl9PUklHSU4sXG4gICAgICAgIH0pKTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2hhbmRsZU1lc3NhZ2Uuc2V0KHRoaXMsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YS5kaXNjb25uZWN0ICYmIGRhdGEuZGlzY29ubmVjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCBmYWxzZSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImRpc2Nvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihcIkRpc2Nvbm5lY3RlZCBmcm9tIHRoZSBleHRlbnNpb25cIik7XG4gICAgICAgICAgICAgICAgLy8gcmVqZWN0IGFsbCBoYW5naW5nIHJlcXVlc3RzXG4gICAgICAgICAgICAgICAgZXJhc2VSZWNvcmQoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlcnMsIFwiZlwiKSwgKGgpID0+IGguY2FsbGJhY2soZXJyb3IsIHVuZGVmaW5lZCkpO1xuICAgICAgICAgICAgICAgIGVyYXNlUmVjb3JkKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3dhaXRpbmdGb3JJZCwgXCJmXCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJlcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImVycm9yXCIsIG5ldyBFcnJvcihtZXNzYWdlLnBheWxvYWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IFwicnBjXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBycGNTdHJpbmcgPSBtZXNzYWdlLnBheWxvYWQ7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBbXCJyZWNlaXZlZFwiLCBycGNTdHJpbmddKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UocnBjU3RyaW5nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNVbmRlZmluZWQocmVzcG9uc2UubWV0aG9kKVxuICAgICAgICAgICAgICAgICAgICA/IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX29uTWVzc2FnZVJlc3VsdCwgXCJmXCIpLmNhbGwodGhpcywgcmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgIDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfb25NZXNzYWdlU3Vic2NyaWJlLCBcImZcIikuY2FsbCh0aGlzLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgVW5yZWNvZ25pc2VkIG1lc3NhZ2UgdHlwZSBmcm9tIGV4dGVuc2lvbiAke21lc3NhZ2UudHlwZX1gO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImVycm9yXCIsIG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VSZXN1bHQuc2V0KHRoaXMsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2hhbmRsZXJzLCBcImZcIilbcmVzcG9uc2UuaWRdO1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlciBmb3IgaWQ9JHtyZXNwb25zZS5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbWV0aG9kLCBzdWJzY3JpcHRpb24gfSA9IGhhbmRsZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29kZXIsIFwiZlwiKS5kZWNvZGVSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gZmlyc3Qgc2VuZCB0aGUgcmVzdWx0IC0gaW4gY2FzZSBvZiBzdWJzLCB3ZSBtYXkgaGF2ZSBhbiB1cGRhdGVcbiAgICAgICAgICAgICAgICAvLyBpbW1lZGlhdGVseSBpZiB3ZSBoYXZlIHNvbWUgcXVldWVkIHJlc3VsdHMgYWxyZWFkeVxuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YklkID0gYCR7c3Vic2NyaXB0aW9uLnR5cGV9Ojoke3Jlc3VsdH1gO1xuICAgICAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9zdWJzY3JpcHRpb25zLCBcImZcIilbc3ViSWRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3Vic2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgcmVzdWx0IHdhaXRpbmcgZm9yIHRoaXMgc3Vic2NyaXB0aW9uIGFscmVhZHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3dhaXRpbmdGb3JJZCwgXCJmXCIpW3N1YklkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfb25NZXNzYWdlU3Vic2NyaWJlLCBcImZcIikuY2FsbCh0aGlzLCBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl93YWl0aW5nRm9ySWQsIFwiZlwiKVtzdWJJZF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsYmFjayhlcnJvciwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVycywgXCJmXCIpW3Jlc3BvbnNlLmlkXTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUuc2V0KHRoaXMsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gQU5HTElDSVNNU1tyZXNwb25zZS5tZXRob2RdIHx8IHJlc3BvbnNlLm1ldGhvZCB8fCBcImludmFsaWRcIjtcbiAgICAgICAgICAgIGNvbnN0IHN1YklkID0gYCR7bWV0aG9kfTo6JHtyZXNwb25zZS5wYXJhbXMuc3Vic2NyaXB0aW9ufWA7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfc3Vic2NyaXB0aW9ucywgXCJmXCIpW3N1YklkXTtcbiAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIC8vIHN0b3JlIHRoZSByZXNwb25zZSwgd2UgY291bGQgaGF2ZSBvdXQtb2Ytb3JkZXIgc3ViaWQgY29taW5nIGluXG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBcImZcIilbc3ViSWRdID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlciBmb3Igc3Vic2NyaXB0aW9uPSR7c3ViSWR9IHJlc3BvbnNlSWQ9JHtyZXNwb25zZS5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBob3VzZWtlZXBpbmdcbiAgICAgICAgICAgIGRlbGV0ZSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl93YWl0aW5nRm9ySWQsIFwiZlwiKVtzdWJJZF07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NvZGVyLCBcImZcIikuZGVjb2RlUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2soZXJyb3IsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBfRXh0ZW5zaW9uUHJvdmlkZXJfc2ltdWxhdGVMaWZlY3ljbGUuc2V0KHRoaXMsIChoZWFsdGgpID0+IHtcbiAgICAgICAgICAgIC8vIGRldmVsb3BtZW50IGNoYWlucyBzaG91bGQgbm90IGhhdmUgcGVlcnMgc28gd2Ugb25seSBlbWl0IGNvbm5lY3RlZFxuICAgICAgICAgICAgLy8gb25jZSBhbmQgbmV2ZXIgZGlzY29ubmVjdFxuICAgICAgICAgICAgaWYgKGhlYWx0aC5zaG91bGRIYXZlUGVlcnMgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQsIHRydWUsIFwiZlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwiY29ubmVjdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICBsLmRlYnVnKGBlbWl0dGVkIENPTk5FQ1RFRGApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBlZXJDb3VudCA9IGhlYWx0aC5wZWVycztcbiAgICAgICAgICAgIGNvbnN0IHBlZXJDaGVja3MgPSAocGVlckNvdW50ID4gMCB8fCAhaGVhbHRoLnNob3VsZEhhdmVQZWVycykgJiYgIWhlYWx0aC5pc1N5bmNpbmc7XG4gICAgICAgICAgICBsLmRlYnVnKGBTaW11bGF0aW5nIGxpZmVjeWxjZSBldmVudHMgZnJvbSBzeXN0ZW1faGVhbHRoYCk7XG4gICAgICAgICAgICBsLmRlYnVnKGBpc0Nvbm5lY3RlZDogJHtfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpLnRvU3RyaW5nKCl9LCBuZXcgcGVlckNvdW50OiAke3BlZXJDb3VudH1gKTtcbiAgICAgICAgICAgIGlmIChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpICYmIHBlZXJDaGVja3MpIHtcbiAgICAgICAgICAgICAgICAvLyBzdGlsbCBjb25uZWN0ZWRcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQsIFwiZlwiKSAmJiBwZWVyQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgZmFsc2UsIFwiZlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJkaXNjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZyhgZW1pdHRlZCBESVNDT05ORUNURURgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikgJiYgcGVlckNoZWNrcykge1xuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkLCB0cnVlLCBcImZcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwiY29ubmVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIGwuZGVidWcoYGVtaXR0ZWQgQ09OTkVDVEVEYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc3RpbGwgbm90IGNvbm5lY3RlZFxuICAgICAgICB9KTtcbiAgICAgICAgX0V4dGVuc2lvblByb3ZpZGVyX2NoZWNrQ2xpZW50UGVlcmNvdW50LnNldCh0aGlzLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmQoXCJzeXN0ZW1faGVhbHRoXCIsIFtdKVxuICAgICAgICAgICAgICAgIC50aGVuKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3NpbXVsYXRlTGlmZWN5Y2xlLCBcImZcIikpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IEhlYWx0aENoZWNrRXJyb3IoZXJyb3IpKSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFwiQ29ubmVjdFwiIHRvIHRoZSBleHRlbnNpb24gLSBzZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIGBFeHRlbnNpb25NZXNzYWdlUm91dGVyYFxuICAgICAgICAgKiBhc2tpbmcgaXQgdG8gY29ubmVjdCB0byB0aGUgZXh0ZW5zaW9uIGJhY2tncm91bmQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIGEgcmVzb2x2ZWQgUHJvbWlzZVxuICAgICAgICAgKiBAcmVtYXJrcyB0aGlzIGlzIGFzeW5jIHRvIGZ1bGZpbGwgdGhlIGludGVyZmFjZSB3aXRoIFBvbGthZG90SlNcbiAgICAgICAgICovXG4gICAgICAgICk7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2FwcE5hbWUsIGFwcE5hbWUsIFwiZlwiKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86IHdlIHNob3VsZCByZW1vdmUgdGhlIGNoYWluTmFtZSBmcm9tIHRoZSBwYXlsb2FkIG9mIHRoZSBtZXNzYWdlcyxcbiAgICAgICAgICogc2luY2UgdGhpcyBpcyBpbmZvcm1hdGlvbiB0aGF0IGRvZXNuJ3QgaGF2ZSB0byBiZSBzZW50IG9uIGV2ZXJ5IG1lc3NhZ2UgYW5kXG4gICAgICAgICAqIHRoZSBFeHRlbnNpb24gY2FuIGV4dHJhY3QgaXQgZnJvbSB0aGUgY2hhaW5TcGVjcywgYWxzbyB0aGF0IHdheSB3ZSBhdm9pZFxuICAgICAgICAgKiBwYXJzaW5nIGEgbGFyZ2UgSlNPTiBvbiB0aGUgbWFpbiB0aHJlYWQuXG4gICAgICAgICAqL1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpbk5hbWUsIEpTT04ucGFyc2UocmVsYXlDaGFpbikubmFtZSwgXCJmXCIpO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGFpbklkLCB1bmlxdWVFeHRlcm5hbElkLCBcImZcIik7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluU3BlY3MsIHJlbGF5Q2hhaW4sIFwiZlwiKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQsIG51bGwsIFwiZlwiKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfcGFyYWNoYWluU3BlY3MsIFwiXCIsIFwiZlwiKTtcbiAgICAgICAgaWYgKHBhcmFjaGFpbikge1xuICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfcGFyYWNoYWluU3BlY3MsIHBhcmFjaGFpbiwgXCJmXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIG5hbWVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRoZSBuYW1lIG9mIHRoaXMgYXBwIHRvIGJlIHVzZWQgYnkgdGhlIGV4dGVuc2lvbiBmb3IgZGlzcGxheVxuICAgICAqIHB1cnBvc2VzLlxuICAgICAqXG4gICAgICogQHJlbWFya3MgQXBwcyBhcmUgZXhwZWN0ZWQgdG8gbWFrZSBlZmZvcnRzIHRvIG1ha2UgdGhpcyBuYW1lIHJlYXNvbmFibHlcbiAgICAgKiB1bmlxdWUuXG4gICAgICovXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9hcHBOYW1lLCBcImZcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNoYWluU3BlY3NcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBjaGFpbiB0aGlzIGBFeHRlbnNpb25Qcm92aWRlcmAgaXMgdGFsa2luZyB0by5cbiAgICAgKi9cbiAgICBnZXQgY2hhaW5TcGVjcygpIHtcbiAgICAgICAgcmV0dXJuIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluU3BlY3MsIFwiZlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGV0cyBwb2xrYWRvdC1qcyBrbm93IHdlIHN1cHBvcnQgc3Vic2NyaXB0aW9uc1xuICAgICAqXG4gICAgICogQHJlbWFya3MgQWx3YXlzIHJldHVybnMgYHRydWVgIC0gdGhpcyBwcm92aWRlciBzdXBwb3J0cyBzdWJzY3JpcHRpb25zLlxuICAgICAqIFBvbGthZG90SlMgdXNlcyB0aGlzIGludGVybmFsbHkuXG4gICAgICovXG4gICAgZ2V0IGhhc1N1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjbG9uZVxuICAgICAqXG4gICAgICogQHJlbWFya3MgVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZFxuICAgICAqIEB0aHJvd3Mge0BsaW5rIEVycm9yfVxuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbG9uZSgpIGlzIG5vdCBzdXBwb3J0ZWQuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcIkNvbm5lY3RcIiB0byB0aGUgZXh0ZW5zaW9uIC0gc2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBgRXh0ZW5zaW9uTWVzc2FnZVJvdXRlcmBcbiAgICAgKiBhc2tpbmcgaXQgdG8gY29ubmVjdCB0byB0aGUgZXh0ZW5zaW9uIGJhY2tncm91bmQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhIHJlc29sdmVkIFByb21pc2VcbiAgICAgKiBAcmVtYXJrcyB0aGlzIGlzIGFzeW5jIHRvIGZ1bGZpbGwgdGhlIGludGVyZmFjZSB3aXRoIFBvbGthZG90SlNcbiAgICAgKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBjb25zdCBjb25uZWN0TXNnID0ge1xuICAgICAgICAgICAgLi4uX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29tbW9uTWVzc2FnZURhdGEsIFwiZlwiKS5jYWxsKHRoaXMpLFxuICAgICAgICAgICAgYWN0aW9uOiBcImNvbm5lY3RcIixcbiAgICAgICAgfTtcbiAgICAgICAgcHJvdmlkZXIuc2VuZChjb25uZWN0TXNnKTtcbiAgICAgICAgLy8gT25jZSBjb25uZWN0IGlzIHNlbnQgLSBzZW5kIHJwYyB0byBleHRlbnNpb24gdGhhdCB3aWxsIGNvbnRhaW4gdGhlIGNoYWluU3BlY3NcbiAgICAgICAgLy8gZm9yIHRoZSBleHRlbnNpb24gdG8gY2FsbCBhZGRDaGFpbiBvbiBzbW9sZG90XG4gICAgICAgIGNvbnN0IHNwZWNNc2cgPSB7XG4gICAgICAgICAgICAuLi5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jb21tb25NZXNzYWdlRGF0YSwgXCJmXCIpLmNhbGwodGhpcyksXG4gICAgICAgICAgICBhY3Rpb246IFwiZm9yd2FyZFwiLFxuICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwic3BlY1wiLFxuICAgICAgICAgICAgICAgIHBheWxvYWQ6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluU3BlY3MsIFwiZlwiKSB8fCBcIlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBcImZcIikgJiYgc3BlY01zZy5tZXNzYWdlKSB7XG4gICAgICAgICAgICBzcGVjTXNnLm1lc3NhZ2UucGFyYWNoYWluUGF5bG9hZCA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBcImZcIik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIuc2VuZChzcGVjTXNnKTtcbiAgICAgICAgcHJvdmlkZXIubGlzdGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEub3JpZ2luICYmIGRhdGEub3JpZ2luID09PSBDT05URU5UX1NDUklQVF9PUklHSU4pIHtcbiAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVNZXNzYWdlLCBcImZcIikuY2FsbCh0aGlzLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBzZXRJbnRlcnZhbChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jaGVja0NsaWVudFBlZXJjb3VudCwgXCJmXCIpLCB0aGlzLmhlYWx0aFBpbmdlckludGVydmFsKSwgXCJmXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hbnVhbGx5IFwiZGlzY29ubmVjdFwiIC0gc2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBgRXh0ZW5zaW9uTWVzc2FnZVJvdXRlcmBcbiAgICAgKiB0ZWxsaW5nIGl0IHRvIGRpc2Nvbm5lY3QgdGhlIHBvcnQgd2l0aCB0aGUgYmFja2dyb3VuZCBtYW5hZ2VyLlxuICAgICAqL1xuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGNvbnN0IGRpc2Nvbm5lY3RNc2cgPSB7XG4gICAgICAgICAgICAuLi5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jb21tb25NZXNzYWdlRGF0YSwgXCJmXCIpLmNhbGwodGhpcyksXG4gICAgICAgICAgICBhY3Rpb246IFwiZGlzY29ubmVjdFwiLFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci5zZW5kKGRpc2Nvbm5lY3RNc2cpO1xuICAgICAgICBpZiAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQsIFwiZlwiKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCwgXCJmXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9pc0Nvbm5lY3RlZCwgZmFsc2UsIFwiZlwiKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiZGlzY29ubmVjdGVkXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIG5vZGUgaXMgY29ubmVjdGVkIG9yIG5vdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRydWUgLSBpZiBjb25uZWN0ZWQgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgZ2V0IGlzQ29ubmVjdGVkKCkge1xuICAgICAgICByZXR1cm4gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaXNDb25uZWN0ZWQsIFwiZlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHByb3ZpZGVyIGV2ZW50cyAtIGluIHByYWN0aWNlIHRoZSBzbW9sZG90IHByb3ZpZGVyIG9ubHlcbiAgICAgKiBlbWl0cyBhIGBjb25uZWN0ZWRgIGV2ZW50IGFmdGVyIHN1Y2Nlc3NmdWxseSBzdGFydGluZyB0aGUgc21vbGRvdCBjbGllbnRcbiAgICAgKiBhbmQgYGRpc2Nvbm5lY3RlZGAgYWZ0ZXIgYGRpc2Nvbm5lY3RgIGlzIGNhbGxlZC5cbiAgICAgKiBAcGFyYW0gdHlwZSAtIEV2ZW50XG4gICAgICogQHBhcmFtIHN1YiAtIENhbGxiYWNrXG4gICAgICovXG4gICAgb24odHlwZSwgc3ViKSB7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2V2ZW50ZW1pdHRlciwgXCJmXCIpLm9uKHR5cGUsIHN1Yik7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9FeHRlbnNpb25Qcm92aWRlcl9ldmVudGVtaXR0ZXIsIFwiZlwiKS5yZW1vdmVMaXN0ZW5lcih0eXBlLCBzdWIpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGFuIFJQQyByZXF1ZXN0ICB0aGUgd2FzbSBjbGllbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBUaGUgUlBDIG1ldGhvZHMgdG8gZXhlY3V0ZVxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBFbmNvZGVkIHBhcmFtYXRlcnMgYXMgYXBwbGljYWJsZSBmb3IgdGhlIG1ldGhvZFxuICAgICAqIEBwYXJhbSBzdWJzY3JpcHRpb24gLSBTdWJzY3JpcHRpb24gZGV0YWlscyAoaW50ZXJuYWxseSB1c2VkIGJ5IGBzdWJzY3JpYmVgKVxuICAgICAqL1xuICAgIGFzeW5jIHNlbmQobWV0aG9kLCBwYXJhbXMsIHN1YnNjcmlwdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QganNvbiA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NvZGVyLCBcImZcIikuZW5jb2RlSnNvbihtZXRob2QsIHBhcmFtcyk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX2NvZGVyLCBcImZcIikuZ2V0SWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBbXCJjYWxsaW5nXCIsIG1ldGhvZCwganNvbl0pO1xuICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfaGFuZGxlcnMsIFwiZlwiKVtpZF0gPSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBycGNNc2cgPSB7XG4gICAgICAgICAgICAgICAgLi4uX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY29tbW9uTWVzc2FnZURhdGEsIFwiZlwiKS5jYWxsKHRoaXMpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogXCJmb3J3YXJkXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJwY1wiLFxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiBqc29uLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcHJvdmlkZXIuc2VuZChycGNNc2cpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxsb3dzIHN1YnNjcmliaW5nIHRvIGEgc3BlY2lmaWMgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdHlwZSAgICAgLSBTdWJzY3JpcHRpb24gdHlwZVxuICAgICAqIEBwYXJhbSBtZXRob2QgICAtIFN1YnNjcmlwdGlvbiBtZXRob2RcbiAgICAgKiBAcGFyYW0gcGFyYW1zICAgLSBQYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gQ2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlICAtIHJlc29sdmVzIHRvIHRoZSBpZCBvZiB0aGUgc3Vic2NyaXB0aW9uIHlvdSBjYW4gdXNlIHdpdGggW1t1bnN1YnNjcmliZV1dLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiA8QlI+XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogY29uc3QgcHJvdmlkZXIgPSBuZXcgRXh0ZW5zaW9uUHJvdmlkZXIoY2xpZW50KTtcbiAgICAgKiBjb25zdCBycGMgPSBuZXcgUnBjKHByb3ZpZGVyKTtcbiAgICAgKlxuICAgICAqIHJwYy5zdGF0ZS5zdWJzY3JpYmVTdG9yYWdlKFtbc3RvcmFnZS5iYWxhbmNlcy5mcmVlQmFsYW5jZSwgPEFkZHJlc3M+XV0sIChfLCB2YWx1ZXMpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKHZhbHVlcylcbiAgICAgKiB9KS50aGVuKChzdWJzY3JpcHRpb25JZCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ2JhbGFuY2UgY2hhbmdlcyBzdWJzY3JpcHRpb24gaWQ6ICcsIHN1YnNjcmlwdGlvbklkKVxuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICovXG4gICAgYXN5bmMgc3Vic2NyaWJlKFxuICAgIC8vIHRoZSBcIm1ldGhvZFwiIHByb3BlcnR5IG9mIHRoZSBKU09OIHJlc3BvbnNlIHRvIHRoaXMgc3Vic2NyaXB0aW9uXG4gICAgdHlwZSwgXG4gICAgLy8gdGhlIFwibWV0aG9kXCIgcHJvcGVydHkgb2YgdGhlIEpTT04gcmVxdWVzdCB0byByZWdpc3RlciB0aGUgc3Vic2NyaXB0aW9uXG4gICAgbWV0aG9kLCBcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5zZW5kKG1ldGhvZCwgcGFyYW1zLCB7IGNhbGxiYWNrLCB0eXBlIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxsb3dzIHVuc3Vic2NyaWJpbmcgdG8gc3Vic2NyaXB0aW9ucyBtYWRlIHdpdGggW1tzdWJzY3JpYmVdXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0eXBlICAgLSBTdWJzY3JpcHRpb24gdHlwZVxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBTdWJzY3JpcHRpb24gbWV0aG9kXG4gICAgICogQHBhcmFtIGlkICAgICAtIElkIHBhc3NlZCBmb3Igc2VuZCBwYXJhbWV0ZXJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHJlc29sdmluZyB0byB3aGV0aGVyIHRoZSB1bnN1bnNjcmliZSByZXF1ZXN0IHdhcyBzdWNjZXNzZnVsLlxuICAgICAqL1xuICAgIGFzeW5jIHVuc3Vic2NyaWJlKHR5cGUsIG1ldGhvZCwgaWQpIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gYCR7dHlwZX06OiR7aWR9YDtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0V4dGVuc2lvblByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIFwiZlwiKVtzdWJzY3JpcHRpb25dKSkge1xuICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBgVW5hYmxlIHRvIGZpbmQgYWN0aXZlIHN1YnNjcmlwdGlvbj0ke3N1YnNjcmlwdGlvbn1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfc3Vic2NyaXB0aW9ucywgXCJmXCIpW3N1YnNjcmlwdGlvbl07XG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5zZW5kKG1ldGhvZCwgW2lkXSkpO1xuICAgIH1cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfRXh0ZW5zaW9uUHJvdmlkZXJfZXZlbnRlbWl0dGVyLCBcImZcIikuZW1pdCh0eXBlLCAuLi5hcmdzKTtcbiAgICB9XG59XG5fRXh0ZW5zaW9uUHJvdmlkZXJfY29kZXIgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfZXZlbnRlbWl0dGVyID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2hhbmRsZXJzID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX3N1YnNjcmlwdGlvbnMgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfd2FpdGluZ0ZvcklkID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2lzQ29ubmVjdGVkID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2FwcE5hbWUgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5OYW1lID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX2NoYWluSWQgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hhaW5TcGVjcyA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9wYXJhY2hhaW5TcGVjcyA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9jb21tb25NZXNzYWdlRGF0YSA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9oYW5kbGVNZXNzYWdlID0gbmV3IFdlYWtNYXAoKSwgX0V4dGVuc2lvblByb3ZpZGVyX29uTWVzc2FnZVJlc3VsdCA9IG5ldyBXZWFrTWFwKCksIF9FeHRlbnNpb25Qcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfc2ltdWxhdGVMaWZlY3ljbGUgPSBuZXcgV2Vha01hcCgpLCBfRXh0ZW5zaW9uUHJvdmlkZXJfY2hlY2tDbGllbnRQZWVyY291bnQgPSBuZXcgV2Vha01hcCgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXh0ZW5zaW9uUHJvdmlkZXIuanMubWFwIiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRTZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufTtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9IZWFsdGhDaGVja0Vycm9yX2NhdXNlO1xuZXhwb3J0IGNsYXNzIEhlYWx0aENoZWNrRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IocmVzcG9uc2UsIG1lc3NhZ2UgPSBcIkdvdCBlcnJvciByZXNwb25zZSBhc2tpbmcgZm9yIHN5c3RlbSBoZWFsdGhcIikge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgX0hlYWx0aENoZWNrRXJyb3JfY2F1c2Uuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX0hlYWx0aENoZWNrRXJyb3JfY2F1c2UsIHJlc3BvbnNlLCBcImZcIik7XG4gICAgICAgIC8vICdFcnJvcicgYnJlYWtzIHRoZSBwcm90b3R5cGUgY2hhaW4gLSByZXN0b3JlIGl0XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBuZXcudGFyZ2V0LnByb3RvdHlwZSk7XG4gICAgfVxuICAgIGdldENhdXNlKCkge1xuICAgICAgICByZXR1cm4gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfSGVhbHRoQ2hlY2tFcnJvcl9jYXVzZSwgXCJmXCIpO1xuICAgIH1cbn1cbl9IZWFsdGhDaGVja0Vycm9yX2NhdXNlID0gbmV3IFdlYWtNYXAoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9ycy5qcy5tYXAiLCJjb25zdCBpc1VuZGVmaW5lZCA9ICh2YWx1ZSkgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCI7XG59O1xuZnVuY3Rpb24gZXJhc2VSZWNvcmQocmVjb3JkLCBjYikge1xuICAgIE9iamVjdC5rZXlzKHJlY29yZCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgY2IocmVjb3JkW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSByZWNvcmRba2V5XTtcbiAgICB9KTtcbn1cbmV4cG9ydCB7IGlzVW5kZWZpbmVkLCBlcmFzZVJlY29yZCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9