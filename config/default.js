

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.PORT, 10);
  /* istanbul ignore next */
  return (x !== null && !isNaN(x)) ? x : defaultListenPort;
};

module.exports = {
  "plugins": {
    "inert": {
      "enable": true
    },
    "electrodeStaticPaths": {
      "enable": true,
      "options": {
        "pathPrefix": "dist"
      }
    },
    "server/plugins/pwa": {
      "module": "./{{env.APP_SRC_DIR}}/server/plugins/pwa"
    },
    "webapp": {
      "module": "electrode-react-webapp/lib/express",
      "options": {
        "pageTitle": "Node-React-Sample",
        "paths": {
          "*": {
            "content": {
              "module": "./{{env.APP_SRC_DIR}}/server/views/index-view"
            }
          }
        }
      }
    },
      "node": {
          "console": "empty",
          "fs": "empty",
          "net": "empty",
          "tls": "empty"
      }
  },
  "connections": {
    "default": {
      "host": process.env.HOST,
      "address": process.env.HOST_IP || "0.0.0.0",
      "port": portFromEnv(),
      "routes": {
        "cors": false
      },
      "state": {
        "ignoreErrors": true
      }
    }
  }
};
