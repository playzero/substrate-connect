(self["webpackChunk_substrate_smoldot_browser_demo"] = self["webpackChunk_substrate_smoldot_browser_demo"] || []).push([["packages_connect_dist_SmoldotProvider_SmoldotProvider_js"],{

/***/ "?2e65":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "../../packages/connect/dist/SmoldotProvider/SmoldotProvider.js":
/*!**********************************************************************!*\
  !*** ../../packages/connect/dist/SmoldotProvider/SmoldotProvider.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SmoldotProvider": function() { return /* binding */ SmoldotProvider; }
/* harmony export */ });
/* harmony import */ var _polkadot_rpc_provider_coder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @polkadot/rpc-provider/coder */ "../../node_modules/@polkadot/rpc-provider/coder/index.js");
/* harmony import */ var _polkadot_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @polkadot/util */ "../../node_modules/@polkadot/util/logger.js");
/* harmony import */ var _polkadot_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @polkadot/util */ "../../node_modules/@polkadot/util/assert.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "../../node_modules/eventemitter3/index.js");
/* harmony import */ var _substrate_smoldot_light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @substrate/smoldot-light */ "../../node_modules/@substrate/smoldot-light/src/index.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors.js */ "../../packages/connect/dist/errors.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/index.js */ "../../packages/connect/dist/utils/index.js");
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

var _SmoldotProvider_chainSpec, _SmoldotProvider_coder, _SmoldotProvider_eventemitter, _SmoldotProvider_handlers, _SmoldotProvider_subscriptions, _SmoldotProvider_waitingForId, _SmoldotProvider_connectionStatePingerId, _SmoldotProvider_isConnected, _SmoldotProvider_client, _SmoldotProvider_chain, _SmoldotProvider_parachainSpecs, _SmoldotProvider_smoldot, _SmoldotProvider_handleRpcReponse, _SmoldotProvider_onMessageResult, _SmoldotProvider_onMessageSubscribe, _SmoldotProvider_simulateLifecycle, _SmoldotProvider_checkClientPeercount;







var l = (0,_polkadot_util__WEBPACK_IMPORTED_MODULE_4__.logger)("smoldot-provider");
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
 * SmoldotProvider
 *
 * The SmoldotProvider allows interacting with a smoldot-based
 * WASM light client.  I.e. without doing RPC to a remote node over HTTP
 * or websockets
 *
 * @example
 * ```javascript
 * import readFileSync from 'fs';
 * import Api from '@polkadot/api/promise';
 * import { SmoldotProvider } from '../';
 *
 * const chainSpec = readFileSync('./path/to/chainSpec.json');
 * const provider = new SmoldotProvider(chainSpec);
 * const api = new Api(provider);
 * ```
 * @example
 * ```javascript
 * import readFileSync from 'fs';
 * import Api from '@polkadot/api/promise';
 * import { SmoldotProvider } from '../';
 *
 * const chainSpec = readFileSync('./path/to/polkadot.json');
 * const pp = new SmoldotProvider(chainSpec);
 * const polkadotApi = new Api(pp);
 *
 * const chainSpec = readFileSync('./path/to/kusama.json');
 * const kp = new SmoldotProvider(chainSpec);
 * const kusamaApi = new Api(pp);
 * ```
 */

