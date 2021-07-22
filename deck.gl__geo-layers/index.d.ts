//typings for @deck.gl/geo-layers v8.3.14
declare module '@deck.gl/geo-layers/great-circle-layer/great-circle-layer' {
	import { ArcLayer } from '@deck.gl/geo-layers/@deck.gl/layers';
	export default class GreatCircleLayer extends ArcLayer {
	}

}
declare module '@deck.gl/geo-layers/s2-layer/s2-geometry' {
	export function IJToST(ij: any, order: any, offsets: any): number[];
	export function STToUV(st: any): number[];
	export function FaceUVToXYZ(face: any, [u, v]: [any, any]): any[];
	export function XYZToLngLat([x, y, z]: [any, any, any]): number[];
	export function toHilbertQuadkey(idS: any): string;
	export function FromHilbertQuadKey(hilbertQuadkey: any): {
	    face: number;
	    ij: number[];
	    level: any;
	};

}
declare module '@deck.gl/geo-layers/s2-layer/s2-utils' {
	export function getS2QuadKey(token: any): string;
	/**
	 * Get a polygon with corner coordinates for an s2 cell
	 * @param {*} cell - This can be an S2 key or token
	 * @return {Array} - a simple polygon in array format: [[lng, lat], ...]
	 *   - each coordinate is an array [lng, lat]
	 *   - the polygon is closed, i.e. last coordinate is a copy of the first coordinate
	 */
	export function getS2Polygon(token: any): Float64Array;

}
declare module '@deck.gl/geo-layers/s2-layer/s2-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	export default class S2Layer extends CompositeLayer {
	    renderLayers(): any;
	}

}
declare module '@deck.gl/geo-layers/tile-layer/tile-2d-header' {
	export default class Tile2DHeader {
	    constructor({ x, y, z, onTileLoad, onTileError }: {
	        x: any;
	        y: any;
	        z: any;
	        onTileLoad: any;
	        onTileError: any;
	    });
	    get data(): any;
	    get isLoaded(): any;
	    get isLoading(): boolean;
	    get isCancelled(): any;
	    get byteLength(): any;
	    _loadData(getTileData: any, requestScheduler: any): Promise<void>;
	    loadData(getTileData: any, requestScheduler: any): void;
	    abort(): void;
	}

}
declare module '@deck.gl/geo-layers/tile-layer/tile-2d-traversal' {
	export function getOSMTileIndices(viewport: any, maxZ: any, zRange: any): any[];

}
declare module '@deck.gl/geo-layers/tile-layer/utils' {
	export const urlType: {
	    type: string;
	    value: string;
	    validate: (value: any) => boolean;
	    equals: (value1: any, value2: any) => boolean;
	};
	export function getURLFromTemplate(template: any, properties: any): any;
	export function osmTile2lngLat(x: any, y: any, z: any): number[];
	export function tileToBoundingBox(viewport: any, x: any, y: any, z: any): {
	    west: number;
	    north: number;
	    east: number;
	    south: number;
	    left?: undefined;
	    top?: undefined;
	    right?: undefined;
	    bottom?: undefined;
	} | {
	    left: number;
	    top: number;
	    right: number;
	    bottom: number;
	    west?: undefined;
	    north?: undefined;
	    east?: undefined;
	    south?: undefined;
	};
	/**
	 * Returns all tile indices in the current viewport. If the current zoom level is smaller
	 * than minZoom, return an empty array. If the current zoom level is greater than maxZoom,
	 * return tiles that are on maxZoom.
	 */
	export function getTileIndices({ viewport, maxZoom, minZoom, zRange, extent, tileSize }: {
	    viewport: any;
	    maxZoom: any;
	    minZoom: any;
	    zRange: any;
	    extent: any;
	    tileSize?: number;
	}): any[];

}
declare module '@deck.gl/geo-layers/tile-layer/tileset-2d' {
	export const STRATEGY_NEVER = "never";
	export const STRATEGY_REPLACE = "no-overlap";
	export const STRATEGY_DEFAULT = "best-available";
	/**
	 * Manages loading and purging of tiles data. This class caches recently visited tiles
	 * and only create new tiles if they are present.
	 */
	export default class Tileset2D {
	    /**
	     * Takes in a function that returns tile data, a cache size, and a max and a min zoom level.
	     * Cache size defaults to 5 * number of tiles in the current viewport
	     */
	    constructor(opts: any);
	    get tiles(): any;
	    get selectedTiles(): any;
	    get isLoaded(): any;
	    setOptions(opts: any): void;
	    /**
	     * Update the cache with the given viewport and triggers callback onUpdate.
	     * @param {*} viewport
	     * @param {*} onUpdate
	     */
	    update(viewport: any, { zRange }?: {
	        zRange: any;
	    }): any;
	    getTileIndices({ viewport, maxZoom, minZoom, zRange }: {
	        viewport: any;
	        maxZoom: any;
	        minZoom: any;
	        zRange: any;
	    }): any[];
	    getTileMetadata({ x, y, z }: {
	        x: any;
	        y: any;
	        z: any;
	    }): {
	        bbox: {
	            west: number;
	            north: number;
	            east: number;
	            south: number;
	            left?: undefined;
	            top?: undefined;
	            right?: undefined;
	            bottom?: undefined;
	        } | {
	            left: number;
	            top: number;
	            right: number;
	            bottom: number;
	            west?: undefined;
	            north?: undefined;
	            east?: undefined;
	            south?: undefined;
	        };
	    };
	    getParentIndex(tileIndex: any): any;
	    updateTileStates(): boolean;
	    _rebuildTree(): void;
	    _updateTileStates(selectedTiles: any): void;
	    /**
	     * Clear tiles that are not visible when the cache is full
	     */
	    _resizeCache(): void;
	    _getTile({ x, y, z }: {
	        x: any;
	        y: any;
	        z: any;
	    }, create: any): any;
	    _getNearestAncestor(x: any, y: any, z: any): any;
	}

}
declare module '@deck.gl/geo-layers/tile-layer/tile-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	export default class TileLayer extends CompositeLayer {
	    initializeState(): void;
	    get isLoaded(): any;
	    shouldUpdateState({ changeFlags }: {
	        changeFlags: any;
	    }): any;
	    updateState({ props, oldProps, context, changeFlags }: {
	        props: any;
	        oldProps: any;
	        context: any;
	        changeFlags: any;
	    }): void;
	    _updateTileset(): void;
	    _onTileLoad(tile: any): void;
	    _onTileError(error: any, tile: any): void;
	    _onTileUnload(tile: any): void;
	    getTileData(tile: any): any;
	    renderSubLayers(props: any): any;
	    getHighlightedObjectIndex(): number;
	    getPickingInfo({ info, sourceLayer }: {
	        info: any;
	        sourceLayer: any;
	    }): any;
	    renderLayers(): any;
	}

}
declare module '@deck.gl/geo-layers/trips-layer/trips-layer' {
	import { PathLayer } from '@deck.gl/geo-layers/@deck.gl/layers';
	export default class TripsLayer extends PathLayer {
	    getShaders(): any;
	    initializeState(params: any): void;
	    draw(params: any): void;
	}

}
declare module '@deck.gl/geo-layers/h3-layers/h3-cluster-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	export default class H3ClusterLayer extends CompositeLayer {
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    renderLayers(): any;
	}

}
declare module '@deck.gl/geo-layers/h3-layers/h3-hexagon-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	export function normalizeLongitudes(vertices: any, refLng: any): void;
	export function scalePolygon(hexId: any, vertices: any, factor: any): void;
	/**
	 * A subclass of HexagonLayer that uses H3 hexagonIds in data objects
	 * rather than centroid lat/longs. The shape of each hexagon is determined
	 * based on a single "center" hexagon, which can be selected by passing in
	 * a center lat/lon pair. If not provided, the map center will be used.
	 *
	 * Also sets the `hexagonId` field in the onHover/onClick callback's info
	 * objects. Since this is calculated using math, hexagonId will be present
	 * even when no corresponding hexagon is in the data set. You can check
	 * index !== -1 to see if picking matches an actual object.
	 */
	export default class H3HexagonLayer extends CompositeLayer {
	    shouldUpdateState({ changeFlags }: {
	        changeFlags: any;
	    }): any;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    _shouldUseHighPrecision(): any;
	    _updateVertices(viewport: any): void;
	    renderLayers(): any;
	    _getForwardProps(): {
	        elevationScale: any;
	        extruded: any;
	        coverage: any;
	        wireframe: any;
	        stroked: any;
	        filled: any;
	        lineWidthUnits: any;
	        lineWidthScale: any;
	        lineWidthMinPixels: any;
	        lineWidthMaxPixels: any;
	        material: any;
	        getElevation: any;
	        getFillColor: any;
	        getLineColor: any;
	        getLineWidth: any;
	        transitions: any;
	        updateTriggers: {
	            getFillColor: any;
	            getElevation: any;
	            getLineColor: any;
	            getLineWidth: any;
	        };
	    };
	    _renderPolygonLayer(): any;
	    _renderColumnLayer(): any;
	}

}
declare module '@deck.gl/geo-layers/tile-3d-layer/tile-3d-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	export default class Tile3DLayer extends CompositeLayer {
	    initializeState(): void;
	    shouldUpdateState({ changeFlags }: {
	        changeFlags: any;
	    }): any;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    getPickingInfo({ info, sourceLayer }: {
	        info: any;
	        sourceLayer: any;
	    }): any;
	    _loadTileset(tilesetUrl: any): Promise<void>;
	    _onTileLoad(tileHeader: any): void;
	    _onTileUnload(tileHeader: any): void;
	    _updateTileset(tileset3d: any): void;
	    _create3DTileLayer(tileHeader: any): any;
	    _createPointCloudTileLayer(tileHeader: any): any;
	    _create3DModelTileLayer(tileHeader: any): any;
	    _createSimpleMeshLayer(tileHeader: any): any;
	    renderLayers(): any;
	}

}
declare module '@deck.gl/geo-layers/terrain-layer/terrain-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	/**
	 * state: {
	 *   isTiled: True renders TileLayer of many SimpleMeshLayers, false renders one SimpleMeshLayer
	 *   terrain: Mesh object. Only defined when isTiled is false.
	 * }
	 */
	export default class TerrainLayer extends CompositeLayer {
	    updateState({ props, oldProps }: {
	        props: any;
	        oldProps: any;
	    }): void;
	    loadTerrain({ elevationData, bounds, elevationDecoder, meshMaxError, workerUrl }: {
	        elevationData: any;
	        bounds: any;
	        elevationDecoder: any;
	        meshMaxError: any;
	        workerUrl: any;
	    }): Promise<any>;
	    getTiledTerrainData(tile: any): Promise<[any, any]>;
	    renderSubLayers(props: any): any;
	    onViewportLoad(data: any): void;
	    renderLayers(): any;
	}

}
declare module '@deck.gl/geo-layers/mvt-layer/clip-extension' {
	import { LayerExtension } from '@deck.gl/geo-layers/@deck.gl/core';
	export default class ClipExtension extends LayerExtension {
	    getShaders(): {
	        modules: {
	            name: string;
	            vs: string;
	        }[];
	        inject: {
	            'vs:#decl': string;
	            'vs:DECKGL_FILTER_GL_POSITION': string;
	            'fs:#decl': string;
	            'fs:DECKGL_FILTER_COLOR': string;
	        };
	    } | {
	        modules: {
	            name: string;
	            fs: string;
	        }[];
	        inject: {
	            'vs:#decl': string;
	            'vs:DECKGL_FILTER_GL_POSITION': string;
	            'fs:#decl': string;
	            'fs:DECKGL_FILTER_COLOR': string;
	        };
	    };
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	}

}
declare module '@deck.gl/geo-layers/mvt-layer/mvt-layer' {
	import TileLayer from '@deck.gl/geo-layers/tile-layer/tile-layer';
	export default class MVTLayer extends TileLayer {
	    getTileData(tile: any): Promise<any>;
	    renderSubLayers(props: any): any;
	    onHover(info: any, pickingEvent: any): any;
	    getHighlightedObjectIndex(tile: any): number;
	}

}
declare module '@deck.gl/geo-layers' {
	export { default as GreatCircleLayer } from '@deck.gl/geo-layers/great-circle-layer/great-circle-layer';
	export { default as S2Layer } from '@deck.gl/geo-layers/s2-layer/s2-layer';
	export { default as TileLayer } from '@deck.gl/geo-layers/tile-layer/tile-layer';
	export { default as TripsLayer } from '@deck.gl/geo-layers/trips-layer/trips-layer';
	export { default as H3ClusterLayer } from '@deck.gl/geo-layers/h3-layers/h3-cluster-layer';
	export { default as H3HexagonLayer } from '@deck.gl/geo-layers/h3-layers/h3-hexagon-layer';
	export { default as Tile3DLayer } from '@deck.gl/geo-layers/tile-3d-layer/tile-3d-layer';
	export { default as TerrainLayer } from '@deck.gl/geo-layers/terrain-layer/terrain-layer';
	export { default as MVTLayer } from '@deck.gl/geo-layers/mvt-layer/mvt-layer';

}
