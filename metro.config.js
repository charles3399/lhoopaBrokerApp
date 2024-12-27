const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        extraNodeModules: {
            _styles: path.resolve(__dirname, 'src/styles'),
        },
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
