module.exports = {
    //...
    module: {
      rules: [
        //...
        {
          test: /zcv\.wasm$/,
          type: "javascript/auto",
          loader: "file-loader",
        }
        //...
      ]
    }
  };
  