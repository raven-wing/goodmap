/**
 * The view the map opens on, as set by the deployment.
 *
 * Goodmap resolves the data source's `initial_view` server-side and hands the finished
 * view over as window.INITIAL_VIEW, so every field is present and already validated. The
 * fallbacks below are for the cases where that global never arrives at all - a custom
 * template, a standalone frontend dev server, a unit test - and are the geographic centre
 * of Poland at country zoom, which is what this file hardcoded before the view became
 * configurable.
 *
 * The fields are getters rather than plain values so the global is read when the map
 * mounts rather than when this module is first imported: import order is not something a
 * deployment's template should be able to get wrong.
 */
const DEFAULT_MAP_COORDINATES = [51.917, 19.013];
const DEFAULT_MAP_ZOOM = 7;
const DEFAULT_MAX_MAP_ZOOM = 19;

const mapConfig = {
    get initialMapCoordinates() {
        return globalThis.INITIAL_VIEW?.center || DEFAULT_MAP_COORDINATES;
    },
    get initialMapZoom() {
        return globalThis.INITIAL_VIEW?.zoom ?? DEFAULT_MAP_ZOOM;
    },
    get maxMapZoom() {
        return globalThis.INITIAL_VIEW?.max_zoom ?? DEFAULT_MAX_MAP_ZOOM;
    },
};

export default mapConfig;
