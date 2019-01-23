"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_firebase_1 = __importDefault(require("react-native-firebase"));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    App.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    App.prototype.render = function () {
        return (react_1.default.createElement(react_native_1.ScrollView, null,
            react_1.default.createElement(react_native_1.View, { style: styles.container },
                react_1.default.createElement(react_native_1.Image, { source: require('./assets/ReactNativeFirebase.png'), style: [styles.logo] }),
                react_1.default.createElement(react_native_1.Text, { style: styles.welcome },
                    "Welcome to ",
                    '\n',
                    " React Native Firebase"),
                react_1.default.createElement(react_native_1.Text, { style: styles.instructions }, "To get started, edit App.js"),
                react_native_1.Platform.OS === 'ios' ? (react_1.default.createElement(react_native_1.Text, { style: styles.instructions },
                    "Press Cmd+R to reload,",
                    '\n',
                    "Cmd+D or shake for dev menu")) : (react_1.default.createElement(react_native_1.Text, { style: styles.instructions },
                    "Double tap R on your keyboard to reload,",
                    '\n',
                    "Cmd+M or shake for dev menu")),
                react_1.default.createElement(react_native_1.View, { style: styles.modules },
                    react_1.default.createElement(react_native_1.Text, { style: styles.modulesHeader }, "The following Firebase modules are pre-installed:"),
                    //@ts-ignore
                    react_native_firebase_1.default.admob.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "admob()"),
                    react_native_firebase_1.default.analytics.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "analytics()"),
                    react_native_firebase_1.default.auth.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "auth()"),
                    react_native_firebase_1.default.config.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "config()"),
                    react_native_firebase_1.default.crashlytics.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "crashlytics()"),
                    react_native_firebase_1.default.database.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "database()"),
                    react_native_firebase_1.default.firestore.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "firestore()"),
                    react_native_firebase_1.default.functions.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "functions()"),
                    react_native_firebase_1.default.iid.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "iid()"),
                    //@ts-ignore
                    react_native_firebase_1.default.invites.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "invites()"),
                    react_native_firebase_1.default.links.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "links()"),
                    react_native_firebase_1.default.messaging.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "messaging()"),
                    react_native_firebase_1.default.notifications.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "notifications()"),
                    react_native_firebase_1.default.perf.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "perf()"),
                    react_native_firebase_1.default.storage.nativeModuleExists && react_1.default.createElement(react_native_1.Text, { style: styles.module }, "storage()")))));
    };
    return App;
}(react_1.Component));
exports.default = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        height: 120,
        marginBottom: 16,
        marginTop: 64,
        padding: 10,
        width: 135,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    modules: {
        margin: 20,
    },
    modulesHeader: {
        fontSize: 16,
        marginBottom: 8,
    },
    module: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
    }
});
