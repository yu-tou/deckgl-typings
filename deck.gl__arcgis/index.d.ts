declare module '@deck.gl/arcgis/commons' {
	export function initializeResources(gl: any): void;
	export function render({ gl, width, height, viewState }: {
	    gl: any;
	    width: any;
	    height: any;
	    viewState: any;
	}): void;
	export function finalizeResources(): void;

}
declare module '@deck.gl/arcgis/deck-layer-view-2d' {
	export default function createDeckLayerView2D(BaseLayerViewGL2D: any): any;

}
declare module '@deck.gl/arcgis/deck-layer' {
	export default function createDeckLayer(DeckProps: any, Layer: any, DeckLayerView2D: any): any;

}
declare module '@deck.gl/arcgis/deck-props' {
	export default function loadDeckProps(Accessor: any): any;

}