var SmoldotProvider = /*#__PURE__*/function () {
  /**
   * @param chainSpec - The chainSpec for the WASM client
   * @param sm - (only used for testing) defaults to the actual smoldot module
   */
  //eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  function SmoldotProvider(chainSpec, parachain, sm) {
    var _this = this;

    _classCallCheck(this, SmoldotProvider);

    _SmoldotProvider_chainSpec.set(this, void 0);

    _SmoldotProvider_coder.set(this, new _polkadot_rpc_provider_coder__WEBPACK_IMPORTED_MODULE_5__.RpcCoder());

    _SmoldotProvider_eventemitter.set(this, new eventemitter3__WEBPACK_IMPORTED_MODULE_0__());

    _SmoldotProvider_handlers.set(this, {});

    _SmoldotProvider_subscriptions.set(this, {});

    _SmoldotProvider_waitingForId.set(this, {});

    _SmoldotProvider_connectionStatePingerId.set(this, void 0);

    _SmoldotProvider_isConnected.set(this, false);

    _SmoldotProvider_client.set(this, undefined);

    _SmoldotProvider_chain.set(this, undefined);

    _SmoldotProvider_parachainSpecs.set(this, undefined // reference to the smoldot module so we can defer loading the wasm client
    // until connect is called
    ); // reference to the smoldot module so we can defer loading the wasm client
    // until connect is called


    _SmoldotProvider_smoldot.set(this, void 0);
    /*
     * How frequently to see if we have any peers
     */


    this.healthPingerInterval = CONNECTION_STATE_PINGER_INTERVAL;

    _SmoldotProvider_handleRpcReponse.set(this, function (res) {
      l.debug(function () {
        return ["received", res];
      });
      var response = JSON.parse(res);
      return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(response.method) ? __classPrivateFieldGet(_this, _SmoldotProvider_onMessageResult, "f").call(_this, response) : __classPrivateFieldGet(_this, _SmoldotProvider_onMessageSubscribe, "f").call(_this, response);
    });

    _SmoldotProvider_onMessageResult.set(this, function (response) {
      var handler = __classPrivateFieldGet(_this, _SmoldotProvider_handlers, "f")[response.id];

      if (!handler) {
        l.debug(function () {
          return "Unable to find handler for id=".concat(response.id);
        });
        return;
      }

      try {
        var method = handler.method,
            subscription = handler.subscription;

        var result = __classPrivateFieldGet(_this, _SmoldotProvider_coder, "f").decodeResponse(response); // first send the result - in case of subs, we may have an update
        // immediately if we have some queued results already


        handler.callback(null, result);

        if (subscription) {
          var subId = "".concat(subscription.type, "::").concat(result);
          __classPrivateFieldGet(_this, _SmoldotProvider_subscriptions, "f")[subId] = _objectSpread(_objectSpread({}, subscription), {}, {
            method: method
          }); // if we have a result waiting for this subscription already

          if (__classPrivateFieldGet(_this, _SmoldotProvider_waitingForId, "f")[subId]) {
            __classPrivateFieldGet(_this, _SmoldotProvider_onMessageSubscribe, "f").call(_this, __classPrivateFieldGet(_this, _SmoldotProvider_waitingForId, "f")[subId]);
          }
        }
      } catch (error) {
        handler.callback(error, undefined);
      }

      delete __classPrivateFieldGet(_this, _SmoldotProvider_handlers, "f")[response.id];
    });

    _SmoldotProvider_onMessageSubscribe.set(this, function (response) {
      var method = ANGLICISMS[response.method] || response.method || "invalid";
      var subId = "".concat(method, "::").concat(response.params.subscription);

      var handler = __classPrivateFieldGet(_this, _SmoldotProvider_subscriptions, "f")[subId];

      if (!handler) {
        // store the response, we could have out-of-order subid coming in
        __classPrivateFieldGet(_this, _SmoldotProvider_waitingForId, "f")[subId] = response;
        l.debug(function () {
          return "Unable to find handler for subscription=".concat(subId, " responseId=").concat(response.id);
        });
        return;
      } // housekeeping


      delete __classPrivateFieldGet(_this, _SmoldotProvider_waitingForId, "f")[subId];

      try {
        var result = __classPrivateFieldGet(_this, _SmoldotProvider_coder, "f").decodeResponse(response);

        handler.callback(null, result);
      } catch (error) {
        handler.callback(error, undefined);
      }
    });

    _SmoldotProvider_simulateLifecycle.set(this, function (health) {
      // development chains should not have peers so we only emit connected
      // once and never disconnect
      if (health.shouldHavePeers == false) {
        if (!__classPrivateFieldGet(_this, _SmoldotProvider_isConnected, "f")) {
          __classPrivateFieldSet(_this, _SmoldotProvider_isConnected, true, "f");

          _this.emit("connected");

          l.debug("emitted CONNECTED");
          return;
        }

        return;
      }

      var peerCount = health.peers;
      var peerChecks = (peerCount > 0 || !health.shouldHavePeers) && !health.isSyncing;
      l.debug("Simulating lifecylce events from system_health");
      l.debug("isConnected: ".concat(__classPrivateFieldGet(_this, _SmoldotProvider_isConnected, "f").toString(), ", new peerCount: ").concat(peerCount));

      if (__classPrivateFieldGet(_this, _SmoldotProvider_isConnected, "f") && peerChecks) {
        // still connected
        return;
      }

      if (__classPrivateFieldGet(_this, _SmoldotProvider_isConnected, "f") && peerCount === 0) {
        __classPrivateFieldSet(_this, _SmoldotProvider_isConnected, false, "f");

        _this.emit("disconnected");

        l.debug("emitted DISCONNECTED");
        return;
      }

      if (!__classPrivateFieldGet(_this, _SmoldotProvider_isConnected, "f") && peerChecks) {
        __classPrivateFieldSet(_this, _SmoldotProvider_isConnected, true, "f");

        _this.emit("connected");

        l.debug("emitted CONNECTED");
        return;
      } // still not connected

    });

    _SmoldotProvider_checkClientPeercount.set(this, function () {
      _this.send("system_health", []).then(__classPrivateFieldGet(_this, _SmoldotProvider_simulateLifecycle, "f")).catch(function (error) {
        return _this.emit("error", new _errors_js__WEBPACK_IMPORTED_MODULE_2__.HealthCheckError(error));
      });
    }
    /**
     * "Connect" the WASM client - starts the smoldot WASM client
     */
    );
    /**
     * "Connect" the WASM client - starts the smoldot WASM client
     */


    this.connect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var relay;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0,_polkadot_util__WEBPACK_IMPORTED_MODULE_6__.assert)(!__classPrivateFieldGet(_this, _SmoldotProvider_client, "f") && !__classPrivateFieldGet(_this, _SmoldotProvider_isConnected, "f"), "Client is already connected");
              _context.prev = 1;

              __classPrivateFieldSet(_this, _SmoldotProvider_client, __classPrivateFieldGet(_this, _SmoldotProvider_smoldot, "f").start({
                forbidWs: true,
                maxLogLevel: 3
                /* no debug/trace messages */

              }), "f");

              if (!__classPrivateFieldGet(_this, _SmoldotProvider_parachainSpecs, "f")) {
                _context.next = 16;
                break;
              }

              _context.next = 6;
              return __classPrivateFieldGet(_this, _SmoldotProvider_client, "f").addChain({
                chainSpec: __classPrivateFieldGet(_this, _SmoldotProvider_chainSpec, "f")
              });

            case 6:
              relay = _context.sent;
              _context.t0 = __classPrivateFieldSet;
              _context.t1 = _this;
              _context.t2 = _SmoldotProvider_chain;
              _context.next = 12;
              return __classPrivateFieldGet(_this, _SmoldotProvider_client, "f").addChain({
                chainSpec: __classPrivateFieldGet(_this, _SmoldotProvider_parachainSpecs, "f"),
                jsonRpcCallback: function jsonRpcCallback(response) {
                  __classPrivateFieldGet(_this, _SmoldotProvider_handleRpcReponse, "f").call(_this, response);
                },
                potentialRelayChains: [relay]
              });

            case 12:
              _context.t3 = _context.sent;
              (0, _context.t0)(_context.t1, _context.t2, _context.t3, "f");
              _context.next = 23;
              break;

            case 16:
              _context.t4 = __classPrivateFieldSet;
              _context.t5 = _this;
              _context.t6 = _SmoldotProvider_chain;
              _context.next = 21;
              return __classPrivateFieldGet(_this, _SmoldotProvider_client, "f").addChain({
                chainSpec: __classPrivateFieldGet(_this, _SmoldotProvider_chainSpec, "f"),
                jsonRpcCallback: function jsonRpcCallback(response) {
                  __classPrivateFieldGet(_this, _SmoldotProvider_handleRpcReponse, "f").call(_this, response);
                }
              });

            case 21:
              _context.t7 = _context.sent;
              (0, _context.t4)(_context.t5, _context.t6, _context.t7, "f");

            case 23:
              __classPrivateFieldSet(_this, _SmoldotProvider_connectionStatePingerId, setInterval(__classPrivateFieldGet(_this, _SmoldotProvider_checkClientPeercount, "f"), _this.healthPingerInterval), "f");

              _context.next = 29;
              break;

            case 26:
              _context.prev = 26;
              _context.t8 = _context["catch"](1);

              _this.emit("error", _context.t8);

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 26]]);
    }));

    __classPrivateFieldSet(this, _SmoldotProvider_chainSpec, chainSpec, "f"); // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment


    __classPrivateFieldSet(this, _SmoldotProvider_smoldot, sm || _substrate_smoldot_light__WEBPACK_IMPORTED_MODULE_1__, "f");

    __classPrivateFieldSet(this, _SmoldotProvider_connectionStatePingerId, null, "f");

    if (parachain) {
      __classPrivateFieldSet(this, _SmoldotProvider_parachainSpecs, parachain, "f");
    }
  }
  /**
   * Lets polkadot-js know we support subscriptions
   * @returns `true`
   */


  _createClass(SmoldotProvider, [{
    key: "hasSubscriptions",
    get: function get() {
      return true;
    }
    /**
     * Returns a clone of the object
     * @throws throws an error as this is not supported.
     */

  }, {
    key: "clone",
    value: function clone() {
      throw new Error("clone() is not supported.");
    }
    /**
     * Manually "disconnect" - drops the reference to the WASM client
     */
    // eslint-disable-next-line @typescript-eslint/require-await

  }, {
    key: "disconnect",
    value: function () {
      var _disconnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                try {
                  if (__classPrivateFieldGet(this, _SmoldotProvider_client, "f")) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    __classPrivateFieldGet(this, _SmoldotProvider_client, "f").terminate();
                  }
                } catch (error) {
                  this.emit("error", error);
                } finally {
                  if (__classPrivateFieldGet(this, _SmoldotProvider_connectionStatePingerId, "f") !== null) {
                    clearInterval(__classPrivateFieldGet(this, _SmoldotProvider_connectionStatePingerId, "f"));
                  }

                  __classPrivateFieldSet(this, _SmoldotProvider_isConnected, false, "f");

                  this.emit("disconnected");
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function disconnect() {
        return _disconnect.apply(this, arguments);
      }

      return disconnect;
    }()
    /**
     * Whether the node is connected or not.
     * @returns true if connected
     */

  }, {
    key: "isConnected",
    get: function get() {
      return __classPrivateFieldGet(this, _SmoldotProvider_isConnected, "f");
    }
    /**
     * Listen to provider events - in practice the smoldot provider only
     * emits a `connected` event after successfully starting the smoldot client
     * and `disconnected` after `disconnect` is called.
     * @param type - Event
     * @param sub  - Callback
     */

  }, {
    key: "on",
    value: function on(type, sub) {
      var _this2 = this;

      __classPrivateFieldGet(this, _SmoldotProvider_eventemitter, "f").on(type, sub);

      return function () {
        __classPrivateFieldGet(_this2, _SmoldotProvider_eventemitter, "f").removeListener(type, sub);
      };
    }
    /**
     * Send an RPC request  the wasm client
     * @param method       - The RPC methods to execute
     * @param params       - Encoded paramaters as applicable for the method
     * @param subscription - Subscription details (internally used by `subscribe`)
     */

  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(method, // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params, subscription) {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  (0,_polkadot_util__WEBPACK_IMPORTED_MODULE_6__.assert)(__classPrivateFieldGet(_this3, _SmoldotProvider_client, "f"), "Client is not initialised");
                  (0,_polkadot_util__WEBPACK_IMPORTED_MODULE_6__.assert)(__classPrivateFieldGet(_this3, _SmoldotProvider_chain, "f"), "Chain is not initialised");

                  var json = __classPrivateFieldGet(_this3, _SmoldotProvider_coder, "f").encodeJson(method, params);

                  var id = __classPrivateFieldGet(_this3, _SmoldotProvider_coder, "f").getId();

                  var callback = function callback(error, result) {
                    error ? reject(error) : resolve(result);
                  };

                  l.debug(function () {
                    return ["calling", method, json];
                  });
                  __classPrivateFieldGet(_this3, _SmoldotProvider_handlers, "f")[id] = {
                    callback: callback,
                    method: method,
                    subscription: subscription
                  };

                  __classPrivateFieldGet(_this3, _SmoldotProvider_chain, "f").sendJsonRpc(json);
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function send(_x, _x2, _x3) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
    /**
     * subscribe
     * Allows subscribing to a specific event.
     * @param  type     - Subscription type
     * @param  method   - Subscription method
     * @param  params   - Parameters of type any[]
     * @param  callback - ProviderInterfaceCallback
     * @returns A promise (Promise\<number|string\>) resolving to the id of the subscription you can use with [[unsubscribe]].
     *
     * @example
     * <BR>
     *
     * ```javascript
     * const provider = new SmoldotProvider(client);
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
      var _subscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4( // the "method" property of the JSON response to this subscription
      type, // the "method" property of the JSON request to register the subscription
      method, // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params, callback) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.send(method, params, {
                  callback: callback,
                  type: type
                });

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function subscribe(_x4, _x5, _x6, _x7) {
        return _subscribe.apply(this, arguments);
      }

      return subscribe;
    }()
    /**
     * Allows unsubscribing to subscriptions made with [[subscribe]].
     */

  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(type, method, id) {
        var subscription;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                subscription = "".concat(type, "::").concat(id);

                if (!(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(__classPrivateFieldGet(this, _SmoldotProvider_subscriptions, "f")[subscription])) {
                  _context5.next = 4;
                  break;
                }

                l.debug(function () {
                  return "Unable to find active subscription=".concat(subscription);
                });
                return _context5.abrupt("return", false);

              case 4:
                delete __classPrivateFieldGet(this, _SmoldotProvider_subscriptions, "f")[subscription];
                _context5.next = 7;
                return this.send(method, [id]);

              case 7:
                return _context5.abrupt("return", _context5.sent);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function unsubscribe(_x8, _x9, _x10) {
        return _unsubscribe.apply(this, arguments);
      }

      return unsubscribe;
    }() // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "emit",
    value: function emit(type) {
      var _classPrivateFieldGe;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_classPrivateFieldGe = __classPrivateFieldGet(this, _SmoldotProvider_eventemitter, "f")).emit.apply(_classPrivateFieldGe, [type].concat(args));
    }
  }]);

  return SmoldotProvider;
}();
_SmoldotProvider_chainSpec = new WeakMap(), _SmoldotProvider_coder = new WeakMap(), _SmoldotProvider_eventemitter = new WeakMap(), _SmoldotProvider_handlers = new WeakMap(), _SmoldotProvider_subscriptions = new WeakMap(), _SmoldotProvider_waitingForId = new WeakMap(), _SmoldotProvider_connectionStatePingerId = new WeakMap(), _SmoldotProvider_isConnected = new WeakMap(), _SmoldotProvider_client = new WeakMap(), _SmoldotProvider_chain = new WeakMap(), _SmoldotProvider_parachainSpecs = new WeakMap(), _SmoldotProvider_smoldot = new WeakMap(), _SmoldotProvider_handleRpcReponse = new WeakMap(), _SmoldotProvider_onMessageResult = new WeakMap(), _SmoldotProvider_onMessageSubscribe = new WeakMap(), _SmoldotProvider_simulateLifecycle = new WeakMap(), _SmoldotProvider_checkClientPeercount = new WeakMap();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZXNfY29ubmVjdF9kaXN0X1Ntb2xkb3RQcm92aWRlcl9TbW9sZG90UHJvdmlkZXJfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNLENBQUMsR0FBRyxzREFBTSxDQUFDLGtCQUFELENBQWhCO0FBMkJBLElBQU0sVUFBVSxHQUFnQztBQUM5QyxxQkFBbUIsRUFBRSxxQkFEeUI7QUFFOUMsK0JBQTZCLEVBQUUsK0JBRmU7QUFHOUMsaUNBQStCLEVBQUU7QUFIYSxDQUFoRDtBQU1BOzs7QUFHRzs7QUFDSCxJQUFNLGdDQUFnQyxHQUFHLElBQXpDO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQkc7O0FBQ0gsSUFBYSxlQUFiO0FBcUJFOzs7QUFHRztBQUNIO0FBQ0EsMkJBQW1CLFNBQW5CLEVBQXNDLFNBQXRDLEVBQTBELEVBQTFELEVBQWtFO0FBQUE7O0FBQUE7O0FBekJsRTs7QUFDQSxxQ0FBNEIsSUFBSSxrRUFBSixFQUE1Qjs7QUFDQSw0Q0FBdUMsSUFBSSwwQ0FBSixFQUF2Qzs7QUFDQSx3Q0FBdUQsRUFBdkQ7O0FBQ0EsNkNBQTZELEVBQTdEOztBQUNBLDRDQUEwRCxFQUExRDs7QUFDQTs7QUFDQSwyQ0FBZSxLQUFmOztBQUNBLHNDQUFzQyxTQUF0Qzs7QUFDQSxxQ0FBb0MsU0FBcEM7O0FBQ0EsOENBQXNDLFNBQXRDLENBQ0E7QUFDQTtBQUZBLE1BZWtFLENBZGxFO0FBQ0E7OztBQUNBO0FBRUE7O0FBRUc7OztBQUNILGdDQUF1QixnQ0FBdkI7O0FBaUNBLGdEQUFvQixVQUFDLEdBQUQsRUFBc0I7QUFDeEMsT0FBQyxDQUFDLEtBQUYsQ0FBUTtBQUFBLGVBQU0sQ0FBQyxVQUFELEVBQWEsR0FBYixDQUFOO0FBQUEsT0FBUjtBQUVBLFVBQU0sUUFBUSxH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REFBSSw2QkFBSixFQUFJLEdBQUosR0FBbUIsSUFBbkIsOEJBQXdCLElBQXhCLFNBQWlDLElBQWpDO0FBQ0Q7QUF4V0g7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRkEsSUFBYSxnQkFBYjtBQUFBOztBQUFBOztBQU9FLDRCQUNFLFFBREYsRUFFeUQ7QUFBQTs7QUFBQSxRQUF2RCxPQUF1RCx1RUFBN0MsNkNBQTZDOztBQUFBOztBQUV2RCw4QkFBTSxPQUFOOztBQVZGOztBQVdFLDBEQUFJLHVCQUFKLEVBQWMsUUFBZCxFQUFzQixHQUF0QixFQUh1RCxDQUl2RDs7O0FBQ0EsVUFBTSxDQUFDLGNBQVAsZ0NBQTRCLCtEQUFXLFNBQXZDO0FBTHVEO0FBTXhEOztBQWZIO0FBQUE7QUFBQSxXQUdFLG9CQUFRO0FBQ04sYUFBTyw2QkFBSSx1QkFBSixFQUFJLEdBQUosQ0FBUDtBQUNEO0FBTEg7O0FBQUE7QUFBQSxpQ0FBc0MsS0FBdEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxXQUFXLEdBQUcsU0FBZCxXQUFjLENBQUMsS0FBRCxFQUF3QztBQUMxRCxTQUFPLE9BQU8sS0FBUCxLQUFpQixXQUF4QjtBQUNELENBRkQ7O0FBSUEsU0FBUyxXQUFULENBQ0UsTUFERixFQUVFLEVBRkYsRUFFd0I7QUFFdEIsUUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFaLEVBQW9CLE9BQXBCLENBQTRCLFVBQUMsR0FBRCxFQUFjO0FBQ3hDLFFBQUksRUFBSixFQUFRO0FBQ04sUUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFELENBQVAsQ0FBRjtBQUNEOztBQUVELFdBQU8sTUFBTSxDQUFDLEdBQUQsQ0FBYjtBQUNELEdBTkQ7QUFPRCIsInNvdXJjZXMiOlsid2VicGFjazovL0BzdWJzdHJhdGUvc21vbGRvdC1icm93c2VyLWRlbW8vaWdub3JlZHwvaG9tZS93aXJlZG5rb2QvRG9jdW1lbnRzL3JlcG9zL3Bhcml0eS9zdWJzdHJhdGUtY29ubmVjdC9ub2RlX21vZHVsZXMvYm4uanMvbGlifGJ1ZmZlciIsIndlYnBhY2s6Ly9Ac3Vic3RyYXRlL3Ntb2xkb3QtYnJvd3Nlci1kZW1vLy4uLy4uL3NyYy9TbW9sZG90UHJvdmlkZXIvU21vbGRvdFByb3ZpZGVyLnRzIiwid2VicGFjazovL0BzdWJzdHJhdGUvc21vbGRvdC1icm93c2VyLWRlbW8vLi4vc3JjL2Vycm9ycy50cyIsIndlYnBhY2s6Ly9Ac3Vic3RyYXRlL3Ntb2xkb3QtYnJvd3Nlci1kZW1vLy4uLy4uL3NyYy91dGlscy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoaWdub3JlZCkgKi8iLCJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX1Ntb2xkb3RQcm92aWRlcl9jaGFpblNwZWMsIF9TbW9sZG90UHJvdmlkZXJfY29kZXIsIF9TbW9sZG90UHJvdmlkZXJfZXZlbnRlbWl0dGVyLCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZXJzLCBfU21vbGRvdFByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBfU21vbGRvdFByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgX1Ntb2xkb3RQcm92aWRlcl9jaGFpbiwgX1Ntb2xkb3RQcm92aWRlcl9wYXJhY2hhaW5TcGVjcywgX1Ntb2xkb3RQcm92aWRlcl9zbW9sZG90LCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZVJwY1JlcG9uc2UsIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlUmVzdWx0LCBfU21vbGRvdFByb3ZpZGVyX29uTWVzc2FnZVN1YnNjcmliZSwgX1Ntb2xkb3RQcm92aWRlcl9zaW11bGF0ZUxpZmVjeWNsZSwgX1Ntb2xkb3RQcm92aWRlcl9jaGVja0NsaWVudFBlZXJjb3VudDtcbmltcG9ydCB7IFJwY0NvZGVyIH0gZnJvbSBcIkBwb2xrYWRvdC9ycGMtcHJvdmlkZXIvY29kZXJcIjtcbmltcG9ydCB7IGFzc2VydCwgbG9nZ2VyIH0gZnJvbSBcIkBwb2xrYWRvdC91dGlsXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudGVtaXR0ZXIzXCI7XG5pbXBvcnQgKiBhcyBzbW9sZG90IGZyb20gXCJAc3Vic3RyYXRlL3Ntb2xkb3QtbGlnaHRcIjtcbmltcG9ydCB7IEhlYWx0aENoZWNrRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzLmpzXCI7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xuY29uc3QgbCA9IGxvZ2dlcihcInNtb2xkb3QtcHJvdmlkZXJcIik7XG5jb25zdCBBTkdMSUNJU01TID0ge1xuICAgIGNoYWluX2ZpbmFsaXNlZEhlYWQ6IFwiY2hhaW5fZmluYWxpemVkSGVhZFwiLFxuICAgIGNoYWluX3N1YnNjcmliZUZpbmFsaXNlZEhlYWRzOiBcImNoYWluX3N1YnNjcmliZUZpbmFsaXplZEhlYWRzXCIsXG4gICAgY2hhaW5fdW5zdWJzY3JpYmVGaW5hbGlzZWRIZWFkczogXCJjaGFpbl91bnN1YnNjcmliZUZpbmFsaXplZEhlYWRzXCIsXG59O1xuLypcbiAqIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZXR3ZWVuIGNoZWNrcyB0byBzZWUgaWYgd2UgaGF2ZSBhbnlcbiAqIGNvbm5lY3RlZCBwZWVycyBpbiB0aGUgc21vbGRvdCBjbGllbnRcbiAqL1xuY29uc3QgQ09OTkVDVElPTl9TVEFURV9QSU5HRVJfSU5URVJWQUwgPSAyMDAwO1xuLyoqXG4gKiBTbW9sZG90UHJvdmlkZXJcbiAqXG4gKiBUaGUgU21vbGRvdFByb3ZpZGVyIGFsbG93cyBpbnRlcmFjdGluZyB3aXRoIGEgc21vbGRvdC1iYXNlZFxuICogV0FTTSBsaWdodCBjbGllbnQuICBJLmUuIHdpdGhvdXQgZG9pbmcgUlBDIHRvIGEgcmVtb3RlIG5vZGUgb3ZlciBIVFRQXG4gKiBvciB3ZWJzb2NrZXRzXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGltcG9ydCByZWFkRmlsZVN5bmMgZnJvbSAnZnMnO1xuICogaW1wb3J0IEFwaSBmcm9tICdAcG9sa2Fkb3QvYXBpL3Byb21pc2UnO1xuICogaW1wb3J0IHsgU21vbGRvdFByb3ZpZGVyIH0gZnJvbSAnLi4vJztcbiAqXG4gKiBjb25zdCBjaGFpblNwZWMgPSByZWFkRmlsZVN5bmMoJy4vcGF0aC90by9jaGFpblNwZWMuanNvbicpO1xuICogY29uc3QgcHJvdmlkZXIgPSBuZXcgU21vbGRvdFByb3ZpZGVyKGNoYWluU3BlYyk7XG4gKiBjb25zdCBhcGkgPSBuZXcgQXBpKHByb3ZpZGVyKTtcbiAqIGBgYFxuICogQGV4YW1wbGVcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGltcG9ydCByZWFkRmlsZVN5bmMgZnJvbSAnZnMnO1xuICogaW1wb3J0IEFwaSBmcm9tICdAcG9sa2Fkb3QvYXBpL3Byb21pc2UnO1xuICogaW1wb3J0IHsgU21vbGRvdFByb3ZpZGVyIH0gZnJvbSAnLi4vJztcbiAqXG4gKiBjb25zdCBjaGFpblNwZWMgPSByZWFkRmlsZVN5bmMoJy4vcGF0aC90by9wb2xrYWRvdC5qc29uJyk7XG4gKiBjb25zdCBwcCA9IG5ldyBTbW9sZG90UHJvdmlkZXIoY2hhaW5TcGVjKTtcbiAqIGNvbnN0IHBvbGthZG90QXBpID0gbmV3IEFwaShwcCk7XG4gKlxuICogY29uc3QgY2hhaW5TcGVjID0gcmVhZEZpbGVTeW5jKCcuL3BhdGgvdG8va3VzYW1hLmpzb24nKTtcbiAqIGNvbnN0IGtwID0gbmV3IFNtb2xkb3RQcm92aWRlcihjaGFpblNwZWMpO1xuICogY29uc3Qga3VzYW1hQXBpID0gbmV3IEFwaShwcCk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIFNtb2xkb3RQcm92aWRlciB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGNoYWluU3BlYyAtIFRoZSBjaGFpblNwZWMgZm9yIHRoZSBXQVNNIGNsaWVudFxuICAgICAqIEBwYXJhbSBzbSAtIChvbmx5IHVzZWQgZm9yIHRlc3RpbmcpIGRlZmF1bHRzIHRvIHRoZSBhY3R1YWwgc21vbGRvdCBtb2R1bGVcbiAgICAgKi9cbiAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgICBjb25zdHJ1Y3RvcihjaGFpblNwZWMsIHBhcmFjaGFpbiwgc20pIHtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9jaGFpblNwZWMuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfY29kZXIuc2V0KHRoaXMsIG5ldyBScGNDb2RlcigpKTtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9ldmVudGVtaXR0ZXIuc2V0KHRoaXMsIG5ldyBFdmVudEVtaXR0ZXIoKSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfaGFuZGxlcnMuc2V0KHRoaXMsIHt9KTtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9zdWJzY3JpcHRpb25zLnNldCh0aGlzLCB7fSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkLnNldCh0aGlzLCB7fSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfaXNDb25uZWN0ZWQuc2V0KHRoaXMsIGZhbHNlKTtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9jbGllbnQuc2V0KHRoaXMsIHVuZGVmaW5lZCk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfY2hhaW4uc2V0KHRoaXMsIHVuZGVmaW5lZCk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfcGFyYWNoYWluU3BlY3Muc2V0KHRoaXMsIHVuZGVmaW5lZFxuICAgICAgICAvLyByZWZlcmVuY2UgdG8gdGhlIHNtb2xkb3QgbW9kdWxlIHNvIHdlIGNhbiBkZWZlciBsb2FkaW5nIHRoZSB3YXNtIGNsaWVudFxuICAgICAgICAvLyB1bnRpbCBjb25uZWN0IGlzIGNhbGxlZFxuICAgICAgICApO1xuICAgICAgICAvLyByZWZlcmVuY2UgdG8gdGhlIHNtb2xkb3QgbW9kdWxlIHNvIHdlIGNhbiBkZWZlciBsb2FkaW5nIHRoZSB3YXNtIGNsaWVudFxuICAgICAgICAvLyB1bnRpbCBjb25uZWN0IGlzIGNhbGxlZFxuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX3Ntb2xkb3Quc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEhvdyBmcmVxdWVudGx5IHRvIHNlZSBpZiB3ZSBoYXZlIGFueSBwZWVyc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oZWFsdGhQaW5nZXJJbnRlcnZhbCA9IENPTk5FQ1RJT05fU1RBVEVfUElOR0VSX0lOVEVSVkFMO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZVJwY1JlcG9uc2Uuc2V0KHRoaXMsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gW1wicmVjZWl2ZWRcIiwgcmVzXSk7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzKTtcbiAgICAgICAgICAgIHJldHVybiBpc1VuZGVmaW5lZChyZXNwb25zZS5tZXRob2QpXG4gICAgICAgICAgICAgICAgPyBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlUmVzdWx0LCBcImZcIikuY2FsbCh0aGlzLCByZXNwb25zZSlcbiAgICAgICAgICAgICAgICA6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUsIFwiZlwiKS5jYWxsKHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlUmVzdWx0LnNldCh0aGlzLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfaGFuZGxlcnMsIFwiZlwiKVtyZXNwb25zZS5pZF07XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBsLmRlYnVnKCgpID0+IGBVbmFibGUgdG8gZmluZCBoYW5kbGVyIGZvciBpZD0ke3Jlc3BvbnNlLmlkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBtZXRob2QsIHN1YnNjcmlwdGlvbiB9ID0gaGFuZGxlcjtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY29kZXIsIFwiZlwiKS5kZWNvZGVSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gZmlyc3Qgc2VuZCB0aGUgcmVzdWx0IC0gaW4gY2FzZSBvZiBzdWJzLCB3ZSBtYXkgaGF2ZSBhbiB1cGRhdGVcbiAgICAgICAgICAgICAgICAvLyBpbW1lZGlhdGVseSBpZiB3ZSBoYXZlIHNvbWUgcXVldWVkIHJlc3VsdHMgYWxyZWFkeVxuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YklkID0gYCR7c3Vic2NyaXB0aW9uLnR5cGV9Ojoke3Jlc3VsdH1gO1xuICAgICAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfc3Vic2NyaXB0aW9ucywgXCJmXCIpW3N1YklkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN1YnNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIHJlc3VsdCB3YWl0aW5nIGZvciB0aGlzIHN1YnNjcmlwdGlvbiBhbHJlYWR5XG4gICAgICAgICAgICAgICAgICAgIGlmIChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBcImZcIilbc3ViSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlU3Vic2NyaWJlLCBcImZcIikuY2FsbCh0aGlzLCBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBcImZcIilbc3ViSWRdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2soZXJyb3IsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZXJzLCBcImZcIilbcmVzcG9uc2UuaWRdO1xuICAgICAgICB9KTtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUuc2V0KHRoaXMsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gQU5HTElDSVNNU1tyZXNwb25zZS5tZXRob2RdIHx8IHJlc3BvbnNlLm1ldGhvZCB8fCBcImludmFsaWRcIjtcbiAgICAgICAgICAgIGNvbnN0IHN1YklkID0gYCR7bWV0aG9kfTo6JHtyZXNwb25zZS5wYXJhbXMuc3Vic2NyaXB0aW9ufWA7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIFwiZlwiKVtzdWJJZF07XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSB0aGUgcmVzcG9uc2UsIHdlIGNvdWxkIGhhdmUgb3V0LW9mLW9yZGVyIHN1YmlkIGNvbWluZyBpblxuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl93YWl0aW5nRm9ySWQsIFwiZlwiKVtzdWJJZF0gPSByZXNwb25zZTtcbiAgICAgICAgICAgICAgICBsLmRlYnVnKCgpID0+IGBVbmFibGUgdG8gZmluZCBoYW5kbGVyIGZvciBzdWJzY3JpcHRpb249JHtzdWJJZH0gcmVzcG9uc2VJZD0ke3Jlc3BvbnNlLmlkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGhvdXNla2VlcGluZ1xuICAgICAgICAgICAgZGVsZXRlIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl93YWl0aW5nRm9ySWQsIFwiZlwiKVtzdWJJZF07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jb2RlciwgXCJmXCIpLmRlY29kZVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKGVycm9yLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9zaW11bGF0ZUxpZmVjeWNsZS5zZXQodGhpcywgKGhlYWx0aCkgPT4ge1xuICAgICAgICAgICAgLy8gZGV2ZWxvcG1lbnQgY2hhaW5zIHNob3VsZCBub3QgaGF2ZSBwZWVycyBzbyB3ZSBvbmx5IGVtaXQgY29ubmVjdGVkXG4gICAgICAgICAgICAvLyBvbmNlIGFuZCBuZXZlciBkaXNjb25uZWN0XG4gICAgICAgICAgICBpZiAoaGVhbHRoLnNob3VsZEhhdmVQZWVycyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmICghX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCB0cnVlLCBcImZcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbC5kZWJ1ZyhgZW1pdHRlZCBDT05ORUNURURgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwZWVyQ291bnQgPSBoZWFsdGgucGVlcnM7XG4gICAgICAgICAgICBjb25zdCBwZWVyQ2hlY2tzID0gKHBlZXJDb3VudCA+IDAgfHwgIWhlYWx0aC5zaG91bGRIYXZlUGVlcnMpICYmICFoZWFsdGguaXNTeW5jaW5nO1xuICAgICAgICAgICAgbC5kZWJ1ZyhgU2ltdWxhdGluZyBsaWZlY3lsY2UgZXZlbnRzIGZyb20gc3lzdGVtX2hlYWx0aGApO1xuICAgICAgICAgICAgbC5kZWJ1ZyhgaXNDb25uZWN0ZWQ6ICR7X19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikudG9TdHJpbmcoKX0sIG5ldyBwZWVyQ291bnQ6ICR7cGVlckNvdW50fWApO1xuICAgICAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpICYmIHBlZXJDaGVja3MpIHtcbiAgICAgICAgICAgICAgICAvLyBzdGlsbCBjb25uZWN0ZWRcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikgJiYgcGVlckNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBmYWxzZSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImRpc2Nvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBsLmRlYnVnKGBlbWl0dGVkIERJU0NPTk5FQ1RFRGApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikgJiYgcGVlckNoZWNrcykge1xuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgdHJ1ZSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBsLmRlYnVnKGBlbWl0dGVkIENPTk5FQ1RFRGApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN0aWxsIG5vdCBjb25uZWN0ZWRcbiAgICAgICAgfSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfY2hlY2tDbGllbnRQZWVyY291bnQuc2V0KHRoaXMsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZChcInN5c3RlbV9oZWFsdGhcIiwgW10pXG4gICAgICAgICAgICAgICAgLnRoZW4oX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3NpbXVsYXRlTGlmZWN5Y2xlLCBcImZcIikpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IEhlYWx0aENoZWNrRXJyb3IoZXJyb3IpKSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFwiQ29ubmVjdFwiIHRoZSBXQVNNIGNsaWVudCAtIHN0YXJ0cyB0aGUgc21vbGRvdCBXQVNNIGNsaWVudFxuICAgICAgICAgKi9cbiAgICAgICAgKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFwiQ29ubmVjdFwiIHRoZSBXQVNNIGNsaWVudCAtIHN0YXJ0cyB0aGUgc21vbGRvdCBXQVNNIGNsaWVudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb25uZWN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0KCFfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50LCBcImZcIikgJiYgIV9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpLCBcIkNsaWVudCBpcyBhbHJlYWR5IGNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3Ntb2xkb3QsIFwiZlwiKS5zdGFydCh7XG4gICAgICAgICAgICAgICAgICAgIGZvcmJpZFdzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtYXhMb2dMZXZlbDogMyAvKiBubyBkZWJ1Zy90cmFjZSBtZXNzYWdlcyAqLyxcbiAgICAgICAgICAgICAgICB9KSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgIGlmIChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfcGFyYWNoYWluU3BlY3MsIFwiZlwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxheSA9IGF3YWl0IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jbGllbnQsIFwiZlwiKS5hZGRDaGFpbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFpblNwZWM6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jaGFpblNwZWMsIFwiZlwiKSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jaGFpbiwgYXdhaXQgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgXCJmXCIpLmFkZENoYWluKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWluU3BlYzogX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBcImZcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBqc29uUnBjQ2FsbGJhY2s6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVScGNSZXBvbnNlLCBcImZcIikuY2FsbCh0aGlzLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG90ZW50aWFsUmVsYXlDaGFpbnM6IFtyZWxheV0sXG4gICAgICAgICAgICAgICAgICAgIH0pLCBcImZcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2hhaW4sIGF3YWl0IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jbGllbnQsIFwiZlwiKS5hZGRDaGFpbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFpblNwZWM6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jaGFpblNwZWMsIFwiZlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzb25ScGNDYWxsYmFjazogKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZVJwY1JlcG9uc2UsIFwiZlwiKS5jYWxsKHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pLCBcImZcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCwgc2V0SW50ZXJ2YWwoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NoZWNrQ2xpZW50UGVlcmNvdW50LCBcImZcIiksIHRoaXMuaGVhbHRoUGluZ2VySW50ZXJ2YWwpLCBcImZcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jaGFpblNwZWMsIGNoYWluU3BlYywgXCJmXCIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9zbW9sZG90LCBzbSB8fCBzbW9sZG90LCBcImZcIik7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCwgbnVsbCwgXCJmXCIpO1xuICAgICAgICBpZiAocGFyYWNoYWluKSB7XG4gICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfcGFyYWNoYWluU3BlY3MsIHBhcmFjaGFpbiwgXCJmXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExldHMgcG9sa2Fkb3QtanMga25vdyB3ZSBzdXBwb3J0IHN1YnNjcmlwdGlvbnNcbiAgICAgKiBAcmV0dXJucyBgdHJ1ZWBcbiAgICAgKi9cbiAgICBnZXQgaGFzU3Vic2NyaXB0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGUgb2JqZWN0XG4gICAgICogQHRocm93cyB0aHJvd3MgYW4gZXJyb3IgYXMgdGhpcyBpcyBub3Qgc3VwcG9ydGVkLlxuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbG9uZSgpIGlzIG5vdCBzdXBwb3J0ZWQuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYW51YWxseSBcImRpc2Nvbm5lY3RcIiAtIGRyb3BzIHRoZSByZWZlcmVuY2UgdG8gdGhlIFdBU00gY2xpZW50XG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9yZXF1aXJlLWF3YWl0XG4gICAgYXN5bmMgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50LCBcImZcIikpIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1jYWxsXG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgXCJmXCIpLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCwgXCJmXCIpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQsIFwiZlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfaXNDb25uZWN0ZWQsIGZhbHNlLCBcImZcIik7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJkaXNjb25uZWN0ZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgbm9kZSBpcyBjb25uZWN0ZWQgb3Igbm90LlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgY29ubmVjdGVkXG4gICAgICovXG4gICAgZ2V0IGlzQ29ubmVjdGVkKCkge1xuICAgICAgICByZXR1cm4gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBwcm92aWRlciBldmVudHMgLSBpbiBwcmFjdGljZSB0aGUgc21vbGRvdCBwcm92aWRlciBvbmx5XG4gICAgICogZW1pdHMgYSBgY29ubmVjdGVkYCBldmVudCBhZnRlciBzdWNjZXNzZnVsbHkgc3RhcnRpbmcgdGhlIHNtb2xkb3QgY2xpZW50XG4gICAgICogYW5kIGBkaXNjb25uZWN0ZWRgIGFmdGVyIGBkaXNjb25uZWN0YCBpcyBjYWxsZWQuXG4gICAgICogQHBhcmFtIHR5cGUgLSBFdmVudFxuICAgICAqIEBwYXJhbSBzdWIgIC0gQ2FsbGJhY2tcbiAgICAgKi9cbiAgICBvbih0eXBlLCBzdWIpIHtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2V2ZW50ZW1pdHRlciwgXCJmXCIpLm9uKHR5cGUsIHN1Yik7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfZXZlbnRlbWl0dGVyLCBcImZcIikucmVtb3ZlTGlzdGVuZXIodHlwZSwgc3ViKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBhbiBSUEMgcmVxdWVzdCAgdGhlIHdhc20gY2xpZW50XG4gICAgICogQHBhcmFtIG1ldGhvZCAgICAgICAtIFRoZSBSUEMgbWV0aG9kcyB0byBleGVjdXRlXG4gICAgICogQHBhcmFtIHBhcmFtcyAgICAgICAtIEVuY29kZWQgcGFyYW1hdGVycyBhcyBhcHBsaWNhYmxlIGZvciB0aGUgbWV0aG9kXG4gICAgICogQHBhcmFtIHN1YnNjcmlwdGlvbiAtIFN1YnNjcmlwdGlvbiBkZXRhaWxzIChpbnRlcm5hbGx5IHVzZWQgYnkgYHN1YnNjcmliZWApXG4gICAgICovXG4gICAgYXN5bmMgc2VuZChtZXRob2QsIFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcGFyYW1zLCBzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGFzc2VydChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50LCBcImZcIiksIFwiQ2xpZW50IGlzIG5vdCBpbml0aWFsaXNlZFwiKTtcbiAgICAgICAgICAgIGFzc2VydChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2hhaW4sIFwiZlwiKSwgXCJDaGFpbiBpcyBub3QgaW5pdGlhbGlzZWRcIik7XG4gICAgICAgICAgICBjb25zdCBqc29uID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NvZGVyLCBcImZcIikuZW5jb2RlSnNvbihtZXRob2QsIHBhcmFtcyk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jb2RlciwgXCJmXCIpLmdldElkKCk7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gW1wiY2FsbGluZ1wiLCBtZXRob2QsIGpzb25dKTtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVycywgXCJmXCIpW2lkXSA9IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jaGFpbiwgXCJmXCIpLnNlbmRKc29uUnBjKGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogc3Vic2NyaWJlXG4gICAgICogQWxsb3dzIHN1YnNjcmliaW5nIHRvIGEgc3BlY2lmaWMgZXZlbnQuXG4gICAgICogQHBhcmFtICB0eXBlICAgICAtIFN1YnNjcmlwdGlvbiB0eXBlXG4gICAgICogQHBhcmFtICBtZXRob2QgICAtIFN1YnNjcmlwdGlvbiBtZXRob2RcbiAgICAgKiBAcGFyYW0gIHBhcmFtcyAgIC0gUGFyYW1ldGVycyBvZiB0eXBlIGFueVtdXG4gICAgICogQHBhcmFtICBjYWxsYmFjayAtIFByb3ZpZGVySW50ZXJmYWNlQ2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgKFByb21pc2VcXDxudW1iZXJ8c3RyaW5nXFw+KSByZXNvbHZpbmcgdG8gdGhlIGlkIG9mIHRoZSBzdWJzY3JpcHRpb24geW91IGNhbiB1c2Ugd2l0aCBbW3Vuc3Vic2NyaWJlXV0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIDxCUj5cbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiBjb25zdCBwcm92aWRlciA9IG5ldyBTbW9sZG90UHJvdmlkZXIoY2xpZW50KTtcbiAgICAgKiBjb25zdCBycGMgPSBuZXcgUnBjKHByb3ZpZGVyKTtcbiAgICAgKlxuICAgICAqIHJwYy5zdGF0ZS5zdWJzY3JpYmVTdG9yYWdlKFtbc3RvcmFnZS5iYWxhbmNlcy5mcmVlQmFsYW5jZSwgPEFkZHJlc3M+XV0sIChfLCB2YWx1ZXMpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKHZhbHVlcylcbiAgICAgKiB9KS50aGVuKChzdWJzY3JpcHRpb25JZCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ2JhbGFuY2UgY2hhbmdlcyBzdWJzY3JpcHRpb24gaWQ6ICcsIHN1YnNjcmlwdGlvbklkKVxuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICovXG4gICAgYXN5bmMgc3Vic2NyaWJlKFxuICAgIC8vIHRoZSBcIm1ldGhvZFwiIHByb3BlcnR5IG9mIHRoZSBKU09OIHJlc3BvbnNlIHRvIHRoaXMgc3Vic2NyaXB0aW9uXG4gICAgdHlwZSwgXG4gICAgLy8gdGhlIFwibWV0aG9kXCIgcHJvcGVydHkgb2YgdGhlIEpTT04gcmVxdWVzdCB0byByZWdpc3RlciB0aGUgc3Vic2NyaXB0aW9uXG4gICAgbWV0aG9kLCBcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmQobWV0aG9kLCBwYXJhbXMsIHsgY2FsbGJhY2ssIHR5cGUgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsbG93cyB1bnN1YnNjcmliaW5nIHRvIHN1YnNjcmlwdGlvbnMgbWFkZSB3aXRoIFtbc3Vic2NyaWJlXV0uXG4gICAgICovXG4gICAgYXN5bmMgdW5zdWJzY3JpYmUodHlwZSwgbWV0aG9kLCBpZCkge1xuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBgJHt0eXBlfTo6JHtpZH1gO1xuICAgICAgICBpZiAoaXNVbmRlZmluZWQoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIFwiZlwiKVtzdWJzY3JpcHRpb25dKSkge1xuICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBgVW5hYmxlIHRvIGZpbmQgYWN0aXZlIHN1YnNjcmlwdGlvbj0ke3N1YnNjcmlwdGlvbn1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIFwiZlwiKVtzdWJzY3JpcHRpb25dO1xuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMuc2VuZChtZXRob2QsIFtpZF0pKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2V2ZW50ZW1pdHRlciwgXCJmXCIpLmVtaXQodHlwZSwgLi4uYXJncyk7XG4gICAgfVxufVxuX1Ntb2xkb3RQcm92aWRlcl9jaGFpblNwZWMgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX2NvZGVyID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9ldmVudGVtaXR0ZXIgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZXJzID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9zdWJzY3JpcHRpb25zID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl93YWl0aW5nRm9ySWQgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50ID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9jaGFpbiA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfcGFyYWNoYWluU3BlY3MgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX3Ntb2xkb3QgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZVJwY1JlcG9uc2UgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX29uTWVzc2FnZVJlc3VsdCA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlU3Vic2NyaWJlID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9zaW11bGF0ZUxpZmVjeWNsZSA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfY2hlY2tDbGllbnRQZWVyY291bnQgPSBuZXcgV2Vha01hcCgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U21vbGRvdFByb3ZpZGVyLmpzLm1hcCIsInZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn07XG52YXIgX19jbGFzc1ByaXZhdGVGaWVsZEdldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZEdldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufTtcbnZhciBfSGVhbHRoQ2hlY2tFcnJvcl9jYXVzZTtcbmV4cG9ydCBjbGFzcyBIZWFsdGhDaGVja0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlc3BvbnNlLCBtZXNzYWdlID0gXCJHb3QgZXJyb3IgcmVzcG9uc2UgYXNraW5nIGZvciBzeXN0ZW0gaGVhbHRoXCIpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIF9IZWFsdGhDaGVja0Vycm9yX2NhdXNlLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9IZWFsdGhDaGVja0Vycm9yX2NhdXNlLCByZXNwb25zZSwgXCJmXCIpO1xuICAgICAgICAvLyAnRXJyb3InIGJyZWFrcyB0aGUgcHJvdG90eXBlIGNoYWluIC0gcmVzdG9yZSBpdFxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgIH1cbiAgICBnZXRDYXVzZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0hlYWx0aENoZWNrRXJyb3JfY2F1c2UsIFwiZlwiKTtcbiAgICB9XG59XG5fSGVhbHRoQ2hlY2tFcnJvcl9jYXVzZSA9IG5ldyBXZWFrTWFwKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvcnMuanMubWFwIiwiY29uc3QgaXNVbmRlZmluZWQgPSAodmFsdWUpID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiO1xufTtcbmZ1bmN0aW9uIGVyYXNlUmVjb3JkKHJlY29yZCwgY2IpIHtcbiAgICBPYmplY3Qua2V5cyhyZWNvcmQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIGNiKHJlY29yZFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgcmVjb3JkW2tleV07XG4gICAgfSk7XG59XG5leHBvcnQgeyBpc1VuZGVmaW5lZCwgZXJhc2VSZWNvcmQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==