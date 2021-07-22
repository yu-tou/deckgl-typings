//typings for deck.gl v8.3.14
declare module 'deck.gl' {
	export { COORDINATE_SYSTEM, Deck, Layer, CompositeLayer, View, MapView, FirstPersonView, OrbitView, OrthographicView, _GlobeView, Viewport, WebMercatorViewport, _GlobeViewport, Controller, MapController, OrbitController, FirstPersonController, OrthographicController, _GlobeController, AttributeManager, picking, project, project32, gouraudLighting, phongLighting, shadow, LayerManager, DeckRenderer, log, TRANSITION_EVENTS, TransitionInterpolator, LinearInterpolator, FlyToInterpolator, Effect, LightingEffect, PostProcessEffect, AmbientLight, PointLight, DirectionalLight, LayerExtension, Tesselator, fp64LowPart, createIterable } from 'deck.gl/@deck.gl/core';
	export { ArcLayer, BitmapLayer, IconLayer, LineLayer, PointCloudLayer, ScatterplotLayer, GridCellLayer, ColumnLayer, PathLayer, PolygonLayer, SolidPolygonLayer, GeoJsonLayer, TextLayer } from 'deck.gl/@deck.gl/layers';
	export { ScreenGridLayer, CPUGridLayer, HexagonLayer, ContourLayer, GridLayer, GPUGridLayer, AGGREGATION_OPERATION, HeatmapLayer } from 'deck.gl/@deck.gl/aggregation-layers';
	export { GreatCircleLayer, S2Layer, H3ClusterLayer, H3HexagonLayer, TileLayer, TripsLayer, Tile3DLayer, TerrainLayer, MVTLayer } from 'deck.gl/@deck.gl/geo-layers';
	export { SimpleMeshLayer, ScenegraphLayer } from 'deck.gl/@deck.gl/mesh-layers';
	export { default, DeckGL } from 'deck.gl/@deck.gl/react';

}
