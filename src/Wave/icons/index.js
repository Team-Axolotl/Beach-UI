// Include all SVG icons from icons directory in Webpack bundle
function importAll(requireContext) {
    requireContext.keys().forEach(requireContext);
}

importAll(require.context('.', false, /.svg$/));
