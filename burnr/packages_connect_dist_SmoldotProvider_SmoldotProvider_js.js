"use strict";
(self["webpackChunk_substrate_burnr"] = self["webpackChunk_substrate_burnr"] || []).push([["packages_connect_dist_SmoldotProvider_SmoldotProvider_js"],{

/***/ "../../packages/connect/dist/SmoldotProvider/SmoldotProvider.js":
/*!**********************************************************************!*\
  !*** ../../packages/connect/dist/SmoldotProvider/SmoldotProvider.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SmoldotProvider": () => (/* binding */ SmoldotProvider)
/* harmony export */ });
/* harmony import */ var _polkadot_rpc_provider_coder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @polkadot/rpc-provider/coder */ "../../node_modules/@polkadot/rpc-provider/coder/index.js");
/* harmony import */ var _polkadot_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @polkadot/util */ "../../node_modules/@polkadot/util/logger.js");
/* harmony import */ var _polkadot_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @polkadot/util */ "../../node_modules/@polkadot/util/assert.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "../../node_modules/eventemitter3/index.js");
/* harmony import */ var _substrate_smoldot_light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @substrate/smoldot-light */ "../../node_modules/@substrate/smoldot-light/dist/index.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors.js */ "../../packages/connect/dist/errors.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/index.js */ "../../packages/connect/dist/utils/index.js");
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
      _this.send("system_health", []).then(__classPrivateFieldGet(_this, _SmoldotProvider_simulateLifecycle, "f"))["catch"](function (error) {
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
                forbidNonLocalWs: true,
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
                _context2.prev = 0;

                if (!__classPrivateFieldGet(this, _SmoldotProvider_client, "f")) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 4;
                return __classPrivateFieldGet(this, _SmoldotProvider_client, "f").terminate();

              case 4:
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                this.emit("error", _context2.t0);

              case 9:
                _context2.prev = 9;

                if (__classPrivateFieldGet(this, _SmoldotProvider_connectionStatePingerId, "f") !== null) {
                  clearInterval(__classPrivateFieldGet(this, _SmoldotProvider_connectionStatePingerId, "f"));
                }

                __classPrivateFieldSet(this, _SmoldotProvider_isConnected, false, "f");

                this.emit("disconnected");
                return _context2.finish(9);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6, 9, 14]]);
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
      params, isCacheable, subscription) {
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

      function send(_x, _x2, _x3, _x4) {
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
                return this.send(method, params, false, {
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

      function subscribe(_x5, _x6, _x7, _x8) {
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

      function unsubscribe(_x9, _x10, _x11) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZXNfY29ubmVjdF9kaXN0X1Ntb2xkb3RQcm92aWRlcl9TbW9sZG90UHJvdmlkZXJfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0EsSUFBTSxDQUFDLEdBQUcsc0RBQU0sQ0FBQyxrQkFBRCxDQUFoQjtBQTJCQSxJQUFNLFVBQVUsR0FBZ0M7QUFDOUMscUJBQW1CLEVBQUUscUJBRHlCO0FBRTlDLCtCQUE2QixFQUFFLCtCQUZlO0FBRzlDLGlDQUErQixFQUFFO0FBSGEsQ0FBaEQ7QUFNQTs7O0FBR0c7O0FBQ0gsSUFBTSxnQ0FBZ0MsR0FBRyxJQUF6QztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JHOztBQUNILElBQWEsZUFBYjtBQXFCRTs7O0FBR0c7QUFDSDtBQUNBLDJCQUFtQixTQUFuQixFQUFzQyxTQUF0QyxFQUEwRCxFQUExRCxFQUFrRTtBQUFBOztBQUFBOztBQXpCbEU7O0FBQ0EscUNBQTRCLElBQUksa0VBQUosRUFBNUI7O0FBQ0EsNENBQXVDLElBQUksMENBQUosRUFBdkM7O0FBQ0Esd0NBQXVELEVBQXZEOztBQUNBLDZDQUE2RCxFQUE3RDs7QUFDQSw0Q0FBMEQsRUFBMUQ7O0FBQ0E7O0FBQ0EsMkNBQWUsS0FBZjs7QUFDQSxzQ0FBc0MsU0FBdEM7O0FBQ0EscUNBQW9DLFNBQXBDOztBQUNBLDhDQUFzQyxTQUF0QyxDQUNBO0FBQ0E7QUFGQSxNQWVrRSxDQWRsRTtBQUNBOzs7QUFDQTtBQUVBOztBQUVHOzs7QUFDSCxnQ0FBdUIsZ0NBQXZCOztBQWlDQSxnREFBb0IsVUFBQyxHQUFELEVBQXNCO0FBQ3hDLE9BQUMsQ0FBQyxLQUFGLENBQVE7QUFBQSxlQUFNLENBQUMsVUFBRCxFQUFhLEdBQWIsQ0FBTjtBQUFBLE9BQVI7QUFFQSxVQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVgsQ0FBakI7QUFFQSxhQUFPLDREQUFXLENBQUMsUUFBUSxDQUFDLE1BQVYsQ0FBWCxHQUNILDhCQUFJLGdDQUFKLEVBQUksR0FBSixFQUFxQixJQUFyQixRQUFzQixRQUF0QixDQURHLEdBRUgsOEJBQUksbUNBQUosRUFBSSxHQUFKLEVBQXdCLElBQXhCLFFBQXlCLFFBQXpCLENBRko7QUFHRCxLQVJEOztBQVVBLCtDQUFtQixVQUFDLFFBQUQsRUFBb0M7QUFDckQsVUFBTSxPQUFPLEdBQUcsOEJBQUkseUJBQUosRUFBSSxHQUFKLEVBQWUsUUFBUSxDQUFDLEVBQXhCLENBQWhCOztBQUVBLFVBQUksQ0FBQyxPQUFMLEVBQWM7QUFDWixTQUFDLENBQUMsS0FBRixDQUFRO0FBQUEseURBQXVDLFFBQVEsQ0FBQyxFQUFoRDtBQUFBLFNBQVI7QUFFQTtBQUNEOztBQUVELFVBQUk7QUFDRixZQUFRLE1BQVIsR0FBaUMsT0FBakMsQ0FBUSxNQUFSO0FBQUEsWUFBZ0IsWUFBaEIsR0FBaUMsT0FBakMsQ0FBZ0IsWUFBaEI7O0FBQ0EsWUFBTSxNQUFNLEdBQUcsOEJBQUksc0JBQUosRUFBSSxHQUFKLEVBQVksY0FBWixDQUEyQixRQUEzQixDQUFmLENBRkUsQ0FJRjtBQUNBOzs7QUFDQSxlQUFPLENBQUMsUUFBUixDQUFpQixJQUFqQixFQUF1QixNQUF2Qjs7QUFFQSxZQUFJLFlBQUosRUFBa0I7QUFDaEIsY0FBTSxLQUFLLGFBQU0sWUFBWSxDQUFDLElBQW5CLGVBQTRCLE1BQTVCLENBQVg7QUFFQSx3Q0FBSSw4QkFBSixFQUFJLEdBQUosRUFBb0IsS0FBcEIsb0NBQ0ssWUFETDtBQUVFLGtCQUFNLEVBQU47QUFGRixhQUhnQixDQVFoQjs7QUFDQSxjQUFJLDhCQUFJLDZCQUFKLEVBQUksR0FBSixFQUFtQixLQUFuQixDQUFKLEVBQStCO0FBQzdCLDBDQUFJLG1DQUFKLEVBQUksR0FBSixFQUF3QixJQUF4QixRQUF5Qiw4QkFBSSw2QkFBSixFQUFJLEdBQUosRUFBbUIsS0FBbkIsQ0FBekI7QUFDRDtBQUNGO0FBQ0YsT0FyQkQsQ0FxQkUsT0FBTyxLQUFQLEVBQWM7QUFDZCxlQUFPLENBQUMsUUFBUixDQUFpQixLQUFqQixFQUFpQyxTQUFqQztBQUNEOztBQUVELGFBQU8sOEJBQUkseUJBQUosRUFBSSxHQUFKLEVBQWUsUUFBUSxDQUFDLEVBQXhCLENBQVA7QUFDRCxLQW5DRDs7QUFxQ0Esa0RBQXNCLFVBQUMsUUFBRCxFQUFvQztBQUN4RCxVQUFNLE1BQU0sR0FDVixVQUFVLENBQUMsUUFBUSxDQUFDLE1BQVYsQ0FBVixJQUF5QyxRQUFRLENBQUMsTUFBbEQsSUFBNEQsU0FEOUQ7QUFFQSxVQUFNLEtBQUssYUFBTSxNQUFOLGVBQWlCLFFBQVEsQ0FBQyxNQUFULENBQWdCLFlBQWpDLENBQVg7O0FBQ0EsVUFBTSxPQUFPLEdBQUcsOEJBQUksOEJBQUosRUFBSSxHQUFKLEVBQW9CLEtBQXBCLENBQWhCOztBQUVBLFVBQUksQ0FBQyxPQUFMLEVBQWM7QUFDWjtBQUNBLHNDQUFJLDZCQUFKLEVBQUksR0FBSixFQUFtQixLQUFuQixJQUE0QixRQUE1QjtBQUVBLFNBQUMsQ0FBQyxLQUFGLENBQ0U7QUFBQSxtRUFDNkMsS0FEN0MseUJBQ2lFLFFBQVEsQ0FBQyxFQUQxRTtBQUFBLFNBREY7QUFLQTtBQUNELE9BaEJ1RCxDQWtCeEQ7OztBQUNBLGFBQU8sOEJBQUksNkJBQUosRUFBSSxHQUFKLEVBQW1CLEtBQW5CLENBQVA7O0FBRUEsVUFBSTtBQUNGLFlBQU0sTUFBTSxHQUFHLDhCQUFJLHNCQUFKLEVBQUksR0FBSixFQUFZLGNBQVosQ0FBMkIsUUFBM0IsQ0FBZjs7QUFFQSxlQUFPLENBQUMsUUFBUixDQUFpQixJQUFqQixFQUF1QixNQUF2QjtBQUNELE9BSkQsQ0FJRSxPQUFPLEtBQVAsRUFBYztBQUNkLGVBQU8sQ0FBQyxRQUFSLENBQWlCLEtBQWpCLEVBQWlDLFNBQWpDO0FBQ0Q7QUFDRixLQTVCRDs7QUE4QkEsaURBQXFCLFVBQUMsTUFBRCxFQUFpQztBQUNwRDtBQUNBO0FBQ0EsVUFBSSxNQUFNLENBQUMsZUFBUCxJQUEwQixLQUE5QixFQUFxQztBQUNuQyxZQUFJLENBQUMsOEJBQUksNEJBQUosRUFBSSxHQUFKLENBQUwsRUFBd0I7QUFDdEIsd0NBQUksNEJBQUosRUFBb0IsSUFBcEIsRUFBd0IsR0FBeEI7O0FBQ0EsZUFBSSxDQUFDLElBQUwsQ0FBVSxXQUFWOztBQUNBLFdBQUMsQ0FBQyxLQUFGO0FBQ0E7QUFDRDs7QUFFRDtBQUNEOztBQUVELFVBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUF6QjtBQUNBLFVBQU0sVUFBVSxHQUNkLENBQUMsU0FBUyxHQUFHLENBQVosSUFBaUIsQ0FBQyxNQUFNLENBQUMsZUFBMUIsS0FBOEMsQ0FBQyxNQUFNLENBQUMsU0FEeEQ7QUFHQSxPQUFDLENBQUMsS0FBRjtBQUNBLE9BQUMsQ0FBQyxLQUFGLHdCQUNrQiw4QkFBSSw0QkFBSixFQUFJLEdBQUosRUFBa0IsUUFBbEIsRUFEbEIsOEJBQ2tFLFNBRGxFOztBQUlBLFVBQUksOEJBQUksNEJBQUosRUFBSSxHQUFKLEtBQXFCLFVBQXpCLEVBQXFDO0FBQ25DO0FBQ0E7QUFDRDs7QUFFRCxVQUFJLDhCQUFJLDRCQUFKLEVBQUksR0FBSixLQUFxQixTQUFTLEtBQUssQ0FBdkMsRUFBMEM7QUFDeEMsc0NBQUksNEJBQUosRUFBb0IsS0FBcEIsRUFBeUIsR0FBekI7O0FBQ0EsYUFBSSxDQUFDLElBQUwsQ0FBVSxjQUFWOztBQUNBLFNBQUMsQ0FBQyxLQUFGO0FBQ0E7QUFDRDs7QUFFRCxVQUFJLENBQUMsOEJBQUksNEJBQUosRUFBSSxHQUFKLENBQUQsSUFBc0IsVUFBMUIsRUFBc0M7QUFDcEMsc0NBQUksNEJBQUosRUFBb0IsSUFBcEIsRUFBd0IsR0FBeEI7O0FBQ0EsYUFBSSxDQUFDLElBQUwsQ0FBVSxXQUFWOztBQUNBLFNBQUMsQ0FBQyxLQUFGO0FBQ0E7QUFDRCxPQXhDbUQsQ0EwQ3BEOztBQUNELEtBM0NEOztBQTZDQSxvREFBd0IsWUFBVztBQUNqQyxXQUFJLENBQUMsSUFBTCxDQUFVLGVBQVYsRUFBMkIsRUFBM0IsRUFDRyxJQURILENBQ1EsOEJBQUksa0NBQUosRUFBSSxHQUFKLENBRFIsV0FFUyxVQUFDLEtBQUQ7QUFBQSxlQUFXLEtBQUksQ0FBQyxJQUFMLENBQVUsT0FBVixFQUFtQixJQUFJLHdEQUFKLENBQXFCLEtBQXJCLENBQW5CLENBQVg7QUFBQSxPQUZUO0FBR0Q7QUFFRDs7QUFFRztBQVJIO0FBTUE7O0FBRUc7OztBQUNJLHdGQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNmLG9FQUFNLENBQUMsQ0FBQyw4QkFBSSx1QkFBSixFQUFJLEdBQUosQ0FBRCxJQUFpQixDQUFDLDhCQUFJLDRCQUFKLEVBQUksR0FBSixDQUFuQixFQUFzQyw2QkFBdEMsQ0FBTjtBQURlOztBQUdiLDRDQUFJLHVCQUFKLEVBQWUsOEJBQUksd0JBQUosRUFBSSxHQUFKLEVBQWMsS0FBZCxDQUFvQjtBQUNqQyxnQ0FBZ0IsRUFBRSxJQURlO0FBRWpDLDJCQUFXLEVBQUU7QUFBRTs7QUFGa0IsZUFBcEIsQ0FBZixFQUdFLEdBSEY7O0FBSGEsbUJBT1QsOEJBQUksK0JBQUosRUFBSSxHQUFKLENBUFM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxxQkFRUyw4QkFBSSx1QkFBSixFQUFJLEdBQUosRUFBYSxRQUFiLENBQXNCO0FBQ3hDLHlCQUFTLEVBQUUsOEJBQUksMEJBQUosRUFBSSxHQUFKO0FBRDZCLGVBQXRCLENBUlQ7O0FBQUE7QUFRTCxtQkFSSztBQUFBLDRCQVdYLHNCQVhXO0FBQUEsNEJBV1gsS0FYVztBQUFBLDRCQVdQLHNCQVhPO0FBQUE7QUFBQSxxQkFXUyw4QkFBSSx1QkFBSixFQUFJLEdBQUosRUFBYSxRQUFiLENBQXNCO0FBQ3hDLHlCQUFTLEVBQUUsOEJBQUksK0JBQUosRUFBSSxHQUFKLENBRDZCO0FBRXhDLCtCQUFlLEVBQUUseUJBQUMsUUFBRCxFQUFxQjtBQUNwQyxnREFBSSxpQ0FBSixFQUFJLEdBQUosRUFBc0IsSUFBdEIsUUFBdUIsUUFBdkI7QUFDRCxpQkFKdUM7QUFLeEMsb0NBQW9CLEVBQUUsQ0FBQyxLQUFEO0FBTGtCLGVBQXRCLENBWFQ7O0FBQUE7QUFBQTtBQUFBLHNFQWlCVCxHQWpCUztBQUFBO0FBQUE7O0FBQUE7QUFBQSw0QkFtQlgsc0JBbkJXO0FBQUEsNEJBbUJYLEtBbkJXO0FBQUEsNEJBbUJQLHNCQW5CTztBQUFBO0FBQUEscUJBbUJTLDhCQUFJLHVCQUFKLEVBQUksR0FBSixFQUFhLFFBQWIsQ0FBc0I7QUFDeEMseUJBQVMsRUFBRSw4QkFBSSwwQkFBSixFQUFJLEdBQUosQ0FENkI7QUFFeEMsK0JBQWUsRUFBRSx5QkFBQyxRQUFELEVBQXFCO0FBQ3BDLGdEQUFJLGlDQUFKLEVBQUksR0FBSixFQUFzQixJQUF0QixRQUF1QixRQUF2QjtBQUNEO0FBSnVDLGVBQXRCLENBbkJUOztBQUFBO0FBQUE7QUFBQSxzRUF3QlQsR0F4QlM7O0FBQUE7QUEwQmIsNENBQUksd0NBQUosRUFBZ0MsV0FBVyxDQUN6Qyw4QkFBSSxxQ0FBSixFQUFJLEdBQUosQ0FEeUMsRUFFekMsS0FBSSxDQUFDLG9CQUZvQyxDQUEzQyxFQUdDLEdBSEQ7O0FBMUJhO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQStCYixtQkFBSSxDQUFDLElBQUwsQ0FBVSxPQUFWOztBQS9CYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFWOztBQTVKTCxpQ0FBSSwwQkFBSixFQUFrQixTQUFsQixFQUEyQixHQUEzQixFQURnRSxDQUVoRTs7O0FBQ0EsaUNBQUksd0JBQUosRUFBZ0IsRUFBRSxJQUFJLHFEQUF0QixFQUE2QixHQUE3Qjs7QUFDQSxpQ0FBSSx3Q0FBSixFQUFnQyxJQUFoQyxFQUFvQyxHQUFwQzs7QUFDQSxRQUFJLFNBQUosRUFBZTtBQUNiLG1DQUFJLCtCQUFKLEVBQXVCLFNBQXZCLEVBQWdDLEdBQWhDO0FBQ0Q7QUFDRjtBQUVEOzs7QUFHRzs7O0FBdkNMO0FBQUE7QUFBQSxTQXdDRSxlQUEyQjtBQUN6QixhQUFPLElBQVA7QUFDRDtBQUVEOzs7QUFHRzs7QUEvQ0w7QUFBQTtBQUFBLFdBZ0RTLGlCQUFLO0FBQ1YsWUFBTSxJQUFJLEtBQUosQ0FBVSwyQkFBVixDQUFOO0FBQ0Q7QUF3S0Q7O0FBRUc7QUFDSDs7QUE3TkY7QUFBQTtBQUFBO0FBQUEsZ0ZBOE5TO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxxQkFFQyw2QkFBSSx1QkFBSixFQUFJLEdBQUosQ0FGRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHVCQUlLLDZCQUFJLHVCQUFKLEVBQUksR0FBSixFQUFhLFNBQWIsRUFKTDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBT0gscUJBQUssSUFBTCxDQUFVLE9BQVY7O0FBUEc7QUFBQTs7QUFTSCxvQkFBSSw2QkFBSSx3Q0FBSixFQUFJLEdBQUosTUFBa0MsSUFBdEMsRUFBNEM7QUFDMUMsK0JBQWEsQ0FBQyw2QkFBSSx3Q0FBSixFQUFJLEdBQUosQ0FBRCxDQUFiO0FBQ0Q7O0FBRUQsNkNBQUksNEJBQUosRUFBb0IsS0FBcEIsRUFBeUIsR0FBekI7O0FBQ0EscUJBQUssSUFBTCxDQUFVLGNBQVY7QUFkRzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQTlOVDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQWdQRTs7O0FBR0c7O0FBblBMO0FBQUE7QUFBQSxTQW9QRSxlQUFzQjtBQUNwQixhQUFPLDZCQUFJLDRCQUFKLEVBQUksR0FBSixDQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBTUc7O0FBOVBMO0FBQUE7QUFBQSxXQStQUyxZQUNMLElBREssRUFFTCxHQUZLLEVBRXVCO0FBQUE7O0FBRTVCLG1DQUFJLDZCQUFKLEVBQUksR0FBSixFQUFtQixFQUFuQixDQUFzQixJQUF0QixFQUE0QixHQUE1Qjs7QUFFQSxhQUFPLFlBQVc7QUFDaEIsdUNBQUksNkJBQUosRUFBSSxHQUFKLEVBQW1CLGNBQW5CLENBQWtDLElBQWxDLEVBQXdDLEdBQXhDO0FBQ0QsT0FGRDtBQUdEO0FBRUQ7Ozs7O0FBS0c7O0FBL1FMO0FBQUE7QUFBQTtBQUFBLDBFQWdSUyxrQkFDTCxNQURLLEVBRUw7QUFDQSxZQUhLLEVBSUwsV0FKSyxFQUtMLFlBTEs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtEQVFFLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBMEI7QUFDM0Msd0VBQU0sQ0FBQywrQkFBSSx1QkFBSixFQUFJLEdBQUosQ0FBRCxFQUFlLDJCQUFmLENBQU47QUFDQSx3RUFBTSxDQUFDLCtCQUFJLHNCQUFKLEVBQUksR0FBSixDQUFELEVBQWMsMEJBQWQsQ0FBTjs7QUFDQSxzQkFBTSxJQUFJLEdBQUcsK0JBQUksc0JBQUosRUFBSSxHQUFKLEVBQVksVUFBWixDQUF1QixNQUF2QixFQUErQixNQUEvQixDQUFiOztBQUNBLHNCQUFNLEVBQUUsR0FBRywrQkFBSSxzQkFBSixFQUFJLEdBQUosRUFBWSxLQUFaLEVBQVg7O0FBRUEsc0JBQU0sUUFBUSxHQUFHLFNBQVgsUUFBVyxDQUFDLEtBQUQsRUFBdUIsTUFBdkIsRUFBaUQ7QUFDaEUseUJBQUssR0FBRyxNQUFNLENBQUMsS0FBRCxDQUFULEdBQW1CLE9BQU8sQ0FBQyxNQUFELENBQS9CO0FBQ0QsbUJBRkQ7O0FBSUEsbUJBQUMsQ0FBQyxLQUFGLENBQVE7QUFBQSwyQkFBTSxDQUFDLFNBQUQsRUFBWSxNQUFaLEVBQW9CLElBQXBCLENBQU47QUFBQSxtQkFBUjtBQUVBLGlEQUFJLHlCQUFKLEVBQUksR0FBSixFQUFlLEVBQWYsSUFBcUI7QUFDbkIsNEJBQVEsRUFBUixRQURtQjtBQUVuQiwwQkFBTSxFQUFOLE1BRm1CO0FBR25CLGdDQUFZLEVBQVo7QUFIbUIsbUJBQXJCOztBQUtBLGlEQUFJLHNCQUFKLEVBQUksR0FBSixFQUFZLFdBQVosQ0FBd0IsSUFBeEI7QUFDRCxpQkFsQk0sQ0FSRjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQWhSVDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQTZTRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCRzs7QUFuVUw7QUFBQTtBQUFBO0FBQUEsK0VBb1VTLG1CQUNMO0FBQ0EsVUFGSyxFQUdMO0FBQ0EsWUFKSyxFQUtMO0FBQ0EsWUFOSyxFQU9MLFFBUEs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBVVEsS0FBSyxJQUFMLENBQVUsTUFBVixFQUFrQixNQUFsQixFQUEwQixLQUExQixFQUFpQztBQUFFLDBCQUFRLEVBQVIsUUFBRjtBQUFZLHNCQUFJLEVBQUo7QUFBWixpQkFBakMsQ0FWUjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BcFVUOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBaVZFOztBQUVHOztBQW5WTDtBQUFBO0FBQUE7QUFBQSxpRkFvVlMsa0JBQ0wsSUFESyxFQUVMLE1BRkssRUFHTCxFQUhLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtDLDRCQUxELGFBS21CLElBTG5CLGVBSzRCLEVBTDVCOztBQUFBLHFCQU9ELDREQUFXLENBQUMsNkJBQUksOEJBQUosRUFBSSxHQUFKLEVBQW9CLFlBQXBCLENBQUQsQ0FQVjtBQUFBO0FBQUE7QUFBQTs7QUFRSCxpQkFBQyxDQUFDLEtBQUYsQ0FBUTtBQUFBLHNFQUE0QyxZQUE1QztBQUFBLGlCQUFSO0FBUkcsa0RBVUksS0FWSjs7QUFBQTtBQWFMLHVCQUFPLDZCQUFJLDhCQUFKLEVBQUksR0FBSixFQUFvQixZQUFwQixDQUFQO0FBYks7QUFBQSx1QkFlUyxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQWtCLENBQUMsRUFBRCxDQUFsQixDQWZUOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FwVlQ7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsUUFzV0U7O0FBdFdGO0FBQUE7QUFBQSxXQXVXVSxjQUFLLElBQUwsRUFBdUQ7QUFBQTs7QUFBQSx3Q0FBZixJQUFlO0FBQWYsWUFBZTtBQUFBOztBQUM3RCwyREFBSSw2QkFBSixFQUFJLEdBQUosR0FBbUIsSUFBbkIsOEJBQXdCLElBQXhCLFNBQWlDLElBQWpDO0FBQ0Q7QUF6V0g7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFGQSxJQUFhLGdCQUFiO0FBQUE7O0FBQUE7O0FBT0UsNEJBQ0UsUUFERixFQUV5RDtBQUFBOztBQUFBLFFBQXZELE9BQXVELHVFQUE3Qyw2Q0FBNkM7O0FBQUE7O0FBRXZELDhCQUFNLE9BQU47O0FBVkY7O0FBV0UsMERBQUksdUJBQUosRUFBYyxRQUFkLEVBQXNCLEdBQXRCLEVBSHVELENBSXZEOzs7QUFDQSxVQUFNLENBQUMsY0FBUCxnQ0FBNEIsK0RBQVcsU0FBdkM7QUFMdUQ7QUFNeEQ7O0FBZkg7QUFBQTtBQUFBLFdBR0Usb0JBQVE7QUFDTixhQUFPLDZCQUFJLHVCQUFKLEVBQUksR0FBSixDQUFQO0FBQ0Q7QUFMSDs7QUFBQTtBQUFBLGlDQUFzQyxLQUF0Qzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQU0sV0FBVyxHQUFHLFNBQWQsV0FBYyxDQUFDLEtBQUQsRUFBd0M7QUFDMUQsU0FBTyxPQUFPLEtBQVAsS0FBaUIsV0FBeEI7QUFDRCxDQUZEOztBQUlBLFNBQVMsV0FBVCxDQUNFLE1BREYsRUFFRSxFQUZGLEVBRXdCO0FBRXRCLFFBQU0sQ0FBQyxJQUFQLENBQVksTUFBWixFQUFvQixPQUFwQixDQUE0QixVQUFDLEdBQUQsRUFBYztBQUN4QyxRQUFJLEVBQUosRUFBUTtBQUNOLFFBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRCxDQUFQLENBQUY7QUFDRDs7QUFFRCxXQUFPLE1BQU0sQ0FBQyxHQUFELENBQWI7QUFDRCxHQU5EO0FBT0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ac3Vic3RyYXRlL2J1cm5yLy4uLy4uL3NyYy9TbW9sZG90UHJvdmlkZXIvU21vbGRvdFByb3ZpZGVyLnRzIiwid2VicGFjazovL0BzdWJzdHJhdGUvYnVybnIvLi4vc3JjL2Vycm9ycy50cyIsIndlYnBhY2s6Ly9Ac3Vic3RyYXRlL2J1cm5yLy4uLy4uL3NyYy91dGlscy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX1Ntb2xkb3RQcm92aWRlcl9jaGFpblNwZWMsIF9TbW9sZG90UHJvdmlkZXJfY29kZXIsIF9TbW9sZG90UHJvdmlkZXJfZXZlbnRlbWl0dGVyLCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZXJzLCBfU21vbGRvdFByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBfU21vbGRvdFByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgX1Ntb2xkb3RQcm92aWRlcl9jaGFpbiwgX1Ntb2xkb3RQcm92aWRlcl9wYXJhY2hhaW5TcGVjcywgX1Ntb2xkb3RQcm92aWRlcl9zbW9sZG90LCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZVJwY1JlcG9uc2UsIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlUmVzdWx0LCBfU21vbGRvdFByb3ZpZGVyX29uTWVzc2FnZVN1YnNjcmliZSwgX1Ntb2xkb3RQcm92aWRlcl9zaW11bGF0ZUxpZmVjeWNsZSwgX1Ntb2xkb3RQcm92aWRlcl9jaGVja0NsaWVudFBlZXJjb3VudDtcbmltcG9ydCB7IFJwY0NvZGVyIH0gZnJvbSBcIkBwb2xrYWRvdC9ycGMtcHJvdmlkZXIvY29kZXJcIjtcbmltcG9ydCB7IGFzc2VydCwgbG9nZ2VyIH0gZnJvbSBcIkBwb2xrYWRvdC91dGlsXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudGVtaXR0ZXIzXCI7XG5pbXBvcnQgKiBhcyBzbW9sZG90IGZyb20gXCJAc3Vic3RyYXRlL3Ntb2xkb3QtbGlnaHRcIjtcbmltcG9ydCB7IEhlYWx0aENoZWNrRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzLmpzXCI7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xuY29uc3QgbCA9IGxvZ2dlcihcInNtb2xkb3QtcHJvdmlkZXJcIik7XG5jb25zdCBBTkdMSUNJU01TID0ge1xuICAgIGNoYWluX2ZpbmFsaXNlZEhlYWQ6IFwiY2hhaW5fZmluYWxpemVkSGVhZFwiLFxuICAgIGNoYWluX3N1YnNjcmliZUZpbmFsaXNlZEhlYWRzOiBcImNoYWluX3N1YnNjcmliZUZpbmFsaXplZEhlYWRzXCIsXG4gICAgY2hhaW5fdW5zdWJzY3JpYmVGaW5hbGlzZWRIZWFkczogXCJjaGFpbl91bnN1YnNjcmliZUZpbmFsaXplZEhlYWRzXCIsXG59O1xuLypcbiAqIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZXR3ZWVuIGNoZWNrcyB0byBzZWUgaWYgd2UgaGF2ZSBhbnlcbiAqIGNvbm5lY3RlZCBwZWVycyBpbiB0aGUgc21vbGRvdCBjbGllbnRcbiAqL1xuY29uc3QgQ09OTkVDVElPTl9TVEFURV9QSU5HRVJfSU5URVJWQUwgPSAyMDAwO1xuLyoqXG4gKiBTbW9sZG90UHJvdmlkZXJcbiAqXG4gKiBUaGUgU21vbGRvdFByb3ZpZGVyIGFsbG93cyBpbnRlcmFjdGluZyB3aXRoIGEgc21vbGRvdC1iYXNlZFxuICogV0FTTSBsaWdodCBjbGllbnQuICBJLmUuIHdpdGhvdXQgZG9pbmcgUlBDIHRvIGEgcmVtb3RlIG5vZGUgb3ZlciBIVFRQXG4gKiBvciB3ZWJzb2NrZXRzXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGltcG9ydCByZWFkRmlsZVN5bmMgZnJvbSAnZnMnO1xuICogaW1wb3J0IEFwaSBmcm9tICdAcG9sa2Fkb3QvYXBpL3Byb21pc2UnO1xuICogaW1wb3J0IHsgU21vbGRvdFByb3ZpZGVyIH0gZnJvbSAnLi4vJztcbiAqXG4gKiBjb25zdCBjaGFpblNwZWMgPSByZWFkRmlsZVN5bmMoJy4vcGF0aC90by9jaGFpblNwZWMuanNvbicpO1xuICogY29uc3QgcHJvdmlkZXIgPSBuZXcgU21vbGRvdFByb3ZpZGVyKGNoYWluU3BlYyk7XG4gKiBjb25zdCBhcGkgPSBuZXcgQXBpKHByb3ZpZGVyKTtcbiAqIGBgYFxuICogQGV4YW1wbGVcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGltcG9ydCByZWFkRmlsZVN5bmMgZnJvbSAnZnMnO1xuICogaW1wb3J0IEFwaSBmcm9tICdAcG9sa2Fkb3QvYXBpL3Byb21pc2UnO1xuICogaW1wb3J0IHsgU21vbGRvdFByb3ZpZGVyIH0gZnJvbSAnLi4vJztcbiAqXG4gKiBjb25zdCBjaGFpblNwZWMgPSByZWFkRmlsZVN5bmMoJy4vcGF0aC90by9wb2xrYWRvdC5qc29uJyk7XG4gKiBjb25zdCBwcCA9IG5ldyBTbW9sZG90UHJvdmlkZXIoY2hhaW5TcGVjKTtcbiAqIGNvbnN0IHBvbGthZG90QXBpID0gbmV3IEFwaShwcCk7XG4gKlxuICogY29uc3QgY2hhaW5TcGVjID0gcmVhZEZpbGVTeW5jKCcuL3BhdGgvdG8va3VzYW1hLmpzb24nKTtcbiAqIGNvbnN0IGtwID0gbmV3IFNtb2xkb3RQcm92aWRlcihjaGFpblNwZWMpO1xuICogY29uc3Qga3VzYW1hQXBpID0gbmV3IEFwaShwcCk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIFNtb2xkb3RQcm92aWRlciB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGNoYWluU3BlYyAtIFRoZSBjaGFpblNwZWMgZm9yIHRoZSBXQVNNIGNsaWVudFxuICAgICAqIEBwYXJhbSBzbSAtIChvbmx5IHVzZWQgZm9yIHRlc3RpbmcpIGRlZmF1bHRzIHRvIHRoZSBhY3R1YWwgc21vbGRvdCBtb2R1bGVcbiAgICAgKi9cbiAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgICBjb25zdHJ1Y3RvcihjaGFpblNwZWMsIHBhcmFjaGFpbiwgc20pIHtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9jaGFpblNwZWMuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfY29kZXIuc2V0KHRoaXMsIG5ldyBScGNDb2RlcigpKTtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9ldmVudGVtaXR0ZXIuc2V0KHRoaXMsIG5ldyBFdmVudEVtaXR0ZXIoKSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfaGFuZGxlcnMuc2V0KHRoaXMsIHt9KTtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9zdWJzY3JpcHRpb25zLnNldCh0aGlzLCB7fSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkLnNldCh0aGlzLCB7fSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQuc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfaXNDb25uZWN0ZWQuc2V0KHRoaXMsIGZhbHNlKTtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9jbGllbnQuc2V0KHRoaXMsIHVuZGVmaW5lZCk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfY2hhaW4uc2V0KHRoaXMsIHVuZGVmaW5lZCk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfcGFyYWNoYWluU3BlY3Muc2V0KHRoaXMsIHVuZGVmaW5lZFxuICAgICAgICAvLyByZWZlcmVuY2UgdG8gdGhlIHNtb2xkb3QgbW9kdWxlIHNvIHdlIGNhbiBkZWZlciBsb2FkaW5nIHRoZSB3YXNtIGNsaWVudFxuICAgICAgICAvLyB1bnRpbCBjb25uZWN0IGlzIGNhbGxlZFxuICAgICAgICApO1xuICAgICAgICAvLyByZWZlcmVuY2UgdG8gdGhlIHNtb2xkb3QgbW9kdWxlIHNvIHdlIGNhbiBkZWZlciBsb2FkaW5nIHRoZSB3YXNtIGNsaWVudFxuICAgICAgICAvLyB1bnRpbCBjb25uZWN0IGlzIGNhbGxlZFxuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX3Ntb2xkb3Quc2V0KHRoaXMsIHZvaWQgMCk7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEhvdyBmcmVxdWVudGx5IHRvIHNlZSBpZiB3ZSBoYXZlIGFueSBwZWVyc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oZWFsdGhQaW5nZXJJbnRlcnZhbCA9IENPTk5FQ1RJT05fU1RBVEVfUElOR0VSX0lOVEVSVkFMO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZVJwY1JlcG9uc2Uuc2V0KHRoaXMsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gW1wicmVjZWl2ZWRcIiwgcmVzXSk7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzKTtcbiAgICAgICAgICAgIHJldHVybiBpc1VuZGVmaW5lZChyZXNwb25zZS5tZXRob2QpXG4gICAgICAgICAgICAgICAgPyBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlUmVzdWx0LCBcImZcIikuY2FsbCh0aGlzLCByZXNwb25zZSlcbiAgICAgICAgICAgICAgICA6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUsIFwiZlwiKS5jYWxsKHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlUmVzdWx0LnNldCh0aGlzLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfaGFuZGxlcnMsIFwiZlwiKVtyZXNwb25zZS5pZF07XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBsLmRlYnVnKCgpID0+IGBVbmFibGUgdG8gZmluZCBoYW5kbGVyIGZvciBpZD0ke3Jlc3BvbnNlLmlkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBtZXRob2QsIHN1YnNjcmlwdGlvbiB9ID0gaGFuZGxlcjtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY29kZXIsIFwiZlwiKS5kZWNvZGVSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gZmlyc3Qgc2VuZCB0aGUgcmVzdWx0IC0gaW4gY2FzZSBvZiBzdWJzLCB3ZSBtYXkgaGF2ZSBhbiB1cGRhdGVcbiAgICAgICAgICAgICAgICAvLyBpbW1lZGlhdGVseSBpZiB3ZSBoYXZlIHNvbWUgcXVldWVkIHJlc3VsdHMgYWxyZWFkeVxuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YklkID0gYCR7c3Vic2NyaXB0aW9uLnR5cGV9Ojoke3Jlc3VsdH1gO1xuICAgICAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfc3Vic2NyaXB0aW9ucywgXCJmXCIpW3N1YklkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN1YnNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIHJlc3VsdCB3YWl0aW5nIGZvciB0aGlzIHN1YnNjcmlwdGlvbiBhbHJlYWR5XG4gICAgICAgICAgICAgICAgICAgIGlmIChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBcImZcIilbc3ViSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlU3Vic2NyaWJlLCBcImZcIikuY2FsbCh0aGlzLCBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBcImZcIilbc3ViSWRdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbGJhY2soZXJyb3IsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZXJzLCBcImZcIilbcmVzcG9uc2UuaWRdO1xuICAgICAgICB9KTtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUuc2V0KHRoaXMsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gQU5HTElDSVNNU1tyZXNwb25zZS5tZXRob2RdIHx8IHJlc3BvbnNlLm1ldGhvZCB8fCBcImludmFsaWRcIjtcbiAgICAgICAgICAgIGNvbnN0IHN1YklkID0gYCR7bWV0aG9kfTo6JHtyZXNwb25zZS5wYXJhbXMuc3Vic2NyaXB0aW9ufWA7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIFwiZlwiKVtzdWJJZF07XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSB0aGUgcmVzcG9uc2UsIHdlIGNvdWxkIGhhdmUgb3V0LW9mLW9yZGVyIHN1YmlkIGNvbWluZyBpblxuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl93YWl0aW5nRm9ySWQsIFwiZlwiKVtzdWJJZF0gPSByZXNwb25zZTtcbiAgICAgICAgICAgICAgICBsLmRlYnVnKCgpID0+IGBVbmFibGUgdG8gZmluZCBoYW5kbGVyIGZvciBzdWJzY3JpcHRpb249JHtzdWJJZH0gcmVzcG9uc2VJZD0ke3Jlc3BvbnNlLmlkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGhvdXNla2VlcGluZ1xuICAgICAgICAgICAgZGVsZXRlIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl93YWl0aW5nRm9ySWQsIFwiZlwiKVtzdWJJZF07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jb2RlciwgXCJmXCIpLmRlY29kZVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKGVycm9yLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9zaW11bGF0ZUxpZmVjeWNsZS5zZXQodGhpcywgKGhlYWx0aCkgPT4ge1xuICAgICAgICAgICAgLy8gZGV2ZWxvcG1lbnQgY2hhaW5zIHNob3VsZCBub3QgaGF2ZSBwZWVycyBzbyB3ZSBvbmx5IGVtaXQgY29ubmVjdGVkXG4gICAgICAgICAgICAvLyBvbmNlIGFuZCBuZXZlciBkaXNjb25uZWN0XG4gICAgICAgICAgICBpZiAoaGVhbHRoLnNob3VsZEhhdmVQZWVycyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmICghX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCB0cnVlLCBcImZcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbC5kZWJ1ZyhgZW1pdHRlZCBDT05ORUNURURgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwZWVyQ291bnQgPSBoZWFsdGgucGVlcnM7XG4gICAgICAgICAgICBjb25zdCBwZWVyQ2hlY2tzID0gKHBlZXJDb3VudCA+IDAgfHwgIWhlYWx0aC5zaG91bGRIYXZlUGVlcnMpICYmICFoZWFsdGguaXNTeW5jaW5nO1xuICAgICAgICAgICAgbC5kZWJ1ZyhgU2ltdWxhdGluZyBsaWZlY3lsY2UgZXZlbnRzIGZyb20gc3lzdGVtX2hlYWx0aGApO1xuICAgICAgICAgICAgbC5kZWJ1ZyhgaXNDb25uZWN0ZWQ6ICR7X19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikudG9TdHJpbmcoKX0sIG5ldyBwZWVyQ291bnQ6ICR7cGVlckNvdW50fWApO1xuICAgICAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpICYmIHBlZXJDaGVja3MpIHtcbiAgICAgICAgICAgICAgICAvLyBzdGlsbCBjb25uZWN0ZWRcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikgJiYgcGVlckNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBmYWxzZSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImRpc2Nvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBsLmRlYnVnKGBlbWl0dGVkIERJU0NPTk5FQ1RFRGApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBcImZcIikgJiYgcGVlckNoZWNrcykge1xuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgdHJ1ZSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBsLmRlYnVnKGBlbWl0dGVkIENPTk5FQ1RFRGApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN0aWxsIG5vdCBjb25uZWN0ZWRcbiAgICAgICAgfSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfY2hlY2tDbGllbnRQZWVyY291bnQuc2V0KHRoaXMsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZChcInN5c3RlbV9oZWFsdGhcIiwgW10pXG4gICAgICAgICAgICAgICAgLnRoZW4oX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3NpbXVsYXRlTGlmZWN5Y2xlLCBcImZcIikpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IEhlYWx0aENoZWNrRXJyb3IoZXJyb3IpKSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFwiQ29ubmVjdFwiIHRoZSBXQVNNIGNsaWVudCAtIHN0YXJ0cyB0aGUgc21vbGRvdCBXQVNNIGNsaWVudFxuICAgICAgICAgKi9cbiAgICAgICAgKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFwiQ29ubmVjdFwiIHRoZSBXQVNNIGNsaWVudCAtIHN0YXJ0cyB0aGUgc21vbGRvdCBXQVNNIGNsaWVudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb25uZWN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0KCFfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50LCBcImZcIikgJiYgIV9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpLCBcIkNsaWVudCBpcyBhbHJlYWR5IGNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3Ntb2xkb3QsIFwiZlwiKS5zdGFydCh7XG4gICAgICAgICAgICAgICAgICAgIGZvcmJpZE5vbkxvY2FsV3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1heExvZ0xldmVsOiAzIC8qIG5vIGRlYnVnL3RyYWNlIG1lc3NhZ2VzICovLFxuICAgICAgICAgICAgICAgIH0pLCBcImZcIik7XG4gICAgICAgICAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9wYXJhY2hhaW5TcGVjcywgXCJmXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF5ID0gYXdhaXQgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgXCJmXCIpLmFkZENoYWluKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWluU3BlYzogX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NoYWluU3BlYywgXCJmXCIpLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NoYWluLCBhd2FpdCBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50LCBcImZcIikuYWRkQ2hhaW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhaW5TcGVjOiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfcGFyYWNoYWluU3BlY3MsIFwiZlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzb25ScGNDYWxsYmFjazogKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZVJwY1JlcG9uc2UsIFwiZlwiKS5jYWxsKHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3RlbnRpYWxSZWxheUNoYWluczogW3JlbGF5XSxcbiAgICAgICAgICAgICAgICAgICAgfSksIFwiZlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jaGFpbiwgYXdhaXQgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgXCJmXCIpLmFkZENoYWluKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWluU3BlYzogX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NoYWluU3BlYywgXCJmXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAganNvblJwY0NhbGxiYWNrOiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfaGFuZGxlUnBjUmVwb25zZSwgXCJmXCIpLmNhbGwodGhpcywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSksIFwiZlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBzZXRJbnRlcnZhbChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2hlY2tDbGllbnRQZWVyY291bnQsIFwiZlwiKSwgdGhpcy5oZWFsdGhQaW5nZXJJbnRlcnZhbCksIFwiZlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NoYWluU3BlYywgY2hhaW5TcGVjLCBcImZcIik7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3Ntb2xkb3QsIHNtIHx8IHNtb2xkb3QsIFwiZlwiKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBudWxsLCBcImZcIik7XG4gICAgICAgIGlmIChwYXJhY2hhaW4pIHtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9wYXJhY2hhaW5TcGVjcywgcGFyYWNoYWluLCBcImZcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTGV0cyBwb2xrYWRvdC1qcyBrbm93IHdlIHN1cHBvcnQgc3Vic2NyaXB0aW9uc1xuICAgICAqIEByZXR1cm5zIGB0cnVlYFxuICAgICAqL1xuICAgIGdldCBoYXNTdWJzY3JpcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoZSBvYmplY3RcbiAgICAgKiBAdGhyb3dzIHRocm93cyBhbiBlcnJvciBhcyB0aGlzIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgICovXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNsb25lKCkgaXMgbm90IHN1cHBvcnRlZC5cIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hbnVhbGx5IFwiZGlzY29ubmVjdFwiIC0gZHJvcHMgdGhlIHJlZmVyZW5jZSB0byB0aGUgV0FTTSBjbGllbnRcbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3JlcXVpcmUtYXdhaXRcbiAgICBhc3luYyBkaXNjb25uZWN0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jbGllbnQsIFwiZlwiKSkge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWNhbGxcbiAgICAgICAgICAgICAgICBhd2FpdCBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50LCBcImZcIikudGVybWluYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBpZiAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBcImZcIikgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCwgXCJmXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgZmFsc2UsIFwiZlwiKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImRpc2Nvbm5lY3RlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBub2RlIGlzIGNvbm5lY3RlZCBvciBub3QuXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBjb25uZWN0ZWRcbiAgICAgKi9cbiAgICBnZXQgaXNDb25uZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfaXNDb25uZWN0ZWQsIFwiZlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHByb3ZpZGVyIGV2ZW50cyAtIGluIHByYWN0aWNlIHRoZSBzbW9sZG90IHByb3ZpZGVyIG9ubHlcbiAgICAgKiBlbWl0cyBhIGBjb25uZWN0ZWRgIGV2ZW50IGFmdGVyIHN1Y2Nlc3NmdWxseSBzdGFydGluZyB0aGUgc21vbGRvdCBjbGllbnRcbiAgICAgKiBhbmQgYGRpc2Nvbm5lY3RlZGAgYWZ0ZXIgYGRpc2Nvbm5lY3RgIGlzIGNhbGxlZC5cbiAgICAgKiBAcGFyYW0gdHlwZSAtIEV2ZW50XG4gICAgICogQHBhcmFtIHN1YiAgLSBDYWxsYmFja1xuICAgICAqL1xuICAgIG9uKHR5cGUsIHN1Yikge1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfZXZlbnRlbWl0dGVyLCBcImZcIikub24odHlwZSwgc3ViKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9ldmVudGVtaXR0ZXIsIFwiZlwiKS5yZW1vdmVMaXN0ZW5lcih0eXBlLCBzdWIpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGFuIFJQQyByZXF1ZXN0ICB0aGUgd2FzbSBjbGllbnRcbiAgICAgKiBAcGFyYW0gbWV0aG9kICAgICAgIC0gVGhlIFJQQyBtZXRob2RzIHRvIGV4ZWN1dGVcbiAgICAgKiBAcGFyYW0gcGFyYW1zICAgICAgIC0gRW5jb2RlZCBwYXJhbWF0ZXJzIGFzIGFwcGxpY2FibGUgZm9yIHRoZSBtZXRob2RcbiAgICAgKiBAcGFyYW0gc3Vic2NyaXB0aW9uIC0gU3Vic2NyaXB0aW9uIGRldGFpbHMgKGludGVybmFsbHkgdXNlZCBieSBgc3Vic2NyaWJlYClcbiAgICAgKi9cbiAgICBhc3luYyBzZW5kKG1ldGhvZCwgXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBwYXJhbXMsIGlzQ2FjaGVhYmxlLCBzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGFzc2VydChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50LCBcImZcIiksIFwiQ2xpZW50IGlzIG5vdCBpbml0aWFsaXNlZFwiKTtcbiAgICAgICAgICAgIGFzc2VydChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2hhaW4sIFwiZlwiKSwgXCJDaGFpbiBpcyBub3QgaW5pdGlhbGlzZWRcIik7XG4gICAgICAgICAgICBjb25zdCBqc29uID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NvZGVyLCBcImZcIikuZW5jb2RlSnNvbihtZXRob2QsIHBhcmFtcyk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jb2RlciwgXCJmXCIpLmdldElkKCk7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gW1wiY2FsbGluZ1wiLCBtZXRob2QsIGpzb25dKTtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVycywgXCJmXCIpW2lkXSA9IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jaGFpbiwgXCJmXCIpLnNlbmRKc29uUnBjKGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogc3Vic2NyaWJlXG4gICAgICogQWxsb3dzIHN1YnNjcmliaW5nIHRvIGEgc3BlY2lmaWMgZXZlbnQuXG4gICAgICogQHBhcmFtICB0eXBlICAgICAtIFN1YnNjcmlwdGlvbiB0eXBlXG4gICAgICogQHBhcmFtICBtZXRob2QgICAtIFN1YnNjcmlwdGlvbiBtZXRob2RcbiAgICAgKiBAcGFyYW0gIHBhcmFtcyAgIC0gUGFyYW1ldGVycyBvZiB0eXBlIGFueVtdXG4gICAgICogQHBhcmFtICBjYWxsYmFjayAtIFByb3ZpZGVySW50ZXJmYWNlQ2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgKFByb21pc2VcXDxudW1iZXJ8c3RyaW5nXFw+KSByZXNvbHZpbmcgdG8gdGhlIGlkIG9mIHRoZSBzdWJzY3JpcHRpb24geW91IGNhbiB1c2Ugd2l0aCBbW3Vuc3Vic2NyaWJlXV0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIDxCUj5cbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiBjb25zdCBwcm92aWRlciA9IG5ldyBTbW9sZG90UHJvdmlkZXIoY2xpZW50KTtcbiAgICAgKiBjb25zdCBycGMgPSBuZXcgUnBjKHByb3ZpZGVyKTtcbiAgICAgKlxuICAgICAqIHJwYy5zdGF0ZS5zdWJzY3JpYmVTdG9yYWdlKFtbc3RvcmFnZS5iYWxhbmNlcy5mcmVlQmFsYW5jZSwgPEFkZHJlc3M+XV0sIChfLCB2YWx1ZXMpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKHZhbHVlcylcbiAgICAgKiB9KS50aGVuKChzdWJzY3JpcHRpb25JZCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ2JhbGFuY2UgY2hhbmdlcyBzdWJzY3JpcHRpb24gaWQ6ICcsIHN1YnNjcmlwdGlvbklkKVxuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICovXG4gICAgYXN5bmMgc3Vic2NyaWJlKFxuICAgIC8vIHRoZSBcIm1ldGhvZFwiIHByb3BlcnR5IG9mIHRoZSBKU09OIHJlc3BvbnNlIHRvIHRoaXMgc3Vic2NyaXB0aW9uXG4gICAgdHlwZSwgXG4gICAgLy8gdGhlIFwibWV0aG9kXCIgcHJvcGVydHkgb2YgdGhlIEpTT04gcmVxdWVzdCB0byByZWdpc3RlciB0aGUgc3Vic2NyaXB0aW9uXG4gICAgbWV0aG9kLCBcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmQobWV0aG9kLCBwYXJhbXMsIGZhbHNlLCB7IGNhbGxiYWNrLCB0eXBlIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdW5zdWJzY3JpYmluZyB0byBzdWJzY3JpcHRpb25zIG1hZGUgd2l0aCBbW3N1YnNjcmliZV1dLlxuICAgICAqL1xuICAgIGFzeW5jIHVuc3Vic2NyaWJlKHR5cGUsIG1ldGhvZCwgaWQpIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gYCR7dHlwZX06OiR7aWR9YDtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9zdWJzY3JpcHRpb25zLCBcImZcIilbc3Vic2NyaXB0aW9uXSkpIHtcbiAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gYFVuYWJsZSB0byBmaW5kIGFjdGl2ZSBzdWJzY3JpcHRpb249JHtzdWJzY3JpcHRpb259YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9zdWJzY3JpcHRpb25zLCBcImZcIilbc3Vic2NyaXB0aW9uXTtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnNlbmQobWV0aG9kLCBbaWRdKSk7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9ldmVudGVtaXR0ZXIsIFwiZlwiKS5lbWl0KHR5cGUsIC4uLmFyZ3MpO1xuICAgIH1cbn1cbl9TbW9sZG90UHJvdmlkZXJfY2hhaW5TcGVjID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9jb2RlciA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfZXZlbnRlbWl0dGVyID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVycyA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfc3Vic2NyaXB0aW9ucyA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfaXNDb25uZWN0ZWQgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfY2hhaW4gPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX3BhcmFjaGFpblNwZWNzID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9zbW9sZG90ID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVScGNSZXBvbnNlID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9vbk1lc3NhZ2VSZXN1bHQgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX29uTWVzc2FnZVN1YnNjcmliZSA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfc2ltdWxhdGVMaWZlY3ljbGUgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX2NoZWNrQ2xpZW50UGVlcmNvdW50ID0gbmV3IFdlYWtNYXAoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNtb2xkb3RQcm92aWRlci5qcy5tYXAiLCJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX0hlYWx0aENoZWNrRXJyb3JfY2F1c2U7XG5leHBvcnQgY2xhc3MgSGVhbHRoQ2hlY2tFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZXNwb25zZSwgbWVzc2FnZSA9IFwiR290IGVycm9yIHJlc3BvbnNlIGFza2luZyBmb3Igc3lzdGVtIGhlYWx0aFwiKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICBfSGVhbHRoQ2hlY2tFcnJvcl9jYXVzZS5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfSGVhbHRoQ2hlY2tFcnJvcl9jYXVzZSwgcmVzcG9uc2UsIFwiZlwiKTtcbiAgICAgICAgLy8gJ0Vycm9yJyBicmVha3MgdGhlIHByb3RvdHlwZSBjaGFpbiAtIHJlc3RvcmUgaXRcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldy50YXJnZXQucHJvdG90eXBlKTtcbiAgICB9XG4gICAgZ2V0Q2F1c2UoKSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9IZWFsdGhDaGVja0Vycm9yX2NhdXNlLCBcImZcIik7XG4gICAgfVxufVxuX0hlYWx0aENoZWNrRXJyb3JfY2F1c2UgPSBuZXcgV2Vha01hcCgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JzLmpzLm1hcCIsImNvbnN0IGlzVW5kZWZpbmVkID0gKHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn07XG5mdW5jdGlvbiBlcmFzZVJlY29yZChyZWNvcmQsIGNiKSB7XG4gICAgT2JqZWN0LmtleXMocmVjb3JkKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICBjYihyZWNvcmRba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHJlY29yZFtrZXldO1xuICAgIH0pO1xufVxuZXhwb3J0IHsgaXNVbmRlZmluZWQsIGVyYXNlUmVjb3JkIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=