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
            _assets: path.resolve(__dirname, 'src/assets'),
            _components: path.resolve(__dirname, 'src/components'),
            _atoms: path.resolve(__dirname, 'src/components/atoms'),
            _molecules: path.resolve(__dirname, 'src/components/molecules'),
            _organisms: path.resolve(__dirname, 'src/components/organisms'),
            _navigations: path.resolve(__dirname, 'src/navigations'),
            _screens: path.resolve(__dirname, 'src/screens'),
            _styles: path.resolve(__dirname, 'src/styles'),
            _utils: path.resolve(__dirname, 'src/utils'),
            _services: path.resolve(__dirname, 'src/store/services'),
            _actions: path.resolve(__dirname, 'src/store/actions'),
            _reducers: path.resolve(__dirname, 'src/store/reducers'),
            _const: path.resolve(__dirname, 'src/store/constants'),
            _i18n: path.resolve(__dirname, 'src/i18n'),
        },
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
