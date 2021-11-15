(self["webpackChunk_substrate_multiple_network_demo"] = self["webpackChunk_substrate_multiple_network_demo"] || []).push([["packages_connect_dist_SmoldotProvider_SmoldotProvider_js"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZXNfY29ubmVjdF9kaXN0X1Ntb2xkb3RQcm92aWRlcl9TbW9sZG90UHJvdmlkZXJfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNLENBQUMsR0FBRyxzREFBTSxDQUFDLGtCQUFELENBQWhCO0FBMkJBLElBQU0sVUFBVSxHQUFnQztBQUM5QyxxQkFBbUIsRUFBRSxxQkFEeUI7QUFFOUMsK0JBQTZCLEVBQUUsK0JBRmU7QUFHOUMsaUNBQStCLEVBQUU7QUFIYSxDQUFoRDtBQU1BOzs7QUFHRzs7QUFDSCxJQUFNLGdDQUFnQyxHQUFHLElBQXpDO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQkc7O0FBQ0gsSUFBYSxlQUFiO0FBcUJFOzs7QUFHRztBQUNIO0FBQ0EsMkJBQW1CLFNBQW5CLEVBQXNDLFNBQXRDLEVBQTBELEVBQTFELEVBQWtFO0FBQUE7O0FBQUE7O0FBekJsRTs7QUFDQSxxQ0FBNEIsSUFBSSxrRUFBSixFQUE1Qjs7QUFDQSw0Q0FBdUMsSUFBSSwwQ0FBSixFQUF2Qzs7QUFDQSx3Q0FBdUQsRUFBdkQ7O0FBQ0EsNkNBQTZELEVBQTdEOztBQUNBLDRDQUEwRCxFQUExRDs7QUFDQTs7QUFDQSwyQ0FBZSxLQUFmOztBQUNBLHNDQUFzQyxTQUF0Qzs7QUFDQSxxQ0FBb0MsU0FBcEM7O0FBQ0EsOENBQXNDLFNBQXRDLENBQ0E7QUFDQTtBQUZBLE1BZWtFLENBZGxFO0FBQ0E7OztBQUNBO0FBRUE7O0FBRUc7OztBQUNILGdDQUF1QixnQ0FBdkI7O0FBaUNBLGdEQUFvQixVQUFDLEdBQUQsRUFBc0I7QUFDeEMsT0FBQyxDQUFDLEtBQUYsQ0FBUTtBQUFBLGVBQU0sQ0FBQyxVQUFELEVBQWEsR0FBYixDQUFOO0FBQUEsT0FBUjtBQUVBLFVBQU0sUUFBUSxH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REFBSSw2QkFBSixFQUFJLEdBQUosR0FBbUIsSUFBbkIsOEJBQXdCLElBQXhCLFNBQWlDLElBQWpDO0FBQ0Q7QUF4V0g7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRkEsSUFBYSxnQkFBYjtBQUFBOztBQUFBOztBQU9FLDRCQUNFLFFBREYsRUFFeUQ7QUFBQTs7QUFBQSxRQUF2RCxPQUF1RCx1RUFBN0MsNkNBQTZDOztBQUFBOztBQUV2RCw4QkFBTSxPQUFOOztBQVZGOztBQVdFLDBEQUFJLHVCQUFKLEVBQWMsUUFBZCxFQUFzQixHQUF0QixFQUh1RCxDQUl2RDs7O0FBQ0EsVUFBTSxDQUFDLGNBQVAsZ0NBQTRCLCtEQUFXLFNBQXZDO0FBTHVEO0FBTXhEOztBQWZIO0FBQUE7QUFBQSxXQUdFLG9CQUFRO0FBQ04sYUFBTyw2QkFBSSx1QkFBSixFQUFJLEdBQUosQ0FBUDtBQUNEO0FBTEg7O0FBQUE7QUFBQSxpQ0FBc0MsS0FBdEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxXQUFXLEdBQUcsU0FBZCxXQUFjLENBQUMsS0FBRCxFQUF3QztBQUMxRCxTQUFPLE9BQU8sS0FBUCxLQUFpQixXQUF4QjtBQUNELENBRkQ7O0FBSUEsU0FBUyxXQUFULENBQ0UsTUFERixFQUVFLEVBRkYsRUFFd0I7QUFFdEIsUUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFaLEVBQW9CLE9BQXBCLENBQTRCLFVBQUMsR0FBRCxFQUFjO0FBQ3hDLFFBQUksRUFBSixFQUFRO0FBQ04sUUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFELENBQVAsQ0FBRjtBQUNEOztBQUVELFdBQU8sTUFBTSxDQUFDLEdBQUQsQ0FBYjtBQUNELEdBTkQ7QUFPRCIsInNvdXJjZXMiOlsid2VicGFjazovL0BzdWJzdHJhdGUvbXVsdGlwbGUtbmV0d29yay1kZW1vL2lnbm9yZWR8L2hvbWUvd2lyZWRua29kL0RvY3VtZW50cy9yZXBvcy9wYXJpdHkvc3Vic3RyYXRlLWNvbm5lY3Qvbm9kZV9tb2R1bGVzL2JuLmpzL2xpYnxidWZmZXIiLCJ3ZWJwYWNrOi8vQHN1YnN0cmF0ZS9tdWx0aXBsZS1uZXR3b3JrLWRlbW8vLi4vLi4vc3JjL1Ntb2xkb3RQcm92aWRlci9TbW9sZG90UHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vQHN1YnN0cmF0ZS9tdWx0aXBsZS1uZXR3b3JrLWRlbW8vLi4vc3JjL2Vycm9ycy50cyIsIndlYnBhY2s6Ly9Ac3Vic3RyYXRlL211bHRpcGxlLW5ldHdvcmstZGVtby8uLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogKGlnbm9yZWQpICovIiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRTZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufTtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9TbW9sZG90UHJvdmlkZXJfY2hhaW5TcGVjLCBfU21vbGRvdFByb3ZpZGVyX2NvZGVyLCBfU21vbGRvdFByb3ZpZGVyX2V2ZW50ZW1pdHRlciwgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVycywgX1Ntb2xkb3RQcm92aWRlcl9zdWJzY3JpcHRpb25zLCBfU21vbGRvdFByb3ZpZGVyX3dhaXRpbmdGb3JJZCwgX1Ntb2xkb3RQcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCwgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgX1Ntb2xkb3RQcm92aWRlcl9jbGllbnQsIF9TbW9sZG90UHJvdmlkZXJfY2hhaW4sIF9TbW9sZG90UHJvdmlkZXJfcGFyYWNoYWluU3BlY3MsIF9TbW9sZG90UHJvdmlkZXJfc21vbGRvdCwgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVScGNSZXBvbnNlLCBfU21vbGRvdFByb3ZpZGVyX29uTWVzc2FnZVJlc3VsdCwgX1Ntb2xkb3RQcm92aWRlcl9vbk1lc3NhZ2VTdWJzY3JpYmUsIF9TbW9sZG90UHJvdmlkZXJfc2ltdWxhdGVMaWZlY3ljbGUsIF9TbW9sZG90UHJvdmlkZXJfY2hlY2tDbGllbnRQZWVyY291bnQ7XG5pbXBvcnQgeyBScGNDb2RlciB9IGZyb20gXCJAcG9sa2Fkb3QvcnBjLXByb3ZpZGVyL2NvZGVyXCI7XG5pbXBvcnQgeyBhc3NlcnQsIGxvZ2dlciB9IGZyb20gXCJAcG9sa2Fkb3QvdXRpbFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRlbWl0dGVyM1wiO1xuaW1wb3J0ICogYXMgc21vbGRvdCBmcm9tIFwiQHN1YnN0cmF0ZS9zbW9sZG90LWxpZ2h0XCI7XG5pbXBvcnQgeyBIZWFsdGhDaGVja0Vycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy5qc1wiO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcbmNvbnN0IGwgPSBsb2dnZXIoXCJzbW9sZG90LXByb3ZpZGVyXCIpO1xuY29uc3QgQU5HTElDSVNNUyA9IHtcbiAgICBjaGFpbl9maW5hbGlzZWRIZWFkOiBcImNoYWluX2ZpbmFsaXplZEhlYWRcIixcbiAgICBjaGFpbl9zdWJzY3JpYmVGaW5hbGlzZWRIZWFkczogXCJjaGFpbl9zdWJzY3JpYmVGaW5hbGl6ZWRIZWFkc1wiLFxuICAgIGNoYWluX3Vuc3Vic2NyaWJlRmluYWxpc2VkSGVhZHM6IFwiY2hhaW5fdW5zdWJzY3JpYmVGaW5hbGl6ZWRIZWFkc1wiLFxufTtcbi8qXG4gKiBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmV0d2VlbiBjaGVja3MgdG8gc2VlIGlmIHdlIGhhdmUgYW55XG4gKiBjb25uZWN0ZWQgcGVlcnMgaW4gdGhlIHNtb2xkb3QgY2xpZW50XG4gKi9cbmNvbnN0IENPTk5FQ1RJT05fU1RBVEVfUElOR0VSX0lOVEVSVkFMID0gMjAwMDtcbi8qKlxuICogU21vbGRvdFByb3ZpZGVyXG4gKlxuICogVGhlIFNtb2xkb3RQcm92aWRlciBhbGxvd3MgaW50ZXJhY3Rpbmcgd2l0aCBhIHNtb2xkb3QtYmFzZWRcbiAqIFdBU00gbGlnaHQgY2xpZW50LiAgSS5lLiB3aXRob3V0IGRvaW5nIFJQQyB0byBhIHJlbW90ZSBub2RlIG92ZXIgSFRUUFxuICogb3Igd2Vic29ja2V0c1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBpbXBvcnQgcmVhZEZpbGVTeW5jIGZyb20gJ2ZzJztcbiAqIGltcG9ydCBBcGkgZnJvbSAnQHBvbGthZG90L2FwaS9wcm9taXNlJztcbiAqIGltcG9ydCB7IFNtb2xkb3RQcm92aWRlciB9IGZyb20gJy4uLyc7XG4gKlxuICogY29uc3QgY2hhaW5TcGVjID0gcmVhZEZpbGVTeW5jKCcuL3BhdGgvdG8vY2hhaW5TcGVjLmpzb24nKTtcbiAqIGNvbnN0IHByb3ZpZGVyID0gbmV3IFNtb2xkb3RQcm92aWRlcihjaGFpblNwZWMpO1xuICogY29uc3QgYXBpID0gbmV3IEFwaShwcm92aWRlcik7XG4gKiBgYGBcbiAqIEBleGFtcGxlXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBpbXBvcnQgcmVhZEZpbGVTeW5jIGZyb20gJ2ZzJztcbiAqIGltcG9ydCBBcGkgZnJvbSAnQHBvbGthZG90L2FwaS9wcm9taXNlJztcbiAqIGltcG9ydCB7IFNtb2xkb3RQcm92aWRlciB9IGZyb20gJy4uLyc7XG4gKlxuICogY29uc3QgY2hhaW5TcGVjID0gcmVhZEZpbGVTeW5jKCcuL3BhdGgvdG8vcG9sa2Fkb3QuanNvbicpO1xuICogY29uc3QgcHAgPSBuZXcgU21vbGRvdFByb3ZpZGVyKGNoYWluU3BlYyk7XG4gKiBjb25zdCBwb2xrYWRvdEFwaSA9IG5ldyBBcGkocHApO1xuICpcbiAqIGNvbnN0IGNoYWluU3BlYyA9IHJlYWRGaWxlU3luYygnLi9wYXRoL3RvL2t1c2FtYS5qc29uJyk7XG4gKiBjb25zdCBrcCA9IG5ldyBTbW9sZG90UHJvdmlkZXIoY2hhaW5TcGVjKTtcbiAqIGNvbnN0IGt1c2FtYUFwaSA9IG5ldyBBcGkocHApO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBTbW9sZG90UHJvdmlkZXIge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBjaGFpblNwZWMgLSBUaGUgY2hhaW5TcGVjIGZvciB0aGUgV0FTTSBjbGllbnRcbiAgICAgKiBAcGFyYW0gc20gLSAob25seSB1c2VkIGZvciB0ZXN0aW5nKSBkZWZhdWx0cyB0byB0aGUgYWN0dWFsIHNtb2xkb3QgbW9kdWxlXG4gICAgICovXG4gICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSxAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gICAgY29uc3RydWN0b3IoY2hhaW5TcGVjLCBwYXJhY2hhaW4sIHNtKSB7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfY2hhaW5TcGVjLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX2NvZGVyLnNldCh0aGlzLCBuZXcgUnBjQ29kZXIoKSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfZXZlbnRlbWl0dGVyLnNldCh0aGlzLCBuZXcgRXZlbnRFbWl0dGVyKCkpO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZXJzLnNldCh0aGlzLCB7fSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfc3Vic2NyaXB0aW9ucy5zZXQodGhpcywge30pO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX3dhaXRpbmdGb3JJZC5zZXQodGhpcywge30pO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLnNldCh0aGlzLCBmYWxzZSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50LnNldCh0aGlzLCB1bmRlZmluZWQpO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX2NoYWluLnNldCh0aGlzLCB1bmRlZmluZWQpO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLnNldCh0aGlzLCB1bmRlZmluZWRcbiAgICAgICAgLy8gcmVmZXJlbmNlIHRvIHRoZSBzbW9sZG90IG1vZHVsZSBzbyB3ZSBjYW4gZGVmZXIgbG9hZGluZyB0aGUgd2FzbSBjbGllbnRcbiAgICAgICAgLy8gdW50aWwgY29ubmVjdCBpcyBjYWxsZWRcbiAgICAgICAgKTtcbiAgICAgICAgLy8gcmVmZXJlbmNlIHRvIHRoZSBzbW9sZG90IG1vZHVsZSBzbyB3ZSBjYW4gZGVmZXIgbG9hZGluZyB0aGUgd2FzbSBjbGllbnRcbiAgICAgICAgLy8gdW50aWwgY29ubmVjdCBpcyBjYWxsZWRcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9zbW9sZG90LnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICAvKlxuICAgICAgICAgKiBIb3cgZnJlcXVlbnRseSB0byBzZWUgaWYgd2UgaGF2ZSBhbnkgcGVlcnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGVhbHRoUGluZ2VySW50ZXJ2YWwgPSBDT05ORUNUSU9OX1NUQVRFX1BJTkdFUl9JTlRFUlZBTDtcbiAgICAgICAgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVScGNSZXBvbnNlLnNldCh0aGlzLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBsLmRlYnVnKCgpID0+IFtcInJlY2VpdmVkXCIsIHJlc10pO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gaXNVbmRlZmluZWQocmVzcG9uc2UubWV0aG9kKVxuICAgICAgICAgICAgICAgID8gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX29uTWVzc2FnZVJlc3VsdCwgXCJmXCIpLmNhbGwodGhpcywgcmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgOiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlU3Vic2NyaWJlLCBcImZcIikuY2FsbCh0aGlzLCByZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX29uTWVzc2FnZVJlc3VsdC5zZXQodGhpcywgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2hhbmRsZXJzLCBcImZcIilbcmVzcG9uc2UuaWRdO1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlciBmb3IgaWQ9JHtyZXNwb25zZS5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbWV0aG9kLCBzdWJzY3JpcHRpb24gfSA9IGhhbmRsZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NvZGVyLCBcImZcIikuZGVjb2RlUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGZpcnN0IHNlbmQgdGhlIHJlc3VsdCAtIGluIGNhc2Ugb2Ygc3Vicywgd2UgbWF5IGhhdmUgYW4gdXBkYXRlXG4gICAgICAgICAgICAgICAgLy8gaW1tZWRpYXRlbHkgaWYgd2UgaGF2ZSBzb21lIHF1ZXVlZCByZXN1bHRzIGFscmVhZHlcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJJZCA9IGAke3N1YnNjcmlwdGlvbi50eXBlfTo6JHtyZXN1bHR9YDtcbiAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3N1YnNjcmlwdGlvbnMsIFwiZlwiKVtzdWJJZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdWJzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgYSByZXN1bHQgd2FpdGluZyBmb3IgdGhpcyBzdWJzY3JpcHRpb24gYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICBpZiAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3dhaXRpbmdGb3JJZCwgXCJmXCIpW3N1YklkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX29uTWVzc2FnZVN1YnNjcmliZSwgXCJmXCIpLmNhbGwodGhpcywgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3dhaXRpbmdGb3JJZCwgXCJmXCIpW3N1YklkXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKGVycm9yLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVycywgXCJmXCIpW3Jlc3BvbnNlLmlkXTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfb25NZXNzYWdlU3Vic2NyaWJlLnNldCh0aGlzLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IEFOR0xJQ0lTTVNbcmVzcG9uc2UubWV0aG9kXSB8fCByZXNwb25zZS5tZXRob2QgfHwgXCJpbnZhbGlkXCI7XG4gICAgICAgICAgICBjb25zdCBzdWJJZCA9IGAke21ldGhvZH06OiR7cmVzcG9uc2UucGFyYW1zLnN1YnNjcmlwdGlvbn1gO1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9zdWJzY3JpcHRpb25zLCBcImZcIilbc3ViSWRdO1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgLy8gc3RvcmUgdGhlIHJlc3BvbnNlLCB3ZSBjb3VsZCBoYXZlIG91dC1vZi1vcmRlciBzdWJpZCBjb21pbmcgaW5cbiAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBcImZcIilbc3ViSWRdID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZygoKSA9PiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlciBmb3Igc3Vic2NyaXB0aW9uPSR7c3ViSWR9IHJlc3BvbnNlSWQ9JHtyZXNwb25zZS5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBob3VzZWtlZXBpbmdcbiAgICAgICAgICAgIGRlbGV0ZSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkLCBcImZcIilbc3ViSWRdO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY29kZXIsIFwiZlwiKS5kZWNvZGVSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsYmFjayhudWxsLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsYmFjayhlcnJvciwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIF9TbW9sZG90UHJvdmlkZXJfc2ltdWxhdGVMaWZlY3ljbGUuc2V0KHRoaXMsIChoZWFsdGgpID0+IHtcbiAgICAgICAgICAgIC8vIGRldmVsb3BtZW50IGNoYWlucyBzaG91bGQgbm90IGhhdmUgcGVlcnMgc28gd2Ugb25seSBlbWl0IGNvbm5lY3RlZFxuICAgICAgICAgICAgLy8gb25jZSBhbmQgbmV2ZXIgZGlzY29ubmVjdFxuICAgICAgICAgICAgaWYgKGhlYWx0aC5zaG91bGRIYXZlUGVlcnMgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgdHJ1ZSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIGwuZGVidWcoYGVtaXR0ZWQgQ09OTkVDVEVEYCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGVlckNvdW50ID0gaGVhbHRoLnBlZXJzO1xuICAgICAgICAgICAgY29uc3QgcGVlckNoZWNrcyA9IChwZWVyQ291bnQgPiAwIHx8ICFoZWFsdGguc2hvdWxkSGF2ZVBlZXJzKSAmJiAhaGVhbHRoLmlzU3luY2luZztcbiAgICAgICAgICAgIGwuZGVidWcoYFNpbXVsYXRpbmcgbGlmZWN5bGNlIGV2ZW50cyBmcm9tIHN5c3RlbV9oZWFsdGhgKTtcbiAgICAgICAgICAgIGwuZGVidWcoYGlzQ29ubmVjdGVkOiAke19fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpLnRvU3RyaW5nKCl9LCBuZXcgcGVlckNvdW50OiAke3BlZXJDb3VudH1gKTtcbiAgICAgICAgICAgIGlmIChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfaXNDb25uZWN0ZWQsIFwiZlwiKSAmJiBwZWVyQ2hlY2tzKSB7XG4gICAgICAgICAgICAgICAgLy8gc3RpbGwgY29ubmVjdGVkXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpICYmIHBlZXJDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgZmFsc2UsIFwiZlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJkaXNjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZyhgZW1pdHRlZCBESVNDT05ORUNURURgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpICYmIHBlZXJDaGVja3MpIHtcbiAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfaXNDb25uZWN0ZWQsIHRydWUsIFwiZlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgbC5kZWJ1ZyhgZW1pdHRlZCBDT05ORUNURURgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzdGlsbCBub3QgY29ubmVjdGVkXG4gICAgICAgIH0pO1xuICAgICAgICBfU21vbGRvdFByb3ZpZGVyX2NoZWNrQ2xpZW50UGVlcmNvdW50LnNldCh0aGlzLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmQoXCJzeXN0ZW1faGVhbHRoXCIsIFtdKVxuICAgICAgICAgICAgICAgIC50aGVuKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9zaW11bGF0ZUxpZmVjeWNsZSwgXCJmXCIpKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHRoaXMuZW1pdChcImVycm9yXCIsIG5ldyBIZWFsdGhDaGVja0Vycm9yKGVycm9yKSkpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcIkNvbm5lY3RcIiB0aGUgV0FTTSBjbGllbnQgLSBzdGFydHMgdGhlIHNtb2xkb3QgV0FTTSBjbGllbnRcbiAgICAgICAgICovXG4gICAgICAgICk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcIkNvbm5lY3RcIiB0aGUgV0FTTSBjbGllbnQgLSBzdGFydHMgdGhlIHNtb2xkb3QgV0FTTSBjbGllbnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29ubmVjdCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydCghX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgXCJmXCIpICYmICFfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfaXNDb25uZWN0ZWQsIFwiZlwiKSwgXCJDbGllbnQgaXMgYWxyZWFkeSBjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jbGllbnQsIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9zbW9sZG90LCBcImZcIikuc3RhcnQoe1xuICAgICAgICAgICAgICAgICAgICBmb3JiaWRXczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWF4TG9nTGV2ZWw6IDMgLyogbm8gZGVidWcvdHJhY2UgbWVzc2FnZXMgKi8sXG4gICAgICAgICAgICAgICAgfSksIFwiZlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBcImZcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsYXkgPSBhd2FpdCBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50LCBcImZcIikuYWRkQ2hhaW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhaW5TcGVjOiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2hhaW5TcGVjLCBcImZcIiksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2hhaW4sIGF3YWl0IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jbGllbnQsIFwiZlwiKS5hZGRDaGFpbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFpblNwZWM6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9wYXJhY2hhaW5TcGVjcywgXCJmXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAganNvblJwY0NhbGxiYWNrOiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfaGFuZGxlUnBjUmVwb25zZSwgXCJmXCIpLmNhbGwodGhpcywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvdGVudGlhbFJlbGF5Q2hhaW5zOiBbcmVsYXldLFxuICAgICAgICAgICAgICAgICAgICB9KSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NoYWluLCBhd2FpdCBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2xpZW50LCBcImZcIikuYWRkQ2hhaW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhaW5TcGVjOiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2hhaW5TcGVjLCBcImZcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBqc29uUnBjQ2FsbGJhY2s6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVScGNSZXBvbnNlLCBcImZcIikuY2FsbCh0aGlzLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KSwgXCJmXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQsIHNldEludGVydmFsKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jaGVja0NsaWVudFBlZXJjb3VudCwgXCJmXCIpLCB0aGlzLmhlYWx0aFBpbmdlckludGVydmFsKSwgXCJmXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2hhaW5TcGVjLCBjaGFpblNwZWMsIFwiZlwiKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudFxuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfc21vbGRvdCwgc20gfHwgc21vbGRvdCwgXCJmXCIpO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQsIG51bGwsIFwiZlwiKTtcbiAgICAgICAgaWYgKHBhcmFjaGFpbikge1xuICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX3BhcmFjaGFpblNwZWNzLCBwYXJhY2hhaW4sIFwiZlwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMZXRzIHBvbGthZG90LWpzIGtub3cgd2Ugc3VwcG9ydCBzdWJzY3JpcHRpb25zXG4gICAgICogQHJldHVybnMgYHRydWVgXG4gICAgICovXG4gICAgZ2V0IGhhc1N1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhlIG9iamVjdFxuICAgICAqIEB0aHJvd3MgdGhyb3dzIGFuIGVycm9yIGFzIHRoaXMgaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2xvbmUoKSBpcyBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWFudWFsbHkgXCJkaXNjb25uZWN0XCIgLSBkcm9wcyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBXQVNNIGNsaWVudFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvcmVxdWlyZS1hd2FpdFxuICAgIGFzeW5jIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgXCJmXCIpKSB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtY2FsbFxuICAgICAgICAgICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jbGllbnQsIFwiZlwiKS50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmIChfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY29ubmVjdGlvblN0YXRlUGluZ2VySWQsIFwiZlwiKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2Nvbm5lY3Rpb25TdGF0ZVBpbmdlcklkLCBcImZcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2lzQ29ubmVjdGVkLCBmYWxzZSwgXCJmXCIpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZGlzY29ubmVjdGVkXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIG5vZGUgaXMgY29ubmVjdGVkIG9yIG5vdC5cbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIGNvbm5lY3RlZFxuICAgICAqL1xuICAgIGdldCBpc0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9pc0Nvbm5lY3RlZCwgXCJmXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gcHJvdmlkZXIgZXZlbnRzIC0gaW4gcHJhY3RpY2UgdGhlIHNtb2xkb3QgcHJvdmlkZXIgb25seVxuICAgICAqIGVtaXRzIGEgYGNvbm5lY3RlZGAgZXZlbnQgYWZ0ZXIgc3VjY2Vzc2Z1bGx5IHN0YXJ0aW5nIHRoZSBzbW9sZG90IGNsaWVudFxuICAgICAqIGFuZCBgZGlzY29ubmVjdGVkYCBhZnRlciBgZGlzY29ubmVjdGAgaXMgY2FsbGVkLlxuICAgICAqIEBwYXJhbSB0eXBlIC0gRXZlbnRcbiAgICAgKiBAcGFyYW0gc3ViICAtIENhbGxiYWNrXG4gICAgICovXG4gICAgb24odHlwZSwgc3ViKSB7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9ldmVudGVtaXR0ZXIsIFwiZlwiKS5vbih0eXBlLCBzdWIpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2V2ZW50ZW1pdHRlciwgXCJmXCIpLnJlbW92ZUxpc3RlbmVyKHR5cGUsIHN1Yik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgYW4gUlBDIHJlcXVlc3QgIHRoZSB3YXNtIGNsaWVudFxuICAgICAqIEBwYXJhbSBtZXRob2QgICAgICAgLSBUaGUgUlBDIG1ldGhvZHMgdG8gZXhlY3V0ZVxuICAgICAqIEBwYXJhbSBwYXJhbXMgICAgICAgLSBFbmNvZGVkIHBhcmFtYXRlcnMgYXMgYXBwbGljYWJsZSBmb3IgdGhlIG1ldGhvZFxuICAgICAqIEBwYXJhbSBzdWJzY3JpcHRpb24gLSBTdWJzY3JpcHRpb24gZGV0YWlscyAoaW50ZXJuYWxseSB1c2VkIGJ5IGBzdWJzY3JpYmVgKVxuICAgICAqL1xuICAgIGFzeW5jIHNlbmQobWV0aG9kLCBcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHBhcmFtcywgc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCwgXCJmXCIpLCBcIkNsaWVudCBpcyBub3QgaW5pdGlhbGlzZWRcIik7XG4gICAgICAgICAgICBhc3NlcnQoX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfU21vbGRvdFByb3ZpZGVyX2NoYWluLCBcImZcIiksIFwiQ2hhaW4gaXMgbm90IGluaXRpYWxpc2VkXCIpO1xuICAgICAgICAgICAgY29uc3QganNvbiA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9jb2RlciwgXCJmXCIpLmVuY29kZUpzb24obWV0aG9kLCBwYXJhbXMpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY29kZXIsIFwiZlwiKS5nZXRJZCgpO1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoZXJyb3IsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsLmRlYnVnKCgpID0+IFtcImNhbGxpbmdcIiwgbWV0aG9kLCBqc29uXSk7XG4gICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfaGFuZGxlcnMsIFwiZlwiKVtpZF0gPSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9TbW9sZG90UHJvdmlkZXJfY2hhaW4sIFwiZlwiKS5zZW5kSnNvblJwYyhqc29uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHN1YnNjcmliZVxuICAgICAqIEFsbG93cyBzdWJzY3JpYmluZyB0byBhIHNwZWNpZmljIGV2ZW50LlxuICAgICAqIEBwYXJhbSAgdHlwZSAgICAgLSBTdWJzY3JpcHRpb24gdHlwZVxuICAgICAqIEBwYXJhbSAgbWV0aG9kICAgLSBTdWJzY3JpcHRpb24gbWV0aG9kXG4gICAgICogQHBhcmFtICBwYXJhbXMgICAtIFBhcmFtZXRlcnMgb2YgdHlwZSBhbnlbXVxuICAgICAqIEBwYXJhbSAgY2FsbGJhY2sgLSBQcm92aWRlckludGVyZmFjZUNhbGxiYWNrXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIChQcm9taXNlXFw8bnVtYmVyfHN0cmluZ1xcPikgcmVzb2x2aW5nIHRvIHRoZSBpZCBvZiB0aGUgc3Vic2NyaXB0aW9uIHlvdSBjYW4gdXNlIHdpdGggW1t1bnN1YnNjcmliZV1dLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiA8QlI+XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogY29uc3QgcHJvdmlkZXIgPSBuZXcgU21vbGRvdFByb3ZpZGVyKGNsaWVudCk7XG4gICAgICogY29uc3QgcnBjID0gbmV3IFJwYyhwcm92aWRlcik7XG4gICAgICpcbiAgICAgKiBycGMuc3RhdGUuc3Vic2NyaWJlU3RvcmFnZShbW3N0b3JhZ2UuYmFsYW5jZXMuZnJlZUJhbGFuY2UsIDxBZGRyZXNzPl1dLCAoXywgdmFsdWVzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyh2YWx1ZXMpXG4gICAgICogfSkudGhlbigoc3Vic2NyaXB0aW9uSWQpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdiYWxhbmNlIGNoYW5nZXMgc3Vic2NyaXB0aW9uIGlkOiAnLCBzdWJzY3JpcHRpb25JZClcbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGFzeW5jIHN1YnNjcmliZShcbiAgICAvLyB0aGUgXCJtZXRob2RcIiBwcm9wZXJ0eSBvZiB0aGUgSlNPTiByZXNwb25zZSB0byB0aGlzIHN1YnNjcmlwdGlvblxuICAgIHR5cGUsIFxuICAgIC8vIHRoZSBcIm1ldGhvZFwiIHByb3BlcnR5IG9mIHRoZSBKU09OIHJlcXVlc3QgdG8gcmVnaXN0ZXIgdGhlIHN1YnNjcmlwdGlvblxuICAgIG1ldGhvZCwgXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLXJldHVyblxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kKG1ldGhvZCwgcGFyYW1zLCB7IGNhbGxiYWNrLCB0eXBlIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdW5zdWJzY3JpYmluZyB0byBzdWJzY3JpcHRpb25zIG1hZGUgd2l0aCBbW3N1YnNjcmliZV1dLlxuICAgICAqL1xuICAgIGFzeW5jIHVuc3Vic2NyaWJlKHR5cGUsIG1ldGhvZCwgaWQpIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gYCR7dHlwZX06OiR7aWR9YDtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9zdWJzY3JpcHRpb25zLCBcImZcIilbc3Vic2NyaXB0aW9uXSkpIHtcbiAgICAgICAgICAgIGwuZGVidWcoKCkgPT4gYFVuYWJsZSB0byBmaW5kIGFjdGl2ZSBzdWJzY3JpcHRpb249JHtzdWJzY3JpcHRpb259YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9zdWJzY3JpcHRpb25zLCBcImZcIilbc3Vic2NyaXB0aW9uXTtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnNlbmQobWV0aG9kLCBbaWRdKSk7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX1Ntb2xkb3RQcm92aWRlcl9ldmVudGVtaXR0ZXIsIFwiZlwiKS5lbWl0KHR5cGUsIC4uLmFyZ3MpO1xuICAgIH1cbn1cbl9TbW9sZG90UHJvdmlkZXJfY2hhaW5TcGVjID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9jb2RlciA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfZXZlbnRlbWl0dGVyID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVycyA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfc3Vic2NyaXB0aW9ucyA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfd2FpdGluZ0ZvcklkID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9jb25uZWN0aW9uU3RhdGVQaW5nZXJJZCA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfaXNDb25uZWN0ZWQgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX2NsaWVudCA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfY2hhaW4gPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX3BhcmFjaGFpblNwZWNzID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9zbW9sZG90ID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9oYW5kbGVScGNSZXBvbnNlID0gbmV3IFdlYWtNYXAoKSwgX1Ntb2xkb3RQcm92aWRlcl9vbk1lc3NhZ2VSZXN1bHQgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX29uTWVzc2FnZVN1YnNjcmliZSA9IG5ldyBXZWFrTWFwKCksIF9TbW9sZG90UHJvdmlkZXJfc2ltdWxhdGVMaWZlY3ljbGUgPSBuZXcgV2Vha01hcCgpLCBfU21vbGRvdFByb3ZpZGVyX2NoZWNrQ2xpZW50UGVlcmNvdW50ID0gbmV3IFdlYWtNYXAoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNtb2xkb3RQcm92aWRlci5qcy5tYXAiLCJ2YXIgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZFNldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59O1xudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX0hlYWx0aENoZWNrRXJyb3JfY2F1c2U7XG5leHBvcnQgY2xhc3MgSGVhbHRoQ2hlY2tFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZXNwb25zZSwgbWVzc2FnZSA9IFwiR290IGVycm9yIHJlc3BvbnNlIGFza2luZyBmb3Igc3lzdGVtIGhlYWx0aFwiKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICBfSGVhbHRoQ2hlY2tFcnJvcl9jYXVzZS5zZXQodGhpcywgdm9pZCAwKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCh0aGlzLCBfSGVhbHRoQ2hlY2tFcnJvcl9jYXVzZSwgcmVzcG9uc2UsIFwiZlwiKTtcbiAgICAgICAgLy8gJ0Vycm9yJyBicmVha3MgdGhlIHByb3RvdHlwZSBjaGFpbiAtIHJlc3RvcmUgaXRcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldy50YXJnZXQucHJvdG90eXBlKTtcbiAgICB9XG4gICAgZ2V0Q2F1c2UoKSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9IZWFsdGhDaGVja0Vycm9yX2NhdXNlLCBcImZcIik7XG4gICAgfVxufVxuX0hlYWx0aENoZWNrRXJyb3JfY2F1c2UgPSBuZXcgV2Vha01hcCgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JzLmpzLm1hcCIsImNvbnN0IGlzVW5kZWZpbmVkID0gKHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn07XG5mdW5jdGlvbiBlcmFzZVJlY29yZChyZWNvcmQsIGNiKSB7XG4gICAgT2JqZWN0LmtleXMocmVjb3JkKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICBjYihyZWNvcmRba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHJlY29yZFtrZXldO1xuICAgIH0pO1xufVxuZXhwb3J0IHsgaXNVbmRlZmluZWQsIGVyYXNlUmVjb3JkIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=